const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    password: String,
    blogs: [
        {type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"}
    ]
})

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id
        delete returnedObject.password
    }
})

module.exports = mongoose.model("User", userSchema)