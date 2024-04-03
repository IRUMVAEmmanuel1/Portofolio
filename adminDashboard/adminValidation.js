document.addEventListener("DOMContentLoaded", async () => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser && currentUser.isAdmin) {
        // User is logged in and is an admin
        const form = document.getElementById("form");
        const title = document.getElementById("title");
        const content = document.getElementById("content");
        const image = document.getElementById("image");
        const titleError = document.getElementById("title_error");
        const contentError = document.getElementById("content_error");
        const imageError = document.getElementById("image_error");

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Reset previous error messages
            titleError.textContent = "";
            contentError.textContent = "";
            imageError.textContent = "";

            // Field validations
            let isValid = true;
            if (title.value.trim() === "") {
                isValid = false;
                titleError.textContent = "Article Title is required";
            }
            if (content.value.trim() === "") {
                isValid = false;
                contentError.textContent = "Article Content is required";
            }
            if (!image.files || image.files.length === 0) {
                isValid = false;
                imageError.textContent = "Image is required";
            }

            if (!isValid) {
                return;
            }

            // Prepare form data
            const formData = new FormData();
            formData.append("title", title.value.trim());
            formData.append("content", content.value.trim());
            formData.append("image", image.files[0]);

            // Perform POST request
            try {
                const response = await fetch("http://localhost:5000/api/blogs", {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    // Blog post successful
                    title.value = "";
                    content.value = "";
                    image.value = "";
                    swal.fire({
                        title: "Success!",
                        text: "Blog created successfully",
                        icon: "success",
                        button: "OK",
                    }).then(() => {
                        window.location.href = "./allBlogs.html"; // Redirect to allBlogs page
                    });
                } else {
                    // Blog post failed
                    const responseData = await response.json();
                    swal.fire({
                        title: "Error!",
                        text: responseData.message || "An error occurred while creating the blog.",
                        icon: "error",
                        button: "OK",
                    });
                }
            } catch (error) {
                console.error("Error:", error);
                swal.fire({
                    title: "Error!",
                    text: "An unexpected error occurred while creating the blog.",
                    icon: "error",
                    button: "OK",
                });
            }
        });
    } else {
        // User is not logged in or is not an admin
        alert("You do not have permission to create a blog.");
    }
});
