// contact.js - JavaScript SIMPLE para la página de Contacto
// Este código hace que tu formulario y página funcionen correctamente

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
// 2. FORMULARIO DE CONTACTO
// ==========================================
// Cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', function() {
  
  // INICIALIZACIÓN: Llamamos a la nueva función
  actualizarContadorCarrito();

  // Buscamos el formulario en la página
  const formularioContacto = document.querySelector('.form');
  
  // ... (Resto de tu código para el formulario se mantiene igual) ...
  // Cuando alguien envía el formulario
  if (formularioContacto) {
    formularioContacto.addEventListener('submit', function(evento) {
      // Evitamos que la página se recargue
      evento.preventDefault();
      
      // Obtenemos los valores que escribió el usuario
      const nombre = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const asunto = document.getElementById('topic').value;
      const mensaje = document.getElementById('message').value;
      const aceptoPrivacidad = document.getElementById('consent').checked;
      
      // Verificamos que todo esté lleno
      if (!email || !asunto || !mensaje) {
        alert('Por favor, completa todos los campos obligatorios del formulario.');
        console.log('Error: Campos obligatorios vacíos.');
        return;
      }
      
      if (!aceptoPrivacidad) {
        alert('Debes aceptar la política de privacidad para enviar el mensaje.');
        console.log('Error: No se aceptó la política de privacidad.');
        return;
      }
      
      // Si todo está bien, mostramos un mensaje de éxito
      console.log('Datos del formulario enviados:');
      console.log('Nombre:', nombre);
      console.log('Email:', email);
      console.log('Asunto:', asunto);
      console.log('Mensaje:', mensaje);
      
      alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
      
      // Aquí se enviaría el formulario a un servidor.
      // Por ahora, solo limpiamos el formulario.
      formularioContacto.reset();
    });
  }
});


// ==========================================
// 3. BUSCADOR DE AYUDA
// ==========================================
// Buscamos el formulario de búsqueda
const formularioBusqueda = document.querySelector('.help-search');

// Cuando alguien busca algo
if (formularioBusqueda) {
  formularioBusqueda.addEventListener('submit', function(evento) {
    // Evitamos que la página se recargue
    evento.preventDefault();
    
    // Obtenemos lo que escribió el usuario
    const busqueda = document.getElementById('helpQuery').value;
    
    // Si no escribió nada
    if (!busqueda) {
      alert('Por favor escribe algo para buscar');
      return;
    }
    
    // Mostramos un mensaje (aquí podrías agregar búsqueda real más adelante)
    alert('Buscando: ' + busqueda + '\n\nEsta función se implementará pronto.');
    console.log('Búsqueda realizada:', busqueda);
  });
}

// ==========================================
// 4. ANIMACIONES CUANDO APARECEN LAS SECCIONES
// ==========================================
// Cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', function() {
  
  // Buscamos todas las tarjetas y secciones
  const elementos = document.querySelectorAll('.channel-card, .contact-selfservice, .contact-form');
  
  // Para cada elemento
  elementos.forEach(function(elemento) {
    // Al principio lo hacemos invisible
    elemento.style.opacity = '0';
    elemento.style.transform = 'translateY(30px)'; // Lo movemos un poco hacia abajo
    elemento.style.transition = 'all 0.6s ease'; // Animación suave
  });
  
  // Función para mostrar elementos cuando son visibles
  function mostrarElementosVisibles() {
    elementos.forEach(function(elemento) {
      // Obtenemos la posición del elemento
      const posicion = elemento.getBoundingClientRect();
      const altoVentana = window.innerHeight;
      
      // Si el elemento está en la pantalla
      if (posicion.top < altoVentana - 100) {
        // Lo hacemos visible
        elemento.style.opacity = '1';
        elemento.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Revisamos cuando carga la página
  mostrarElementosVisibles();
  
  // Revisamos cada vez que el usuario hace scroll
  window.addEventListener('scroll', mostrarElementosVisibles);
});

// ==========================================
// 5. ANIMACIÓN DEL TÍTULO PRINCIPAL (HERO)
// ==========================================
// Cuando la página termina de cargar completamente
window.addEventListener('load', function() {
  
  // Buscamos la sección del título principal
  const seccionHero = document.querySelector('.contact-hero');
  
  if (seccionHero) {
    // Al principio la hacemos invisible
    seccionHero.style.opacity = '0';
    seccionHero.style.transform = 'translateY(-20px)';
    
    // Esperamos un poquito
    setTimeout(function() {
      // Configuramos la animación
      seccionHero.style.transition = 'all 0.8s ease';
      // La hacemos visible
      seccionHero.style.opacity = '1';
      seccionHero.style.transform = 'translateY(0)';
    }, 100);
  }
});

// ==========================================
// 6. EFECTO AL PASAR EL MOUSE SOBRE LAS TARJETAS
// ==========================================
// Buscamos todas las tarjetas de canales
const tarjetasCanales = document.querySelectorAll('.channel-card');

// Para cada tarjeta
tarjetasCanales.forEach(function(tarjeta) {
  
  // Cuando el mouse entra en la tarjeta
  tarjeta.addEventListener('mouseenter', function() {
    // La elevamos un poco
    this.style.transform = 'translateY(-5px)';
    this.style.transition = 'all 0.3s ease';
  });
  
  // Cuando el mouse sale de la tarjeta
  tarjeta.addEventListener('mouseleave', function() {
    // La regresamos a su posición original
    this.style.transform = 'translateY(0)';
  });
});

// ==========================================
// 7. VALIDACIÓN EN TIEMPO REAL DEL EMAIL
// ==========================================
// Buscamos el campo de email
const campoEmail = document.getElementById('email');

// Cuando el usuario escribe en el email
if (campoEmail) {
  campoEmail.addEventListener('blur', function() {
    // Obtenemos el valor del email
    const email = this.value;
    
    // Verificamos si el email es válido (tiene @ y punto)
    const esValido = email.includes('@') && email.includes('.');
    
    // Si no es válido y tiene algo escrito
    if (!esValido && email.length > 0) {
      // Cambiamos el borde a rojo
      this.style.borderColor = 'red';
      console.log('Email no válido');
    } else {
      // Cambiamos el borde a verde si es válido
      this.style.borderColor = email.length > 0 ? 'green' : '';
    }
  });
}

// ==========================================
// 8. CONTADOR DE CARACTERES PARA EL MENSAJE
// ==========================================
// Buscamos el campo de mensaje
const campoMensaje = document.getElementById('message');

// Cuando el usuario escribe en el mensaje
if (campoMensaje) {
  campoMensaje.addEventListener('input', function() {
    // Contamos cuántos caracteres escribió
    const caracteres = this.value.length;
    
    // Mostramos en consola (puedes agregar un contador visual después)
    console.log('Caracteres escritos:', caracteres);
    
    // Si escribe más de 500 caracteres, le avisamos
    if (caracteres > 500) {
      console.log('⚠️ Mensaje muy largo. Considera ser más breve.');
    }
  });
}

// ==========================================
// 9. MENSAJE EN LA CONSOLA
// ==========================================
console.log('✅ Página de Contacto cargada');
console.log('🛒 Carrito de compras enlazado a cart.html');


