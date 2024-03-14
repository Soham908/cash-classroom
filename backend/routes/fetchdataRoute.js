const express = require("express")
const { fetchCourseCardData } = require("../controllers/dataController")
const { getLessonQuiz } = require("../controllers/lesson_quizController")

const router = express.Router()

router.get("/get-course-data", fetchCourseCardData)
router.get("/get-lesson-quiz/:lessonName", getLessonQuiz)

module.exports = router
