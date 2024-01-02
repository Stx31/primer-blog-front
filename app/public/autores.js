document.addEventListener('DOMContentLoaded', function () {
    loadAuthors();
    loadMessages();
});



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

            data.messages.forEach(({ author, title, message, dateTime, messageId }) => {
                const messageDiv = createMessageDiv(title, author, message, dateTime, messageId);
                container.appendChild(messageDiv);
            });
        })
        .catch(error => handleError(error, 'Error al cargar los mensajes'));
}

function createMessageDiv(title, author, message, dateTime, messageId) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `<p>Autor: ${author}</p>`;

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

function handleError(error, message) {
    console.error(`${message}: ${error}`);
}
