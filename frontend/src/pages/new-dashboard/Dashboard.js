import React, { useRef } from "react";
import styles from "./dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/store";

const Dashboard = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const user = useAuthStore.getState().user;

  const handleRegisterClick = () => {
    console.log(emailRef.current.value);
    navigate("/register", { state: { email: emailRef.current.value } });
  };

  const GoalsSection = () => {
    return (
      <>
        <h1>Goals</h1>
      </>
    );
  };

  const FirstSection = () => {
    return (
      <div className={styles.firstSection}>
        <div className={styles.firstSectionText}>
          <h3>Start your finance journey today</h3>
          <p>
            Learn to invest from scratch with job focussed courses designed by
            experts.
          </p>
          <div>
            <input
              ref={emailRef}
              className={styles.email}
              type="email"
              placeholder="enter email..."
            />
            <button onClick={handleRegisterClick}>Start Learning Today</button>
          </div>
        </div>
        <div className={styles.firstSectionImage}>
          <img src="/coder.avif" alt="" />
        </div>
      </div>
    );
  };
  const SecondSection = () => {
    return (
      // <div className={styles.firstSection} style={{ backgroundColor: "gray" }}>
      <div className={styles.firstSection}>
        <div className={styles.firstSectionImage}>
          <img src="quiz.jpg" alt="" />
        </div>
        <div className={styles.firstSectionText}>
          <h3>Interactive learning with quizes</h3>
          <p>
            Practice as you learn with our quizes . Each lesson is designed to
            be followed by a quiz exercise to apply the concepts and gain
            immediate feedback.
          </p>
          <button onClick={() => navigate("/courses")}>Enroll a course</button>
        </div>
      </div>
    );
  };
  const ThirdSection = () => {
    return (
      <div className={styles.firstSection}>
        <div className={styles.firstSectionText}>
          <h3>Learning courses</h3>
          <h1>Practical, Job relevant topics</h1>
          <p>
            From stock markert to options trading , you'll master concepts that
            employers demand, ensuring your smooth transition from beginner to
            professional.
          </p>
          <button onClick={() => navigate("/courses")}>Browse Catalog</button>
        </div>
        <div className={styles.firstSectionImage}>
          <img src="/courses.jpg" alt="" />
        </div>
      </div>
    );
  };

  const CoursesSection = () => {
    return <div></div>;
  };
  return (
    <div className={styles.homeComponent}>
      <h1 className={styles.dashboardTitle}>How does the App work?</h1>
      {!user && <FirstSection />}
      <GoalsSection />
      <SecondSection />
      <ThirdSection />
    </div>
  );
};
export default Dashboard;
