// dashboard.js - JavaScript SIMPLE para el Dashboard Financiero
// Este código hace que tu panel de finanzas sea interactivo

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
// 2. FILTROS DEL DASHBOARD
// ==========================================
// Cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', function() {
  
  // INICIALIZACIÓN: Llamamos a la nueva función
  actualizarContadorCarrito();

  // Buscamos el formulario de filtros
  const formularioFiltros = document.querySelector('.dash-filters');
  
  // ... (Resto de tu código para el dashboard se mantiene igual) ...
  // Cuando alguien hace click en "Aplicar"
  if (formularioFiltros) {
    formularioFiltros.addEventListener('submit', function(evento) {
      // Evitamos que la página se recargue
      evento.preventDefault();
      
      // Obtenemos los valores seleccionados
      const selects = formularioFiltros.querySelectorAll('select');
      const rangoTiempo = selects[0].value;
      const comparacion = selects[1].value;
      
      // Mostramos un mensaje
      alert('Filtros aplicados:\nRango: ' + rangoTiempo + '\nComparar con: ' + comparacion);
      
      // Mostramos en consola
      console.log('Filtros aplicados:');
      console.log('Rango de tiempo:', rangoTiempo);
      console.log('Comparación:', comparacion);
      
      // Aquí iría la lógica para recargar las gráficas y los datos.
      // Por ahora solo mostramos el mensaje.
    });
  }
});


// ==========================================
// 3. ANIMACIÓN DE LOS NÚMEROS (KPIs)
// ==========================================
// Función para animar números desde 0 hasta el valor final
function animarNumero(elemento, valorFinal, duracion) {
  // Limpiamos el símbolo $ y las comas del número
  let numero = valorFinal.replace(/[$,]/g, '');
  // Lo convertimos a número
  numero = parseFloat(numero);
  
  // Si no es un número válido, salimos
  if (isNaN(numero)) return;
  
  // Empezamos desde 0
  let valorActual = 0;
  // Calculamos cuánto aumentar en cada paso
  const incremento = numero / 50;
  
  // Creamos un intervalo que se ejecuta cada 20 milisegundos
  const intervalo = setInterval(function() {
    valorActual += incremento;
    
    // Si llegamos al valor final
    if (valorActual >= numero) {
      // Mostramos el valor final
      if (valorFinal.includes('$')) {
        elemento.textContent = '$' + numero.toLocaleString();
      } else if (valorFinal.includes('%')) {
        elemento.textContent = numero.toFixed(1) + '%';
      } else {
        elemento.textContent = numero.toLocaleString();
      }
      // Detenemos el intervalo
      clearInterval(intervalo);
    } else {
      // Mostramos el valor actual
      if (valorFinal.includes('$')) {
        elemento.textContent = '$' + Math.floor(valorActual).toLocaleString();
      } else if (valorFinal.includes('%')) {
        elemento.textContent = valorActual.toFixed(1) + '%';
      } else {
        elemento.textContent = Math.floor(valorActual).toLocaleString();
      }
    }
  }, 20);
}

