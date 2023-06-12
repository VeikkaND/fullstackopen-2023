const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogsRouter.get('/', async (request, response) => {
    const res = await Blog.find({})
    response.json(res)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken) {
        return response.status(401).json({error: "token invalid"})
    }
    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user
    })

    if(!blog.title || !blog.url) {
        return response.status(400).json({
            error: "title or url missing"})
    }

    const res = await blog.save()
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    response.status(201).json(res)
})

blogsRouter.delete("/:id", async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    const deleterUser = request.user
    const deleterUserId = deleterUser.id.toString()
    const blogUser = await Blog.findById(request.params.id)
    const blogUserId = blogUser.user.toString()
    
    if(!decodedToken) {
        return response.status(401).json({error: "token invalid"})
    } else if(deleterUserId !== blogUserId) {
        return response.status(401).json({error: "token unauthorized"})
    }

    const res = await Blog.findByIdAndDelete(request.params.id)
    response.status(204).json(res)
})

blogsRouter.put("/:id", async (request, response) => {
    const updatedBlog = new Blog(request.body)
    
    const res = await Blog.findByIdAndUpdate(request.params.id, {
        title: updatedBlog.title,
        author: updatedBlog.author,
        url: updatedBlog.url,
        likes: updatedBlog.likes
    }, {new:true})
    response.status(200).json(res)
})

module.exports = blogsRouter