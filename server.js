
const datos = {}
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Message = require('./models/messageModel');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/tu-base-de-datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.post('/guardar-mensaje', async (req, res) => {
  try {
    const { author, title, message } = req.body;
    const newMessage = new Message({ author, title, message });
    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`El servidor está en funcionamiento en el puerto ${port}`);
});
