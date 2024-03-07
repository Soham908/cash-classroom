const mongoose = require("mongoose")

const blog = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    summary : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    img : {
        type : String,
        default : null
    }
},{timestamps : true})

const Blogs = mongoose.model("Blogs",blog)

module.exports = Blogs