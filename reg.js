var userDataArray = [];

function guardarDatos() {
    var email = document.getElementById("emailInput").value;
    var name = document.getElementById("nameInput").value;
    var message = document.getElementById("messageInput").value;
    var hora = new Date().toLocaleTimeString();

    var nuevoDato = {
        email: email,
        name: name,
        message: message,
        hora: hora
    };
    userDataArray.push(nuevoDato);
    localStorage.setItem("userDataArray", JSON.stringify(userDataArray));
    mostrarMensajes();

    window.location.href = "index.html";
}

function mostrarMensajes() {
    var userDataArrayJSON = localStorage.getItem("userDataArray");
    if (userDataArrayJSON) {
        userDataArray = JSON.parse(userDataArrayJSON);
    }

    var mensajesDiv = document.getElementById("mensajes");
    mensajesDiv.innerHTML = "";
    userDataArray.forEach(function (userData, index) {
        var fechaYHora = new Date(userData.hora).toLocaleString(); 
        var mensaje = `
            <p>Email: ${userData.email || ""}
            <br>Nombre: ${userData.name || ""}
            <br>Mensaje: ${userData.message || ""}
            <br>Fecha y Hora: ${fechaYHora || ""}
            <button class="btn2"  onclick="borrarMensaje(${index})">Borrar</button>
            </p>`;
        mensajesDiv.innerHTML += mensaje;
    });
}

function borrarMensaje(index) {
    userDataArray.splice(index, 1);
    localStorage.setItem("userDataArray", JSON.stringify(userDataArray));
    mostrarMensajes();
}

document.getElementById("guardarMensaje").addEventListener("click", function () {
    guardarDatos();
    mostrarMensajes();
});

window.onload = mostrarMensajes;

document.getElementById("guardarMensaje").addEventListener("click", function () {
    window.location.href = "index.html";
});