const summaryItems = document.querySelector(".summaryItems");
const grandTotal = document.querySelector(".grandTotal");
const checkoutForm = document.getElementById("checkoutForm");

const sameAddress = document.getElementById("sameAddress");
const shippingAddress = document.getElementById("shippingAddress");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displaySummary(){

summaryItems.innerHTML="";

let total = 0;

cart.forEach(product=>{

const card = document.createElement("div");
card.classList.add("summaryCard");

const image = document.createElement("img");
image.src = product.image;

const info = document.createElement("div");
info.classList.add("summaryInfo");

const title = document.createElement("h4");
title.textContent = product.title;

const qty = document.createElement("p");
qty.textContent = `Qty: ${product.quantity}`;

const price = document.createElement("p");

const subtotal = product.price * product.quantity;

price.textContent = `₦${(subtotal*1600).toLocaleString()}`;

info.append(title,qty,price);

card.append(image,info);

summaryItems.appendChild(card);

total += subtotal;

});

grandTotal.textContent = `₦${(total*1600).toLocaleString()}`;

}

displaySummary();

sameAddress.addEventListener("change",()=>{

shippingAddress.disabled = sameAddress.checked;

if(sameAddress.checked){

shippingAddress.value="";

}

});

checkoutForm.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Order placed successfully!");

localStorage.removeItem("cart");

window.location.href="../index.html";

});