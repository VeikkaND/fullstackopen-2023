import { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notiReducer"
import { setBlogs } from "../reducers/blogReducer"
import "../index.css"

const CreateNew = ({blogService, token, blogs}) => {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    const [createVisible, setCreateVisible] = useState(false)

    const hideWhenVisible = {display: createVisible ? "none" : ""}
    const showWhenVisible = {display: createVisible ? "" : "none"}

    const dispatch = useDispatch()

    const handleCreate = async (event) => {
        event.preventDefault()
        try {
            const response = await blogService.create(title, author, url, token)
            dispatch(setNotification(`a new blog ${title} by ${author} added`))
            dispatch(setBlogs(blogs.concat(response)))
            setTimeout(() => {
                dispatch(setNotification(""))
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
                <h2>Create new</h2>
                <form onSubmit={handleCreate} className="createnew">
                    title: <input onChange={({target}) => setTitle(target.value)}
                    id="title"/>
                    <br/>
                    author: <input onChange={({target}) => setAuthor(target.value)}
                    id="author"/>
                    <br/>
                    url: <input onChange={({target}) => setUrl(target.value)}
                    id="url"/>
                    <br/>
                    <button type="submit" id="submit-button">create
                        </button><button onClick={() => setCreateVisible(false)} 
                        type="reset" className="cancel">cancel</button>
                </form>
                
            </div>
            
        </div>
    )
}

CreateNew.propTypes = {
    blogService: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    blogs: PropTypes.array.isRequired
}

export default CreateNew