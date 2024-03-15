import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseDetails } from "../../actions/courseActions";
import { useAuthStore } from "../../store/store";
import styles from "./courseDetail.module.css";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { ProtectRoutes } from "../../manageRoutes/protectRoutes";
import { enrollUserToCourse } from "../../actions/userActions";
import LinearProgress from "@mui/joy/LinearProgress";

const CourseDetail = () => {
	const user = useAuthStore.getState().user;
	const setUserState = useAuthStore((state) => state.setUser);
	const params = useParams();
	const navigate = useNavigate();
	const state = useLocation().state;

	const [courseDetails, setCourseDetails] = useState([]);
	const [enrollButtonState, setEnrollButtonState] = useState(false);

	useEffect(() => {
		const fetchCourseData = async () => {
			const response = await getCourseDetails(params.name);
			if (response.success) {
				setCourseDetails(response.courseDetail);
			}
			// console.log(response.courseDetail)
			const isCoursePresent = user?.data?.enrolledCourses.some((courseData) =>
				courseData.course.includes(response.courseDetail[0]?.course)
			);
			if (isCoursePresent) {
				setEnrollButtonState(true);
			}
		};
		fetchCourseData();
	}, []);

	let progress = 0;
	user?.data?.lessonsCompleted?.map((lesson) => {
		const isCompleted = courseDetails.some(
			(courseData) => courseData.lesson === lesson.lessonName
		);
		if (isCompleted) {
			progress += 1;
		}
	});

	const progressPercentage = Number((progress * 100) / courseDetails.length);

	const enrollCourse = async () => {
		const response = await enrollUserToCourse({
			id: user.token,
			courseName: params.name,
			totalLessons: courseDetails.length,
		});
		localStorage.setItem(
			"userData",
			JSON.stringify({ ...user, data: response.userObject })
		);
		setUserState({ ...user, data: response.userObject });
		setEnrollButtonState(true);
	};

	const handleLessonClick = (state) => {
		// console.log(user.data);
		const isEnrolled = user?.data?.enrolledCourses.some(
			(courseData) => courseData.course === state.course
		);
		if (!isEnrolled) {
			alert("Enroll the course before accessing lesson");
		} else {
			localStorage.setItem("currentLesson", JSON.stringify(state));
			navigate("/lesson");
		}
	};

	return (
		<ProtectRoutes>
			<div className={styles.container}>
				<div className={styles.courseDetails}>
					<h1>{state?.title}</h1>
					<p>{state?.desc}</p>
					{ enrollButtonState ? "" :<Button
						className={styles.enrollBtn}
						variant="contained"
						onClick={enrollCourse}
						disabled={enrollButtonState}
					>
						{enrollButtonState ? "Enrolled" : "Enroll"}
					</Button>}
				</div>
				<div style={{display:"flex",gap : "5px",width:"38%"}}>
				<LinearProgress
					determinate
					variant="outlined"
					color="neutral"
					size="sm"
					thickness={24}
					value={progressPercentage}
					sx={{
						"--LinearProgress-radius": "20px",
						"--LinearProgress-thickness": "24px",
					}}
				>
					<Typography
						level="body-xs"
						fontWeight="xl"
						textcolor="common.white"
						sx={{ mixBlendMode: "difference",color: progressPercentage>=50 ? "white" : "black",fontWeight:"bold" }}
					>
						{progressPercentage >= 100
							? "Done"
							: `${Math.floor(progressPercentage)}%`}
					</Typography>
				</LinearProgress>
				<img src="/flag.jpg" alt="flag logo" style={{height:"25px"}} />
				</div>
				<div className={styles.lessonsContainer}>
					{(() => {
						const result = [];
						for (
							let i = 0;
							i < courseDetails[courseDetails.length - 1]?.section;
							i++
						) {
							const sectionDetails = courseDetails.find(
								(detail) => detail.section === i + 1
							);

							if (sectionDetails) {
								result.push(
									<Accordion key={i} sx={{width:"70%"}} defaultExpanded={i == 0 ? true : false } >
										<AccordionSummary
											aria-controls="lesson-content"
											id="lesson-header"
											expandIcon={<ExpandMore />}
											sx={{backgroundColor:"#FAFAFA"}}
										>

											<div className={styles.accordionSummary}>
												<div className={styles.sectionNumberContainer}>
													<div className={styles.sectionNumberParentCircle}>
														<div className={styles.sectionNumberCircle}>
															<div className={styles.sectionNumber}>
																{i+1}
															</div>
														</div>
													</div>
												</div>
												<div className={styles.sectionDetails}>
													<Typography variant="h5">
														{sectionDetails.sectionName}
													</Typography>
													<Typography variant="p">
														{sectionDetails.sectionDescription}
													</Typography>
												</div>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetails} sx={{padding:"20px 50px",marginBottom:"10px"}}>
											{(() => {
												const lessonResult = [<p style={{fontSize:"20px",fontWeight:"bold", marginBottom:"0"}}>Lessons :</p>];
												for (let j = 0; j < courseDetails.length; j++) {
													if (courseDetails[j].section === i + 1) {
														lessonResult.push(
															<li key={j} style={{color:"#3564b5"}}>
																<span
																	className={styles.lessonName}
																	onClick={() =>
																		handleLessonClick({
																			lesson: courseDetails[j].lesson,
																			course: sectionDetails.course,
																			numChapters: courseDetails.length,
																		})
																	}
																>
																	{courseDetails[j].lesson}
																</span>
															</li>
														);
													}
												}
												return lessonResult;
											})()}
										</AccordionDetails>
									</Accordion>
								);
							}
						}
						return result;
					})()}
				</div>
			</div>
		</ProtectRoutes>
	);
};
export default CourseDetail;
