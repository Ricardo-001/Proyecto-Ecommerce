export function createApp(rootElement) {
  if (!rootElement) return;

  const header = document.createElement('header');
  header.className = 'app-header';
  header.innerHTML = '<h1>Proyecto Frontend</h1>';

  const main = document.createElement('main');
  main.className = 'app-main';
  main.innerHTML = `
    <section class="card">
      <h2>Bienvenido</h2>
      <p>Tu proyecto frontend básico está listo.</p>
      <button id="helloBtn" class="button">Haz clic</button>
    </section>
  `;

  const footer = document.createElement('footer');
  footer.className = 'app-footer';
  footer.innerHTML = '<small>© ' + new Date().getFullYear() + ' Tu Nombre</small>';

  rootElement.appendChild(header);
  rootElement.appendChild(main);
  rootElement.appendChild(footer);

  const button = document.getElementById('helloBtn');
  button.addEventListener('click', () => {
    alert('¡Hola! 🎉');
  });
}


