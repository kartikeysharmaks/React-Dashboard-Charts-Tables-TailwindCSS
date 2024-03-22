import React from "react";
import { Chart } from "react-google-charts";
import Loader from "../../components/Loader";

const LineChartGenderCount = ({ data }) => {
  const genderData = [["Gender", "Count"]];
  const genderCounts = data.reduce((acc, curr) => {
    acc[curr.gender] = (acc[curr.gender] || 0) + 1;
    return acc;
  }, {});
  for (const gender in genderCounts) {
    genderData.push([gender, genderCounts[gender]]);
  }
  if (!data || data.length === 0) {
    return <Loader/>;
  }
  return (
    <div className='m-4 md:m-8'>
      <h1 className='text-[20px] md:text-[28px] py-2 font-bold'>Line Chart: Gender Count</h1>
      <Chart
        width={"70vw"}
        height={"80vh"}
        chartType="LineChart"
        data={genderData}
        options={{
          title: "Genders Count",
          animation: {
            startup: true, 
            duration: 1000, 
            easing: 'out', 
          },
          legend: { position: "none" },
          hAxis: { title: "Genders" },
          vAxis: { title: "Count" },
        }}
      />
    </div>
  );
};

export default LineChartGenderCount;
