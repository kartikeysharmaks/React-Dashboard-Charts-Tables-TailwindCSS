// Import necessary libraries
import React from "react";
import { Chart } from "react-google-charts";
import Loader from "../../components/Loader";

const LineChartAgeIncome = ({ data }) => {
  if (!data || data.length === 0) {
    return <Loader />;
  }
  const ageIncomeData = [["Age", "Income"]];
  data.forEach((item) => {
    ageIncomeData.push([item.age, item.income]);
  });

  return (
    <div className="m-4 md:m-8">
      <h1 className="text-[20px] md:text-[28px] py-2 font-bold">
        Line Chart: Age vs Income Distribution
      </h1>
      <Chart
        width={"70vw"}
        height={"80vh"}
        chartType="LineChart"
        data={ageIncomeData}
        options={{
          title: "Age vs Income Distribution",
          animation: {
            startup: true,
            duration: 1000,
            easing: "out",
          },
          legend: { position: "none" },
          hAxis: { title: "Age" },
          vAxis: { title: "Income" },
        }}
      />
    </div>
  );
};

export default LineChartAgeIncome;
