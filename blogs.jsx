
const Blogs =() => {
  const {useState, useEffect} = React
  const [blogs, setBlogs] = useState([]);
  const allBlogs  = async()=>{
    try {
      const response = await fetch("https://mybrand-bcke.onrender.com/api/blogs") 
      const data = await response.json()
      
      setBlogs(data.blogs)
      
    } catch (error) {
      console.log(error)
    }
    
  }
  useEffect(()=>{
    allBlogs()
  },[])
  console.log(blogs)

  return (<>
  {blogs.map((article,index)=>{
    return(<div className="card1" key={index}>
    <div className="car" >
          <h5 className="card-title">{article.title}</h5>
          <img src={article.image} className="card-img-top" alt="Article Image " />
          <p className="time">{new Date(article.updatedAt).toLocaleString()} <span>| WEBINAR</span></p>
          <p className="card-text">{article.content}</p>
          <div className="viewsLike">
            <div className="views">
              <p className="number">5&nbsp;<span className="allSpan">Views</span></p>
            </div>
            <div className="likes">
              <p className="number"><span>Like</span> &nbsp;<span className="allSpan">45</span></p>
            </div>
          </div>
          <div className="readMore">
          <button className="readMoreButton"> <a href={`./singleBlog.html?id=${article._id}`}>Read More</a> 
          </button></div>
        </div>
    </div>
  )})}
  </>)
  
}
ReactDOM.render(< Blogs/>, document.getElementById('articleCardsContainer'))