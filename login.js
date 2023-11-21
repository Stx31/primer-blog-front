function submitForm() {
    var usernameInput = document.getElementById('nombre').value;
    var passwordInput = document.getElementById('edad').value;


    if (usernameInput === '1234' && passwordInput === '1234') {
    
        window.location.href = 'index.html';
    } else {
       
        console.log('Credenciales incorrectas');
    }
}
function submitForm() {
    var usernameInput = document.getElementById('nombre').value;
    var passwordInput = document.getElementById('edad').value;

  
    var formData = new FormData();
    formData.append('nombre', usernameInput);
    formData.append('edad', passwordInput);

   
    var expressUrl = 'http://localhost:3000/guardar-datos';

  
    fetch(expressUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta de Express:', data);
        
        
        if (usernameInput === '1234' && passwordInput === '1234') {
          
            window.location.href = 'index.html';
        } else {
         
            console.log('Credenciales incorrectas');
        }
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}
