document.addEventListener('DOMContentLoaded', function () {
    loadMessages();
    // Agregado: Llama a la función loadAuthors al cargar la página
    loadAuthors();
});

function savePost() {
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const message = document.getElementById('message').value;

    const currentDate = new Date();
    const formattedDateTime = `${getDayName(currentDate)} ${currentDate.getDate()} de ${getMonthName(currentDate)} a las ${formatTime(currentDate)}`;

    // Agregado: Actualiza el elemento en el HTML con la fecha y la hora actual
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
        window.location.href = 'index.html';
    })
    .catch(error => handleError(error, 'Error al guardar el mensaje'));
}

function getDayName(date) {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
}

function getMonthName(date) {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return months[date.getMonth()];
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
    messageDiv.innerHTML = `<h4>${title}</h4><p>Autor: ${author}</p><p>${message}</p><p>${dateTime}</p>`;

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

            const authorsArray = [];

            data.posts.forEach(post => {
                const author = post.author;
                const dateTime = post.dateTime; // Agregado: Obtener la fecha y la hora del mensaje
                if (!authorsArray.some(item => item.author === author)) {
                    authorsArray.push({ author, dateTime });

                    const authorBox = document.createElement('div');
                    authorBox.classList.add('author-box');

                    const authorItem = document.createElement('span');
                    authorItem.classList.add('author-name');
                    authorItem.textContent = `${author} - ${dateTime}`; // Modificado: Mostrar la fecha y la hora

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Borrar';
                    deleteButton.classList.add('delete-button');
                    deleteButton.addEventListener('click', function () {
                        deleteAuthor(author);
                        authorBox.remove();
                    });

                    authorBox.appendChild(authorItem);
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

// Agregado: Función para actualizar el elemento en el HTML con la fecha y la hora actual
function updateCurrentDateTime(formattedDateTime) {
    const currentDateTimeElement = document.getElementById('currentDateTime');
    if (currentDateTimeElement) {
        currentDateTimeElement.textContent = formattedDateTime;
    }
}
