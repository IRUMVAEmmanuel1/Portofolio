document.getElementById("form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form data
  const username = document.getElementById("fname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Validate form data
  let isValid = true;
  if (!username.trim()) {
    document.getElementById("name_error").textContent = "Username is required";
    isValid = false;
  } else {
    document.getElementById("name_error").textContent = "";
  }
  if (!email.trim()) {
    document.getElementById("email_error").textContent = "Email is required";
    isValid = false;
  } else {
    document.getElementById("email_error").textContent = "";
  }
  if (!password.trim()) {
    document.getElementById("password_error").textContent = "Password is required";
    isValid = false;
  } else {
    document.getElementById("password_error").textContent = "";
  }

  if (!isValid) {
    return;
  }

  // Send user data to the server to register
  fetch('https://mybrand-bcke.onrender.com/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Display success message with SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'User registered successfully.',
      timer: 5000, // 2 seconds
      timerProgressBar: true,
      onClose: () => {
        window.location.href = "../Login/login.html";
      }
    });
  })
  .catch(error => {
    console.error('Error registering user:', error);
    // Display error message
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Registration failed. Please try again.'
    });
  });
});
