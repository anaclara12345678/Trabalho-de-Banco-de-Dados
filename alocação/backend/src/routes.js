// src/routes.js
const express = require('express');
const router = express.Router();
const dbmod = require('./db');
const pool = dbmod.pool;
dbmod.init().catch(err => console.error('DB init error', err));

async function q(sql, params=[]) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

// Professores
router.get('/professores', async (req,res) => res.json(await q('SELECT * FROM professores ORDER BY nome')));
router.post('/professores', async (req,res) => {
  const { nome, email, telefone, departamento } = req.body;
  await q('INSERT INTO professores (nome,email,telefone,departamento) VALUES (?, ?, ?, ?)', [nome,email,telefone,departamento]);
  res.json({ success:true });
});
router.delete('/professores/:id', async (req,res) => { await q('DELETE FROM professores WHERE id = ?', [req.params.id]); res.json({ success:true }); });

// Disciplinas
router.get('/disciplinas', async (req,res) => res.json(await q('SELECT * FROM disciplinas ORDER BY nome')));
router.post('/disciplinas', async (req,res) => {
  const { codigo, nome, curso, periodo, carga_horaria } = req.body;
  await q('INSERT INTO disciplinas (codigo,nome,curso,periodo,carga_horaria) VALUES (?, ?, ?, ?, ?)', [codigo,nome,curso,periodo,carga_horaria]);
  res.json({ success:true });
});
router.delete('/disciplinas/:id', async (req,res) => { await q('DELETE FROM disciplinas WHERE id = ?', [req.params.id]); res.json({ success:true }); });

// Salas
router.get('/salas', async (req,res) => res.json(await q('SELECT * FROM salas ORDER BY nome')));
router.post('/salas', async (req,res) => {
  const { nome, capacidade, tipo, recursos } = req.body;
  await q('INSERT INTO salas (nome,capacidade,tipo,recursos) VALUES (?, ?, ?, ?)', [nome,capacidade,tipo,recursos]);
  res.json({ success:true });
});
router.delete('/salas/:id', async (req,res) => { await q('DELETE FROM salas WHERE id = ?', [req.params.id]); res.json({ success:true }); });

// Horários
router.get('/horarios', async (req,res) => res.json(await q('SELECT * FROM horarios ORDER BY id')));
router.post('/horarios', async (req,res) => {
  const { dia, inicio, fim } = req.body;
  await q('INSERT INTO horarios (dia,inicio,fim) VALUES (?, ?, ?)', [dia,inicio,fim]);
  res.json({ success:true });
});
router.delete('/horarios/:id', async (req,res) => { await q('DELETE FROM horarios WHERE id = ?', [req.params.id]); res.json({ success:true }); });

// Periodos
router.get('/periodos', async (req,res) => res.json(await q('SELECT * FROM periodos ORDER BY ano DESC')));
router.post('/periodos', async (req,res) => {
  const { ano, semestre } = req.body;
  await q('INSERT INTO periodos (ano,semestre) VALUES (?, ?)', [ano,semestre]);
  res.json({ success:true });
});
router.delete('/periodos/:id', async (req,res) => { await q('DELETE FROM periodos WHERE id = ?', [req.params.id]); res.json({ success:true }); });

// Alocações (com regra: impedir conflito sala+horario+periodo)
router.get('/alocacoes', async (req,res) => {
  const sql = `SELECT a.id, a.observacoes,
    p.id as professor_id, p.nome as professor_nome,
    d.id as disciplina_id, d.nome as disciplina_nome, d.codigo as disciplina_codigo,
    s.id as sala_id, s.nome as sala_nome,
    h.id as horario_id, h.dia as horario_dia, h.inicio as horario_inicio, h.fim as horario_fim,
    per.id as periodo_id, per.ano as periodo_ano, per.semestre as periodo_semestre
    FROM alocacoes a
    LEFT JOIN professores p ON a.professor_id = p.id
    LEFT JOIN disciplinas d ON a.disciplina_id = d.id
    LEFT JOIN salas s ON a.sala_id = s.id
    LEFT JOIN horarios h ON a.horario_id = h.id
    LEFT JOIN periodos per ON a.periodo_id = per.id
  `;
  res.json(await q(sql));
});

router.post('/alocacoes', async (req,res) => {
  const { professor_id, disciplina_id, sala_id, horario_id, periodo_id, observacoes } = req.body;
  // Regra básica: mesma sala + mesmo horário + mesmo período => conflito
  const conflict = await q('SELECT COUNT(*) as c FROM alocacoes WHERE sala_id = ? AND horario_id = ? AND periodo_id = ?', [sala_id, horario_id, periodo_id]);
  if (conflict[0].c > 0) return res.status(409).json({ error: 'Conflito: sala já ocupada nesse horário/período' });
  await q('INSERT INTO alocacoes (professor_id,disciplina_id,sala_id,horario_id,periodo_id,observacoes) VALUES (?, ?, ?, ?, ?, ?)', [professor_id,disciplina_id,sala_id,horario_id,periodo_id,observacoes]);
  res.json({ success:true });
});

router.delete('/alocacoes/:id', async (req,res) => {
  await q('DELETE FROM alocacoes WHERE id = ?', [req.params.id]);
  res.json({ success:true });
});

module.exports = router;
