import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLesson, getNextLesson, addComment } from "../actions/lessonAction";
import { Button } from "@mui/material";
import { userCompleteLesson } from "../actions/userActions";
import { useAuthStore } from "../store/store";
import Milestone from "../components/MIlestone";

const LessonPage = () => {
  const user = useAuthStore.getState().user;
  const navigate = useNavigate();
  //   const location = useLocation().state;
  const location = JSON.parse(localStorage.getItem("currentLesson"));
  const [lessonData, setLessonData] = useState(null);
  const [comment, setComment] = useState("");
  const setStateUser = useAuthStore((state) => state.setUser);
  const [refresh, setRefresh] = useState(false);
  const numChapters = location.numChapters;
  const [disableNextLessonButton, setDisableNextLessonButton] = useState(false);
  const [disablePreviousLessonButton, setDisablePreviousLessonButton] =
    useState(false);


  let isCourseDone = false;
  for (let i = 0; i < user?.data?.enrolledCourses.length; i++) {
    const courseData = user?.data?.enrolledCourses[i];
    if (
      courseData.course === location.course &&
      courseData.lessonsCompleted === courseData.totalLessons
    ) {
      isCourseDone = true;
    }
  }
  if (isCourseDone) {
    console.log("jsdhfb");
  }
  const isLessonCompleted = user?.data?.lessonsCompleted?.some(
    (completedLessonData) => {
      if (completedLessonData.lessonName === location.lesson) {
        return true;
      }
    }
  );

  useEffect(() => {
    const fetchLesson = async () => {
      const response = await getLesson(location.lesson);
      setLessonData(response.lessonPost);
    };
    fetchLesson();
  }, []);

  useEffect(() => {
    if (lessonData?.order === 1) setDisablePreviousLessonButton(true);
    if (lessonData?.order === numChapters) setDisableNextLessonButton(true);
  }, [lessonData, refresh]);

  const lessonComplete = async () => {
    const response = await userCompleteLesson({
      lessonName: lessonData.lesson,
      id: user.token,
      lessonId: lessonData._id,
      course: location.course,
    });
 
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...user, data: response.userObject })
    );
    setStateUser({ ...user, data: response.userObject });
    setRefresh((p) => !p);
  };

  const submitComment = async () => {
    const response = await addComment({
      _id: lessonData._id,
      commentObj: {
        comment,
        userId: user?.data?._id,
        userName: user?.data?.name,
      },
    });
    setLessonData(response.updatedLesson);
  };
  const toNextLesson = async () => {
    if (lessonData.order >= 1) setDisablePreviousLessonButton(false);
    const response = await getNextLesson({
      courseName: lessonData.course,
      nextLesson: lessonData.order + 1,
    });
    setLessonData(response.nextLesson);

    const state = {
      lesson: response.nextLesson.lesson,
      course: response.nextLesson.course,
      numChapters: location.numChapters,
    };
    localStorage.setItem("currentLesson", JSON.stringify(state));
    // console.log(response);
  };
  const toPreviousLesson = async () => {
    if (lessonData.order <= numChapters) setDisableNextLessonButton(false);
    const response = await getNextLesson({
      courseName: lessonData.course,
      nextLesson: lessonData.order - 1,
    });
    setLessonData(response.nextLesson);
    const state = {
      lesson: response.nextLesson.lesson,
      course: response.nextLesson.course,
      numChapters: location.numChapters,
    };
    localStorage.setItem("currentLesson", JSON.stringify(state));
    // console.log(response);
  };
  return (
    <>
      {isCourseDone && <Milestone message="Mesage done"/>}
      <Button
        variant="contained"
        onClick={lessonComplete}
        disabled={isLessonCompleted}
      >
        {" "}
        Lesson Completed{" "}
      </Button>
      <Button
        variant="outlined"
        onClick={toPreviousLesson}
        disabled={disablePreviousLessonButton}
      >
        {" "}
        Previous{" "}
      </Button>
      <Button
        variant="outlined"
        onClick={toNextLesson}
        disabled={disableNextLessonButton}
      >
        {" "}
        Next{" "}
      </Button>
      <div dangerouslySetInnerHTML={{ __html: lessonData?.htmlContent }} />
      <div>
        <h1>Comments : </h1>
        {lessonData?.comments.map((comment) => (
          <div style={{ border: "1px solid " }}>
            <p>
              {" "}
              {comment.userName} : {comment.comment}
            </p>
          </div>
        ))}
        Write comment :{" "}
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={submitComment}>Submit</button>
      </div>
      {}
    </>
  );
};

export default LessonPage;
