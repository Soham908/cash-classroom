import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import styles from "./single-calculator.module.css";
import { TextField } from "@mui/material";

const SIPCalculator = () => {
	const [monthlyInvestment, setMonthlyInvestment] = useState(1000);
	const [interest, setInterest] = useState(12);
	const [time, setTime] = useState(7);
	const [totalValue, setTotalValue] = useState();
	const [investedAmount, setInvestedAmount] = useState();
	const [totalReturn, setTotalReturn] = useState();

	useEffect(() => {
		const interestNum = interest / 100 / 12;
		const numPayments = time * 12;
		const totalAmt =
			monthlyInvestment *
			((Math.pow(1 + interestNum, time * 12) - 1) / interestNum) *
			(1 + interestNum);
		setTotalValue(totalAmt);
		setTotalReturn(totalAmt - monthlyInvestment * time * 12);
	}, [monthlyInvestment, interest, time]);

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
						type="number"
						label="Monthly Investment"
						value={monthlyInvestment}
						placeholder="Enter investment amount"
						onChange={(e) =>
							e.target.value < 0 ? "" : setMonthlyInvestment(e.target.value)
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
						label="Time"
						type="number"
						placeholder="Enter time (years)"
						value={time}
						onChange={(e) =>
							e.target.value < 0 ? "" : setTime(e.target.value)
						}
						sx={{ marginBottom: "10px", width: "100%" }}
					/>

					<div className={styles.outputContainer}>
						<p className={styles.outputText}>
							Invested Amount
							<span>{formatCurrentSpacing(monthlyInvestment * time * 12)}</span>
						</p>
						<p className={styles.outputText}>
							Returns <span>{formatCurrentSpacing(totalReturn)}</span>
						</p>
						<p className={styles.outputText}>
							Total value <span> {formatCurrentSpacing(totalValue)}</span>
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
										value: monthlyInvestment * time * 12,
										label: "Invested amount",
									},
									{
										id: 1,
										value: totalReturn,
										label: "Returns ",
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

export default SIPCalculator;
