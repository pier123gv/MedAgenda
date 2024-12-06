import connection from '../config/db.js';

// Obtener todas las citas
export const getAllCitas = async (req, res) => {
  try {
    const [results] = await connection.query('SELECT * FROM citas');
    res.json(results);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Error fetching appointments' });
  }
};

// Agregar una nueva cita
export const addCita = async (req, res) => {
  const { fecha_hora_cita, id_paciente_invol, id_dr_encar, motivo, estado_cita } = req.body;

  const sql =
    'INSERT INTO citas (fecha_hora_cita, id_paciente_invol, id_dr_encar, motivo, estado_cita) VALUES (?, ?, ?, ?, ?)';
  
  try {
    const [result] = await connection.query(sql, [fecha_hora_cita, id_paciente_invol, id_dr_encar, motivo, estado_cita]);
    res.status(201).json({ message: 'Appointment created successfully', id: result.insertId });
  } catch (err) {
    console.error('Error adding appointment:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// Eliminar una cita
export const deleteCita = async (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM citas WHERE id_cita = ?';

  try {
    const [result] = await connection.query(sql, [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error('Error deleting appointment:', err);
    res.status(500).json({ error: 'Database error' });
  }
};