const mongoose = require("mongoose")
const Schema = mongoose.Schema

const lessonSectionSchema = new Schema({
    course : {
        type : String,
    },
    lessons : [
        {
            lessonName: {
                type: String
            },
            lessonDescription: {
                type: String
            }
        }
    ]
})

const LessonSection = mongoose.model("LessonSection", lessonSectionSchema)
module.exports = LessonSection
