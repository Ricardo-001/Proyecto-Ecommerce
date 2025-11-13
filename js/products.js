// products.js - JavaScript SIMPLE para la Página de Tienda
// Este código hace que tu tienda sea interactiva con carrito de compras
// AHORA USA localStorage PARA EL CARRITO

// ==========================================
// 1. LÓGICA CENTRAL DEL CARRITO
// ==========================================

/**
 * Función para agregar un producto al carrito usando localStorage.
 * @param {string} nombreProducto - Nombre del producto.
 * @param {number} precio - Precio del producto.
 * @param {string} [talla] - Talla del producto (opcional, aunque products.js no la use).
 */
function agregarAlCarrito(nombreProducto, precio, talla = 'NA') {
  // 1. Cargar carrito actual (o inicializarlo si no existe)
  const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  
  // 2. Crear un ID único para el producto (nombre + precio + talla para distinguir variaciones)
  const productoId = `${nombreProducto.replace(/\s/g, '-')}-${precio}-${talla}`;
  
  // 3. Buscar si ya existe ese producto en el carrito
  const productoExiste = carrito.find(item => item.id === productoId);
  
  if (productoExiste) {
    // Si ya existe, aumentamos la cantidad
    productoExiste.cantidad++;
    alert('Se agregó otra unidad de: ' + nombreProducto);
  } else {
    // Si no existe, lo agregamos al carrito
    carrito.push({
      id: productoId,
      nombre: nombreProducto,
      precio: precio,
      cantidad: 1,
      talla: talla // Aunque en products.js sea 'NA', lo guardamos para consistencia
    });
    alert('✓ Producto agregado al carrito:\n' + nombreProducto + ' - $' + precio);
  }
  
  // 4. Guardar el carrito actualizado en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));
  
  // 5. Actualizar el contador del header (siempre después de guardar)
  actualizarContadorCarrito();
  
  // Mostramos en consola
  console.log('Carrito actualizado (products.js):', carrito);
}

// Función para actualizar el contador del carrito en el header
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  const botonCarrito = document.querySelector('.cart-btn');

  if (botonCarrito) {
    let totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    let contador = botonCarrito.querySelector('.cart-count');

    if (!contador) {
        contador = document.createElement('span');
        contador.classList.add('cart-count');
        botonCarrito.appendChild(contador);
    }
    
    // Si el carrito está vacío, removemos el contador
    if (totalItems === 0) {
      if (contador) contador.remove();
    } else {
      contador.textContent = totalItems;
    }
  }
}

// ==========================================
// 2. CONFIGURACIÓN INICIAL
// ==========================================
// Buscamos el botón del carrito en la página y lo redirigimos a 'cart.html'
const botonCarritoHeader = document.querySelector('.cart-btn');

if (botonCarritoHeader) {
  botonCarritoHeader.addEventListener('click', function() {
    window.location.href = 'cart.html'; // Redirige a la página del carrito
  });
}

// Al cargar la página, actualizamos el contador con los datos de localStorage
document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);

// ==========================================
// 3. MANEJO DE CATEGORÍAS (SIN CAMBIOS)
// ==========================================
// ... (Tu código para el manejo de categorías, filtros, etc.) ...

// ==========================================
// 4. ASIGNAR CLIC A BOTONES "Añadir al Carrito"
// ==========================================
// Función que se ejecuta cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', function() {
  
  // Buscamos todos los botones con la clase 'add-to-cart-btn'
  const botonesComprar = document.querySelectorAll('.add-to-cart-btn');
  
  // Para cada botón encontrado
  botonesComprar.forEach(function(boton) {
    
    // Le agregamos la acción de agregar al carrito
    boton.addEventListener('click', function() {
      // Obtenemos los datos del producto desde los atributos data-
      const nombre = this.dataset.name;
      const precio = parseFloat(this.dataset.price); // Convertimos el precio a número
      
      // Llamamos a la función de agregar (ahora con localStorage)
      if (nombre && !isNaN(precio)) {
        agregarAlCarrito(nombre, precio);
      } else {
        console.error("Error: Faltan datos en el botón de compra.");
        alert("No se pudo agregar el producto. Faltan datos.");
      }
    });
  });
});

// ... (Resto de tu código, como contarProductos, scroll suave, etc.) ...

// ==========================================
// 11. MENSAJE EN LA CONSOLA
// ==========================================
console.log('✅ Tienda cargada correctamente');
console.log('🛒 Sistema de carrito CENTRALIZADO funcionando');