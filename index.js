// alert("Javascript connected");
const featuredSection = document.querySelector(".featuredSection");
// Storing the API link for fetching products
const API= 'https://fakestoreapi.com/products'; 

async function fetchData() {
    try {
        const response = await fetch(API);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const products = await response.json();

        displayFeaturedProducts(products.slice(0, 5));

       

    } catch (error) {
        console.error(error);
    }
}
function displayFeaturedProducts(products) {
    // featuredSection.innerHTML = "";
    products.forEach((sample) => {
        const card = document.createElement("div");
        card.classList.add("featureCard");
        const image = document.createElement("img");
        image.src = sample.image;
        image.alt = sample.title;
        const category = document.createElement("span");
        category.classList.add("category");
        category.textContent = sample.category;
        const title = document.createElement("h3");
        title.textContent = sample.title;
        const description = document.createElement("p");
        description.classList.add("description");
        description.textContent = sample.description;
        const footer = document.createElement("div");
        footer.classList.add("cardFooter");
        const price = document.createElement("p");
        price.classList.add("price");
        const nairaPrice = sample.price * 1600;
price.textContent = `₦${nairaPrice.toLocaleString()}`;
        const button = document.createElement("a");
        button.href = `./pages/product.html?productId=${sample.id}`;
        button.textContent = "Shop Now";
        footer.append(price, button);
        card.append(
            image,
            category,
            title,
            description,
            footer
        );
        featuredSection.appendChild(card);
    });

}

fetchData();
