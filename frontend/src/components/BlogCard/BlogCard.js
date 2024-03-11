import styles from "./blogCard.module.css";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
	
	const navigate = useNavigate()
	const handleReadMore = () => {
		navigate(`/blogs/${blog._id}`)
	}
	return (
		<div className={styles.container}>
			<img className={styles.coverImg} src="/blog.avif" alt="blog title" />
			<h2 className={styles.title}>{blog?.title}</h2>
			<div className={styles.details}>
				<div className={styles.dateContainer}>
					<img
						className={styles.calendar}
						src="/calendar.png"
						alt="calendar logo"
					/>
					<span className={styles.spanValue}>
						{blog?.createdAt?.slice(0, 10)}
					</span>
				</div>

				<div className={styles.minReadContainer}>
					<img className={styles.clock} src="clock.png" alt="clock logo" />
					<span className={styles.spanValue}>{blog?.minRead} mins read</span>
				</div>
			</div>
			<div className={styles.navigateContainer}>
				<span onClick={handleReadMore}>Read More</span>
				<img src="/up-right-arrow.png" alt="navigate logo" />
			</div>
		</div>
	);
};

export default BlogCard;
