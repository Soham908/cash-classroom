import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./authFlow/Login";
import Register from "./authFlow/Register";
import Course from "./pages/courses/Course";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import LessonPage from "./pages/lesson/LessonPage";
import NoMatch from "./components/NoMatch";
import FinanceGoals from "./pages/FinanceGoals";
import Profile from "./pages/Profile";
import FDCalculator from "./pages/calculators/FDCalculator";
import EMICalculator from "./pages/calculators/EMICalculator";
import SIPCalculator from "./pages/calculators/SIPCalculator";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetails from "./pages/Blogs/BlogDetails/BlogDetails";
import Quiz from "./pages/quiz/Quiz";
import Dashboard from "./pages/new-dashboard/Dashboard";
import CourseDetail from "./pages/courseDetails/CourseDetail";
import NeedToInvest from "./pages/trialComponent";
import Chatbot from "./components/chatbot/Chatbot";

function App() {
	const location = useLocation();
	const [showChatbot, setShowChatbot] = useState(true);
	useEffect(() => {
		if (
			location.pathname.includes("/register") ||
			location.pathname === "/" ||
			location.pathname.includes("/lesson-quiz")
		) {
			setShowChatbot(false);
		} else {
			setShowChatbot(true);
		}
		// console.log(location.pathname);
	}, [location]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/finance-goals" element={<FinanceGoals />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/courses/:name" element={<CourseDetail />} />
        <Route path="/lesson" element={<LessonPage />} />
        <Route path="/calculators/fd-calculator" element={<FDCalculator />} />
        <Route path="/calculators/emi-calculator" element={<EMICalculator />} />
        <Route path="/calculators/sip-calculator" element={<SIPCalculator />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:blogId" element={<BlogDetails />} />
        <Route path="/lesson-quiz/:currentquizLessonName" element={<Quiz />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
			{showChatbot && <Chatbot />}
      {/* <Footer /> */}
    </>
  );
}

export default App;
