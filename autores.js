
        document.addEventListener('DOMContentLoaded', function () {
            loadAuthors();
        });

        function loadAuthors() {
            fetch('http://localhost:3000/obtenerMensajes')
                .then(response => response.json())
                .then(data => {
                    const authorsContainer = document.getElementById('authorsContainer');

                    const authorsSet = new Set();

                    data.mensajes.forEach(({ author }) => {
                        authorsSet.add(author);
                    });

                    authorsSet.forEach(author => {
                        const authorBox = document.createElement('div');
                        authorBox.classList.add('author-box');

                        const authorItem = document.createElement('span');
                        authorItem.classList.add('author-name');
                        authorItem.textContent = author;

                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Borrar';
                        deleteButton.classList.add('delete-button');
                        deleteButton.addEventListener('click', function () {
                            deleteAuthor(author);
                            authorBox.remove();
                        });

                        authorBox.appendChild(authorItem);
                        authorBox.appendChild(deleteButton);
                        authorsContainer.appendChild(authorBox);
                    });
                })
                .catch(error => console.error('Error:', error));
        }

        function deleteAuthor(author) {
            fetch('http://localhost:3000/borrarAutor', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ author }),
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));
        }