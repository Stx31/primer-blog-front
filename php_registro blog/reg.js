var userDataArray = JSON.parse(localStorage.getItem("userDataArray")) || [];
var mensajesDiv = document.getElementById("mensajes");
var formularioContacto = document.getElementById("formularioContacto");

formularioContacto.addEventListener("submit", function (e) {
    e.preventDefault();
    guardarDatos();
});

var cancelarBoton = document.getElementById("cancelar");
cancelarBoton.addEventListener("click", function () {
    borrarDatosIngresadosYRedirigir();
});

function borrarDatosIngresadosYRedirigir() {
    document.getElementById("emailInput").value = "";
    document.getElementById("nameInput").value = "";
    document.getElementById("messageInput").value = "";
   
}

function mostrarMensajes() {
    mensajesDiv.innerHTML = "";
    userDataArray.forEach(function (userData, index) {
        var fechaFormateada = formatearFecha(new Date(userData.fecha));
        var mensajeHTML = `
            <div class="caja">
                <p>${userData.email || ""}
                <br>${userData.name || ""}
                <br>${userData.message || ""}
                <br>${fechaFormateada || ""}
                <button class="btn2" data-index="${index}">Borrar</button>
                </p>
            </div>`;
        mensajesDiv.innerHTML += mensajeHTML;
    });
}
var guardarMensajeBoton = document.getElementById("guardarMensaje");
guardarMensajeBoton.addEventListener("click", function () {
   
    window.location.href = 'index.html';
});

function formatearFecha(fecha) {
    var mes = fecha.toLocaleString('default', { month: 'long' });
    var dia = fecha.getDate();
    var año = fecha.getFullYear();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    return `${mes} ${dia} ${año} - ${hora}:${minutos}`;
}

function guardarDatos() {
    var email = document.getElementById("emailInput").value;
    var name = document.getElementById("nameInput").value;
    var message = document.getElementById("messageInput").value;

    if (!email || !name || !message) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    var fechaActual = new Date();
    var fechaFormateada = formatearFecha(fechaActual);

    var nuevoDato = {
        email: email,
        name: name,
        message: message,
        fecha: fechaFormateada
    };

    userDataArray.push(nuevoDato);

    localStorage.setItem("userDataArray", JSON.stringify(userDataArray));
    mostrarMensajes();

    document.getElementById("emailInput").value = "";
    document.getElementById("nameInput").value = "";
    document.getElementById("messageInput").value = "";
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
