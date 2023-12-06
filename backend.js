const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let postsGuardados = [];

app.post('/guardarPost', (req, res) => {
    const { author, title, message, timestamp } = req.body;
    postsGuardados.push({ author, title, message, timestamp });
    res.json({ status: 'Post guardado correctamente' });
});

app.get('/obtenerPosts', (req, res) => {
    res.json({ posts: postsGuardados });
});



app.delete('/eliminarAutor', (req, res) => {
    const authorToDelete = req.body.author;
    postsGuardados = postsGuardados.filter(post => post.author !== authorToDelete);
    res.json({ status: 'Autor y mensajes eliminados correctamente' });
});

app.put('/editarPost', (req, res) => {
    const { originalMessage, editedMessage } = req.body;
    const postAEditar = postsGuardados.find(post => post.message === originalMessage);
    if (postAEditar) {
        postAEditar.message = editedMessage;
        res.json({ status: 'Post editado correctamente' }); 
    } else {
        res.status(404).json({ status: 'Post no encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
