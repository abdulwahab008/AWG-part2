document.addEventListener('DOMContentLoaded', async function(){
    fetchUserData();
    const searchButton=document.getElementById('searchButton');
    if(searchButton){
searchButton.addEventListener('click', searchTransaction);
    }
    const searchButtonTable=document.getElementById('searchButtonTable');
    if(searchButtonTable){
        searchButtonTable.addEventListener('click', searchAndHighlight )
    }
    const loanTypeSelect = document.getElementById('loan_type');
    if (loanTypeSelect) {
        loanTypeSelect.addEventListener('change', toggleInstallmentOption);
    }
    toggleInstallmentOption();
} );


document.getElementById('date').valueAsDate = new Date();
   
function calculateRemainingAmount() {
    const totalInstallments = parseFloat(document.getElementById('total_installment').value) || 0;
    const installmentNumber = parseFloat(document.getElementById('installment_number').value) || 0;
    const installmentAmount = parseFloat(document.getElementById('installment_amount').value) || 0;

    const remainingAmount = (totalInstallments - installmentNumber) * installmentAmount;

    document.getElementById('remaining_amount').value = remainingAmount.toFixed(2);
}

document.getElementById('installment_number').addEventListener('input', calculateRemainingAmount);

async function toggleInstallmentOption() {
    var loanType = document.getElementById('loan_type').value;
    var installmentFields = document.getElementById('installmentFields');

    if (loanType === 'monthly_installment') {
        const transactionId = document.getElementById('transaction_id').value;
        try {
            const response = await fetch('http://localhost:3000/receiveloans/monthly_installment_amount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ transaction_id: transactionId }),
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('installment_amount').value = data.monthly_installment_amount;
                document.getElementById('total_installment').value = data.installment;

                // Calculate and update remaining amount
                calculateRemainingAmount();

                installmentFields.style.display = 'block';
            } else {
                alert('Failed to fetch monthly installment amount.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while fetching monthly installment amount.');
        }
    } else {
        // If "Full Amount" is selected, reset the values to 0
        document.getElementById('installment_amount').value = '0';
        document.getElementById('total_installment').value = '0';
        document.getElementById('installment_number').value = '0';
        document.getElementById('remaining_amount').value = '0';

        calculateRemainingAmount();  // Ensure remaining amount is updated

        installmentFields.style.display = 'none';
    }
}

async function searchTransaction() {
    const transactionId = document.getElementById('transaction_id').value;

    try {
        const response = await fetch('http://localhost:3000/receiveloans/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transaction_id: transactionId }),
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('name').value = data.name;
            document.getElementById('amount').value = data.amount;
        } else {
            alert('Loan not found for the given transaction ID');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while searching for the loan.');
    }
}

document.getElementById('receiveLoanForm').addEventListener('submit', async function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    document.getElementById('date').valueAsDate = new Date();
    // Get form data using FormData
    const formData = new FormData(this);
    const loanType = formData.get('loan_type');
    if (loanType === 'full_amount') {
        formData.set('installment_amount', '0');
        formData.set('total_installment', '0');
        formData.set("installment_number", '0');
        formData.set("remaining_amount", '0');
    }
    try {
        // Send a POST request to the server
        const response = await fetch('http://localhost:3000/receiveloans/submit_loan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });

        // Check if the response is okay (status code 2xx)
        if (response.ok) {
            // Parse the JSON response
            const data = await response.json();
            console.log('Form submitted successfully:', data);

            // Display success message
            document.getElementById('successMessage').innerHTML = 'Loan submitted successfully';
            // Clear the form
            this.reset();
            // Fetch and display updated data
            fetchDataAndDisplay();
            setTimeout(() => {
                location.reload();
            }, 2000);
        } else {
            // Log an error if the response status is not okay
            console.error('Failed to submit form:', response.statusText);
        }
    } catch (error) {
        // Log an error if an exception occurs during the request
        console.error('An error occurred during form submission:', error);
    }
});

function attachDeleteButtonEvents() {
    const deleteButtons = document.querySelectorAll('#loanTableBody button');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const transactionId = this.getAttribute('data-transaction-id');
            deleteLoan(transactionId);
        });
    });
}

async function fetchDataAndDisplay() {
    try {
        const response = await fetch('http://localhost:3000/receiveloans/fetch_all');
        const data = await response.json();

        if (response.ok) {
            // Clear existing table rows
            document.getElementById('loanTableBody').innerHTML = '';

            // Append new rows with fetched data
            data.forEach(row => {
                const localDate = new Date(row.date).toLocaleDateString();
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${localDate}</td>
                    <td>${row.transaction_id}</td>
                    <td>${row.name}</td>
                    <td>${row.amount}</td>
                    <td>${row.loan_type}</td>
                    <td>${row.installment_number}</td>
                    <td>${row.remaining_amount}</td>
                    <td><button data-transaction-id="${row.transaction_id}">Delete</button></td>
                `;
                document.getElementById('loanTableBody').appendChild(newRow);
            });
            attachDeleteButtonEvents()
        } else {
            console.error('Failed to fetch data:', response.statusText);
        }
       
    } catch (error) {
        console.error('An error occurred during data fetch:', error);
    }
}

window.addEventListener('load', fetchDataAndDisplay);
function searchAndHighlight() {
    const searchTerm = document.getElementById('searchInputTable').value.toLowerCase();
    const tableRows = document.querySelectorAll('#loanTableBody tr');
    let found = false;
    tableRows.forEach(row => {
        const rowContent = row.textContent.toLowerCase();
        if (rowContent.includes(searchTerm)) {
            // Highlight the entire row or specific cells as needed
            row.style.backgroundColor = '#d35400';
            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
            found = true; 
        } else {
            row.style.backgroundColor = ''; // Reset background color
        }
    });
    if (!found) {
        alert('Term not found!');
    }
}

function deleteLoan(transactionId) {
    const confirmDelete = confirm('Are you sure you want to delete this loan?');

    if (confirmDelete) {
        // Perform the deletion
        fetch(`/receiveloans/delete_loan/${transactionId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Refresh the table after deletion
                fetchDataAndDisplay();
                console.log('Loan deleted successfully!');
            } else {
                console.error('Failed to delete loan.');
            }
        })
        .catch(error => {
            console.error('Error deleting loan:', error);
        });
    }
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