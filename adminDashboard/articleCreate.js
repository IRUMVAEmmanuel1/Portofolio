document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("form");
  const title = document.getElementById("title");
  const content = document.getElementById("content");
  const image = document.getElementById("image");
  const titleError = document.getElementById("title_error");
  const contentError = document.getElementById("content_error");
  const imageError = document.getElementById("image_error");

  form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Reset previous error messages
      titleError.textContent = "";
      contentError.textContent = "";
      imageError.textContent = "";

      // Field validations
      let isValid = true;
      if (title.value.trim() === "") {
          isValid = false;
          titleError.textContent = "Article Title is required";
      }
      if (content.value.trim() === "") {
          isValid = false;
          contentError.textContent = "Article Content is required";
      }
      if (!image.files || image.files.length === 0) {
          isValid = false;
          imageError.textContent = "Image is required";
      }

      if (!isValid) {
          return;
      }}
  )})


  