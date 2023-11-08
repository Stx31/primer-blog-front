const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database("login.db");


db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)"
  );
});


app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  res.status(200).json({ message: "Inicio de sesión exitoso" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor Node.js corriendo en el puerto ${port}`);
});
