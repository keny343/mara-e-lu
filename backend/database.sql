-- Banco de dados para o Sistema de Inscrições e Matrículas - Colégio Mara e Lu
-- Contexto Educacional Angolano

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS mara_e_lu_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mara_e_lu_db;

-- Tabela de alunos
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    bi_numero VARCHAR(50) NOT NULL UNIQUE,
    nif_numero VARCHAR(50),
    naturalidade VARCHAR(100) NOT NULL,
    nome_pai VARCHAR(255) NOT NULL,
    nome_mae VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    endereco TEXT NOT NULL,
    classe ENUM(
        '1-ano', '2-ano', '3-ano', '4-ano', '5-ano',
        '6-ano', '7-ano', '8-ano', '9-ano', '10-ano', '11-ano',
        '12-ano', '13-ano', '14-ano', '15-ano', '16-ano', 
        '17-ano', '18-ano'
    ) NOT NULL,
    foto_bi_url VARCHAR(500),
    certificado_url VARCHAR(500),
    certificado_tipo ENUM('image', 'pdf'),
    nome_responsavel VARCHAR(255) NOT NULL,
    bi_responsavel VARCHAR(50) NOT NULL,
    nif_responsavel VARCHAR(50),
    status ENUM('pendente', 'em_analise', 'aprovada', 'rejeitada', 'matriculada') DEFAULT 'pendente',
    data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    observacoes TEXT,
    
    INDEX idx_bi (bi_numero),
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_classe (classe),
    INDEX idx_data_inscricao (data_inscricao)
);

-- Tabela de cursos/turmas
CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    classe VARCHAR(50) NOT NULL,
    descricao TEXT,
    vagas_disponiveis INT DEFAULT 0,
    vagas_totais INT DEFAULT 0,
    valor_matricula DECIMAL(10,2),
    valor_mensalidade DECIMAL(10,2),
    periodo_letivo VARCHAR(20) NOT NULL,
    status ENUM('ativa', 'encerrada', 'suspensa') DEFAULT 'ativa',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_classe (classe),
    INDEX idx_status (status),
    INDEX idx_periodo (periodo_letivo)
);

-- Tabela de inscrições
CREATE TABLE inscricoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    curso_id INT NOT NULL,
    data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pendente', 'confirmada', 'cancelada') DEFAULT 'pendente',
    documentos_entregues BOOLEAN DEFAULT FALSE,
    pagamento_confirmado BOOLEAN DEFAULT FALSE,
    valor_pago DECIMAL(10,2),
    forma_pagamento VARCHAR(50),
    observacoes TEXT,
    
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE,
    INDEX idx_aluno (aluno_id),
    INDEX idx_curso (curso_id),
    INDEX idx_status (status),
    INDEX idx_data_inscricao (data_inscricao)
);

-- Tabela de matrículas
CREATE TABLE matriculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    curso_id INT NOT NULL,
    numero_matricula VARCHAR(50) UNIQUE NOT NULL,
    data_matricula DATE NOT NULL,
    status ENUM('ativa', 'transferida', 'concluida', 'cancelada') DEFAULT 'ativa',
    data_conclusao DATE,
    media_final DECIMAL(5,2),
    certificado_emitido BOOLEAN DEFAULT FALSE,
    data_certificado DATE,
    
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE,
    INDEX idx_aluno (aluno_id),
    INDEX idx_curso (curso_id),
    INDEX idx_numero_matricula (numero_matricula),
    INDEX idx_status (status)
);

-- Tabela de usuários/administradores
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('admin', 'secretario', 'diretor') DEFAULT 'secretario',
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_tipo (tipo),
    INDEX idx_status (status)
);

-- Tabela de configurações do sistema
CREATE TABLE configuracoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chave VARCHAR(100) NOT NULL UNIQUE,
    valor TEXT,
    descricao TEXT,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_chave (chave)
);

-- Inserir dados iniciais

-- Usuário administrador padrão (senha: admin123)
INSERT INTO usuarios (nome, email, senha, tipo) VALUES 
('Administrador', 'admin@maraelu.co.ao', '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQj', 'admin');

