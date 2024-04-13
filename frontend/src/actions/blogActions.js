import axios from "axios";
import { ENDPOINT_URL } from "./../constants/constants";

export const createBlog = async (data) => {
	try {
		const response = await axios.post(
			`${ENDPOINT_URL}/blogs/create-blog`,
			data
		);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
	}
};

export const updateBlog = async (data) => {
	try {
		const response = await axios.patch(
			`${ENDPOINT_URL}/blogs/update-blog`,
			data
		);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
	}
};

export const getBlogs = async () => {
	try {
		const response = await axios.get(`${ENDPOINT_URL}/blogs/get-all-blogs`);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const getBlogById = async (blogId) => {
	try {
		const response = await axios.get(
			`${ENDPOINT_URL}/blogs/get-blog-by-id/${blogId}`
		);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const deleteBlogById = async (blogId) => {
	try {
		const response = await axios.delete(
			`${ENDPOINT_URL}/blogs/delete-blog/${blogId}`
		);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};
