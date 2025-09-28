function loadFragment(id, file) {
  fetch(`components/${file}`)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadFragment("header", "header.html");
  loadFragment("footer", "footer.html");
  loadFragment("sidebar", "sidebar.html");
});
