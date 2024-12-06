import express from 'express';
import { getAllDoctores, addDoctor, eliminarDoctor } from '../controllers/doctoresController.js';

const router = express.Router();

router.get('/', getAllDoctores);
router.post('/', addDoctor);
router.delete('/eliminar/:correo', eliminarDoctor);

export default router;
