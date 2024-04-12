const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	comment: {
		type: String,
		required: true,
		trim: true,
	},
});

const courseSchema = new Schema({
	img: {
		type: String,
		default: null,
	},
	title: {
		unique: true,
		type: String,
		default: null,
	},
	desc: {
		type: String,
		default: null,
	},
	numChapters: {
		type: Number,
		default: null,
	},
	numQuizes: {
		type: Number,
		required: true,
	},
	level: {
		type: String,
		default: null,
	},
	order: {
		unique: true,
		type: String,
		default: null,
	},
	comments: {
		type: [commentsSchema],
		default: [],
	},
});

const Course = mongoose.model("Courses", courseSchema);

module.exports = Course;
