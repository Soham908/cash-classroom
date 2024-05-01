import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { register, registerOTP } from "../actions/userActions";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Snackbar } from "@mui/joy";
import { Collapse } from "@mui/material";
import { useAuthStore } from "../store/store";

const Register = () => {
	const setStateUser = useAuthStore((state) => state.setUser);
	const [snackBarOpen, setSnackBarOpen] = useState(false);
	const [snackBarMessage, setSnackbarMessage] = useState("");
	const [showOtpForm, setShowOtpForm] = useState(false);
	const [otp, setOtp] = useState("");
	const state = useLocation()?.state;

	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: state && state.email ? state.email : "",
		password: "",
		confirmPassword: "",
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
		if (formData.password.length < 8) {
			setSnackbarMessage("Passward must be of atleast 8 characters");
			setSnackBarOpen(true);
		} else if (formData.password !== formData.confirmPassword) {
			setSnackbarMessage("Passwords doesn't match!");
			setSnackBarOpen(true);
		} else {
			const response = await registerOTP({
				email: formData.email,
			});
			if (response.success) {
				setSnackbarMessage(response.message);
				setSnackBarOpen((p) => true);
				setShowOtpForm(true);
			} else {
				setSnackbarMessage(response.message);
				setSnackBarOpen((p) => true);
			}
		}
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		if (otp.toString().length != 4) {
			setSnackbarMessage("OTP length must be 4");
			setSnackBarOpen(true);
		} else {
			const response = await register({
				name: formData.name,
				email: formData.email,
				password: formData.password,
				otp: otp,
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
				setSnackbarMessage(response.message);
				setSnackBarOpen(true);
				console.log(response);
			}
		}
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100vh", // Set the minimum height of the viewport
			}}
		>
			<p>Register Page </p>
			<Collapse in={!showOtpForm}>
				<form onSubmit={handleSubmit} style={{ width: "300px" }}>
					<TextField
						label="Username"
						name="name"
						value={formData.name}
						onChange={handleChange}
						fullWidth
						margin="normal"
						required
					/>

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

					<TextField
						label="Confirm Password"
						name="confirmPassword"
						type={showPassword ? "text" : "password"}
						value={formData.confirmPassword}
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
						Submit
					</Button>
				</form>
			</Collapse>
			<Collapse in={showOtpForm}>
				<form onSubmit={handleRegister}>
					<TextField
						label="Otp"
						name="otp"
						value={otp}
						onChange={(e) => setOtp(e.target.value)}
						fullWidth
						margin="normal"
						required
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						style={{ marginTop: "16px" }}
					>
						Register
					</Button>
				</form>
			</Collapse>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={snackBarOpen}
				autoHideDuration={1500}
				onClose={() => setSnackBarOpen(false)}
			>
				{snackBarMessage}
			</Snackbar>
			<p>
				Already have an account? <Link to="/">Login</Link>
			</p>
		</div>
	);
};

export default Register;
