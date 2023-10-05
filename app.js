var userDataArray = JSON.parse(localStorage.getItem("userDataArray")) || [];
var mensajesDiv = document.getElementById("mensajes");

function mostrarMensajes() {
    var userDataArrayJSON = localStorage.getItem("userDataArray");
    if (userDataArrayJSON) {
        userDataArray = JSON.parse(userDataArrayJSON);
    }

    var mensajesDiv = document.getElementById("mensajes");
    mensajesDiv.innerHTML = "";
    userDataArray.forEach(function (userData, index) {
        var fechaFormateada = userData.fecha ? new Date(userData.fecha).toLocaleString() : "";
        var mensaje = `
            <div class="mensaje">
                <p>Email: ${userData.email || ""}
                <br>Nombre: ${userData.name || ""}
                <br>Mensaje: ${userData.message || ""}
                <br>Fecha: ${fechaFormateada || ""}
                <button class="btn2"  onclick="borrarMensaje(${index})">Borrar</button>
                </p>
            </div>`;
        mensajesDiv.innerHTML += mensaje;
    });
}

function borrarMensaje(index) {
    userDataArray.splice(index, 1);
    localStorage.setItem("userDataArray", JSON.stringify(userDataArray));
    mostrarMensajes(); 
}


mostrarMensajes();