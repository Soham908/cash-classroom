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
