import { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const FDCalculator = () => {
	const [totalInvestment, setTotalInvestment] = useState(100000);
	const [interest, setInterest] = useState(5);
	const [time, setTime] = useState(1);

	const totalValue =
		totalInvestment + (totalInvestment * interest * time) / 100;

	const returns = totalValue - totalInvestment;
	return (
		<>
			<h1>FD calculator</h1>
			<div style={{ display: "flex", border: "2px solid black" }}>
				<div className="calculator-form" style={{ border: "2px solid black" }}>
					Total Investment :{" "}
					<input
						type="number"
						value={totalInvestment}
						onChange={(e) => setTotalInvestment(e.target.value)}
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
					<p>Invested Amount : {totalInvestment}</p>
					<p>Estimated Returns : {returns}</p>
					<p>Total Value : {totalValue}</p>
				</div>
				<div>
					<PieChart
						series={[
							{
								data: [
									{ id: 0, value: returns, label: "Return" },
									{
										id: 1,
										value: totalValue - returns,
										label: "Total Investment",
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

export default FDCalculator;
