<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario</title>
    <link rel="stylesheet" href="style.reg.css">
</head>
<body>
    <div class="header">
        <h1>Formulario</h1>
    </div>

    <div class="container">
        <div class="caja">
            <div class="titulo">
                <h3>Ingresa los datos</h3>
            </div>
            <hr>
            <form id="formularioContacto" action="/guardar-mensaje.php" method="post">
                <input type="text" id="emailInput" name="author" placeholder="Autor" required>
                <input type text="id" name="title" placeholder="Título" required>
                <textarea id="messageInput" name="message" placeholder="Mensaje" required></textarea>
                <button id="guardarMensaje" type="submit">Guardar Mensaje</button>
                <button id="cancelar" type="button">Cancelar</button>
              </form>
        </div>
    </div>

<script src="reg.js"></script>
</body>
</html>
