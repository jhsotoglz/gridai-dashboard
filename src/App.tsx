// src/App.tsx
import React, { useState } from 'react';
import './App.css';
import LineChart from './components/LineChart';
import DeviceTable from './components/DeviceTable';

function App() {
  const [activeTab, setActiveTab] = useState<string>('lineChart'); // This state keeps track of what tab is currently displayed

  const handleTabClick = (tab: string) => {
    setActiveTab(tab); // This switches between lineChart and deviceTable
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Power Usage Dashboard</h1>

        {/* Tab Navigation */}
        <div className="tabs">
          <button 
            // If activeTab is lineChart, then set it to active. Otherwise apply no class ('')
            className={activeTab === 'lineChart' ? 'active' : ''}
            // When clicked, it switches the activeTab to lineChart
            onClick={() => handleTabClick('lineChart')}
          >
            Line Chart
          </button>
          <button 
            // If activeTab is deviceTable applies the active class to device table. Otherwise apply no class ('')
            className={activeTab === 'deviceTable' ? 'active' : ''}
             // When clicked, it switches the activeTab to deviceTable
            onClick={() => handleTabClick('deviceTable')}
          >
            Device Table
          </button>
        </div>

        {/* Conditional Rendering Based on Active Tab */}
        {activeTab === 'lineChart' && <LineChart />}
        {activeTab === 'deviceTable' && <DeviceTable />}
      </header>
    </div>
  );
}

export default App;
