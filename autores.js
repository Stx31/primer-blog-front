document.addEventListener('DOMContentLoaded', function () {
    loadAuthors();
});

function loadAuthors() {
    fetch('http://localhost:3000/obtenerAutores')
        .then(response => response.json())
        .then(data => {
            const autoresContainer = document.getElementById('autores');
            autoresContainer.innerHTML = '';

            data.autores.forEach(author => {
                const authorDiv = document.createElement('div');
                authorDiv.classList.add('author');
                authorDiv.innerHTML = `<p>${author}</p>`;

                autoresContainer.appendChild(authorDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}
