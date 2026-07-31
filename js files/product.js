// PRODUCT PAGE

const API = "https://fakestoreapi.com/products";

const productDetails = document.querySelector(".productDetails");
const productsGrid = document.querySelector(".productsGrid");

const mainImage = document.querySelector(".mainImage");
const category = document.querySelector(".category");
const title = document.querySelector(".productTitle");
const price = document.querySelector(".price");
const description = document.querySelector(".description");
const addCartBtn = document.querySelector(".addCartBtn");

const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

let selectedProduct = null;


// Fetch every product

async function fetchProducts() {

    try {

        const response = await fetch(API);

        if (!response.ok) {
            throw new Error("Unable to fetch products");
        }

        const products = await response.json();

        displayProducts(products);

        if (productId) {

            const foundProduct = products.find(product => product.id == productId);

            if (foundProduct) {

                displaySelectedProduct(foundProduct);

            }

        }

    }

    catch (error) {

        console.error(error);

    }

}


// Display selected product

function displaySelectedProduct(product) {

    selectedProduct = product;

    productDetails.classList.remove("hide");

    mainImage.src = product.image;
    mainImage.alt = product.title;

    category.textContent = product.category;

    title.textContent = product.title;

    description.textContent = product.description;

    const naira = product.price * 1600;

    price.textContent = `₦${naira.toLocaleString()}`;

}



// Display every product

function displayProducts(products) {

    productsGrid.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("div");

        card.classList.add("productCard");



        card.innerHTML = `

            <img src="${product.image}" alt="${product.title}">

            <div class="cardBody">

                <span>${product.category}</span>

                <h3>${product.title}</h3>

                <p class="cardPrice">

                    ₦${(product.price * 1600).toLocaleString()}

                </p>

                <a href="product.html?productId=${product.id}">

                    View Product

                </a>

            </div>

        `;

        productsGrid.appendChild(card);

    });

}


// CART

addCartBtn.addEventListener("click", () => {

    if (!selectedProduct) return;

    const quantity = Number(document.getElementById("quantity").value);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === selectedProduct.id);

    if (existing) {

        existing.quantity += quantity;

    } else {

        cart.push({

            id: selectedProduct.id,

            title: selectedProduct.title,

            image: selectedProduct.image,

            price: selectedProduct.price,

            quantity

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCounter();

    alert("Product added to cart!");

});




// Update Counter

function updateCartCounter() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const total = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.querySelectorAll(".cartCount").forEach(counter => {

        counter.textContent = total;

    });

}



updateCartCounter();

fetchProducts();