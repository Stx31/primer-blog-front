<?php
$servidor = "localhost";
$usuario = "root";
$clave = "";
$nombreBaseDatos = "test";


$conn = new mysqli($servidor, $usuario, $clave, $nombreBaseDatos);

mysqli_set_charset($conn, "utf8");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header('Content-Type: application/json');


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (!isset($_GET['id'])) {

            $result = $conn->query("SELECT * FROM empleados");
            $elementos = array();
            while ($row = $result->fetch_assoc()) {
                $elementos[] = $row;
            }

            echo json_encode($elementos);
            break;
        }

        $id = intval($_GET['id']);
        $result = $conn->query("SELECT * FROM empleados WHERE id=$id");
        $elementos = array();
        while ($row = $result->fetch_assoc()) {
            $elementos[] = $row;
        }
        
        echo json_encode($elementos);
        break;

    case 'POST':
        if (!isset($_GET["opcion"])) {
           
            $input = json_decode(file_get_contents('php://input'), true);

       
            $nombre = $input['nombre'];
           
            $correo = $input['correo'];
            $correo = filter_var($correo, FILTER_SANITIZE_EMAIL);

          
            $sql = "INSERT INTO empleados (nombre, correo) VALUES (?, ?)";

            $query = $conn->prepare($sql);
            $query->bind_param("ss", $nombre, $correo);
            $query->execute();
            $data = array(
                'estado' => true,
                'id' => $conn->insert_id
            );
            die(json_encode($data));
            break;
        }

       
        $input = json_decode(file_get_contents('php://input'), true);

        
        $nombre = $input['nombre'];
        // $nombre = filter_var($nombre, FILTER_SANITIZE_STRING);

        $correo = $input['correo'];
        $correo = filter_var($correo, FILTER_SANITIZE_EMAIL);


        $sql = "UPDATE empleados SET nombre = ?, correo = ? WHERE id = ?";
        $query = $conn->prepare($sql);
        $query->bind_param("ssi", $nombre, $correo, $input['id']);
        $query->execute();


        $data = array('estado' => true);
        die(json_encode($data));
        break;

    case 'DELETE':

        $id = intval($_GET['id']);

        $sql = "DELETE FROM empleados WHERE id = ?";
        $query = $conn->prepare($sql);
        $query->bind_param("i", $id);
        $query->execute();

        http_response_code(200);
        $data = array('estado' => true);
        die(json_encode($data));
        break;

    default:

        break;
}


$conn->close();
