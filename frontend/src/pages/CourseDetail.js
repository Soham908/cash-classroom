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
import { ProtectRoutes } from "../manageRoutes/protectRoutes";
import { enrollUserToCourse } from "../actions/userActions";

const CourseDetail = () => {
  const user = useAuthStore.getState().user
  const setUserState = useAuthStore(state=>state.setUser)
  const params = useParams();
  const navigate = useNavigate()
  const [courseDetails, setCourseDetails] = useState([]);
  useEffect(() => {
    const fetchCourseData = async () => {
      const response = await getCourseDetails(params.name);
      if (response.success) {
        setCourseDetails(response.courseDetail);
      }
    };
    fetchCourseData();
  }, []);

  const enrollCourse = async () => {
    const response = await enrollUserToCourse({id: user.token, courseName: params.name})
    localStorage.setItem("userData", JSON.stringify( {...user, data: response.response } ))
    setUserState( {...user, data: response.response } )
    console.log(user);
  }

  return (
    <ProtectRoutes>

      <Button variant="contained" onClick={enrollCourse}> Enroll in this course </Button>


      {(() => {
        const result = [];
        for (
          let i = 0; i < courseDetails[courseDetails.length - 1]?.section; i++) {
          result.push(
            <Accordion key={i}>
              <AccordionSummary
                aria-controls="lesson-content"
                id="lesson-header"
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