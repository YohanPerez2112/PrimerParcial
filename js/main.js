let allProducts = [];
let cart = []; // [{id, title, price, qty}]

const grid = document.getElementById("productsGrid");
const template = document.getElementById("productTemplate");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

// Sidebar
const cartSidebar = document.getElementById("cartSidebar");
const toggleCartBtn = document.getElementById("toggleCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");

toggleCartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("active");
});
closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
});

// Renderizar productos
function renderProducts(products) {
  grid.innerHTML = "";
  products.forEach(p => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".product-img").src = p.image;
    clone.querySelector(".product-title").textContent = p.title;
    clone.querySelector(".product-desc").textContent = p.description;
    clone.querySelector(".product-price").textContent = `$${p.price}`;
    
    // Añadir al carrito
    clone.querySelector(".add-cart-btn").addEventListener("click", () => addToCart(p));
    
    grid.appendChild(clone);
  });
}

// Cargar productos del JSON
async function loadProducts() {
  const res = await fetch("data/products.json");
  allProducts = await res.json();
  renderProducts(allProducts);
}

// Añadir al carrito (con control de cantidad)
function addToCart(product) {
  const found = cart.find(item => item.id === product.id);
  if (found) {
    found.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

// Eliminar un producto (uno en uno)
function removeFromCart(id) {
  const index = cart.findIndex(item => item.id === id);
  if (index > -1) {
    cart[index].qty--;
    if (cart[index].qty === 0) {
      cart.splice(index, 1);
    }
  }
  renderCart();
}

// Renderizar carrito
function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.title} - $${item.price} 
      <span class="qty">x${item.qty}</span>
    `;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.onclick = () => removeFromCart(item.id);

    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
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

// Eventos del sidebar de categorías
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
