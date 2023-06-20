require("dotenv").config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const tokenExtractor = require("./utils/middleware").tokenExtractor
const userExtractor = require("./utils/middleware").userExtractor
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const testingRouter = require("./controllers/testing")

const mongoUrl = process.env.MONGODB_URL
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use("/api/blogs", userExtractor, blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/testing", testingRouter)

if(process.env.NODE_ENV!=="test") {
    const PORT = 3003
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })
}

module.exports = app