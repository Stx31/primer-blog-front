const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const savedData = [];

app.post('/guardar-datos', (req, res) => {
    const { nombre, edad } = req.body;

  
    if (nombre === '1234' && edad === '1234') {
        const successMessage = 'Credenciales correctas. Datos guardados con éxito.';
        res.status(201).json({ message: successMessage });
    } else {
        const errorMessage = 'Credenciales incorrectas. No se guardaron los datos.';
        res.status(401).json({ error: errorMessage });
    }
});

app.get('/obtener-datos', (req, res) => {
    res.json(savedData);
});

app.delete('/borrar-datos', (req, res) => {
    savedData.length = 0;
    res.send('Datos borrados con éxito');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
