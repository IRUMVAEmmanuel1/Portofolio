// Combined JavaScript for createBlog.html and allBlogs.html

document.addEventListener("DOMContentLoaded", function() {
  // Display all articles from localStorage on page load
  displayArticles();
});

function displayArticles() {
  const articles = JSON.parse(localStorage.getItem("articles")) || [];
  articles.forEach(function(article, index) {
      displayArticleInTable(article, index);
  });
}

function displayArticleInTable(article, index) {
  const tableBody = document.getElementById("articleTableBody");
  const row = tableBody.insertRow();
  row.innerHTML = `
      <td>${article.title}</td>
      <td><img src="${article.image}" alt="Image" style="width: 100px;"></td>
      <td>${article.content}</td>
      <td class="actions" data-index="${index}">${createEditDeleteIcons()}</td>
  `;
}

// Function to create edit and delete icons
function createEditDeleteIcons() {
  const editIcon = '<i class="fa fa-edit" aria-hidden="true"></i>';
  const deleteIcon = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
  const editDeleteIcons = `${editIcon} ${deleteIcon}`;

  return editDeleteIcons;
}

// Add event listeners for edit and delete actions
document.addEventListener("click", function(event) {
  if (event.target.classList.contains("fa-edit")) {
      // Handle edit action
      const rowIndex = event.target.closest("tr").rowIndex - 1; // Adjust for header row
      openEditModal(rowIndex);
  } else if (event.target.classList.contains("fa-trash-o")) {
      // Handle delete action
      const rowIndex = event.target.closest("tr").rowIndex;
      const tableRow = event.target.closest("tr");
      const dataIndex = tableRow.querySelector(".actions").getAttribute("data-index");

      // Delete corresponding article from localStorage
      let articles = JSON.parse(localStorage.getItem("articles")) || [];
      articles.splice(dataIndex, 1); // Remove article at the given index
      localStorage.setItem("articles", JSON.stringify(articles));

      // Remove row from the table
      tableRow.parentNode.removeChild(tableRow);
  }
});

// Function to open the edit modal with article details
function openEditModal(rowIndex) {
  const articles = JSON.parse(localStorage.getItem("articles")) || [];
  const article = articles[rowIndex];

  // Fill modal form with article details
  // Assuming you have an edit modal with fields like editTitle, editImage, editContent
  document.getElementById("editTitle").value = article.title;
  document.getElementById("editContent").value = article.content;

  // Show the modal
  const modal = document.getElementById("editModal");
  modal.style.display = "block";

  // Close the modal when the close button is clicked
  const closeBtn = document.querySelector("#editModal .close");
  closeBtn.addEventListener("click", function() {
      modal.style.display = "none";
  });

  // Save changes when the "Save" button is clicked
  document.getElementById("saveEdit").addEventListener("click", function() {
      // Update article details
      article.title = document.getElementById("editTitle").value;
      article.content = document.getElementById("editContent").value;

      // Update localStorage
      localStorage.setItem("articles", JSON.stringify(articles));

      // Close the modal
      modal.style.display = "none";

      // Update the table with the edited article
      updateArticleInTable(rowIndex, article);
  });
}

function updateArticleInTable(rowIndex, article) {
  const tableBody = document.getElementById("articleTableBody");
  const rowToUpdate = tableBody.rows[rowIndex];
  rowToUpdate.innerHTML = `
      <td>${article.title}</td>
      <td><img src="${article.image}" alt="Image" style="width: 100px;"></td>
      <td>${article.content}</td>
      <td class="actions" data-index="${rowIndex}">${createEditDeleteIcons()}</td>
  `;
}
