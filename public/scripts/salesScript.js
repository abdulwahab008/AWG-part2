document.addEventListener('DOMContentLoaded', async function () {
    await fetchProductsByCategory();
    await fetchCategoryNames();

    const currentDate = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = currentDate;

    await fetchAndRenderSalesTable();
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('input', updateCalculations);
    }

    const saveButton = document.getElementById('saveButton');
    if (saveButton) {
        saveButton.addEventListener('click', saveSalesToDatabase);
    }

 
    const productNameSelect = document.getElementById('productName');
    if (productNameSelect) {
        productNameSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            
            if (selectedOption && !selectedOption.disabled) {
                const skuInput = document.getElementById('sku');
                const priceInput = document.getElementById('price');
                const costInput = document.getElementById('cost');
                const quantityInput = document.getElementById('quantity');

      
                if (skuInput) skuInput.value = selectedOption.dataset.sku;
                if (priceInput) priceInput.value = selectedOption.dataset.price;
                if (costInput) costInput.value = selectedOption.dataset.cost;
                
    
                if (quantityInput) {
                    quantityInput.value = '1';
                }

       
                updateCalculations();
            }
        });
    }

    document.getElementById('salesDataBody').addEventListener('click', async (event) => {
        const target = event.target;
        
        if (target.getAttribute('data-action') === 'print') {
            // Get the parent row of the clicked button
            const row = target.closest('tr');
            if (row) {
                printReceipt(row);
            }
        } else if (target.getAttribute('data-action') === 'delete') {
            const row = target.closest('tr');
            const id = row.getAttribute('data-id');
            if (id && confirm('Are you sure you want to delete this item?')) {
                try {
                    const response = await fetch(`api/sales/deleteSalesItem/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        console.log('Item deleted successfully');
                        // Refresh the table after successful deletion
                        await fetchAndRenderSalesTable();
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

    const form = document.getElementById('salesForm');
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
    const quantityInput = document.getElementById('quantity');
    const profitInput = document.getElementById('profit');
    const totalInput = document.getElementById('total');

    if (selectedOption && !selectedOption.disabled) {
        if (skuInput) skuInput.value = selectedOption.dataset.sku;
        if (priceInput) priceInput.value = selectedOption.dataset.price;
        if (costInput) costInput.value = selectedOption.dataset.cost;
        currentSku = selectedOption.dataset.sku;
        if (quantityInput) quantityInput.value = '1';
        const price = parseFloat((priceInput.value_)*quantityInput) || 0;
        const cost = parseFloat((costInput.value)* quantityInput) || 0;
        const quantity = 1; 

    
        const profit = (price - cost) * quantity;
        if (profitInput) profitInput.value = profit.toFixed(2);

        const total = price * quantity;
        if (totalInput) totalInput.value = total.toFixed(2);
    }
}
function updateCalculations() {
    const priceInput = document.getElementById('price');
    const costInput = document.getElementById('cost');
    const quantityInput = document.getElementById('quantity');
    const profitInput = document.getElementById('profit');
    const totalInput = document.getElementById('total');


    if (!priceInput || !costInput || !quantityInput || !profitInput || !totalInput) {
        console.error('One or more calculation inputs are missing');
        return;
    }

    const quantity = parseFloat(quantityInput.value) || 0;
    const price = parseFloat((priceInput.value)) || 0;
    const cost = parseFloat((costInput.value)) || 0;
  
    const profit = (price - cost) * quantity;
    profitInput.value = profit.toFixed(2);

    const total = price * quantity;
    totalInput.value = total.toFixed(2);
}
document.addEventListener('DOMContentLoaded', initializeForm);

async function fetchAndRenderSalesTable() {
    try {
    const response = await fetch('/api/sales/fetchSalesData', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (response.ok) {
        const salesData = await response.json();
        renderSalesTable(salesData);
    } else {
        console.error('Failed to fetch sales data');
    }
    } catch (error) {
    console.error('Error fetching sales data:', error);
    }
    }


    
function renderSalesTable(data) {
    const tableBody = document.getElementById('salesDataBody');
    const totalSalesAmountElement = document.getElementById('totalSalesAmount');
    
    if (!tableBody || !totalSalesAmountElement) {
    console.error('Error: Table body or total sales amount element not found.');
    return;
    }
    
    tableBody.innerHTML = '';
    let totalSales = 0;
    
    data.forEach(row => {
    const localDate = new Date(row.date).toLocaleDateString();
    const newRow = tableBody.insertRow(-1);
    newRow.setAttribute('data-id', row.id);
    newRow.innerHTML = `<td>${localDate}</td>
                        <td>${row.categoryName}</td>
                        <td>${row.productName}</td>
                        <td>${row.quantity}</td>
                        <td>${row.price}</td>
                        <td>${row.cost}</td>
                        <td>${row.profit}</td>
                        <td>${row.total}</td>
                        <td>
                        <button data-action="print">Print</button>
                        <button data-action="delete">Delete</button>
                        <button data-action="edit">Edit</button>
    
                        </td>`;
    
    totalSales += parseFloat(row.total) || 0;
    });
    
    totalSalesAmountElement.textContent = totalSales.toFixed(2);
    }

    function printReceipt(row) {
        const companyName = 'AWG International';
        
        const modalContainer = document.createElement('div');
        modalContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
    
        
        const printContent = document.createElement('div');
        printContent.style.cssText = `
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 600px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
        `;
        
        printContent.innerHTML = `
            <div id="receipt-content">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2>${companyName}</h2>
                </div>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr>
                        <th style="border: 1px solid #ddd; padding: 8px;">Date</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Product Name</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Total</th>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px;">${row.cells[0].innerHTML}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${row.cells[2].innerHTML}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${row.cells[3].innerHTML}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${row.cells[4].innerHTML}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${row.cells[7].innerHTML}</td>
                    </tr>
                </table>
                <div>
                    <h3>Instructions:</h3>
                    <p>1. Items can be returned within two days of purchase.</p>
                    <p>2. Thank you for choosing ${companyName}. We appreciate your business!</p>
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button id="printButton" style="padding: 5px 20px; margin-right: 10px; margin-bottom: 5px;">Print</button>
                    <button id="closeButton" style="padding: 5px 20px;">Close</button>
                </div>
            </div>
        `;
    
        modalContainer.appendChild(printContent);
        document.body.appendChild(modalContainer);
    
       
        document.getElementById('printButton').addEventListener('click', () => {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Receipt</title>
                        <style>
                            body { font-family: Arial, sans-serif; }
                            table { width: 100%; border-collapse: collapse; }
                            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                            th { background-color: #f2f2f2; }
                            @media print {
                                button { display: none; }
                            }
                        </style>
                    </head>
                    <body>
                        ${document.getElementById('receipt-content').innerHTML}
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.onafterprint = () => printWindow.close();
        });
    
        document.getElementById('closeButton').addEventListener('click', () => {
            document.body.removeChild(modalContainer);
        });
    
        // Close modal when clicking outside
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                document.body.removeChild(modalContainer);
            }
        });
    }
    
async function populateFormForEdit(rowData) {
    const form = document.getElementById('salesForm');
    
   
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





async function saveSalesToDatabase(event) {
    event.preventDefault();
    const form = document.getElementById('salesForm');

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
        sku: skuInput.value, 
        quantity: parseInt(form.elements.quantity.value),
        price: parseFloat(form.elements.price.value),
        cost: parseFloat(form.elements.cost.value),
        profit:parseFloat(form.elements.profit.value),
        total: (parseFloat(form.elements.price.value) * parseInt(form.elements.quantity.value)).toFixed(2)
    };

    console.log('Sending data:', data);

    try {
        const endpoint = isEditing ? `/api/sales/updateSalesItem/${editingId}` : '/api/sales/saveSalesToDatabase';
        const response = await fetch(endpoint, {
            method: isEditing ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([data])
        });

        if (response.ok) {
            console.log(isEditing ? 'Data updated successfully' : 'Data saved successfully');
            await fetchAndRenderSalesTable();
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
