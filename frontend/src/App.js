
import './App.css';
import { Routes,Route } from "react-router-dom"
import Login from './authFlow/Login';
import Register from './authFlow/Register';
import Course from './pages/Course';
import Navbar from './components/Navbar';
import CourseDetail from './pages/CourseDetail';
import NoMatch from "./components/NoMatch"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"

function App() {
  return (
    <>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/courses' element={<Course/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/courses/:name' element={<CourseDetail/>}/>
          <Route path="*" element={<NoMatch/>} />
        </Routes>
    </>
  );
}

export default App;
