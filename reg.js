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

    fetch('http://localhost:3000/guardarPost', {
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
        window.location.href = 'index.html';
    })
    .catch(error => handleError(error, 'Error al guardar el mensaje'));
}

function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function loadMessages() {
    fetch('http://localhost:3000/obtenerPosts')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red - ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const messagesContainer = document.getElementById('messagesContainer');
            messagesContainer.innerHTML = '';

            data.posts.forEach(({ author, title, message, dateTime }) => {
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
    fetch('http://localhost:3000/eliminarPost', {
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

function loadAuthors() {
    fetch('http://localhost:3000/obtenerPosts')
        .then(response => response.json())
        .then(data => {
            const authorsContainer = document.getElementById('authorsContainer');
            authorsContainer.innerHTML = '';

            data.posts.forEach(post => {
                const author = post.author;
                const message = post.message;
                const dateTime = post.dateTime; 
                if (!authorsArray.some(item => item.author === author)) {
                    authorsArray.push({ author, message, dateTime });

                    const authorBox = document.createElement('div');
                    authorBox.classList.add('author-box');

                    const authorItem = document.createElement('span');
                    authorItem.classList.add('author-name');
                    authorItem.textContent = `${author} - ${dateTime || 'No disponible'}`; 

                    const messageItem = document.createElement('p');
                    messageItem.textContent = `Mensaje: ${message || 'No disponible'}`;

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Borrar';
                    deleteButton.classList.add('delete-button');
                    deleteButton.addEventListener('click', function () {
                        deleteAuthor(author);
                        authorBox.remove();
                    });

                    authorBox.appendChild(authorItem);
                    authorBox.appendChild(messageItem);
                    authorBox.appendChild(deleteButton);
                    authorsContainer.appendChild(authorBox);
                }
            });
        })
        .catch(error => handleError(error, 'Error al cargar los autores'));
}

function deleteAuthor(author) {
    fetch('http://localhost:3000/eliminarAutor', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        loadAuthors();
    })
    .catch(error => handleError(error, 'Error al borrar el autor'));
}

function updateCurrentDateTime(formattedDateTime) {
    const currentDateTimeElement = document.getElementById('currentDateTime');
    if (currentDateTimeElement) {
        currentDateTimeElement.textContent = formattedDateTime;
    }
}
