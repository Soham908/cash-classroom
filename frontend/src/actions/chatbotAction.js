import axios from "axios";
import { ENDPOINT_URL } from "../constants/constants";

export const getResponse = async (data) => {
	try {
		const response = await axios.post(
			`${ENDPOINT_URL}/chat/get-response`,
			data
		);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
	}
};
