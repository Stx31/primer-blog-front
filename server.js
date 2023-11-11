const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.post('/guardar-mensaje', (req, res) => {
    const author = req.body.author;
    const title = req.body.title;
    const message = req.body.message;

    res.json({ author, title, message });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
