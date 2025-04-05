const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const totalPagar = document.querySelector('.total-pagar');
const contadorProductos = document.getElementById('contador-productos');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

//cuando toque el boton añadir añada el producto
const btnsañadiralcarrito = document.querySelectorAll('.btn-add-cart');

btnsañadiralcarrito.forEach(btn => {
    btn.addEventListener('click', agregarAlCarrito);
});
// hago el contador 
let contador = 0;
let totalActual = 0;
let carrito = [];

function agregarAlCarrito(e) {
    const producto = e.target.closest('.items');
    const titulo = producto.querySelector('h2').textContent;
    const precio = producto.querySelector('.price').textContent;

    //creo el producto para que entre en el carrito 
    const nuevoProducto = document.createElement('div');
    nuevoProducto.classList.add('cart-product');
    nuevoProducto.innerHTML = `
        <div class="info-cart-product">
            <span class="cantidad-producto-carrito">1</span>
            <p class="titulo-producto-carrito">${titulo}</p>
            <span class="precio-producto-carrito">${precio}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="icon-close">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    `;
    //agrega el producto nuevo al carrito 
    containerCartProducts.insertBefore(nuevoProducto, containerCartProducts.lastElementChild);

    //se actualiza el contador 
    contador++;
    contadorProductos.textContent = contador;

    //puedo sumar las cosas que agrego
    const precioSinSimbolo = parseInt(precio.replace('$', '').replace(',', ''));
    totalActual += precioSinSimbolo;
    totalPagar.textContent = `$${totalActual.toLocaleString()}`;

//voy hacer para eliminar productos del carrito 
const btnEliminar = nuevoProducto.querySelector('.icon-close');
    btnEliminar.addEventListener('click', () => {
        // Eliminar el elemento del carrito
        nuevoProducto.remove();

        // Restar del total y actualizar contador
        totalActual -= precioSinSimbolo;
        totalPagar.textContent = `$${totalActual.toLocaleString()}`;
        contador--;
        contadorProductos.textContent = contador;
    });
}
