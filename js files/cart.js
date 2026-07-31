const cartCounters = document.querySelectorAll(".cartCount");

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalItems = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartCounters.forEach(counter => {
        counter.textContent = totalItems;
    });
}

updateCartCounter();