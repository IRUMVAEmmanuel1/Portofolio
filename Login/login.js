const fname = document.getElementById("fname");
const password = document.getElementById("password");
const form = document.getElementById("form");

const name_error = document.getElementById("name_error");
const password_error = document.getElementById("password_error");

form.addEventListener("submit", (e) => {
	if (fname.value === "" || fname.value == null) {
		e.preventDefault();
		name_error.innerHTML = "Name is required";
	} else {
		name_error.innerHTML = "";
	}

	if (password.value.length <= 8) {
		e.preventDefault();
		password_error.innerHTML = "Password must be more than 8 characters";
	} else {
		password_error.innerHTML = "";
	}
});

