const LessonQuiz = require("../models/quiz");

exports.getLessonQuiz = async (req, res) => {
    try {
        const quiz = await LessonQuiz.findOne({ lesson: req.params.lessonName })
        if (quiz){
            res.json({
                success: true,
                quiz: quiz
            })
        }
        console.log(quiz);
    } catch (error) {
        console.log(error);
    }
}
