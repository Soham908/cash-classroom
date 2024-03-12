const mongoose = require("mongoose")

const blog = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        // required : true,
    },
    userName : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true,
        trim : true
    },
    summary : {
        type : String,
        required : true,
        trim : true
    },
    desc : {
        type : String,
        required : true,
        // trim : true,
    },
    img : {
        type : String,
        default : null
    },
    minRead : {
        type : Number,
    }
},{timestamps : true})

const Blogs = mongoose.model("Blogs",blog)

module.exports = Blogs