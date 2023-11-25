// JavaScript (reg.js)

// Array para almacenar datos
var data = [];

// Función para guardar datos
function saveData() {
    var author = document.getElementById('author').value;
    var title = document.getElementById('title').value;
    var message = document.getElementById('message').value;

    // Crear un objeto con los datos
    var newData = {
        author: author,
        title: title,
        message: message
    };

    // Agregar el nuevo objeto al array
    data.push(newData);

    // Limpiar el formulario
    document.getElementById('messageForm').reset();

    // Llamar a la función para enviar datos a Postman
    sendDataToPostman(newData);
}

// Función para borrar datos
function deleteData() {
    // Limpiar el array
    data = [];

    // Llamar a la función para borrar datos en Postman
    deleteDataInPostman();

    // Limpiar el contenedor de datos en el HTML
    document.getElementById('dataContainer').innerHTML = '';
}

// Función para enviar datos a Postman
function sendDataToPostman(newData) {
    // Aquí debes implementar la lógica para enviar datos a Postman
    // Puedes usar fetch() o cualquier otra biblioteca para realizar solicitudes HTTP
    // Por ejemplo:
    // fetch('tu_url_de_postman', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(newData),
    // })
    // .then(response => response.json())
    // .then(data => console.log('Datos enviados a Postman:', data))
    // .catch(error => console.error('Error al enviar datos a Postman:', error));
}

// Función para borrar datos en Postman
function deleteDataInPostman() {
    // Aquí debes implementar la lógica para borrar datos en Postman
    // Puedes usar fetch() o cualquier otra biblioteca para realizar solicitudes HTTP
    // Por ejemplo:
    // fetch('tu_url_de_postman', {
    //     method: 'DELETE',
    // })
    // .then(response => response.json())
    // .then(data => console.log('Datos borrados en Postman:', data))
    // .catch(error => console.error('Error al borrar datos en Postman:', error));
}
