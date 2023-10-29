from flask import Flask, request, render_template
import sqlite3

app = Flask(__name__)


conn = sqlite3.connect('registro.db')
cursor = conn.cursor()


cursor.execute('''
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY,
        nombre TEXT,
        email TEXT,
        contrasena TEXT
    )
''')
conn.commit()

@app.route('/')
def formulario_registro():
    return render_template('registro.html')

@app.route('/registrar', methods=['POST'])
def registrar_usuario():
    nombre = request.form['nombre']
    email = request.form['email']
    contrasena = request.form['contrasena']
    cursor.execute("INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)", (nombre, email, contrasena))
    conn.commit()
    return "Usuario registrado con éxito. <a href='/ver_usuarios'>Ver usuarios</a>"

@app.route('/ver_usuarios')
def ver_usuarios():
    cursor.execute("SELECT * FROM usuarios")
    usuarios = cursor.fetchall()
    return render_template('ver_usuarios.html', usuarios=usuarios)

if __name__ == '__main__':
    app.run(debug=True)
