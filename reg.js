var userDataArray = [];

function guardarDatos() {
    var email = document.getElementById("emailInput").value;
    var name = document.getElementById("nameInput").value;
    var message = document.getElementById("messageInput").value;
    var fechaActual = new Date();
    var fechaFormateada = fechaActual.toLocaleString();

    var nuevoDato = {
        email: email,
        name: name,
        message: message,
        fecha: fechaFormateada, 
    };
    userDataArray.push(nuevoDato);
    localStorage.setItem("userDataArray", JSON.stringify(userDataArray));
    mostrarMensajes();
    window.location.href = "index.html";
}

function borrarMensaje(index) {
    userDataArray.splice(index, 1);
    localStorage.setItem("userDataArray", JSON.stringify(userDataArray));
    mostrarMensajes();
}

document.getElementById("guardarMensaje").addEventListener("click", function () {
    guardarDatos();
   
});

document.getElementById("cancelar").addEventListener("click", function () {
    localStorage.removeItem("userDataArray");
    userDataArray = [];
    mostrarMensajes();
});

function mostrarMensajes() {
    var userDataArrayJSON = localStorage.getItem("userDataArray");
    if (userDataArrayJSON) {
        userDataArray = JSON.parse(userDataArrayJSON);
    }

    var mensajesDiv = document.getElementById("mensajes");
    mensajesDiv.innerHTML = "";
    userDataArray.forEach(function (userData, index) {
        var fechaFormateada = userData.fecha;
        var mensaje = `
            <p>Email: ${userData.email || ""}
            <br>Nombre: ${userData.name || ""}
            <br>Mensaje: ${userData.message || ""}
            <br>Fecha: ${fechaFormateada || ""}
            <button class="btn2"  onclick="borrarMensaje(${index})">Borrar</button>
            </p>`;
        mensajesDiv.innerHTML += mensaje;
    });
}