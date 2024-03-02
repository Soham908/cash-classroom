import { useParams,useNavigate,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseDetails } from "../actions/courseActions";
import { useAuthStore } from "../store/store"; 
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material"
import { ProtectRoutes } from "../manageRoutes/protectRoutes";
import { enrollUserToCourse } from "../actions/userActions";

const CourseDetail = () => {
  const user = useAuthStore.getState().user
  const setUserState = useAuthStore(state=>state.setUser)
  const params = useParams();
  const navigate = useNavigate()
  const [courseDetails, setCourseDetails] = useState([]);
  const [enrollButtonState, setEnrollButtonState] = useState(false)

  useEffect(() => {
    const fetchCourseData = async () => {
      const response = await getCourseDetails(params.name);
      if (response.success) {
        setCourseDetails(response.courseDetail);
      }
      const isCoursePresent = user.data.enrolledCourses.some((courseData) =>
          courseData.course.includes(response.courseDetail[0]?.course)
        );
      if (isCoursePresent) {
        setEnrollButtonState(true);
      }
    };
    fetchCourseData();
  }, []);

  const enrollCourse = async () => {
    const response = await enrollUserToCourse({id: user.token, courseName: params.name})
    localStorage.setItem("userData", JSON.stringify( {...user, data: response.response } ))
    setUserState( {...user, data: response.response } )
    setEnrollButtonState(true)
    console.log(user);
  }

  return (
    <ProtectRoutes>

      <Button variant="contained" onClick={enrollCourse} disabled={enrollButtonState}> 
        { enrollButtonState ? "Enrolled" : "Enroll to course" }
      </Button>


      {(() => {
        const result = [];
        for (
          let i = 0; i < courseDetails[courseDetails.length - 1]?.section; i++) {
          result.push(
            <Accordion key={i}>
              <AccordionSummary
                aria-controls="lesson-content"
                id="lesson-header"
                expandIcon={<ExpandMore />}
              >
                <Typography variant="h6">{courseDetails[0].course}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {(() => {
                  const lessonResult = [];
                  for (let j = 0; j < courseDetails.length; j++) {
                    if (courseDetails[j].section === i + 1) {
                      lessonResult.push(
                        <li>
                          <Link key={j} to="/lesson" state={{lesson:courseDetails[j].lesson,course:courseDetails[0].course}}>{courseDetails[j].lesson}</Link>
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
        return result;
      })()}
    </ProtectRoutes>
  );
};
export default CourseDetail