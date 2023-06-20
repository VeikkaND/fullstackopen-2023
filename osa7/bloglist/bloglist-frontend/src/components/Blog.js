import { Link } from "react-router-dom"

const Blog = ({blog}) => {
  const blogStyleShort = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyleShort} className="blogShort">
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </div> 
  )
   
}

export default Blog