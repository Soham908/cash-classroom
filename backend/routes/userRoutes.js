const express = require("express")
const { register, login, enrollCourse, completedLesson} = require("./../controllers/userController")

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.patch("/enroll-course", enrollCourse)
router.patch("/lesson-completed", completedLesson)

module.exports = router