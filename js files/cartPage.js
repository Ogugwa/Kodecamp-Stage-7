// CART PAGE

const cartItems = document.querySelector(".cartItems");
const itemCount = document.getElementById("itemCount");
const cartTotal = document.getElementById("cartTotal");

// Load Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =========================
// SAVE CART
// =========================

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));

    if (typeof updateCartCounter === "function") {
        updateCartCounter();
    }

    displayCart();
}

// =========================
// DISPLAY CART
// =========================

function displayCart() {

    cartItems.innerHTML = "";

    // Empty Cart
    if (cart.length === 0) {

        const empty = document.createElement("div");
        empty.classList.add("emptyCart");

        const heading = document.createElement("h2");
        heading.textContent = "Your Cart is Empty";

        const text = document.createElement("p");
        text.textContent = "Looks like you haven't added any products yet.";

        const button = document.createElement("a");
        button.href = "../index.html";
        button.textContent = "Continue Shopping";

        empty.append(
            heading,
            text,
            button
        );

        cartItems.appendChild(empty);

        itemCount.textContent = "0";

        cartTotal.textContent = "₦0";

        return;
    }

    let total = 0;
    let totalItems = 0;

    cart.forEach((product) => {

        total += product.price * product.quantity;

        totalItems += product.quantity;

        // Card
        const card = document.createElement("div");
        card.classList.add("cartItem");

        // Image
        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.title;

        // Details
        const details = document.createElement("div");
        details.classList.add("itemDetails");

        // Category
        const category = document.createElement("span");
        category.classList.add("itemCategory");
        category.textContent = product.category || "Product";

        // Title
        const title = document.createElement("h3");
        title.classList.add("itemTitle");
        title.textContent = product.title;

        // Price
        const price = document.createElement("p");
        price.classList.add("itemPrice");

        const nairaPrice = product.price * 1600;

        price.textContent =
            `₦${nairaPrice.toLocaleString()}`;

        // Quantity Controls
        const controls = document.createElement("div");
        controls.classList.add("quantityControls");

        // Minus
        const minus = document.createElement("button");
        minus.textContent = "-";

        // Quantity
        const quantity = document.createElement("span");
        quantity.classList.add("quantity");
        quantity.textContent = product.quantity;

        // Plus
        const plus = document.createElement("button");
        plus.textContent = "+";

        controls.append(
            minus,
            quantity,
            plus
        );

        // Remove
        const remove = document.createElement("button");
        remove.classList.add("removeBtn");
        remove.textContent = "Remove";

        details.append(
            category,
            title,
            price,
            controls,
            remove
        );

        card.append(
            image,
            details
        );

        cartItems.appendChild(card);

        // ==========================
        // PLUS BUTTON
        // ==========================

        plus.addEventListener("click", () => {

            product.quantity++;

            saveCart();

        });

        // ==========================
        // MINUS BUTTON
        // ==========================

        minus.addEventListener("click", () => {

            if (product.quantity > 1) {

                product.quantity--;

            } else {

                cart = cart.filter(item => item.id !== product.id);

            }

            saveCart();

        });

        // ==========================
        // REMOVE BUTTON
        // ==========================

        remove.addEventListener("click", () => {

            cart = cart.filter(item => item.id !== product.id);

            saveCart();

        });

    });

    itemCount.textContent = totalItems;

    cartTotal.textContent =
        `₦${(total * 1600).toLocaleString()}`;

}

// Initial Load
displayCart();