const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const savedData = []; 

app.post('/guardar-datos', (req, res) => {
    const { author, title, message } = req.body;

  
    savedData.push({ author, title, message });
    
    res.json({ message: 'Mensaje guardado con éxito' });
});

app.get('/obtener-datos', (req, res) => {
    
    res.json(savedData);
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
