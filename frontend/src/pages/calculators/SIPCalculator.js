import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

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
      <h1>SIP calculator</h1>
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
          <p>
            Invested Amount :{" "}
            {formatCurrentSpacing(monthlyInvestment * time * 12)}
          </p>
          <p>Returns : {formatCurrentSpacing(totalReturn)}</p>
          <p>Total value : {formatCurrentSpacing(totalValue)}</p>
        </div>
        <div>
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
            width={500}
            height={200}
          />
        </div>
      </div>
    </>
  );
};

export default SIPCalculator;
