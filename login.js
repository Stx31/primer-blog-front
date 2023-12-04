// login.js

document.addEventListener('DOMContentLoaded', function () {
    loadData();

    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();
        saveDataAndRedirect();
    });

    document.getElementById('saveButton').addEventListener('click', function () {
        submitForm();
    });
});

function saveDataAndRedirect() {
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;

    fetch('http://localhost:3000/guardar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, edad }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            loadData();
            redirectToIndex();
        })
        .catch(error => console.error('Error:', error));
}

function submitForm() {
    var usernameInput = document.getElementById('nombre').value;
    var passwordInput = document.getElementById('edad').value;

    var formData = new FormData();
    formData.append('nombre', usernameInput);
    formData.append('edad', passwordInput);

    var expressUrl = 'http://localhost:3000/guardar-datos';

    fetch(expressUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta de Express:', data);

        if (usernameInput === '1234' && passwordInput === '1234') {
            window.location.href = 'index.html';
        } else {
            console.log('Credenciales incorrectas');
        }
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}
