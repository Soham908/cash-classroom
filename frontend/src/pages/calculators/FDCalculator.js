import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Button, Input } from "@mui/joy";

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
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <div
        style={{
          border: "2px solid black",
          padding: "20px",
          width: "40%",
          marginRight: "20px",
        }}
      >
        <Input
          type="number"
          value={investmentAmount}
          placeholder="Enter investment amt"
          onChange={(e) => setInvestmentAmount(e.target.value)}
          sx={{ marginBottom: "10px" }} // Add some bottom margin
        />
        <Input
          type="number"
          value={interestValue}
          placeholder="Enter interest"
          onChange={(e) => setInterestValue(e.target.value)}
          sx={{ marginBottom: "10px" }} // Add some bottom margin
        />
        <Input
          type="number"
          value={timePeriod}
          placeholder="Enter time period"
          onChange={(e) => setTimePeriod(e.target.value)}
          sx={{ marginBottom: "10px" }} // Add some bottom margin
        />
        <div
          className="output"
          style={{
            border: "2px solid black",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <p>Invested Amount : {formatCurrentSpacing(investmentAmount)}</p>
          <p>Estimated Returns : {formatCurrentSpacing(returns)}</p>
          <p>Total Value : {formatCurrentSpacing(totalValue)}</p>
        </div>
      </div>
      <div style={{ border: "2px solid black", width: "40%", padding: "20px" }}>
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: returns,
                  label: "Total returns made",
                },
                {
                  id: 1,
                  value: totalValue - returns,
                  label: "Total investment amount",
                },
              ],
              innerRadius: 70,
            },
          ]}
          width={400}
          height={300}
        />
      </div>
    </div>
  );
};

export default FDCalculator;
