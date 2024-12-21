document.addEventListener('DOMContentLoaded', async function () {
    await fetchProductsByCategory();
    await fetchSupplierNames();
    await fetchCategoryNames();

    const currentDate = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = currentDate;


    await fetchAndRenderInventoryTable();
    calculateTotalInventory(); 

    const saveButton = document.getElementById('saveButton');
    if (saveButton) {
        saveButton.addEventListener('click', saveToDatabase);
    }

    document.getElementById('inventoryDataBody').addEventListener('click', async (event) => {
        const deleteButton = event.target.closest('.deleteButton');
        if (deleteButton) {
            const id = deleteButton.dataset.id;
            if (id && confirm('Are you sure you want to delete this item?')) {
                try {
                    const response = await fetch(`/deleteInventoryItem/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        console.log('Item deleted successfully');
                        await fetchAndRenderInventoryTable(); 
                        calculateTotalInventory();
                    } else {
                        console.error('Failed to delete item');
                        alert('Failed to delete item. Please try again.');
                    }
                } catch (error) {
                    console.error('Error deleting item:', error);
                    alert('Error occurred while deleting item.');
                }
            }
        }
    });
});



async function fetchSupplierNames() {
    try {
        const response = await fetch('/fetchSupplierNames', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const supplierNames = await response.json();

            if (Array.isArray(supplierNames)) {
                const supplierNameDropdown = document.getElementById('supplierName');

              
                supplierNameDropdown.innerHTML = '';

                supplierNames.forEach(supplierName => {
                    const option = document.createElement('option');
                    option.value = supplierName;
                    option.textContent = supplierName; 
                    supplierNameDropdown.appendChild(option);
                });
            } else {
                console.error('Invalid response format. Expected an array.');
            }
        } else {
            console.error('Failed to fetch supplier names');
        }
    } catch (error) {
        console.error('Error fetching supplier names:', error);
    }
}

let currentSku = '';
let isEditing = false;
let editingId = null;

async function initializeForm() {
    await fetchCategoryNames();
    setupEventListeners();
}

async function fetchCategoryNames() {
    try {
        const response = await fetch('/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const categoryNames = await response.json();
            console.log('Category Names:', categoryNames);

            const categoryNameSelect = document.getElementById('categoryName');
            const productNameSelect = document.getElementById('productName');

            if (!categoryNameSelect || !productNameSelect) {
                console.error('Required select elements not found');
                return;
            }

         
            categoryNameSelect.innerHTML = '<option value="" disabled selected>Select a category</option>';
            productNameSelect.innerHTML = '<option value="" disabled selected>Select a category first</option>';

          
            categoryNames.forEach(category => {
                const option = document.createElement('option');
                option.value = category.name;
                option.textContent = category.name;
                categoryNameSelect.appendChild(option);
            });

        } else {
            console.error('Failed to fetch category names');
        }
    } catch (error) {
        console.error('Error fetching category names:', error);
    }
}

function setupEventListeners() {
    const categoryNameSelect = document.getElementById('categoryName');
    if (categoryNameSelect) {
        categoryNameSelect.addEventListener('change', handleCategoryChange);
    }

    const productNameSelect = document.getElementById('productName');
    if (productNameSelect) {
        productNameSelect.addEventListener('change', handleProductChange);
    }

    const form = document.getElementById('inventoryForm');
    if (form) {
        form.addEventListener('reset', () => {
            setTimeout(() => {
                fetchCategoryNames();
            }, 0);
        });
    }
}

async function handleCategoryChange(event) {
    const selectedCategory = event.target.value;
    if (selectedCategory) {
        await fetchProductsByCategory(selectedCategory);
    }
}

async function fetchProductsByCategory(categoryName) {
    const productNameSelect = document.getElementById('productName');
    const priceInput = document.getElementById('price');
    const costInput = document.getElementById('cost');
    const skuInput = document.getElementById('sku');

    if (!productNameSelect) {
        console.error('Product select element not found');
        return;
    }

    try {
        const response = await fetch(`/products/category/${encodeURIComponent(categoryName)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const products = await response.json();
            console.log('Products for category:', products);

  
            productNameSelect.innerHTML = '<option value="" disabled selected>Select a product</option>';

           
            products.forEach(product => {
                const option = document.createElement('option');
                option.value = product.productName;
                option.textContent = product.productName;
                option.dataset.sku = product.sku;
                option.dataset.price = product.price;
                option.dataset.cost = product.cost;
                productNameSelect.appendChild(option);
            });

   
            if (skuInput) skuInput.value = '';
            if (priceInput) priceInput.value = '';
            if (costInput) costInput.value = '';


            productNameSelect.disabled = false;

        } else {
            console.error('Failed to fetch products for category');
            productNameSelect.innerHTML = '<option value="" disabled selected>Error loading products</option>';
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        productNameSelect.innerHTML = '<option value="" disabled selected>Error loading products</option>';
    }
}

function handleProductChange(event) {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const skuInput = document.getElementById('sku');
    const priceInput = document.getElementById('price');
    const costInput = document.getElementById('cost');

    if (selectedOption && !selectedOption.disabled) {
        if (skuInput) skuInput.value = selectedOption.dataset.sku;
        if (priceInput) priceInput.value = selectedOption.dataset.price;
        if (costInput) costInput.value = selectedOption.dataset.cost;
        currentSku = selectedOption.dataset.sku;
    }
}

document.addEventListener('DOMContentLoaded', initializeForm);

async function fetchAndRenderInventoryTable() {
    try {
        const response = await fetch('/fetchInventoryData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const inventoryData = await response.json();
        console.log('Fetched inventory data:', inventoryData); 
        renderInventoryTable(inventoryData);
        calculateTotalInventory();
    } catch (error) {
        console.error('Error fetching inventory data:', error);
        alert('Failed to load inventory data. Please refresh the page.');
    }
}


async function populateFormForEdit(rowData) {
    const form = document.getElementById('inventoryForm');
    
   
    const categoryNameSelect = document.getElementById('categoryName');
    const productNameSelect = document.getElementById('productName');
    
    try {
        
        await fetchCategoryNames();
        
        const productResponse = await fetch('/api/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!productResponse.ok) {
            throw new Error('Failed to fetch product details');
        }
        
        const products = await productResponse.json();
        const productToEdit = products.find(p => p.productName === rowData.productName || p.productName === rowData.product_name);
        
        if (productToEdit) {
           
            categoryNameSelect.value = productToEdit.categoryName;
            
        
            await fetchProductsByCategory(productToEdit.categoryName);

            productNameSelect.value = rowData.productName || rowData.product_name;
       
            form.elements.sku.value = productToEdit.sku;
            currentSku = productToEdit.sku;
        }
        
      
        form.elements.date.value = rowData.date;
        form.elements.supplierName.value = rowData.supplierName || rowData.supplier_name;
        form.elements.price.value = rowData.price;
        form.elements.cost.value = rowData.cost;
        form.elements.quantity.value = rowData.quantity;
        
        
        isEditing = true;
        editingId = rowData.id;
        
   
        const saveButton = document.getElementById('saveButton');
        if (saveButton) {
            saveButton.textContent = 'Update';
        }
        
        
        form.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error populating form for edit:', error);
        alert('Error loading product details for editing');
    }
}



async function saveToDatabase(event) {
    event.preventDefault();
    const form = document.getElementById('inventoryForm');

    if (!form.elements.date.value) {
        alert('Please select a date');
        return;
    }

    const skuInput = form.elements.sku;
    const productNameSelect = form.elements.productName;
    const categoryNameSelect = form.elements.categoryName;
  
    if (!skuInput.value) {
        const selectedProduct = Array.from(productNameSelect.options)
            .find(option => option.value === productNameSelect.value);
            
        if (selectedProduct && selectedProduct.dataset.sku) {
            skuInput.value = selectedProduct.dataset.sku;
        } else if (currentSku) {
            skuInput.value = currentSku;
        }
    }
    
    if (!skuInput.value) {
        alert('Error: No SKU available for this product');
        return;
    }

    const data = {
        date: form.elements.date.value,
        categoryName: categoryNameSelect.value,
        productName: form.elements.productName.value,
        supplierName: form.elements.supplierName.value,
        sku: skuInput.value, 
        price: parseFloat(form.elements.price.value),
        cost: parseFloat(form.elements.cost.value),
        quantity: parseInt(form.elements.quantity.value),
        total: (parseFloat(form.elements.cost.value) * parseInt(form.elements.quantity.value)).toFixed(2)
    };

    console.log('Sending data:', data);

    try {
        const endpoint = isEditing ? `/updateInventory/${editingId}` : '/saveToDatabase';
        const response = await fetch(endpoint, {
            method: isEditing ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([data])
        });

        if (response.ok) {
            console.log(isEditing ? 'Data updated successfully' : 'Data saved successfully');
            await fetchAndRenderInventoryTable();
            form.reset();
            isEditing = false;
            editingId = null;
            const saveButton = document.getElementById('saveButton');
            if (saveButton) saveButton.textContent = 'Save';
      
            await fetchCategoryNames();
            productNameSelect.innerHTML = '<option value="" disabled selected>Select a category first</option>';
            productNameSelect.disabled = true;
        } else {
            const errorData = await response.text();
            console.error('Server response:', errorData);
            alert('Failed to save data. Please check the console for details.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while saving the data.');
    }
}


function resetForm() {
    const form = document.getElementById('inventoryForm');
    const dateField = document.getElementById('date');
    form.reset();
    

    const productNameSelect = document.getElementById('productName');
    if (productNameSelect) {
        productNameSelect.innerHTML = '<option value="" disabled selected>Select a category first</option>';
        productNameSelect.disabled = true;
    }
    

    fetchCategoryNames();
    

    isEditing = false;
    editingId = null;
    currentSku = '';
    

    const saveButton = document.getElementById('saveButton');
    if (saveButton) saveButton.textContent = 'Save';

    if (dateField) dateField.value = dateField.value || new Date().toISOString().split('T')[0];
}


function calculateTotalInventory() {
    const tableBody = document.getElementById('inventoryDataBody');
    if (!tableBody) return;

    let totalInventory = 0;


    tableBody.querySelectorAll('tr').forEach(row => {
        const quantityCell = row.cells[7]; 
        if (quantityCell) {
            const quantity = parseInt(quantityCell.textContent) || 0;
            totalInventory += quantity;
        }
    });

   
    const totalInventoryDisplay = document.getElementById('totalInventory');
    if (totalInventoryDisplay) {
        totalInventoryDisplay.textContent = `Total Inventory: ${totalInventory}`;
    } else {
     
        const displayElement = document.createElement('div');
        displayElement.id = 'totalInventory';
        displayElement.textContent = `Total Inventory: ${totalInventory}`;
        document.getElementById('inventoryForm').appendChild(displayElement);
    }
}



function renderInventoryTable(data) {
    const tableBody = document.getElementById('inventoryDataBody');
    if (!tableBody) {
        console.error('Table body element not found');
        return;
    }
    
    tableBody.innerHTML = '';

    data.forEach(row => {
        const displayDate = new Date(row.date).toLocaleDateString();
        
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td>${displayDate}</td>
            <td>${row.categoryName || row.category_name}</td>
            <td>${row.productName || row.product_name}</td>
            <td>${row.supplierName || row.supplier_name}</td>
            <td>${row.price}</td>
            <td>${row.cost}</td>
            <td>${row.quantity}</td>
            <td>${row.total}</td>
            <td>
                <button 
                    type="button"
                    class="editButton"
                    data-id="${row.id}"
                >Edit</button>
                <button 
                    type="button"
                    class="deleteButton"
                    data-id="${row.id}"
                >Delete</button>
            </td>
        `;
    });


    document.querySelectorAll('.editButton').forEach(button => {
        button.addEventListener('click', async () => {
            const id = button.getAttribute('data-id');
            const rowData = data.find(item => item.id == id);
            if (rowData) {
                populateFormForEdit(rowData);
            }
        });
    });

    document.querySelectorAll('.deleteButton').forEach(button => {
        button.addEventListener('click', async () => {
            if (confirm('Are you sure you want to delete this item?')) {
                const id = button.getAttribute('data-id');
                try {
                    const response = await fetch(`/deleteInventory/${id}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        await fetchAndRenderInventoryTable();
                    } else {
                        console.error('Failed to delete item');
                    }
                } catch (error) {
                    console.error('Error deleting item:', error);
                }
            }
        });
    });
}






function goBack() {
    window.history.back();
  } 

//   function fetchUserData() {
//     // Make a fetch request to get user data
//     fetch('/api/users/current')
//         .then(response => {
//             if (response.status === 401) {
//                 // Redirect to the login page or handle unauthorized access
//                 window.location.href = '/login.html';
//                 throw new Error('User not authenticated');
//             }
//             return response.json();
//         })
//         .then(user => {
//             // Store the user data in session storage
//             sessionStorage.setItem('currentUser', JSON.stringify(user));

//             // Log the stored user data for debugging
//             console.log('Stored currentUser:', JSON.stringify(user));

//             // Update the profile section immediately
//             updateProfileSection(user);
//         })
//         .catch(error => {
//             console.error('Error fetching user information:', error);
//         });
// }