# Configuração do Projeto no Railway

## 1. Configurar Banco de Dados MySQL

No Railway:
1. Crie um novo projeto ou use o existente
2. Adicione um serviço MySQL (MySQL Plugin)
3. Configure as variáveis de ambiente:
   - `MYSQL_ROOT_PASSWORD`: senha root do MySQL
   - `MYSQL_DATABASE`: sistema_inscricoes

## 2. Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no Railway:

### Banco de Dados
- `DATABASE_URL`: mysql://root:${MYSQL_ROOT_PASSWORD}@mysql:3306/sistema_inscricoes
- `MYSQLHOST`: mysql
- `MYSQLUSER`: root
- `MYSQLPASSWORD`: ${MYSQL_ROOT_PASSWORD}
- `MYSQLDATABASE`: sistema_inscricoes
- `MYSQLPORT`: 3306

### JWT
- `JWT_SECRET`: sua_chave_secreta_aqui
- `JWT_EXPIRES_IN`: 7d

### Servidor
- `PORT`: 8080
- `NODE_ENV`: production

## 3. Deploy do Backend

1. O Railway vai automaticamente detectar o package.json
2. Vai instalar as dependências
3. Vai iniciar o servidor com `npm start`

## 4. Executar Schema SQL

Após o deploy do banco de dados:
1. Acesse o MySQL no Railway
2. Execute o conteúdo do arquivo `database/schema.sql`

## 5. Deploy do Frontend

O frontend deve ser configurado separadamente ou como um serviço estático.

## 6. Acessar a Aplicação

- Backend: https://seu-projeto.up.railway.app
- API: https://seu-projeto.up.railway.app/api

## Credenciais Iniciais

- Admin: admin@sistema.com / admin123
- Secretaria: secretaria@sistema.com / secret123
