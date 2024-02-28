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
