
const savedData = [];


function saveData() {
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const message = document.getElementById('message').value;

    if (author && title && message) {
        const newMessage = {
            author: author,
            title: title,
            message: message
        };

        
        savedData.push(newMessage);

      
        document.getElementById('messageForm').reset();

       
        displayData();
    } else {
        alert('Por favor, completa todos los campos del formulario.');
    }
}


function displayData() {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = '';

    savedData.forEach(function (message, index) {
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `<p><strong>Autor:</strong> ${message.author}</p>
                                <p><strong>Título:</strong> ${message.title}</p>
                                <p><strong>Mensaje:</strong> ${message.message}</p>
                                <button onclick="deleteMessage(${index})">Eliminar Mensaje</button>`;
        dataContainer.appendChild(messageDiv);
    });
}


function deleteMessage(index) {
    savedData.splice(index, 1);

  
    displayData();
}
