const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let messages = [];

app.post('/saveData', (req, res) => {
    const { author, title, message } = req.body;
    messages.push({ author, title, message });
    res.status(200).json({ success: true, message: 'Mensaje guardado correctamente' });
});

app.delete('/deleteData', (req, res) => {
    messages = [];
    res.status(200).json({ success: true, message: 'Datos borrados correctamente' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});