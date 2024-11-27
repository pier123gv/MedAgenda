import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2486',
  port: '3306',
  database: 'MedAgendaDB',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

export default connection;
