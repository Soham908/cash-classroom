import axios from "axios";
import { ENDPOINT_URL } from "./../constants/constants";

export const fetchCardData = async () => {
    try{
      const response = await axios.get(`${ENDPOINT_URL}/data/get-course-data`);
      return response.data
    }
    catch(err){
  
    }
  };