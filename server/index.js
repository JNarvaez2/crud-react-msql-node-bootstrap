const express = require('express');
const app = express();
const msql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = msql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'empleados_crud'
});

app.post('/create', (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const edad = req.body.edad;
    const correo = req.body.correo;

    db.query('INSERT INTO empleado (nombre, apellido, edad, correo) VALUES (?,?,?,?)', [nombre, apellido, edad, correo], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Empleado registrado exitosamente');
        }
    });
});
app.get('/empleado', (req, res) => {

    db.query('SELECT * FROM empleado', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.put('/update', (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const edad = req.body.edad;
    const correo = req.body.correo;

    db.query('UPDATE empleado SET nombre=?, apellido=?, edad=?, correo=? WHERE id=?', [nombre, apellido, edad, correo,id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Empleado actualizado exitosamente');
        }
    });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM empleado WHERE id=?', id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Empleado eliminado exitosamente');
        }
    });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});