import { useState } from "react"
import PropTypes from "prop-types"

const CreateNew = ({blogService, token, blogs, setNoti, setBlogs}) => {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    const [createVisible, setCreateVisible] = useState(false)

    const hideWhenVisible = {display: createVisible ? "none" : ""}
    const showWhenVisible = {display: createVisible ? "" : "none"}

    const handleCreate = async (event) => {
        event.preventDefault()
        try {
            const response = await blogService.create(title, author, url, token)
            setNoti(`a new blog ${title} by ${author} added`)
            setBlogs(blogs.concat(response))
            setTimeout(() => {
            setNoti()
            }, 3000);
            setCreateVisible(false)
        } catch (exception){
            console.log("new blog incomplete")
        }
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={() => setCreateVisible(true)} 
                id="create-new-button">create new</button>
            </div>
            <div style={showWhenVisible}>
                <h2>create new</h2>
                <form onSubmit={handleCreate}>
                    title: <input onChange={({target}) => setTitle(target.value)}
                    id="title"/>
                    <br/>
                    author: <input onChange={({target}) => setAuthor(target.value)}
                    id="author"/>
                    <br/>
                    url: <input onChange={({target}) => setUrl(target.value)}
                    id="url"/>
                    <br/>
                    <button type="submit" id="submit-button">create</button>
                </form>
                <button onClick={() => setCreateVisible(false)}>cancel</button>
            </div>
            
        </div>
    )
}

CreateNew.propTypes = {
    blogService: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    blogs: PropTypes.array.isRequired,
    setNoti: PropTypes.func.isRequired,
    setBlogs: PropTypes.func.isRequired
}

export default CreateNew