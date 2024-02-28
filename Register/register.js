//new validation form

const namo = document.getElementById("namo");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("form");
const name_error = document.getElementById('name_error');


form.addEventListener('submit', (e) => {
	if (namo.value === '' || namo.value == null) {
		e.preventDefault();
		name_error.innerHTML = "Title is required";
	}
});
