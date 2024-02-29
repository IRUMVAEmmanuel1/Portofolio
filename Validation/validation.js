
	const fname = document.getElementById("fname");
	const email = document.getElementById("email");
	const password = document.getElementById("password");
	const form = document.getElementById("form");

	const name_error = document.getElementById("name_error");
  const email_error = document.getElementById("email_error");
  const password_error = document.getElementById("password_error")

	form.addEventListener("submit", (e) => {
var email_check =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (fname.value === "" || fname.value == null) {
			e.preventDefault();
			name_error.innerHTML = "Name is required";
		}

    else{
      name_error.innerHTML = "";
    }
if(!email.value.match(email_check))
{
e.preventDefault();
			email_error.innerHTML = "Valid Email is required";
}
else{
  email_error.innerHTML = "";
}
if (!password.value.length<=8) {
  e.preventDefault();
  password_error.innerHTML = "Password must be more than 8 characters";
}
else{
  password_error.innerHTML = "";
}
	});

