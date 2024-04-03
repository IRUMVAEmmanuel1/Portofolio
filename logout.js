document.addEventListener("DOMContentLoaded", function() {
  // Check if user is logged in
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

  if (token) {
      // User is logged in
      const username = getUsernameFromToken(token); // Assuming you have a function to get username from token

      // Display username on the menu
      const usernameElement = document.getElementById("username");
      usernameElement.innerText = username;
      usernameElement.style.display = "inline-block";

      // Show logout button and hide login button
      const logoutButton = document.getElementById("logoutButton");
      logoutButton.style.display = "inline-block";
      logoutButton.addEventListener("click", function(event) {
          event.preventDefault(); // Prevent default link behavior

          // Remove user information from local storage
          localStorage.removeItem("token");
          localStorage.removeItem("isAdmin");

          // Redirect to login page
          window.location.href = "../Login/login.html";
      });

      // Hide login button
      const loginButton = document.getElementById("loginButton");
      loginButton.style.display = "none";
  }
});

function getUsernameFromToken(token) {
  // Implement function to decode token and extract username
  // For example, you can use JWT library or custom logic to decode the token
  // Here, we assume the token contains a 'username' claim
  const decodedToken = parseJwt(token); // Assuming you have a function to parse JWT token
  return decodedToken.username;
}

function parseJwt(token) {
  // Implement function to parse JWT token
  // Here, we provide a simplified example assuming token is in JWT format
  // Replace this with your actual implementation to parse JWT token
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
