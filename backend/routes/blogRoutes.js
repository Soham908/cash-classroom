const express = require("express");
const multer = require("multer");
const path = require("path");
const {
	createBlog,
	updateBlog,
	deleteBlog,
	getAllBlogs,
	getBlogById,
	appendComment,
} = require("./../controllers/blogController");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "images/");
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + "-" + Date.now() + path.extname(file.originalname)
		);
	},
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/create-blog", upload.single("image"), createBlog);
router.patch("/update-blog", updateBlog);
router.delete("/delete-blog/:blogId", deleteBlog);
router.get("/get-all-blogs", getAllBlogs);
router.get("/get-blog-by-id/:blogId", getBlogById);
router.patch("/add-comment", appendComment);

module.exports = router;
