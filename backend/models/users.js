const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        requied : [true,"Username is required"]
    },
    email : {
        type : String,
        trim : true,
        required : [true,"User must have a email"],
        unique : true
    },
    password : {
        type : String,
        trim : true,
        required : [true,"User must have a password"]
    }
})

const users = mongoose.model("Users",userSchema)

module.exports = users