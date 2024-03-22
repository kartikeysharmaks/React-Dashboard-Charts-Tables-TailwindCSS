import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-google-charts";
import Loader from "../../components/Loader";

const PieChartLocation = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get("https://dashboard-apis-nodejs-express-js.onrender.com/api/locationDistribution")
      .then((response) => {
        const data = response.data;
        const chartData = [["Location", "Number of Users"]];
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
        Pie Chart: Location Distribution
      </h1>
      <Chart
        width={"70vw"}
        height={"80vh"}
        chartType="PieChart"
        data={chartData}
        options={{
          title: "Location Distribution",
          legend: { position: "bottom" },
          pieSliceText: "label",
          slices: {
            1: { offset: 0.1, color: "#ffb71b" },
            2: { offset: 0.2, color: "#2aaae1" },
            3: { offset: 0.3, color: "#f26825" },
          },
        }}
      />
    </div>
  );
};

export default PieChartLocation;
