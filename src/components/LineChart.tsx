// src/components/LineChart.tsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'; // This is the line component form react-chartjs-2 library to create line charts easily
import {
  Chart as ChartJS, // This are all the elements that the line chart will contain
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import chartMockData from '../mockData/chartData.json'; // This gets the mock data from the json file

// Registering the necessary scales and components
ChartJS.register(
  CategoryScale,   
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


type TimeRange = "last_30_days" | "last_7_days" | "last_24_hours";  // Ranges of time 
type LineChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
  }[];
};

// LineChart component
const LineChart = () => {
  const [chartData, setChartData] = useState<LineChartData>({ // Initializing the state to store the lineChart data
    labels: [], // Empty labels at the beginnign
    datasets: [
      {
        label: 'Power Usage (kW)',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
    ],
  });

  // This state stores the user selected time range
  const [timeRange, setTimeRange] = useState<TimeRange>("last_30_days");

  // this useEffect runs when the component is displayed or each time the user changes the time range
  useEffect(() => {
    const fetchData = () => {
      try {
        const { labels, data } = chartMockData[timeRange];  // This gets the labels and data from the mock json
        setChartData({  // This updates the empty chart and adds the data
          labels,
          datasets: [
            {
              label: 'Power Usage (kW)',
              data,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();  // Function call to update the timeChart data when a different time range is selected
  }, [timeRange]);  // This ensures the effect runs when the timeRange state changes

  // Event handler when user selects a different time range
  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value as TimeRange);
  };

  return (
    <div>
      <h2>Line Chart: Power Usage Over Time</h2>
      <select onChange={handleRangeChange} value={timeRange}>
        <option value="last_30_days">Last 30 Days</option>
        <option value="last_7_days">Last 7 Days</option>
        <option value="last_24_hours">Last 24 Hours</option>
      </select>

      {/* Add the chart container with styling */}
      <div className="chart-container">
        <Line data={chartData} width={400} height={200} />
      </div>
    </div>
  );
};

export default LineChart;
