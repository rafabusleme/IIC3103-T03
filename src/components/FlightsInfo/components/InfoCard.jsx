/* eslint-disable no-unused-vars */
import React from 'react';

import Modal from 'react-modal';

const customStyles = {
  overlay: {
    zIndex: 1000,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    width: '50%',
    height: '50%',
  },
};

Modal.setAppElement(document.getElementsByClassName('info-card'));

function InfoCard({ props }) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }

  function closeModal() {
    setIsOpen(false);
  }
  const { code, airline, origin, destination, plane, seats, passengers } = props;
  return (
    <div className="info-card">
      <p>Código: {code}</p>
      <p> Aerolinea: {airline}</p>
      <button onClick={openModal}>+</button>
      {/* Origen: {origin} - Destino: {destination}
      Avion: {plane}
      Asientos: {seats} */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <div>
          <h4>Datos del vuelo {code}</h4>
          <p>
            Aerolinea: {airline} Avión: {plane} Asientos: {seats}
          </p>
          <p>
            Origen: {origin} Destino: {destination}
          </p>
          <h4>Pasajeros</h4>
          {passengers.map((passenger, key) => (
            <p key={key}>
              Nombre: {passenger.name} Edad: {passenger.age}
            </p>
          ))}
        </div>
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
  );
}

export default InfoCard;
