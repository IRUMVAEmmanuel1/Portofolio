document.addEventListener("DOMContentLoaded", async () => {
	try {
		const response = await fetch("https://mybrand-bcke.onrender.com/api/blogs", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			const data = await response.json();

			// Check if the response has a 'blogs' property
			if (data.hasOwnProperty("blogs")) {
				const blogs = data.blogs;
				const tableBody = document.getElementById("articleTableBody");

				// Clear existing table rows
				tableBody.innerHTML = "";

				// Populate the table with blog data
				blogs.forEach((blog) => {
					const row = document.createElement("tr");
					console.log(blog);
					const titleCell = document.createElement("td");
					titleCell.textContent = blog.title;
					row.appendChild(titleCell);

					const imageCell = document.createElement("td");
					const imageElement = document.createElement("img");

					// Fallback to a default image
					imageElement.src = blog.image;
					imageElement.height = 100;
					imageElement.width = 100;

					imageElement.alt = blog.title;
					imageElement.classList.add("card-img-top"); // Add the class for styling
					imageCell.appendChild(imageElement);
					row.appendChild(imageCell);

					const contentCell = document.createElement("td");
					contentCell.textContent = blog.content;
					row.appendChild(contentCell);

					const actionsCell = document.createElement("td");
					const editButton = document.createElement("button");
					editButton.textContent = "Edit";
					editButton.addEventListener("click", () => {
						// Handle edit button click
						editBlog(blog);
					});
					actionsCell.appendChild(editButton);
					row.appendChild(actionsCell);

					tableBody.appendChild(row);
				});
			} else {
				console.error("API response does not have a 'blogs' property.");
			}
		} else {
			console.error("Failed to fetch blogs:", response.status);
		}
	} catch (error) {
		console.error("Error:", error);
	}
});
