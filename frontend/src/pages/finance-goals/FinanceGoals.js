import { useEffect, useState } from "react";
import {
	createGoal,
	fetchGoalsById,
	updateGoal,
} from "../../actions/goalActions";
import { useAuthStore } from "../../store/store";
import Button from "@mui/joy/Button";
import { Snackbar } from "@mui/joy";
import { Box, TextField } from "@mui/material";
import GoalComponent from "../../components/GoalComponent";
import styles from "./goals.module.css";

const FinanceGoals = () => {
	const user = useAuthStore.getState().user;
	const [goalFormData, setGoalFormData] = useState({
		name: "",
		target: null,
		currentAmount: null,
	});
	const [refresh, setRefresh] = useState(false);
	const [goals, setGoals] = useState([]);
	const [amountUpdate, setAmountUpdate] = useState(null);
	const [snackBarOpen, setSnackBarOpen] = useState(false);
	const [snackBarMessage, setSnackbarMessage] = useState("");
	const [goalCompleted, setGoalCompleted] = useState(false);

	useEffect(() => {
		const fetchGoals = async () => {
			const response = await fetchGoalsById(user?.data?._id);
			setGoals(response?.goals);
		};
		fetchGoals();
	}, [refresh]);

	const handleGoalsFormChange = (e) => {
		setGoalFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
	};

	const handleCreateGoal = async () => {
		const currentAmount = goalFormData.currentAmount * 1;
		const target = goalFormData.target * 1;
		if (goalFormData.name === "") {
			setSnackbarMessage("Goal must have a name");
		} else if (currentAmount < 0 || target < 0) {
			setSnackbarMessage("Amount can not be negative");
		} else if (target === 0) {
			setSnackbarMessage("Target cant be zero (0)");
		} else if (currentAmount > target) {
			setSnackbarMessage((p) => "Target should be greater than Current Amount");
		} else {
			const data = { ...goalFormData, userId: user?.data?._id };
			setSnackbarMessage("Goal Created");
			const response = await createGoal(data);
			if (response.success) {
				setRefresh((p) => !p);
			}
			setGoalFormData((p) => ({
				...p,
				name: "",
				target: 0,
				currentAmount: 0,
			}));
		}
		setSnackBarOpen((p) => true);
	};

	const handleSavedValue = async (data) => {
		const check = checkGoalCompleted({
			goalTarget: data.goalTarget,
			goalCurrentAmt: data.goalCurrentAmt,
		});
		if (!check) {
			var sendData = { id: data.id, updatedAmount: 0 };
			if (
				parseInt(data.goalCurrentAmt) + parseInt(data.updateAmount) >=
				data.goalTarget
			) {
				sendData.updatedAmount = data.goalTarget;
			} else {
				sendData.updatedAmount =
					parseInt(data.goalCurrentAmt) + parseInt(data.updateAmount);
				console.log(sendData.updatedAmount);
			}
			const response = await updateGoal({
				id: sendData.id,
				updatedAmount: sendData.updatedAmount,
			});
			console.log(response);
			setRefresh((prev) => !prev);
		}
	};

	const checkGoalCompleted = ({ goalTarget, goalCurrentAmt }) => {
		if (goalTarget === goalCurrentAmt) {
			console.log("goal complete");
			setSnackbarMessage("Goal is completed");
			setSnackBarOpen(true);
			setGoalCompleted(true);
			return true;
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.inputContainer}>
				<TextField
					label="Name"
					name="name"
					value={goalFormData?.name}
					onChange={(e) => handleGoalsFormChange(e)}
				/>
				<TextField
					label="Target"
					name="target"
					type="number"
					value={goalFormData?.target}
					onChange={(e) => handleGoalsFormChange(e)}
				/>
				<TextField
					label="Current Amount"
					name="currentAmount"
					type="number"
					value={goalFormData?.currentAmount}
					onChange={(e) => handleGoalsFormChange(e)}
				/>
				<Button
					variant="solid"
					className={styles.createGoalBtn}
					onClick={handleCreateGoal}
				>
					Create Goal
				</Button>
			</div>
			{goals.length > 0 ? (
				<div className={styles.goalsContainer}>
					{goals?.map((goalData, index) => (
						<GoalComponent
							refresh={setRefresh}
							key={index}
							goalData={goalData}
							handleSavedValue={handleSavedValue}
						/>
					))}
				</div>
			) : (
				<div className={styles.goalsIllustrationContainer}>
					<img src="/goals3.avif" alt="goals empty banner" />
				</div>
			)}
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={snackBarOpen}
				autoHideDuration={1500}
				onClose={() => setSnackBarOpen(false)}
			>
				{snackBarMessage}
			</Snackbar>
		</div>
	);
};

export default FinanceGoals;
