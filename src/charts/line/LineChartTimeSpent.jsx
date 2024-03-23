import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import Loader from '../../components/Loader';

const LineChartTimeSpent = () => {
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    axios.get('https://dashboard-apis-nodejs-express-js.onrender.com/api/averageTimeSpent')
      .then(response => {
        const data = response.data;
        const chartData = [['Platform', 'Average Time Spent']];
        data.forEach(item => {
          chartData.push([item._id, item.averageTimeSpent]);
        });
        setChartData(chartData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (!chartData || chartData.length === 0) {
    return <Loader />;
  }

  return (
    <div className='m-4 md:m-8'>
      <h1 className='text-[20px] md:text-[28px] py-2 font-bold'>Line Chart: Average Time Spent on Each Platform</h1>
      <Chart
        width={'70vw'}
        height={'80vh'}
        chartType="LineChart"
        data={chartData}
        options={{
          title: 'Average Time Spent on Each Platform',
          animation: {
            startup: true, 
            duration: 1000, 
            easing: 'out', 
          },
          legend: { position: 'none' },
          hAxis: { title: 'Platform' },
          vAxis: { title: 'Average Time Spent (minutes)' }
        }}
      />
    </div>
  );
};

export default LineChartTimeSpent;
