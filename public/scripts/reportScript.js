document.addEventListener('DOMContentLoaded', async function () {
    //fetchUserData();
    const GenerateReport=document.getElementById('GenerateReport');
    if(GenerateReport){
        GenerateReport.addEventListener('click', generateReport);
    } 
    const backButton=document.getElementById('back-button');
    if(backButton){
        backButton.addEventListener("click",goBack);
    }
})



function generateReport() {
    var reportType = document.getElementById("report-type").value;
    var fromDate = document.getElementById("from-date").value;
    var toDate = document.getElementById("to-date").value;
    var reportOutput = document.getElementById("report-output");
  
    reportOutput.innerHTML = "";
  
    if (reportType === "sales" || reportType === "stock" || reportType === "commission" || reportType === "closing" || reportType === "giveloan" || reportType === "receiveloan" ) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/reports/generateReport", true);
      xhr.setRequestHeader("Content-Type", "application/json");
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
              // Display the data in table format
              displayTable(response.reportData);
            } else {
              reportOutput.innerHTML = "Error fetching data.";
            }
          } else {
            reportOutput.innerHTML = "Error fetching data: " + xhr.statusText;
          }
        }
      };
  
      // Send the request with the selected report type and date range
      xhr.send(JSON.stringify({ reportType: reportType, fromDate: fromDate, toDate: toDate }));
    }
  }
  


  function displayTable(data) {
    var reportOutput = document.getElementById("report-output");

    // Calculate totals
    var totalQuantity = 0;
    var totalPrices = 0;
    var totalCost = 0;
    var totalProfit = 0;
    var totalAmount = 0;
    var totalComissionAmount=0;
    var totalDiscount=0;
    var totalDiscountAmount=0;
    var totalInstallment=0;
    var totalLoan=0;
    var totalRemainingAmount=0;



    // Create a table element
    var table = document.createElement("table");

    // Create a header row
    var headerRow = table.insertRow(0);
    for (var key in data[0]) {
        var th = document.createElement("th");
        th.innerHTML = key;
        headerRow.appendChild(th);
    }

    // Create rows with data
    for (var i = 0; i < data.length; i++) {
        var row = table.insertRow(i + 1);
        for (var key in data[i]) {
            var cell = row.insertCell();

            // Check if the current key is 'date' and format it
            if (key === 'date') {
                cell.innerHTML = formatDate(data[i][key]);
            } else {
                cell.innerHTML = data[i][key];
            }

            // Calculate totals for quantity, prices, cost, profit, and total
            if (key === 'quantity') {
                totalQuantity += parseInt(data[i][key]);
            } else if (key === 'price') {
                totalPrices += parseFloat(data[i][key]);
            } else if (key === 'cost') {
                totalCost += parseFloat(data[i][key]);
            } else if (key === 'profit') {
                totalProfit += parseFloat(data[i][key]);
            } else if (key === 'total') {
                totalAmount += parseFloat(data[i][key]);
            }else if (key === 'amount') {
                totalComissionAmount += parseFloat(data[i][key]);
            }else if (key === 'discount') {
                totalDiscount += parseFloat(data[i][key]);
            }
            else if (key === 'discountAmount') {
                totalDiscountAmount += parseFloat(data[i][key]);
            }
            else if (key==='installment'){
               totalInstallment += parseFloat(data[i][key]);
            }
            else if (key==='total_loan'){
                totalLoan = parseFloat(data[i][key]);
             }
        }
    }

    // Display totals above the table
    var totalRow = table.insertRow(data.length + 1);
    for (var key in data[0]) {
        var totalCell = totalRow.insertCell();

        // Set totals only for quantity, prices, cost, profit, and total
        if (key === 'quantity') {
            totalCell.style.fontWeight = "bold";
            totalCell.style.backgroundColor = "#ef8354";
            totalCell.innerHTML = "<span style='color:white;'>" + totalQuantity + "</span>";
        } else if (key === 'price') {
            totalCell.style.fontWeight = "bold";
            totalCell.style.backgroundColor = "#ef8354";
            totalCell.innerHTML =  totalPrices.toFixed(2);
        } else if (key === 'cost') {
            totalCell.style.fontWeight = "bold";
            totalCell.style.backgroundColor = "#ef8354";
            totalCell.innerHTML =  totalCost.toFixed(2);
        } else if (key === 'profit') {
            totalCell.style.fontWeight = "bold";
            totalCell.style.backgroundColor = "#ef8354";
            totalCell.innerHTML = totalProfit.toFixed(2);
        } else if (key === 'total') {
            totalCell.style.fontWeight = "bold";
            totalCell.style.backgroundColor = "#ef8354";
            totalCell.innerHTML = totalAmount.toFixed(2);
        } 
        else if (key === 'amount') {
            totalCell.style.fontWeight = "bold";
            totalCell.style.backgroundColor = "#ef8354";
            totalCell.innerHTML = totalComissionAmount.toFixed(2);
        }
       else if (key === 'installment') {
            totalCell.style.fontWeight = "bold";
            totalCell.style.backgroundColor = "#ef8354";
            totalCell.innerHTML = totalInstallment.toFixed(2);
       }
        else if (key === 'discountAmount') {
            totalCell.style.fontWeight = "bold";
            totalCell.style.backgroundColor = "#ef8354";
            totalCell.innerHTML = totalDiscountAmount.toFixed(2);
        }
        else if (key === 'total_loan') {
            totalCell.style.fontWeight = "bold";
            totalCell.style.backgroundColor = "#ef8354";
            totalCell.innerHTML = totalLoan.toFixed(2);
        }
        else {
            // For other columns, leave them blank
            totalCell.innerHTML = "";
            totalCell.style.backgroundColor = "#ef8354";
        }
    }

    // Append the table to the reportOutput element
    reportOutput.appendChild(table);
}


function formatDate(inputDate) {
    const date = new Date(inputDate);
  
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-based
    const year = date.getUTCFullYear();
  
    // Pad single-digit day and month with a leading zero
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
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