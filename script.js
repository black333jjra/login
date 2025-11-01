/* ---------------------------
   CURSOR (tu código original)
   --------------------------- */
const $bigBall = document.querySelector('.cursor__ball--big');
const $smallBall = document.querySelector('.cursor__ball--small');
const $hoverables = document.querySelectorAll('.hoverable');

// Listeners cursor
document.body.addEventListener('mousemove', onMouseMove);
for (let i = 0; i < $hoverables.length; i++) {
  $hoverables[i].addEventListener('mouseenter', onMouseHover);
  $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

// Move the cursor
function onMouseMove(e) {
  TweenMax.to($bigBall, .4, {
    x: e.pageX - 15,
    y: e.pageY - 15
  });
  TweenMax.to($smallBall, .1, {
    x: e.pageX - 5,
    y: e.pageY - 7
  });
}

// Hover an element
function onMouseHover() {
  TweenMax.to($bigBall, .3, { scale: 4 });
}
function onMouseHoverOut() {
  TweenMax.to($bigBall, .3, { scale: 1 });
}

/* ---------------------------
   MODO OSCURO / CLARO
   --------------------------- */
const darkModeBtn = document.getElementById('darkModeBtn');
const bodyEl = document.body;
const STORAGE_KEY = 'preferredTheme'; // 'light' o 'dark'

// Inicializar: leer preferencia guardada
function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light') {
    bodyEl.classList.add('light-mode');
    darkModeBtn.textContent = '☀️';
    darkModeBtn.setAttribute('aria-pressed', 'true');
  } else {
    // por defecto dejamos el tema oscuro (sin clase)
    bodyEl.classList.remove('light-mode');
    darkModeBtn.textContent = '🌙';
    darkModeBtn.setAttribute('aria-pressed', 'false');
  }
}

// Toggle y guardar preferencia
function toggleTheme() {
  const isLight = bodyEl.classList.toggle('light-mode');
  if (isLight) {
    localStorage.setItem(STORAGE_KEY, 'light');
    darkModeBtn.textContent = '☀️';
    darkModeBtn.setAttribute('aria-pressed', 'true');
  } else {
    localStorage.setItem(STORAGE_KEY, 'dark');
    darkModeBtn.textContent = '🌙';
    darkModeBtn.setAttribute('aria-pressed', 'false');
  }
}

// Listener del botón
if (darkModeBtn) {
  darkModeBtn.addEventListener('click', toggleTheme);
}

// Ejecutar inicialización
initTheme();
