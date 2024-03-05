import { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const SIPCalculator = () => {
	const [monthlyInvestment, setMonthlyInvestment] = useState(500);
	const [interest, setInterest] = useState(12);
	const [time, setTime] = useState(1);

	// EMI = [P x R x (1+R) ^N]/ [(1+R) ^ (N-1)]
	const i = interest / 12;
	// const totalValue = loanAmount + (loanAmount * interest * time) / 100;
	const totalValue =
		monthlyInvestment *
		(Math.pow(1 + i / 100, 12 * time - 1)) * 
		(1 + i / 100)/(i*100);
	// const totalInterest = (totalValue - loanAmount).toFixed(2);
	const investedAmount = monthlyInvestment * (time * 12);
	const returns = totalValue - investedAmount;

	return (
		<>
			<h1>EMI calculator</h1>
			<div style={{ display: "flex", border: "2px solid black" }}>
				<div className="calculator-form" style={{ border: "2px solid black" }}>
					Monthly Investment :{" "}
					<input
						type="number"
						value={monthlyInvestment}
						onChange={(e) => setMonthlyInvestment(e.target.value)}
					/>
					<br />
					Interest :{" "}
					<input
						type="number"
						value={interest}
						onChange={(e) => setInterest(e.target.value)}
					/>
					<br />
					Time :{" "}
					<input
						type="number"
						value={time}
						onChange={(e) => setTime(e.target.value)}
					/>
				</div>
				<div className="output" style={{ border: "2px solid black" }}>
					<p>Invested Amount : {investedAmount}</p>
					<p>Returns : {returns}</p>
					<p>Total value : {totalValue}</p>
				</div>
				<div>
					<PieChart
						series={[
							{
								data: [
									{
										id: 0,
										value: investedAmount - returns,
										label: "Invested amount",
									},
									{
										id: 1,
										value: returns,
										label: "Returns ",
									},
								],
								innerRadius: 60,
							},
						]}
						width={500}
						height={200}
					/>
				</div>
			</div>
		</>
	);
};

export default SIPCalculator;
