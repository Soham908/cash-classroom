import { useEffect, useState } from "react";
import { fetchCardData } from "../actions/dataFetchActions";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Grid, Chip } from '@mui/material';
import { json, useNavigate } from "react-router-dom"
const Course = () => {

  const [courseCardData, setCourseCardData] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const cardData = await fetchCardData();
      setCourseCardData(cardData.courseData)
    };
    fetchData();
  }, []);

  const goToCourseDetail = (title) => {
    navigate(`/courses/${title}`)
  }

  return (
    <>
      <Grid container spacing={2} justifyContent="center" maxWidth="lg">

      {courseCardData?.map((card, index) => (
      
        <Grid item xs={12} sm={6} md={4} key={index} onClick={()=>goToCourseDetail(card.title)}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 140 }} image={"http://localhost:7000/images/"+card.img} title={card.title} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.desc}
              </Typography>
              <Typography>
                Chapters : {card.numChapters}
              </Typography>
              <Chip label={card.level} color="primary" variant="outlined" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default Course;
