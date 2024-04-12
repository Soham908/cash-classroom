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
let count = 0;
for (let i = 0; i < jsonQuizData.length; i++) {
	if (jsonQuizData[i].course === "Option Strategies") {
		count += jsonQuizData[i].lessonQuiz.length;
	}
}
console.log(count);
