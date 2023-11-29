document.addEventListener('DOMContentLoaded', function () {
    loadData();

    document.getElementById('messageForm').addEventListener('submit', function (event) {
        event.preventDefault();
    });

    document.getElementById('saveButton').addEventListener('click', function () {
        saveDataAndRedirect();
    });

    document.getElementById('deleteButton').addEventListener('click', function () {
        deleteData();
    });
});

function saveDataAndRedirect() {
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const message = document.getElementById('message').value;

    fetch('http://localhost:3000/guardarMensaje', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author, title, message }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            loadData();
            redirectToIndex();
        })
        .catch(error => console.error('Error:', error));
}

function deleteData() {
  
    const deleteButton = document.createElement('button');
deleteButton.textContent = 'Borrar';
deleteButton.id = 'deleteButton'; // Asignar un id al botón

deleteButton.addEventListener('click', function () {
    deleteMessageOnServer(message);
    messageDiv.remove(); 
});
}

function deleteMessageOnServer(message) {
   
    fetch('http://localhost:3000/eliminarMensaje', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

function loadData() {
    fetch('http://localhost:3000/obtenerMensajes')
        .then(response => response.json())
        .then(data => {
            const dataContainer = document.getElementById('dataContainer');
            dataContainer.innerHTML = '';

            data.mensajes.forEach(({ author, title, message }) => {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message');
                messageDiv.innerHTML = `<h4>${title}</h4><p>Autor: ${author}</p><p>${message}</p>`;
                
                
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Borrar';
                deleteButton.addEventListener('click', function () {
                    deleteMessageOnServer(message);
                    messageDiv.remove(); 
                });
                
                messageDiv.appendChild(deleteButton);
                
                dataContainer.appendChild(messageDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

function redirectToIndex() {
    window.location.href = 'index.html';
}
