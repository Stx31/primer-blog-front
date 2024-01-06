const authorsArray = [];
const messagesArray = [];

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

    const newMessage = { author, title, message, dateTime: formattedDateTime };
    messagesArray.push(newMessage);
    authorsArray.push(author);

    updateCurrentDateTime(formattedDateTime);

    fetch('http://localhost:4000/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        loadAuthors(); 
        loadMessages();
        window.location.href = 'admin';
    })
    .catch(error => handleError(error, 'Error al guardar el mensaje'));
}

function updateCurrentDateTime(dateTime) {
    const container = document.getElementById('container');
    if (container) {
        container.textContent = `Fecha y Hora Actual: ${dateTime}`;
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
            const container = document.getElementById('container');
            if (!container) return;

            container.innerHTML = '';

            if (data.messages.length === 0) {
                container.textContent = 'No hay mensajes.';
                return;
            }

            messagesArray.length = 0;
            messagesArray.push(...data.messages);

            data.messages.forEach(({ author, title, message, dateTime, messageId }) => {
                const messageDiv = createMessageDiv(title, author, message, dateTime, messageId);
                container.appendChild(messageDiv);
            });
        })
        .catch(error => handleError(error, 'Error al cargar los mensajes'));
}

function loadAuthors() {
    const authorsDropdown = document.getElementById('authorsDropdown');

    fetch('http://localhost:4000/api/authors')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red - ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (authorsDropdown) {
                authorsDropdown.innerHTML = '';

                if (data.authors.length === 0) {
                    const defaultOption = document.createElement('option');
                    defaultOption.textContent = 'No hay autores';
                    authorsDropdown.appendChild(defaultOption);
                } else {
                    data.authors.forEach(author => {
                        const option = document.createElement('option');
                        option.value = author;
                        option.textContent = author;
                        authorsDropdown.appendChild(option);
                    });
                }
            }
        })
        .catch(error => handleError(error, 'Error al cargar los autores'));
}

function createMessageDiv(title, author, message, dateTime, messageId) {
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
    deleteButton.dataset.messageId = messageId;
    deleteButton.dataset.author = author;
    deleteButton.addEventListener('click', function () {
        const messageId = this.dataset.messageId;
        const author = this.dataset.author;
        deleteMessageById(messageId, author);
    });

    messageDiv.appendChild(deleteButton);
    return messageDiv;
}

function deleteMessageById(messageId, author) {
    fetch(`http://localhost:4000/api/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error de red - ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Message deleted:", data);
        loadMessages();
        loadAuthors();
    })
    .catch(error => {
        handleError(error, 'Error al borrar el mensaje');
    });
}


function deleteMessagesByAuthor(author) {
    fetch(`http://localhost:4000/api/messages/byAuthor/${author}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        loadMessages();
    })
    .catch(error => handleError(error, 'Error al borrar los mensajes del autor'));
}


function deleteAllMessagesByAuthor() {
    const authorDropdown = document.getElementById('authorsDropdown');
    const selectedAuthor = authorDropdown.value;

    if (selectedAuthor) {
        fetch(`http://localhost:4000/api/messages/byAuthor/${selectedAuthor}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            loadMessages();
            loadAuthors(); 
        })
        .catch(error => handleError(error, 'Error al borrar los mensajes del autor'));
    }
}

function handleError(error, message) {
    console.error(`${message}: ${error}`);
}
