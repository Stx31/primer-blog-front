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
                        const authorParagraph = document.createElement('p');
                        authorParagraph.textContent = author;
                        authorsContainer.appendChild(authorParagraph);
                    });
                }
            }
        })
        .catch(error => handleError(error, 'Error al cargar los autores'));
}

function handleError(error, message) {
    console.error(`${message}: ${error}`);
}
