# Comanda na Mão V6 - Setup Local

## Pré-requisitos

1. **Node.js** (já instalado: v24.14.0) ✅
2. **PostgreSQL** - precisa ser instalado
3. **Docker Desktop** - opcional, para facilitar o setup do banco

## Opções para PostgreSQL

### Opção 1: Docker (Recomendado)
1. Instale Docker Desktop para Windows
2. Execute: `docker-compose up -d`
3. O banco estará disponível em localhost:5432

### Opção 2: PostgreSQL Local
1. Baixe e instale PostgreSQL para Windows
2. Crie um banco de dados chamado "comandanamao"
3. Use usuário: postgres, senha: 123456

## Setup do Projeto

### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Bridge de Impressão
```bash
cd printer-bridge-real
npm install
npm start
```

## Acesso

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Printer Bridge: http://localhost:3210

## Usuário Padrão

- Email: admin@comandanamao.local
- Senha: 123456

## Estrutura do Projeto

- **backend/**: API Node.js + Express + Prisma
- **frontend/**: React + Vite + TailwindCSS
- **printer-bridge-real/**: Servidor de impressão térmica
