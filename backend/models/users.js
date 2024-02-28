const mongoose = require("mongoose")

const enrollCourseSchema = new mongoose.Schema({
    course : {
        type : String
    },
})

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
    },
    enrolledCourses : [
        enrollCourseSchema
    ]
})

const users = mongoose.model("Users",userSchema)

module.exports = users