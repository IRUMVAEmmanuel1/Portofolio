// Function to display all users in the table
function displayUsersInTable() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const tableBody = document.getElementById("userTableBody");

  // Clear existing content
  tableBody.innerHTML = "";

  // Iterate through users and create row for each
  users.forEach(function(user) {
    const row = tableBody.insertRow();
    row.innerHTML = `<td>${user.username}</td><td>${user.email}</td><td>${user.password}</td>`;
  });
}

// Call the function to display users in the table after the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  displayUsersInTable();
});

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

  // Save user data to local storage
  const user = { username, email, password };
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  // Clear form fields
  document.getElementById("form").reset();

  // Display success message
  const successMessage = document.createElement("p");
  successMessage.textContent = "Registration successful. Redirecting to login page...";
  successMessage.style.color = "green";
  document.getElementById("form").appendChild(successMessage);

  // Redirect to login page after 2 seconds
  setTimeout(function() {
    window.location.href = "../Login/login.html";
  }, 2000);

  // Update the table with the new user
  displayUsersInTable();
});
