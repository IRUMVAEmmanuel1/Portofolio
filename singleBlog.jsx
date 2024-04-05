const SingleBlog = () => {
	const { useState, useEffect } = React;
	const [blog, setBlog] = useState([]);
  const [comment, setComment] = useState([]);
  const [likes, setLikes] = useState([]);
  const [content, setContent] = useState("");
  const [user, setUser] = useState("");
  const [submitting, setSubmitting] = useState(false);
	const urlParams = new URLSearchParams(window.location.search);
	const blogId = urlParams.get("id");
	const FetchBlog = async () => {
		try {
			const response = await fetch(`https://mybrand-bcke.onrender.com/api/blogs/${blogId}`);
			const data = await response.json();

			setBlog(data.blogs);
		} catch (error) {
			console.log(error);
		}
	};
const FetchComment = async() =>{
  try {
    const response = await fetch(`https://mybrand-bcke.onrender.com/api/blogs/${blogId}/comments`)
    const data = await response.json();
    setComment(data.coment)
  
  } catch (error) {
    console.log(error)
  }
}
const FetchLikes = async() =>{
  try {
    const response = await fetch(`https://mybrand-bcke.onrender.com/api/blogs/${blogId}/likes`)
    const data = await response.json();
    setLikes(data.likes)
  
  } catch (error) {
    console.log(error)
  }
}
const addComment = async (e) => {
  e.preventDefault()
  const authorization = localStorage.getItem("token");
  if(!authorization){
    swal("Login Required", "Please log in to like the blog.", "warning");
  }
  if(content){
      try{
          setSubmitting(true)
          const res = await fetch(`https://mybrand-bcke.onrender.com/api/blogs/${blogId}/comments`,{
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${authorization}`
              },
              body: JSON.stringify({ coment: content})
          });
          const data = await res.json();
          setSubmitting(false)
          console.log(data)
          setContent("")
          swal(
            "Comment success!",
            "Your blog has been commented successfully.",
            "success"
          );
          return
      } catch(err){
          setSubmitting(false)
          console.log(err)
      }
  }
}
const likeBlog = async () => {
  const authorization = localStorage.getItem("token");
  if(!authorization){
    swal("Login Required", "Please log in to like the blog.", "warning");
    return
  }
  try{
    const response = await fetch(`https://mybrand-bcke.onrender.com/api/blogs/${blogId}/likes`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${authorization}`
      }
    });
    const data = await response.json();
    console.log(data)
    swal(
                "Comment Liked!",
                "Your blog liked successfully.",
                "success"
              );
              return
  } catch(err){
    console.log(err)
  }
}
	useEffect(() => {
		FetchBlog();
    FetchComment();
    FetchLikes();


	}, []);
  useEffect(() =>{
    FetchLikes();
  },[likes])
  useEffect(() =>{
    FetchComment();
  },[comment])



	return (
		<>
			<div id="loader" class="loader"></div>

			<div id="blogContentContainer">
				<h1 id="blogTitle"> {blog.title}</h1>
				<img
					id="blogImage"
					src={blog.image}
					alt="Blog Image"
					width="1100px"
					height="500px"
				/>
				<p id="blogContent">{blog.content}</p>
				<div id="likeSection">
					<button id="likeButton" onClick={likeBlog}>Like</button>
					<span id="likeCount">{likes.length}</span> Likes
				</div>

				<div id="commentSection">
					<h2>Comments</h2>

					<ul id="commentList">
            {comment.map(item =>{
              return <li>Joseph Uwineza : {item.coment}</li>
            })}
          </ul>
					<form id="commentForm">
						<div class="form-control">
							<textarea
								name="text"
								id="commentInput"

								cols="30"
								rows="10"
                value={content}
                onChange={(e)=>setContent(e.target.value)}
								placeholder="Add a comment"></textarea>
						</div>
						<div class="form-control">
							<button type="submit" onClick={addComment}>{submitting? `loading...` : `Submit`}</button>
							<button type="button" class="home">
								<a href="./index.html">Back Home</a>
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};
ReactDOM.render(<SingleBlog />, document.getElementById("SingleBlogContainer"));
