const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const savedData = []; 

app.post('/guardar-datos', (req, res) => {
    const { author, title, message } = req.body;

    savedData.push({ author, title, message });


    const successMessage = 'Datos guardados con éxito. Datos actuales: ' + JSON.stringify(savedData);
    res.status(201).send(successMessage);
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
