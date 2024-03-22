import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar.jsx";
import Table from "./table/index.jsx";
import { PieCharts } from "./charts/pie/index.jsx";
import { BarCharts } from "./charts/bar/index.jsx";
import GeoChart from "./charts/geo/GeoChartLocation.jsx";
import Dashboard from "./dashboard/index.jsx";
import LineCharts from "./charts/line/index.jsx";
import Stopwatch from "./components/StopWatch.jsx";
import ColorPicker from "./components/ColorPicker.jsx";
import axios from "axios";

const App = () => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    axios.get('https://dashboard-apis-nodejs-express-js.onrender.com/api/getalldata')
      .then(response => {
        const data = response.data;
        // Prepare data for Line Chart
        setChartData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <Router>
        <div className="flex max-h-screen bg-gray-50 m-auto  font-sans">
          <Sidebar />
          <div className="overflow-y-scroll scrollbar-hide">
            <Routes>
              <Route path="/geo-chart" element={<GeoChart />} />
              <Route path="/pie-chart" element={<PieCharts />} />
              <Route path="/bar-chart" element={<BarCharts chartData={chartData}/>} />
              <Route path="/line-chart" element={<LineCharts chartData={chartData}/>} />
              <Route path="/table" element={<Table />} />
              <Route path="/stopwatch" element={<Stopwatch />} />
              <Route path="/color-picker" element={<ColorPicker />} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
