# Deploy no Railway - Backend

## Configurações do Banco de Dados

### 1. Configurar Variáveis de Ambiente no Railway

No seu projeto Railway, vá para **Settings** → **Variables** e adicione:

```bash
# Variáveis do Banco de Dados
MYSQLHOST=mysql.railway.internal
MYSQLUSER=root
MYSQLPASSWORD=
MYSQLDATABASE=mara_e_lu_db
MYSQLPORT=3306

# Ou use DATABASE_URL completo
DATABASE_URL=mysql://root:@mysql.railway.internal:3306/mara_e_lu_db

# Variáveis da Aplicação
NODE_ENV=production
PORT=3000
JWT_SECRET=seu_jwt_secret_aqui_muito_seguro
```

### 2. Executar Script SQL

Copie e cole o conteúdo do arquivo `database.sql` no editor SQL do Railway:

1. Vá para seu projeto MySQL no Railway
2. Clique em **"New Query"**
3. Cole todo o conteúdo do arquivo `database.sql`
4. Clique em **"Run"** ou **Execute**

### 3. Verificar Tabelas Criadas

Após executar o script, você deverá ver as seguintes tabelas:

- `alunos` - Dados dos alunos
- `cursos` - Cursos/turmas disponíveis
- `inscricoes` - Inscrições realizadas
- `matriculas` - Matrículas confirmadas
- `usuarios` - Usuários administrativos
- `configuracoes` - Configurações do sistema
- `estatisticas` - View para estatísticas

### 4. Deploy do Backend

O backend já está configurado para deploy automático. Certifique-se de que:

1. **package.json** está correto
2. **server.js** está configurado para Railway
3. **Variáveis de ambiente** estão definidas

### 5. Testar Conexão

Após o deploy, teste os endpoints:

```bash
# Testar API
GET https://seu-backend-up.railway.app/

# Testar conexão com banco
GET https://seu-backend-up.railway.app/api/alunos
```

## Estrutura do Banco de Dados

### Tabela Principal: `alunos`

```sql
 Campos principais:
 - id: INT AUTO_INCREMENT
 - nome_completo: VARCHAR(255) NOT NULL
 - bi_numero: VARCHAR(50) NOT NULL UNIQUE
 - nif_numero: VARCHAR(50)
 - naturalidade: VARCHAR(100) NOT NULL
 - nome_pai: VARCHAR(255) NOT NULL
 - nome_mae: VARCHAR(255) NOT NULL
 - email: VARCHAR(255) NOT NULL
 - telefone: VARCHAR(20) NOT NULL
 - endereco: TEXT NOT NULL
 - classe: ENUM (1-ano a 18-ano)
 - foto_bi_url: VARCHAR(500)
 - certificado_url: VARCHAR(500)
 - nome_responsavel: VARCHAR(255) NOT NULL
 - bi_responsavel: VARCHAR(50) NOT NULL
 - nif_responsavel: VARCHAR(50)
 - status: ENUM('pendente', 'em_analise', 'aprovada', 'rejeitada', 'matriculada')
```

### Sistema Educacional Angolano

- **Pré-Escolar**: 1º ao 5º Ano (1-ano a 5-ano)
- **Ensino Primário**: 1ª à 6ª Classe (6-ano a 11-ano)
- **Ensino Médio I**: 7ª à 9ª Classe (12-ano a 14-ano)
- **Ensino Médio II**: 10ª à 13ª Classe (15-ano a 18-ano)

## Usuário Padrão

**Email:** admin@maraelu.co.ao  
**Senha:** admin123

*Importante: Altere a senha após o primeiro acesso!*

## Endpoints Principais

### Alunos
- `GET /api/alunos` - Listar todos os alunos
- `POST /api/alunos` - Criar novo aluno
- `GET /api/alunos/:id` - Buscar aluno por ID
- `PUT /api/alunos/:id` - Atualizar aluno
- `DELETE /api/alunos/:id` - Excluir aluno

### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registrar novo usuário

### Cursos
- `GET /api/cursos` - Listar cursos
- `POST /api/cursos` - Criar curso
- `GET /api/cursos/:id` - Buscar curso

### Inscrições
- `GET /api/inscricoes` - Listar inscrições
- `POST /api/inscricoes` - Criar inscrição
- `PUT /api/inscricoes/:id` - Atualizar inscrição

### Estatísticas
- `GET /api/stats` - Obter estatísticas do sistema

## Troubleshooting

### Erro de Conexão com Banco
1. Verifique as variáveis de ambiente
2. Confirme que o script SQL foi executado
3. Verifique se o banco está online no Railway

### Erro de Permissão
1. Verifique se o usuário MySQL tem permissões
2. Confirme as credenciais no Railway

### Deploy Falha
1. Verifique os logs no Railway
2. Confirme que todas as dependências estão no package.json
3. Verifique se o server.js está ouvindo a porta correta

## Próximos Passos

1. ✅ Criar banco de dados
2. ✅ Executar script SQL
3. ✅ Fazer deploy do backend
4. ⏳ Desenvolver telas administrativas
5. ⏳ Configurar upload de arquivos
6. ⏳ Implementar sistema de autenticação JWT
