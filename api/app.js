const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;
const cors = require('cors');

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'casomi_db'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');

    // Crear tabla si no existe
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS formData (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(50),
            apellido VARCHAR(50),
            dni VARCHAR(20)
        )
    `;
    db.query(createTableQuery, (err, result) => {
        if (err) {
            throw err;
        }
        console.log('Tabla creada o ya existe');
    });
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Ruta para manejar el envío del formulario
app.post('/api/form', (req, res) => {
    const { nombre, apellido, dni } = req.body;
    const sql = 'INSERT INTO formData (nombre, apellido, dni) VALUES (?, ?, ?)';
    db.query(sql, [nombre, apellido, dni], (err, result) => {
        if (err) {
            return res.status(500).send('Error al guardar los datos');
        }
        res.status(200).send('Datos guardados con éxito');
    });
});

app.get('/api/form',(req,res)=>{
    
})

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
