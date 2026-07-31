// alert("Javascript connected");
const featuredSection = document.querySelector(".featuredSection");
const categoriesGrid = document.querySelector(".categoriesGrid");
// Storing the API link for fetching products
const API= 'https://api.escuelajs.co/api/v1/products/'; 

async function fetchData() {
    try {
        const response = await fetch(API);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const products = await response.json();

        displayFeaturedProducts(products.slice(0, 5));

        displayCategories(products);

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
        image.src = sample.images[0];
        image.alt = sample.title;
        const category = document.createElement("span");
        category.classList.add("category");
        category.textContent = sample.category.name;
        const title = document.createElement("h3");
        title.textContent = sample.title;
        const description = document.createElement("p");
        description.classList.add("description");
        description.textContent = sample.description;
        const footer = document.createElement("div");
        footer.classList.add("cardFooter");
        const price = document.createElement("p");
        price.classList.add("price");
        price.textContent = `₦${sample.price.toLocaleString()}`;
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
// function displayFeaturedProducts(products) {
//     // featuredSection.innerHTML = "";
//     products.forEach((sample) => {
//         const card = document.createElement("div");
//         card.classList.add("featureCard");
//         const image = document.createElement("img");
//         image.src = sample.images[0];
//         image.alt = sample.title;
//         const category = document.createElement("span");
//         category.classList.add("category");
//         category.textContent = sample.category.name;
//         const title = document.createElement("h3");
//         title.textContent = sample.title;
//         const description = document.createElement("p");
//         description.classList.add("description");
//         description.textContent = sample.description;
//         const footer = document.createElement("div");
//         footer.classList.add("cardFooter");
//         const price = document.createElement("p");
//         price.classList.add("price");
//         price.textContent = `₦${sample.price.toLocaleString()}`;
//         const button = document.createElement("a");
//         button.href = `./pages/product.html?productId=${sample.id}`;
//         button.textContent = "Shop Now";
//         footer.append(price, button);
//         card.append(
//             image,
//             category,
//             title,
//             description,
//             footer
//         );
//         featuredSection.appendChild(card);
//     });

// }
function displayCategories(products) {
    // categoriesGrid.innerHTML = "";
    const uniqueCategories = [];
    products.forEach((product) => {
        const exists = uniqueCategories.find((category) => {
            return category.id === product.category.id;
        });
        if (!exists) {
            uniqueCategories.push(product.category);
        }
    });
    uniqueCategories.forEach((category) => {
        const card = document.createElement("div");
        card.classList.add("categoryCard");
        const image = document.createElement("img");
        image.src = category.image;
        image.alt = category.name;
        const title = document.createElement("h3");
        title.textContent = category.name;
        card.append(image, title);
        categoriesGrid.appendChild(card);
    });

}
fetchData();
// async function getProducts(){
//    const products = await fetchData();
//      const samples = products.slice(0,5);
//          samples.forEach((sample)=>{
//             // Creating the featureCard
//             const card = document.createElement("div");
//             card.classList.add("featureCard");
//             const cardImage= document.createElement("img");
//             const image =sample.images[0];
//             cardImage.src = image;
//             cardImage.alt = sample.title;
//             card.append(cardImage);
//             const span =document.createElement("span");
//             span.classList.add("category");
//             const name =sample.category.name;
//             span.textContent = name;
//             card.append(span);
//             const heading =document.createElement("h3");
//             const productTitle= sample.title;
//             heading.textContent =productTitle;
//             card.append(heading);
//             const paragraph = document.createElement("p");
//             paragraph.classList.add("description");
//             const productDesc =sample.description;
//             paragraph.textContent = productDesc; 
//             card.append(paragraph);           
//             const footerCard= document.createElement("div");
//             footerCard.classList.add("cardFooter");
//             const paragraph2 = document.createElement("p");
//             paragraph2.classList.add("price");
//             paragraph2.textContent = `₦${sample.price.toLocaleString()}`;
//             footerCard.appendChild(paragraph2);
//             const productId =sample.id
//             const button = document.createElement("a");
//             button.href= `./pages/product.html?productId=${productId}`;
//             button.textContent= "Shop Now";                   
//             footerCard.appendChild(button);
//             card.appendChild(footerCard);
//             featuredSection.appendChild(card);
//         });
//     }
// getProducts();
// Function for fetching categories