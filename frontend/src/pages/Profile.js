
import { useEffect, useState } from "react";
import { ProtectRoutes } from "../manageRoutes/protectRoutes";
import { useAuthStore } from "../store/store";
import { Button } from "@mui/material";
import { unEnrollCourse } from "../actions/userActions";
const Profile = () => {

    const userAuthStateData = useAuthStore.getState().user
    const setUserStoreState = useAuthStore(state => state.setUser )
    useEffect(() => {

    }, [userAuthStateData])
    
    const unenrollCourse = async (courseName) => {
        const response = await unEnrollCourse({ id: userAuthStateData.token, courseName: courseName })
        localStorage.setItem("userData", JSON.stringify( {...userAuthStateData, data: response.userObject } ))
        setUserStoreState( {...userAuthStateData, data: response.userObject } )
        console.log(response);
    }

    return (
        <ProtectRoutes>
            <h1>Profile</h1>
            <h3> Enrolled Courses </h3>
            {
                userAuthStateData?.data?.enrolledCourses?.map((courseData, index) => {
                    return(
                        <ul>
                            <li> { courseData.course }  <Button onClick={() => unenrollCourse(courseData.course)} > Unenroll Course </Button> </li>
                        </ul>
                    )
                })
            }
            <h4> Lessons Completed : { userAuthStateData?.data?.lessonsCompleted?.length } </h4>

        </ProtectRoutes>
    )
}

export default Profile