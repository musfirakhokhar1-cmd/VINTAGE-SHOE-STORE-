/**
 * WALKIFY — Premium Vintage Luxury Shoe Store
 * Pure Vanilla JavaScript Application Logic
 */

// Global State
const STATE = {
  products: [
    {
      id: 1,
      name: "Walkify Phantom Retro Runner",
      category: "Sneakers",
      description: "Crafted with hand-burnished brown leather & breathable vintage mesh for maximum comfort and timeless street appeal.",
      originalPrice: 2500,
      salePrice: 2200,
      image: "images/shoe1.jpg",
      sizes: [39, 40, 41, 42, 43, 44],
      rating: 4.9,
      tag: "NEW ARRIVAL",
      isNew: true
    },
    {
      id: 2,
      name: "Walkify Apex Street Cruiser",
      category: "Streetwear",
      description: "Sleek obsidian black leather with bronze metallic accents and high-density cushioned arch support.",
      originalPrice: 2500,
      salePrice: 2200,
      image: "images/shoe2.jpg",
      sizes: [39, 40, 41, 42, 43, 44],
      rating: 5.0,
      tag: "TRENDING",
      isNew: false
    },
    {
      id: 3,
      name: "Walkify Heritage Classic Leather",
      category: "Casual",
      description: "Rich cream and deep brown hand-stitched casual sport footwear tailored for everyday elegance.",
      originalPrice: 2500,
      salePrice: 2200,
      image: "images/shoe3.jpg",
      sizes: [39, 40, 41, 42, 43, 44],
      rating: 4.8,
      tag: "BEST SELLER",
      isNew: false
    },
    {
      id: 4,
      name: "Walkify Obsidian Dark Trainer",
      category: "Premium",
      description: "All-black stealth performance trainer featuring custom shock-absorbent outsole and gold accent stitching.",
      originalPrice: 2500,
      salePrice: 2200,
      image: "images/shoe4.jpg",
      sizes: [39, 40, 41, 42, 43, 44],
      rating: 4.9,
      tag: "PREMIUM",
      isNew: true
    },
    {
      id: 5,
      name: "Walkify Gold Monarch Luxe",
      category: "Premium",
      description: "High-top luxury sports shoe in vintage beige and bronze tones designed for bold statements.",
      originalPrice: 2500,
      salePrice: 2200,
      image: "images/shoe5.jpg",
      sizes: [39, 40, 41, 42, 43, 44],
      rating: 5.0,
      tag: "BEST SELLER",
      isNew: false
    },
    {
      id: 6,
      name: "Walkify Nomad Vintage Cruiser",
      category: "Casual",
      description: "Distressed espresso brown suede combined with durable rubber soles for effortless off-duty style.",
      originalPrice: 2500,
      salePrice: 2200,
      image: "images/shoe6.jpg",
      sizes: [39, 40, 41, 42, 43, 44],
      rating: 4.7,
      tag: "TRENDING",
      isNew: true
    },
    {
      id: 7,
      name: "Walkify Velocity Court Classic",
      category: "Formal",
      description: "Refined court sports shoe with subtle vintage tan overlays and ultra-soft memory foam lining.",
      originalPrice: 2500,
      salePrice: 2200,
      image: "images/shoe7.jpg",
      sizes: [39, 40, 41, 42, 43, 44],
      rating: 4.9,
      tag: "NEW ARRIVAL",
      isNew: true
    },
    {
      id: 8,
      name: "Walkify Urban Phantom Sport",
      category: "Streetwear",
      description: "Contemporary dark bronze & charcoal sneaker built with ergonomic sole geometry for active urban style.",
      originalPrice: 2500,
      salePrice: 2200,
      image: "images/shoe8.jpg",
      sizes: [39, 40, 41, 42, 43, 44],
      rating: 4.8,
      tag: "PREMIUM",
      isNew: false
    },
    {
      id: 9,
      name: "Walkify Imperial Burgundy Court",
      category: "Sneakers",
      description: "Retro dark burgundy and gold trim leather court sneaker built with high-traction vintage rubber soles.",
      originalPrice: 2800,
      salePrice: 2400,
      image: "images/shoe9.jpg",
      sizes: [39, 40, 41, 42, 43, 44],
      rating: 5.0,
      tag: "EXCLUSIVE",
      isNew: true
    },
    {
      id: 10,
      name: "Walkify Titan Charcoal Runner",
      category: "Streetwear",
      description: "Sleek charcoal gray and matte bronze running trainer with shock-absorbing honeycomb mid-sole.",
      originalPrice: 2600,
      salePrice: 2250,
      image: "images/shoe10.jpg",
      sizes: [39, 40, 41, 42, 43, 44],
      rating: 4.9,
      tag: "NEW ARRIVAL",
      isNew: true
    },
    {
      id: 11,
      name: "Walkify Vintage Tan Canvas Low",
      category: "Casual",
      description: "Handcrafted vintage tan leather paired with durable cream canvas uppers for refined casual wear.",
      originalPrice: 2400,
      salePrice: 2100,
      image: "images/shoe11.jpg",
      sizes: [39, 40, 41, 42, 43, 44],
      rating: 4.8,
      tag: "POPULAR",
      isNew: false
    },
    {
      id: 12,
      name: "Walkify Obsidian High-Top Luxe",
      category: "Premium",
      description: "High-top basketball silhouette wrapped in deep obsidian leather with metallic bronze eyelets.",
      originalPrice: 3000,
      salePrice: 2600,
      image: "images/shoe12.jpg",
      sizes: [39, 40, 41, 42, 43, 44],
      rating: 5.0,
      tag: "PREMIUM",
      isNew: true
    }
  ],
  cart: JSON.parse(localStorage.getItem('walkify_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('walkify_wishlist') || '[]'),
  user: JSON.parse(localStorage.getItem('walkify_user') || 'null'),
  currentFilter: 'All',
  searchQuery: '',
  sortBy: 'default',
  deliveryCharge: 250,
  activeDetailProduct: null,
  selectedDetailSize: null,
  selectedDetailQty: 1
};

// Calculate Discount Percentage Dynamically
function getDiscountPercent(original, sale) {
  return Math.round(((original - sale) / original) * 100);
}

// DOM Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  initUI();
  renderProducts();
  renderNewArrivals();
  updateCartUI();
  updateWishlistUI();
  checkAuth();
  setupEventListeners();
});

