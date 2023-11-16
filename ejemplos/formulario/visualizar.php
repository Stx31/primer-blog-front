<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Datos Guardados</title>
    <link rel="stylesheet" type="text/css" href="vi.css">
   
</head>
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
