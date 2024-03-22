// Import necessary libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import Loader from "../../components/Loader";

const PieChartInterest = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/interestDistribution")
      .then((response) => {
        const data = response.data;
        const chartData = [["Interest", "Number of Users"]];
        data.forEach((item) => {
          chartData.push([item._id, item.count]);
        });
        setChartData(chartData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  if (!chartData || chartData.length === 0) {
    return <Loader />;
  }

  return (
    <div className="m-4 md:m-8">
      <h1 className="text-[20px] md:text-[28px] py-2 font-bold">
        Pie Chart: Interest Distribution
      </h1>
      <Chart
        width={"70vw"}
        height={"80vh"}
        chartType="PieChart"
        data={chartData}
        options={{
          title: "Interest Distribution",
          legend: { position: "bottom" },
          pieSliceText: "label",
        }}
      />
    </div>
  );
};

export default PieChartInterest;
