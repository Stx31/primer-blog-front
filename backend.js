const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let mensajesGuardados = [];

app.post('/guardarMensaje', (req, res) => {
    const { author, title, message, timestamp } = req.body;
    mensajesGuardados.push({ author, title, message, timestamp });
    res.json({ status: 'Mensaje guardado correctamente' });
});

app.get('/obtenerMensajes', (req, res) => {
    res.json({ mensajes: mensajesGuardados });
});

app.delete('/eliminarMensaje', (req, res) => {
    const mensajeAEliminar = req.body.message;
    mensajesGuardados = mensajesGuardados.filter(mensaje => mensaje.message !== mensajeAEliminar);
    res.json({ status: 'Mensaje eliminado correctamente' });
});

app.put('/editarMensaje', (req, res) => {
    const { originalMessage, editedMessage } = req.body;
    const mensajeAEditar = mensajesGuardados.find(mensaje => mensaje.message === originalMessage);
    if (mensajeAEditar) {
        mensajeAEditar.message = editedMessage;
        res.json({ status: 'Mensaje editado correctamente' });
    } else {
        res.status(404).json({ status: 'Mensaje no encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
