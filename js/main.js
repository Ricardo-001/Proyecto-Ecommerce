// main.js - JavaScript SIMPLE para la Página de Inicio
// Este código hace que tu página principal sea interactiva y atractiva

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
    
    // Si el carrito está vacío, removemos el contador
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
// BUSCAMOS el botón del carrito en la página y aseguramos que funcione bien
const botonCarrito = document.querySelector('.cart-btn');

if (botonCarrito) {
  botonCarrito.addEventListener('click', function() {
    // AHORA REDIRIGIMOS a la página del carrito
    window.location.href = 'cart.html'; 
  });
}
// NOTA: La función anterior de 'main.js' que solo te enviaba a products.html ha sido reemplazada por esta.


// ==========================================
// 2. ANIMACIÓN DEL TÍTULO PRINCIPAL (WELCOME)
// ==========================================
// Cuando la página termina de cargar completamente
window.addEventListener('load', function() {
  
  // INICIALIZACIÓN: Llamamos a la nueva función
  actualizarContadorCarrito();
  
  // Buscamos la sección de bienvenida
  const seccionWelcome = document.querySelector('.welcome');
  
  if (seccionWelcome) {
    // Buscamos el título y el subtítulo
    const titulo = seccionWelcome.querySelector('.welcome-title');
    const subtitulo = seccionWelcome.querySelector('.welcome-subtitle');
    const botones = seccionWelcome.querySelector('.welcome-actions');
    
    // Al principio los hacemos invisibles
    if (titulo) {
      titulo.style.opacity = '0';
      titulo.style.transform = 'translateY(-30px)';
    }
    
    if (subtitulo) {
      subtitulo.style.opacity = '0';
    }
    
    if (botones) {
      botones.style.opacity = '0';
    }
    
    // Animación de aparición
    setTimeout(function() {
      if (titulo) {
        titulo.style.opacity = '1';
        titulo.style.transform = 'translateY(0)';
        titulo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      }
    }, 100); // Título aparece primero
    
    setTimeout(function() {
      if (subtitulo) {
        subtitulo.style.opacity = '1';
        subtitulo.style.transition = 'opacity 0.8s ease';
      }
    }, 500); // Subtítulo después
    
    setTimeout(function() {
      if (botones) {
        botones.style.opacity = '1';
        botones.style.transition = 'opacity 0.8s ease';
      }
    }, 900); // Botones al final
  }
});

// ==========================================
// 3. ANIMACIÓN DE LAS TARJETAS DE PROYECTO
// ==========================================
// Cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', function() {
  
  // Buscamos todas las tarjetas del proyecto
  const tarjetasProyecto = document.querySelectorAll('.project-card');
  
  // Para cada tarjeta
  tarjetasProyecto.forEach(function(tarjeta, indice) {
    // Al principio la hacemos invisible
    tarjeta.style.opacity = '0';
    tarjeta.style.transform = 'translateY(40px)';
    tarjeta.style.transition = 'all 0.6s ease';
  });
  
  // Función para mostrar tarjetas cuando son visibles
  function mostrarTarjetasVisibles() {
    tarjetasProyecto.forEach(function(tarjeta, indice) {
      // Obtenemos la posición de la tarjeta
      const posicion = tarjeta.getBoundingClientRect();
      const altoVentana = window.innerHeight;
      
      // Si la tarjeta está en la pantalla
      if (posicion.top < altoVentana - 100) {
        // Esperamos un poco para crear efecto cascada
        setTimeout(function() {
          tarjeta.style.opacity = '1';
          tarjeta.style.transform = 'translateY(0)';
        }, indice * 200); // Cada tarjeta espera 200ms más
      }
    });
  }
  
  // Revisamos cuando carga la página
  mostrarTarjetasVisibles();
  
  // Revisamos cada vez que el usuario hace scroll
  window.addEventListener('scroll', mostrarTarjetasVisibles);
});

// ==========================================
// 4. ANIMACIÓN DE LAS TARJETAS DEL EQUIPO
// ==========================================
// Cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', function() {
  
  // Buscamos todas las tarjetas del equipo
  const tarjetasEquipo = document.querySelectorAll('.team-card');
  
  // Para cada tarjeta
  tarjetasEquipo.forEach(function(tarjeta) {
    // Al principio la hacemos invisible
    tarjeta.style.opacity = '0';
    tarjeta.style.transform = 'translateY(30px)';
    tarjeta.style.transition = 'all 0.6s ease';
  });
  
  // Función para mostrar tarjetas cuando son visibles
  function mostrarEquipoVisible() {
    tarjetasEquipo.forEach(function(tarjeta, indice) {
      // Obtenemos la posición de la tarjeta
      const posicion = tarjeta.getBoundingClientRect();
      const altoVentana = window.innerHeight;
      
      // Si la tarjeta está en la pantalla
      if (posicion.top < altoVentana - 100) {
        // Esperamos un poco para crear efecto cascada
        setTimeout(function() {
          tarjeta.style.opacity = '1';
          tarjeta.style.transform = 'translateY(0)';
        }, indice * 150); // Cada tarjeta espera 150ms más
      }
    });
  }
  
  // Revisamos cada vez que el usuario hace scroll
  window.addEventListener('scroll', mostrarEquipoVisible);
});

