const mongoose = require("mongoose");

const enrollCourseSchema = new mongoose.Schema({
  course: {
    type: String,
  },
  lessonsCompleted: {
    type: Number,
    default: 0,
  },
  totalLessons : {
    type : Number,
  },
  is50MilestoneShown : {
    type : Boolean,
    default : false
  },
  is100MilestoneShown : {
    type : Boolean,
    default : false
  }
});

const lesson = new mongoose.Schema({
  lessonName: {
    type: String,
  },
  lessonId: {
    type: String,
  },
  quizMarks: {
    type: Number
  },
  totalQuestions: {
    type: Number
  }
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
});

const users = mongoose.model("Users", userSchema);

module.exports = users;
