import axios from 'axios'
import {ENDPOINT_URL} from "./../constants/constants"

export const register = async (data) => {
    try {
      const response = await axios.post(`${ENDPOINT_URL}/auth/register`, data);
    //   console.log('Response:', response.data);
      return response.data
    } catch (error) {
      console.error('Error:', error);
    }
};

export const login = async (data) => {
    try {
      const response = await axios.post(`${ENDPOINT_URL}/login`, data);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
};
  