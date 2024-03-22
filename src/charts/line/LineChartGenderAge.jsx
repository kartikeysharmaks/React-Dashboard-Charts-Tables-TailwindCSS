// GenderAgeLineChart.js
import React from "react";
import { Chart } from "react-google-charts";
import Loader from "../../components/Loader";

const LineChartGenderAge = ({ data }) => {
  if (!data || data.length === 0) {
    return <Loader />;
  }

  const males = data.filter((item) => item.gender === "male");
  const females = data.filter((item) => item.gender === "female");

  const maleAgeDistribution = {};
  const femaleAgeDistribution = {};

  males.forEach((item) => {
    maleAgeDistribution[item.age] = (maleAgeDistribution[item.age] || 0) + 1;
  });

  females.forEach((item) => {
    femaleAgeDistribution[item.age] =
      (femaleAgeDistribution[item.age] || 0) + 1;
  });

  const chartData = [["Age", "Male", "Female"]];
  const maxAge = Math.max(
    ...Object.keys(maleAgeDistribution),
    ...Object.keys(femaleAgeDistribution)
  );
  for (let i = 0; i <= maxAge; i++) {
    chartData.push([
      i,
      maleAgeDistribution[i] || 0,
      femaleAgeDistribution[i] || 0,
    ]);
  }

  return (
    <div className="m-4 md:m-8">
      <h2 className="text-[20px] md:text-[28px] py-2 font-bold">
        Line Chart: Gender Age Distribution
      </h2>
      <Chart
        width={"70vw"}
        height={"80vh"}
        chartType="LineChart"
        data={chartData}
        options={{
          title: "Gender Age Distribution",
          legend: { position: "bottom" },
          animation: {
            startup: true,
            duration: 1000,
            easing: "out",
          },
          hAxis: {
            title: "Age",
            minValue: 0,
          },
          vAxes: {
            0: { title: "Count" },
          },
          series: {
            0: { color: "red" },
            1: { color: "blue" },
          },
        }}
      />
    </div>
  );
};

export default LineChartGenderAge;
