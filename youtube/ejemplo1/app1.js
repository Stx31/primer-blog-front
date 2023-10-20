document.addEventListener('DOMContentLoaded', function() {
    const mensajeForm = document.getElementById('mensaje-form');
    const mensajeResponse = document.getElementById('mensaje-response');

    mensajeForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const mensajeTextarea = document.getElementById('mensaje');
        const mensaje = mensajeTextarea.value;

        fetch('procesar.php', {
            method: 'POST',
            body: JSON.stringify({ mensaje }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            mensajeResponse.textContent = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
            mensajeResponse.textContent = 'Error al enviar el mensaje.';
        });

        // Limpiar el formulario
        mensajeTextarea.value = '';
    });
});
