import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseDetails } from "../../actions/courseActions";
import { useAuthStore } from "../../store/store";
import styles from "./courseDetails.module.css";
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
  console.log(state);
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
          <Button
            className={styles.enrollBtn}
            variant="contained"
            onClick={enrollCourse}
            disabled={enrollButtonState}
          >
            {enrollButtonState ? "Enrolled" : "Enroll"}
          </Button>
        </div>

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
            textColor="common.white"
            sx={{ mixBlendMode: "difference" }}
          >
            {progressPercentage >= 100
              ? "Done"
              : `LOADING… ${Math.floor(progressPercentage)}%`}
          </Typography>
        </LinearProgress>

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
                  <Accordion key={i}>
                    <AccordionSummary
                      aria-controls="lesson-content"
                      id="lesson-header"
                      expandIcon={<ExpandMore />}
                    >
                      <div>
                        <Typography variant="h5">
                          {sectionDetails.sectionName}
                        </Typography>
                        <Typography variant="p">
                          {sectionDetails.sectionDescription}
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {(() => {
                        const lessonResult = [];
                        for (let j = 0; j < courseDetails.length; j++) {
                          if (courseDetails[j].section === i + 1) {
                            lessonResult.push(
                              <li key={j}>
                                <span
                                  style={{
                                    textDecoration: "underline",
                                    color: "blue",
                                  }}
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
