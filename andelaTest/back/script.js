document.addEventListener("DOMContentLoaded", function() {
  const loader = document.getElementById("loader");
  const blogContentContainer = document.getElementById("blogContentContainer");

  loader.style.display = "block"; // Show loader

  fetchBlogContent()
    .then(data => {
      console.log('Fetched blog data:', data);
      displayBlogContent(data.blogs); // Pass only the array of blogs to displayBlogContent
      loader.style.display = "none"; // Hide loader
      blogContentContainer.style.display = "block"; // Show content container
    })
    .catch(error => {
      console.error('Error fetching blog content:', error);
      loader.style.display = "none"; // Hide loader in case of error
    });
});

function fetchBlogContent() {
  return fetch('https://mybrand-bcke.onrender.com/api/blogs')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}

function displayBlogContent(blogs) {
  const blogContentContainer = document.getElementById("blogContentContainer");

  // Clear existing content
  blogContentContainer.innerHTML = "";

  // Check if the received data is an array
  if (!Array.isArray(blogs)) {
    console.error('Received blog data is not an array:', blogs);
    return;
  }

  // Iterate through the array of blogs and display each blog content
  blogs.forEach(blog => {
    const blogDiv = document.createElement('div');
    blogDiv.classList.add('blog-content');

    // Display blog title
    const titleElement = document.createElement('h2');
    titleElement.textContent = blog.title;
    blogDiv.appendChild(titleElement);

    // Display blog image
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    const imageElement = document.createElement('img');
    imageElement.src = blog.image;
    imageElement.alt = blog.title;
    imageContainer.appendChild(imageElement);
    blogDiv.appendChild(imageContainer);

    // Display blog content
    const contentElement = document.createElement('p');
    contentElement.textContent = blog.content;
    blogDiv.appendChild(contentElement);

    // Append blog content to the container
    blogContentContainer.appendChild(blogDiv);
  });
}
