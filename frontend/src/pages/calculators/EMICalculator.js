import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

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
          <p>EMI : {formatCurrentSpacing(emiValue)}</p>
          <p>Loan Amount : {formatCurrentSpacing(loanAmount)}</p>
          <p>Total Interest : {formatCurrentSpacing( emiValue * time * 12 - loanAmount )}</p>
          <p>Total Amount : {formatCurrentSpacing(loanAmount + emiValue)}</p>
        </div>
        <div>
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
            width={500}
            height={200}
          />
        </div>
      </div>
    </>
  );
};

export default EMICalculator;
