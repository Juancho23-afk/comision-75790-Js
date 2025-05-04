const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const totalPagar = document.querySelector('.total-pagar');
const contadorProductos = document.getElementById('contador-productos');
const mensajeVacio = document.querySelector('.cart-empty-message');
const continerItems = document.querySelector('.container-item');

//Boton de vaciar carrito
const btnVaciarCarrito = document.createElement('button');
btnVaciarCarrito.textContent = 'Vaciar carrito';
btnVaciarCarrito.classList.add('btn-vaciar');
containerCartProducts.appendChild(btnVaciarCarrito);

let contador = 0;
let totalActual = 0;

//Mostrar y ocultar carrito
btnCart.addEventListener('click', function () {
    containerCartProducts.classList.toggle('hidden-cart');
});

//Carga productos del JSON
document.addEventListener('DOMContentLoaded', function () {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            cargarProductos(data);
        });

    const dataGuardada = localStorage.getItem('carritoHTML');
    const contadorGuardado = localStorage.getItem('contador');
    const totalGuardado = localStorage.getItem('totalActual');

    if (dataGuardada && contadorGuardado && totalGuardado) {
        const contenedorTemporal = document.createElement('div');
        contenedorTemporal.innerHTML = dataGuardada;
        const productos = contenedorTemporal.querySelectorAll('.cart-product');

        productos.forEach(producto => {
            const precioProducto = producto.querySelector('.precio-producto-carrito').textContent;
            const precioNum = parseInt(precioProducto.replace('$', '').replace(/\./g, ''));
            const totalDiv = containerCartProducts.querySelector('.cart-total');
            containerCartProducts.insertBefore(producto, totalDiv);

            const botonEliminar = producto.querySelector('.icon-close');
            botonEliminar.addEventListener('click', function () {
                producto.remove();
                contador--;
                totalActual -= precioNum;
                actualizarContadores();
                guardarCarritoEnLocalStorage();
                actualizarMensajeCarritoVacio();
            });
        });

        contador = parseInt(contadorGuardado);
        totalActual = parseInt(totalGuardado);
        actualizarContadores();
    } else {
        contador = 0;
        totalActual = 0;
        actualizarContadores();
        actualizarMensajeCarritoVacio();
    }
});

//Agrega productos al HTML desde el JSON
function cargarProductos(productos) {
    continerItems.innerHTML = '';
    productos.forEach(producto => {
        const item = document.createElement('div');
        item.classList.add('items');
        item.innerHTML = `
            <figure>
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </figure>
            <div class="info-product">
                <h3>${producto.nombre}</h3>
                <span class="price">$${producto.precio.toLocaleString()}</span>
                <button class="add-to-cart" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}" data-imagen="${producto.imagen}">
                    Agregar al carrito
                </button>
            </div>
        `;
        continerItems.appendChild(item);
    });

    const botonesAgregar = document.querySelectorAll('.add-to-cart');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function () {
            const id = boton.dataset.id;
            const nombre = boton.dataset.nombre;
            const precio = parseInt(boton.dataset.precio);
            const imagen = boton.dataset.imagen;

            agregarAlCarrito(id, nombre, precio, imagen);
            mostrarAlerta();
        });
    });
}

function agregarAlCarrito(id, nombre, precio, imagen) {
    const productoEnCarrito = document.createElement('div');
    productoEnCarrito.classList.add('cart-product');
    productoEnCarrito.innerHTML = `
        <div class="info-cart-product">
            <h3 class="titulo-producto-carrito">${nombre}</h3>
            <p class="cantidad-producto-carrito">Cantidad: 1</p>
            <p class="precio-producto-carrito">$${precio.toLocaleString()}</p>
        </div>
        <svg class="icon-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    `;

    const totalDiv = containerCartProducts.querySelector('.cart-total');
    containerCartProducts.insertBefore(productoEnCarrito, totalDiv);

    contador++;
    totalActual += precio;
    actualizarContadores();

    const botonEliminar = productoEnCarrito.querySelector('.icon-close');
    botonEliminar.addEventListener('click', function () {
        productoEnCarrito.remove();
        contador--;
        totalActual -= precio;
        actualizarContadores();
        guardarCarritoEnLocalStorage();
        actualizarMensajeCarritoVacio();
    });

    guardarCarritoEnLocalStorage();
    actualizarMensajeCarritoVacio();
}

function mostrarAlerta() {
    Swal.fire({
        title: '¡Producto agregado!',
        text: 'Se ha añadido tu producto al carrito.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

//Vaciar carrito
btnVaciarCarrito.addEventListener('click', function () {
    const productos = containerCartProducts.querySelectorAll('.cart-product');
    productos.forEach(p => p.remove());

    contador = 0;
    totalActual = 0;
    actualizarContadores();
    actualizarMensajeCarritoVacio();
    localStorage.clear();
});

function actualizarContadores() {
    contadorProductos.textContent = contador;
    totalPagar.textContent = contador > 0 ? `$${totalActual.toLocaleString()}` : "$0";
}

function guardarCarritoEnLocalStorage() {
    const carritoHTML = containerCartProducts.innerHTML;
    localStorage.setItem('carritoHTML', carritoHTML);
    localStorage.setItem('contador', contador);
    localStorage.setItem('totalActual', totalActual);
}

function actualizarMensajeCarritoVacio() {
    mensajeVacio.style.display = contador === 0 ? 'block' : 'none';
}