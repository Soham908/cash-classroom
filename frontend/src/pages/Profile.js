import { useEffect, useState } from "react";
import { ProtectRoutes } from "../manageRoutes/protectRoutes";
import { useAuthStore } from "../store/store";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import LinearProgress from "@mui/joy/LinearProgress";
import { unEnrollCourse } from "../actions/userActions";
import Certificate from "../components/Certificate";
import FinanceGoals from "./finance-goals/FinanceGoals";
import { Image, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const Profile = () => {
	const userAuthStateData = useAuthStore.getState().user;
	const setUserStoreState = useAuthStore((state) => state.setUser);
	const [refresh, setRefresh] = useState(false);
	useEffect(() => {}, [refresh]);

	const unenrollCourse = async (courseName) => {
		const response = await unEnrollCourse({
			id: userAuthStateData.token,
			courseName: courseName,
		});
		console.log(response);
		localStorage.setItem(
			"userData",
			JSON.stringify({ ...userAuthStateData, data: response.userObject })
		);
		setUserStoreState({ ...userAuthStateData, data: response.userObject });
		setRefresh((p) => !p);
	};

	return (
		<ProtectRoutes>
			<div style={{ padding: "50px" }}>
				<h1>Profile</h1>
				<h3> Enrolled Courses </h3>
				<div style={{ display: "flex", gap: "20px" }}>
					{userAuthStateData?.data?.enrolledCourses?.map(
						(courseData, index) => {
							return (
								<ul>
									<li>
										{" "}
										{courseData.course}{" "}
										<Button onClick={() => unenrollCourse(courseData.course)}>
											{" "}
											Unenroll Course{" "}
										</Button>{" "}
									</li>
								</ul>
							);
						}
					)}
				</div>
				<h4>
					{" "}
					Lessons Completed :{" "}
					{userAuthStateData?.data?.lessonsCompleted?.length}{" "}
				</h4>
				<div style={{ display: "flex", gap: "20px" }}>
					{userAuthStateData.data.enrolledCourses?.map((value, index) => {
						const progressPercentage = Number(
							(value.lessonsCompleted / value.totalLessons) * 100
						);
						return (
							<div>
								<Grid item xs={12} sm={6} md={4}>
									<Card sx={{ maxWidth: 345 }}>
										<CardContent>
											<Typography gutterBottom variant="h5" component="div">
												{value.course}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												Lessons Completed : {value.lessonsCompleted}
											</Typography>
											<Typography variant="body2">
												Questions Completed : need to add this
											</Typography>
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
													sx={{
														mixBlendMode: "difference",
														color: progressPercentage >= 50 ? "white" : "black",
														fontWeight: "bold",
													}}
												>
													{progressPercentage >= 100
														? "Done"
														: `${Math.floor(progressPercentage)}%`}
												</Typography>
											</LinearProgress>
											{progressPercentage >= 100 ? (
												<div
													style={{
														display: "flex",
														alignItems: "center",
														gap: "10px",
														textDecoration: "underline",
													}}
												>
													Download your certificate from here
													<PDFDownloadLink
														document={<Certificate courseName={value.course} />}
														fileName={"certificate.pdf"}
													>
														{({ loading }) =>
															loading ? "Generating..." : "Download Certificate"
														}
														<CloudDownloadIcon />
													</PDFDownloadLink>
												</div>
											) : (
												<Button onClick={() => unenrollCourse(value.course)}>
													Unenroll Course
												</Button>
											)}
										</CardContent>
									</Card>
								</Grid>
							</div>
						);
					})}
				</div>
				{/* <FinanceGoals /> */}
			</div>
		</ProtectRoutes>
		// course name, question completed, lessons complete, percentage bar, unenroll button
	);
};

export default Profile;
