var userDataArray = JSON.parse(localStorage.getItem("userDataArray")) || [];
var mensajesDiv = document.getElementById("mensajes");
var fechaHoraDiv = document.getElementById("fechaHora"); 

function mostrarMensajes() {
    mensajesDiv.innerHTML = "";
    userDataArray.forEach(function (userData, index) {
        var mensaje = `
            <p>Email: ${userData.email || ""}
            <br>Nombre: ${userData.name || ""}
            <br>Mensaje: ${userData.message || ""}
            </p>`;
        mensajesDiv.innerHTML += mensaje;

        
    });
}
var boton = document.getElementById("guardarMensaje");

boton.addEventListener("click", function() {
  
    window.location.href = "index.html";
});



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


    document.getElementById("emailInput").value = "";
    document.getElementById("nameInput").value = "";
    document.getElementById("messageInput").value = "";

  
    fechaHoraDiv.innerHTML = "Fecha y hora de última acción: " + fechaFormateada;
}

function cancelar() {
    localStorage.removeItem("userDataArray");
    userDataArray = [];
    mostrarMensajes();
}

document.getElementById("guardarMensaje").addEventListener("click", function () {
    guardarDatos();
});

document.getElementById("cancelar").addEventListener("click", function () {
    cancelar();
});

mostrarMensajes();

