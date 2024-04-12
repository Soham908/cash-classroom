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
import Profile from "./pages/Profile";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetails from "./pages/Blogs/BlogDetails/BlogDetails";
import Quiz from "./pages/quiz/Quiz";
import Dashboard from "./pages/new-dashboard/Dashboard";
import CourseDetail from "./pages/courseDetails/CourseDetail";
import Chatbot from "./components/chatbot/Chatbot";
import Testing from "./Testing";
import Calculator from "./pages/calculators/Calculator";

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
			<Navbar path={location.pathname} />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/register" element={<Register />} />
				<Route path="/courses" element={<Course />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/courses/:name" element={<CourseDetail />} />
				<Route path="/lesson" element={<LessonPage />} />
				<Route path="/blogs" element={<Blogs />} />
				<Route path="/blogs/:blogId" element={<BlogDetails />} />
				<Route path="/lesson-quiz/:currentquizLessonName" element={<Quiz />} />
				<Route path="testing" element={<Testing />} />
				<Route path="calculators" element={<Calculator />} />
				<Route path="*" element={<NoMatch />} />
			</Routes>
			{showChatbot && <Chatbot />}

			<Footer />
		</>
	);
}

export default App;

// @tailwindcss/typography
