// cart.js - JavaScript SIMPLE para la página del Carrito de Compras
// Este código maneja la visualización y la lógica de actualización del carrito.

// ==========================================
// 1. CONSTANTES Y VARIABLES GLOBALES
// ==========================================
const cartItemsContainer = document.getElementById('cart-items');
let carrito = []; // Array para almacenar los productos del carrito

// ==========================================
// NUEVA FUNCIÓN DE AYUDA PARA EL FORMATO DE PRECIOS
// ==========================================
/**
 * Formatea un número al estilo chileno (punto para miles, sin decimales).
 * @param {number|string} numero - El valor numérico a formatear.
 * @returns {string} El número formateado (ej: "12.345").
 */
function formatearPrecio(numero) {
    const num = parseFloat(numero);

    // Usamos Intl.NumberFormat con la localización 'es-CL' (Chile)
    // que usa el punto como separador de miles y la coma como decimal.
    // Forzamos 0 decimales ya que tus precios son números enteros grandes.
    return new Intl.NumberFormat('es-CL', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(num);
}


// ==========================================
// 2. LÓGICA DE ALMACENAMIENTO Y CARGA
// ==========================================

/**
 * Guarda el array 'carrito' en el localStorage.
 */
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log('🛒 Carrito guardado en Local Storage.');
}

/**
 * Carga el carrito desde el localStorage e inicia la renderización.
 */
function cargarCarrito() {
    const carritoJSON = localStorage.getItem('carrito');
    if (carritoJSON) {
        // Si hay datos, los parseamos
        carrito = JSON.parse(carritoJSON);
    } else {
        // Si no hay datos, inicializamos un array vacío
        carrito = [];
    }

    // Una vez cargado, renderizamos la vista
    renderizarCarrito();
    // Es CRÍTICO llamar al contador aquí para que se actualice al cargar la página
    actualizarContadorCarrito();
}

// ==========================================
// 3. RENDERIZADO DEL CARRITO
// ==========================================

/**
 * Dibuja la lista de productos en el HTML.
 */
