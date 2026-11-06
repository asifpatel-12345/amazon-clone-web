// Mock Product Dataset
const products = [
  {
    id: 1,
    title: "Wireless Noise Cancelling Headphones",
    price: 4999,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "Smart Watch with Health Tracking",
    price: 2999,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "Ergonomic Running Shoes",
    price: 1899,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "Minimalist Modern Backpack",
    price: 1499,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    title: "Stainless Steel Water Bottle (1L)",
    price: 799,
    category: "home",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    title: "Mechanical RGB Gaming Keyboard",
    price: 3499,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80"
  }
];

// State Management
let cart = [];

// DOM Elements
const productGrid = document.getElementById("productGrid");
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");
const cartCountElement = document.getElementById("cartCount");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
});

// Render Products Grid
function renderProducts(items) {
  productGrid.innerHTML = "";
  
  if (items.length === 0) {
    productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No products found.</p>`;
    return;
  }

  items.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-image" />
      <div>
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">₹${product.price.toLocaleString("en-IN")}</p>
      </div>
      <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
}

// Add Item to Cart
function addToCart(productId) {
  const item = products.find(p => p.id === productId);
  if (item) {
    cart.push(item);
    updateCartUI();
  }
}

// Remove Item from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// Update Cart Display & Totals
function updateCartUI() {
  cartCountElement.textContent = cart.length;
  cartItemsContainer.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p style="text-align: center; color: #666;">Your cart is empty.</p>`;
  } else {
    cart.forEach((item, index) => {
      total += item.price;
      const itemRow = document.createElement("div");
      itemRow.className = "cart-item";
      itemRow.innerHTML = `
        <div>
          <strong>${item.title}</strong>
          <div>₹${item.price.toLocaleString("en-IN")}</div>
        </div>
        <button onclick="removeFromCart(${index})" style="background: none; border: none; color: red; cursor: pointer;">Remove</button>
      `;
      cartItemsContainer.appendChild(itemRow);
    });
  }

  cartTotalElement.textContent = total.toLocaleString("en-IN");
}

// Search Functionality
function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = products.filter(p => p.title.toLowerCase().includes(query));
  renderProducts(filtered);
}

searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") handleSearch();
});

// Modal Toggles
cartBtn.addEventListener("click", () => {
  cartModal.style.display = "flex";
});

closeCartBtn.addEventListener("click", () => {
  cartModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = "none";
  }
});