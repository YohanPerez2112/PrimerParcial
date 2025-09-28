class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const price = this.getAttribute("price");
    const desc = this.getAttribute("description");
    const image = this.getAttribute("image");

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 10px;
          text-align: center;
        }
        img { width: 100%; border-radius: 6px; }
        h3 { margin: 5px 0; }
      </style>
      <div class="card">
        <img src="${image}" alt="${name}">
        <h3>${name}</h3>
        <p>${desc}</p>
        <span><strong>$${price}</strong></span>
      </div>
    `;
  }
}

customElements.define("product-card", ProductCard);
