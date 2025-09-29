let allProducts = [];
let cart = []; // [{id, title, price, qty}]

const grid = document.getElementById("productsGrid");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

// Sidebar
const cartSidebar = document.getElementById("cartSidebar");
const toggleCartBtn = document.getElementById("toggleCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");

if (toggleCartBtn && closeCartBtn) {
  toggleCartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("active");
  });
  closeCartBtn.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
  });
}

// Renderizar productos CON CUSTOM ELEMENTS
function renderProducts(products) {
  if (!grid) {
    console.error("No se encontró el elemento productsGrid");
    return;
  }
  
  grid.innerHTML = "";
  
  if (products.length === 0) {
    grid.innerHTML = '<p class="no-products">No se encontraron productos</p>';
    return;
  }
  
  products.forEach(product => {
    // Crear el custom element
    const productCard = document.createElement('product-card');
    
    // Establecer atributos
    productCard.setAttribute('name', product.title);
    productCard.setAttribute('price', product.price);
    productCard.setAttribute('description', product.description);
    productCard.setAttribute('image', product.image);
    productCard.setAttribute('data-id', product.id);
    
    // Añadir evento de clic para el carrito
    productCard.addEventListener('click', () => addToCart(product));
    
    grid.appendChild(productCard);
  });
}

// El resto del código se mantiene igual...
async function loadProducts() {
  try {
    console.log("Cargando productos...");
    const res = await fetch("data/products.json");
    
    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }
    
    allProducts = await res.json();
    console.log("Productos cargados:", allProducts);
    renderProducts(allProducts);
  } catch (error) {
    console.error("Error cargando productos:", error);
    if (grid) {
      grid.innerHTML = `
        <div class="error-message">
          <p>Error cargando los productos: ${error.message}</p>
          <p>Verifica que el archivo data/products.json exista</p>
        </div>
      `;
    }
  }
}

function addToCart(product) {
  const found = cart.find(item => item.id === product.id);
  if (found) {
    found.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
  updateCartCount();
}

function removeFromCart(id) {
  const index = cart.findIndex(item => item.id === id);
  if (index > -1) {
    cart[index].qty--;
    if (cart[index].qty === 0) {
      cart.splice(index, 1);
    }
  }
  renderCart();
  updateCartCount();
}

function renderCart() {
  if (!cartItems) return;
  
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<li class="empty-cart">El carrito está vacío</li>';
    if (cartTotal) cartTotal.textContent = "0.00";
    return;
  }

  cart.forEach(item => {
    total += item.price * item.qty;

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="cart-item-info">
        <span class="cart-item-name">${item.title}</span>
        <span class="cart-item-price">$${item.price}</span>
      </div>
      <div class="cart-item-controls">
        <span class="qty">x${item.qty}</span>
        <button class="remove-item">X</button>
      </div>
    `;

    const removeBtn = li.querySelector(".remove-item");
    removeBtn.onclick = () => removeFromCart(item.id);

    cartItems.appendChild(li);
  });

  if (cartTotal) cartTotal.textContent = total.toFixed(2);
}

function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalItems;
  }
}

function filterProducts(category) {
  if (category === "all") {
    renderProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

function setupSidebar() {
  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-category]")) {
      e.preventDefault();
      const category = e.target.getAttribute("data-category");
      filterProducts(category);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado, inicializando...");
  loadProducts();
  setupSidebar();
  updateCartCount();
});