document.getElementById('registroForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const contrasena = document.getElementById('contrasena').value;

    // Envía los datos al servidor usando Fetch API o XMLHttpRequest
    fetch('registrar.php', {
        method: 'POST',
        body: JSON.stringify({ nombre, email, contrasena }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensaje').innerHTML = data.message;
    })
    .catch(error => console.error(error));
});
