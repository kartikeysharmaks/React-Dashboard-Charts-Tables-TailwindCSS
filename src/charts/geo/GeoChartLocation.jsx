import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import Loader from '../../components/Loader';

const GeoChartLocation = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get('https://dashboard-apis-nodejs-express-js.onrender.com/api/locationDistribution')
      .then(response => {
        const data = response.data;
        const chartData = [['Location', 'Number of Users']];
        data.forEach(item => {
          chartData.push([item._id, item.count]);
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
      <h1 className='text-[20px] md:text-[28px] py-2 font-bold'>Geographic Chart: User Distribution</h1>
      <Chart
        width={'70vw'}
        height={'80vh'}
        chartType="GeoChart"
        data={chartData}
        options={{
          region: 'world',
          colorAxis: { colors: ['#FFA07A', '#FF6347', '#FF4500'] },
          legend: { numberFormat: '0' },
        }}
      />
    </div>
  );
};

export default GeoChartLocation;
