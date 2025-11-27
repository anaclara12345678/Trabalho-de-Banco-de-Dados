const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

// Rota 1: Listar todos os professores (para preencher o Dropdown no front)
router.get('/professores', (req, res) => {
    const sql = 'SELECT id_professor, nome FROM professor ORDER BY nome';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao buscar professores:', err);
            return res.status(500).json({ error: 'Erro no banco de dados' });
        }
        res.json(result);
    });
});

// Rota 2: Buscar a grade de um professor específico
router.get('/grade-professor/:id', (req, res) => {
    const id = req.params.id;
    
    // Usa a View que criamos no MySQL
    const sql = `
        SELECT disciplina, sala_numero, bloco, dia_semana, hora_inicio, hora_fim, ano, semestre
        FROM vw_alocacao_completa
        WHERE id_professor = ?
        ORDER BY ano DESC, semestre DESC, dia_semana, hora_inicio
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao buscar grade:', err);
            return res.status(500).json({ error: 'Erro no banco de dados' });
        }
        res.json(result);
    });
});

module.exports = router;