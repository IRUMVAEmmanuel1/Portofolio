
const title = document.getElementById("title");
const content = document.getElementById("content");
const image = document.getElementById("image");
const form = document.getElementById("form");

const title_error = document.getElementById("title_error");
const content_error = document.getElementById("content_error");

form.addEventListener("submit", (e) => {

  if (title.value === "" || title.value == null) {
    e.preventDefault();
    title_error.innerHTML = "Article Title is required";
  }

  else{
    title_error.innerHTML = "";
  }
if(content.value === "" || content.value == null)
{
e.preventDefault();
    content_error.innerHTML = "Article Content is required";
}
else{
content_error.innerHTML = "";
}
if(image.value === "" || image.value == null)
{
e.preventDefault();
    image_error.innerHTML = "Image is required";
}
else{
image_error.innerHTML = "";
}
if (password.value.length<=8) {
e.preventDefault();
password_error.innerHTML = "Password must be more than 8 characters";
}
else{
password_error.innerHTML = "";
}
});


// Insert image on Localstorage

document.querySelector("#image").addEventListener("change", function(){
  const files = this.files;

  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();

    reader.addEventListener("load", ()=>{
      localStorage.setItem(`recent-image-${i}`, reader.result);
      displayImage(reader.result);
    });
    reader.readAsDataURL(files[i]);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("recent-image-")) {
      displayImage(localStorage.getItem(key));
    }
  }
});



// SINGLE LOCAL iMAGE START HERE
// function displayImage(imageDataUrl) {
//   const img = document.createElement("img");
//   img.src = imageDataUrl;
//   img.style.width = "200px"; // Adjust image size as needed
//   img.style.marginRight = "10px"; // Adjust margin as needed

//   document.querySelector("#imgPreviewContainer").appendChild(img);
// }

//single Local IMAGE ENDS HERE


document.getElementById("form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form data
  const title = document.getElementById("title").value;
  const image = document.getElementById("image").files[0]; // Assuming only one image selected
  const content = CKEDITOR.instances["content"].getData();

  // Validate form data
  if (!title.trim()) {
    document.getElementById("title_error").textContent = "Title is required";
    return;
  }
  if (!image) {
    document.getElementById("image_error").textContent = "Image is required";
    return;
  }
  if (!content.trim()) {
    document.getElementById("content_error").textContent = "Content is required";
    return;
  }

  // Read image file as data URL
  const reader = new FileReader();
  reader.addEventListener("load", function() {
    // Save data to localStorage
    const article = {
      title: title,
      image: reader.result,
      content: content
    };
    const articles = JSON.parse(localStorage.getItem("articles")) || [];
    articles.push(article);
    localStorage.setItem("articles", JSON.stringify(articles));

    // Clear form fields and errors
    document.getElementById("form").reset();
    document.querySelectorAll(".error").forEach(function(errorElement) {
      errorElement.textContent = "";
    });

    // Display the new article in the table
    displayArticleInTable(article);
  });
  reader.readAsDataURL(image);
});

document.addEventListener("DOMContentLoaded", function() {
  // Display all articles from localStorage on page load
  displayArticles();
});

function displayArticles() {
  const articles = JSON.parse(localStorage.getItem("articles")) || [];
  articles.forEach(function(article) {
    displayArticleInTable(article);
  });
}

function displayArticleInTable(article) {
  const tableBody = document.getElementById("articleTableBody");
  const row = tableBody.insertRow();
  row.innerHTML = `
    <td>${article.title}</td>
    <td><img src="${article.image}" alt="Image" style="width: 100px;"></td>
    <td>${article.content}</td>
  `;
}
// Function to create edit and delete icons
function createEditDeleteIcons() {
  const editIcon = '<i class="fa fa-edit" aria-hidden="true"></i>';
  const deleteIcon = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
  const editDeleteIcons = `${editIcon} ${deleteIcon}`;

  return editDeleteIcons;
}

// Function to display articles in the table
function displayArticleInTable(article, index) {
  const tableBody = document.getElementById("articleTableBody");
  const row = tableBody.insertRow();
  row.innerHTML = `
    <td>${article.title}</td>
    <td><img src="${article.image}" alt="Image" style="width: 100px;"></td>
    <td>${article.content}</td>
    <td class="actions" data-index="${index}">${createEditDeleteIcons()}</td> <!-- Added data-index attribute -->
  `;
}

// Add event listeners for edit and delete actions
document.addEventListener("click", function(event) {
  if (event.target.classList.contains("fa-edit")) {
    // Handle edit action
    const rowIndex = event.target.closest("tr").rowIndex;
    // Implement edit logic here, e.g., open edit modal
    console.log("Edit clicked for row index:", rowIndex);
  } else if (event.target.classList.contains("fa-trash-o")) {
    // Handle delete action
    const rowIndex = event.target.closest("tr").rowIndex;
    const tableRow = event.target.closest("tr");
    const tableBody = document.getElementById("articleTableBody");
    const dataIndex = tableRow.querySelector(".actions").getAttribute("data-index");
    
    // Delete corresponding article from localStorage
    let articles = JSON.parse(localStorage.getItem("articles")) || [];
    articles.splice(dataIndex, 1); // Remove article at the given index
    localStorage.setItem("articles", JSON.stringify(articles));
    
    // Remove row from the table
    tableBody.removeChild(tableRow);
    
    console.log("Delete clicked for row index:", rowIndex);
  }
});

// Function to open the edit modal with article details
function openEditModal(rowIndex) {
  const articles = JSON.parse(localStorage.getItem("articles")) || [];
  const article = articles[rowIndex];

  // Fill modal form with article details
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



// Counting Articles total number start here 

// Function to update the article count in the card
// Function to update the article count in the card
function updateArticleCountInCard() {
  const articleCountElement = document.getElementById("articleCount");
  const numArticles = countArticles();
  articleCountElement.textContent = numArticles;
}

// Call the function to update the article count in the card
updateArticleCountInCard();



// Counting Articles total number ends here