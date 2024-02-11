document.addEventListener('DOMContentLoaded', async function () {
    await fetchProductNames();
    await fetchSupplierNames();
  
    const currentDate = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = currentDate;

    fetchAndRenderInventoryTable();

    // Add event listener for the "Save" button
    const saveButton = document.getElementById('saveButton');
    if (saveButton) {
        saveButton.addEventListener('click', saveToDatabase);
    }
});

async function fetchProductNames() {
    try {
        const response = await fetch('/api/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const products = await response.json();
            console.log('Products:', products);

            const productNameSelect = document.getElementById('productName');
            const priceInput = document.getElementById('price'); 
             const costInput=document.getElementById('cost');
            productNameSelect.innerHTML = '';

            products.forEach(product => {
                const option = document.createElement('option');
                option.value = product.productName;
                option.textContent = product.productName;
                option.dataset.price = product.price; 
                option.dataset.cost = product.cost; 
                productNameSelect.appendChild(option);
            });

            productNameSelect.addEventListener('change', function () {
                const selectedProduct = productNameSelect.value;
                const selectedOption = productNameSelect.options[productNameSelect.selectedIndex];
                const price = selectedOption.dataset.price;
                const cost= selectedOption.dataset.cost;
                priceInput.value = price;
                costInput.value=cost;
            });
        } else {
            console.error('Failed to fetch product names');
        }
    } catch (error) {
        console.error('Error fetching product names:', error);
    }
}

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
                    option.textContent = supplierName; // Set both value and text
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


async function saveToDatabase() {
    event.preventDefault();
    var data = [];
    var form = document.getElementById('inventoryForm');
    var date = form.elements.date.value;
    var productName = form.elements.productName.value;
    var supplierName = form.elements.supplierName.value;
    var price = parseFloat(form.elements.price.value);
    var cost = parseFloat(form.elements.cost.value);
    var quantity = parseInt(form.elements.quantity.value);
    var total = (cost * quantity).toFixed(2);
   
    var row = {
        date: date,
        productName: productName,
        supplierName: supplierName,
        price: price,
        cost: cost,
        quantity: quantity,
        total: parseFloat(total)
    };

    data.push(row);

    console.log('Data to be saved:', data);

    try {
        const response = await fetch('/saveToDatabase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('Data saved to the database');
    
            form.reset();
      
            var totalElement = document.getElementById('total');
            if (totalElement) {
                totalElement.innerText = 'Total: 0.00';
            }
        } else {
            console.error('Failed to save data to the database');
        }
    } catch (error) {
        console.error('Error saving to the database:', error);
    }

    setTimeout(() => {
        location.reload();
    }, 1000);
}


async function fetchAndRenderInventoryTable() {
    try {
        const response = await fetch('/fetchInventoryData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const inventoryData = await response.json();
            console.log('Inventory Data:', inventoryData);
            renderInventoryTable(inventoryData);
        } else {
            console.error('Failed to fetch inventory data');
        }
    } catch (error) {
        console.error('Error fetching inventory data:', error);
    }
}

function renderInventoryTable(data) {
    const tableBody = document.getElementById('inventoryDataBody');
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach(row => {
        const localDate = new Date(row.date).toLocaleDateString();

        const newRow = tableBody.insertRow(-1);
        newRow.innerHTML = `<td>${localDate}</td>
                            <td>${row.productName}</td>
                            <td>${row.supplierName}</td>
                            <td>${row.price}</td>
                            <td>${row.cost}</td>
                            <td>${row.quantity}</td>
                            <td>${row.total}</td>`;
    });
}

function goBack() {
    window.history.back();
  } 

  function fetchUserData() {
    // Make a fetch request to get user data
    fetch('/api/users/current')
        .then(response => {
            if (response.status === 401) {
                // Redirect to the login page or handle unauthorized access
                window.location.href = '/login.html';
                throw new Error('User not authenticated');
            }
            return response.json();
        })
        .then(user => {
            // Store the user data in session storage
            sessionStorage.setItem('currentUser', JSON.stringify(user));

            // Log the stored user data for debugging
            console.log('Stored currentUser:', JSON.stringify(user));

            // Update the profile section immediately
            updateProfileSection(user);
        })
        .catch(error => {
            console.error('Error fetching user information:', error);
        });
}