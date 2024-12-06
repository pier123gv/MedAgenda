import express from 'express';
import { 
  getAllPacientes, 
  addPaciente, 
  getPacienteById, 
  deletePaciente // Import the deletePaciente controller
} from '../controllers/pacientesController.js';

const router = express.Router();

router.get('/', getAllPacientes);       // Get all patients
router.post('/', addPaciente);          // Add a new patient
router.get('/:id', getPacienteById);    // Get a patient by ID
router.delete('deletePaciente/:id', deletePaciente);  // Delete a patient by ID (new endpoint)

export default router;
