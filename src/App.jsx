import React from 'react';

import { io } from 'socket.io-client';

import Chat from './components/Chat';
import FlightsInfo from './components/FlightsInfo';
// eslint-disable-next-line import/order
import FlightTracker from './components/FlightTracker/';

import './App.css';

import { ENDPOINT } from './constants';

function App() {
  const socket = io(ENDPOINT, {
    path: '/flights/',
    transports: ['websocket'],
  });

  return (
    <div className="app-container">
      <div className="map-container">
        <FlightTracker socket={socket} />
        <FlightsInfo socket={socket} />
      </div>
      <div className="chat-container">
        <Chat socket={socket} />
      </div>
    </div>
  );
}

export default App;
