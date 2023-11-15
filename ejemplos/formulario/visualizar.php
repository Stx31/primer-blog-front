<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Datos Guardados</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #4caf50;
            color: #fff;
        }

        .delete-btn {
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
    </style>
</head>
<body>
    <h2>Datos Guardados</h2>

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
        mysqli_stmt_bind_param($borrar_statement, "i", $borrar_id);
        $borrar_ejecutar = mysqli_stmt_execute($borrar_statement);

        if (!$borrar_ejecutar) {
            die("Error al borrar el registro: " . mysqli_error($conexion));
        }
    }

    $result = mysqli_query($conexion, "SELECT * FROM datos");

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
            echo "<td>
                    <form method='POST' style='display:inline;'>
                        <input type='hidden' name='borrar_id' value='{$row['id']}'>
                        <button type='submit' class='delete-btn'>Borrar</button>
                    </form>
                  </td>";
            echo "</tr>";
        }

        echo "</table>";
    } else {
        echo "<p>No hay datos guardados.</p>";
    }

    mysqli_close($conexion);
    ?>
</body>
</html>
