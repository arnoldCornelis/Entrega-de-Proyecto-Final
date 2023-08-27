//load+
let loadMoreBtn = document.getElementById('load-more');
let currentItem = 8; 

loadMoreBtn.onclick = () => {
    let boxes = document.querySelectorAll('.box-container .box'); 

    for (let i = currentItem; i < currentItem + 10 && i < boxes.length; i++) {
        boxes[i].style.display = 'inline-block';
    }

    currentItem += 4;

    if (currentItem >= boxes.length) {
        loadMoreBtn.style.display = 'none';
    }
};

//carrito

const carrito= document.getElementById('carrito');
const elementos1= document.getElementById('lista-1');
const lista= document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn= document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners(){
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e){
    // sweetAlert
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Producto agregado correctamente'
      })
///////////////////////////////////////////

    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento){
    const infoElemento= {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
}


function insertarCarrito (elemento){
    const row= document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src= "${elemento.imagen}" width= 100 height=150px>
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
        ${elemento.precio}
        </td>
        <td>
            <a herf= "#" class= "borrar" data-id= "${elemento.id}" >X </a>
        </td>
    `;
    lista.appendChild(row);
}


function eliminarElemento(e){
    e.preventDefault();
    let elemento,
        elementoId;

        if(e.target.classList.contains('borrar')){
            e.target.parentElement.parentElement.remove();
            elemento= e.target.parentElement.parentElement;
            elementoId= elemento.querySelector('a').getAttribute('data-id');
        }
}

function vaciarCarrito(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
    return false;
    
}

const comprarCarritoBtn = document.getElementById('comprar-carrito');
comprarCarritoBtn.addEventListener('click', terminarCompra);

function terminarCompra() {
   
    Swal.fire('','¡Compra realizada con éxito!', 'success');

    
   
    vaciarCarrito();
}

//localStorage
Swal.fire({
    title: 'Ingresa tu nombre:',
    input: 'text',
    showCancelButton: false,
    confirmButtonText: 'Guardar',
    allowOutsideClick: false,
    inputValidator: (value) => {
        if (!value) {
            return 'Por favor, ingresa tu nombre.';
        }
    }
}).then((result) => {
    if (result.isConfirmed && result.value) {
        const nombre = result.value;
        const hora = new Date().toLocaleTimeString(); 

       
        const entradaAnterior = localStorage.getItem('entrada');
        if (entradaAnterior) {
            localStorage.setItem('entrada', entradaAnterior + `\n${nombre} - ${hora}`);
        } else {
            localStorage.setItem('entrada', `${nombre} - ${hora}`);
        }

      
    }
});

//api

let usuariosContainer1 = document.getElementById("usuariosContainer1");
let usuariosContainer2 = document.getElementById("usuariosContainer2");

let URL = 'https://randomuser.me/api/?results=2'

fetch(URL)
  .then(response => response.json())
  .then(data => {
    const users = data.results;

    users.forEach((user) => {
        const userContainer = document.createElement("div");
        userContainer.innerHTML = `
            <img src="${user.picture.thumbnail}">
            <h2>${user.name.first} ${user.name.last}</h2>
        `;
    
        if (usuariosContainer1.childElementCount < usuariosContainer2.childElementCount) {
            usuariosContainer1.appendChild(userContainer);
        } else {
            usuariosContainer2.appendChild(userContainer);
        }
    });

})
.catch(error => {
    console.error("Error en la solicitud:", error);
});