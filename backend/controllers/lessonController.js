const Lesson = require("../models/lesson");

exports.getLessonPost = async(req, res) => {
    try {
        const lessonPost = await Lesson.findOne({lesson: req.params.lessonName})
        if(lessonPost){
            res.json({
                sucess: true,
                lessonPost
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false
        })
    }
}

exports.getNextLesson = async (req, res) => {
    try {
        const nextLesson = await Lesson.findOne({ course: req.query.courseName, order: req.query.nextLesson })
        res.json({
            sucess: true,
            nextLesson
        })
        console.log(req.query.courseName, req.query.nextLesson);
    } catch (error) {
        console.log(error);
    }
}