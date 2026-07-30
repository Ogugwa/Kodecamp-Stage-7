const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.querySelector(".mobileMenu");

openMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("hide");
});

closeMenu.addEventListener("click", () => {
    mobileMenu.classList.add("hide");
});