
document.addEventListener('DOMContentLoaded', function () {
    fetchUserData();
   
});

const editPictureLink = document.getElementById('edit-picture');
    const pictureUpload = document.getElementById('picture-upload');
    const userSection = document.querySelector('.user-section');
    userSection.addEventListener('click', () => {
      userSection.classList.toggle('active');
    });

    editPictureLink.addEventListener('click', (event) => {
      event.preventDefault();
      pictureUpload.click();
    });

    pictureUpload.addEventListener('change', (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageURL = e.target.result;
        userSection.querySelector('.user-picture').style.backgroundImage = `url(${imageURL})`;
      };

      reader.readAsDataURL(file);
    });

    window.addEventListener('load', function () {
    // Fetch user information from the server
    fetch('/api/users/current')
        .then(response => response.json())
        .then(data => {
            // Update the user name in the dashboard
            document.getElementById('username-display').innerText = data.user.name;
        })
        .catch(error => {
            console.error('Error fetching user information:', error);
        });
});

const logoutLink = document.getElementById('logout');

logoutLink.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
        // Send a request to your server to log out the user
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Include any necessary credentials, like cookies
            credentials: 'include',
        });

        if (response.ok) {
            // Redirect to the login page after successful logout
            console.log("destroy session successfully");
            window.location.href = '/login.html';
        } else {
            console.error('Logout failed');
            // Handle the error as needed
        }
    } catch (error) {
        console.error(error);
        // Handle the error as needed
    }
});
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

function updateProfileSection(user) {
    // Update the profile section with user information
    const profileSection = document.getElementById('profileSection');

    if (profileSection) {
        profileSection.innerHTML = `
        <p>Welcome, ${user.firstName} ${user.lastName}!</p>
        <p>Email: ${user.email}</p>
        `;
    }
}