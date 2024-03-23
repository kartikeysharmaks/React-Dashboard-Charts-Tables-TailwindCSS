import React from "react";
import BarChartAge from "./BarChartAge";
import BarChartLocation from "./BarChartLocation";
import BarChartOwnsCar from "./BarCharOwnsCar";
export const BarCharts = ({ chartData }) => {
  return (
    <div className="mb-10">
      <BarChartOwnsCar data={chartData} />
      <BarChartAge />
      <BarChartLocation />
    </div>
  );
};
