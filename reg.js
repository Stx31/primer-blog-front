const messageForm = document.getElementById('messageForm');
const dataDisplay = document.getElementById('data');

messageForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const message = document.getElementById('message').value;

    fetch('/guardar-mensaje', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author, title, message }),
    })
    .then(response => response.json())
    .then(data => {
        displayMessages(data);
    })
    .catch(error => console.error('Error al guardar datos: ' + error));
});

function displayMessages(mensaje) {
    dataDisplay.innerHTML = '';

    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = `
        <strong>Autor:</strong> ${mensaje.author}<br>
        <strong>Título:</strong> ${mensaje.title}<br>
        <strong>Mensaje:</strong> ${mensaje.message}<br><br>
    `;
    dataDisplay.appendChild(messageDiv);
}
