const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const savedData = [];

app.post('/guardar', (req, res) => {
    const { author, title, message } = req.body;
    const currentTime = new Date();
    const formattedTime = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`;

    const data = {
        author,
        title,
        message,
        timestamp: formattedTime
    };

    savedData.push(data);
    console.log('Datos guardados:', data);
    res.status(201).json({ message: 'Datos guardados con éxito.' });
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
