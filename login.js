document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === "admin1" && password === "admin1") {  
        window.location.href = "index.html";
    } else { 
        alert("Contraseña incorrecta");
    }
});
