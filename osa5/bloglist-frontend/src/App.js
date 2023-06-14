import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"
// eslint-disable-next-line no-unused-vars
import CreateNew from './components/CreateNew'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [token, setToken] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [noti, setNoti] = useState()

  useEffect(() => {
    const getAll = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getAll()
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login(username, password)
      setUser(loggedUser)
      setToken(loggedUser.token)
      window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser))
    } catch (exception) {
      setNoti("wrong username or password")
      setTimeout(() => {
        setNoti()
      }, 3000);
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setToken(null)
  }

  if(user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <div>
          <p>{noti}</p>
        </div>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input onChange={({target}) => setUsername(target.value)} id="username"/>
          </div>
          <div>
            password
            <input onChange={({target}) => setPassword(target.value)} id="password"/>
          </div>
          <button type="submit" id="login-button">login</button>
        </form>
      </div>
    )
  }

  const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>{noti}</p>
      </div>
      {user.name} logged in <button onClick={handleLogout}
      id="logout-button">logout</button>
      <CreateNew blogService={blogService} token={token} blogs={blogs} 
      setNoti={setNoti} setBlogs={setBlogs}/>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs}
        token={token}/>
      )}
    </div>
  )
}

export default App