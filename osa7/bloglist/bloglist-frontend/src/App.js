import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import loginService from "./services/login"
// eslint-disable-next-line no-unused-vars
import { setNotification } from './reducers/notiReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { setToken } from './reducers/tokenReducer'
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Routes, Route, Link} from "react-router-dom"
import BlogsView from './pages/BlogsView'
import UsersView from './pages/UsersView'
import UserView from './pages/UserView'
import { initializeUsers } from './reducers/usersReducer'
import BlogView from './pages/BlogView'
import "./index.css"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const noti = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)
  
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      dispatch(setToken(user.token))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login(username, password)
      dispatch(setUser(loggedUser))
      dispatch(setToken(loggedUser.token))
      window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser))
    } catch (exception) {
      dispatch(setNotification("wrong username or password"))
      setTimeout(() => {
        dispatch(setNotification(""))
      }, 3000);
    }
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

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
    dispatch(setToken(null))
  }

  return (
    <BrowserRouter>
      <div className='navBar'>
        <Link to={"/"} id="navBarLink">Blogs</Link> &nbsp;
        <Link to={"/users"} id="navBarLink">Users</Link> &nbsp;
        <strong>{user.name}</strong> logged in <button onClick={handleLogout}
          id="logout-button">logout</button>
      </div>
      <div>
        <h2>blogs</h2>
        <div>
            <p>{noti}</p>
        </div>
        <br/>
      </div>
      <Routes>
        <Route path='/' element={<BlogsView />} />
        <Route path='/users' element={<UsersView />} />
        <Route path='/users/:id' element={<UserView />} />
        <Route path='/blogs/:id' element={<BlogView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App