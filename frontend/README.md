# Frontend - Sistema de Inscrições

Deploy do frontend React no Vercel.

## Configuração de Deploy

### 1. Vercel (Recomendado)

1. Crie conta em [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente:
   - `REACT_APP_API_URL`: URL do seu backend no Railway

### 2. Build Command
```bash
npm run build
```

### 3. Output Directory
```
build
```

## Variáveis de Ambiente

No painel do Vercel, adicione:
- `REACT_APP_API_URL` = `https://sua-url-backend.up.railway.app`

## Deploy Automático

O Vercel vai fazer deploy automático sempre que você fazer push para o GitHub.

## URLs

- Backend (Railway): `https://seu-projeto.up.railway.app`
- Frontend (Vercel): `https://seu-projeto.vercel.app`
