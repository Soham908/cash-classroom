import React, { useRef} from "react";
import styles from "./dashboard.module.css"
import { useNavigate } from 'react-router-dom';
// import { useAuthStore} from "./../../store/store"

const Dashboard = () => {
    const navigate = useNavigate()
    const emailRef = useRef(null);
    // const user = useAuthStore.getState().user

    const handleRegisterClick = () => {
        console.log(emailRef.current.value)
        navigate("/register",{state : {email : emailRef.current.value}})
    }
    const FirstSection = () =>{
        return (
            <div className={styles.firstSection}>
                <div className={styles.firstSectionText}>
                    <h3>Start your finance journey today</h3>
                    <p>Learn to invest from scratch with job focussed courses designed by experts.</p>
                    <div>
                        <input ref={emailRef} className={styles.email} type="email" placeholder="enter email..." />
                        <button onClick={handleRegisterClick}>Start Learning Today</button>
                    </div>
                </div>
                <div className={styles.firstSectionImage}>
                    <img src="/coder.avif" alt="" />
                </div>
            </div>
        )
    }
    const SecondSection = () =>{
        return (
            <div className={styles.firstSection} style={{backgroundColor:"gray"}}>
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

    const CoursesSection = () =>{
        return (
            <div>

            </div>
        )
    }
        return (
        <div className={styles.homeComponent}>
            <h1 className={styles.dashboardTitle}>How does the App work?</h1>
           {/* { user && <FirstSection /> }  */}
            <FirstSection />
            <SecondSection />
            <ThirdSection />
        </div>
        )}
export default Dashboard