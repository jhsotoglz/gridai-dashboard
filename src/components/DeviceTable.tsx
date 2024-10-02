// src/components/DeviceTable.tsx
import React, { useState, useEffect } from 'react';
import deviceMockData from '../mockData/deviceData.json'; // Import mock device data

// This is the structure of the Device data using a TypeScript type
type Device = {
  id: number;
  name: string;
  status: string;
  powerConsumption: string;
};

// Device tabl;e component
const DeviceTable = () => {
  const [devices, setDevices] = useState<Device[]>([]); // Using useState to manage the devices state, initialized as an empty array

  useEffect(() => {
    // Simulate fetching device data from the mock data
    const fetchData = () => {
      try {
        setDevices(deviceMockData.devices); // Assuming the data structure has "devices" array
      } catch (error) {
        console.error("Error fetching device data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Device Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Device Name</th>
            <th>Status</th>
            <th>Power Consumption</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>{device.id}</td>
              <td>{device.name}</td>
              <td>{device.status}</td>
              <td>{device.powerConsumption}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceTable;
