const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  questionNumber: {
    type: Number,
    required: true
  },
  options: [{
    id: {
      type: String,
      required: true
    },
    text: {
      type: String,

    }
  }],
  answerId: {
    type: String,
    required: true
  },
  answerText: {
    type: String,
  }
});

const LessonQuizSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true
    },
    lesson: {
        type: String,
        required: true
    },
    order: {
        type: String,
        required: true
    },
    section: {
        type: Number,
        required: true
    },
    lessonQuiz: [QuizSchema]
}
) 

const LessonQuiz = mongoose.model('LessonQuiz', LessonQuizSchema);

module.exports = LessonQuiz;
