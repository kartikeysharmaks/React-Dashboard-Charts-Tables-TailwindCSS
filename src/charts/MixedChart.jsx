import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const MixedChart = ({ data }) => {
  const getIncomeData = () => {
    const incomeCounts = {};
    data.forEach((user) => {
      const income = user.income;
      const incomeUSD = income * 1.35;
      const bin = Math.floor(incomeUSD / 1000) * 1000;
      incomeCounts[bin] = (incomeCounts[bin] || 0) + 1;
    });
    return Object.entries(incomeCounts).map(([income, count]) => ({
      income: parseInt(income),
      count,
    }));
  };

  const getAgeData = () => {
    const ageCounts = {};
    data.forEach((user) => {
      const age = user.age;
      ageCounts[age] = (ageCounts[age] || 0) + 1;
    });
    return Object.entries(ageCounts).map(([age, count]) => ({
      age: parseInt(age),
      count,
    }));
  };

  const getProfessionData = () => {
    const professionCounts = {};
    data.forEach((user) => {
      const profession = user.profession;
      professionCounts[profession] = (professionCounts[profession] || 0) + 1;
    });
    return Object.entries(professionCounts).map(([profession, count]) => ({
      profession,
      count,
    }));
  };

  const getTimeSpentData = () => {
    const timeSpentCounts = {};
    data.forEach((user) => {
      const timeSpent = user.timeSpent;
      timeSpentCounts[timeSpent] = (timeSpentCounts[timeSpent] || 0) + 1;
    });
    return Object.entries(timeSpentCounts).map(([timeSpent, count]) => ({
      timeSpent,
      count,
    }));
  };

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const getPlatformData = () => {
    const platformCounts = {};
    data.forEach((user) => {
      const profession = user.profession;
      const platform = user.platform;
      platformCounts[profession] = platformCounts[profession] || {};
      platformCounts[profession][platform] =
        (platformCounts[profession][platform] || 0) + 1;
    });
    return Object.entries(platformCounts).map(([profession, platforms]) => ({
      profession,
      ...platforms,
    }));
  };

  const renderCustomBarShape = (props) => {
    const { x, y, width, height, fill } = props;
    return <path d={getPath(x, y, width, height)} fill={fill} stroke="none" />;
  };

  const getOverlapData = () => {
    let debtCount = 0;
    let carOwnerCount = 0;
    let homeOwnerCount = 0;

    data.forEach((user) => {
      if (user.indebt === "True") {
        debtCount++;
      }
      if (user.ownsCar === "True") {
        carOwnerCount++;
      }
      if (user.isHomeOwner === "True") {
        homeOwnerCount++;
      }
    });

    return [
      { name: "Debt", value: debtCount },
      { name: "Car Owner", value: carOwnerCount },
      { name: "Home Owner", value: homeOwnerCount },
    ];
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap gap-12 mt-4">
        <div className="m-3">
          <h2 className="text-lg font-medium mb-2 text-gray-500">
            Platform Usage by Profession
          </h2>
          <div className="bg-white h-80 rounded-xl w-72 lg:w-96">
            <ResponsiveContainer>
              <BarChart
                width={800}
                height={400}
                data={getPlatformData()}
                margin={{ top: 30, right: 30, left: 0, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="profession" />
                <YAxis />
                <Tooltip />
                <Legend align="right" />
                <Bar dataKey="Instagram" stackId="a" fill="#8884d8" />
                <Bar dataKey="Facebook" stackId="a" fill="#82ca9d" />
                <Bar dataKey="YouTube" stackId="a" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="m-3">
          <h2 className="text-lg font-medium mb-2 text-gray-500">
            Monthly Income Distribution (USD)
          </h2>
          <div className="bg-white h-80 rounded-xl w-72 lg:w-96">
            <ResponsiveContainer>
              <BarChart
                width={600}
                height={300}
                data={getIncomeData()}
                margin={{ top: 30, right: 30, left: 0, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="income"
                  label={{
                    value: "Income (USD)",
                    position: "bottom",
                    offset: 0,
                  }}
                />
                <YAxis
                  label={{
                    value: "Count",
                    angle: -90,
                    position: "left",
                    offset: -10,
                  }}
                />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#8884d8"
                  shape={renderCustomBarShape}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="m-3">
          <h2 className="text-lg font-medium mb-2 text-gray-500">
            Age Distribution
          </h2>
          <div className="bg-white h-80 rounded-xl w-72 lg:w-96">
            <ResponsiveContainer>
              <PieChart width={300} height={300}>
                <Pie
                  dataKey="count"
                  data={getAgeData()}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {getAgeData().map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="m-3">
          <h2 className="text-lg font-medium mb-2 text-gray-500">
            Profession Distribution
          </h2>
          <div className="bg-white h-80 rounded-xl w-72 lg:w-96 ">
            <ResponsiveContainer>
              <BarChart
                width={300}
                height={300}
                data={getProfessionData()}
                margin={{ top: 30, right: 15, left: 0, bottom: 30 }}
              >
                <XAxis dataKey="profession" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="m-3">
          <h2 className="text-lg font-medium mb-2 text-gray-500">
            Time Spent Distribution
          </h2>
          <div className="bg-white h-80 rounded-xl w-72 lg:w-96">
            <ResponsiveContainer>
              <BarChart
                width={300}
                height={300}
                data={getTimeSpentData()}
                margin={{ top: 30, right: 30, left: 0, bottom: 30 }}
              >
                <XAxis
                  dataKey="timeSpent"
                  label={{
                    value: "Time (in minutes)",
                    position: "bottom",
                    offset: 0,
                  }}
                />
                <YAxis
                  label={{
                    value: "Count",
                    position: "left",
                    offset: -10,
                    angle: -90,
                
                  }}
                />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="m-3">
          <h2 className="text-lg font-medium mb-2 text-gray-500">
            Users Financial Asset
          </h2>
          <div className="bg-white h-80 rounded-xl w-72 lg:w-96">
            <ResponsiveContainer>
              <PieChart width={400} height={400}>
                <Pie
                  data={getOverlapData()}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {getOverlapData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MixedChart;
