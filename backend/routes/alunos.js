const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');

const router = express.Router();

// Listar todos os alunos
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM alunos';
    let params = [];
    
    if (search) {
      query += ' WHERE nome_completo LIKE ? OR email LIKE ? OR numero_bilhete LIKE ?';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    const alunos = await db.query(query, params);
    
    // Buscar total para paginação
    let countQuery = 'SELECT COUNT(*) as total FROM alunos';
    let countParams = [];
    
    if (search) {
      countQuery += ' WHERE nome_completo LIKE ? OR email LIKE ? OR numero_bilhete LIKE ?';
      countParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    
    const countResult = await db.query(countQuery, countParams);
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    
    res.json({
      alunos,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });
  } catch (error) {
    console.error('Erro ao listar alunos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Contar alunos
router.get('/count', async (req, res) => {
  try {
    const result = await db.query('SELECT COUNT(*) as count FROM alunos');
    res.json({ count: result[0].count });
  } catch (error) {
    console.error('Erro ao contar alunos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Buscar aluno por ID
router.get('/:id', async (req, res) => {
  try {
    const alunos = await db.query('SELECT * FROM alunos WHERE id = ?', [req.params.id]);
    
    if (alunos.length === 0) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    
    res.json(alunos[0]);
  } catch (error) {
    console.error('Erro ao buscar aluno:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Criar novo aluno
router.post('/', [
  body('nome_completo').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
  body('cpf').isLength({ min: 11, max: 14 }),
  body('data_nascimento').isDate(),
  body('telefone').optional().isLength({ min: 10, max: 20 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      nome_completo,
      email,
      cpf,
      rg,
      data_nascimento,
      telefone,
      endereco,
      bairro,
      cidade,
      estado,
      cep,
      nome_pai,
      nome_mae,
      nacionalidade
    } = req.body;

    // Verificar se email ou CPF já existem
    const existentes = await db.query(
      'SELECT id FROM alunos WHERE email = ? OR cpf = ?',
      [email, cpf]
    );

    if (existentes.length > 0) {
      return res.status(400).json({ error: 'Email ou CPF já cadastrado' });
    }

    const result = await db.query(
      `INSERT INTO alunos (
        nome_completo, email, cpf, rg, data_nascimento, telefone,
        endereco, bairro, cidade, estado, cep, nome_pai, nome_mae, nacionalidade
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nome_completo, email, cpf, rg, data_nascimento, telefone,
        endereco, bairro, cidade, estado, cep, nome_pai, nome_mae, nacionalidade || 'Brasileira'
      ]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'Aluno cadastrado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar aluno:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Atualizar aluno
router.put('/:id', [
  body('nome_completo').optional().notEmpty().trim(),
  body('email').optional().isEmail().normalizeEmail(),
  body('telefone').optional().isLength({ min: 10, max: 20 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const updates = req.body;

    // Verificar se aluno existe
    const alunos = await db.query('SELECT id FROM alunos WHERE id = ?', [id]);
    if (alunos.length === 0) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    // Construir query dinâmica
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    
    if (fields.length === 0) {
      return res.status(400).json({ error: 'Nenhum campo para atualizar' });
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const sql = `UPDATE alunos SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    values.push(id);

    await db.query(sql, values);

    res.json({ message: 'Aluno atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar aluno:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Excluir aluno
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Verificar se aluno existe
    const alunos = await db.query('SELECT id FROM alunos WHERE id = ?', [id]);
    if (alunos.length === 0) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    // Verificar se há inscrições ou matrículas
    const verificacao = await db.query(
      'SELECT id FROM inscricoes WHERE aluno_id = ? UNION SELECT id FROM matriculas WHERE aluno_id = ?',
      [id, id]
    );

    if (verificacao.length > 0) {
      return res.status(400).json({ error: 'Aluno possui inscrições ou matrículas vinculadas' });
    }

    await db.query('DELETE FROM alunos WHERE id = ?', [id]);

    res.json({ message: 'Aluno excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir aluno:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
