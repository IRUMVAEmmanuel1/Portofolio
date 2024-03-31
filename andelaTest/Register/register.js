document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("form");
  const nameInput = document.getElementById("fname");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const nameError = document.getElementById("name_error");
  const emailError = document.getElementById("email_error");
  const passwordError = document.getElementById("password_error");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    // Reset error messages
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

    // Validate inputs
    if (nameValue === "") {
      nameError.textContent = "Please enter your username";
      return;
    }

    if (emailValue === "") {
      emailError.textContent = "Please enter your email";
      return;
    }

    if (passwordValue === "") {
      passwordError.textContent = "Please enter your password";
      return;
    }

    // Send registration data to the server
    fetch('https://mybrand-bcke.onrender.com/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: nameValue,
        email: emailValue,
        password: passwordValue,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      return response.json();
    })
    .then(data => {
      alert("Registration successful");
      // Redirect to login page
      window.location.href = "../Login/login.html";
    })
    .catch(error => {
      console.error('Registration error:', error);
      alert("Registration failed. Please try again later.");
    });
  });
});
