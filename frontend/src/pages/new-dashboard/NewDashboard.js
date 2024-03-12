import React from "react";
import styles from "./dashboard.module.css"
import { useNavigate } from 'react-router-dom';
// images
// import girlTakingNotes from "../../assets/images/girl-taking-notes.jpg"
// import organizedWorkSpace from "../../assets/images/orgaanized-workspace.jpg"
// import todoList from "../../assets/images/todo-list.jpg"

const Dashboard = () => {
    const navigate = useNavigate()
  

    const FirstSection = () =>{
        return (
            <div className={styles.firstSection}>
                <div className={styles.firstSectionText}>
                    <h3>Getting started with the Todo feature</h3>
                    <p>As a new user, you can easily start using the Todo feature without any technical knowledge. 
                        Once you've installed the app on your device, you can create and manage your tasks effortlessly.
                        Stay organized and never miss a deadline!</p>
                    <button>Learn More</button>
                </div>
                <div className={styles.firstSectionImage}>
                    <img src="/girl-taking-notes.jpg" alt="" />
                </div>
            </div>
        )
    }
    const SecondSection = () =>{
        return (
            <div className={`${styles.firstSectionText} ${styles.grey}`}>
                <div className={styles.firstSectionImage}>
                    <img src="orgaanized-workspace.jpg" alt="" />
                </div>
                <div className={styles.firstSectionText}>
                    <h3>The power of Todo and Notes</h3>
                    <p>Our app is designed to help you stay productive and organized. 
                        The Todo and Notes features are built on a secure and reliable platform,
                         ensuring that your tasks and important information are always accessible. 
                        Experience the convenience of managing your tasks and taking notes in one place.</p>
                    <button>Learn More</button>
                </div>
            </div>
        )
    }
    const ThirdSection = () =>{
        return (
            <div className={styles.firstSection}>
                <div className={styles.firstSectionText}>
                    <h3>Boost your productivity with Todo</h3>
                    <p>Our app allows you to streamline your workflow by combining the power of Todo and Notes.
                        Say goodbye to scattered tasks and unorganized notes. 
                        With our app, you can easily prioritize your tasks, 
                        set reminders, and keep all your important information in one centralized location.</p>
                    <button>Learn More</button>
                </div>
                <div className={styles.firstSectionImage}>
                    <img src="/todo-list.jpg" alt="" />
                </div>
            </div>
        )
    }
        return (
        <div className={styles.homeComponent}>
            <h1 className={styles.dashboardTitle}>How does the App work?</h1>
            <FirstSection />
            <SecondSection />
            <ThirdSection />
        </div>
        )}
export default Dashboard