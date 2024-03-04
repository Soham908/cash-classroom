const express = require("express")
const { getLessonPost, getNextLesson } = require("../controllers/lessonController")

const router = express.Router()

router.get("/get-specific-lesson/:lessonName", getLessonPost)
router.get("/get-next-lesson", getNextLesson)

module.exports = router
