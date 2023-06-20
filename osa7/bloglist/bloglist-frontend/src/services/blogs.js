import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (title, author, url, token) => {
  const newBlog = {
    title: title,
    author: author,
    url: url
  }
  const response = await axios
    .post(baseUrl, newBlog, {headers: {"authorization" : `Bearer ${token}`}})
  return response.data
}

const update = async (blog) => {
  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    user: blog.user,
    user_name: blog.user_name
  }
  const response = await axios
    .put(`${baseUrl}/${blog.id}`, updatedBlog)
  return response.data
}

const remove = async (blog, token) => {
  const response = await axios
    .delete(`${baseUrl}/${blog.id}`, {headers: {"authorization" : `Bearer ${token}`}})
  return response.data
}

const addComment = async (blog, comment) => {
  const response = await axios
    .post(`${baseUrl}/${blog.id}/comments`, comment)
  return response.data
}


export default { getAll, create, update, remove, addComment }