// Toast Notification System
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'warning' ? 'fa-exclamation-triangle' : 'fa-check-circle'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Auth Management
function checkAuth() {
  const userPill = document.getElementById('user-pill');
  const loginNavBtn = document.getElementById('login-nav-btn');

  if (STATE.user) {
    if (userPill) {
      userPill.innerHTML = `
        <i class="fas fa-user-circle"></i>
        <span>${STATE.user.name || STATE.user.email}</span>
        <button id="logout-btn" title="Logout" style="margin-left:8px; color:var(--gold-accent);"><i class="fas fa-sign-out-alt"></i></button>
      `;
      userPill.style.display = 'flex';
    }
    if (loginNavBtn) loginNavBtn.style.display = 'none';

    // Add listener for logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', logoutUser);
    }
  } else {
    if (userPill) userPill.style.display = 'none';
    if (loginNavBtn) loginNavBtn.style.display = 'inline-flex';
  }
}

function loginUser(email, password) {
  if (!email || !password) {
    showToast("Please enter both email and password.", "warning");
    return;
  }
  
  const user = { email: email, name: email.split('@')[0] };
  STATE.user = user;
  localStorage.setItem('walkify_user', JSON.stringify(user));
  checkAuth();
  closeModal('auth-modal');
  showToast(`Welcome back to WALKIFY, ${user.name}!`);
}

