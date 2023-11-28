let data = [];

function saveData() {
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const message = document.getElementById('message').value;

    const newData = {
        author: author,
        title: title,
        message: message
    };

    data.push(newData);
    displayData();
    clearForm();
}

function getData() {
    
    fetch('/obtener-datos')
        .then(response => response.json())
        .then(dataFromServer => {
            data = dataFromServer;
            displayData();
        })
        .catch(error => console.error('Error al obtener datos:', error));
}

function deleteData() {
  
    fetch('/borrar-datos', { method: 'DELETE' })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData.mensaje);
            data = [];
            displayData();
        })
        .catch(error => console.error('Error al borrar datos:', error));
}

function displayData() {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = '';

    data.forEach((item, index) => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `<strong>Autor:</strong> ${item.author} | <strong>Título:</strong> ${item.title} | <strong>Mensaje:</strong> ${item.message}`;
        dataContainer.appendChild(listItem);
    });
}

function clearForm() {
    document.getElementById('author').value = '';
    document.getElementById('title').value = '';
    document.getElementById('message').value = '';
}
