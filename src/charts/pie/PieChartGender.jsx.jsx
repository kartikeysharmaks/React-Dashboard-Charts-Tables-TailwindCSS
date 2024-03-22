// Import necessary libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import Loader from "../../components/Loader";

const PieChartGender = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get("https://dashboard-apis-nodejs-express-js.onrender.com/api/genderDistribution")
      .then((response) => {
        const data = response.data;

        const chartData = [["Gender", "Count"]];
        data.forEach((item) => {
          chartData.push([item._id, item.count]);
        });
        setChartData(chartData);
      })
      .catch((error) => {
        console.error("Error fetching gender data:", error);
      });
  }, []);
  if (!chartData || chartData.length === 0) {
    return <Loader />;
  }

  return (
    <div className="m-4 md:m-8">
      <h1 className="text-[20px] md:text-[28px] py-2 font-bold">
        Pie Chart: Gender Distribution
      </h1>
      <Chart
        width={"70vw"}
        height={"80vh"}
        chartType="PieChart"
        data={chartData}
        options={{
          title: "Gender Distribution",
          legend: { position: "bottom" },
          // is3D: true,
          pieHole: 0.4,
        }}
      />
    </div>
  );
};

export default PieChartGender;
