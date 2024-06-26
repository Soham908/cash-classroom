const Blog = require("./../models/blog");

exports.createBlog = async (req, res) => {
	try {
		const imagePath = req.file.path;
		console.log(imagePath);
		const blog = await Blog.create({
			userId: req.body.userId,
			img: imagePath,
			userName: req.body.userName,
			minRead: req.body.minRead,
			blogHtml: req.body.blogHtml,
			title: req.body.title,
		});

		res.json({
			success: true,
			blog,
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			err,
		});
	}
};

exports.updateBlog = async (req, res) => {
	try {
		console.log(req.body);
		const updatedBlog = await Blog.findByIdAndUpdate(
			req.body.blogId,
			req.body.update,
			{ new: true }
		);
		res.json({
			success: true,
			updatedBlog,
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			err,
		});
	}
};

exports.deleteBlog = async (req, res) => {
	try {
		const response = await Blog.findByIdAndDelete(req.params.blogId);
		res.json({
			success: true,
			message: "Blog deleted Successfully",
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			err,
		});
	}
};

exports.getAllBlogs = async (req, res) => {
	try {
		const blogs = await Blog.find({}, { desc: 0 });
		res.json({
			success: true,
			blogs,
		});
	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			error,
		});
	}
};

exports.getBlogById = async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.blogId);
		res.json({
			success: true,
			blog,
		});
	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			error,
		});
	}
};

exports.appendComment = async (req, res) => {
	try {
		console.log(req.body);
		const updatedBlog = await Blog.findByIdAndUpdate(
			req.body._id,
			{ $push: { comments: req.body.commentObj } },
			{ new: true }
		);
		res.json({
			success: true,
			updatedBlog,
		});
	} catch (error) {
		console.log(error);
		res.json({ success: false });
	}
};
