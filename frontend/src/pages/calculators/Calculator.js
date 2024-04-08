import styles from "./calculator.module.css";
import EMICalculator from "./EMICalculator";
import FDCalculator from "./FDCalculator";
import SIPCalculator from "./SIPCalculator";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const Calculator = () => {
	const calOptions = [
		"Equated Monthly Installment(EMI)",
		"Fixed Deposit(FD)",
		"Systematic Investment Plan(SIP)",
	];
	const [selectedCal, setSelectedCal] = useState(calOptions[0]);

	const returnSelectedCal = () => {
		switch (selectedCal) {
			case "Equated Monthly Installment(EMI)":
				return <EMICalculator />;
				break;
			case "Fixed Deposit(FD)":
				return <FDCalculator />;
				break;
			case "Systematic Investment Plan(SIP)":
				return <SIPCalculator />;
				break;
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.inputContainer}>
				<label htmlFor="combo-box-demo">Calculator : </label>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={selectedCal}
					onChange={(e) => setSelectedCal(e.target.value)}
					sx={{ width: "350px" }}
				>
					{calOptions.map((el) => (
						<MenuItem value={el}>{el}</MenuItem>
					))}
				</Select>
			</div>
			<div className={styles.selectedCal}>{returnSelectedCal()}</div>
		</div>
	);
};

export default Calculator;
