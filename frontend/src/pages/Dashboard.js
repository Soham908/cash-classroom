import { useEffect, useState } from "react";
import { ProtectRoutes } from "../manageRoutes/protectRoutes";
import { createGoal, fetchGoalsById } from "./../actions/goalActions";
import { useAuthStore } from "../store/store";

const Dashboard = () => {
	const user = useAuthStore.getState().user;
	const [goalFormData, setGoalFormData] = useState({
		name: "",
		target: 0,
		currentAmount: 0,
	});
	const [refresh, setRefresh] = useState(false);
	const [goals, setGoals] = useState([]);

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
				<input
					type="number"
					name="target"
					value={goalFormData.target}
					onChange={(e) => handleGoalsFormChange(e)}
				/>
				<br />
				<input
					type="number"
					name="currentAmount"
					value={goalFormData.currentAmount}
					onChange={(e) => handleGoalsFormChange(e)}
				/>
				<br />
				<button onClick={handleCreateGoal}>Create Goal</button>
				<br />
				{JSON.stringify(goals)}
			</div>
		</ProtectRoutes>
	);
};

export default Dashboard;
