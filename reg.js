document.getElementById('messageForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const message = document.getElementById('message').value;

    const data = {
        author: author,
        title: title,
        message: message
    };

    fetch('http://localhost:3000/guardar-datos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
        alert(`Mensaje guardado con éxito: ${responseData.message}`);
    })
    .catch(error => {
        console.error('Error al enviar datos al servidor:', error);
    });
});
