<?php
$servername = "tu_servidor";
$username = "tu_usuario";
$password = "tu_contraseña";
$dbname = "tu_base_de_datos";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$sql = "SELECT id, username FROM usuarios";
$result = $conn->query($sql);

$conn->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Autores</title>
</head>
<body>
    <header>
        <h1>Mi Primer Blog</h1>
    </header>
    <section>
        <h2>Lista de Autores</h2>
      
        <?php
        if ($result->num_rows > 0) {
            echo "<ul>";
            while($row = $result->fetch_assoc()) {
                echo "<li>ID: " . $row["id"]. " - Usuario: " . $row["username"]. "</li>";
            }
            echo "</ul>";
        } else {
            echo "No hay autores registrados.";
        }
        ?>
    </section>
    <footer>
        <p>&copy; 2023 Mi Primer Blog</p>
    </footer>
</body>
</html>
