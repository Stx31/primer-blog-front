document.addEventListener('DOMContentLoaded', function () {
    loadData();

    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();
        authenticateAndRedirect();
    });
});

function authenticateAndRedirect() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
               
                redirectToIndex();
            } else {
                console.log('La autenticación falló');
            }
        })
        .catch(error => console.error('Error:', error));
}