// ==========================================
// 5. ANIMACIÓN DE LAS CARACTERÍSTICAS
// ==========================================
// Cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', function() {
  
  // Buscamos todas las tarjetas de características
  const tarjetasFeatures = document.querySelectorAll('.feature-card');
  
  // Para cada tarjeta
  tarjetasFeatures.forEach(function(tarjeta) {
    // Al principio la hacemos invisible
    tarjeta.style.opacity = '0';
    tarjeta.style.transform = 'translateY(30px)';
    tarjeta.style.transition = 'all 0.6s ease';
  });
  
  // Función para mostrar características cuando son visibles
  function mostrarFeaturesVisibles() {
    tarjetasFeatures.forEach(function(tarjeta, indice) {
      // Obtenemos la posición de la tarjeta
      const posicion = tarjeta.getBoundingClientRect();
      const altoVentana = window.innerHeight;
      
      // Si la tarjeta está en la pantalla
      if (posicion.top < altoVentana - 100) {
        // Esperamos un poco para crear efecto cascada
        setTimeout(function() {
          tarjeta.style.opacity = '1';
          tarjeta.style.transform = 'translateY(0)';
        }, indice * 100); // Cada tarjeta espera 100ms más
      }
    });
  }
  
  // Revisamos cada vez que el usuario hace scroll
  window.addEventListener('scroll', mostrarFeaturesVisibles);
});

// ==========================================
// 6. EFECTO AL PASAR EL MOUSE SOBRE LAS TARJETAS
// ==========================================
// Buscamos todas las tarjetas de la página
const todasLasTarjetas = document.querySelectorAll('.project-card, .team-card, .feature-card');

// Para cada tarjeta
todasLasTarjetas.forEach(function(tarjeta) {
  
  // Cuando el mouse entra en la tarjeta
  tarjeta.addEventListener('mouseenter', function() {
    // La elevamos un poco y la hacemos un poquito más grande
    this.style.transform = 'translateY(-8px) scale(1.02)';
    this.style.transition = 'all 0.3s ease';
    this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
  });
  
  // Cuando el mouse sale de la tarjeta
  tarjeta.addEventListener('mouseleave', function() {
    // La regresamos a su posición y tamaño original
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '';
  });
});

// ==========================================
// 7. EFECTO EN LOS BOTONES
// ==========================================
// Buscamos todos los botones
const todosLosBotones = document.querySelectorAll('.button');

// Para cada botón
todosLosBotones.forEach(function(boton) {
  
  // Cuando el mouse entra en el botón
  boton.addEventListener('mouseenter', function() {
    // Lo hacemos un poquito más grande
    this.style.transform = 'scale(1.05)';
    this.style.transition = 'all 0.2s ease';
  });
  
  // Cuando el mouse sale del botón
  boton.addEventListener('mouseleave', function() {
    // Lo regresamos a su tamaño original
    this.style.transform = 'scale(1)';
  });
  
  // Cuando se hace click en el botón
  boton.addEventListener('click', function() {
    // Lo hacemos un poquito más pequeño por un momento
    this.style.transform = 'scale(0.95)';
    
    // Después de 100ms lo regresamos a su tamaño
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 100);
  });
});

// ==========================================
// 8. SCROLL SUAVE AL HACER CLICK EN ENLACES
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
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==========================================
// 9. MOSTRAR/OCULTAR HEADER AL HACER SCROLL
// ==========================================
// Variable para guardar la posición anterior del scroll
let ultimaPosicionScroll = window.scrollY;
const header = document.querySelector('.site-header');

// Cuando el usuario hace scroll
window.addEventListener('scroll', function() {
  // Obtenemos la posición actual
  const posicionActual = window.scrollY;
  
  // Si está haciendo scroll hacia abajo
  if (posicionActual > ultimaPosicionScroll && posicionActual > 100) {
    // Ocultamos el header
    header.style.transform = 'translateY(-100%)';
    header.style.transition = 'transform 0.3s ease';
  } else {
    // Mostramos el header
    header.style.transform = 'translateY(0)';
  }
  
  // Actualizamos la última posición
  ultimaPosicionScroll = posicionActual;
});

// ==========================================
// 10. INDICADOR DE PROGRESO DE SCROLL
// ==========================================
// Función para actualizar el progreso del scroll
function actualizarProgresoScroll() {
  // Calculamos cuánto ha scrolleado el usuario (en porcentaje)
  const altoVentana = window.innerHeight;
  const altoDocumento = document.documentElement.scrollHeight;
  const scrolleado = window.scrollY;
  const progreso = (scrolleado / (altoDocumento - altoVentana)) * 100;
  
  // Guardamos el valor para usarlo en CSS si queremos
  document.body.style.setProperty('--scroll-progress', progreso + '%');
  
  // Mostramos en consola (solo para ver)
  if (progreso > 0 && progreso < 100) {
    console.log('Progreso de scroll: ' + Math.round(progreso) + '%');
  }
}

// Actualizamos cuando el usuario hace scroll
window.addEventListener('scroll', actualizarProgresoScroll);

// ==========================================
// 11. MENSAJE EN LA CONSOLA
// ==========================================
console.log('✅ Página de Inicio cargada correctamente');
console.log('🛒 Carrito de compras enlazado a cart.html');