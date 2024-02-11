document.getElementById('date').valueAsDate = new Date();
document.addEventListener('DOMContentLoaded', async function(){
    fetchUserData();
    const totalLoan=document.getElementById('totalLoan');
    if(totalLoan){
        totalLoan.addEventListener('click', calculateTotalLoan)
    }
    const searchButton=document.getElementById('searchButton');
    if(searchButton){
        searchButton.addEventListener('click', searchAndHighlight)
    }
    const container=document.querySelector('.container');
container.addEventListener('input', function(event){
    if(event.target.matches('#amount') || event.target.matches('#installment')){
        calculateMonthlyInstallment();
    }

    
})
})

function attachDeleteButtonEvents() {
    const deleteButtons = document.querySelectorAll('#loanTableBody button');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const transactionId = this.getAttribute('data-transaction-id');
            deleteLoan(transactionId);
        });
    });
}
// Function to fetch and display loan data
async function fetchAndDisplayLoanData() {
    try {
        const response = await fetch('/giveloans/loans');
        if (!response.ok) {
            throw new Error('Failed to fetch loan data.');
        }

        const data = await response.json();
        const tableBody = document.getElementById('loanTableBody');
        tableBody.innerHTML = '';

        data.forEach(loan => {
            const localDate = new Date(loan.date).toLocaleDateString();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${localDate}</td>
                <td>${loan.transaction_id}</td>
                <td>${loan.name}</td>
                <td>${loan.amount}</td>
                <td>${loan.installment}</td>
                <td>${loan.monthly_installment}</td>
                <td><button data-transaction-id="${loan.transaction_id}">Delete</button></td>
                
            `;
            tableBody.appendChild(row);
        });
        attachDeleteButtonEvents();
    } catch (error) {
        console.error('Error fetching loan data:', error);
    }
}

// Initial fetch and display
fetchAndDisplayLoanData();

// Function to calculate monthly installment
function calculateMonthlyInstallment() {
    const amount = parseFloat(document.getElementById("amount").value) || 0;
    const installment = parseFloat(document.getElementById("installment").value) || 1;

    let monthlyInstallmentAmount = amount / installment;

    // Round down to the nearest integer
    monthlyInstallmentAmount = Math.floor(monthlyInstallmentAmount);

    // Convert to string and add ".00"
    monthlyInstallmentAmount = monthlyInstallmentAmount.toFixed(2);
    document.getElementById("monthlyInstallmentAmount").value = monthlyInstallmentAmount;
}

// Add event listener for form submission
document.getElementById('loanForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
  // Log the form data to the console
console.log('Form Data:', formData);
    try {
        const response = await fetch('/giveloans/submit_loan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });
        
          console.log('Server Response:', response);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to submit loan. Server response: ${errorMessage}`);
        }

        // Clear the form after successful submission
        document.getElementById('loanForm').reset();
        document.getElementById('date').valueAsDate = new Date();
        // Fetch and display updated loan data in the table
        await fetchAndDisplayLoanData();

        // Display success message
        document.getElementById('successMessage').textContent = 'Loan submitted successfully!';
        setTimeout(() => {
            location.reload();
        }, 2000);
    } catch (error) {
        console.error('Error submitting loan:', error);
        // Display error message
        document.getElementById('successMessage').textContent = 'Error submitting loan. Please try again.';
    }
});

function deleteLoan(transactionId) {
    const confirmDelete = confirm('Are you sure you want to delete this loan?');

    if (confirmDelete) {
        // Perform the deletion
        fetch(`/giveloans/delete_loan/${transactionId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Refresh the table after deletion
                fetchAndDisplayLoanData();
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

async function calculateTotalLoan() {
    try {
        const tableRows = document.querySelectorAll('#loanTableBody tr');
        let totalLoan = 0;

        tableRows.forEach(row => {
            const amountColumn = row.querySelector('td:nth-child(4)'); // Adjust the column index based on your table structure
            if (amountColumn) {
                const amount = parseFloat(amountColumn.textContent) || 0;
                totalLoan += amount;
            }
        });

        // Update the total_loan column in the database
        const response = await fetch('/giveloans/update_total_loan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ totalLoan }),
        });

        if (!response.ok) {
            throw new Error('Failed to update total loan in the database.');
        }

        // Display success message or handle as needed
        document.getElementById('totalLoanDisplay').textContent = `Total Loan: ${totalLoan.toFixed(2)}`;
        console.log('Total loan updated successfully!');
        setTimeout(() => {
            location.reload();
        }, 1000);
    } catch (error) {
        console.error('Error updating total loan:', error);
    }
}
function searchAndHighlight() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
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
async function fetchCustomerNames() {
    try {
        const response = await fetch('/giveloans/customer_names');
        if (!response.ok) {
            throw new Error('Failed to fetch customer names.');
        }

        const customerNames = await response.json();
        const nameDropdown = document.getElementById('name');

        // Add each customer name as an option in the dropdown
        customerNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.text = name;
            nameDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching customer names:', error);
    }
}

  // Call the fetchCustomerNames function when the page loads
  fetchCustomerNames();

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