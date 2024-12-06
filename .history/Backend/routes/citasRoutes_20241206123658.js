import express from 'express';
import { getAllCitas, addCita, deleteCita } from '../controllers/citasController.js';

const router = express.Router();

router.get('/', getAllCitas);
router.post('/', addCita);
router.delete('/:id', deleteCita); // New DELETE route

export default router;
