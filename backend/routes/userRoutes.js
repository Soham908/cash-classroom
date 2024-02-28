const express = require("express")
const { register, login, enrollCourse} = require("./../controllers/userController")

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.patch("/enroll-course", enrollCourse)

module.exports = router