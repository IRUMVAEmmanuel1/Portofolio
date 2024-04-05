document.addEventListener("DOMContentLoaded", function () {
	const loader = document.getElementById("loader");
	const blogContentContainer = document.getElementById("blogContentContainer");
	const loggedIn = localStorage.getItem("token") !== null;
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	loader.style.display = "block"; // Show loader

	// Get the blog title from the URL query parameters
	const urlParams = new URLSearchParams(window.location.search);
	const blogId = urlParams.get("id");
	console.log("......here .......");
	console.log(blogId);
	fetch(`http://localhost:5000/api/blogs/${blogId}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			console.log("Fetched blog data:", data);
			loader.style.display = "none"; // Hide loader
			blogContentContainer.style.display = "block"; // Show single blog content container

			// Find the blog with the matching title
			const blog = data.blogs;
			if (blog) {
				document.getElementById("blogTitle").textContent = blog.title;
				document.getElementById("blogImage").src = blog.image;
				document.getElementById("blogContent").textContent = blog.content;

				// Update like count and button color
				const likeButton = document.getElementById("likeButton");
				const liked = likeButton.classList.contains("liked");
				const likeCount = document.getElementById("likeCount");
				// likeCount.textContent = blog.likes;
				// if (blog.liked) {
				// 	likeButton.textContent = "Unlike";
				// 	likeButton.classList.add("liked");
				// 	likeButton.classList.remove("unliked");
				// } else {
				// 	likeButton.textContent = "Like";
				// 	likeButton.classList.add("unliked");
				// 	likeButton.classList.remove("liked");
				// }

				fetch(`http://localhost:5000/api/blogs/${blogId}/likes`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				})
					.then((response) => {
						if (response.ok) {
							return response.json();
						} else {
							console.log("... response", response.json());
							throw new Error("Failed to update like status");
						}
					})
					.then((data) => {
						console.log("... here .....");
						console.log(data);
						const blog = data;
						likeCount.textContent = blog.likes && blog.likes.length;
						const currentUser = JSON.parse(localStorage.getItem("currentUser"));
						console.log(currentUser);

						const checkIfLike = blog.likes.filter(
							(e) => e.userId === currentUser._id
						);
                        console.log(checkIfLike)
						if (checkIfLike.length>0) {
							likeButton.textContent = "Unlike";
							likeButton.classList.remove("unliked");
							likeButton.classList.add("liked");
						} else {
							likeButton.textContent = "Like";
							likeButton.classList.remove("liked");
							likeButton.classList.add("unliked");
						}
					})
					.catch((error) => {
						console.error("Error updating like status:", error);
						swal("Error", "Failed to update like status.", "error");
					});

				// Display comments
				const commentList = document.getElementById("commentList");

				// Fetch comments from the API
				fetch(`http://localhost:5000/api/blogs/${blogId}/comments`)
					.then((response) => {
						if (!response.ok) {
							throw new Error("Network response was not ok");
						}
						return response.json();
					})
					.then((commentData) => {
						console.log(".... here ....");
						console.log(commentData);
						commentData.coment.forEach((comment) => {
							const li = document.createElement("li");
							li.textContent = `${comment.user}: ${comment.coment}`;
							commentList.appendChild(li);
						});
					})
					.catch((error) => {
						console.error("Error fetching comments:", error);
					});

				// Enable comment form fields if user is logged in
				if (loggedIn) {
					document.getElementById("usernameInput").value = currentUser.username;
					document.getElementById("commentInput").disabled = false;
					document.querySelector(
						"#commentForm button[type='submit']"
					).disabled = false;
				} else {
					// Show message to log in first
					const commentSection = document.getElementById("commentSection");
					const loginMessage = document.createElement("p");
					loginMessage.textContent = "Please log in to add a comment.";
					commentSection.appendChild(loginMessage);
				}
			} else {
				// Display an error message if the blog is not found
				document.getElementById("blogContent").textContent = "Blog not found";
			}
		})
		.catch((error) => {
			console.error("Error fetching blog content:", error);
			loader.style.display = "none"; // Hide loader in case of error
		});

	// Handle like button click event
	document.getElementById("likeButton").addEventListener("click", function () {
		if (!loggedIn) {
			// Show message to log in first
			swal("Login Required", "Please log in to like the blog.", "warning");
			return;
		}

		const likeButton = document.getElementById("likeButton");
		const liked = likeButton.classList.contains("liked");
		const likeCount = document.getElementById("likeCount");

		fetch(`http://localhost:5000/api/blogs/${blogId}/likes`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({ liked: !liked }),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					console.log("... response", response.json());
					throw new Error("Failed to update like status");
				}
			})
			.then((data) => {
				const blog = data;
				likeCount.textContent = blog.likes;
				if (!blog.data) {
					likeButton.textContent = "Unlike";
					likeButton.classList.remove("unliked");
					likeButton.classList.add("liked");
				} else {
					likeButton.textContent = "Like";
					likeButton.classList.remove("liked");
					likeButton.classList.add("unliked");
				}
				window.location.reload();
			})
			.catch((error) => {
				console.error("Error updating like status:", error);
				swal("Error", "Failed to update like status.", "error");
			});
	});

	// Handle comment form submission
	document
		.getElementById("commentForm")
		.addEventListener("submit", function (event) {
			event.preventDefault(); // Prevent form submission
			if (!loggedIn) {
				// Show message to log in first
				swal("Login Required", "Please log in to add a comment.", "warning");
				return;
			}
			const username = document.getElementById("usernameInput").value;
			const comment = document.getElementById("commentInput").value;

			fetch(`http://localhost:5000/api/blogs/${blogId}/comments`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({ coment: comment }),
			})
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error("Failed to add comment");
					}
				})
				.then((data) => {
					const commentList = document.getElementById("commentList");
					const li = document.createElement("li");
					li.textContent = `${username}: ${comment}`;
					commentList.appendChild(li);

					// Clear the comment input field
					document.getElementById("commentInput").value = "";

					swal(
						"Comment Posted!",
						"Your comment has been successfully posted.",
						"success"
					);
				})
				.catch((error) => {
					console.error("Error adding comment:", error);
					swal("Error", "Failed to add comment.", "error");
				});
		});
});
