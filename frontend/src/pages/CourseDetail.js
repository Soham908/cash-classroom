import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseDetails } from "../actions/courseActions";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ProtectRoutes } from "../manageRoutes/protectRoutes";

const CourseDetail = () => {
  const params = useParams();
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

  return (
    <ProtectRoutes>
      {(() => {
        const result = [];
        for (
          let i = 0; i < courseDetails[courseDetails.length - 1]?.section; i++) {
          console.log("got in loop");
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
                        <li key={j}>{courseDetails[j].lesson}</li>
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