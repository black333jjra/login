const API_URL = "http://127.0.0.1:8000";

if (document.getElementById("login-form")) {
  // --- LOGIN ---
  const form = document.getElementById("login-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username, password }),
    });

    const data = await res.json();
    const msg = document.getElementById("mensaje");

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      window.location.href = "panel.html";
    } else {
      msg.textContent = data.detail || "Error al iniciar sesión";
    }
  });
}

if (document.getElementById("info")) {
  // --- PANEL ---
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  }

  fetch(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("info").textContent =
        `Usuario: ${data.usuario} (${data.email})`;
    })
    .catch(() => {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
}

// Selección de elementos
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Al cargar, aplicar el tema guardado o el del sistema
if (
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  html.classList.add('dark');
  themeToggle.textContent = '☀️';
} else {
  html.classList.remove('dark');
  themeToggle.textContent = '🌙';
}

// Alternar tema al hacer clic
themeToggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  const isDark = html.classList.contains('dark');
  localStorage.theme = isDark ? 'dark' : 'light';
  themeToggle.textContent = isDark ? '☀️' : '🌙';
});
