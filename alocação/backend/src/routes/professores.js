import express from 'express';
import { pool } from '../db.js';
const router = express.Router();

router.get('/', async (req,res) => {
  const [rows] = await pool.query('SELECT * FROM professores ORDER BY nome');
  res.json(rows);
});

router.get('/:id', async (req,res) => {
  const [rows] = await pool.query('SELECT * FROM professores WHERE id = ?', [req.params.id]);
  res.json(rows[0] || null);
});

router.post('/', async (req,res) => {
  const { nome, email, telefone, departamento } = req.body;
  await pool.query('INSERT INTO professores (nome,email,telefone,departamento) VALUES (?, ?, ?, ?)', [nome,email,telefone,departamento]);
  res.json({ success:true });
});

router.put('/:id', async (req,res) => {
  const { nome, email, telefone, departamento } = req.body;
  await pool.query('UPDATE professores SET nome=?,email=?,telefone=?,departamento=? WHERE id=?', [nome,email,telefone,departamento, req.params.id]);
  res.json({ success:true });
});

router.delete('/:id', async (req,res) => {
  await pool.query('DELETE FROM professores WHERE id=?', [req.params.id]);
  res.json({ success:true });
});

export default router;
