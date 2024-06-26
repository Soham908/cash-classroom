import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	getLesson,
	getNextLesson,
	addComment,
} from "../../actions/lessonAction";
import { Button } from "@mui/material";
import { userCompleteLesson, updateMilestone } from "../../actions/userActions";
import { useAuthStore } from "../../store/store";
import styles from "./lesson.module.css";
import SendIcon from "@mui/icons-material/Send";
import { Snackbar } from "@mui/joy";

const LessonPage = () => {
	const user = useAuthStore.getState().user;
	const navigate = useNavigate();
	const location = JSON.parse(localStorage.getItem("currentLesson"));
	const [snackBarOpen, setSnackBarOpen] = useState(false);
	const [snackBarMessage, setSnackbarMessage] = useState("");
	const [lessonData, setLessonData] = useState(null);
	const [comment, setComment] = useState("");
	const setStateUser = useAuthStore((state) => state.setUser);
	const [refresh, setRefresh] = useState(false);
	const numChapters = location.numChapters;
	const [disableNextLessonButton, setDisableNextLessonButton] = useState(false);
	const [disablePreviousLessonButton, setDisablePreviousLessonButton] =
		useState(false);

	let percentage = 0;

	const handleUpdateMilestone = async (milestone) => {
		const response = await updateMilestone({
			id: user.token,
			course: location.course,
			milestone,
		});
		localStorage.setItem(
			"userData",
			JSON.stringify({ ...user, data: response.userObject })
		);
		setStateUser({ ...user, data: response.userObject });
		setRefresh((p) => !p);
	};

	for (let i = 0; i < user?.data?.enrolledCourses.length; i++) {
		const courseData = user?.data?.enrolledCourses[i];

		if (courseData.course === location.course) {
			percentage = (
				(courseData.lessonsCompleted * 100) /
				courseData.totalLessons
			).toFixed(2);
			if (percentage >= 50 && !courseData.is50MilestoneShown) {
				console.log("50% completed");
				handleUpdateMilestone(50);
			}
			if (percentage >= 100 && !courseData.is100MilestoneShown) {
				console.log("100% completed");

				handleUpdateMilestone(100);
			}
		}
	}

	const isQuizCompleted = user?.data?.quizCompleted?.some(
		(completedQuizData) => {
			if (completedQuizData.lessonName === location.lesson) {
				return true;
			}
		}
	);

	useEffect(() => {
		const fetchLesson = async () => {
			const response = await getLesson(location.lesson);
			setLessonData(response.lessonPost);
		};
		fetchLesson();
	}, []);

	useEffect(() => {
		if (lessonData?.order === 1) setDisablePreviousLessonButton(true);
		if (lessonData?.order === numChapters) setDisableNextLessonButton(true);
	}, [lessonData, refresh]);

	const takeQuiz = () => {
		navigate(`/lesson-quiz/${lessonData.lesson}`);
	};

	const submitComment = async () => {
		if (comment === "") {
			setSnackbarMessage("Comment can't be empty!");
			setSnackBarOpen((p) => true);
		} else {
			const response = await addComment({
				_id: lessonData._id,
				commentObj: {
					comment,
					userId: user?.data?._id,
					userName: user?.data?.name,
				},
			});
			setLessonData(response.updatedLesson);
			setSnackbarMessage("Comment Added");
			setSnackBarOpen((p) => true);
			setComment("");
		}
	};
	const toNextLesson = async () => {
		if (lessonData.order >= 1) setDisablePreviousLessonButton(false);
		const response = await getNextLesson({
			courseName: lessonData.course,
			nextLesson: lessonData.order + 1,
		});
		setLessonData(response.nextLesson);

		const state = {
			lesson: response.nextLesson.lesson,
			course: response.nextLesson.course,
			numChapters: location.numChapters,
			order: response.nextLesson.order,
		};
		localStorage.setItem("currentLesson", JSON.stringify(state));
	};
	const toPreviousLesson = async () => {
		if (lessonData.order <= numChapters) setDisableNextLessonButton(false);
		const response = await getNextLesson({
			courseName: lessonData.course,
			nextLesson: lessonData.order - 1,
		});
		setLessonData(response.nextLesson);
		const state = {
			lesson: response.nextLesson.lesson,
			course: response.nextLesson.course,
			numChapters: location.numChapters,
		};
		localStorage.setItem("currentLesson", JSON.stringify(state));
		// console.log(response);
	};

	return (
		<div className={styles.container}>
			<div className={styles.btnContainer}>
				{disablePreviousLessonButton ? (
					""
				) : (
					<Button
						variant="outlined"
						className={styles.previousBtn}
						onClick={toPreviousLesson}
						disabled={disablePreviousLessonButton}
					>
						{" "}
						Previous{" "}
					</Button>
				)}
				{disableNextLessonButton ? (
					""
				) : (
					<Button
						variant="outlined"
						className={styles.nextBtn}
						onClick={toNextLesson}
						disabled={disableNextLessonButton}
					>
						{" "}
						Next{" "}
					</Button>
				)}
			</div>
			<hr />
			<div dangerouslySetInnerHTML={{ __html: lessonData?.htmlContent }} />

			<div className={styles.commentsContainer}>
				<button
					className={styles.quizBtn}
					onClick={takeQuiz}
					disabled={isQuizCompleted}
				>
					{" "}
					Take Quiz{" "}
				</button>
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
				{lessonData?.comments?.length > 0 && (
					<div className={styles.actualCommentsContainer}>
						{lessonData?.comments?.map((comment) => (
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

export default LessonPage;
