const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');

const router = express.Router();

// Listar todos os cursos
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM cursos';
    let params = [];
    
    if (search) {
      query += ' WHERE nome LIKE ?';
      params.push(`%${search}%`);
    } else {
      query += ' WHERE status = "ativo"';
    }
    
    query += ' ORDER BY data_inicio ASC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    const cursos = await db.query(query, params);
    
    // Buscar total para paginação
    let countQuery = 'SELECT COUNT(*) as total FROM cursos';
    let countParams = [];
    
    if (search) {
      countQuery += ' WHERE nome LIKE ?';
      countParams.push(`%${search}%`);
    } else {
      countQuery += ' WHERE status = "ativo"';
    }
    
    const countResult = await db.query(countQuery, countParams);
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    
    res.json({
      cursos,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });
  } catch (error) {
    console.error('Erro ao listar cursos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Contar cursos
router.get('/count', async (req, res) => {
  try {
    const result = await db.query('SELECT COUNT(*) as count FROM cursos WHERE status = "ativo"');
    res.json({ count: result[0].count });
  } catch (error) {
    console.error('Erro ao contar cursos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Buscar curso por ID
router.get('/:id', async (req, res) => {
  try {
    const cursos = await db.query('SELECT * FROM cursos WHERE id = ?', [req.params.id]);
    
    if (cursos.length === 0) {
      return res.status(404).json({ error: 'Curso não encontrado' });
    }
    
    res.json(cursos[0]);
  } catch (error) {
    console.error('Erro ao buscar curso:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Criar novo curso
router.post('/', [
  body('nome').notEmpty().trim(),
  body('descricao').optional().trim(),
  body('duracao_meses').isInt({ min: 1 }),
  body('valor').isFloat({ min: 0 }),
  body('vagas_totais').isInt({ min: 1 }),
  body('data_inicio').isDate(),
  body('data_fim').isDate()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      nome,
      descricao,
      duracao_meses,
      valor,
      vagas_totais,
      data_inicio,
      data_fim
    } = req.body;

    const result = await db.query(
      `INSERT INTO cursos (
        nome, descricao, duracao_meses, valor, vagas_totais, vagas_disponiveis,
        data_inicio, data_fim, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ativo')`,
      [nome, descricao, duracao_meses, valor, vagas_totais, vagas_totais, data_inicio, data_fim]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'Curso criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar curso:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Atualizar curso
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    // Verificar se curso existe
    const cursos = await db.query('SELECT id FROM cursos WHERE id = ?', [id]);
    if (cursos.length === 0) {
      return res.status(404).json({ error: 'Curso não encontrado' });
    }

    // Construir query dinâmica
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    
    if (fields.length === 0) {
      return res.status(400).json({ error: 'Nenhum campo para atualizar' });
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const sql = `UPDATE cursos SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    values.push(id);

    await db.query(sql, values);

    res.json({ message: 'Curso atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar curso:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Excluir curso
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Verificar se curso existe
    const cursos = await db.query('SELECT id FROM cursos WHERE id = ?', [id]);
    if (cursos.length === 0) {
      return res.status(404).json({ error: 'Curso não encontrado' });
    }

    // Verificar se há inscrições ou matrículas
    const verificacao = await db.query(
      'SELECT id FROM inscricoes WHERE curso_id = ? UNION SELECT id FROM matriculas WHERE curso_id = ?',
      [id, id]
    );

    if (verificacao.length > 0) {
      return res.status(400).json({ error: 'Curso possui inscrições ou matrículas vinculadas' });
    }

    await db.query('DELETE FROM cursos WHERE id = ?', [id]);

    res.json({ message: 'Curso excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir curso:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Atualizar vagas disponíveis
router.patch('/:id/vagas', [
  body('vagas_disponiveis').isInt({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { vagas_disponiveis } = req.body;
    const id = req.params.id;

    await db.query(
      'UPDATE cursos SET vagas_disponiveis = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [vagas_disponiveis, id]
    );

    res.json({ message: 'Vagas atualizadas com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar vagas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
