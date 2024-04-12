import { NavLink } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./../../store/store";
import { Button } from "@mui/joy";
import styles from "./navbar.module.css";

const Navbar = ({ path }) => {
	const navigate = useNavigate();
	const setStateUser = useAuthStore((state) => state.setUser);
	const user = useAuthStore.getState().user;

	const logout = () => {
		setStateUser(null);
		localStorage.setItem("userData", null);
		navigate("/");
	};
	return (
		<nav className={styles.container}>
			<div className={styles.links}>
				<NavLink
					className={`${styles.link} ${
						path === "/dashboard" ? styles.active : ""
					}`}
					to="/dashboard"
				>
					<img src="./logo.png" alt="website logo" />
				</NavLink>
				<NavLink
					className={`${styles.link} ${
						path === "/courses" ? styles.active : ""
					}`}
					to="/courses"
				>
					Courses
				</NavLink>
				<NavLink
					className={`${styles.link} ${path === "/blogs" ? styles.active : ""}`}
					to="/blogs"
				>
					Blogs
				</NavLink>
				<NavLink
					className={`${styles.link} ${
						path === "/calculators" ? styles.active : ""
					}`}
					to="/calculators"
				>
					Calculator
				</NavLink>
				<NavLink
					className={`${styles.link} ${
						path === "/profile" ? styles.active : ""
					}`}
					to="/profile"
				>
					Profile
				</NavLink>
			</div>
			{user && (
				<Button
					sx={{ marginLeft: 2 }}
					variant="plain"
					color="neutral"
					onClick={logout}
				>
					Logout
				</Button>
			)}
		</nav>
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
