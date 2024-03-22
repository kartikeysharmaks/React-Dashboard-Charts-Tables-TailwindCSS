import React from "react";
import BarChartAge from "./BarChartAge";
import BarChartLocation from "./BarChartLocation";
import BarChartOwnsCar from "./BarCharOwnsCar";
export const BarCharts = ({ chartData }) => {
  return (
    <div>
      <BarChartOwnsCar data={chartData} />
      <BarChartAge />
      <BarChartLocation />
    </div>
  );
};