// ==========================================
// 4. ANIMACIONES CUANDO APARECEN LOS KPIs
// ==========================================
// Cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', function() {
  
  // Buscamos todas las tarjetas KPI
  const tarjetasKPI = document.querySelectorAll('.kpi-card');
  
  // Para cada tarjeta KPI
  tarjetasKPI.forEach(function(tarjeta, indice) {
    // Al principio la hacemos invisible
    tarjeta.style.opacity = '0';
    tarjeta.style.transform = 'translateY(30px)';
    tarjeta.style.transition = 'all 0.5s ease';
    
    // Esperamos un poco más para cada tarjeta (efecto cascada)
    setTimeout(function() {
      tarjeta.style.opacity = '1';
      tarjeta.style.transform = 'translateY(0)';
      
      // Animamos el número dentro de la tarjeta
      const valorElemento = tarjeta.querySelector('.kpi-value');
      if (valorElemento) {
        const valorOriginal = valorElemento.textContent;
        animarNumero(valorElemento, valorOriginal, 1000);
      }
    }, indice * 100); // Cada tarjeta espera 100ms más que la anterior
  });
  
  // Buscamos los paneles
  const paneles = document.querySelectorAll('.panel');
  
  // Para cada panel
  paneles.forEach(function(panel) {
    // Al principio lo hacemos invisible
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(30px)';
    panel.style.transition = 'all 0.6s ease';
  });
  
  // Función para mostrar paneles cuando son visibles
  function mostrarPanelesVisibles() {
    paneles.forEach(function(panel) {
      // Obtenemos la posición del panel
      const posicion = panel.getBoundingClientRect();
      const altoVentana = window.innerHeight;
      
      // Si el panel está en la pantalla
      if (posicion.top < altoVentana - 100) {
        // Lo hacemos visible
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Revisamos cuando carga la página
  mostrarPanelesVisibles();
  
  // Revisamos cada vez que el usuario hace scroll
  window.addEventListener('scroll', mostrarPanelesVisibles);
});

// ==========================================
// 5. ANIMACIÓN DEL TÍTULO PRINCIPAL (HERO)
// ==========================================
// Cuando la página termina de cargar completamente
window.addEventListener('load', function() {
  
  // Buscamos la sección del título principal
  const seccionHero = document.querySelector('.dashboard-hero');
  
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
// 6. EFECTO AL PASAR EL MOUSE SOBRE LAS TARJETAS KPI
// ==========================================
// Buscamos todas las tarjetas KPI
const todasLasTarjetasKPI = document.querySelectorAll('.kpi-card');

// Para cada tarjeta
todasLasTarjetasKPI.forEach(function(tarjeta) {
  
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
// 7. ANIMACIÓN DE LA BARRA DE PROGRESO
// ==========================================
// Buscamos la barra de progreso
const barraProgreso = document.querySelector('.kpi-progress span');

if (barraProgreso) {
  // Al cargar la página, la barra empieza en 0
  barraProgreso.style.width = '0';
  barraProgreso.style.transition = 'width 1.5s ease';
  
  // Después de un momento, la animamos hasta su valor final
  setTimeout(function() {
    barraProgreso.style.width = '68%'; // Este valor viene del HTML
  }, 500);
}

// ==========================================
// 8. RESALTAR FILAS DE LA TABLA AL PASAR EL MOUSE
// ==========================================
// Buscamos todas las filas de las tablas (excepto el encabezado)
const filasTabla = document.querySelectorAll('.table tbody tr');

// Para cada fila
filasTabla.forEach(function(fila) {
  
  // Cuando el mouse entra en la fila
  fila.addEventListener('mouseenter', function() {
    // Cambiamos el color de fondo
    this.style.backgroundColor = 'rgba(99, 102, 241, 0.05)';
    this.style.transition = 'background-color 0.2s ease';
  });
  
  // Cuando el mouse sale de la fila
  fila.addEventListener('mouseleave', function() {
    // Regresamos al color original
    this.style.backgroundColor = '';
  });
});

// ==========================================
// 9. ACTUALIZACIÓN AUTOMÁTICA DEL DASHBOARD (SIMULACIÓN)
// ==========================================
// Función que simula la actualización de datos cada 30 segundos
function simularActualizacion() {
  console.log('🔄 Dashboard actualizado (simulación)');
  
  // Aquí podrías hacer una petición al servidor para obtener datos nuevos
  // Por ahora solo mostramos un mensaje en la consola
}

// Actualizamos cada 30 segundos (30000 milisegundos)
setInterval(simularActualizacion, 30000);

// ==========================================
// 10. HACER CLIC EN LAS TARJETAS KPI
// ==========================================
// Las tarjetas KPI ya tienen enlaces, pero agregamos feedback visual
todasLasTarjetasKPI.forEach(function(tarjeta) {
  tarjeta.addEventListener('click', function(evento) {
    // Si el usuario hizo click en un enlace válido (#detalle-...)
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      evento.preventDefault(); // Evitamos el comportamiento por defecto
      
      // Mostramos información adicional
      const etiqueta = this.querySelector('.kpi-label').textContent;
      const valor = this.querySelector('.kpi-value').textContent;
      
      alert('Detalle de: ' + etiqueta + '\nValor actual: ' + valor + '\n\n(Aquí se mostraría más información)');
      
      console.log('Click en KPI:', etiqueta, valor);
    }
  });
});

// ==========================================
// 11. MENSAJE EN LA CONSOLA
// ==========================================
console.log('✅ Dashboard Financiero cargado correctamente');
console.log('🛒 Carrito de compras enlazado a cart.html');
