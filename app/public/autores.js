const authorsArray = [];

document.addEventListener('DOMContentLoaded', function () {
    loadAuthors();
});

function loadAuthors() {
    const authorsContainer = document.getElementById('authorsContainer');
    if (!authorsContainer) return;

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
                    const noAuthorsMessage = document.createElement('p');
                    noAuthorsMessage.textContent = 'No hay autores.';
                    authorsContainer.appendChild(noAuthorsMessage);
                } else {
                    data.authors.forEach(author => {
                        const authorDiv = createAuthorDiv(author);
                        authorsContainer.appendChild(authorDiv);
                    });
                }
            }
        })
        .catch(error => handleError(error, 'Error al cargar los autores'));
}

function createAuthorDiv(author) {
    const authorDiv = document.createElement('div');
    authorDiv.classList.add('author');
    authorDiv.textContent = `Autor: ${author}`;
    return authorDiv;
}

function handleError(error, message) {
    console.error(`${message}: ${error}`);
}
