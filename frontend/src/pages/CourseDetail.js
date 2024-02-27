import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCourseDetails } from "../actions/courseActions"
import { ProtectRoutes } from "../manageRoutes/protectRoutes";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"

const CouseDetail = () => {
    const params = useParams()
    const [courseDetails, setCourseDetails] = useState([])
    useEffect(()=>{
        const fetchCourseData = async() => {
        const response = await getCourseDetails(params.name)
        if(response.success){
            setCourseDetails(response.courseDetail)
            console.log(courseDetails);
        }
    }

    fetchCourseData()
    },[])
    return (
        <>
        {
  courseDetails.map((lessonData, lessonIndex) => {
    const sectionIndex = Math.floor(lessonIndex / 5); // Calculate the section index
    const isNewSection = lessonIndex % 5 === 0; // Check if a new section should start

    return (
      <React.Fragment key={lessonIndex}>
        {isNewSection && (
          <Accordion>
            <AccordionSummary aria-controls={`section-${sectionIndex}-content`} id={`section-${sectionIndex}-header`}>
              <Typography>{`Section ${sectionIndex + 1}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {/* Display the first item in the section */}
                <li>{`${lessonData.course} ${lessonData.lesson}`}</li>
              </ul>
            </AccordionDetails>
          </Accordion>
        )}

        {!isNewSection && (
          <AccordionDetails>
            <ul>
              {/* Display the remaining items in the section */}
              <li>{`${lessonData.course} ${lessonData.lesson}`}</li>
            </ul>
          </AccordionDetails>
        )}
      </React.Fragment>
    );
  })
}

        </>
    )
}

export default CouseDetail