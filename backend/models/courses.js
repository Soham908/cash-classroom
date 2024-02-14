const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  level: {
    type: String,
    default: null,
  },
});

const Course = mongoose.model("Courses", courseSchema);

module.exports = Course;
