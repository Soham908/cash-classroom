import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./authFlow/Login";
import Register from "./authFlow/Register";
import Course from "./pages/Course";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import CourseDetail from "./pages/CourseDetail";
import LessonPage from "./pages/LessonPage";
import NoMatch from "./components/NoMatch";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import FDCalculator from "./pages/calculators/FDCalculator";
import EMICalculator from "./pages/calculators/EMICalculator";
import SIPCalculator from "./pages/calculators/SIPCalculator";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetails from "./pages/Blogs/BlogDetails/BlogDetails";
function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/register" element={<Register />} />
				<Route path="/courses" element={<Course />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/courses/:name" element={<CourseDetail />} />
				<Route path="/lesson" element={<LessonPage />} />
				<Route path="/calculators/fd-calculator" element={<FDCalculator />} />
				<Route path="/calculators/emi-calculator" element={<EMICalculator />} />
				<Route path="/calculators/sip-calculator" element={<SIPCalculator />} />
				<Route path="/blogs" element={<Blogs/>} />
				<Route path="/blogs/:blogId" element={<BlogDetails/>} />
				<Route path="*" element={<NoMatch />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
