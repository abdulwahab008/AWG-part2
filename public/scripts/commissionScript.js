function getCurrentDate() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = String(currentDate.getMonth() + 1).padStart(2, '0');
    var day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
  
  document.addEventListener('DOMContentLoaded', function () {
    fetchUserData();
    fetchCommissions();
    var dateInput = document.getElementById('date');
    dateInput.value = getCurrentDate();
    const submit=document.getElementById('submit');
    if(submit){
        submit.addEventListener('click', saveCommission)
    }
    const totalProfitButton=document.getElementById('totalProfitButton');
    if(totalProfitButton){
        totalProfitButton.addEventListener("click",calculateTotalProfit);
    }
    
    const searchButton=document.getElementById('searchButton');
    if(searchButton){
        searchButton.addEventListener("click",searchAndHighlight);
    }
    const backButton=document.getElementById('back-button');
    if(backButton){
        backButton.addEventListener("click",goBack);
    }
  });
  
  function saveCommission(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form data
    var phone = document.getElementById("phone").value;
    var amount = parseFloat(document.getElementById('amount').value); // Parse the amount as a float
    var discount = parseFloat(document.getElementById('discount').value);
    var service = document.getElementById("service").value;
    var date = getCurrentDate();
   

    // Calculate profit and discountAmount
    var rawProfit = (amount / 100) - ((amount / 100) * (discount / 100));
    var profit = Math.round(rawProfit);
    if (amount < 0) {
      profit = 0; 
    }
    // Create an object to hold the data
    var commissionData = {
      date: getCurrentDate(),
        phone: phone,
        amount: amount,
        discount: discount,
        service: service,
        profit: profit,
        discountAmount: ((amount / 100) * (discount / 100)),
      
    };

    // Make an AJAX request to save the data
    fetch('/api/commissions/saveCommission', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commissionData),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response, you can update the UI or show a success message
        console.log('Commission saved successfully:', data);
        fetchCommissions()
    })
    .catch(error => {
        console.error('Error saving commission:', error);
    });
}
function fetchCommissions() {
  fetch('/api/commissions/getCommissions')
    .then(response => response.json())
    .then(data => {
      console.log('All Commissions:', data.commissions);
      if (data.success) {
        displayCommissions(data.commissions);
      } else {
        console.error('Error fetching commissions:', data.error);
      }
    })
    .catch(error => {
      console.error('Error fetching commissions:', error);
    });
}

function displayCommissions(commissions) {
  var currentDate = getCurrentDate();
  var table = document.getElementById('commissionTable');
  table.innerHTML = ''; // Clear existing content

  // Create table headers
  var headers = ['Date', 'Phone', 'Amount', 'Profit', 'Service'];
  var headerRow = table.insertRow();
  headers.forEach(header => {
    var cell = headerRow.insertCell();
    cell.innerHTML = `<b>${header}</b>`;
  });

  // Create table rows for commissions with the current date
  commissions.forEach(commission => {
    if (isSameDate(commission.date, currentDate)) {
      var row = table.insertRow();
      Object.keys(commission).forEach(key => {
        var cell = row.insertCell();
        var value = key === 'date' ? formatDate(commission[key]) : commission[key];
        cell.textContent = value;
      });
    }
  });
}

// Function to check if two dates are on the same day
function isSameDate(dateString1, dateString2) {
  var date1 = new Date(dateString1).toLocaleDateString('en-US');
  var date2 = new Date(dateString2).toLocaleDateString('en-US');
  return date1 === date2;
}




  
 



// Function to format the date
function formatDate(dateString) {
  var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  var formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
  return formattedDate;
}

// Fetch and display commissions when the page loads
document.addEventListener('DOMContentLoaded', function () {
  fetchCommissions();
});
function searchAndHighlight() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const tableRows = document.querySelectorAll('#commissionTable tr');
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
function calculateTotalProfit() {
  const table = document.getElementById('commissionTable');
  const rows = table.querySelectorAll('tr');
  let totalProfit = 0;

  // Start from index 1 to skip the header row
  for (let i = 1; i < rows.length; i++) {
    const profitCell = rows[i].cells[3]; // Assuming profit is in the 4th column (index 3)
    totalProfit += parseFloat(profitCell.textContent) || 0; // Handle NaN values
  }

  // Display the total profit below the button
  const totalProfitElement = document.getElementById('totalProfit');
  totalProfitElement.textContent = `Total Profit: ${totalProfit.toFixed(2)}`;
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