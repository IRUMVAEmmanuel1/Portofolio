// document.addEventListener("DOMContentLoaded", function() {
//   displayArticles();
// });

// function displayArticles() {
//   const articles = JSON.parse(localStorage.getItem("articles")) || [];
//   const cardsContainer = document.getElementById("articleCardsContainer");

//   // Clear existing content
//   cardsContainer.innerHTML = "";

//   // Iterate through articles and create card for each
//   articles.forEach(function(article) {
//     const card = createArticleCard(article);
//     cardsContainer.appendChild(card);
//   });
// }

// function createArticleCard(article) {
//   const card = document.createElement("div");
//   card.classList.add("card1");

//   const cardContent = `
//     <div class="car">
//       <h5 class="card-title">${article.title}</h5>
//       <img src="${article.image}" class="card-img-top" alt="Article Image">
//       <p class="time">01,Jan,2024 <span>| WEBINAR</span></p>
//       <p class="card-text">${article.content}</p>
//       <div class="viewsLike">
//         <div class="views">
//           <p class="number readMoreButton"><a href="singleBlog.html?title=${encodeURIComponent(article.title)}">Read More</a>&nbsp;
//         </div>
//         <div class="likes">
//           <p class="number"><span>Like</span> &nbsp;<span class="allSpan">45</span></p>
//         </div>
//       </div>
//   `;

//   card.innerHTML = cardContent;
//   return card;
// }


// document.addEventListener("DOMContentLoaded", function() {
//   // Get the blog title from the URL query parameters
//   const urlParams = new URLSearchParams(window.location.search);
//   const blogTitle = urlParams.get('title');

//   // Find the blog with the matching title in local storage
//   const articles = JSON.parse(localStorage.getItem("articles")) || [];
//   const blog = articles.find(article => article.title === blogTitle);

//   // Populate the single blog page with the blog content
//   if (blog) {
//     document.getElementById("blogTitle").textContent = blog.title;
//     document.getElementById("blogImage").src = blog.image;
//     document.getElementById("blogContent").textContent = blog.content;
//   } else {
//     // Display an error message if the blog is not found
//     document.getElementById("blogContent").textContent = "Blog not found";
//   }

//   // Handle like button click event
//   document.getElementById("likeButton").addEventListener("click", function() {
    
//   });

//   // Handle comment form submission
//   document.getElementById("commentForm").addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevent form submission
//     const comment = document.getElementById("commentInput").value;
    
//   });
// });
