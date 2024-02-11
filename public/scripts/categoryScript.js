document.addEventListener('DOMContentLoaded', async function () {
    fetchUserData();
  
    // Add event listener for the "Add Category" button
    const categoryButton = document.getElementById('categoryButton');
    if (categoryButton) {
      categoryButton.addEventListener('click', addOrUpdateCategory);
    }
  
    // Add event listeners for "Edit" and "Delete" buttons
    const categoryList = document.getElementById('categoryList');
    if (categoryList) {
      categoryList.addEventListener('click', function (event) {
        const target = event.target;
  
        // Check if the clicked element is an "Edit" or "Delete" button
        if (target.tagName === 'BUTTON') {
          const row = target.closest('tr');
          const categoryId = row.dataset.id;
  
          if (target.textContent.toLowerCase() === 'edit') {
            startEditing(categoryId);
          } else if (target.textContent.toLowerCase() === 'delete') {
            deleteCategory(categoryId);
          }
        }
      });
    }

  });
  


let isEditing = false;
let editingCategoryId = null;

async function addOrUpdateCategory() {
  const name = document.getElementById('categoryInput').value;

  if (isEditing) {
    // Handle update logic
    const response = await fetch(`/categories/${editingCategoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    const result = await response.json();
    console.log(result);
  } else {
    // Handle add logic
    const response = await fetch('/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    const result = await response.json();
    console.log(result);
  }

  // Reset input and button state
  document.getElementById('categoryInput').value = '';
  document.getElementById('categoryButton').innerText = 'Add Category';
  isEditing = false;

  // Update category list
  getCategoryList();
}

function startEditing(categoryId) {
  // Set input field with the current category name
  const categoryName = document.querySelector(`#categoryList tr[data-id="${categoryId}"] td:nth-child(2)`).innerText;
  document.getElementById('categoryInput').value = categoryName;

  // Change button to "Update"
  document.getElementById('categoryButton').innerText = 'Update';
  isEditing = true;
  editingCategoryId = categoryId;
}

async function deleteCategory(categoryId) {
  // Implement the delete functionality
  const confirmDelete = confirm('Are you sure you want to delete this category?');
  if (confirmDelete) {
    // Make a DELETE request to delete the category
    const response = await fetch(`/categories/${categoryId}`, {
      method: 'DELETE',
    });

    const result = await response.json();
    console.log(result);

    // Update category list after deletion
    getCategoryList();
  }
}

async function getCategoryList() {
  const response = await fetch('/categories');
  const categories = await response.json();
  const categoryList = document.getElementById('categoryList');
  categoryList.innerHTML = '';

  // Update the table with categories
  const tableBody = document.getElementById('categoryList');
  categories.forEach(category => {
    const row = document.createElement('tr');
    row.setAttribute('data-id', category.id);
    row.innerHTML = `
      <td>${category.id}</td>
      <td>${category.name}</td>
      <td>
      <button class="edit-button">Edit</button>
      <button class="delete-button">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Initial load
getCategoryList();
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