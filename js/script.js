// Product Data

const products = [
    {
        id: 1,
        name: "Diamond Ring",
        category: "jewelry",
        price: 2500,
        image: "./images/Ring.jpg"
    },
    {
        id: 2,
        name: "Silver Bracelet",
        category: "jewelry",
        price: 150,
        image: "./images/Bracelet.jpg"
    },
    {
        id: 3,
        name: "Silver Earrings",
        category: "jewelry",
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
        category: "jewelry",
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


// Filtered Products Array

let filteredProducts = [...products];


// Display Products Function

function displayProducts(productArray) {

    const productList = document.getElementById("product-list");

    if (!productList) return;

    productList.innerHTML = "";

    // If no products found

    if (productArray.length === 0) {

        productList.innerHTML = `
            <div class="col-12 text-center">
                <h4>No Products Found</h4>
            </div>
        `;

        return;
    }

    // Show Products

    productArray.forEach(product => {

        productList.innerHTML += `

            <div class="col-md-4 mb-4">

                <div class="card h-100 shadow">

                    <img src="${product.image}"
                         class="card-img-top img-fluid"
                         alt="${product.name}">

                    <div class="card-body text-center">

                        <h5 class="card-title">
                            ${product.name}
                        </h5>

                        <p class="card-text">
                            $${product.price}
                        </p>

                        <button class="btn btn-primary"
                                onclick="addToCart(${product.id})">

                            <i class="fas fa-cart-plus"></i>
                            Add to Cart

                        </button>

                    </div>

                </div>

            </div>
        `;
    });
}


// Filter Products Function

function filterProducts(category) {

    category = category.toLowerCase();

    if (category === "all") {

        filteredProducts = [...products];

    } else {

        filteredProducts = products.filter(product =>
            product.category.toLowerCase() === category
        );
    }

    displayProducts(filteredProducts);
}


// Search Functionality

const searchInput = document.getElementById("search");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchValue = this.value.toLowerCase();

        const searchedProducts = filteredProducts.filter(product =>

            product.name.toLowerCase().includes(searchValue)
        );

        displayProducts(searchedProducts);
    });
}


// Cart Functions

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

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {

        cartCount.innerText = cart.length;
    }
}


// Dark Mode Functions

function toggleDarkMode() {

    document.body.classList.toggle("bg-dark");

    document.body.classList.toggle("text-white");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("bg-dark")
    );
}


function loadDarkMode() {

    const darkMode =
        localStorage.getItem("darkMode") === "true";

    if (darkMode) {

        document.body.classList.add("bg-dark");

        document.body.classList.add("text-white");
    }
}


// Checkout Form Validation

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

        updateCartCount();

        form.reset();

        form.classList.remove("was-validated");
    });
}


// Initialize Load

window.onload = function () {

    displayProducts(products);

    updateCartCount();

    loadDarkMode();
};