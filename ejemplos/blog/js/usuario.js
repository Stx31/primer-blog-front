
 $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  
  $("body").on("submit", "#form-editar", function(event) {
    event.preventDefault();
    if ($("#form-editar").valid()) {
        editarElemento();
    }
  })   
  

  $("body").on("submit", "#form-agregar", function(event) {
    event.preventDefault();
    if ($("#form-agregar").valid()) {
      agregarElemento();
    }
  });


  function obtenerLista() {
    fetch("api/usuario.php")
        .then((response) => response.json())
        .then((elementos) => {
            mostrarLista(elementos);
        })
  }

  function mostrarLista(elementos) {
  
    document.getElementById("lista-elementos").innerHTML = "";
    elementos.forEach((elemento) => {
        document.getElementById("lista-elementos").innerHTML += `
        <tr>
            <td>${elemento.id}</td>
            <td>${elemento.nombre}</td>
            <td>${elemento.correo}</td>
            <td>
                <button class="btn btn-primary" onclick="editarModal(${elemento.id})">
                    <i class="fas fa-edit" title="Editar registro"></i>
                </button>
                <button class="btn btn-danger" onclick="eliminarModal(${elemento.id})">
                    <i class="fas fa-trash-alt" title="Eliminar registro"></i>
                </button>
            </td>
        </tr>
        `;
    })
    
  }

 
  function editarModal(id){
   
    $("#modal-editar").modal("show");
    
    fetch(`api/usuario.php?id=${id}`)
        .then((response) => response.json())
        .then((elemento) => {
            document.getElementById("form-editar-id").value = elemento[0].id;
            document.getElementById("form-editar-nombre").value = elemento[0].nombre;
            document.getElementById("form-editar-correo").value = elemento[0].correo;
        })
  }      

 
  function agregarElemento() {
   
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;

  
    if (nombre === "") {
      swal("Error", "Debes ingresar un nombre", "error");
      return;
    }
   
    if (correo === "") {
      swal("Error", "Debes ingresar el correo", "error");
      return;
    }

  
    fetch("api/usuario.php", {
      method: "POST",
      body: JSON.stringify({ nombre, correo }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((resultado) => {
       
        if (resultado.estado === true) {
         
          $("#modal-agregar").modal("hide");
          $(".modal-backdrop").remove();

          
          Swal.fire({
            icon: "success",
            title: "Solicitud exitosa",
            text: "Se ha realizado la solicitud de manera exitosa.",
          });

          
          obtenerLista();

      
          document.getElementById('nombre').value = '';
          document.getElementById('correo').value = '';
        } else {
          
          swal(
            "Error",
            "Ocurrió un error al intentar agregar el elemento",
            "error"
          );
        }
      });
  }

  
  function editarElemento(){

    const id = document.getElementById("form-editar-id").value;
    const nombre = document.getElementById("form-editar-nombre").value;
    const correo = document.getElementById("form-editar-correo").value;

   
    if (nombre == "") {
        swal("Error", "Debes ingresar un nombre", "error");
        return;
    }
    if (correo == "") {
        swal("Error", "Debes ingresar un correo", "error");
        return;
    }
    
    fetch(`api/usuario.php?id=${id}&opcion=modificar`, {
        method: "POST",
        body: JSON.stringify({ id, nombre, correo }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((resultado) => {
         
            if (resultado.estado === true) {
           
                $("#modal-editar").modal("hide");

                Swal.fire({
                    icon: "success",
                    title: "Solicitud exitosa",
                    text: "Se ha realizado la edición de manera exitosa.",
                });

                
                obtenerLista();
            } else {
               
                swal(
                    "Error",
                    "Ocurrió un error al intentar editar el elemento",
                    "error"
                );
            }
        });
  }     

 
  function eliminarModal(id) {
    
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar el elemento",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`api/usuario.php?id=${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((resultado) => {
           
            if (resultado.estado === true) {
              
              Swal.fire({
                icon: "success",
                title: "Solicitud exitosa",
                text: "Se ha eliminado el registro.",
              });
              obtenerLista();
            } else {
              
              swal(
                "Error",
                "Ocurrió un error al intentar eliminar el elemento",
                "error"
              );
            }
          });
      }
    });
  }

  
  obtenerLista();