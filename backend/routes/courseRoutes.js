const express = require("express")
const { getCourseDetails } = require('./../controllers/courseController')

const router = express.Router()

router.get('/get-course-details/:course',getCourseDetails)

module.exports = router