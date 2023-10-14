const loginForm = document.getElementById('loginForm');
const showDataButton = document.querySelector('button[type="button"]');


let userDataArray = [];


loginForm.addEventListener('submit', function (event) {
    event.preventDefault();


    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    const userData = { username, password };
    userDataArray.push(userData);
    localStorage.setItem('userDataArray', JSON.stringify(userDataArray));
    loginForm.reset();
    alert('Datos guardados');
});

showDataButton.addEventListener('click', function () {

    const storedData = localStorage.getItem('userDataArray');

    if (storedData) {

        const userDataArray = JSON.parse(storedData);
        let dataToShow = "Datos guardados:\n";
        userDataArray.forEach((userData, index) => {
            dataToShow += `Usuario ${index + 1}: ${userData.username}, Contraseña ${index + 1}: ${userData.password}\n`;
        });
        alert(dataToShow);
    } else {
        alert('No se encontraron datos almacenados ');
    }
});
