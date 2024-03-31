document.addEventListener("DOMContentLoaded", function() {
  const loader = document.getElementById("loader");

  // Check if the current page is the single blog page
  if (window.location.pathname === '/singleBlog.html') {
    const blogContentContainer = document.getElementById("blogContentContainer");
    const urlParams = new URLSearchParams(window.location.search);
    const blogTitle = urlParams.get('title');

    loader.style.display = "block"; // Show loader

    fetch('https://mybrand-bcke.onrender.com/api/blogs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched blog data:', data);
        loader.style.display = "none"; // Hide loader
        blogContentContainer.style.display = "block"; // Show single blog content container
        
        // Find the blog with the matching title
        const blog = data.blogs.find(article => article.title === blogTitle);
        if (blog) {
          document.getElementById("blogTitle").textContent = blog.title;
          document.getElementById("blogImage").src = blog.image;
          document.getElementById("blogContent").textContent = blog.content;
        } else {
          // Display an error message if the blog is not found
          document.getElementById("blogContent").textContent = "Blog not found";
        }
      })
      .catch(error => {
        console.error('Error fetching blog content:', error);
        loader.style.display = "none"; // Hide loader in case of error
      });
  } else { // If the current page is not the single blog page
    const carouselContainer = document.querySelector(".carousel-slide");

    loader.style.display = "block"; // Show loader

    fetch('https://mybrand-bcke.onrender.com/api/blogs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched blog data:', data);
        loader.style.display = "none"; // Hide loader

        // Display fetched content in carousel
        displayArticles(data.blogs);
      })
      .catch(error => {
        console.error('Error fetching blog content:', error);
        loader.style.display = "none"; // Hide loader in case of error
      });

    function displayArticles(articles) {
      // Clear existing content
      carouselContainer.innerHTML = "";

      // Iterate through articles and create card for each
      articles.forEach(function(article) {
        const card = createArticleCard(article);
        carouselContainer.appendChild(card);
      });
    }

    function createArticleCard(article) {
      const card = document.createElement("div");
      card.classList.add("card1");

      const cardContent = `
        <div class="car">
          <h5 class="card-title">${article.title}</h5>
          <img src="${article.image}" class="card-img-top" alt="Article Image">
          <p class="time">01,Jan,2024 <span>| WEBINAR</span></p>
          <p class="card-text">${article.content}</p>
          <div class="viewsLike">
            <div class="views">
              <p class="number">54&nbsp;<span class="allSpan">Views</span></p>
            </div>
            <div class="likes">
              <p class="number"><span>Like</span> &nbsp;<span class="allSpan">45</span></p>
            </div>
          </div>
          <div class="readMore"><button class="readMoreButton"> <a href="singleBlog.html?title=${encodeURIComponent(article.title)}">Read More</a> </button></div>
        </div>
      `;

      card.innerHTML = cardContent;
      return card;
    }
  }
});
