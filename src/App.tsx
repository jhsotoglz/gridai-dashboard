// src/App.tsx
import React, { useState } from 'react';
import './App.css';
import LineChart from './components/LineChart';
import DeviceTable from './components/DeviceTable';
import { Mosaic, MosaicWindow, MosaicNode } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';

const generateRandomId = () => String(Math.floor(Math.random() * 1000));

function App() {
  const [currentNode, setCurrentNode] = useState<MosaicNode<string> | null>({
    direction: 'row',
    first: '1',  // Line Chart
    second: '2', // Device Table
    splitPercentage: 50,
  });

  // State to keep track of widget types
  const [widgetTypes, setWidgetTypes] = useState<{ [key: string]: string }>({
    '1': 'lineChart',
    '2': 'deviceTable',
  });

  const addWidget = (type: 'lineChart' | 'deviceTable') => {
    const newId = generateRandomId();
    const newWidgetNode: MosaicNode<string> = newId;

    // Add the new widget type to the state
    setWidgetTypes(prevTypes => ({
      ...prevTypes,
      [newId]: type, // Associate the new ID with its widget type
    }));

    // Update the current layout with the new widget
    setCurrentNode(prevState => {
      if (!prevState) {
        return newWidgetNode;
      }

      return {
        direction: 'row',
        first: prevState,
        second: newWidgetNode,
        splitPercentage: 50,
      };
    });
  };

  const renderTile = (id: string) => {
    // Use the widgetTypes state to decide which component to render
    if (widgetTypes[id] === 'lineChart') {
      return <LineChart />;
    }
    if (widgetTypes[id] === 'deviceTable') {
      return <DeviceTable />;
    }
    return null; 
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Power Usage Dashboard</h1>

        {/* Buttons to Add Widgets */}
        <div>
          <button className="add-button" onClick={() => addWidget('lineChart')}>Add Line Chart</button>
          <button className="add-button" onClick={() => addWidget('deviceTable')}>Add Device Table</button>
        </div>

        {/* Mosaic Layout */}
        <div style={{ height: '80vh', marginTop: '20px' }}>
          <Mosaic<string>
            renderTile={(id, path) => (
              <MosaicWindow<string> path={path} title={widgetTypes[id] === 'lineChart' ? 'Line Chart' : 'Device Table'}>
                {renderTile(id)}
              </MosaicWindow>
            )}
            value={currentNode}
            onChange={setCurrentNode}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
