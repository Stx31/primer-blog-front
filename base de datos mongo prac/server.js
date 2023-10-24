
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;


mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/', (req, res) => {

  res.send('<h1>Conexión a la base de datos exitosa.</h1>');
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
