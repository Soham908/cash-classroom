import React, { useState } from "react";
import { Snackbar } from "@mui/joy";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { login } from "../actions/userActions";
import { useAuthStore } from "../store/store";
import { PreventAuthFlow } from "./../manageRoutes/protectRoutes";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const setStateUser = useAuthStore((state) => state.setUser);
	const [snackBarOpen, setSnackBarOpen] = useState(false);
	const [snackBarMessage, setSnackbarMessage] = useState("");
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleTogglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await login({
			name: formData.name,
			email: formData.email,
			password: formData.password,
		});
		if (response.success) {
			console.log(response.userObject);
			localStorage.setItem(
				"userData",
				JSON.stringify({ token: response.token, data: response.userObject })
			);
			setStateUser({ token: response.token, data: response.userObject });
			navigate("/dashboard");
		} else {
			console.log(response);
			if (response.message === "User doesn't exist") {
				setSnackbarMessage(response.message);
				setSnackBarOpen(true);
				setFormData((p) => ({ ...p, email: "", password: "" }));
			}
		}
	};

	return (
		<PreventAuthFlow>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					minHeight: "100vh",
				}}
			>
				<p>Login Page </p>
				<form onSubmit={handleSubmit} style={{ width: "300px" }}>
					<TextField
						label="Email"
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
						fullWidth
						margin="normal"
						required
					/>

					<TextField
						label="Password"
						name="password"
						type={showPassword ? "text" : "password"}
						value={formData.password}
						onChange={handleChange}
						fullWidth
						margin="normal"
						required
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={handleTogglePasswordVisibility}
										edge="end"
									>
										{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>

					<Button
						type="submit"
						variant="contained"
						color="primary"
						style={{ marginTop: "16px" }}
					>
						Login
					</Button>
				</form>
				<p>
					Don't have an account? <Link to="/register">Register</Link>
				</p>
			</div>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={snackBarOpen}
				autoHideDuration={1500}
				onClose={() => setSnackBarOpen(false)}
			>
				{snackBarMessage}
			</Snackbar>
		</PreventAuthFlow>
	);
};

export default Login;
