import React from 'react';

import Chat from './components/Chat';
import FlightsInfo from './components/FlightsInfo';
import FlightTracker from './components/FlightTracker/';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="map-container">
        <FlightTracker />
        <FlightsInfo />
      </div>
      <div className="chat-container">
        <Chat />
      </div>
    </div>
  );
}

export default App;
