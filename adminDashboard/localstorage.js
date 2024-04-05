//new validation form

const title = document.getElementById("title");
const image = document.getElementById("image");
const content = document.getElementById("content");
const form = document.getElementById("form");
const title_error = document.getElementById("title_error");

form.addEventListener('submit', (e)=>

{
  if(title.value=== '' || title.value == null){
    e.preventDefault();
    name_error.innerHTML = "Title is required"
  }
})

//function to show data
function showData() {
	var blogList;
	if (localStorage.getItem("blogList") == null) {
		blogList = [];
	} else {
		blogList = JSON.parse(localStorage.getItem("blogList"));
	}

	var html = "";
	blogList.foreach(function (element, index) {
		html += "<tr>";
		html += "<td>" + element.title + "</td>";
		html += "<td>" + element.image + "</td>";
		html += "<td>" + element.content + "</td>";
		html +=
			'<td><button onclick="deleteData(' +
			index +
			')" class="btn-warning">Edit</button><button onclick="updateDate(' +
			index +
			')" class="btn-danger"></button></td>';
		html += "</tr>";
	});

	document.querySelector("#crudTable tbody").innerHTML = html;
}

// Loads all data when document or page load
document.onload = showData();

// function to add data
function addData() {
	//if form is validate
	if (validateForm() == true) {
		var title = document.getElementById("title").value;
		var image = document.getElementById("image");
		var content = document.getElementById("content");

		var blogList;
		if (localStorage.getItem("blogList") == null) {
			blogList = [];
		} else {
			blogList = JSON.parse(localStorage.getItem("blogList"));
		}
		blogList.push({
			title: title,
			image: image,
			content: content,
		});
		localStorage.setItem("blogList", JSON.stringify(blogList));
		showData();
		document.getElementById("title").value = "";
		document.getElementById("image").value = "";
		document.getElementById("content").value = "";
	}
}
