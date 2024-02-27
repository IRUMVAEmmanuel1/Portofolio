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