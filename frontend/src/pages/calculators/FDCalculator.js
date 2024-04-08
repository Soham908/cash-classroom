import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { TextField } from "@mui/material";
import styles from "./single-calculator.module.css";

const FDCalculator = () => {
	const [investmentAmount, setInvestmentAmount] = useState(10000);
	const [interestValue, setInterestValue] = useState(7);
	const [timePeriod, setTimePeriod] = useState(5);
	const [totalValue, setTotalValue] = useState();
	const [returns, setReturns] = useState();

	useEffect(() => {
		var principal = parseInt(investmentAmount);
		for (let index = 0; index < timePeriod; index++) {
			principal += (principal * interestValue) / 100;
		}
		setReturns(principal - investmentAmount);
		setTotalValue(principal);
	}, [investmentAmount, timePeriod, interestValue]);

	const formatCurrentSpacing = (amount) => {
		if (amount) {
			amount = Math.ceil(amount).toLocaleString("en-IN", {
				style: "currency",
				currency: "INR",
			});
		}
		return amount;
	};

	return (
		<>
			<div className={styles.calculatorContainer}>
				<div className={styles.inputContainer}>
					<TextField
						label="Total Investment"
						type="number"
						value={investmentAmount}
						placeholder="Enter investment amount"
						onChange={(e) =>
							e.target.value < 0 ? "" : setInvestmentAmount(e.target.value)
						}
						sx={{ marginBottom: "10px", width: "100%" }} // Add some bottom margin
					/>
					<TextField
						label="Rate of interest"
						type="number"
						value={interestValue}
						placeholder="Enter interest"
						onChange={(e) =>
							e.target.value < 0 ? "" : setInterestValue(e.target.value)
						}
						sx={{ marginBottom: "10px", width: "100%" }} // Add some bottom margin
					/>
					<TextField
						label="Time period"
						type="number"
						value={timePeriod}
						placeholder="Enter time period"
						onChange={(e) =>
							e.target.value < 0 ? "" : setTimePeriod(e.target.value)
						}
						sx={{ marginBottom: "10px", width: "100%" }} // Add some bottom margin
					/>
					<div className={styles.outputContainer}>
						<p className={styles.outputText}>
							Invested Amount
							<span>{formatCurrentSpacing(investmentAmount)}</span>
						</p>
						<p className={styles.outputText}>
							Estimated Returns <span>{formatCurrentSpacing(returns)}</span>
						</p>
						<p className={styles.outputText}>
							Total Value <span>{formatCurrentSpacing(totalValue)}</span>
						</p>
					</div>
				</div>
				<div className={styles.chartContainer}>
					<PieChart
						series={[
							{
								data: [
									{
										id: 0,
										value: returns,
										label: "Total Returns",
									},
									{
										id: 1,
										value: totalValue - returns,
										label: "Total investment amount",
									},
								],
								innerRadius: 80,
							},
						]}
						height={350}
						slotProps={{ legend: { hidden: true } }}
					/>
				</div>
			</div>
		</>
	);
};

export default FDCalculator;
