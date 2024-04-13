import { useEffect, useState } from "react";
import { getBlogs } from "../../actions/blogActions";
import BlogCard from "../../components/BlogCard/BlogCard";
import styles from "./blog.module.css";
import { useNavigate } from "react-router-dom";
const Blogs = () => {
	const [blogs, setBlogs] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchBlogs = async () => {
			const response = await getBlogs();
			if (response.success) {
				setBlogs(response.blogs);
			}
		};
		fetchBlogs();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.createBlog}>
				<button onClick={() => navigate("/create-blog")}>
					CREATE YOUR BLOG
				</button>
			</div>
			<div className={styles.blogsContainer}>
				{blogs.map((blog) => (
					<BlogCard blog={blog} />
				))}
			</div>
		</div>
	);
};

export default Blogs;
