const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
  course: {
    type: String,
  },
  lesson: {
    type: String,
    unique: true,
  },
  htmlContent: {
    type: String,
  },
  order: {
    type: Number,
  },
  section: {
    type: Number,
  },
});

const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;
