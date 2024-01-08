const authorsArray = [];

document.addEventListener('DOMContentLoaded', function () {
    loadAuthors();
    document.getElementById('volverButton').addEventListener('click', function() {
        window.location.href = 'admin';
    });
});

function loadAuthors() {
    const container = document.getElementById('containerau');

    fetch('http://localhost:4000/api/authors')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red - ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!container) return;

            container.innerHTML = '';

            if (data.authors.length === 0) {
                const noAuthorsMessage = document.createElement('p');
                noAuthorsMessage.textContent = 'No hay autores.';
                container.appendChild(noAuthorsMessage);
                return;
            }

            data.authors.forEach(author => {
                const authorElement = document.createElement('p');
                authorElement.textContent = author;
                container.appendChild(authorElement);
            });
        })
        .catch(error => handleError(error, 'Error al cargar los autores'));
}

function handleError(error, message) {
    console.error(`${message}: ${error}`);
}
