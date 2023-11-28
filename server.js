const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let data = [];

app.get('/obtener-datos', (req, res) => {
   
    res.json(data);
});

app.post('/guardar-datos', (req, res) => {
    const newData = req.body;
    data.push(newData);
    console.log('Datos guardados:', newData);
    res.json({ mensaje: 'Datos guardados correctamente' });
});

app.delete('/borrar-datos', (req, res) => {
   
    data = [];
    console.log('Datos borrados');
    res.json({ mensaje: 'Datos borrados correctamente' });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
