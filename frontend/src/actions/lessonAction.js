import axios from "axios";
import { ENDPOINT_URL } from "../constants/constants";

export const getLesson = async (lessonName) => {
  try {
    const response = await axios.get(
      `${ENDPOINT_URL}/lesson/get-specific-lesson/${lessonName}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const addComment = async (data) => {
  try {
    const response = await axios.patch(
      `${ENDPOINT_URL}/lesson/add-comment`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const getNextLesson = async (data) => {
  try {
    const response = await axios.get(
      `${ENDPOINT_URL}/lesson/get-next-lesson?courseName=${data.courseName}&nextLesson=${data.nextLesson}`
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
