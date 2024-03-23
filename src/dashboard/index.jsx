import { Icon } from "@iconify/react";
import userGroup from "@iconify-icons/mdi/user-group";
import carIcon from "@iconify-icons/mdi/car";
import moneyIcon from "@iconify-icons/mdi/money-100";
import homeIcon from "@iconify-icons/mdi/home";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import axios from "axios";
import MixedChart from "../charts/MixedChart";

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
  const [userInDebt, setuserInDebt] = useState(0);
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

      const userInDebt = response.data.filter(
        (user) => user.indebt === "True"
      ).length;
      setuserInDebt(userInDebt)

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
  
 
  if (!chartData || chartData.length === 0) {
    return <Loader />;
  }

  return (
    <div className="m-4 sm:m-10">
        <h1 className="p-4 font-bold text-green-400 text-4xl">Dashboard<span className="text-blue-500">.</span> </h1>
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
        <div className="bg-white h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-400">Users in Debt</p>
              <p className="text-2xl text-gray-500">{userInDebt}</p>
            </div>
            <button
              type="button"
              className="text-2xl opacity-0.9  hover:drop-shadow-xl rounded-full  p-4"
            >
              <Icon icon={moneyIcon} color="gray" />
            </button>
          </div>
          <div className="mt-6">
            <button className="text-xs text-gray-600">View all</button>
          </div>
        </div>
        <MixedChart data={chartData}/>
      </div>
    </div>
  );
};

export default Dashboard;
