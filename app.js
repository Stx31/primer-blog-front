const formulario = document.getElementById("formularioContacto"); // Selecciona el formulario correcto
formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que se envíe el formulario

    // Obtener los valores de los campos
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const mensaje = document.getElementById("mensaje").value;

    // Guardar los valores en Local Storage
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("email", email);
    localStorage.setItem("mensaje", mensaje);

    // Mostrar un mensaje en pantalla
    alert("Datos guardados en Local Storage.");

    // Limpiar el formulario
    formulario.reset();
});