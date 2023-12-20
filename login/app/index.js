import express from "express";
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication } from "./controllers/authentication.controller.js";
import { methods as authorization } from "./middlewares/authorization.js";

// Server
const app = express();
const port = process.env.PORT || 4000;
app.set('port', port);

app.listen(port, () => {
  console.log('Servidor corriendo en el puerto', port);
});

// Configuración
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rutas
app.get("/", authorization.soloPublico, (req, res) => res.sendFile(path.join(__dirname, 'pages', 'login.html')));
app.get("/register", authorization.soloPublico, (req, res) => res.sendFile(path.join(__dirname, 'pages', 'register.html')));
app.get("/admin", authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, 'pages', 'admin', 'admin.html')));
app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});
