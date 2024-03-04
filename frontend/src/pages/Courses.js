import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const courses = [
  { title: 'Web Development 101', desc: 'Learn the fundamentals of web development', numChapters: 10 },
  { title: 'React Crash Course', desc: 'Build interactive web applications with React', numChapters: 5 },
  { title: 'Advanced JavaScript', desc: 'Master your JavaScript skills', numChapters: 8 },
  // ... more courses
];

const CourseCard = ({ course }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.desc}
        </Typography>
        <Typography variant="body2">Chapters: {course.numChapters}</Typography>
      </CardContent>
    </Card>
  );
};

const Courses = () => {
  return (
    <Grid container spacing={2}>
      {courses.map((course) => (
        <Grid item xs={12} md={4} key={course.title}>
          <CourseCard course={course} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Courses;
