// Function to change tabs
function changeTab(tabName) {
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function(tab) {
      tab.style.display = 'none';
  });

  var selectedTab = document.getElementById(tabName);
  selectedTab.style.display = 'block';
}

// Article form submission
document.getElementById('articleForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var content = document.getElementById('articleContent').value;

  // Validation
  if (content.trim() === '') {
      document.getElementById('articleError').textContent = 'Please enter article content';
      return;
  }

  // Clear error message
  document.getElementById('articleError').textContent = '';

  // Add article to the list
  var articleList = document.getElementById('articleList');
  var articleItem = document.createElement('div');
  articleItem.textContent = content;
  articleList.appendChild(articleItem);

  // Update articles count
  var articlesCount = document.getElementById('articlesCount');
  articlesCount.textContent = parseInt(articlesCount.textContent) + 1;

  // Clear form
  document.getElementById('articleContent').value = '';
});

// User form submission
document.getElementById('userForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var userName = document.getElementById('userName').value;

  // Validation
  if (userName.trim() === '') {
      document.getElementById('userError').textContent = 'Please enter username';
      return;
  }

  // Clear error message
  document.getElementById('userError').textContent = '';

  // Add user to the list
  var userList = document.getElementById('userList');
  var userItem = document.createElement('div');
  userItem.textContent = userName;
  userList.appendChild(userItem);

  // Update users count
  var usersCount = document.getElementById('usersCount');
  usersCount.textContent = parseInt(usersCount.textContent) + 1;

  // Clear form
  document.getElementById('userName').value = '';
});

// Pagination for comments
function paginateComments(pageNumber, pageSize) {
  // Fetch comments based on page number and size
  var commentsTable = document.getElementById('commentsTable');
  var comments = []; // Your comments data source
  var startIndex = (pageNumber - 1) * pageSize;
  var endIndex = startIndex + pageSize;
  var paginatedComments = comments.slice(startIndex, endIndex);

  // Clear existing rows
  commentsTable.querySelector('tbody').innerHTML = '';

  // Add new rows
  paginatedComments.forEach(function(comment) {
      var row = document.createElement('tr');
      row.innerHTML = `<td>${comment.text}</td><td>${comment.user}</td><td>${comment.post}</td><td><button>Edit</button><button>Delete</button></td>`;
      commentsTable.querySelector('tbody').appendChild(row);
  });
}

// Example pagination usage
paginateComments(1, 10); // Display first page with 10 comments

// Similarly, you can implement pagination for articles and users
// Your existing JavaScript code

// Function to toggle menu on small screens
function toggleMenu() {
  var sidebar = document.querySelector('.sidebar');
  sidebar.style.display = (sidebar.style.display === 'block') ? 'none' : 'block';
}

// Existing articles data (sample)
var existingArticles = [
  {
      title: "Sample Article 1",
      image: "https://via.placeholder.com/150",
      content: "This is the content of Sample Article 1."
  },
  {
      title: "Sample Article 2",
      image: "../images/article.jpg",
      content: "This is the content of Sample Article 2."
  },
  
];

// Function to populate article list
function populateArticleList() {
  var articleList = document.getElementById('articleList');
  articleList.innerHTML = ''; // Clear existing list

  // Create table element
  var table = document.createElement('table');
  table.classList.add('article-table');

  // Create table header
  var headerRow = table.createTHead().insertRow();
  var headers = ['Title', 'Image', 'Content'];
  headers.forEach(function(headerText) {
      var header = document.createElement('th');
      header.textContent = headerText;
      headerRow.appendChild(header);
  });

  // Create table body
  var tbody = table.createTBody();

  existingArticles.forEach(function(article, index) {
      var row = tbody.insertRow();
      
      // Add article title
      var titleCell = row.insertCell();
      titleCell.textContent = article.title;

      // Add article image
      var imageCell = row.insertCell();
      var image = document.createElement('img');
      image.src = article.image;
      image.alt = article.title;
      imageCell.appendChild(image);

      // Add article content
      var contentCell = row.insertCell();
      contentCell.textContent = article.content;

      // Apply border styling to table cells
      row.classList.add('article-row');
  });

  // Append table to article list
  articleList.appendChild(table);
}


// Populate article list on page load
window.addEventListener('load', populateArticleList);

// Article form submission
document.getElementById('articleForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var title = document.getElementById('articleTitle').value;
  var image = document.getElementById('articleImage').value;
  var content = document.getElementById('articleContent').value;

  // Validation
  if (title.trim() === '' || image.trim() === '' || content.trim() === '') {
      document.getElementById('articleError').textContent = 'Please fill in all fields';
      return;
  }

  // Clear error message
  document.getElementById('articleError').textContent = '';

  // Add article to the list
  var articleList = document.getElementById('articleList');
  var articleItem = document.createElement('div');
  articleItem.classList.add('article-item');
  articleItem.innerHTML = `
      <div class="article-title">${title}</div>
      <img src="${image}" alt="${title}" class="article-image">
      <div class="article-content">${content}</div>
  `;
  articleList.appendChild(articleItem);

  // Update articles count
  var articlesCount = document.getElementById('articlesCount');
  articlesCount.textContent = parseInt(articlesCount.textContent) + 1;

  // Clear form
  document.getElementById('articleTitle').value = '';
  document.getElementById('articleImage').value = '';
  document.getElementById('articleContent').value = '';
});
