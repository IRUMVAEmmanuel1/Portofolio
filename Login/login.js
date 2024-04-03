document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("form");
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");

  form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent form submission

      const email = emailField.value;
      const password = passwordField.value;

      try {
          // Make a POST request to the login API
          const response = await fetch("http://localhost:5000/api/v1/users/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  email,
                  password,
              }),
          });

          const data = await response.json();
          console.log(JSON.stringify(data.data))
          if (response.ok) {
              // const { token, data } = data;

              // Store user information in localStorage
              localStorage.setItem("token", data.token);
              localStorage.setItem("currentUser", JSON.stringify(data.data))

              //  Check if the user is an admin
             setTimeout(()=>{
              if (data?.data?.isAdmin) {
                // Redirect to the admin dashboard
                window.location.href = "../adminDashboard/index.html";
            } else {
                // Redirect to the homepage
                window.location.href = "../index.html";
            }
             },2000)

              // Display success message using SweetAlert
              swal("Login Successful", "You have successfully logged in!", "success");
          } else {
              // Display error message using SweetAlert
              swal("Login Failed", data.message || "An error occurred. Please try again later.", "error");
          }
      } catch (error) {
          console.error("Error:", error);
          // Display error message using SweetAlert
          swal("Error", "An error occurred. Please try again later.", "error");
      }
  });
});
