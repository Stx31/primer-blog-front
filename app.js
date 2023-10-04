var userDataArray = JSON.parse(localStorage.getItem("userDataArray")) || [];
var mensajesDiv = document.getElementById("mensajes");

userDataArray.forEach(function(userData, index) {
    var mensaje = `
        <p>Email: ${userData.email || ""}
        <br>Nombre: ${userData.name || ""}
        <br>Mensaje: ${userData.message || ""}
        <br>Hora: ${userData.hora || ""}
        <button onclick="borrarMensaje(${index})">Borrar</button>
        </p>`;
    mensajesDiv.innerHTML += mensaje;
});

function borrarMensaje(index) {
    userDataArray.splice(index, 1);
    localStorage.setItem("userDataArray", JSON.stringify(userDataArray));
    location.reload(); 
}