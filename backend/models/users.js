const mongoose = require("mongoose");

const enrollCourseSchema = new mongoose.Schema({
	course: {
		type: String,
	},
	lessonsCompleted: {
		type: Number,
		default: 0,
	},
	totalLessons: {
		type: Number,
	},
	marksObtainedTillNow: {
		type: Number,
	},
	is50MilestoneShown: {
		type: Boolean,
		default: false,
	},
	is100MilestoneShown: {
		type: Boolean,
		default: false,
	},
});

const lesson = new mongoose.Schema({
	courseName: {
		type: String,
		required: true,
	},
	lessonName: {
		type: String,
		required: true,
	},
	lessonId: {
		type: String,
	},
	quizMarks: {
		type: Number,
		required: true,
	},
	totalQuestions: {
		type: Number,
		required: true,
	},
});

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		requied: [true, "Username is required"],
	},
	email: {
		type: String,
		trim: true,
		required: [true, "User must have a email"],
		unique: true,
	},
	password: {
		type: String,
		trim: true,
		required: [true, "User must have a password"],
	},
	enrolledCourses: [enrollCourseSchema],
	lessonsCompleted: [lesson],
	otp: {
		type: Number,
	},
});

const users = mongoose.model("Users", userSchema);

module.exports = users;
