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

    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    fetch('http://localhost:3000/guardarMensaje', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author, title, message, timestamp: formattedDate }),
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
   
}

function loadData() {
    fetch('http://localhost:3000/obtenerMensajes')
        .then(response => response.json())
        .then(data => {
            const dataContainer = document.getElementById('dataContainer');
            dataContainer.innerHTML = '';

            data.mensajes.forEach(({ author, title, message, timestamp }) => {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message');
                messageDiv.innerHTML = `<h4>${title}</h4><p>Autor: ${author}</p><p>${message}</p><p>Fecha y hora: ${timestamp}</p>`;

                const editButton = createStyledButton('Editar', 'green'); 
                editButton.addEventListener('click', function () {
                    editMessage(message, messageDiv);
                });

                const deleteButton = createStyledButton('Borrar', 'red'); 
                deleteButton.addEventListener('click', function () {
                    deleteMessageOnServer(message);
                    messageDiv.remove(); 
                });

                messageDiv.appendChild(editButton);
                messageDiv.appendChild(deleteButton);

                dataContainer.appendChild(messageDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

function editMessage(originalMessage, messageDiv) {
    const editForm = document.createElement('form');
    const editInput = document.createElement('textarea');
    editInput.value = originalMessage;
    const saveEditButton = document.createElement('button');
    saveEditButton.textContent = 'Guardar Edición';

    saveEditButton.addEventListener('click', function () {
        const editedMessage = editInput.value;
        saveEditedMessage(originalMessage, editedMessage);
        messageDiv.querySelector('p').textContent = editedMessage;
        editForm.remove();
    });

    editForm.appendChild(editInput);
    editForm.appendChild(saveEditButton);
    messageDiv.appendChild(editForm);
}

function saveEditedMessage(originalMessage, editedMessage) {
    fetch('http://localhost:3000/editarMensaje', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalMessage, editedMessage }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

function redirectToIndex() {
    window.location.href = 'index.html';
}

function createStyledButton(text, color) {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.backgroundColor = color; 
    button.style.color = 'white'; 
    button.style.marginRight = '5px'; 

    return button;
}
