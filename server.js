const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const savedData = [];

app.post('/guardar', (req, res) => {
    const { nombre, edad } = req.body;
    const currentTime = new Date();
    const formattedTime = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`;

    if (nombre === '1234' && edad === '1234') {
        const data = {
            nombre,
            edad,
            timestamp: formattedTime
        };

        savedData.push(data);
        console.log('Datos guardados:', data);
        res.status(201).json({ message: 'Datos guardados con éxito.' });
    } else {
        const errorMessage = 'Credenciales incorrectas. No se guardaron los datos.';
        res.status(401).json({ error: errorMessage });
    }
});

app.get('/mostrarDatos', (req, res) => {
    res.json(savedData);
});

app.delete('/borrar-datos', (req, res) => {
    savedData.length = 0;
    res.send('Datos borrados con éxito');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});