const express = require("express")
const {createBlog,updateBlog,deleteBlog,getAllBlogs,getBlogById } = require("./../controllers/blogController")

const router = express.Router()

router.post("/create-blog",createBlog)
router.patch("/update-blog",updateBlog)
router.delete("/delete-blog/:blogId",deleteBlog)
router.get("/get-all-blogs",getAllBlogs)
router.get("/get-blog-by-id/:blogId",getBlogById)

module.exports = router