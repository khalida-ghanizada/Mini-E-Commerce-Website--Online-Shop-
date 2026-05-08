// Product Data
const products = [
    {
        id: 1,
        name: "Diamond Ring",
        category: "Jewelry",
        price: 2500,
        image: "./images/Ring.jpg"
    },
    {
        id: 2,
        name: "Silver Bracelet",
        category: "Jewelry",
        price: 150,
        image: "./images/Bracelet.jpg"
    },
    {
        id: 3,
        name: "Silver Earrings",
        category: "Jewelry",
        price: 100,
        image: "./images/Earring.jpg"
    },
    {
        id: 4,
        name: "Kuchi Dress",
        category: "clothes",
        price: 250,
        image: "./images/Kuchi Dress.jpg"
    },
    {
        id: 5,
        name: "Hazaragi Dress",
        category: "clothes",
        price: 100,
        image: "./images/Hazaragi Dress.jpg"
    },
    {
        id: 6,
        name: "Wedding Dress",
        category: "clothes",
        price: 500,
        image: "./images/Wedding Dress.jpg"
    },
    {
        id: 7,
        name: "Diamond",
        category: "Jewelry",
        price: 2000,
        image: "./images/Diamond.jpg"
    },
    {
        id: 8,
        name: "Glass Shoes",
        category: "shoes",
        price: 80,
        image: "./images/Glass Shoes.jpg"
    },
    {
        id: 9,
        name: "Sport Shoes",
        category: "shoes",
        price: 50,
        image: "./images/Sport Shoes.jpg"
    }
];

let filteredProducts = [...products];

// Display Products

function displayProducts(productArray) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    productArray.forEach(product => {
        productList.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow">
                    <img src="${product.image}" class="card-img-top img-fluid" alt="${product.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price}</p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Filter Products

function filterProducts(category) {
    if (category === "all") {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(p => p.category === category);
    }
    displayProducts(filteredProducts);
}


// Search Functionality

document.getElementById("search").addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();

    const searched = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchValue)
    );

    displayProducts(searched);
});


// Cart Functionality

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
    let cart = getCart();
    cart.push(id);
    saveCart(cart);
    updateCartCount();
    alert("Product added to cart!");
}

function updateCartCount() {
    const cart = getCart();
    document.getElementById("cart-count").innerText = cart.length;
}
// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("bg-dark");
    document.body.classList.toggle("text-white");

    localStorage.setItem("darkMode", document.body.classList.contains("bg-dark"));
}

function loadDarkMode() {
    const darkMode = localStorage.getItem("darkMode") === "true";
    if (darkMode) {
        document.body.classList.add("bg-dark", "text-white");
    }
}
// Initial Load
window.onload = function () {
    displayProducts(products);
    updateCartCount();
    loadDarkMode();
};
// Contact Form Validation
const form = document.getElementById("checkoutForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    displayCart();
    updateCartCount();
    form.reset();
    form.classList.remove("was-validated");
  });
}


