import express from 'express';
import professoresRouter from './professores.js';
import disciplinasRouter from './disciplinas.js';
import salasRouter from './salas.js';
import horariosRouter from './horarios.js';
import periodosRouter from './periodos.js';
import alocacoesRouter from './alocacoes.js';

const router = express.Router();

router.use('/professores', professoresRouter);
router.use('/disciplinas', disciplinasRouter);
router.use('/salas', salasRouter);
router.use('/horarios', horariosRouter);
router.use('/periodos', periodosRouter);
router.use('/alocacoes', alocacoesRouter);

export default router;
