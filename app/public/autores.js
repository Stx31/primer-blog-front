
let messagesArray = [];

function loadAuthors() {
    fetch('http://localhost:4000/api/messages')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red - ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            messagesArray = data.messages; 
            const container = document.getElementById('container');
            if (!container) return;

            container.innerHTML = '';

            if (messagesArray.length === 0) {
                container.textContent = 'No hay mensajes.';
                return;
            }

            const uniqueAuthors = [...new Set(messagesArray.map(message => message.author))];
            
            uniqueAuthors.forEach(author => {
                const authorParagraph = document.createElement('p');
                authorParagraph.textContent = `Autor: ${author}`;
                container.appendChild(authorParagraph);
            });
        })
        .catch(error => handleError(error, 'Error al cargar los autores'));
}


document.addEventListener('DOMContentLoaded', loadAuthors);
