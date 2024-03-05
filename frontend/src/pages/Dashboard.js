import { useEffect, useState } from "react";
import { ProtectRoutes } from "../manageRoutes/protectRoutes";
import {
	createGoal,
	fetchGoalsById,
	updateGoal,
} from "./../actions/goalActions";
import { useAuthStore } from "../store/store";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { CardActions, Input, LinearProgress } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { Box } from "@mui/material";

const Dashboard = () => {
	const user = useAuthStore.getState().user;
	const [goalFormData, setGoalFormData] = useState({
		name: "",
		target: 0,
		currentAmount: 0,
	});
	const [refresh, setRefresh] = useState(false);
	const [goals, setGoals] = useState([]);
	const [amountUpdate, setAmountUpdate] = useState(0);

	useEffect(() => {
		const fetchGoals = async () => {
			const response = await fetchGoalsById(user?.data?._id);
			setGoals(response.goals);
		};
		fetchGoals();
	}, [refresh]);

	const handleGoalsFormChange = (e) => {
		setGoalFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
	};

	const handleCreateGoal = async () => {
		const data = { ...goalFormData, userId: user?.data?._id };
		const response = await createGoal(data);
		if (response.success) {
			setRefresh((p) => !p);
		}
	};

	const handleSavedValue = async (data) => {
		const response = await updateGoal(data);
		console.log(response);
		setRefresh((prev) => !prev);
	};

	return (
		<ProtectRoutes>
			<div className="cards">
				<br />
				<input
					type="text"
					name="name"
					value={goalFormData.name}
					onChange={(e) => handleGoalsFormChange(e)}
				/>
				<br />
				target{" "}
				<input
					type="number"
					name="target"
					value={goalFormData.target}
					onChange={(e) => handleGoalsFormChange(e)}
				/>
				<br />
				curr amt{" "}
				<input
					type="number"
					name="currentAmount"
					value={goalFormData.currentAmount}
					onChange={(e) => handleGoalsFormChange(e)}
				/>
				<br />
				<button onClick={handleCreateGoal}>Create Goal</button>
				<br />
				{/* {JSON.stringify(goals)} */}
			</div>

			<Box sx={{ display: "flex", flexWrap: "wrap" }}>
				{goals.map((goalData, index) => {
					return (
						<Card sx={{ margin: 2 }}>
							<AspectRatio ratio={2}>
								<img
									src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
									srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
									loading="lazy"
									alt=""
								/>
							</AspectRatio>
							<CardContent>
								<div>
									<Typography level="body-xs"> Target Savings </Typography>
									<Typography fontSize="lg" fontWeight="lg">
										{goalData?.target}
									</Typography>
								</div>
								<div>
									<Typography level="body-xs"> Current Amount </Typography>
									<Typography fontSize="lg" fontWeight="lg">
										{goalData?.currentAmount}
									</Typography>
								</div>
								<LinearProgress
									determinate
									variant="outlined"
									size="sm"
									thickness={24}
									value={Number(
										(goalData.currentAmount / goalData.target) * 100
									)}
									sx={{
										"--LinearProgress-radius": "20px",
										"--LinearProgress-thickness": "24px",
									}}
								>
									<Typography
										level="body-xs"
										fontWeight="xl"
										textColor="common.white"
										sx={{ mixBlendMode: "difference", textAlign: "start" }}
									>
										{`${goalData.currentAmount} / ${goalData.target}`}
										{/* {console.log(goalData.currentAmount / goalData.target)} */}
									</Typography>
								</LinearProgress>
							</CardContent>
							<CardActions>
								<Input
									placeholder="Enter your Saved Amount"
									type="Number"
									onChange={(e) => setAmountUpdate(e.target.value)}
									value={amountUpdate}
									endDecorator={
										<Button
											variant="soft"
											size="sm"
											onClick={() =>
												handleSavedValue({
													id: goalData._id,
													updateAmount: amountUpdate,
												})
											}
										>
											Add to Saved value
										</Button>
									}
								/>
							</CardActions>
						</Card>
					);
				})}
			</Box>
		</ProtectRoutes>
	);
};

export default Dashboard;
