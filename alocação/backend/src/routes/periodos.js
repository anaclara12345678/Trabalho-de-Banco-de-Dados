import express from 'express';
import { pool } from '../db.js';
const router = express.Router();

router.get('/', async (req,res)=> {
  const [rows] = await pool.query('SELECT * FROM periodos ORDER BY ano DESC, semestre DESC');
  res.json(rows);
});

router.post('/', async (req,res)=> {
  const { ano, semestre } = req.body;
  await pool.query('INSERT INTO periodos (ano,semestre) VALUES (?, ?)', [ano,semestre]);
  res.json({ success:true });
});

router.put('/:id', async (req,res)=> {
  const { ano, semestre } = req.body;
  await pool.query('UPDATE periodos SET ano=?,semestre=? WHERE id=?', [ano,semestre, req.params.id]);
  res.json({ success:true });
});

router.delete('/:id', async (req,res)=> {
  await pool.query('DELETE FROM periodos WHERE id=?', [req.params.id]);
  res.json({ success:true });
});

export default router;
