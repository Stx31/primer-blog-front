const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let mensajesGuardados = [];

app.post('/guardarMensaje', (req, res) => {
    const { author, title, message } = req.body;
    console.log('Mensaje recibido:', { author, title, message });

    mensajesGuardados.push({ author, title, message });

    res.json({ status: 'Mensaje guardado correctamente' });
});

app.get('/obtenerMensajes', (req, res) => {
    res.json({ mensajes: mensajesGuardados });
});

app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
});

app.delete('/eliminarMensaje', (req, res) => {
    const mensajeAEliminar = req.body.message;
    
    mensajesGuardados = mensajesGuardados.filter(mensaje => mensaje.message !== mensajeAEliminar);
    
    res.json({ status: 'Mensaje eliminado correctamente' });
});