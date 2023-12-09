document.addEventListener('DOMContentLoaded', function () {
    loadAuthors(); 
});

function deleteAuthor(author, authorBox) {
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
        authorBox.remove();
        loadMessages();
    })
    .catch(error => handleError(error, 'Error al borrar el autor'));
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
                if (!authorsArray.includes(author)) {
                    authorsArray.push(author);

                    const authorBox = document.createElement('div');
                    authorBox.classList.add('author-box');

                    const authorItem = document.createElement('span');
                    authorItem.classList.add('author-name');
                    authorItem.textContent = author;

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Borrar';
                    deleteButton.classList.add('delete-button');
                    deleteButton.addEventListener('click', function () {
                        deleteAuthor(author, authorBox);
                    });

                    authorBox.appendChild(authorItem);
                    authorBox.appendChild(deleteButton);
                    authorsContainer.appendChild(authorBox);
                }
            });
        })
        .catch(error => handleError(error, 'Error al cargar los autores'));
}

function loadMessages() {
    fetch('http://localhost:3000/obtenerPosts')
        .then(response => response.json())
        .then(data => {
            const messagesContainer = document.getElementById('messagesContainer');
            messagesContainer.innerHTML = '';

            data.posts.forEach(({ title, author, message }) => {
                const messageDiv = createMessageDiv(title, author, message);
                messagesContainer.appendChild(messageDiv);
            });
        })
        .catch(error => handleError(error, 'Error al cargar los mensajes'));
}



function deleteMessage(author) {
    fetch('http://localhost:3000/eliminarPost', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => handleError(error, 'Error al borrar el mensaje'));
}

function handleError(error, message) {
    console.error(`${message}: ${error}`);
}
