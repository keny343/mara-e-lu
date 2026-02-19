const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');

const router = express.Router();

// Criar usuário admin
router.post('/create-admin', async (req, res) => {
  try {
    console.log('=== DEBUG /api/auth/create-admin ===');
    
    // Hash da senha
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Inserir usuário com senha criptografada
    const result = await db.query(
      'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)',
      ['Administrador', 'admin@maraelu.co.ao', hashedPassword, 'admin']
    );
    
    console.log('Usuário criado:', result);
    console.log('Insert ID:', result.insertId);
    
    res.json({ 
      message: 'Usuário admin criado com sucesso',
      userId: result.insertId 
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    console.error('SQL Error:', error.sqlMessage);
    res.status(500).json({ error: 'Erro ao criar usuário', details: error.sqlMessage });
  }
});

// Login original
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('senha').isLength({ min: 6 })
], async (req, res) => {
  try {
    console.log('=== DEBUG /api/auth/login ===');
    console.log('req.body:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, senha } = req.body;
    console.log('Buscando usuário com email:', email);

    // Buscar usuário
    const usuarios = await db.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );
    console.log('Usuários encontrados:', usuarios.length);

    if (usuarios.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const usuario = usuarios[0];
    console.log('Usuário encontrado:', { id: usuario.id, email: usuario.email, tipo: usuario.tipo });

    // Verificar senha com bcrypt (sempre usar bcrypt.compare)
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    
    console.log('Senha válida:', senhaValida);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerar token
    console.log('JWT_SECRET existe?', !!process.env.JWT_SECRET);
    console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN);
    
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    console.log('Token gerado com sucesso');

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo
      }
    });
  } catch (error) {
    console.error('=== ERRO DETALHADO NO LOGIN ===');
    console.error('Tipo do erro:', error.constructor.name);
    console.error('Mensagem:', error.message);
    console.error('Stack:', error.stack);
    console.error('================================');
    res.status(500).json({ error: 'Erro interno do servidor', debug: error.message });
  }
});

// Verificar token
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const usuarios = await db.query(
      'SELECT id, nome, email, tipo FROM usuarios WHERE id = ?',
      [decoded.id]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    res.json({ usuario: usuarios[0] });
  } catch (error) {
    console.error('Erro na verificação:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
});

module.exports = router;
