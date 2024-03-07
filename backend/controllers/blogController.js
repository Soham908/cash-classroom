const Blog = require("./../models/blog")
exports.createBlog = async(req,res)=>{
    try {
        const blog = await Blog.create({
            userId : req.body.userId,
            title : req.body.title,
            summary : req.body.summary,
            desc : req.body.summary,
            img : req.body.img
        })

        res.json({
            success : true,
            blog
        })

    }catch(err){
        console.log(err)
        res.json({
            success : true,
            err
        })
    }
}

exports.updateBlog = async(req,res)=>{
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.body.blogId,req.body.update,{new : true})
        res.json({
            success : true ,
            updatedBlog
        })
    }catch(err){
        console.log(err)
        res.json({
            success : false,
            err
        })
    }
}

exports.deleteBlog = async(req,res) => {
    try {

        const response = await Blog.findByAndDelete(req.body.blogId)
        res.json({
            success : true,
            message : "Blog deleted Successfully"
        })

    }catch(err){
        console.log(err)
        res.json({
            success : false,
            err
        })
    }
}

exports.getAllBlogs = async(req,res) => {
    try {
        const blogs = await Blog.find()
        res.json({
           success : true,
           blogs 
        })        
    } catch (error) {
        console.log(error)
        res.json({
            success : false,
            error
        })
    }
}

exports.getBlogById = async(req,res) => {
    try {
        const blog = await Blog.findById(req.params.blogId)
        res.json({
            success : true,
            blog
        })
    } catch (error) {
        console.log(error)
        res.json({
            success : false,
            error 
        })
    }
}


