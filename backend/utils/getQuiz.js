const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({
  path: "./../.env",
});
const fs = require("fs");


const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function getMCQ(lessonContent) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const content = `
    param 1: Create 5 multiple-choice question in JSON format
    param 2: also generate two additional MCQ related to the content topic
    param 3: add the additional MCQ questions also inside the main json array
    constraint 1: return a json array of questions
    constraint 2: strucutre should be like this :
    constraint 3: only send the json array as a response dont add anything else than the json array
    constraint 4: dont use the word json in the response and dont use back ticks, send only json value
    {
      "question": "",
      "options": [
        {"id": "A", "text": ""},
        {"id": "B", "text": ""},
        {"id": "C", "text": ""},
        {"id": "D", "text": ""}
      ],
      "answer": "C"
    }
  ` + lessonContent;

  const response = await model.generateContent(content);
  if (response) {
    
    console.log(response.text);
  }
  return response.text;
}


async function run() {
  
  const jsonFile = JSON.parse(fs.readFileSync("./../data/all_post_data.json"))
  var currCourseQuiz = []
  for (let i = 0; i < 15; i++){
    currCourseQuiz = jsonFile[i]
  }
  // console.log(currCourseQuiz.htmlContent);

  const result = getMCQ(currCourseQuiz.htmlContent);
  const response = await result;
  if (response) {
    
    console.log(result);
  }
  const text = response?.text();
  console.log(text);
}


run();