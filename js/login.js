const validUser = "admin";
const validPass = "1234";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === validUser && pass === validPass) {
    localStorage.setItem("username", user); 
    window.location.href = "index.html";
  } else {
    alert(" Usuario o contraseña incorrectos");
  }
});

