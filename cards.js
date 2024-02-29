document.addEventListener("DOMContentLoaded", function() {
  displayArticles();
});

function displayArticles() {
  const articles = JSON.parse(localStorage.getItem("articles")) || [];
  const cardsContainer = document.getElementById("articleCardsContainer");

  // Clear existing content
  cardsContainer.innerHTML = "";

  // Iterate through articles and create card for each
  articles.forEach(function(article) {
    const card = createArticleCard(article);
    cardsContainer.appendChild(card);
  });
}

function createArticleCard(article) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardContent = `
    <div class="card-1">
      <h5 class="card-title">${article.title}</h5>
      <img src="${article.image}" class="card-img-top" alt="Article Image">
     
      <p class="time">01,Jan,2024 <span>| WEBINAR</span></p>
     
       <p class="card-text">${article.content}</p>
      <div class="viewsLike">
        <div class="views">
          <p class="number">Read More&nbsp;<span class="allSpan">Views</span></p>
          <p></p>
          </div>
        <div class="likes">
          <p class="number"><span>Like</span> &nbsp;<span class="allSpan">45</span></p>
    </div>
  `;

  card.innerHTML = cardContent;
  return card;
}
