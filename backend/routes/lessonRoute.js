const express = require("express")
const { getLessonPost } = require("../controllers/lessonController")

const router = express.Router()

router.get("/get-specific-lesson/:lessonName", getLessonPost)

module.exports = router
