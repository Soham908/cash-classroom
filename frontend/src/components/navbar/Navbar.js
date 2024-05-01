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
						path === "/ui-explanation" ? styles.active : ""
					}`}
					to="/ui-explanation"
				>
					UI
				</NavLink>
				{path !== "/" && user && (
					<NavLink
						className={`${styles.link} ${
							path === "/profile" ? styles.active : ""
						}`}
						to="/profile"
					>
						Profile
					</NavLink>
				)}
			</div>
			{user && (
				<div className={styles.secondContainer}>
					{user && (
						<h5 style={{ marginTop: "5px" }}>Welcome {user?.data?.name}</h5>
					)}
					<Button
						sx={{ marginLeft: 2 }}
						variant="plain"
						color="neutral"
						onClick={logout}
					>
						Logout
					</Button>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
