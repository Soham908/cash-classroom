import { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const EMICalculator = () => {
	const [loanAmount, setLoanAmount] = useState(100000);
	const [interest, setInterest] = useState(5);
	const [time, setTime] = useState(1);

	// EMI = [P x R x (1+R) ^N]/ [(1+R) ^ (N-1)]

	const totalValue = loanAmount + (loanAmount * interest * time) / 100;
	// const totalInterest = (totalValue - loanAmount).toFixed(2);
	const totalInterest = loanAmount * (interest / 100) * time;

	function calculateEMI(principal, interestRate, loanTenure) {
		// Convert interest rate to monthly rate
		const monthlyInterestRate = interestRate / (100 * 12);

		// Calculate number of payments
		const totalPayments = loanTenure * 12;

		// Calculate EMI using the formula
		const emi =
			(principal *
				monthlyInterestRate *
				Math.pow(1 + monthlyInterestRate, totalPayments)) /
			(Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

		return emi.toFixed(2); // Round to two decimal places
	}

	const emi = calculateEMI(loanAmount, interest, time);

	return (
		<>
			<h1>EMI calculator</h1>
			<div style={{ display: "flex", border: "2px solid black" }}>
				<div className="calculator-form" style={{ border: "2px solid black" }}>
					Total Investment :{" "}
					<input
						type="number"
						value={loanAmount}
						onChange={(e) => setLoanAmount(e.target.value)}
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
					<p>EMI : {emi}</p>
					<p>Loan Amount : {loanAmount}</p>
					<p>Total Interest : {totalInterest}</p>
					<p>Total Amount : {totalValue}</p>
				</div>
				<div>
					<PieChart
						series={[
							{
								data: [
									{
										id: 0,
										value: loanAmount - totalInterest,
										label: "Principal Amount",
									},
									{
										id: 1,
										value: totalInterest,
										label: "Interest Amount",
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

export default EMICalculator;
