let allProducts = []; // Guardamos todos los productos
const grid = document.getElementById("productsGrid");
const template = document.getElementById("productTemplate");

// Función para renderizar productos
function renderProducts(products) {
  grid.innerHTML = ""; // Limpiar antes de renderizar
  products.forEach(p => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".product-img").src = p.image;
    clone.querySelector(".product-title").textContent = p.title;
    clone.querySelector(".product-desc").textContent = p.description;
    clone.querySelector(".product-price").textContent = `$${p.price}`;
    grid.appendChild(clone);
  });
}

// Cargar productos del JSON
async function loadProducts() {
  const res = await fetch("data/products.json");
  allProducts = await res.json();
  renderProducts(allProducts); // Mostrar todos al inicio
}

// Filtrar productos por categoría
function filterProducts(category) {
  if (category === "all") {
    renderProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

// Eventos en el sidebar
function setupSidebar() {
  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-category]")) {
      e.preventDefault();
      const category = e.target.getAttribute("data-category");
      filterProducts(category);
    }
  });
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  setupSidebar();
});
