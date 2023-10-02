// Función para guardar datos en el almacenamiento local
function guardarDatos() {
    var email = document.getElementById("emailInput").value;
    var name = document.getElementById("nameInput").value;
    var message = document.getElementById("messageInput").value;

    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", name);
    localStorage.setItem("userMessage", message);

    mostrarDatos();
}

// Función para mostrar los datos almacenados
function mostrarDatos() {
    var email = localStorage.getItem("userEmail") || "";
    var name = localStorage.getItem("userName") || "";
    var message = localStorage.getItem("userMessage") || "";

    document.getElementById("savedEmail").textContent = email;
    document.getElementById("savedName").textContent = name;
    document.getElementById("savedMessage").textContent = message;
}

// Función para borrar datos del almacenamiento local
function borrarDatos() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userMessage");

    mostrarDatos();
}

// Asegurarse de que los datos se muestren cuando la página se carga
window.onload = mostrarDatos;

// Obtener elementos relevantes para mostrar la hora
const mostrarHoraBtn = document.getElementById('mostrarHoraBtn');
const horaClicP = document.getElementById('horaClic');

// Agregar un evento al botón para mostrar la hora
mostrarHoraBtn.addEventListener('click', () => {
    const fecha = new Date();
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();

    const horaFormateada = `${horas}:${minutos}:${segundos}`;

    horaClicP.textContent = `Hora en el clic: ${horaFormateada}`;
});