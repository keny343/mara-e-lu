-- Sistema de Inscrição e Matrículas - Schema MariaDB
-- Criado para deploy em Zeabur

CREATE DATABASE IF NOT EXISTS sistema_inscricoes;
USE sistema_inscricoes;

-- Tabela de cursos
CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    duracao_meses INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    vagas_totais INT NOT NULL,
    vagas_disponiveis INT NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    status ENUM('ativo', 'inativo', 'encerrado') DEFAULT 'ativo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de alunos
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    numero_bilhete VARCHAR(20) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    provincia VARCHAR(50),
    nome_pai VARCHAR(255),
    nome_mae VARCHAR(255),
    nacionalidade VARCHAR(50) DEFAULT 'Angolana',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de inscrições (pré-matrícula)
CREATE TABLE inscricoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    curso_id INT NOT NULL,
    data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pendente', 'aprovada', 'rejeitada', 'cancelada') DEFAULT 'pendente',
    observacoes TEXT,
    documento_url VARCHAR(255),
    FOREIGN KEY (aluno_id) REFERENCES alunos(id),
    FOREIGN KEY (curso_id) REFERENCES cursos(id),
    INDEX idx_aluno_curso (aluno_id, curso_id)
);

-- Tabela de matrículas (matrícula confirmada)
CREATE TABLE matriculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    inscricao_id INT NOT NULL,
    aluno_id INT NOT NULL,
    curso_id INT NOT NULL,
    data_matricula TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    numero_matricula VARCHAR(20) UNIQUE NOT NULL,
    status ENUM('ativa', 'trancada', 'concluida', 'cancelada') DEFAULT 'ativa',
    forma_pagamento ENUM('multicaixa', 'referencia', 'dinheiro', 'transferencia') NOT NULL,
    desconto DECIMAL(5,2) DEFAULT 0,
    valor_final DECIMAL(10,2) NOT NULL,
    parcelas INT DEFAULT 1,
    FOREIGN KEY (inscricao_id) REFERENCES inscricoes(id),
    FOREIGN KEY (aluno_id) REFERENCES alunos(id),
    FOREIGN KEY (curso_id) REFERENCES cursos(id),
    INDEX idx_numero_matricula (numero_matricula)
);

-- Tabela de pagamentos
CREATE TABLE pagamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matricula_id INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    status ENUM('pendente', 'pago', 'atrasado', 'cancelado') DEFAULT 'pendente',
    forma_pagamento ENUM('multicaixa', 'referencia', 'dinheiro', 'transferencia') NOT NULL,
    comprovante_url VARCHAR(255),
    FOREIGN KEY (matricula_id) REFERENCES matriculas(id),
    INDEX idx_matricula_status (matricula_id, status)
);

-- Tabela de usuários (admin)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    nivel ENUM('admin', 'secretaria', 'professor') DEFAULT 'secretaria',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserir dados iniciais
INSERT INTO usuarios (nome, email, senha, nivel) VALUES 
('Administrador', 'admin@sistema.com', 'admin123', 'admin'),
('Secretaria', 'secretaria@sistema.com', 'secret123', 'secretaria');

-- Inserir cursos de exemplo
INSERT INTO cursos (nome, descricao, duracao_meses, valor, vagas_totais, vagas_disponiveis, data_inicio, data_fim) VALUES 
('Informática Básica', 'Curso básico de informática para iniciantes', 3, 199.90, 30, 25, '2024-03-01', '2024-05-31'),
('Inglês Intermediário', 'Curso de inglês nível intermediário', 6, 299.90, 20, 15, '2024-03-15', '2024-09-14'),
('Excel Avançado', 'Curso avançado de Excel e planilhas', 2, 149.90, 25, 20, '2024-04-01', '2024-05-31');
