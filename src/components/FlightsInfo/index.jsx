import React, { useEffect, useState } from 'react';

import InfoCard from './components/InfoCard';

import './styles.css';

function FlightsInfo({ socket }) {
  const [flights, setFlights] = useState([]);

  function updateFlights() {
    socket.emit('FLIGHTS', {});
  }

  useEffect(() => {
    socket.on('FLIGHTS', (data) => {
      setFlights(data);
    });
    updateFlights();
    return () => socket.disconnect();
  }, []);

  return (
    <div className="info-container">
      <button onClick={() => updateFlights()}>Actualizar</button>
      <div className="info">
        {flights.map((flight, index) => (
          <InfoCard key={index} props={flight} />
        ))}
      </div>
    </div>
  );
}

export default FlightsInfo;
