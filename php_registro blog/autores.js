
var userDataArray = JSON.parse(localStorage.getItem("userDataArray")) || [];

function mostrarMensajes() {
    var mensajesDiv = document.getElementById("mensajes");
    mensajesDiv.innerHTML = "";

    if (userDataArray.length > 0) {
        userDataArray.forEach(function (userData, index) {
            var mensajeHTML = `
                <div class="caja">
                    <p>${userData.email || ""}</p>
                    <button class="btn-borrar" data-index="${index}">Borrar</button>
                </div>`;
            mensajesDiv.innerHTML += mensajeHTML;
        });

     
        var botonesBorrar = document.querySelectorAll(".btn-borrar");
        botonesBorrar.forEach(function (boton) {
            boton.addEventListener("click", function () {
                var index = boton.getAttribute("data-index");
                borrarMensaje(index);
            });
        });
    } else {
        mensajesDiv.innerHTML =`<p class="nhc">No hay datos</p>`;
    }
}


function borrarMensaje(index) {
    userDataArray.splice(index, 1);
    localStorage.setItem("userDataArray", JSON.stringify(userDataArray));
    mostrarMensajes();
}

mostrarMensajes();