// ================= CART LOGIC =================
let cart = JSON.parse(localStorage.getItem("km_cart")) || [];

function toggleCart(show) {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("overlay");
    if (show) {
        drawer.classList.add("active");
        overlay.classList.add("active");
        renderCart();
    } else {
        drawer.classList.remove("active");
        overlay.classList.remove("active");
    }
}

function addToCart(id) {
    const product = State.getProducts().find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price || product.minPrice,
            image: product.image,
            qty: 1
        });
    }

    saveCart();
    UI.showToast(`${product.name} added to cart!`, 'success');
}

function saveCart() {
    localStorage.setItem("km_cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById("cart-count-badge");
    if (badge) badge.innerText = count;
}

function renderCart() {
    const container = document.getElementById("cartItems");
    const totalEl = document.getElementById("cart-total");
    
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 2rem; color: #777;">Your cart is empty.</div>';
        if (totalEl) totalEl.innerText = "₹0";
        return;
    }

    let total = 0;
    container.innerHTML = cart.map((item, index) => {
        total += item.price * item.qty;
        return `
            <div class="cart-item">
                <img src="${item.image && item.image.startswith("http') ? item.image : '../assets/images/placeholder.png'}">
                <div style="flex: 1;">
                    <h4 style="font-size: 0.95rem; margin-bottom: 5px;">${item.name}</h4>
                    <p style="color: var(--primary-color); font-weight: 700;">₹${item.price}</p>
                    <div class="qty-control">
                        <button onclick="updateQty(${index}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button onclick="updateQty(${index}, 1)">+</button>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #ccc; cursor: pointer; font-size: 1.2rem;">&times;</button>
            </div>
        `;
    }).join('');

    if (totalEl) totalEl.innerText = `₹${total.toLocaleString()}`;
}

function updateQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty < 1) {
        cart.splice(index, 1);
    }
    saveCart();
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

// ================= CAROUSEL =================
let currentSlide = 0;
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-track img');
    if (!track || slides.length === 0) return;

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 5000);
}

// ================= CATEGORIES =================
function filterByCategory(category) {
    const products = State.getProducts();
    const filtered = category === 'All' ? products : products.filter(p => p.category === category);
    renderMarketplace(filtered);
}

function handleSearch() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const products = State.getProducts().filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
    );
    renderMarketplace(products);
}

function renderMarketplace(products = State.getProducts()) {
    const container = document.getElementById("buyer-product-grid");
    if (!container) return;

    container.innerHTML = products.map(p => `
        <div class="card fade-in">
            <img src="${p.image && p.image.startswith("http') ? p.image : '../assets/images/placeholder.png'}" alt="${p.name}">
            <div style="flex: 1;">
                <p style="font-size: 0.75rem; color: #aaa; text-transform: uppercase;">${p.category}</p>
                <h3>${p.name}</h3>
                <div class="rating">★★★★★ (5)</div>
                <div class="price">
                    <span class="old">₹${Math.floor((p.price || p.minPrice) * 1.2)}</span>
                    <span class="new">₹${p.price || p.minPrice}</span>
                </div>
            </div>
            <button class="add-cart" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    renderMarketplace();
    updateCartCount();
});

