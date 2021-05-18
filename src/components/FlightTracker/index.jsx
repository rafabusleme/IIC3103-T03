/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { io } from 'socket.io-client';

import './styles.css';
import 'leaflet/dist/leaflet.css';
import { ENDPOINT } from '../../constants';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  shadowSize: null,
  iconSize: new L.Point(30, 40),
  className: 'airplane-icon',
});

const blackOptions = { color: 'black' };

function FlightTracker() {
  const [flights, setFlights] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [positions, setPositions] = useState({});

  useEffect(() => {
    const socket = io(ENDPOINT, {
      path: '/flights/',
    });

    // socket.on('FLIGHTS', (data) => {
    //   console.log(data);
    //   setFlights((prevState) => [...prevState, data]);
    // });

    socket.on('POSITION', (data) => {
      const auxFlights = positions;
      auxFlights[data.code] = data.position;
      setPositions(auxFlights);
    });

    return () => socket.disconnect();
  }, []);
  return (
    <MapContainer className="map" center={[0, 0]} zoom={2} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {Object.keys(positions).map((key, index) => (
        <Marker key={key} position={positions[key]}>
          <Popup>{key}</Popup>
        </Marker>
      ))}
      {flights.map((flight, key) => (
        <Polyline
          key={key}
          positions={[flight.origin, flight.destination]}
          pathOptions={blackOptions}
        />
      ))}
    </MapContainer>
  );
}

export default FlightTracker;