function logoutUser() {
  STATE.user = null;
  localStorage.removeItem('walkify_user');
  checkAuth();
  showToast("Logged out successfully.");
}

// Render Main Shop Products
function renderProducts() {
  const container = document.getElementById('products-container');
  if (!container) return;

  let filtered = STATE.products.filter(p => {
    const matchesFilter = STATE.currentFilter === 'All' || p.category === STATE.currentFilter;
    const matchesSearch = p.name.toLowerCase().includes(STATE.searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(STATE.searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sorting
  if (STATE.sortBy === 'price-low') {
    filtered.sort((a, b) => a.salePrice - b.salePrice);
  } else if (STATE.sortBy === 'price-high') {
    filtered.sort((a, b) => b.salePrice - a.salePrice);
  } else if (STATE.sortBy === 'popular') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-shoe-prints"></i>
        <h3>No WALKIFY shoes found</h3>
        <p>Try clearing your search or selecting a different category.</p>
        <button class="btn-secondary" style="margin-top:1.5rem;" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(product => {
    const isWishlisted = STATE.wishlist.some(item => item.id === product.id);
    const discount = getDiscountPercent(product.originalPrice, product.salePrice);

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-image-box">
          <img src="${product.image}" alt="${product.name}" loading="lazy" referrerPolicy="no-referrer">
          <span class="product-badge-discount">${discount}% OFF</span>
          <span class="product-badge-tag">${product.tag}</span>
          <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id})" title="Add to Wishlist">
            <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
          </button>
        </div>
        <div class="product-content">
          <span class="product-category">${product.category}</span>
          <h3 class="product-title">${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          <div class="product-pricing">
            <span class="price-original">Rs. ${product.originalPrice.toLocaleString()}</span>
            <span class="price-sale">Rs. ${product.salePrice.toLocaleString()}</span>
          </div>
          <div class="sizes-label">Available Sizes (Select on View Details):</div>
          <div class="size-pills">
            ${product.sizes.map(s => `<span class="size-pill">${s}</span>`).join('')}
          </div>
          <div class="product-actions">
            <button class="btn-primary" onclick="openProductDetail(${product.id})">
              <i class="fas fa-eye"></i> View Details
            </button>
            <button class="btn-secondary" onclick="quickAddToCart(${product.id})" title="Quick Add">
              <i class="fas fa-shopping-bag"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Render New Arrivals Section
function renderNewArrivals() {
  const container = document.getElementById('new-arrivals-container');
  if (!container) return;

  const newItems = STATE.products.filter(p => p.isNew || p.tag === 'NEW ARRIVAL');

  container.innerHTML = newItems.map(product => {
    const isWishlisted = STATE.wishlist.some(item => item.id === product.id);
    const discount = getDiscountPercent(product.originalPrice, product.salePrice);

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-image-box">
          <img src="${product.image}" alt="${product.name}" loading="lazy" referrerPolicy="no-referrer">
          <span class="product-badge-discount">${discount}% OFF</span>
          <span class="product-badge-tag">${product.tag}</span>
          <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id})">
            <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
          </button>
        </div>
        <div class="product-content">
          <span class="product-category">${product.category}</span>
          <h3 class="product-title">${product.name}</h3>
          <div class="product-pricing">
            <span class="price-original">Rs. ${product.originalPrice.toLocaleString()}</span>
            <span class="price-sale">Rs. ${product.salePrice.toLocaleString()}</span>
          </div>
          <button class="btn-primary" style="width:100%;" onclick="openProductDetail(${product.id})">
            Explore Details
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Open Product Detail Modal
function openProductDetail(productId) {
  const product = STATE.products.find(p => p.id === productId);
  if (!product) return;

  STATE.activeDetailProduct = product;
  STATE.selectedDetailSize = null;
  STATE.selectedDetailQty = 1;

  const modal = document.getElementById('detail-modal');
  if (!modal) return;

  const discount = getDiscountPercent(product.originalPrice, product.salePrice);

  document.getElementById('detail-img').src = product.image;
  document.getElementById('detail-category').textContent = product.category;
  document.getElementById('detail-title').textContent = product.name;
  document.getElementById('detail-desc').textContent = product.description;
  document.getElementById('detail-original-price').textContent = `Rs. ${product.originalPrice.toLocaleString()}`;
  document.getElementById('detail-sale-price').textContent = `Rs. ${product.salePrice.toLocaleString()}`;
  document.getElementById('detail-discount-badge').textContent = `${discount}% OFF`;
  document.getElementById('detail-rating').innerHTML = `
    ★ ${product.rating} <span style="color:var(--text-muted); font-size:0.8rem;">(Verified WALKIFY Review)</span>
  `;

  // Render sizes
  const sizesContainer = document.getElementById('detail-sizes-container');
  sizesContainer.innerHTML = product.sizes.map(size => `
    <button class="detail-size-btn" onclick="selectSize(${size}, this)">${size}</button>
  `).join('');

  document.getElementById('detail-qty-val').textContent = 1;

  openModal('detail-modal');
}

function selectSize(size, btnElem) {
  STATE.selectedDetailSize = size;
  const allBtns = document.querySelectorAll('.detail-size-btn');
  allBtns.forEach(b => b.classList.remove('selected'));
  btnElem.classList.add('selected');
}

function changeDetailQty(delta) {
  let newQty = STATE.selectedDetailQty + delta;
  if (newQty < 1) newQty = 1;
  STATE.selectedDetailQty = newQty;
  document.getElementById('detail-qty-val').textContent = newQty;
}

// Quick Add To Cart from product card
function quickAddToCart(productId) {
  const product = STATE.products.find(p => p.id === productId);
  if (!product) return;

  openProductDetail(productId);
  showToast("Please select your shoe size before adding to cart.", "warning");
}

// Add to Cart Logic
function addToCartFromDetail(isBuyNow = false) {
  if (!STATE.activeDetailProduct) return;

  if (!STATE.selectedDetailSize) {
    showToast("⚠️ Size required! Please select a shoe size (39-44).", "warning");
    return;
  }

  const existingIndex = STATE.cart.findIndex(
    item => item.id === STATE.activeDetailProduct.id && item.size === STATE.selectedDetailSize
  );

  if (existingIndex > -1) {
    STATE.cart[existingIndex].quantity += STATE.selectedDetailQty;
  } else {
    STATE.cart.push({
      id: STATE.activeDetailProduct.id,
      name: STATE.activeDetailProduct.name,
      price: STATE.activeDetailProduct.salePrice,
      image: STATE.activeDetailProduct.image,
      size: STATE.selectedDetailSize,
      quantity: STATE.selectedDetailQty
    });
  }

  saveCart();
  updateCartUI();
  closeModal('detail-modal');

  if (isBuyNow) {
    openCheckoutModal();
  } else {
    showToast(`Added ${STATE.activeDetailProduct.name} (Size ${STATE.selectedDetailSize}) to your bag!`);
    openCartDrawer();
  }
}

// Cart UI & LocalStorage Persistence
function saveCart() {
  localStorage.setItem('walkify_cart', JSON.stringify(STATE.cart));
}

function updateCartUI() {
  const countBadge = document.getElementById('cart-count');
  const cartBody = document.getElementById('cart-body');
  const subtotalElem = document.getElementById('cart-subtotal');
  const totalElem = document.getElementById('cart-total');

  const totalItems = STATE.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (countBadge) countBadge.textContent = totalItems;

  if (!cartBody) return;

  if (STATE.cart.length === 0) {
    cartBody.innerHTML = `
      <div class="empty-state" style="padding:2rem 0;">
        <i class="fas fa-shopping-bag"></i>
        <h3>YOUR CART IS EMPTY</h3>
        <p>Explore our vintage collection and step into style.</p>
        <button class="btn-primary" style="margin-top:1rem;" onclick="closeCartDrawer(); scrollToShop();">CONTINUE SHOPPING</button>
      </div>
    `;
    if (subtotalElem) subtotalElem.textContent = "Rs. 0";
    if (totalElem) totalElem.textContent = "Rs. 0";
    return;
  }

  let subtotal = 0;
  cartBody.innerHTML = STATE.cart.map((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" referrerPolicy="no-referrer">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-size">Size: <strong>${item.size}</strong></div>
          <div class="cart-item-price">Rs. ${item.price.toLocaleString()}</div>
          <div class="cart-item-qty">
            <button onclick="updateCartQty(${index}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateCartQty(${index}, 1)">+</button>
          </div>
        </div>
        <button class="cart-remove-btn" onclick="removeFromCart(${index})" title="Remove">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
  }).join('');

  const grandTotal = subtotal + STATE.deliveryCharge;

  if (subtotalElem) subtotalElem.textContent = `Rs. ${subtotal.toLocaleString()}`;
  if (totalElem) totalElem.textContent = `Rs. ${grandTotal.toLocaleString()}`;
}

function updateCartQty(index, delta) {
  if (STATE.cart[index]) {
    STATE.cart[index].quantity += delta;
    if (STATE.cart[index].quantity <= 0) {
      STATE.cart.splice(index, 1);
    }
    saveCart();
    updateCartUI();
  }
}

function removeFromCart(index) {
  STATE.cart.splice(index, 1);
  saveCart();
  updateCartUI();
  showToast("Item removed from cart.");
}

// Wishlist System
function toggleWishlist(productId) {
  const index = STATE.wishlist.findIndex(item => item.id === productId);
  if (index > -1) {
    STATE.wishlist.splice(index, 1);
    showToast("Removed from wishlist.");
  } else {
    const product = STATE.products.find(p => p.id === productId);
    if (product) {
      STATE.wishlist.push(product);
      showToast("Added to wishlist ❤️");
    }
  }

  localStorage.setItem('walkify_wishlist', JSON.stringify(STATE.wishlist));
  updateWishlistUI();
  renderProducts();
  renderNewArrivals();
}

function updateWishlistUI() {
  const countBadge = document.getElementById('wishlist-count');
  if (countBadge) countBadge.textContent = STATE.wishlist.length;

  const container = document.getElementById('wishlist-body');
  if (!container) return;

  if (STATE.wishlist.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="far fa-heart"></i>
        <h3>Your Wishlist is Empty</h3>
        <p>Save your favorite vintage footwear items here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = STATE.wishlist.map(product => `
    <div class="cart-item">
      <img src="${product.image}" alt="${product.name}" referrerPolicy="no-referrer">
      <div class="cart-item-info">
        <div class="cart-item-title">${product.name}</div>
        <div class="cart-item-price">Rs. ${product.salePrice.toLocaleString()}</div>
        <button class="btn-primary" style="padding:0.4rem 0.8rem; font-size:0.75rem; margin-top:0.5rem;" onclick="openProductDetail(${product.id}); closeWishlistDrawer();">
          View Details & Buy
        </button>
      </div>
      <button class="cart-remove-btn" onclick="toggleWishlist(${product.id})"><i class="fas fa-times"></i></button>
    </div>
  `).join('');
}

// Checkout & Order System
function openCheckoutModal() {
  if (STATE.cart.length === 0) {
    showToast("Your cart is empty!", "warning");
    return;
  }

  closeCartDrawer();

  // Populate Order Summary
  const subtotal = STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + STATE.deliveryCharge;

  document.getElementById('checkout-items-list').innerHTML = STATE.cart.map(item => `
    <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.4rem; color:var(--text-muted);">
      <span>${item.name} (Size ${item.size}) x${item.quantity}</span>
      <span>Rs. ${(item.price * item.quantity).toLocaleString()}</span>
    </div>
  `).join('');

  document.getElementById('checkout-subtotal').textContent = `Rs. ${subtotal.toLocaleString()}`;
  document.getElementById('checkout-delivery').textContent = `Rs. ${STATE.deliveryCharge}`;
  document.getElementById('checkout-total').textContent = `Rs. ${total.toLocaleString()}`;

  // Pre-fill user info if logged in
  if (STATE.user) {
    const nameInput = document.getElementById('checkout-name');
    const emailInput = document.getElementById('checkout-email');
    if (nameInput) nameInput.value = STATE.user.name || '';
    if (emailInput) emailInput.value = STATE.user.email || '';
  }

  openModal('checkout-modal');
}

function processCheckout(event) {
  event.preventDefault();

  const name = document.getElementById('checkout-name').value.trim();
  const email = document.getElementById('checkout-email').value.trim();
  const phone = document.getElementById('checkout-phone').value.trim();
  const address = document.getElementById('checkout-address').value.trim();
  const city = document.getElementById('checkout-city').value.trim();

  if (!name || !email || !phone || !address || !city) {
    showToast("Please fill in all required customer details.", "warning");
    return;
  }

  const orderNum = `WK-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  const subtotal = STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const grandTotal = subtotal + STATE.deliveryCharge;

  // Render Confirmation Details
  document.getElementById('confirm-order-id').textContent = `Order #${orderNum}`;
  document.getElementById('confirm-customer-name').textContent = name;
  document.getElementById('confirm-total').textContent = `Rs. ${grandTotal.toLocaleString()}`;
  document.getElementById('confirm-address').textContent = `${address}, ${city}`;

  // Clear Cart
  STATE.cart = [];
  saveCart();
  updateCartUI();

  closeModal('checkout-modal');
  openModal('order-success-modal');
  showToast("🎉 Order placed successfully!");
}

// Drawer Controls
function openCartDrawer() {
  document.getElementById('cart-drawer')?.classList.add('open');
}
function closeCartDrawer() {
  document.getElementById('cart-drawer')?.classList.remove('open');
}

function openWishlistDrawer() {
  document.getElementById('wishlist-drawer')?.classList.add('open');
}
function closeWishlistDrawer() {
  document.getElementById('wishlist-drawer')?.classList.remove('open');
}

// Modal Helpers
function openModal(id) {
  document.getElementById(id)?.classList.add('open');
}
function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
}

function resetFilters() {
  STATE.currentFilter = 'All';
  STATE.searchQuery = '';
  STATE.sortBy = 'default';

  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('.filter-tab[data-filter="All"]')?.classList.add('active');

  const searchInput = document.getElementById('shop-search');
  if (searchInput) searchInput.value = '';

  renderProducts();
}

function scrollToShop() {
  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
}

// Event Listeners Setup
function setupEventListeners() {
  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-toggle-btn');
  const navLinks = document.getElementById('nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }

  // Filter Tabs
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      STATE.currentFilter = e.target.getAttribute('data-filter') || 'All';
      renderProducts();
    });
  });

  // Category Cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const cat = card.getAttribute('data-category');
      if (cat) {
        STATE.currentFilter = cat;
        document.querySelectorAll('.filter-tab').forEach(t => {
          t.classList.toggle('active', t.getAttribute('data-filter') === cat);
        });
        renderProducts();
        scrollToShop();
      }
    });
  });

  // Search Input
  const searchInput = document.getElementById('shop-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      STATE.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Sort Dropdown
  const sortSelect = document.getElementById('shop-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      STATE.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Auth Form Submit
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const pass = document.getElementById('login-password').value;
      loginUser(email, pass);
    });
  }

  // Contact Form Submit
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast("Thank you for contacting WALKIFY! We will respond shortly.");
      contactForm.reset();
    });
  }
}
