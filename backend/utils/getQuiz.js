const Blog = require("./../models/blog");
const fs = require("fs");
const mongoose = require("mongoose");
const LessonQuiz = require("../models/quiz");
const path = "./../data/quiz_questions.json";

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

let jsonQuizData = JSON.parse(fs.readFileSync(path));
// console.log(jsonQuizData)
console.log(jsonQuizData.length);
const insertBlogs = async () => {
    const quiz = await LessonQuiz.create(jsonQuizData);
    if (quiz) {
      console.log("Inserted");
      process.exit(0)
    } else {
        console.log("Not inserted");
        process.exit(1)
    }
  };

insertBlogs()