document.addEventListener('DOMContentLoaded', fetchProducts);

const productsContainer = document.getElementById('products');
const categoryFilter = document.getElementById('category');
const sortSelect = document.getElementById('sort');

let allProducts = []; // Store all products fetched from the API

// Function to fetch products from the API
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        allProducts = data; // Store all products
        // Display products for the selected category (or all products if 'all' is selected)
        displayProducts(getProductsForCategory(categoryFilter.value));
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Function to filter products by category
function getProductsForCategory(category) {
    // If category is 'all', return all products, otherwise filter products by category
    return category === 'all' ? allProducts : allProducts.filter(product => product.category === category);
}

// Function to display products on the webpage
function displayProducts(products) {
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.category}</p>
            <p>$${product.price}</p>
        `;
        productsContainer.appendChild(card);
    });
}

// Event listener for category filter dropdown change
categoryFilter.addEventListener('change', () => {
    displayProducts(getProductsForCategory(categoryFilter.value)); // Display products for the selected category
});

// Event listener for sort dropdown change
sortSelect.addEventListener('change', () => {
    const sortOrder = sortSelect.value;
    let sortedProducts = [];
    if (categoryFilter.value === 'all') {
        sortedProducts = [...allProducts]; // Sort all products
    } else {
        sortedProducts = [...getProductsForCategory(categoryFilter.value)]; // Sort products for the selected category
    }
    // Sort products based on the selected sort order
    if (sortOrder === 'asc') {
        sortedProducts.sort((a, b) => a.price - b.price); // Sort in ascending order by price
    } else if (sortOrder === 'desc') {
        sortedProducts.sort((a, b) => b.price - a.price); // Sort in descending order by price
    }
    displayProducts(sortedProducts); // Display the sorted products
});
// Set current date in the footer
// Get the current year
var currentYear = new Date().getFullYear();

// Set your full name
var fullName = "REYNOLD OCAMPO";

// Generate the footer content
var footerContent = "&copy; " + fullName + " " + currentYear;

// Set the generated footer content
document.getElementById("footer-content").innerHTML = footerContent;
