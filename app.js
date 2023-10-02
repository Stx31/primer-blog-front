function guardarDatos() {
    var email = document.getElementById("emailInput").value;
    var name = document.getElementById("nameInput").value;
    var message = document.getElementById("messageInput").value;

    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", name);
    localStorage.setItem("userMessage", message);

    mostrarDatos(); 
}

function mostrarDatos() {
    var email = localStorage.getItem("userEmail") || "";
    var name = localStorage.getItem("userName") || "";
    var message = localStorage.getItem("userMessage") || "";

    document.getElementById("savedEmail").textContent = email;
    document.getElementById("savedName").textContent = name;
    document.getElementById("savedMessage").textContent = message;
}

function borrarDatos() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userMessage");

    mostrarDatos(); 
}

window.onload = mostrarDatos; 
