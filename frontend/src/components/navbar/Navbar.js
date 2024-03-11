
import { NavLink } from "react-router-dom"
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store/store";
import {useAuthStore} from "./../../store/store"
const Navbar = () => {
  const navigate = useNavigate()
  const setStateUser = useAuthStore(state=>state.setUser)
  const activeStyle = {
    textDecoration : "underline",
    fontWeight : "bold",
    color : "red" 
    }
  
  const logout = () => {
    setStateUser(null)
    localStorage.setItem("userData","")
    navigate("/")
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
            <NavLink style={({isActive})=>isActive ? activeStyle : null} to="/dashboard">Dashboard</NavLink>
            <NavLink style={({isActive})=>isActive ? activeStyle : null} to="/courses">Courses</NavLink>
            <NavLink style={({isActive})=>isActive ? activeStyle : null} to="/profile">Profile</NavLink>
            <NavLink style={({isActive})=>isActive ? activeStyle : null} to="/blogs">Blogs</NavLink>
            <button onClick={logout}>Logout</button>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;


// import { NavLink } from "react-router-dom"
// import React from 'react';
// import { AppBar, Toolbar, Typography } from '@mui/material';
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../../store/store";
// import styles from "./navbar.module.css"
// const Navbar = () => {
//   const navigate = useNavigate()
//   const setStateUser = useAuthStore(state=>state.setUser)
//   const activeStyle = {
//     textDecoration : "underline",
//     fontWeight : "bold",
//     color : "red" 
//     }
  
//   const logout = () => {
//     setStateUser(null)
//     localStorage.setItem("userData","")
//     navigate("/")
//   }
//   return (
//     <nav className={styles.container}>
//             <div className={styles.links}>
//               <NavLink className={({isActive})=>isActive ? styles.active : styles.link}   to="/dashboard">Dashboard</NavLink>
//               <NavLink className={({isActive})=>isActive ? styles.active : styles.link} to="/courses">Courses</NavLink>
//               <NavLink className={({isActive})=>isActive ? styles.active : styles.link} to="/profile">Profile</NavLink>
//               <NavLink className={({isActive})=>isActive ? styles.active : styles.link} to="/blogs">Blogs</NavLink>
//             </div>
//             <button onClick={logout}>Logout</button>
//     </nav>
//   );
// };

// export default Navbar;

