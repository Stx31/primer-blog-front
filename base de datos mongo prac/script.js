const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./User'); // Importa el modelo de usuario
const ejs = require('ejs'); // Agrega el motor de plantillas EJS

const app = express();
app.use(express.json());
app.set('view engine', 'ejs'); 


mongoose.connect('mongodb://localhost:27017/your-database', { useNewUrlParser: true });


app.get('/register', (req, res) => {
    res.render('register'); 
});

app.get('/login', (req, res) => {
    res.render('login');
});


app.listen(3000, () => {
    console.log('Servidor en ejecución en el puerto 3000');
});
