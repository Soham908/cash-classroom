import styles from "./blogCard.module.css";
import { useNavigate } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

const BlogCard = ({ blog }) => {
	
	const navigate = useNavigate()
	const handleReadMore = () => {
		navigate(`/blogs/${blog._id}`)
	}
	return (
		<Card>
		  <CardActionArea onClick={handleReadMore}>
			<CardMedia
			  component="img"
			  height="200"
			  image={`http://localhost:7000/images/${blog?.img}`}
			  alt="blog title"
			/>
			<CardContent>
			  <Typography gutterBottom variant="h5" component="h2">
				{blog?.title}
			  </Typography>
			  <div style={{ display: 'flex', alignItems: 'center' }}>
				<div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
				  <img src="/calendar.png" alt="calendar logo" style={{ marginRight: '5px' }} />
				  <Typography variant="body2" color="textSecondary" component="span">
					{blog?.createdAt?.slice(0, 10)}
				  </Typography>
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
				  <img src="/clock.png" alt="clock logo" style={{ marginRight: '5px' }} />
				  <Typography variant="body2" color="textSecondary" component="span">
					{blog?.minRead} mins read
				  </Typography>
				</div>
			  </div>
			</CardContent>
		  </CardActionArea>
		  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', borderTop: '1px solid #ccc' }}>
			<Typography variant="body2" color="primary" style={{ cursor: 'pointer' }} onClick={handleReadMore}>
			  Read More
			</Typography>
			<NavigateNext color="primary" />
		  </div>
		</Card>
	  );
};

export default BlogCard;
