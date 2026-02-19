const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');

const router = express.Router();

// Listar inscrições
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const status = req.query.status || '';
    const offset = (page - 1) * limit;

    let query = `
      SELECT 
        i.*, 
        a.nome_completo AS aluno_nome,
        a.email AS aluno_email,
        c.nome AS curso_nome
      FROM inscricoes i
      INNER JOIN alunos a ON a.id = i.aluno_id
      INNER JOIN cursos c ON c.id = i.curso_id
    `;
    let params = [];
    let whereConditions = [];

    if (search) {
      whereConditions.push('(a.nome_completo LIKE ? OR c.nome LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }

    if (status) {
      whereConditions.push('i.status = ?');
      params.push(status);
    }

    if (whereConditions.length > 0) {
      query += ' WHERE ' + whereConditions.join(' AND ');
    }

    query += ` ORDER BY i.data_inscricao DESC LIMIT ${limit} OFFSET ${offset}`;
    
    const inscricoes = await db.query(query, params);
    
    // Buscar total para paginação
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM inscricoes i
      INNER JOIN alunos a ON a.id = i.aluno_id
      INNER JOIN cursos c ON c.id = i.curso_id
    `;
    let countParams = [];
    
    if (whereConditions.length > 0) {
      countQuery += ' WHERE ' + whereConditions.join(' AND ');
      countParams.push(...params.slice(0, -2)); // Remove limit e offset
    }
    
    const countResult = await db.query(countQuery, countParams);
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    
    // Formatar dados para o frontend
    const formattedInscricoes = inscricoes.map(inscricao => ({
      id: inscricao.id,
      nome_aluno: inscricao.aluno_nome,
      email_aluno: inscricao.aluno_email,
      nome_curso: inscricao.curso_nome,
      status: inscricao.status,
      data_inscricao: inscricao.data_inscricao,
      observacoes: inscricao.observacoes
    }));
    
    res.json({
      inscricoes: formattedInscricoes,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });
  } catch (error) {
    console.error('Erro ao listar inscrições:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Contar inscrições
router.get('/count', async (req, res) => {
  try {
    const result = await db.query('SELECT COUNT(*) as count FROM inscricoes');
    res.json({ count: result[0].count });
  } catch (error) {
    console.error('Erro ao contar inscrições:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Buscar inscrição por ID
router.get('/:id', async (req, res) => {
  try {
    const inscricoes = await db.query(
      `SELECT 
        i.*, 
        a.nome_completo AS aluno_nome,
        a.email AS aluno_email,
        c.nome AS curso_nome
      FROM inscricoes i
      INNER JOIN alunos a ON a.id = i.aluno_id
      INNER JOIN cursos c ON c.id = i.curso_id
      WHERE i.id = ?`,
      [req.params.id]
    );

    if (inscricoes.length === 0) {
      return res.status(404).json({ error: 'Inscrição não encontrada' });
    }

    res.json(inscricoes[0]);
  } catch (error) {
    console.error('Erro ao buscar inscrição:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Criar inscrição
router.post('/', [
  body('aluno_id').isInt({ min: 1 }),
  body('curso_id').isInt({ min: 1 }),
  body('observacoes').optional().trim(),
  body('documento_url').optional().isString().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { aluno_id, curso_id, observacoes, documento_url } = req.body;

    // Validar aluno
    const alunos = await db.query('SELECT id FROM alunos WHERE id = ?', [aluno_id]);
    if (alunos.length === 0) {
      return res.status(400).json({ error: 'Aluno inválido' });
    }

    // Validar curso e vagas
    const cursos = await db.query('SELECT id, vagas_disponiveis, status FROM cursos WHERE id = ?', [curso_id]);
    if (cursos.length === 0) {
      return res.status(400).json({ error: 'Curso inválido' });
    }

    if (cursos[0].status !== 'ativo') {
      return res.status(400).json({ error: 'Curso não está ativo' });
    }

    if (cursos[0].vagas_disponiveis <= 0) {
      return res.status(400).json({ error: 'Não há vagas disponíveis' });
    }

    // Evitar duplicidade pendente/aprovada
    const existentes = await db.query(
      `SELECT id FROM inscricoes 
       WHERE aluno_id = ? AND curso_id = ? AND status IN ('pendente', 'aprovada')`,
      [aluno_id, curso_id]
    );

    if (existentes.length > 0) {
      return res.status(400).json({ error: 'Já existe inscrição pendente/aprovada para este aluno neste curso' });
    }

    const result = await db.query(
      `INSERT INTO inscricoes (aluno_id, curso_id, status, observacoes, documento_url)
       VALUES (?, ?, 'pendente', ?, ?)`,
      [aluno_id, curso_id, observacoes || null, documento_url || null]
    );

    res.status(201).json({ id: result.insertId, message: 'Inscrição criada com sucesso' });
  } catch (error) {
    console.error('Erro ao criar inscrição:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Atualizar status da inscrição
router.patch('/:id/status', [
  body('status').isIn(['pendente', 'aprovada', 'rejeitada', 'cancelada']),
  body('observacoes').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const { status, observacoes } = req.body;

    const inscricoes = await db.query('SELECT id, status FROM inscricoes WHERE id = ?', [id]);
    if (inscricoes.length === 0) {
      return res.status(404).json({ error: 'Inscrição não encontrada' });
    }

    await db.query(
      'UPDATE inscricoes SET status = ?, observacoes = COALESCE(?, observacoes) WHERE id = ?',
      [status, observacoes || null, id]
    );

    res.json({ message: 'Status atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar status da inscrição:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Excluir inscrição
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const inscricoes = await db.query('SELECT id FROM inscricoes WHERE id = ?', [id]);
    if (inscricoes.length === 0) {
      return res.status(404).json({ error: 'Inscrição não encontrada' });
    }

    // Se já virou matrícula, não permitir excluir
    const matriculas = await db.query('SELECT id FROM matriculas WHERE inscricao_id = ?', [id]);
    if (matriculas.length > 0) {
      return res.status(400).json({ error: 'Inscrição já possui matrícula vinculada' });
    }

    await db.query('DELETE FROM inscricoes WHERE id = ?', [id]);

    res.json({ message: 'Inscrição excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir inscrição:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
