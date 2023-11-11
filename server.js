const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/guardar-mensaje', (req, res) => {
  const { author, title, message } = req.body;

  console.log(`Autor: ${author}, Título: ${title}, Mensaje: ${message}`);
  res.json({ message: 'Mensaje guardado correctamente' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
