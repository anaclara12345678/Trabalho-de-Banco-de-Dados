import express from 'express';
import { pool } from '../db.js';
const router = express.Router();

// listar alocações com joins
router.get('/', async (req,res) => {
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
  const [rows] = await pool.query(sql);
  res.json(rows);
});

// criar alocação com verificações:
// - sala não pode estar ocupada no mesmo horario+periodo
// - professor não pode ter outra alocação no mesmo horario+periodo
router.post('/', async (req,res) => {
  const { professor_id, disciplina_id, sala_id, horario_id, periodo_id, observacoes } = req.body;
  if (!professor_id || !disciplina_id || !sala_id || !horario_id || !periodo_id) return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  try {
    // conflito sala
    const [[sC]] = await pool.query('SELECT COUNT(*) as c FROM alocacoes WHERE sala_id=? AND horario_id=? AND periodo_id=?', [sala_id, horario_id, periodo_id]);
    if (sC.c > 0) return res.status(409).json({ error: 'Conflito: sala já ocupada nesse horário/período' });

    // conflito professor
    const [[pC]] = await pool.query('SELECT COUNT(*) as c FROM alocacoes WHERE professor_id=? AND horario_id=? AND periodo_id=?', [professor_id, horario_id, periodo_id]);
    if (pC.c > 0) return res.status(409).json({ error: 'Conflito: professor já tem alocação nesse horário/período' });

    // opcional: checar capacidade da sala vs. alguma informação — deixamos para você estender
    await pool.query('INSERT INTO alocacoes (professor_id,disciplina_id,sala_id,horario_id,periodo_id,observacoes) VALUES (?, ?, ?, ?, ?, ?)', [professor_id,disciplina_id,sala_id,horario_id,periodo_id,observacoes]);
    res.json({ success:true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno' });
  }
});

router.delete('/:id', async (req,res) => {
  await pool.query('DELETE FROM alocacoes WHERE id=?', [req.params.id]);
  res.json({ success:true });
});

export default router;
