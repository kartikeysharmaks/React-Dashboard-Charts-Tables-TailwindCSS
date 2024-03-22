// Import necessary libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import Loader from "../../components/Loader";

const BarChartAge = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get("https://dashboard-apis-nodejs-express-js.onrender.com/api/ageDistribution")
      .then((response) => {
        const data = response.data;
        // Prepare data for Bar Chart
        const chartData = [["Age Group", "Number of Users"]];
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
        Bar Chart: Age Distribution
      </h1>
      <Chart
        width={"70vw"}
        height={"80vh"}
        chartType="BarChart"
        data={chartData}
        options={{
          title: "Age Distribution",
          animation: {
            startup: true,
            duration: 1000,
            easing: "out",
          },
          legend: { position: "none" },
          hAxis: { title: "Number of Users" },
          vAxis: { title: "Age Group", gridlines: { count: 0 }, minValue: 0 },
        }}
      />
    </div>
  );
};

export default BarChartAge;
