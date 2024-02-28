import axios from "axios"
import { ENDPOINT_URL } from "../constants/constants";

export const getLesson = async (lessonName) => {
    console.log(lessonName)
    try{
      const response = await axios.get(`${ENDPOINT_URL}/lesson/get-specific-lesson/${lessonName}`);
      return response.data
    }
    catch(err){
        console.log(err)
    }
  };
  