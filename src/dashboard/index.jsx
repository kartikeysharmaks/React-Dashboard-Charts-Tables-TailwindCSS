import { Icon } from "@iconify/react";
import userGroup from "@iconify-icons/mdi/user-group";
import carIcon from "@iconify-icons/mdi/car";
import homeIcon from "@iconify-icons/mdi/home";
import Loader from "../components/Loader";
import {
  BarChart,
  Bar,
  Pie,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PieChart,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [averageAge, setAverageAge] = useState(0);
  const [averageIncome, setAverageIncome] = useState(0);
  const [genderCounts, setGenderCounts] = useState({
    male: 0,
    female: 0,
    nonBinary: 0,
  });
  const [carOwnersCount, setCarOwnersCount] = useState(0);
  const [homeOwnersCount, setHomeOwnersCount] = useState(0);
  const [interestCounts, setInterestCounts] = useState({});
  const [platformCounts, setPlatformCounts] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://dashboard-apis-nodejs-express-js.onrender.com/api/getalldata");
      setChartData(response.data);

      // Calculate statistics
      const totalUsers = response.data.length;
      setTotalUsers(totalUsers);

      const totalAge = response.data.reduce((acc, curr) => acc + curr.age, 0);
      const averageAge = totalAge / totalUsers;
      setAverageAge(averageAge);

      const totalIncome = response.data.reduce(
        (acc, curr) => acc + curr.income,
        0
      );
      const averageIncome = totalIncome / totalUsers;
      setAverageIncome(averageIncome);

      const genderCounts = response.data.reduce((acc, curr) => {
        acc[curr.gender] = (acc[curr.gender] || 0) + 1;
        return acc;
      }, {});
      setGenderCounts(genderCounts);

      const carOwnersCount = response.data.filter(
        (user) => user.ownsCar === "True"
      ).length;
      setCarOwnersCount(carOwnersCount);

      const homeOwnersCount = response.data.filter(
        (user) => user.isHomeOwner === "True"
      ).length;
      setHomeOwnersCount(homeOwnersCount);

      const interestCounts = response.data.reduce((acc, curr) => {
        const interests = curr.interests.split(",");
        interests.forEach((interest) => {
          acc[interest] = (acc[interest] || 0) + 1;
        });
        return acc;
      }, {});
      setInterestCounts(interestCounts);

      const platformCounts = response.data.reduce((acc, curr) => {
        acc[curr.platform] = (acc[curr.platform] || 0) + 1;
        return acc;
      }, {});
      setPlatformCounts(platformCounts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
    "#FF6384",
    "#36A2EB",
  ];
  
 
  if (!chartData || chartData.length === 0) {
    return <Loader />;
  }

  return (
    <div className="m-10">
        <h1 className="p-4 font-bold text-green-400 text-3xl">Dashboard</h1>
      <div className="flex flex-wrap overflow-hidden">
        <div className="bg-white h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-400">Total User</p>
              <p className="text-2xl text-gray-500">{chartData.length}</p>
            </div>
            <button
              type="button"
              className="text-2xl opacity-0.9  hover:drop-shadow-xl rounded-full  p-4"
            >
              <Icon icon={userGroup} color="gray" />
            </button>
          </div>
          <div className="mt-6">
            <button className="text-xs text-gray-600">View all</button>
          </div>
        </div>
        <div className="bg-white h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-400">Total Car Owners</p>
              <p className="text-2xl text-gray-500">{carOwnersCount}</p>
            </div>
            <button
              type="button"
              className="text-2xl opacity-0.9  hover:drop-shadow-xl rounded-full  p-4"
            >
              <Icon icon={carIcon} color="gray" />
            </button>
          </div>
          <div className="mt-6">
            <button className="text-xs text-gray-600">View all</button>
          </div>
        </div>
        <div className="bg-white h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-400">Total Home Owners</p>
              <p className="text-2xl text-gray-500">{homeOwnersCount}</p>
            </div>
            <button
              type="button"
              className="text-2xl opacity-0.9  hover:drop-shadow-xl rounded-full  p-4"
            >
              <Icon icon={homeIcon} color="gray" />
            </button>
          </div>
          <div className="mt-6">
            <button className="text-xs text-gray-600">View all</button>
          </div>
        </div>
        <div className="bg-white h-60 rounded-xl w-full lg:w-80 m-3 flex items-center justify-center ">
          <ResponsiveContainer>
            <PieChart width={300} height={300}>
              <Pie
                data={Object.entries(genderCounts)}
                dataKey="1"
                nameKey="0"
                innerRadius={50}
                outerRadius={100}
                fill="#8884d8"
              >
                {Object.entries(genderCounts).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white h-60 rounded-xl w-full lg:w-80 m-3 flex items-center justify-center">
          <ResponsiveContainer>
            <BarChart
              width={300}
              height={300}
              data={Object.entries(interestCounts)}
            >
              <Bar dataKey="1" fill="#82ca9d">
                {Object.entries(interestCounts).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white h-60 rounded-xl w-full lg:w-80 m-3 flex items-center justify-center">
          <ResponsiveContainer>
            <RadialBarChart
              width={300}
              height={300}
              data={Object.entries(platformCounts)}
            >
              <RadialBar
                startAngle={90}
                endAngle={-270}
                minAngle={15}
                background
                clockWise
                dataKey="1"
                fill="#8884d8"
              >
                {Object.entries(platformCounts).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </RadialBar>
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
