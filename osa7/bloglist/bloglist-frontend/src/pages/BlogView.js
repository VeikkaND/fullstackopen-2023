import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import blogService from "../services/blogs"
import { likeBlog } from "../reducers/blogReducer"
import { useState } from "react"
import "../index.css"

const BlogView = () => {
    const [newComment, setNewComment] = useState("")

    const blogs = useSelector((state) => state.blogs)
    const id = useParams().id
    const blog = blogs.find(b => b.id === id)

    const dispatch = useDispatch()

    if(!blog) return null

    const handleLike = async () => {
        await blogService.update(blog)
        dispatch(likeBlog(blog))
    }

    const handleNewComment = async () => {
        const comment = {comment: newComment}
        await blogService.addComment(blog, comment)
    }

    return (
        <div className="blogview">
            <h2>{blog.title} {blog.author}</h2>
            <div className="bloginfo">
            <a href={blog.url}>{blog.url}</a> <br/>
            {blog.likes} likes <button onClick={handleLike}
                id="like-button">like</button> <br/>
            added by {blog.user_name}
            </div>
            
            <h4>comments</h4>
            <form onSubmit={handleNewComment}>
                <input onChange={(event) => 
                    setNewComment(event.target.value)}>
                </input> <button type="submit">add comment</button>
            </form>
            <ul>
                {blog.comments.map(comment => 
                    <li key={Math.floor(Math.random() * 10000)}>{comment}</li>)}
            </ul>
        </div>
    )
}

export default BlogView