
import { useEffect } from "react";
import { ProtectRoutes } from "../manageRoutes/protectRoutes";
import { useAuthStore } from "../store/store";
const Profile = () => {

    const userData = useAuthStore.getState().user
    useEffect(() => {

    })

    return (
        <ProtectRoutes>
            <h1>Profile</h1>
            <h3> Enrolled Courses </h3>
            {
                userData.data.enrolledCourses.map((courseData, index) => {
                    return(
                        <ul>
                            <li> { courseData.course } </li>
                        </ul>
                    )
                })
            }

        </ProtectRoutes>
    )
}

export default Profile