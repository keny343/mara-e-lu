const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requisições
});
app.use(limiter);

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/alunos', require('./routes/alunos'));
app.use('/api/cursos', require('./routes/cursos'));
app.use('/api/inscricoes', require('./routes/inscricoes'));
app.use('/api/matriculas', require('./routes/matriculas'));

// Rota principal
app.get('/', (req, res) => {
  res.json({ message: 'API do Sistema de Inscrições e Matrículas' });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
