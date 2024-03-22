import React from "react";
import LineChartAgeIncome from "./LineChartAgeIncome";
import LineChartTimeSpent from "./LineChartTimeSpent";
import LineChartGenderAge from "./LineChartGenderAge";
import LineChartGenderCount from "./LineChartGender";

const LineCharts = ({ chartData }) => {
  return (
    <div>
      <LineChartTimeSpent />
      <LineChartGenderAge data={chartData} />
      <LineChartAgeIncome data={chartData} />
      <LineChartGenderCount data={chartData} />
    </div>
  );
};

export default LineCharts;
