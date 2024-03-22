import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import chevronLeft from "@iconify-icons/mdi/chevron-left";
import clipboard from "@iconify-icons/mdi/clipboard-account";
import account from "@iconify-icons/mdi/account";
import barChart from "@iconify-icons/mdi/bar-chart";
import chartLine from "@iconify-icons/mdi/chart-line";
import geoChart from "@iconify-icons/mdi/world";
import stopwatch from "@iconify-icons/mdi/stopwatch";
import color from "@iconify-icons/mdi/color";
import pieChart from "@iconify-icons/mdi/chart-pie";
import logo from "../assets/logo.jpg";

const App = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: clipboard, route: "/" },
    { title: "Users", src: account, route: "/table" },
    { title: "Pie Chart", src: pieChart, gap: true, route: "/pie-chart" },
    { title: "Bar Chart ", src: barChart, route: "/bar-chart" },
    { title: "Line Chart", src: chartLine, route: "/line-chart" },
    { title: "Geo Chart", src: geoChart, route: "/geo-chart" },
    { title: "StopWatch", src: stopwatch, gap: true, route: "/stopwatch" },
    { title: "Color Picker", src: color, route: "/color-picker" },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20"
        } bg-white h-[100vh] p-5 pt-8 relative duration-300`}
      >
        <Icon
          icon={chevronLeft}
          height={30}
          width={30}
          className={`absolute cursor-pointer -right-3 top-9 w-7 bg-white
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <Link to={"/"}>
          <div className="flex gap-x-4 items-center">
            <img
              loading="lazy"
              src={logo}
              height={30}
              width={30}
              alt="logo"
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-[#0088FE] origin-left font-bold text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              So<span className="text-yellow-500">cial.</span>
            </h1>
          </div>
        </Link>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link to={Menu.route}>
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-600 hover:bg-gray-50 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                <Icon icon={Menu.src} height={20} width={20}></Icon>
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {/* <div className="h-screen flex-1 p-7 bg-gray-100 w-full">
        <h1 className="text-2xl font-semibold ">Home Page</h1>
      </div> */}
    </div>
  );
};
export default App;
