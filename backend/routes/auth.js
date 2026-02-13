const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');

const router = express.Router();

// Login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('senha').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, senha } = req.body;

    // Buscar usuário
    const usuarios = await db.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const usuario = usuarios[0];

    // Verificar senha
    const senhaNoBanco = String(usuario.senha || '');
    const senhaPareceHashBcrypt = senhaNoBanco.startsWith('$2a$') || senhaNoBanco.startsWith('$2b$') || senhaNoBanco.startsWith('$2y$');
    const senhaValida = senhaPareceHashBcrypt
      ? await bcrypt.compare(senha, senhaNoBanco)
      : senha === senhaNoBanco;
    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerar token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, nivel: usuario.nivel },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        nivel: usuario.nivel
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
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
      'SELECT id, nome, email, nivel FROM usuarios WHERE id = ?',
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
