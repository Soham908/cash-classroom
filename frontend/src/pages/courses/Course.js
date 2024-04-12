import { useEffect, useState } from "react";
import { fetchCardData } from "../../actions/dataFetchActions";
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
	Grid,
	Chip,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { ProtectRoutes } from "../../manageRoutes/protectRoutes";
import styles from "./course.module.css";

const Course = () => {
	const [courseCardData, setCourseCardData] = useState([]);

	const [filteredCourseData, setFilteredCourseData] = useState([]);
	const [difficulty, setDifficulty] = useState("All");
	const [searchString, setSearchString] = useState("");
	const [showFilteredCards, setShowFilteredCards] = useState(false);
	const handleChange = async (event) => {
		setSearchString("");
		setDifficulty(event.target.value);
		if (event.target.value === "All") {
			setShowFilteredCards(false);
		} else {
			setShowFilteredCards(true);
			const newFilteredCourses = courseCardData.filter(
				(course) => course.level === event.target.value
			);
			setFilteredCourseData(newFilteredCourses);
		}
	};
	const navigate = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			const cardData = await fetchCardData();
			setCourseCardData(cardData.courseData);
		};
		fetchData();
	}, []);

	const goToCourseDetail = (card) => {
		navigate(`/courses/${card.title}`, { state: card });
	};

	const handleSearch = (value) => {
		setSearchString((p) => value);
		setDifficulty("All");
		if (value) {
			setShowFilteredCards(true);

			const filteredCourses = courseCardData.filter((course) =>
				course.title.includes(value)
			);
			setFilteredCourseData(filteredCourses);
		} else {
			setShowFilteredCards(false);
		}
	};

	let data = showFilteredCards ? filteredCourseData : courseCardData;
	return (
		<ProtectRoutes>
			<div className={styles.container}>
				<div className={styles.leftContainer}>
					<h2>Topics</h2>
					{courseCardData?.map((card, index) => (
						<p onClick={() => navigate(`/courses/${card.title}`)}>
							{card.title}
						</p>
					))}
				</div>
				<div className={styles.rightContainer}>
					<h1>All Courses Catalog</h1>
					<div className={styles.filterContainer}>
						<div className={styles.searchCoursesContainer}>
							<img src="/search.png" alt="search logo" />
							<input
								type="text"
								placeholder="Browse Courses"
								value={searchString}
								onChange={(e) => handleSearch(e.target.value)}
							/>
						</div>
						<div className={styles.statusContainer}>
							<Select
								id="demo-simple-select"
								value={difficulty}
								// label="Age"
								onChange={handleChange}
							>
								<MenuItem value="All">All</MenuItem>
								<MenuItem value="Beginner">Beginner</MenuItem>
								<MenuItem value="Intermediate">Intermediate</MenuItem>
								<MenuItem value="Advanced">Advanced</MenuItem>
							</Select>
						</div>
					</div>
					<div className={styles.coursesContainer}>
						{data?.map((card, index) => (
							<Grid
								item
								xs={12}
								sm={6}
								md={4}
								key={index}
								onClick={() => goToCourseDetail(card)}
							>
								<Card sx={{ maxWidth: 345 }} className={styles.card}>
									<CardMedia
										sx={{ height: 140 }}
										image={"http://localhost:7000/images/" + card.img}
										title={card.title}
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="div">
											{card.title}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											{card.desc}
										</Typography>
										<Typography>Chapters : {card.numChapters}</Typography>
										<Chip
											label={card.level}
											color="primary"
											variant="outlined"
										/>
									</CardContent>
								</Card>
							</Grid>
						))}
					</div>
				</div>
			</div>
		</ProtectRoutes>
	);
};

export default Course;
