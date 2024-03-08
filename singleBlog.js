document.addEventListener("DOMContentLoaded", function() {
    // Get the blog title from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const blogTitle = urlParams.get('title');

    // Find the blog with the matching title in local storage
    const articles = JSON.parse(localStorage.getItem("articles")) || [];
    const blog = articles.find(article => article.title === blogTitle);

    // Populate the single blog page with the blog content
    if (blog) {
        document.getElementById("blogTitle").textContent = blog.title;
        document.getElementById("blogImage").src = blog.image;
        // Remove <p> tags and insert the blog content
        document.getElementById("blogContent").innerHTML = blog.content;
    } else {
        // Display an error message if the blog is not found
        document.getElementById("blogContent").textContent = "Blog not found";
    }

    // Initialize like count
    let likeCount = parseInt(localStorage.getItem('likeCount')) || 0;
    document.getElementById("likeCount").textContent = likeCount;

    // Check if user has already liked
    let liked = localStorage.getItem('liked') === 'true';
    if (liked) {
        document.getElementById("likeButton").textContent = 'Unlike';
    }

    // Handle like button click event
    document.getElementById("likeButton").addEventListener("click", function() {
        if (!liked) {
            likeCount++;
            localStorage.setItem('liked', 'true');
            localStorage.setItem('likeCount', likeCount);
            document.getElementById("likeCount").textContent = likeCount;
            document.getElementById("likeButton").textContent = 'Unlike';
            liked = true;
        } else {
            likeCount--;
            localStorage.setItem('liked', 'false');
            localStorage.setItem('likeCount', likeCount);
            document.getElementById("likeCount").textContent = likeCount;
            document.getElementById("likeButton").textContent = 'Like';
            liked = false;
        }
    });

    // Handle comment form submission
    document.getElementById("commentForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission
        const comment = document.getElementById("commentInput").value;
        const username = document.getElementById("usernameInput").value;
        const email = document.getElementById("emailInput").value;
        addComment(comment, username, email);
        // Clear input fields after submission
        document.getElementById("commentInput").value = '';
        document.getElementById("usernameInput").value = '';
        document.getElementById("emailInput").value = '';
    });

    // Display existing comments
    displayComments();
});

// Function to add a new comment
function addComment(comment, username, email) {
    const commentList = document.getElementById("commentList");
    const li = document.createElement("li");

    // Create elements for user details
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-details");
    const usernameSpan = document.createElement("span");
    usernameSpan.textContent = username;
    userDiv.appendChild(usernameSpan);
    li.appendChild(userDiv);

    // Add comment content
    const commentContent = document.createElement("p");
    commentContent.textContent = comment;
    li.appendChild(commentContent);

    commentList.appendChild(li);
}

// Function to display existing comments
function displayComments() {
    // Retrieve comments from local storage or any other source
    // For now, let's assume comments are stored in an array with user details
    const comments = [
        { comment: "Great post!", username: "Nancy", email: "nancy@gmail.com" }
    ];
    const commentList = document.getElementById("commentList");
    comments.forEach(commentData => {
        addComment(commentData.comment, commentData.username, commentData.email);
    });
}
