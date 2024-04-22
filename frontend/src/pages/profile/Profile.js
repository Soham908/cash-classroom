import { useEffect, useState } from "react";
import { ProtectRoutes } from "../../manageRoutes/protectRoutes";
import { useAuthStore } from "../../store/store";
import { userProfileUpdate } from "./../../actions/userActions";
import { Snackbar } from "@mui/joy";
import {
  Button,
  Card,
  CardContent,
  Collapse,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import LinearProgress from "@mui/joy/LinearProgress";
import { unEnrollCourse } from "../../actions/userActions";
import Certificate from "../../components/Certificate";
import FinanceGoals from "../finance-goals/FinanceGoals";
import { Image, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import styles from "./profile.module.css";
import EditIcon from "@mui/icons-material/Edit";

const Profile = () => {
  const userAuthStateData = useAuthStore.getState().user;
  console.log(userAuthStateData);
  const [userName, setUserName] = useState(userAuthStateData?.data?.name);
  const setUserStoreState = useAuthStore((state) => state.setUser);
  const [refresh, setRefresh] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {}, [refresh]);

  const unenrollCourse = async (courseName) => {
    const response = await unEnrollCourse({
      id: userAuthStateData.token,
      courseName: courseName,
    });
    console.log(response);
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...userAuthStateData, data: response.userObject })
    );
    setUserStoreState({ ...userAuthStateData, data: response.userObject });
    setRefresh((p) => !p);
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("name", userName);
    formData.append("id", userAuthStateData?.data?._id);
    const response = await userProfileUpdate(formData);
    if (response.success) {
      localStorage.setItem(
        "userData",
        JSON.stringify({ ...userAuthStateData, data: response.userObject })
      );
      setUserStoreState({ ...userAuthStateData, data: response.userObject });
    }
    setShowEditUserForm((p) => false);
  };
  return (
    <ProtectRoutes>
      <div style={{ padding: "50px" }}>
        {/* <h1>Profile</h1> */}
        <div className={styles.userDetails}>
          {!showEditUserForm && (
            <EditIcon
              className={styles.edit}
              onClick={() => setShowEditUserForm((p) => true)}
            />
          )}
          <img
            className={styles.userAvatar}
            src={
              userAuthStateData?.data?.userImage
                ? `http://localhost:7000/${userAuthStateData?.data?.userImage}`
                : "user.png"
            }
            alt="user-profile-photo"
          />

          <h3>{userAuthStateData?.data?.name}</h3>
        </div>
        <Collapse in={showEditUserForm}>
          <div className={styles.editForm}>
            <TextField
              label="User Name"
              type="text"
              value={userName}
              placeholder="Enter user name"
              onChange={(e) => setUserName(e.target.value)}
            />

            <input
              type="file"
              className={styles.fileInput}
              onChange={handleImageChange}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        </Collapse>
        <hr />

        <div className={styles.coursesContainer}>
          {userAuthStateData?.data?.enrolledCourses?.map((value, index) => {
            const progressPercentage = Number(
              (value.lessonsCompleted / value.totalLessons) * 100
            );
            var totalQuestions = 0;
            var totalMarksGot = 0;
            userAuthStateData?.data?.lessonsCompleted.forEach((lesson) => {
              if (lesson.courseName === value.course) {
                totalQuestions += lesson.totalQuestions;
                totalMarksGot += lesson.quizMarks;
              }
            });
            // console.log(totalQuestions, totalMarksGot);
            return (
              <div>
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ width: 245, height: 250 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" sx = {{ marginBottom: 2 }}>
                        {value.course}
                      </Typography>
                      <Typography variant="body2" sx = {{ marginBottom: 1 }}>
                        Lessons Completed : {value.lessonsCompleted}
                      </Typography>
					  <Typography variant="body2" sx = {{ marginBottom: 1 }}>
                        Total Marks Obtained : {totalMarksGot}
                      </Typography>
                      <Typography variant="body2" sx = {{ marginBottom: 1 }}>
                        Total Questions Attempted : {totalQuestions}
                      </Typography>
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
                          textcolor="common.white"
                          sx={{
                            mixBlendMode: "difference",
                            color: progressPercentage >= 50 ? "black" : "white",
                            fontWeight: "bold",
                          }}
                        >
                          {progressPercentage >= 100
                            ? "Done"
                            : `${Math.floor(progressPercentage)}%`}
                        </Typography>
                      </LinearProgress>
                      {progressPercentage >= 100 ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            textDecoration: "underline",
                          }}
                        >
                          Download your certificate from here
                          <PDFDownloadLink
                            document={<Certificate courseName={value.course} />}
                            fileName={"certificate.pdf"}
                          >
                            {({ loading }) =>
                              loading ? "Generating..." : "Download Certificate"
                            }
                            <CloudDownloadIcon />
                          </PDFDownloadLink>
                        </div>
                      ) : (
                        <Button onClick={() => unenrollCourse(value.course)}>
                          Unenroll Course
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </div>
            );
          })}
        </div>
      </div>
    </ProtectRoutes>
    // course name, question completed, lessons complete, percentage bar, unenroll button
  );
};

export default Profile;
