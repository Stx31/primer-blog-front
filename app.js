function guardarDatos() {
    var email = document.getElementById("emailInput").value;
    var name = document.getElementById("nameInput").value;
    var message = document.getElementById("messageInput").value;
    var horaActual = new Date().toLocaleTimeString();
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", name);
    localStorage.setItem("userMessage", message);
    localStorage.setItem("userHour", horaActual);

    mostrarDatos();
}

function mostrarDatos() {
    var hora = localStorage.getItem("userHour") || "";
    var email = localStorage.getItem("userEmail") || "";
    var name = localStorage.getItem("userName") || "";
    var message = localStorage.getItem("userMessage") || "";

    document.getElementById("savedEmail").textContent = email;
    document.getElementById("savedName").textContent = name;
    document.getElementById("savedMessage").textContent = message;
    document.getElementById("savedHour").textContent = hora;
}

function borrarDatos() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userMessage");
    localStorage.removeItem("userHour");

    mostrarDatos();
}
window.onload = mostrarDatos;

document.getElementById("botonHora").addEventListener("click", function () {
    window.location.href = "index.html";
});

