var userDataArray = JSON.parse(localStorage.getItem("userDataArray")) || [];
var mensajesDiv = document.getElementById("mensajes");

function mostrarMensajes() {
    mensajesDiv.innerHTML = "";
    userDataArray.forEach(function (userData, index) {
        var fechaFormateada = userData.fecha ? new Date(userData.fecha).toLocaleString() : "";
        var mensaje = `
        <div  class="caja"> 
                <p>Email: ${userData.email || ""}
                <br>Nombre: ${userData.name || ""}
                <br>Mensaje: ${userData.message || ""}
                <br>Fecha: ${fechaFormateada || ""}
                <button class="btn2"  data-index="${index}">Borrar</button>
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

mensajesDiv.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn2")) {
        var index = event.target.getAttribute("data-index");
        borrarMensaje(index);
    }
});

mostrarMensajes();