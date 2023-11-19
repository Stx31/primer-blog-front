<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre = $_POST["nombre"];
    $correo = $_POST["correo"];
    $mensaje = $_POST["mensaje"];
    $fechaHora = date("Y-m-d H:i:s");

    // $conexion = new mysqli("tu_servidor", "tu_usuario", "tu_contraseña", "tu_base_de_datos");

    // Si hubiera un error de conexión
    // if ($conexion->connect_error) {
    //     die("Conexión fallida: " . $conexion->connect_error);
    // }

    
    // (Reemplazar con el código real de inserción)
    // $sql = "INSERT INTO tu_tabla (nombre, correo, mensaje, fechaHora) VALUES ('$nombre', '$correo', '$mensaje', '$fechaHora')";
    // if ($conexion->query($sql) === TRUE) {
    //     echo "Datos guardados correctamente";
    // } else {
    //     echo "Error al guardar datos: " . $conexion->error;
    // }
    // $conexion->close();
    $respuesta = [
        "status" => "success",
        "message" => "Datos guardados correctamente",
        "data" => [
            "nombre" => $nombre,
            "correo" => $correo,
            "mensaje" => $mensaje,
            "fechaHora" => $fechaHora
        ]
    ];

    header('Content-Type: application/json');
    echo json_encode($respuesta);
} else {
    
    header("HTTP/1.1 405 Method Not Allowed");
    echo "Method Not Allowed";
}

?>
