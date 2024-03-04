const express = require("express")
const { register, login, enrollCourse, completedLesson, unEnrollCourse} = require("./../controllers/userController")

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.patch("/enroll-course", enrollCourse)
router.patch("/unenroll-course", unEnrollCourse)
router.patch("/lesson-completed", completedLesson)

module.exports = router