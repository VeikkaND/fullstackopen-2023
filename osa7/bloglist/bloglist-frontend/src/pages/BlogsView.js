import blogService from "../services/blogs"
import { useSelector } from "react-redux"
import CreateNew from "../components/CreateNew"
import Blog from "../components/Blog"

const BlogsView = () => {
    const blogs = useSelector((state) => state.blogs)
    const token = useSelector((state) => state.token)

    const sortedBlogs = [...blogs].sort((a,b) => b.likes - a.likes)

    return (
    <div>
        <CreateNew blogService={blogService} token={token} blogs={blogs}/>
        {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
        )}
    </div>
    )
}

export default BlogsView