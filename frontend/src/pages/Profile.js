import { useEffect, useState } from "react";
import { ProtectRoutes } from "../manageRoutes/protectRoutes";
import { useAuthStore } from "../store/store";
import { Button, Typography } from "@mui/material";
import { unEnrollCourse } from "../actions/userActions";
import Certificate from "../components/Certificate";
import FinanceGoals from "./finance-goals/FinanceGoals";
import { Image, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

const Profile = () => {
  const userAuthStateData = useAuthStore.getState().user;
  const setUserStoreState = useAuthStore((state) => state.setUser);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {}, [refresh]);

  const unenrollCourse = async (courseName) => {
    const response = await unEnrollCourse({
      id: userAuthStateData.token,
      courseName: courseName,
    });
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...userAuthStateData, data: response.userObject })
    );
    setUserStoreState({ ...userAuthStateData, data: response.userObject });
    setRefresh((p) => !p);
  };

  return (
    <ProtectRoutes>
      <h1>Profile</h1>
      <h3> Enrolled Courses </h3>
      {userAuthStateData?.data?.enrolledCourses?.map((courseData, index) => {
        return (
          <ul>
            <li>
              {" "}
              {courseData.course}{" "}
              <Button onClick={() => unenrollCourse(courseData.course)}>
                {" "}
                Unenroll Course{" "}
              </Button>{" "}
            </li>
          </ul>
        );
      })}
      <h4>
        {" "}
        Lessons Completed : {
          userAuthStateData?.data?.lessonsCompleted?.length
        }{" "}
      </h4>

      <PDFDownloadLink document={<Certificate />} fileName={"certificate.pdf"}>
        {({ loading }) => (loading ? "Generating..." : "Download Certificate")}
      </PDFDownloadLink>
      <FinanceGoals />
    </ProtectRoutes>
    // course name, question completed, lessons complete, percentage bar, unenroll button
  );
};

export default Profile;
