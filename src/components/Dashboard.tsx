// src/components/Dashboard.tsx
import React from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css'; // Import default CSS for Mosaic
import LineChart from './LineChart'; // The existing LineChart component
import DeviceTable from './DeviceTable'; // The existing DeviceTable component

const Dashboard = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Mosaic<string>
        renderTile={(id, path) => (
          <MosaicWindow<string> path={path} title={`Widget ${id}`}>
            {/* Render different widgets based on the id */}
            {id === '1' ? <LineChart /> : <DeviceTable />}
          </MosaicWindow>
        )}
        initialValue={{
          direction: 'row',
          first: '1', // This will render LineChart
          second: '2', // This will render DeviceTable
          splitPercentage: 50, // Set the initial split size
        }}
      />
    </div>
  );
};

export default Dashboard;
