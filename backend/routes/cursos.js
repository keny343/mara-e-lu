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
    const status = req.query.status || '';
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM cursos';
    let params = [];

    const whereConditions = [];
    if (search) {
      whereConditions.push('(nome LIKE ? OR classe LIKE ? OR periodo_letivo LIKE ?)');
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (status) {
      whereConditions.push('status = ?');
      params.push(status);
    } else {
      // Schema angolano usa status: 'ativa'|'encerrada'|'suspensa'
      whereConditions.push('status = "ativa"');
    }

    if (whereConditions.length > 0) {
      query += ' WHERE ' + whereConditions.join(' AND ');
    }

    query += ' ORDER BY data_criacao DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    const cursos = await db.query(query, params);
    
    // Buscar total para paginação
    let countQuery = 'SELECT COUNT(*) as total FROM cursos';
    let countParams = [];

    const countWhereConditions = [];
    if (search) {
      countWhereConditions.push('(nome LIKE ? OR classe LIKE ? OR periodo_letivo LIKE ?)');
      countParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (status) {
      countWhereConditions.push('status = ?');
      countParams.push(status);
    } else {
      countWhereConditions.push('status = "ativa"');
    }

    if (countWhereConditions.length > 0) {
      countQuery += ' WHERE ' + countWhereConditions.join(' AND ');
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
    const result = await db.query('SELECT COUNT(*) as count FROM cursos WHERE status = "ativa"');
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
  body('classe').notEmpty().trim(),
  body('descricao').optional().trim(),
  body('vagas_totais').isInt({ min: 0 }),
  body('vagas_disponiveis').optional().isInt({ min: 0 }),
  body('valor_matricula').optional().isFloat({ min: 0 }),
  body('valor_mensalidade').optional().isFloat({ min: 0 }),
  body('periodo_letivo').notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      nome,
      classe,
      descricao,
      vagas_totais,
      vagas_disponiveis,
      valor_matricula,
      valor_mensalidade,
      periodo_letivo,
      status
    } = req.body;

    const vagasTotaisNum = Number(vagas_totais || 0);
    const vagasDisponiveisNum = vagas_disponiveis !== undefined ? Number(vagas_disponiveis) : vagasTotaisNum;

    const result = await db.query(
      `INSERT INTO cursos (
        nome, classe, descricao, vagas_disponiveis, vagas_totais,
        valor_matricula, valor_mensalidade, periodo_letivo, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nome,
        classe,
        descricao || null,
        vagasDisponiveisNum,
        vagasTotaisNum,
        valor_matricula !== undefined ? Number(valor_matricula) : null,
        valor_mensalidade !== undefined ? Number(valor_mensalidade) : null,
        periodo_letivo,
        status || 'ativa'
      ]
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
