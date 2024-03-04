const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentsSchema = new Schema({
  userId :{
    type : mongoose.Schema.Types.ObjectId,
    required : true
  },
  comment : {
    type : String,
    required : true,
    trim : true
  }
})
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
  comments : {
    type : [commentsSchema],
    default : []
  }
});

const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;
