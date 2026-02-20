const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');

const router = express.Router();

function gerarNumeroMatricula(id) {
  const ano = new Date().getFullYear();
  return `${ano}${String(id).padStart(6, '0')}`;
}

// Listar matrículas
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    let query = `
      SELECT 
        m.*, 
        a.nome_completo AS aluno_nome,
        a.email AS aluno_email,
        c.nome AS curso_nome
      FROM matriculas m
      INNER JOIN alunos a ON a.id = m.aluno_id
      INNER JOIN cursos c ON c.id = m.curso_id
    `;
    let params = [];
    
    if (search) {
      query += ' WHERE a.nome_completo LIKE ? OR c.nome LIKE ? OR m.numero_matricula LIKE ?';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ` ORDER BY m.data_matricula DESC LIMIT ${limit} OFFSET ${offset}`;
    
    const matriculas = await db.query(query, params);
    
    // Buscar total para paginação
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM matriculas m
      INNER JOIN alunos a ON a.id = m.aluno_id
      INNER JOIN cursos c ON c.id = m.curso_id
    `;
    let countParams = [];
    
    if (search) {
      countQuery += ' WHERE a.nome_completo LIKE ? OR c.nome LIKE ? OR m.numero_matricula LIKE ?';
      countParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    
    const countResult = await db.query(countQuery, countParams);
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    
    res.json({
      matriculas,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });
  } catch (error) {
    console.error('Erro ao listar matrículas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Contar matrículas
router.get('/count', async (req, res) => {
  try {
    const result = await db.query('SELECT COUNT(*) as count FROM matriculas WHERE status = "ativa"');
    res.json({ count: result[0].count });
  } catch (error) {
    console.error('Erro ao contar matrículas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Buscar matrícula por ID
router.get('/:id', async (req, res) => {
  try {
    const matriculas = await db.query(
      `SELECT 
        m.*, 
        a.nome_completo AS aluno_nome,
        a.email AS aluno_email,
        c.nome AS curso_nome
      FROM matriculas m
      INNER JOIN alunos a ON a.id = m.aluno_id
      INNER JOIN cursos c ON c.id = m.curso_id
      WHERE m.id = ?`,
      [req.params.id]
    );

    if (matriculas.length === 0) {
      return res.status(404).json({ error: 'Matrícula não encontrada' });
    }

    res.json(matriculas[0]);
  } catch (error) {
    console.error('Erro ao buscar matrícula:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Criar matrícula a partir de uma inscrição aprovada
router.post('/', [
  body('inscricao_id').isInt({ min: 1 }),
  body('forma_pagamento').isIn(['pix', 'boleto', 'cartao', 'dinheiro']),
  body('desconto').optional().isFloat({ min: 0, max: 100 }),
  body('parcelas').optional().isInt({ min: 1, max: 36 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { inscricao_id, forma_pagamento, desconto, parcelas } = req.body;

    const result = await db.transaction(async (connection) => {
      const [inscricoes] = await connection.execute(
        `SELECT i.*, c.valor, c.vagas_disponiveis, c.status AS curso_status
         FROM inscricoes i
         INNER JOIN cursos c ON c.id = i.curso_id
         WHERE i.id = ?`,
        [inscricao_id]
      );

      if (inscricoes.length === 0) {
        const error = new Error('Inscrição não encontrada');
        error.statusCode = 404;
        throw error;
      }

      const inscricao = inscricoes[0];

      if (inscricao.status !== 'aprovada') {
        const error = new Error('A inscrição precisa estar com status aprovada');
        error.statusCode = 400;
        throw error;
      }

      if (inscricao.curso_status !== 'ativo') {
        const error = new Error('Curso não está ativo');
        error.statusCode = 400;
        throw error;
      }

      if (inscricao.vagas_disponiveis <= 0) {
        const error = new Error('Não há vagas disponíveis');
        error.statusCode = 400;
        throw error;
      }

      const [existente] = await connection.execute(
        'SELECT id FROM matriculas WHERE inscricao_id = ?',
        [inscricao_id]
      );
      if (existente.length > 0) {
        const error = new Error('Já existe matrícula para esta inscrição');
        error.statusCode = 400;
        throw error;
      }

      const descontoNum = Number(desconto || 0);
      const valorOriginal = Number(inscricao.valor);
      const valorFinal = Number((valorOriginal * (100 - descontoNum)) / 100);

      const [insert] = await connection.execute(
        `INSERT INTO matriculas (
          inscricao_id, aluno_id, curso_id, numero_matricula,
          status, forma_pagamento, desconto, valor_final, parcelas
        ) VALUES (?, ?, ?, ?, 'ativa', ?, ?, ?, ?)`,
        [
          inscricao_id,
          inscricao.aluno_id,
          inscricao.curso_id,
          'TEMP',
          forma_pagamento,
          descontoNum,
          valorFinal,
          Number(parcelas || 1)
        ]
      );

      const matriculaId = insert.insertId;
      const numero = gerarNumeroMatricula(matriculaId);

      await connection.execute(
        'UPDATE matriculas SET numero_matricula = ? WHERE id = ?',
        [numero, matriculaId]
      );

      await connection.execute(
        'UPDATE cursos SET vagas_disponiveis = vagas_disponiveis - 1 WHERE id = ?',
        [inscricao.curso_id]
      );

      return { matriculaId, numero, valorFinal };
    });

    res.status(201).json({
      id: result.matriculaId,
      numero_matricula: result.numero,
      valor_final: result.valorFinal,
      message: 'Matrícula criada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar matrícula:', error);
    res.status(error.statusCode || 500).json({ error: error.message || 'Erro interno do servidor' });
  }
});

// Atualizar status da matrícula
router.patch('/:id/status', [
  body('status').isIn(['ativa', 'trancada', 'concluida', 'cancelada'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const { status } = req.body;

    const matriculas = await db.query('SELECT id FROM matriculas WHERE id = ?', [id]);
    if (matriculas.length === 0) {
      return res.status(404).json({ error: 'Matrícula não encontrada' });
    }

    await db.query('UPDATE matriculas SET status = ? WHERE id = ?', [status, id]);

    res.json({ message: 'Status atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar status da matrícula:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
