<?php
$conexion = @mysqli_connect('localhost', 'root', '');

if (!$conexion) {
    die("No se pudo conectar con el servidor: " . mysqli_connect_error());
}

$base = mysqli_select_db($conexion, 'formulario (prueba)');

if (!$base) {
    die("No se encontró la base de datos 'formulario (prueba)'");
}

$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
$correo = isset($_POST['correo']) ? $_POST['correo'] : '';
$mensaje = isset($_POST['mensaje']) ? $_POST['mensaje'] : '';

echo "DEBUG: Nombre: $nombre, Correo: $correo, Mensaje: $mensaje";

$sql = "INSERT INTO datos (nombre, correo, mensaje) VALUES (?, ?, ?)";
$statement = mysqli_prepare($conexion, $sql);

mysqli_stmt_bind_param($statement, "sss", $nombre, $correo, $mensaje);

$ejecutar = mysqli_stmt_execute($statement);

if (!$ejecutar) {
    echo "Hubo algún error: " . mysqli_error($conexion);
} else {
    echo "Datos guardados correctamente<br><a href='index.html'>Volver</a>";
}

mysqli_close($conexion);
?>
