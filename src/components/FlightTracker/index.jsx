import React, { useEffect, useState } from 'react';

import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';

import './styles.css';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  shadowSize: null,
  iconSize: new L.Point(40, 40),
  className: 'airplane-icon',
});

const redOptions = { color: 'red' };
const blackOptions = { color: 'black' };

function FlightTracker({ socket }) {
  const [flights, setFlights] = useState([]);
  const [positions, setPositions] = useState({});
  const [path, setPath] = useState({});

  useEffect(() => {
    socket.on('FLIGHTS', (data) => {
      console.log(data);
      setFlights((prevState) => [...prevState, ...data]);
    });

    socket.on('POSITION', (data) => {
      setPositions((prevState) => {
        const flights = { ...prevState };
        flights[data.code] = data.position;
        return flights;
      });
      setPath((prevState) => {
        const flights = { ...prevState };
        flights[data.code] = prevState[data.code]
          ? [...prevState[data.code], data.position]
          : [data.position];
        return { ...flights };
      });
    });

    socket.emit('FLIGHTS', {});

    return () => socket.disconnect();
  }, []);

  return (
    <MapContainer className="map" center={[-36, -70]} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Object.keys(positions).map((key, index) => (
        <Marker key={key} position={positions[key]}>
          <Popup>{key}</Popup>
        </Marker>
      ))}
      {Object.keys(path).map((key, index) => (
        <Polyline key={key} positions={path[key]} pathOptions={blackOptions} />
      ))}
      {flights.map((flight, key) => (
        <Polyline
          key={key}
          positions={[flight.origin, flight.destination]}
          pathOptions={redOptions}
        />
      ))}
    </MapContainer>
  );
}

export default FlightTracker;
