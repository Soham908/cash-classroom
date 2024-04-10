import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardActions,
	Typography,
	Input,
	Button,
	LinearProgress,
} from "@mui/joy";
import { AspectRatio } from "@mui/joy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteGoal } from "../actions/goalActions";

const GoalComponent = ({ goalData, handleSavedValue, refresh }) => {
	const [amountUpdate, setAmountUpdate] = useState("");

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
				<LinearProgress
					determinate
					variant="outlined"
					size="sm"
					thickness={24}
					value={Number((goalData.currentAmount / goalData.target) * 100)}
					sx={{
						"--LinearProgress-radius": "20px",
						"--LinearProgress-thickness": "24px",
					}}
				>
					<Typography
						level="body-xs"
						fontWeight="xl"
						textColor="common.green"
						sx={{
							mixBlendMode: "difference",
							textAlign: "start",
						}}
					>
						{goalData.currentAmount === goalData.target
							? "Goal Completed"
							: `${goalData.currentAmount} / ${goalData.target}`}
					</Typography>
				</LinearProgress>
			</CardContent>
			<CardActions>
				<Input
					placeholder="Enter your Saved Amount"
					type="Number"
					onChange={(e) => setAmountUpdate(e.target.value)}
					value={amountUpdate}
					disabled={goalData.target === goalData.currentAmount}
					endDecorator={
						<Button
							variant="soft"
							size="sm"
							onClick={() =>
								handleSavedValue({
									id: goalData._id,
									updateAmount: amountUpdate,
									goalTarget: goalData.target,
									goalCurrentAmt: goalData.currentAmount,
								})
							}
						>
							Add to Saved value
						</Button>
					}
				/>
				<DeleteForeverIcon
					onClick={async () => {
						const response = await deleteGoal(goalData._id);
						console.log(response);
						refresh((p) => !p);
					}}
				/>
			</CardActions>
		</Card>
	);
};

export default GoalComponent;
