import express from 'express';
import { pool } from '../db.js';
const router = express.Router();

router.get('/', async (req,res)=> {
  const [rows] = await pool.query('SELECT * FROM salas ORDER BY nome');
  res.json(rows);
});

router.post('/', async (req,res)=> {
  const { nome, capacidade, tipo, recursos } = req.body;
  await pool.query('INSERT INTO salas (nome,capacidade,tipo,recursos) VALUES (?, ?, ?, ?)', [nome,capacidade,tipo,recursos]);
  res.json({ success:true });
});

router.put('/:id', async (req,res)=> {
  const { nome, capacidade, tipo, recursos } = req.body;
  await pool.query('UPDATE salas SET nome=?,capacidade=?,tipo=?,recursos=? WHERE id=?', [nome,capacidade,tipo,recursos, req.params.id]);
  res.json({ success:true });
});

router.delete('/:id', async (req,res)=> {
  await pool.query('DELETE FROM salas WHERE id=?', [req.params.id]);
  res.json({ success:true });
});

export default router;
