document.addEventListener('DOMContentLoaded', function () {
    loadAuthors();
});

function loadAuthors() {
    const authorsContainer = document.getElementById('authorsContainer');
    if (!authorsContainer) return;

    authorsContainer.innerHTML = '';

    const uniqueAuthors = Array.from(new Set(messagesArray.map(message => message.author)));

    uniqueAuthors.forEach(author => {
        const authorDiv = createAuthorDiv(author);
        authorsContainer.appendChild(authorDiv);
    });
}

function createAuthorDiv(author) {
    const authorDiv = document.createElement('div');
    authorDiv.classList.add('author');
    authorDiv.textContent = `Autor: ${author}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar Autor';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function () {
        deleteAuthor(author);
        authorDiv.remove();
    });

    authorDiv.appendChild(deleteButton);
    return authorDiv;
}

function deleteAuthor(author) {
  
    fetch('http://localhost:4000/api/authors', {
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
    .catch(error => handleError(error, 'Error al borrar el autor'));
}
