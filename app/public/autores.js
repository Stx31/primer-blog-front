const authorsContainer = document.getElementById('authorsContainer');

document.addEventListener('DOMContentLoaded', loadAuthors);

function loadAuthors() {
    fetch('http://localhost:4000/api/authors')
        .then(handleResponse)
        .then(data => {
            renderAuthors(data.authors);
        })
        .catch(error => handleError(error, 'Error al cargar los autores'));
}

function renderAuthors(authors) {
    authorsContainer.innerHTML = '';

    if (authors.length === 0) {
        authorsContainer.textContent = 'No hay autores';
    } else {
        authors.forEach(author => {
            const authorContainer = document.createElement('div');
            authorContainer.classList.add('author-container');

            const authorParagraph = document.createElement('p');
            authorParagraph.textContent = author.name;

            const deleteButton = createDeleteButton(author.id);

            authorContainer.appendChild(authorParagraph);
            authorContainer.appendChild(deleteButton);
            authorsContainer.appendChild(authorContainer);
        });
    }
}

function createDeleteButton(authorId) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => deleteAuthor(authorId));
    return deleteButton;
}

function deleteAuthor(authorId) {
    fetch(`http://localhost:4000/api/authors/${authorId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(handleResponse)
    .then(() => loadAuthors())
    .catch(error => handleError(error, 'Error al borrar el autor'));
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`Error de red - ${response.status}`);
    }
    return response.json();
}

function handleError(error, message) {
    console.error(`${message}: ${error}`);
}

document.getElementById('volverButton').addEventListener('click', function() {
    window.location.href = 'admin.html';
});
