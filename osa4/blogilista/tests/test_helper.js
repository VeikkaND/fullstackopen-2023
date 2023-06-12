const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
    {
        title: 'This is a blog',
        author: 'Author1',
        url: 'www.thisurldoesnotexist.com',
        likes: 13
      },
      {
        title: 'This is another blog',
        author: 'Author2',
        url: 'www.thisurldoesnotexist.com',
        likes: 11
      },
      {
        title: 'This is yet another blog',
        author: 'Author3',
        url: 'www.thisurldoesnotexist.com',
        likes: 5
      }
]
const initialUsers = [
  {
    username: "root",
    name: "root",
    password: "password"
  }
]

const getBlogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const getUsersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    getBlogsInDb,
    getUsersInDb,
    initialUsers
}