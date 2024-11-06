// Initialize product data from localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];

// Select DOM elements
const productForm = document.getElementById('productForm');
const productNameInput = document.getElementById('productName');
const productBrandInput = document.getElementById('productBrand');
const productPriceInput = document.getElementById('productPrice');
const productIdInput = document.getElementById('productId');
const productTableBody = document.getElementById('productTableBody');

// Function to render products to the table
function renderProducts() {
    productTableBody.innerHTML = ''; // Clear previous rows
    products.forEach((product, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>₹${product.price}</td>
            <td>
                <button onclick="editProduct(${index})">Edit</button>
                <button onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;

        productTableBody.appendChild(row);
    });
}

// Function to handle form submission (Add/Edit)
productForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const productName = productNameInput.value;
    const productBrand = productBrandInput.value;
    const productPrice = parseFloat(productPriceInput.value);
    const productId = productIdInput.value;

    if (productId) {
        // Editing existing product
        const productIndex = parseInt(productId);
        products[productIndex] = { name: productName, brand: productBrand, price: productPrice };
    } else {
        // Adding a new product
        products.push({ name: productName, brand: productBrand, price: productPrice });
    }

    localStorage.setItem('products', JSON.stringify(products)); // Save to localStorage
    renderProducts(); // Re-render product table
    productForm.reset(); // Reset the form
    productIdInput.value = ''; // Clear hidden input
});

// Function to edit a product
function editProduct(index) {
    const product = products[index];
    productNameInput.value = product.name;
    productBrandInput.value = product.brand;
    productPriceInput.value = product.price;
    productIdInput.value = index; // Set hidden input for editing
}

// Function to delete a product
function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        products.splice(index, 1); // Remove product from array
        localStorage.setItem('products', JSON.stringify(products)); // Update localStorage
        renderProducts(); // Re-render product table
    }
}



// Initial render of products
renderProducts();

async function amounts(){
    let amount=0;
    JSON.stringify(products.filter((key)=>{
        amount+=key.price;
        return amount;
    }))
    document.getElementById("totalAmount").innerHTML=amount;
  
}
amounts();
