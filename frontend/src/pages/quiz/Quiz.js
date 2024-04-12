import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Typography,
	Radio,
	RadioGroup,
	FormControlLabel,
	Button,
} from "@mui/material";
import { fetchLessonQuizData } from "../../actions/dataFetchActions";
import { useAuthStore } from "../../store/store";
import { userCompleteLesson } from "../../actions/userActions";
import { getLesson } from "../../actions/lessonAction";
import styles from "./quiz.module.css";

const Quiz = () => {
	const { currentquizLessonName } = useParams();
	const [quizData, setQuizData] = useState([]);
	const userDataAuthState = useAuthStore.getState().user;
	const setStateUser = useAuthStore((state) => state.setUser);
	const [refresh, setRefresh] = useState(false);
	const [lessonData, setLessonData] = useState(null);
	const location = JSON.parse(localStorage.getItem("currentLesson"));
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [allQuestionAttempt, setAllQuestionAttempt] = useState(true);
	const [totalQuestions, setTotalQuestions] = useState(0);
	const [showMarks, setShowMarks] = useState(false);
	const [quizMarks, setQuizMarks] = useState(0);
	var count = 0;

	useEffect(() => {
		const fetchQuizData = async () => {
			const response = await fetchLessonQuizData(currentquizLessonName);
			setQuizData(response.quiz);
			setTotalQuestions(
				response.quiz.lessonQuiz[response.quiz.lessonQuiz.length - 1]
					.questionNumber
			);
		};
		fetchQuizData();
	}, [currentquizLessonName, refresh]);

	useEffect(() => {
		const fetchLesson = async () => {
			const response = await getLesson(location.lesson);
			setLessonData(response.lessonPost);
		};
		fetchLesson();
	}, []);

	const isLessonCompleted = userDataAuthState?.data?.lessonsCompleted?.some(
		(completedLessonData) => {
			if (completedLessonData.lessonName === location.lesson) {
				return true;
			}
		}
	);

	const handleOptionChange = (questionNumber, selectedOption) => {
		const updatedOptions = [...selectedOptions];
		updatedOptions[questionNumber - 1] = selectedOption;
		setSelectedOptions(updatedOptions);
		for (const key in updatedOptions) {
			if (updatedOptions[key]) count++;
		}
		if (count === totalQuestions) {
			setAllQuestionAttempt(false);
		}
	};

	const handleSubmit = () => {
		const marks = checkQuizAnswer();
		lessonComplete(marks);
		setAllQuestionAttempt((prev) => !prev);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};
	const handleReTakeQuiz = () => {
		checkQuizAnswer();
		setAllQuestionAttempt((prev) => !prev);
	};

	const checkQuizAnswer = () => {
		var count = 0;
		for (var number = 0; number < totalQuestions; number++) {
			if (quizData.lessonQuiz[number].answerId === selectedOptions[number]) {
				console.log(
					"answer:",
					quizData.lessonQuiz[number].answerId,
					"slected:",
					selectedOptions[number]
				);
				count++;
				console.log(count);
			}
		}
		setQuizMarks(count);
		setShowMarks(true);
		console.log(quizMarks, count);
		return count;
	};

	const lessonComplete = async (marks) => {
		const response = await userCompleteLesson({
			lessonName: lessonData.lesson,
			id: userDataAuthState.token,
			lessonId: lessonData._id,
			course: location.course,
			quizMarks: marks,
			totalQuestions: totalQuestions,
		});
		console.log(quizMarks, totalQuestions);
		localStorage.setItem(
			"userData",
			JSON.stringify({ ...userDataAuthState, data: response.userObject })
		);
		setStateUser({ ...userDataAuthState, data: response.userObject });
		setRefresh((p) => !p);
	};

	return (
		<div className={styles.container}>
			{showMarks && (
				<h3>
					{" "}
					Your Marks are : {quizMarks}/{totalQuestions} {console.log(quizMarks)}
				</h3>
			)}
			{quizData?.lessonQuiz?.map((quiz, index) => (
				<div className={styles.question} key={index}>
					<Typography variant="h6" gutterBottom>
						{quiz.questionNumber}. {quiz.question}
					</Typography>

					<RadioGroup
						aria-label={`options-${quiz.questionNumber}`}
						name={`options-${quiz.questionNumber}`}
						value={selectedOptions[quiz.questionNumber - 1] || ""}
						onChange={(event) =>
							handleOptionChange(quiz.questionNumber, event.target.value)
						}
					>
						<div className={styles.optionsContainer}>
							{quiz?.options?.map((option, index) => (
								<FormControlLabel
									key={index}
									value={option.id}
									className={`${styles.option}`}
									control={<Radio />}
									label={option.text}
								/>
							))}
						</div>
					</RadioGroup>
				</div>
			))}
			{isLessonCompleted ? (
				<Button
					variant="contained"
					color="primary"
					onClick={handleReTakeQuiz}
					disabled={allQuestionAttempt}
				>
					Retake Quiz
				</Button>
			) : (
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
					disabled={allQuestionAttempt}
				>
					Submit Quiz
				</Button>
			)}
		</div>
	);
};

export default Quiz;
