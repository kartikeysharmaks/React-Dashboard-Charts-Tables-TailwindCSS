import React from "react";
import { Chart } from "react-google-charts";
import Loader from "../../components/Loader";

const BarChartOwnsCar = ({ data }) => {
  if (!data || data.length === 0) {
    return <Loader />;
  }

  let malesOwnCar = 0;
  let malesDoNotOwnCar = 0;
  let femalesOwnCar = 0;
  let femalesDoNotOwnCar = 0;
  let maleCount = 0;
  let femaleCount = 0;
  let nonBinaryCount = 0;
  let nonBinaryOwnsCar = 0;
  let nonBinaryDoNotOwnsCar = 0;

  data.forEach((item) => {
    if (item.gender === "male") {
      maleCount++;
      if (item.ownsCar === "True") {
        malesOwnCar++;
      } else {
        malesDoNotOwnCar++;
      }
    } else if (item.gender === "female") {
      femaleCount++;
      if (item.ownsCar === "True") {
        femalesOwnCar++;
      } else {
        femalesDoNotOwnCar++;
      }
    } else if (item.gender === "non-binary") {
      nonBinaryCount++;
      if (item.ownsCar === "True") {
        nonBinaryOwnsCar++;
      } else {
        nonBinaryDoNotOwnsCar++;
      }
    }
  });

  const chartData = [
    ["Gender", "Total Count", "Owns Car", "Does Not Own Car"],
    ["Males", maleCount, malesOwnCar, malesDoNotOwnCar],
    ["Females", femaleCount, femalesOwnCar, femalesDoNotOwnCar],
    ["Non-Binary", nonBinaryCount, nonBinaryOwnsCar, nonBinaryDoNotOwnsCar],
  ];

  return (
    <div className="m-4 md:m-8">
      <h2 className="text-[20px] md:text-[28px] py-2 font-bold">
        Gender Car Ownership
      </h2>
      <Chart
        width={"70vw"}
        height={"80vh"}
        chartType="BarChart"
        data={chartData}
        options={{
          title: "Gender Car Ownership",
          animation: {
            startup: true,
            duration: 1000,
            easing: "out",
          },
          hAxis: { title: "Count", minValue: 0 },
          vAxis: { title: "Gender", gridlines: { count: 0 } },
          legend: { position: "bottom" },
        }}
      />
    </div>
  );
};

export default BarChartOwnsCar;
