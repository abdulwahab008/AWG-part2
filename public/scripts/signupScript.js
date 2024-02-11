document.addEventListener('DOMContentLoaded', async function(){
    const signup=document.getElementById('signup');
    signup.addEventListener('click', performSignup)
})
function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phoneInput = document.getElementById("phone").value;

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // General error message div
    var errorMessage = document.getElementById("error-message");

    // Clear any previous error messages
    errorMessage.innerText = "";

    // Name validation (you can customize this validation)
    if (name.trim() === "") {
        errorMessage.innerText = "Please enter your name";
        return false;
    }

    // Email validation
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        errorMessage.innerText = "Invalid email address";
        return false;
    }

   // const phonePattern = /^\d{11}$/;
  //  if (!phonePattern.test(phoneInput.value)) {
   //     errorMessage.innerText = "Please enter a phone number";
   //     return;
 //   }

    // Username validation
    if (username.trim() === "") {
        errorMessage.innerText = "Please enter a username";
        return false;
    }

    // Password validation
    var passwordPattern = /^.{8,}$/;
    if (!passwordPattern.test(password)) {
        errorMessage.innerText = "Invalid password. It must be at least 8 characters, including letters and numbers.";
        return false;
    }

    // Additional validations can be added for other fields if needed

    // Prevent the form from submitting
    return true;
}

function performSignup() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // General error message div
    var errorMessage = document.getElementById("error-message");
    // Username error message div
    var usernameError = document.getElementById("username-error");
    // Password error message div
    var passwordError = document.getElementById("password-error");

    // Clear any previous error messages
    errorMessage.innerText = "";
    usernameError.innerText = "";
    passwordError.innerText = "";

    // Validate the form fields
    if (!validateForm()) {
        return false;
    }

    // Fetch API to submit the form data
    fetch('/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                username,
                password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                // Display error message on the page
                if (data.error.includes("Username is already taken")) {
                    usernameError.innerText = data.error;
                } else {
                    errorMessage.innerText = data.error;
                }
            } else if (data.message) {
                // Display success message and handle redirection or other actions
                alert(data.message);
                window.location.href = '/signup-success.html'; // Redirect if needed
            }
        })
        .catch(error => {
            console.error('Error during form submission:', error);
            // Handle other errors as needed
        });
}