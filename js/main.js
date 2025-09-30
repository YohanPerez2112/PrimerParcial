let allProducts = [];
let cart = [];

const grid = document.getElementById("productsGrid");
const template = document.getElementById("productTemplate");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartSidebar = document.getElementById("cartSidebar");
const toggleCartBtn = document.getElementById("toggleCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");


toggleCartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("active");
  toggleCartBtn.style.display = "none";
});
closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  toggleCartBtn.style.display = "block";
});


function renderProducts(products) {
  grid.innerHTML = "";
  products.forEach(p => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".product-img").src = p.image;
    clone.querySelector(".product-title").textContent = p.title;
    clone.querySelector(".product-desc").textContent = p.description;
    clone.querySelector(".product-price").textContent = `$${p.price}`;

   
    clone.querySelector(".add-cart-btn").addEventListener("click", () => addToCart(p));
    grid.appendChild(clone);
  });
}


async function loadProducts() {
  const res = await fetch("data/products.json");
  allProducts = await res.json();
  renderProducts(allProducts);
}


function addToCart(product) {
  const found = cart.find(item => item.id === product.id);
  if (found) {
    found.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
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
}


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
    removeBtn.textContent = "Eliminar ";
    removeBtn.onclick = () => removeFromCart(item.id);

    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
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


const payBtn = document.getElementById("payBtn");
payBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert(" El carrito está vacío");
  } else {
    alert(" Pago realizado con éxito. ¡Gracias por tu compra!");
    cart = [];
    renderCart();
    cartSidebar.classList.remove("active");
    toggleCartBtn.textContent = "Ver Carrito";
  }
});


document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  setupSidebar();

  const interval = setInterval(() => {
    const authBtn = document.getElementById("authBtn");
    const userInfo = document.getElementById("userInfo");
    if (!authBtn || !userInfo) return;

    const user = localStorage.getItem("username");

    if (user) {
      
      userInfo.textContent = ` Bienvenido, ${user}`;
      authBtn.textContent = "Cerrar Sesión";
      authBtn.href = "#";

      //  cerrar seccion
      authBtn.onclick = (e) => {
        e.preventDefault(); 
        localStorage.removeItem("username");
        userInfo.textContent = "";
        authBtn.textContent = "Iniciar Sesión";
        authBtn.href = "login.html";
      };

    } else {
      
      userInfo.textContent = "";
      authBtn.textContent = "Iniciar Sesión";
      authBtn.href = "login.html";
    }

    clearInterval(interval); 
  }, 200);
});
