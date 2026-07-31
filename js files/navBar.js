const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.querySelector(".mobileMenu");

openMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("hide");
});

closeMenu.addEventListener("click", () => {
    mobileMenu.classList.add("hide");
});
const cartCounter = document.querySelector(".cartCount");

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCounter.textContent = cart.length;
}

updateCartCounter();