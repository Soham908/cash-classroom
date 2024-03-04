const express = require("express")
const { getLessonPost, getNextLesson,appendComment } = require("../controllers/lessonController")

const router = express.Router()

router.get("/get-specific-lesson/:lessonName", getLessonPost)
router.get("/get-next-lesson", getNextLesson)
router.patch("/add-comment",appendComment)
module.exports = router
