const usersRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

usersRouter.get("/", async (request, response) => {
    const res = await User.find({}).populate("blogs")
    response.status(200).json(res)
} )

usersRouter.post("/", async (request, response) => {
    const {username, name, password} = request.body
    if(!username || !password) {
        return response.status(400).json({
            error: "username or password missing"
        })
    } else if(username.length < 3 || password.length < 3) {
        return response.status(400).json({
            error: "username or password too short"
        })
    } else if(await User.findOne({username: username}).exec()) {
        return response.status(400).json({
            error: "username already taken"
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        password: passwordHash
    })

    const res = await user.save()
    response.status(201).json(res)
})

module.exports = usersRouter