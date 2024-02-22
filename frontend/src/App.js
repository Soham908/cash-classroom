
import './App.css';
import { Routes,Route } from "react-router-dom"
import Login from './pages/Login';
import Register from './pages/Register';
import { createContext, useState } from 'react';
import Course from './pages/Course';
import Navbar from './components/Navbar';
import CourseDetail from './pages/CourseDetail';

export const UserContext = createContext()
function App() {
  
  const [user,setUser] = useState()

  return (
      <UserContext.Provider value={{user,setUser}}>
        <Navbar/>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/courses' element={<Course/>}/>
          <Route path='/courses/:name' element={<CourseDetail/>}/>
        </Routes>
      </UserContext.Provider>
  );
}

export default App;
