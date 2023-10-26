<?php
$conexion = new mysqli("localhost", "usuario", "contrasena", "nombre_base_de_datos");

if ($conexion->connect_error) {
    die("Conexión a la base de datos fallida: " . $conexion->connect_error);
}

$data = json_decode(file_get_contents("php://input"));

$nombre = $conexion->real_escape_string($data->nombre);
$email = $conexion->real_escape_string($data->email);
$contrasena = $conexion->real_escape_string($data->contrasena);

$query = "INSERT INTO usuarios (nombre, email, contrasena) VALUES ('$nombre', '$email', '$contrasena')";

if ($conexion->query($query) === TRUE) {
    $response = array('message' => 'Registro exitoso');
} else {
    $response = array('message' => 'Error al registrar: ' . $conexion->error);
}

echo json_encode($response);

$conexion->close();
?>
