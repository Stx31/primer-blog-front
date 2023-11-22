const savedData = [];

function saveData() {
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const message = document.getElementById('message').value;

    if (author && title && message) {
        const newMessage = {
            author,
            title,
            message,
            time: getCurrentTime()
        };

        savedData.push(newMessage);
        clearForm();
        displayData();
        sendDataToServer(newMessage);
    } else {
        alert('Por favor, completa todos los campos del formulario.');
    }
}

function deleteData() {
  
    fetch('http://localhost:3000/borrar-datos', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.text())
    .then(data => {
        console.log('Datos borrados con éxito:', data);
        alert('Datos borrados con éxito');
        savedData.length = 0;
        displayData();
    })
    .catch(error => {
        console.error('Error al borrar datos:', error);
        alert('Error al borrar datos');
    });
}

function displayData() {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = '';

    savedData.forEach((message, index) => {
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `
            <p><strong>Autor:</strong> ${message.author}</p>
            <p><strong>Título:</strong> ${message.title}</p>
            <p><strong>Mensaje:</strong> ${message.message}</p>
            <p><strong>Fecha y Hora:</strong> ${message.time}</p>
            <button onclick="deleteMessage(${index})">Eliminar Mensaje</button>
        `;
        dataContainer.appendChild(messageDiv);
    });
}

function deleteMessage(index) {
    savedData.splice(index, 1);
    displayData();
}

function getCurrentTime() {
    const currentTime = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return currentTime.toLocaleDateString('es-ES', options);
}

function clearForm() {
    document.getElementById('messageForm').reset();
}

function sendDataToServer(data) {

    fetch('http://localhost:3000/guardar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos enviados al servidor:', data);
    })
    .catch(error => {
        console.error('Error al enviar datos al servidor:', error);
    });
}
