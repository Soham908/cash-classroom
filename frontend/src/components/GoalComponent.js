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


const GoalComponent = ({ goalData, handleSavedValue }) => {
	const [amountUpdate, setAmountUpdate] = useState("");
	const [goalCompleted, setGoalCompleted] = useState(false);

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
					value={Number((goalData.currentAmount / goalData.target) * 100)}
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
									goalTarget: goalData.target,
									goalCurrentAmt: goalData.currentAmount,
								})
							}
							disabled={goalCompleted}
						>
							Add to Saved value
						</Button>
					}
				/>
			</CardActions>
		</Card>
	);
};

export default GoalComponent;
