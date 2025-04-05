const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const totalPagar = document.querySelector('.total-pagar');
const contadorProductos = document.getElementById('contador-productos');
const mensajeVacio = document.querySelector('.cart-empty-message');

let contador = 0;
let totalActual = 0;

//muestro el carrito 
btnCart.addEventListener('click', function () {
    containerCartProducts.classList.toggle('hidden-cart');
});

// hago que los botones de agregar al carrito funcionen
const botonesAgregar = document.querySelectorAll('.btn-add-cart');

for (let i = 0; i < botonesAgregar.length; i++) {
    botonesAgregar[i].addEventListener('click', function (e) {
        const producto = e.target.closest('.items');
        const tituloProducto = producto.querySelector('h2').textContent;
        const precioProducto = producto.querySelector('.price').textContent;

        const nuevoElemento = document.createElement('div');
        nuevoElemento.classList.add('cart-product');
        nuevoElemento.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito"></span>
                <p class="titulo-producto-carrito">${tituloProducto}</p>
                <span class="precio-producto-carrito">${precioProducto}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        `;
        const totalDiv = containerCartProducts.querySelector('.cart-total');
        containerCartProducts.insertBefore(nuevoElemento, totalDiv);

        contador++;
        contadorProductos.textContent = contador;

        // Suma total de los precios de las cosas que se compran o añaden
        const precioSoloNumero = parseInt(precioProducto.replace('$', '').replace(',', ''));
        totalActual += precioSoloNumero;
        totalPagar.textContent = `$${totalActual.toLocaleString()}`;

        // Elimino algun producto
        const botonEliminar = nuevoElemento.querySelector('.icon-close');
        botonEliminar.addEventListener('click', function () {
            nuevoElemento.remove();
            contador--;
            contadorProductos.textContent = contador;
            totalActual -= precioSoloNumero;

            if (contador === 0) {
                totalPagar.textContent = "$0";
            } else {
                totalPagar.textContent = `$${totalActual.toLocaleString()}`;
            }

            guardarCarritoEnLocalStorage();
            actualizarMensajeCarritoVacio();
        });

        guardarCarritoEnLocalStorage();
        actualizarMensajeCarritoVacio();
    });
}

document.addEventListener('DOMContentLoaded', function () {
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

// Guardo en local storage 
function guardarCarritoEnLocalStorage() {
    const productos = containerCartProducts.querySelectorAll('.cart-product');
    const tempDiv = document.createElement('div');
    for (let i = 0; i < productos.length; i++) {
        tempDiv.appendChild(productos[i].cloneNode(true));
    }

    localStorage.setItem('carritoHTML', tempDiv.innerHTML);
    localStorage.setItem('contador', contador);
    localStorage.setItem('totalActual', totalActual);
}

// mensaje de carrito vacio 
function actualizarMensajeCarritoVacio() {
    const productos = containerCartProducts.querySelectorAll('.cart-product');
    if (productos.length === 0) {
        mensajeVacio.style.display = 'block';
    } else {
        mensajeVacio.style.display = 'none';
    }
}
