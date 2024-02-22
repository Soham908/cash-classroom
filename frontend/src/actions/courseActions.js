import axios from "axios"
import { ENDPOINT_URL } from "../constants/constants";

export const getCourseDetails = async (title) => {
    try{
      const response = await axios.get(`${ENDPOINT_URL}/course/get-course-details/${title}`);
      return response.data
    }
    catch(err){
  
    }
  };