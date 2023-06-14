import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({blog, blogs, setBlogs, token}) => {
  const [longVisible, setLongVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const blogStyleShort = {
    display: longVisible ? "none" : "",
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blogStyleLong = {
    display: longVisible ? "" : "none",
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    await blogService.update(blog)
    setLikes(likes + 1)
  }

  const handleDelete = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog, token)
        const newBlogs = blogs.filter(b => b.id !== blog.id)
        setBlogs(newBlogs)
      } catch (exception) {
        console.log("removing blog failed")
      }
    }
  }

  return(
    <div>
      <div style={blogStyleShort} className="blogShort">
        {blog.title} {blog.author} <button 
        onClick={() => setLongVisible(true)} id="view-button">view</button>
      </div> 
      <div style={blogStyleLong} className="blogLong">
        {blog.title} {blog.author} <button 
        onClick={() => setLongVisible(false)}>hide</button>
        <br/>
        {blog.url} <br/>
        likes {likes} <button onClick={handleLike}
        id="like-button">like</button> <br/>
        {blog.user_name} <br />
        <button onClick={handleDelete} id="remove-button">remove</button>
      </div>
    </div>
  )
   
}

export default Blog