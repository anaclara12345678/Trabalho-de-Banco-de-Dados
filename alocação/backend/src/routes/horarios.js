import express from 'express';
import { pool } from '../db.js';
const router = express.Router();

router.get('/', async (req,res)=> {
  const [rows] = await pool.query('SELECT * FROM horarios ORDER BY id');
  res.json(rows);
});

router.post('/', async (req,res)=> {
  const { dia, inicio, fim } = req.body;
  await pool.query('INSERT INTO horarios (dia,inicio,fim) VALUES (?, ?, ?)', [dia,inicio,fim]);
  res.json({ success:true });
});

router.put('/:id', async (req,res)=> {
  const { dia, inicio, fim } = req.body;
  await pool.query('UPDATE horarios SET dia=?,inicio=?,fim=? WHERE id=?', [dia,inicio,fim, req.params.id]);
  res.json({ success:true });
});

router.delete('/:id', async (req,res)=> {
  await pool.query('DELETE FROM horarios WHERE id=?', [req.params.id]);
  res.json({ success:true });
});

export default router;
