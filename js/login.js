const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

// Credenciales quemadas (educativo)
const validUser = "admin";
const validPass = "1234";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === validUser && pass === validPass) {
    window.location.href = "index.html";
  } else {
    errorMsg.textContent = "Usuario o contraseña incorrectos";
    errorMsg.style.color = "red";
  }
});
