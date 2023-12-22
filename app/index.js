import express from "express";
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication } from "./controllers/authentication.controller.js";
import { methods as authorization } from "./middlewares/authorization.js";

const app = express();
const port = process.env.PORT || 4000;
app.set('port', port);

let messages = [];

app.listen(port, () => {
    console.log('Servidor corriendo en el puerto', port);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rutas
app.get("/", authorization.soloPublico, (req, res) => res.sendFile(path.join(__dirname, 'pages', 'login.html')));
app.get("/register", authorization.soloPublico, (req, res) => res.sendFile(path.join(__dirname, 'pages', 'register.html')));
app.get("/admin", authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, 'pages', 'admin', 'admin.html')));
app.get("/reg", authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, 'pages', 'admin', 'reg.html')));
app.get("/autores", authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, 'pages', 'admin', 'autores.html')));

app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);

// Rutas para mensajes
app.post("/api/messages", (req, res) => {
    const { author, title, message, dateTime } = req.body;
    const newMessage = { author, title, message, dateTime, messageId: messages.length };
    messages.push(newMessage);

    res.json({ success: true, messages: messages });
});

app.delete("/api/messages/:messageId", (req, res) => {
    const { messageId } = req.params;
    const index = messages.findIndex(msg => msg.messageId == messageId);

    if (index !== -1) {
        messages.splice(index, 1);
        res.json({ success: true, messages: messages });
    } else {
        res.status(400).json({ success: false, message: 'Mensaje no encontrado' });
    }
});

app.get("/api/messages", (req, res) => {
    res.json({ success: true, messages: messages });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});
