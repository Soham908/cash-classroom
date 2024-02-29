
import { useEffect } from "react";
import { ProtectRoutes } from "../manageRoutes/protectRoutes";
const Profile = () => {

    useEffect(() => {
        // const fetchEnrolledCourses = async () => {
        //     const response = await 
        // }

        // fetchEnrolledCourses
    })

    return (
        <ProtectRoutes>
            <h1>Profile</h1>
            <h3> Enrolled Courses </h3>



        </ProtectRoutes>
    )
}

export default Profile