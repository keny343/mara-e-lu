# Guia de Deploy no Railway

## Pré-requisitos
- Conta no Railway
- Git instalado
- Projeto no GitHub

## Passos para Deploy

### 1. Preparar o Repositório

Certifique-se que todos os arquivos estão commitados:

```bash
git add .
git commit -m "Adicionando telas administrativas e configuração Railway"
git push origin main
```

### 2. Configurar Projeto no Railway

1. Acesse [railway.app](https://railway.app)
2. Clique em "New Project" → "Deploy from GitHub repo"
3. Selecione seu repositório
4. Railway vai detectar automaticamente o projeto Node.js

### 3. Configurar Banco de Dados MySQL

1. No projeto Railway, vá para "Settings" → "Variables"
2. Adicione as seguintes variáveis de ambiente:

```bash
MYSQL_ROOT_PASSWORD=sua_senha_forte_aqui
MYSQL_DATABASE=sistema_inscricoes
DATABASE_URL=mysql://root:${MYSQL_ROOT_PASSWORD}@mysql:3306/sistema_inscricoes
MYSQLHOST=mysql
MYSQLUSER=root
MYSQLPASSWORD=${MYSQL_ROOT_PASSWORD}
MYSQLDATABASE=sistema_inscricoes
MYSQLPORT=3306
JWT_SECRET=sua_chave_secreta_muito_forte_aqui
JWT_EXPIRES_IN=7d
PORT=8080
NODE_ENV=production
```

### 4. Adicionar Serviço MySQL

1. Vá para "New" → "Service"
2. Selecione "MySQL" (ou use o plugin MySQL)
3. Configure com as mesmas variáveis de ambiente

### 5. Executar Schema SQL

1. Após o deploy do MySQL, acesse o serviço MySQL
2. Use o MySQL Client ou ferramenta similar
3. Execute o conteúdo do arquivo `database/schema.sql`

### 6. Deploy do Frontend (Opcional)

O frontend pode ser deployado separadamente:
1. Vá para "New" → "Service"
2. Selecione o repositório novamente
3. Configure como serviço estático (Static Site)
4. Configure a variável `REACT_APP_API_URL` com a URL do backend

### 7. Acessar a Aplicação

Após o deploy:
- Backend: `https://seu-projeto-backend.up.railway.app`
- Frontend: `https://seu-projeto-frontend.up.railway.app` (se configurado)

### 8. Testar

1. Acesse a URL do backend
2. Teste o endpoint: `https://sua-url.up.railway.app/`
3. Faça login no painel admin:
   - URL: `https://sua-url-frontend.up.railway.app/login`
   - Email: `admin@sistema.com`
   - Senha: `admin123`

## Troubleshooting

### Erro de Conexão com Banco
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o serviço MySQL está rodando
- Teste a conexão manualmente

### Build Falha
- Verifique o `package.json` e dependências
- Confirme se o `Procfile` está correto
- Verifique os logs de build no Railway

### Frontend não Conecta
- Configure `REACT_APP_API_URL` corretamente
- Verifique CORS no backend
- Confirme se as rotas estão protegidas

## URLs Úteis

- Dashboard Railway: `https://railway.app`
- Seu Projeto: `https://railway.app/project/seu-projeto`
- Logs: `https://railway.app/project/seu-projeto/logs`

## Próximos Passos

1. Configurar domínio personalizado
2. Adicionar SSL (já vem com Railway)
3. Configurar monitoramento
4. Adicionar backups automáticos
