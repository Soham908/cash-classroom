const Course = require("../models/courses");


exports.fetchCourseCardData = async(req, res) => {
    try {
        const courseData = await Course.find().sort({ order : 1 })
        return res.json({
            courseData: courseData
        })
    } catch (error) {
        console.log(error);
    }
}
