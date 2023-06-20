const supertest = require("supertest")
const app = require("../index")
const Blog = require("../models/blog")
const User = require("../models/user")
const testHelper = require("./test_helper")

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testHelper.initialBlogs)
    await User.deleteMany({})
    await User.insertMany(testHelper.initialUsers)
})

describe("api tests", () => {
    test("/api/blogs GET", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    
        const response = await api
            .get("/api/blogs")
        expect(response.body).toHaveLength(testHelper.initialBlogs.length)
    })
    test("returned objects identifier called id", async () => {
        const response = await api.get("/api/blogs")
        const content = response.body
        expect(content.map(blog => blog.id)).toBeDefined()
    })
    test("blogs can be added with the POST request", async () => {
        const initialBlogs = await testHelper.getBlogsInDb()
        const newBlog = {
            "title": "This is a blog too",
            "author": "Author4",
            "url": "www.thisurldoesnotexist.com",
            "likes": 2
        }
        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)
        const newBlogs = await testHelper.getBlogsInDb()
        expect(newBlogs.length).toBe(initialBlogs.length+1)
    })
    test("blog with no likes gets assigned 0", async () => {
        const newBlog = {
            "title": "This is a blog without likes",
            "author": "Author5",
            "url": "www.thisurldoesnotexist.com"
        }
        const response = await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        expect(response.body.likes).toBe(0)
    })
    test("blog has no title or url", async () => {
        const newBlog = {
            "author": "Author5",
            "url": "www.thisurldoesnotexist.com",
            "likes": 15
        }
        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(400)
    })
    test("blog is deleted", async () => {
        const initialBlogs = await testHelper.getBlogsInDb()
        const blogToDelete = await Blog.find({author: "Author3"}).exec()
        await api
            .delete(`/api/blogs/${blogToDelete[0]._id}`)
            .expect(204)
        
        const newBlogArray = await testHelper.getBlogsInDb()

        expect(newBlogArray.length).toBe(initialBlogs.length-1)
    })
    test("blog is updated", async () => {
        blogToUpdate = await Blog.find({author: "Author2"}).exec()
        id = blogToUpdate[0]._id
        const newBlog = {
            "title": "This is another blog",
            "author": "Author2",
            "url": "www.thisurldoesnotexist.com",
            "likes": 12
        }
        await api
            .put(`/api/blogs/${id}`)
            .send(newBlog)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        const newBlogs = await testHelper.getBlogsInDb()
        expect(newBlogs[1].likes).toBe(newBlog.likes)
    })
})

describe("account tests", () => {
    test("creating an account works", async () => {
        const initialUsers = await testHelper.getUsersInDb()
        const newUser = {
            username: "user",
            name: "name",
            password: "password"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)
        
        const newUsers = await testHelper.getUsersInDb()
        expect(newUsers.length).toBe(initialUsers.length + 1)
    })
    test("creating an account with no username gives error", async () => {
        const newUser = {
            name: "name",
            password: "password"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
    })
    test("creating an account with a too short passowrd", async () => {
        const newUser = {
            username: "username",
            name: "name",
            password: "p"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
    })
    test("creating an account with an already existing name", async () => {
        const newUser = {
            username: "root",
            name: "name",
            password: "password"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
    })
})