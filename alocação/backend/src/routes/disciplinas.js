import express from 'express';
import { pool } from '../db.js';
const router = express.Router();

router.get('/', async (req,res)=> {
  const [rows] = await pool.query('SELECT * FROM disciplinas ORDER BY nome');
  res.json(rows);
});

router.post('/', async (req,res)=> {
  const { codigo, nome, curso, periodo, carga_horaria } = req.body;
  await pool.query('INSERT INTO disciplinas (codigo,nome,curso,periodo,carga_horaria) VALUES (?, ?, ?, ?, ?)', [codigo, nome, curso, periodo, carga_horaria]);
  res.json({ success:true });
});

router.put('/:id', async (req,res)=> {
  const { codigo, nome, curso, periodo, carga_horaria } = req.body;
  await pool.query('UPDATE disciplinas SET codigo=?,nome=?,curso=?,periodo=?,carga_horaria=? WHERE id=?', [codigo,nome,curso,periodo,carga_horaria, req.params.id]);
  res.json({ success:true });
});

router.delete('/:id', async (req,res)=> {
  await pool.query('DELETE FROM disciplinas WHERE id=?', [req.params.id]);
  res.json({ success:true });
});

export default router;