-- Configurações iniciais
INSERT INTO configuracoes (chave, valor, descricao) VALUES 
('nome_escola', 'Colégio Privado Mara e Lu', 'Nome oficial da instituição'),
('endereco_escola', 'Rua Principal, 123, Cazenga, Luanda, Angola', 'Endereço completo da escola'),
('telefone_escola', '+244 923 456 789', 'Telefone de contato da escola'),
('email_escola', 'contato@maraelu.co.ao', 'Email oficial da escola'),
('periodo_letivo', '2025', 'Período letivo atual'),
('valor_inscricao', '5000.00', 'Valor da taxa de inscrição em KZ'),
('moeda', 'KZ', 'Moeda utilizada no sistema');

-- Cursos padrão para o sistema angolano
INSERT INTO cursos (nome, classe, descricao, vagas_totais, periodo_letivo) VALUES 
('1º Ano - Pré-Escolar', '1-ano', 'Educação infantil para crianças de 5 anos', 30, '2025'),
('2º Ano - Pré-Escolar', '2-ano', 'Educação infantil para crianças de 6 anos', 30, '2025'),
('3º Ano - Pré-Escolar', '3-ano', 'Educação infantil para crianças de 7 anos', 30, '2025'),
('4º Ano - Pré-Escolar', '4-ano', 'Educação infantil para crianças de 8 anos', 30, '2025'),
('5º Ano - Pré-Escolar', '5-ano', 'Educação infantil para crianças de 9 anos', 30, '2025'),
('1ª Classe - Ensino Primário', '6-ano', 'Primeira classe do ensino primário', 35, '2025'),
('2ª Classe - Ensino Primário', '7-ano', 'Segunda classe do ensino primário', 35, '2025'),
('3ª Classe - Ensino Primário', '8-ano', 'Terceira classe do ensino primário', 35, '2025'),
('4ª Classe - Ensino Primário', '9-ano', 'Quarta classe do ensino primário', 35, '2025'),
('5ª Classe - Ensino Primário', '10-ano', 'Quinta classe do ensino primário', 35, '2025'),
('6ª Classe - Ensino Primário', '11-ano', 'Sexta classe do ensino primário', 35, '2025'),
('7ª Classe - Ensino Médio I', '12-ano', 'Sétima classe do ensino médio', 40, '2025'),
('8ª Classe - Ensino Médio I', '13-ano', 'Oitava classe do ensino médio', 40, '2025'),
('9ª Classe - Ensino Médio I', '14-ano', 'Nona classe do ensino médio', 40, '2025'),
('10ª Classe - Ensino Médio II', '15-ano', 'Décima classe do ensino médio', 40, '2025'),
('11ª Classe - Ensino Médio II', '16-ano', 'Décima primeira classe do ensino médio', 40, '2025'),
('12ª Classe - Ensino Médio II', '17-ano', 'Décima segunda classe do ensino médio', 40, '2025'),
('13ª Classe - Ensino Médio II', '18-ano', 'Décima terceira classe do ensino médio', 40, '2025');

-- Atualizar vagas disponíveis (todas disponíveis no início)
UPDATE cursos SET vagas_disponiveis = vagas_totais;

-- View para estatísticas
CREATE VIEW estatisticas AS
SELECT 
    'total_inscricoes' as metrica,
    COUNT(*) as valor
FROM inscricoes
WHERE status = 'confirmada'

UNION ALL

SELECT 
    'alunos_matriculados' as metrica,
    COUNT(*) as valor
FROM matriculas
WHERE status = 'ativa'

UNION ALL

SELECT 
    'vagas_disponiveis' as metrica,
    SUM(vagas_disponiveis) as valor
FROM cursos
WHERE status = 'ativa'

UNION ALL

SELECT 
    'series_oferecidas' as metrica,
    COUNT(DISTINCT classe) as valor
FROM cursos
WHERE status = 'ativa';

-- Trigger para gerar número de matrícula automaticamente
DELIMITER //
CREATE TRIGGER gerar_numero_matricula 
BEFORE INSERT ON matriculas
FOR EACH ROW
BEGIN
    DECLARE ano VARCHAR(4);
    DECLARE sequencial INT;
    
    SET ano = YEAR(CURDATE());
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(numero_matricula, -4) AS UNSIGNED)), 0) + 1
    INTO sequencial
    FROM matriculas
    WHERE numero_matricula LIKE CONCAT('MAT', ano, '%');
    
    SET NEW.numero_matricula = CONCAT('MAT', ano, LPAD(sequencial, 4, '0'));
END//
DELIMITER ;
