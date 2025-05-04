const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const totalPagar = document.querySelector('.total-pagar');
const contadorProductos = document.getElementById('contador-productos');
const mensajeVacio = document.querySelector('.cart-empty-message');
const continerItems = document.querySelector('.container-item');

let contador = 0;
let totalActual = 0;

// Muestra y oculta el carrito
btnCart.addEventListener('click', function () {
    containerCartProducts.classList.toggle('hidden-cart');
});

// Función para cargar los productos desde el JSON
document.addEventListener('DOMContentLoaded', function () {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            cargarProductos(data);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            alert('No se pudieron cargar los productos. Inténtalo más tarde.');
        });

    const dataGuardada = localStorage.getItem('carritoHTML');
    const contadorGuardado = localStorage.getItem('contador');
    const totalGuardado = localStorage.getItem('totalActual');

    if (dataGuardada) {
        const contenedorTemporal = document.createElement('div');
        contenedorTemporal.innerHTML = dataGuardada;
        const productos = contenedorTemporal.querySelectorAll('.cart-product');

        for (let i = 0; i < productos.length; i++) {
            const producto = productos[i];
            const precioProducto = producto.querySelector('.precio-producto-carrito').textContent;
            const precioNum = parseInt(precioProducto.replace('$', '').replace(',', ''));
            const totalDiv = containerCartProducts.querySelector('.cart-total');
            containerCartProducts.insertBefore(producto, totalDiv);

            const botonEliminar = producto.querySelector('.icon-close');
            botonEliminar.addEventListener('click', function () {
                producto.remove();
                contador--;
                totalActual -= precioNum;
                contadorProductos.textContent = contador;
                totalPagar.textContent = contador > 0 ? `$${totalActual.toLocaleString()}` : "$0";
                guardarCarritoEnLocalStorage();
                actualizarMensajeCarritoVacio();
            });
        }

        contador = contadorGuardado ? parseInt(contadorGuardado) : 0;
        totalActual = totalGuardado ? parseInt(totalGuardado) : 0;
        contadorProductos.textContent = contador;
        totalPagar.textContent = contador > 0 ? `$${totalActual.toLocaleString()}` : "$0";
    }

    actualizarMensajeCarritoVacio();
});

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

    containerCartProducts.appendChild(productoEnCarrito);
    contador++;
    totalActual += precio;
    contadorProductos.textContent = contador;
    totalPagar.textContent = `$${totalActual.toLocaleString()}`;
    
    const botonEliminar = productoEnCarrito.querySelector('.icon-close');
    botonEliminar.addEventListener('click', function () {
        productoEnCarrito.remove();
        contador--;
        totalActual -= precio;
        contadorProductos.textContent = contador;
        totalPagar.textContent = contador > 0 ? `$${totalActual.toLocaleString()}` : "$0";
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

function guardarCarritoEnLocalStorage() {
    const carritoHTML = containerCartProducts.innerHTML;
    localStorage.setItem('carritoHTML', carritoHTML);
    localStorage.setItem('contador', contador);
    localStorage.setItem('totalActual', totalActual);
}

function actualizarMensajeCarritoVacio() {
    if (contador === 0) {
        mensajeVacio.style.display = 'block';
    } else {
        mensajeVacio.style.display = 'none';
    }
}
