const Course = require("./../models/courses")
const fs = require("fs")
const mongoose = require("mongoose")
const path = "./../data/courses_card_data.json"

require("dotenv").config({
    path : "./../.env"
})

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected")
}).catch(err => {
    console.log(err)
})

let jsonCoursesData = JSON.parse(fs.readFileSync(path))
jsonCoursesData = jsonCoursesData.map((el)=> ({...el,numChapters:parseInt(el.numChapters.split(" ")[0])}))
const insertCourses = async()=>{
    const courses = await Course.create(jsonCoursesData)
    if (courses){
        console.log("Inserted")
        process.exit(0)
    }
    else {
        console.log("Not inserted")
        process.exit(1)
    }
}

insertCourses()