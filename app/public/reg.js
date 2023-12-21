const authorsArray = [];

document.addEventListener('DOMContentLoaded', function () {
    loadMessages();
    loadAuthors();
});

function savePost() {
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const message = document.getElementById('message').value;
    const currentDate = new Date();
    const formattedDateTime = formatTime(currentDate);

    authorsArray.push({ author, dateTime: formattedDateTime });

    updateCurrentDateTime(formattedDateTime);

    fetch('http://localhost:4000/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author, title, message, dateTime: formattedDateTime }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        loadAuthors();
    })
    .catch(error => handleError(error, 'Error al guardar el mensaje'));
}

function updateCurrentDateTime(dateTime) {
    const currentDateTimeElement = document.getElementById('currentDateTime');
    if (currentDateTimeElement) {
        currentDateTimeElement.textContent = `Fecha y Hora Actual: ${dateTime}`;
    }
}

function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function loadMessages() {
    fetch('http://localhost:4000/api/messages')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red - ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const messagesContainer = document.getElementById('messagesContainer');
            messagesContainer.innerHTML = '';

            data.messages.forEach(({ author, title, message, dateTime }) => {
                const messageDiv = createMessageDiv(title, author, message, dateTime);
                messagesContainer.appendChild(messageDiv);
            });
        })
        .catch(error => handleError(error, 'Error al cargar los mensajes'));
}

function createMessageDiv(title, author, message, dateTime) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `<h4>${title}</h4><p>Autor: ${author}</p><p>${message}</p>`;

    if (dateTime) {
        const dateTimeParagraph = document.createElement('p');
        dateTimeParagraph.textContent = `Hora: ${dateTime}`;
        messageDiv.appendChild(dateTimeParagraph);
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function () {
        deleteMessage(author, title, message);
        messageDiv.remove();
    });

    messageDiv.appendChild(deleteButton);
    return messageDiv;
}

function deleteMessage(author, title, message) {
    fetch('http://localhost:4000/api/messages', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author, title, message }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => handleError(error, 'Error al borrar el mensaje'));
}
