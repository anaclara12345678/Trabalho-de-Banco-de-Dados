import express from 'express';
import cors from 'cors';
import routes from './src/routes/index.js';
import { init } from './src/db.js';
import dotenv from 'dotenv';
dotenv.config();
console.log("Senha carregada:", process.env.DB_PASSWORD);

const app = express();
app.use(cors());
app.use(express.json());

// Inicializa DB (cria tabelas e seeds)
await init();

app.use('/api', routes);

app.get('/', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);
