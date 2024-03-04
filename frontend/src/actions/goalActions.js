import axios from "axios";
import { ENDPOINT_URL } from "./../constants/constants";

export const createGoal = async (data) => {
	try {
		const response = await axios.post(
			`${ENDPOINT_URL}/goals/create-goal`,
			data
		);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
	}
};

export const fetchGoalsById = async (userId) => {
	try {
		const response = await axios.get(
			`${ENDPOINT_URL}/goals/get-goals-by-user/${userId}`
		);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const updateGoal = async (data) => {
	try {
		const response = await axios.patch(
			`${ENDPOINT_URL}/goals/update-goal`,
			data
		);
		return response.data;
	} catch (error) {
		console.error("Error:", error.message);
	}
};
