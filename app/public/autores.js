const authorsArray = [];

document.addEventListener('DOMContentLoaded', function () {
    loadAuthors();
});

function loadAuthors() {
    const authorsContainer = document.getElementById('authorsContainer');

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
                    authorsContainer.textContent = 'No hay autores.';
                    return;
                }

                authorsArray.length = 0;
                authorsArray.push(...data.authors);

                data.authors.forEach(author => {
                    const authorDiv = createAuthorDiv(author);
                    authorsContainer.appendChild(authorDiv);
                });
            }
        })
        .catch(error => handleError(error, 'Error al cargar los autores'));
}

function createAuthorDiv(author) {
    const authorDiv = document.createElement('div');
    authorDiv.classList.add('author');
    authorDiv.innerHTML = `<p>Autor: ${author}</p>`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.classList.add('delete-button');
    deleteButton.dataset.author = author;
    deleteButton.addEventListener('click', function () {
        const author = this.dataset.author;
        deleteAuthor(author);
    });

    authorDiv.appendChild(deleteButton);
    return authorDiv;
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
