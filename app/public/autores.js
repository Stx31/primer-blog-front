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

            data.messages.forEach(({ author, dateTime, messageId }) => {
                const messageDiv = createMessageDiv(author, dateTime, messageId);
                container.appendChild(messageDiv);
            });
        })
        .catch(error => handleError(error, 'Error al cargar los mensajes'));
}

function createMessageDiv(author, dateTime, messageId) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    
    const authorParagraph = document.createElement('p');
    authorParagraph.textContent = `Autor: ${author}, Fecha y Hora: ${dateTime}`;
    messageDiv.appendChild(authorParagraph);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.classList.add('delete-button');
    deleteButton.dataset.messageId = messageId;
    deleteButton.addEventListener('click', function () {
        const messageId = this.dataset.messageId;
        deleteMessageById(messageId);
        messageDiv.remove();
        loadAuthors(); 
    });

    messageDiv.appendChild(deleteButton);
    return messageDiv;
}

function deleteMessageById(messageId) {
    fetch('http://localhost:4000/api/messages/' + messageId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => handleError(error, 'Error al borrar el mensaje'));
}
