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
  const pacienteId = req.params.id;
  console.log(`Deleting patient with ID: ${pacienteId}`);

  try {
    // Disable foreign key checks
    await connection.execute('SET FOREIGN_KEY_CHECKS = 0');

    // Perform the delete operation
    const deletePacienteQuery = 'DELETE FROM pacientes WHERE id_paciente = ?';
    const [result] = await connection.execute(deletePacienteQuery, [pacienteId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Re-enable foreign key checks
    await connection.execute('SET FOREIGN_KEY_CHECKS = 1');

    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    
    // Re-enable foreign key checks in case of error
    await connection.execute('SET FOREIGN_KEY_CHECKS = 1');

    res.status(500).json({ message: 'Failed to delete patient' });
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
