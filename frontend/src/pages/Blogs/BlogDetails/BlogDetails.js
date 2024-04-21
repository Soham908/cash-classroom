import styles from "./blogDetails.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, deleteBlogById } from "./../../../actions/blogActions";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const BlogDetails = () => {
	const [blog, setBlog] = useState(null);
	const blogId = useParams().blogId;
	const navigate = useNavigate();
	const user = useAuthStore.getState().user;
	useEffect(() => {
		const fetchBlog = async () => {
			const response = await getBlogById(blogId);
			setBlog(response.blog);
		};
		fetchBlog();
	}, []);

	const handleDelete = async () => {
		const response = await deleteBlogById(blogId);
		if (response.success) {
			navigate("/blogs");
		}
	};

	const handleEdit = () => {
		navigate("/create-blog", { state: { blog } });
	};
	return (
		<div className={styles.container}>
			{user?.data?._id === blog?.userId && (
				<div className={styles.blogActions}>
					<EditIcon onClick={handleEdit} />
					<DeleteForeverIcon onClick={handleDelete} />
				</div>
			)}

			<hr />
			<div
				className={`${styles.blogContainer} ql-editor`}
				dangerouslySetInnerHTML={{ __html: blog?.blogHtml }}
			></div>
			<p className={styles.author}>
				<span>---</span> {blog?.userName}
			</p>
			<hr />
		</div>
	);
};

export default BlogDetails;
