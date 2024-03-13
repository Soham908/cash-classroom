import axios from "axios";
import { ENDPOINT_URL } from "./../constants/constants";

export const fetchCardData = async (difficulty) => {
  try {
    let url = `${ENDPOINT_URL}/data/get-course-data`;
    // let filterByDifficultyUrl = `${ENDPOINT_URL}/data/get-course-data?level=${difficulty}`;
    // const response = await axios.get(difficulty ? filterByDifficultyUrl : url);
    const response = await axios.get(url);
    return response.data;
  } catch (err) {}
};

export const fetchLessonQuizData = async (lessonName) => {
  try {
    const response = await axios.get(`${ENDPOINT_URL}/data/get-lesson-quiz/${lessonName}`)
    console.log(lessonName);
    return response.data
  } catch (error) {
    console.log(error);
  }
  
}