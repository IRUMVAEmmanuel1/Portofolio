document.getElementById("form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form data
  const username = document.getElementById("fname").value;
  const password = document.getElementById("password").value;

  // Retrieve registered users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find user with matching username and password
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    // Successful login, redirect to admin dashboard
    window.location.href = "../adminDashboard/index.html";
  } else {
    // Display error message for invalid credentials
    document.getElementById("name_error").textContent = "Invalid username or password";
  }
});