function renderizarCarrito() {
    cartItemsContainer.innerHTML = ''; // Limpiar la lista

    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Tu carrito está vacío. ¡Explora nuestra <a href="products.html">Tienda</a>!</p>';
        actualizarResumen(); // Asegura que el resumen se muestre en $0.00
        return;
    }

    // Renderizar cada producto
    carrito.forEach((producto, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item-card');

        // Calcular el precio total de esta línea de producto
        const precioLinea = (parseFloat(producto.precio) * parseInt(producto.cantidad)); // Ya no usamos toFixed aquí
        
        itemElement.innerHTML = `
            <div class="item-details">
                <img src="assets/producto-placeholder.jpg" alt="${producto.nombre}" class="item-image" aria-hidden="true">
                <div class="item-info">
                    <h3 class="item-title">${producto.nombre}</h3>
                    <p class="item-price">$${formatearPrecio(producto.precio)} c/u</p>
                    ${producto.talla ? `<p class="item-attribute">Talla: ${producto.talla}</p>` : ''}
                </div>
            </div>

            <div class="item-actions">
                <div class="quantity-control">
                    <button class="qty-btn remove-one" data-index="${index}">-</button>
                    <input type="number" class="item-quantity" value="${producto.cantidad}" min="1" data-index="${index}" aria-label="Cantidad de ${producto.nombre}">
                    <button class="qty-btn add-one" data-index="${index}">+</button>
                </div>
                <div class="item-line-total">
                    <span class="label">Total:</span> 
                    <span class="price-value">$${formatearPrecio(precioLinea)}</span>
                </div>
                <button class="remove-item-btn" data-index="${index}" aria-label="Eliminar ${producto.nombre}">Eliminar</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Una vez renderizado, actualizar el resumen
    actualizarResumen();
}

// ==========================================
// 4. MANEJO DE EVENTOS (CANTIDAD Y ELIMINACIÓN)
// ==========================================

/**
 * Actualiza la cantidad de un producto en el carrito.
 * @param {number} index - Índice del producto en el array 'carrito'.
 * @param {number} nuevaCantidad - Nueva cantidad deseada.
 */
function manejarCambioDeCantidad(index, nuevaCantidad) {
    // Aseguramos que la cantidad sea un número válido y mayor o igual a 1
    if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
        // Esto solo ocurre si alguien manipula el input. El +/- ya lo maneja.
        alert('La cantidad debe ser un número entero positivo.');
        return;
    }

    carrito[index].cantidad = nuevaCantidad;
    guardarCarrito();
    // Volvemos a renderizar para actualizar totales, vista y contador
    renderizarCarrito(); 
    actualizarContadorCarrito(); 
}

/**
 * Elimina un producto del carrito.
 * @param {number} index - Índice del producto a eliminar.
 */
function eliminarProducto(index) {
    const nombreProducto = carrito[index].nombre;

    if (confirm(`¿Estás seguro de que quieres eliminar ${nombreProducto} del carrito?`)) {
        // Eliminar el producto del array usando el índice
        carrito.splice(index, 1);

        // Guardar y renderizar
        guardarCarrito();
        renderizarCarrito();
        actualizarContadorCarrito();
        alert(`Se eliminó: ${nombreProducto}`);
    }
}

// Escucha de eventos para la lista de productos (Delegación)
cartItemsContainer.addEventListener('click', function (e) {
    const target = e.target;
    // Obtenemos el índice guardado en el atributo data-index
    const index = target.dataset.index;

    if (index === undefined) return; // Si no hay índice, no es un botón de acción.

    const parsedIndex = parseInt(index);

    if (target.classList.contains('remove-item-btn')) {
        // ELIMINAR
        eliminarProducto(parsedIndex);
    } else if (target.classList.contains('add-one')) {
        // SUMAR CANTIDAD (+)
        const input = target.parentNode.querySelector('.item-quantity');
        const nuevaCantidad = parseInt(input.value) + 1;
        manejarCambioDeCantidad(parsedIndex, nuevaCantidad);
    } else if (target.classList.contains('remove-one')) {
        // RESTAR CANTIDAD (-)
        const input = target.parentNode.querySelector('.item-quantity');
        const nuevaCantidad = parseInt(input.value) - 1;

        if (nuevaCantidad >= 1) {
            manejarCambioDeCantidad(parsedIndex, nuevaCantidad);
        } else {
            // Si la cantidad llega a 0, preguntamos si desea eliminarlo
            eliminarProducto(parsedIndex);
        }
    }
});

// Escucha de eventos para cambios directos en el input de cantidad
cartItemsContainer.addEventListener('change', function (e) {
    const target = e.target;
    const index = target.dataset.index;

    if (target.classList.contains('item-quantity') && index !== undefined) {
        const nuevaCantidad = parseInt(target.value);
        const parsedIndex = parseInt(index);

        // Si la cantidad es inválida, volvemos al valor anterior y alertamos
        if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
            target.value = carrito[parsedIndex].cantidad;
            alert('La cantidad debe ser un número entero positivo.');
        } else {
            manejarCambioDeCantidad(parsedIndex, nuevaCantidad);
        }
    }
});


// ==========================================
// 5. RESUMEN Y CÁLCULO DE TOTALES
// ==========================================

/**
 * Calcula el subtotal, impuestos y total del carrito.
 */
function calcularTotales() {
    let subtotal = 0;

    carrito.forEach(producto => {
        // Usamos parseFloat ya que los precios suelen ser decimales
        subtotal += parseFloat(producto.precio) * parseInt(producto.cantidad);
    });

    // Simulamos un impuesto (IVA)
    const impuesto = subtotal * 0.16;
    const total = subtotal + impuesto;

    // APLICAMOS EL FORMATO AQUÍ
    return {
        subtotal: formatearPrecio(subtotal),
        impuesto: formatearPrecio(impuesto),
        total: formatearPrecio(total)
    };
}

/**
 * Actualiza el bloque de resumen del pedido.
 */
function actualizarResumen() {
    const totales = calcularTotales();
    const summaryAside = document.getElementById('cart-summary');

    if (!summaryAside) return;
    
    // Contamos el número de productos únicos para el botón
    const numProductosUnicos = carrito.length;

    summaryAside.innerHTML = `
        <h2>Resumen del Pedido</h2>
        <div class="summary-line">
            <span>Subtotal:</span>
            <span class="price-value">$${totales.subtotal}</span>
        </div>
        <div class="summary-line">
            <span>IVA (16%):</span>
            <span class="price-value">$${totales.impuesto}</span>
        </div>
        <hr>
        <div class="summary-line total">
            <span>Total a Pagar:</span>
            <span class="price-value">$${totales.total}</span>
        </div>
        <button class="checkout-btn" id="checkout-btn" ${numProductosUnicos === 0 ? 'disabled' : ''}>
            Finalizar Compra (${numProductosUnicos} productos)
        </button>
        <button class="continue-shopping-btn" onclick="window.location.href='products.html'">
            Seguir Comprando
        </button>
    `;
}

// ==========================================
// 6. EVENTOS GENERALES
// ==========================================

/**
 * Actualiza el contador de productos en el botón del carrito del header.
 */
function actualizarContadorCarrito() {
    const botonCarrito = document.querySelector('.cart-btn');
    if (botonCarrito) {
        // Sumamos la cantidad de todos los productos
        let totalItems = carrito.reduce((sum, item) => sum + parseInt(item.cantidad), 0);
        let contador = botonCarrito.querySelector('.cart-count');

        if (!contador) {
            // Este caso debería ser raro si el HTML ya tiene el span, pero es seguro mantenerlo
            contador = document.createElement('span');
            contador.classList.add('cart-count');
            botonCarrito.appendChild(contador);
        }

        if (totalItems > 0) {
            contador.textContent = totalItems;
            // Asegura que el contador esté visible
            contador.style.display = 'inline'; 
        } else {
            // Mejor práctica: Ocultar el span si el carrito está vacío
            contador.textContent = '';
            contador.style.display = 'none';
        }
    }
}

// Cuando la página carga, inicializamos todo
document.addEventListener('DOMContentLoaded', function () {
    cargarCarrito();

    // Manejador del botón de Finalizar Compra
    const summaryAside = document.getElementById('cart-summary');
    if (summaryAside) {
        summaryAside.addEventListener('click', function (e) {
            if (e.target.id === 'checkout-btn') {
                if (carrito.length > 0) {
                    alert('🎉 ¡Pago exitoso! Aquí iría la redirección a la página de pago/confirmación.');

                    // OPCIONAL: Limpiar el carrito después del pago simulado
                    // carrito = []; 
                    // guardarCarrito();
                    // renderizarCarrito();
                } else {
                    alert('Tu carrito está vacío. ¡Necesitas agregar productos antes de pagar!');
                }
            }
        });
    }
});

console.log('✅ Carrito de compras cargado correctamente');