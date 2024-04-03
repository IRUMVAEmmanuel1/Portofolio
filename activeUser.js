document.addEventListener("DOMContentLoaded", () => {
	// Check if token exists in local storage
	const token = localStorage.getItem("token");
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));
	if (currentUser) {
		// Display email on the menu

		document.getElementById("username").style.display = "inline-block";
		document.getElementById("username").textContent = currentUser?.username;

		// Show logout button and hide login button
		document.getElementById("logoutButton").style.display = "inline-block";
		document.getElementById("loginButton").style.display = "none";
	} else {
		alert("no user");
	}

	console.log(currentUser);

	// Add event listener to logout button
	document.getElementById("logoutButton").addEventListener("click", () => {
		// Remove token from local storage
		localStorage.removeItem("token");

		// Redirect to login page
		window.location.href = "../Login/login.html";
	});
});
