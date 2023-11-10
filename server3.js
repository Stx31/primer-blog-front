const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mensajes = [];

app.post('/guardar-mensaje', (req, res) => {
  const author = req.body.author;
  const title = req.body.title;
  const message = req.body.message;


  mensajes.push({ author, title, message });

  res.json({ message: 'Mensaje guardado con éxito' });
});

app.get('/obtener-autores', (req, res) => {
  
  const autores = mensajes.map(mensaje => mensaje.author);
  res.json(autores);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});