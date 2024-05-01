import styles from "./blogDetails.module.css";
import { useParams, useNavigate } from "react-router-dom";
import {
	getBlogById,
	deleteBlogById,
	addComment,
} from "./../../../actions/blogActions";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SendIcon from "@mui/icons-material/Send";
import { Snackbar } from "@mui/joy";

const BlogDetails = () => {
	const [blog, setBlog] = useState(null);
	const [snackBarOpen, setSnackBarOpen] = useState(false);
	const [snackBarMessage, setSnackbarMessage] = useState("");
	const [comment, setComment] = useState("");
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

	const submitComment = async () => {
		if (comment === "") {
			setSnackbarMessage("Comment can't be empty!");
			setSnackBarOpen((p) => true);
		} else {
			const response = await addComment({
				_id: blog._id,
				commentObj: {
					comment,
					userId: user?.data?._id,
					userName: user?.data?.name,
				},
			});
			setBlog(response.updatedBlog);
			setSnackbarMessage("Comment Added");
			setSnackBarOpen((p) => true);
			setComment("");
		}
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
			<div className={styles.commentsContainer}>
				<h3>Comments : </h3>
				<div className={styles.commentsInputContainer}>
					{/* <label htmlFor="comment">Write comment : </label> */}
					<input
						id="comment"
						type="text"
						placeholder="Add a comment"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					{/* <button onClick={submitComment} disabled={comment === ""}>
							Submit
						</button> */}
					<SendIcon
						color="success"
						className={styles.sendIcon}
						onClick={submitComment}
					/>
				</div>
				{blog?.comments?.length > 0 && (
					<div className={styles.actualCommentsContainer}>
						{blog?.comments?.map((comment) => (
							<p>
								{" "}
								{comment.userName} : {comment.comment}
							</p>
						))}
					</div>
				)}
			</div>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={snackBarOpen}
				autoHideDuration={1500}
				onClose={() => setSnackBarOpen(false)}
			>
				{snackBarMessage}
			</Snackbar>
		</div>
	);
};

export default BlogDetails;
