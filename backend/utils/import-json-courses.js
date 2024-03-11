const Course = require("./../models/courses");
const fs = require("fs");
const mongoose = require("mongoose");
const Lesson = require("../models/lesson");
const path = "./../data/courses_card_data.json";

require("dotenv").config({
  path: "./../.env",
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

let jsonCoursesData = JSON.parse(fs.readFileSync(path));
jsonCoursesData = jsonCoursesData.map((el) => ({
  ...el,
  numChapters: parseInt(el.numChapters.split(" ")[0]),
}));
const insertCourses = async () => {
  const courses = await Course.create(jsonCoursesData);
  if (courses) {
    console.log("Inserted");
    return true;
  } else {
    console.log("Not inserted");
    return false;
  }
};

let jsonLessonData = JSON.parse(
  fs.readFileSync("./../data/all_post_data.json")
);
const insertLessons = async () => {
  const coursesInsertionStatus = insertCourses();
  if (coursesInsertionStatus) {
    const lessons = await Lesson.create(jsonLessonData);
    if (lessons) {
      console.log("Inserted all lesson data");
      process.exit(0);
    } else {
      console.log("Lesson insert not done");
      process.exit(1);
    }
  }
};

insertLessons();
