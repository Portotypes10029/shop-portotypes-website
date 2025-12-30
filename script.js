// Dark mode toggle
const toggleBtn = document.getElementById("dark-toggle");
const body = document.body;

// Load saved preference
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Burger menu toggle
  document.getElementById("burger").addEventListener("click", function () {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("active");
  });
});

fetch("/products.json")
  .then(res => res.json())
  .then(products => {
    const grid = document.getElementById("products-grid");

    products.forEach(prod => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${prod.image}" alt="${prod.title}" loading="lazy">
        <div class="product-content">
          <h3>${prod.title}</h3>
          <p class="product-desc">${prod.description}</p>
          <div class="product-price">${prod.price}</div>
        </div>
        <button class="buy-btn">Buy on Etsy</button>
      `;

      card.querySelector(".buy-btn").addEventListener("click", () => {
        window.open(prod.etsy, "_blank");
      });

      grid.appendChild(card);
    });
  });
