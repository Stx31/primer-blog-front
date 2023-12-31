const authorsContainer = document.getElementById('authorsContainer');

document.addEventListener('DOMContentLoaded', function () {
    loadAuthors();
});

function loadAuthors() {
    fetch('http://localhost:4000/api/authors')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red - ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (authorsContainer) {
                authorsContainer.innerHTML = '';

                if (data.authors.length === 0) {
                    authorsContainer.textContent = 'No hay autores';
                } else {
                    data.authors.forEach(author => {
                        const authorContainer = document.createElement('div');
                        authorContainer.classList.add('author-container');

                        const authorParagraph = document.createElement('p');
                        authorParagraph.textContent = author;

                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Borrar';
                        deleteButton.classList.add('delete-button');
                        deleteButton.addEventListener('click', () => deleteAuthor(author));

                        authorContainer.appendChild(authorParagraph);
                        authorContainer.appendChild(deleteButton);
                        authorsContainer.appendChild(authorContainer);
                    });
                }
            }
        })
        .catch(error => handleError(error, 'Error al cargar los autores'));
}

function deleteAuthor(author) {
    fetch(`http://localhost:4000/api/authors/${author}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        loadAuthors();
    })
    .catch(error => handleError(error, 'Error al borrar el autor'));
}

function handleError(error, message) {
    console.error(`${message}: ${error}`);
}
