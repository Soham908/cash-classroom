const Lesson = require('./../models/lesson')

exports.getCourseDetails = async(req,res) => {
    
    try {
        const courseDetail = await Lesson.find({course : req.params.course}, {htmlContent: 0})
        
        if(courseDetail){
            return res.json({
                success : true,
                courseDetail
            })
        }
        res.json({
            success : false,
            message : "course not found"
        })
    }catch(err){
        console.log(err)
        res.json({
            success : false,
            err
        })
    }

}