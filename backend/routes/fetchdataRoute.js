const express = require("express")
const { fetchCourseCardData } = require("../controllers/dataController")

const router = express.Router()

router.get("/get-course-data", fetchCourseCardData)

module.exports = router
