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


/*funcion para cargar los productos desde el Json */


document.addEventListener('DOMContentLoaded', function () {
    // Recupero los datos del carrito guardados en localStorage
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

            // Agrego la funcionalidad de eliminar productos del localStorage
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

// Función para guardar los productos en localStorage
function guardarCarritoEnLocalStorage() {
    const productos = containerCartProducts.querySelectorAll('.cart-product');
    const tempDiv = document.createElement('div');
    for (let i = 0; i < productos.length; i++) {
        tempDiv.appendChild(productos[i].cloneNode(true));
    }

    // Guardar el carrito
    localStorage.setItem('carritoHTML', tempDiv.innerHTML);
    localStorage.setItem('contador', contador);
    localStorage.setItem('totalActual', totalActual);
}

// Mostrar y ocultar el mensaje de "carrito vacío"
function actualizarMensajeCarritoVacio() {
    const productos = containerCartProducts.querySelectorAll('.cart-product');
    if (productos.length === 0) {
        mensajeVacio.style.display = 'block';
    } else {
        mensajeVacio.style.display = 'none';
    }
}
