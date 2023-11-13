const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const datos = []; 

app.post('/guardar', (req, res) => {
    const nuevoDato = req.body;
    datos.push(nuevoDato);
    res.json({ message: 'Dato guardado con éxito' });
});

app.get('/recuperar', (req, res) => {
    res.json(datos);
});

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
