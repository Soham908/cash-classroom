import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { TextField } from "@mui/material";
import styles from "./single-calculator.module.css";
const EMICalculator = () => {
	const [loanAmount, setLoanAmount] = useState(100000);
	const [interest, setInterest] = useState(5);
	const [time, setTime] = useState(1);
	const [emiValue, setEmiValue] = useState();

	// EMI = [P x R x (1+R) ^N]/ [(1+R) ^ (N-1)]
	useEffect(() => {
		const monthlyInterestRate = interest / 12 / 100;
		const tenureMonths = time * 12;
		const emi =
			(loanAmount *
				monthlyInterestRate *
				Math.pow(1 + monthlyInterestRate, tenureMonths)) /
			(Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);
		setEmiValue(emi);
	}, [loanAmount, interest, time]);

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
						label="Loan Amount"
						type="number"
						value={loanAmount}
						placeholder="Enter loan amount"
						onChange={(e) =>
							e.target.value < 0 ? "" : setLoanAmount(e.target.value)
						}
						sx={{ marginBottom: "10px", width: "100%" }}
					/>
					<TextField
						label="Rate of interest"
						type="number"
						value={interest}
						placeholder="Enter interest"
						onChange={(e) =>
							e.target.value < 0 ? "" : setInterest(e.target.value)
						}
						sx={{ marginBottom: "10px", width: "100%" }}
					/>
					<TextField
						type="number"
						value={time}
						label="Time period"
						placeholder="Enter time period"
						onChange={(e) =>
							e.target.value < 0 ? "" : setTime(e.target.value)
						}
						sx={{ marginBottom: "10px", width: "100%" }}
					/>

					<div className={styles.outputContainer}>
						<p className={styles.outputText}>
							EMI <span> {formatCurrentSpacing(emiValue)}</span>
						</p>
						<p className={styles.outputText}>
							Loan Amount <span> {formatCurrentSpacing(loanAmount)}</span>
						</p>
						<p className={styles.outputText}>
							Total Interest{" "}
							<span>
								{" "}
								{formatCurrentSpacing(emiValue * time * 12 - loanAmount)}
							</span>
						</p>
						<p className={styles.outputText}>
							Total Amount{" "}
							<span> {formatCurrentSpacing(loanAmount + emiValue)}</span>
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
										value: loanAmount,
										label: "Principal Amount",
									},
									{
										id: 1,
										value: emiValue * time * 12 - loanAmount,
										label: "Interest Amount",
									},
								],
								innerRadius: 60,
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

export default EMICalculator;
