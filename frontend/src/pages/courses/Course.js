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
import { useNavigate } from "react-router-dom";
import { ProtectRoutes } from "../../manageRoutes/protectRoutes";
import styles from "./courses.module.css";
import { StyleSharp } from "@mui/icons-material";

const Course = () => {
	const [courseCardData, setCourseCardData] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			const cardData = await fetchCardData();
			setCourseCardData(cardData.courseData);
		};
		fetchData();
	}, []);

	const goToCourseDetail = (title) => {
		navigate(`/courses/${title}`);
	};

	return (
		<ProtectRoutes>
			<div className={styles.container}>
				<h1>All Courses Catalog</h1>
				<div className={styles.searchContainer}>
					<img src="/search.png" alt="search logo" />
					<input type="text" placeholder="Browse Courses" />
				</div>
				<div className={styles.coursesContainer}>
					{courseCardData?.map((card, index) => (
						<Grid
							item
							xs={12}
							sm={6}
							md={4}
							key={index}
							onClick={() => goToCourseDetail(card.title)}
						>
							<Card className={styles.card} sx={{ maxWidth: 345 }}>
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
									<Chip label={card.level} color="primary" variant="outlined" />
								</CardContent>
							</Card>
						</Grid>
					))}
				</div>
			</div>
		</ProtectRoutes>
	);
};

export default Course;
