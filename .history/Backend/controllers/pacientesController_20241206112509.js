import connection from '../config/db.js';

// Obtener todos los pacientes
export const getAllPacientes = async (req, res) => {
  try {
    const [results] = await connection.query('SELECT * FROM pacientes');
    res.json(results);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Error fetching patients' });
  }
};


export const deletePaciente = async (req, res) => {
  const query = 'DELETE FROM pacientes WHERE id_paciente = ?'; // SQL query to delete a patient by ID
  const { id_paciente } = req.params; // Extract id_paciente from URL parameters

  try {
    const [result] = await pool.query(query, [id_paciente]); // Execute query using parameterized inputs

    if (result.affectedRows === 0) {
      // No rows were affected, meaning the patient does not exist
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    // Successful deletion
    return res.status(200).json({ message: 'Paciente eliminado exitosamente' });
  } catch (error) {
    console.error('Error deleting paciente:', error);
    return res.status(500).json({ message: 'Error al eliminar el paciente' });
  }
};



// Agregar un nuevo paciente
export const addPaciente = async (req, res) => {
  const {
    nombre1_paciente,
    nombre2_paciente,
    apellido1_paciente,
    apellido2_paciente,
    cedula_paciente,
    telefono_paciente,
    correo_paciente,
    direccion_paciente,
  } = req.body;

  const sql =
    'INSERT INTO pacientes (nombre1_paciente, nombre2_paciente, apellido1_paciente, apellido2_paciente, cedula_paciente, telefono_paciente, correo_paciente, direccion_paciente) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  try {
    const [result] = await connection.query(sql, [
      nombre1_paciente,
      nombre2_paciente,
      apellido1_paciente,
      apellido2_paciente,
      cedula_paciente,
      telefono_paciente,
      correo_paciente,
      direccion_paciente,
    ]);
    res.status(201).json({ message: 'Patient added successfully', id: result.insertId });
  } catch (err) {
    console.error('Error adding new patient:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// Obtener un paciente por su ID
export const getPacienteById = async (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM pacientes WHERE id_paciente = ?';

  try {
    const [results] = await connection.query(sql, [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching patient by ID:', error);
    res.status(500).json({ error: 'Error fetching patient' });
  }
};
