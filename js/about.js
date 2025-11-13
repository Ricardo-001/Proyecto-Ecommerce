/// about.js - JavaScript SIMPLE para la página Quiénes Somos
// Este código hace que tu página sea más interactiva y bonita

// ==========================================
// NUEVO: LÓGICA CENTRALIZADA DEL CARRITO
// ==========================================

/**
 * Función para actualizar el contador del carrito en el header (LEYENDO LOCALSTORAGE).
 */
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
    
    if (totalItems === 0) {
      if (contador) contador.remove();
    } else {
      contador.textContent = totalItems;
    }
  }
}

// ==========================================
// 1. ANTERIOR: BOTÓN DEL CARRITO
// ==========================================
// Busca el botón del carrito en la página
const botonCarrito = document.querySelector('.cart-btn');

// Cuando alguien hace click en el carrito
if (botonCarrito) {
  botonCarrito.addEventListener('click', function() {
    // AHORA REDIRIGIMOS a la página del carrito
    window.location.href = 'cart.html';
  });
}
// NOTA: Se ha corregido la redirección de products.html a cart.html.

// ==========================================
// 2. ANIMACIONES CUANDO APARECEN LAS TARJETAS
// ==========================================
// Cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', function() {
  
  // INICIALIZACIÓN: Llamamos a la nueva función
  actualizarContadorCarrito();

  // Buscamos todas las tarjetas de la página
  const tarjetas = document.querySelectorAll('.about-card, .mv-card, .team-card, .value-card');
  
  // ... (Resto de tu código para animar tarjetas se mantiene igual) ...
  // Para cada tarjeta
  tarjetas.forEach(function(tarjeta) {
    // Al principio la hacemos invisible
    tarjeta.style.opacity = '0';
    tarjeta.style.transform = 'translateY(30px)'; // La movemos un poco hacia abajo
    tarjeta.style.transition = 'all 0.6s ease'; // Animación suave de 0.6 segundos
  });
  
  // Función para revisar si una tarjeta está visible en la pantalla
  function mostrarTarjetasVisibles() {
    const alturaVentana = window.innerHeight;
    
    tarjetas.forEach(function(tarjeta) {
      // Posición de la tarjeta con respecto a la parte superior de la ventana
      const rect = tarjeta.getBoundingClientRect();
      
      // Si la tarjeta está visible (y ha pasado el 10% del viewport)
      if (rect.top < alturaVentana * 0.9 && rect.bottom > 0) {
        tarjeta.style.opacity = '1';
        tarjeta.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Revisamos al inicio
  mostrarTarjetasVisibles(); 
  
  // Y cada vez que el usuario hace scroll
  window.addEventListener('scroll', mostrarTarjetasVisibles);
});


// ==========================================
// 3. ANIMACIÓN DEL TÍTULO PRINCIPAL (HERO)
// ==========================================
// Cuando la página termina de cargar completamente
window.addEventListener('load', function() {
  
  // Buscamos la sección del título principal
  const seccionHero = document.querySelector('.about-hero');
  
  if (seccionHero) {
    // Al principio la hacemos invisible
    seccionHero.style.opacity = '0';
    seccionHero.style.transform = 'translateY(-20px)'; // La movemos un poco hacia arriba
    
    // Esperamos un poquito (100 milisegundos)
    setTimeout(function() {
      // Configuramos la animación
      seccionHero.style.transition = 'all 0.8s ease';
      // La hacemos visible
      seccionHero.style.opacity = '1';
      seccionHero.style.transform = 'translateY(0)'; // La movemos a su posición original
    }, 100);
  }
});

// ==========================================
// 4. EFECTO AL PASAR EL MOUSE SOBRE LAS TARJETAS
// ==========================================
// Buscamos todas las tarjetas
const todasLasTarjetas = document.querySelectorAll('.team-card, .value-card, .mv-card');

// Para cada tarjeta
todasLasTarjetas.forEach(function(tarjeta) {
  
  // Cuando el mouse entra en la tarjeta
  tarjeta.addEventListener('mouseenter', function() {
    // La elevamos un poco y la hacemos un poquito más grande
    this.style.transform = 'translateY(-10px) scale(1.02)';
    this.style.transition = 'all 0.3s ease'; // Animación rápida
  });
  
  // Cuando el mouse sale de la tarjeta
  tarjeta.addEventListener('mouseleave', function() {
    // La regresamos a su posición y tamaño original
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// ==========================================
// 5. SCROLL SUAVE PARA ENLACES
// ==========================================
// Buscamos todos los enlaces que empiezan con #
document.querySelectorAll('a[href^="#"]').forEach(function(enlace) {
  
  // Cuando alguien hace click en el enlace
  enlace.addEventListener('click', function(evento) {
    evento.preventDefault(); // Evitamos el comportamiento normal
    
    // Buscamos la sección a la que apunta el enlace
    const destino = document.querySelector(this.getAttribute('href'));
    
    // Si existe esa sección
    if (destino) {
      // Hacemos scroll suave hacia ella
      destino.scrollIntoView({
        behavior: 'smooth', // Movimiento suave
        block: 'start' // Nos posicionamos al inicio de la sección
      });
    }
  });
});

// ==========================================
// 6. MENSAJE EN LA CONSOLA
// ==========================================
console.log('✅ Página Quiénes Somos cargada');
console.log('🛒 Carrito de compras enlazado a cart.html');

