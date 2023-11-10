const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/procesar-formulario', (req, res) => {
  const formData = req.body;
  res.json(formData);
});

app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});

