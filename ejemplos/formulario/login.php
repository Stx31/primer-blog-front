<?php
$conexion = @mysqli_connect('localhost', 'root', '');

if (!$conexion) {
    die("No se pudo conectar con el servidor: " . mysqli_connect_error());
}

$base = mysqli_select_db($conexion, 'formulario (prueba)');

if (!$usuarios) {
    die("No se encontró la base de datos 'formulario (prueba)'");
}

$username = isset($_POST['username']) ? $_POST['username'] : '';
$contraseña = isset($_POST['contraseña']) ? $_POST['contraseña'] : '';


$sql = "INSERT INTO datos (nombre, correo, mensaje) VALUES (?, ?, ?)";
$statement = mysqli_prepare($conexion, $sql);

mysqli_stmt_bind_param($statement, "sss", $username, $contraseña );

$ejecutar = mysqli_stmt_execute($statement);

if (!$ejecutar) {
    echo "Hubo algún error: " . mysqli_error($conexion);
} else {
    mysqli_close($conexion);
   exit();
}
?>
