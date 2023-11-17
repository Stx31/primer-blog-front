<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Datos Guardados</title>
</head>
<style>
    body {
    font-family: 'Arial', sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 20px;
    color: #333;
}

h2 {
    color: #4caf50;
}

.post-container {
    display: flex;
    flex-direction: column;
}

.post {
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin-bottom: 20px;
    padding: 20px;
}

.post p {
    font-size: 16px;
    margin-bottom: 10px;
}

.post .delete-btn {
    background-color: #f44336;
    color: #fff;
    border: none;
    padding: 8px 12px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
}

.post .delete-btn:hover {
    background-color: #d32f2f;
}

a {
    color: #2196f3;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
<body>
    <h2>Post Guardados</h2>
    <?php
    $conexion = @mysqli_connect('localhost', 'root', '');

    if (!$conexion) {
        die("No se pudo conectar con el servidor: " . mysqli_connect_error());
    }

    $base = mysqli_select_db($conexion, 'formulario (prueba)');

    if (!$base) {
        die("No se encontró la base de datos 'formulario'");
    }

    if (isset($_POST['borrar_id'])) {
        $borrar_id = $_POST['borrar_id'];
        $borrar_sql = "DELETE FROM datos WHERE id = ?";
        $borrar_statement = mysqli_prepare($conexion, $borrar_sql);

        if ($borrar_statement === false) {
            die("Error al preparar la consulta: " . mysqli_error($conexion));
        }

        mysqli_stmt_bind_param($borrar_statement, "i", $borrar_id);
        $borrar_ejecutar = mysqli_stmt_execute($borrar_statement);

        if (!$borrar_ejecutar) {
            die("Error al borrar el registro: " . mysqli_error($conexion));
        }

        header("Location: visualizar.php");
        exit();
    }

    $result = mysqli_query($conexion, "SELECT id, nombre, correo, mensaje FROM datos");

    if (!$result) {
        die("Error al obtener datos: " . mysqli_error($conexion));
    }

    if (mysqli_num_rows($result) > 0) {
        echo "<table>";
        echo "<tr><th>Nombre</th><th>Correo</th><th>Mensaje</th><th>Acción</th></tr>";

        while ($row = mysqli_fetch_assoc($result)) {
            echo "<tr>";
            echo "<td>{$row['nombre']}</td>";
            echo "<td>{$row['correo']}</td>";
            echo "<td>{$row['mensaje']}</td>";

            if (isset($row['id'])) {
                echo "<td>
                        <form method='POST' style='display:inline;'>
                            <input type='hidden' name='borrar_id' value='{$row['id']}'>
                            <button type='submit' class='delete-btn'>Borrar</button>
                        </form>
                      </td>";
            } else {
                echo "<td>Error: ID no definido</td>";
            }

            echo "</tr>";
        }

        echo "</table>";
    } else {
        echo "<p>No hay datos guardados.</p>";
    }

    mysqli_close($conexion);
    ?>

<a href="index.html"><button>Cancelar</button></a>
</body>
</html>
