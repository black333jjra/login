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


// for removing the `pristine` class that prevents CSS animation on load
document.addEventListener("click",e => {
	let tar = e.target;
	if (tar.name == "toggle")
		tar.removeAttribute("class");
});