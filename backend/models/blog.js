const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	comment: {
		type: String,
		required: true,
		trim: true,
	},
	userName: {
		type: String,
		required: true,
	},
});

const blog = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			// required : true,
		},
		userName: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		blogHtml: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			default: null,
		},
		minRead: {
			type: Number,
		},
		comments: {
			type: [commentsSchema],
			default: [],
		},
	},
	{ timestamps: true }
);

const Blogs = mongoose.model("Blogs", blog);

module.exports = Blogs;
