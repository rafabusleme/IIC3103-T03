import React, { useEffect, useState } from 'react';

import { io } from 'socket.io-client';

import { ENDPOINT } from '../../constants';
import Message from './components/Message';

import './styles.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [displayChat, setDisplayChat] = useState(false);

  function handleMessage(e) {
    setMessage(e.target.value);
  }

  function onSetNickName() {
    if (nickname.length > 0) return setDisplayChat(true);
    alert('Debes elegir un nombre válido');
  }

  function isOdd(number) {
    const mod = number % 2;
    if (mod === 0) return true;
    return false;
  }

  useEffect(() => {
    const socket = io(ENDPOINT, {
      path: '/flights/',
    });

    console.log('deb');

    socket.on('CHAT', (data) => {
      const auxFlights = messages;
      auxFlights.push(data);
      setMessages(auxFlights);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="chat">
      <div className="box-message">
        {messages.map((message, index) => (
          <Message
            key={index}
            name={message.name}
            message={message.message}
            date={message.date}
            left={!isOdd}
          />
        ))}
        {!displayChat ? (
          <div className="nickname">
            <input
              type="text"
              placeholder="Elige un nickname..."
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <button onClick={() => onSetNickName()}>Elegir</button>
          </div>
        ) : (
          <div className="send">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={message}
              onChange={(e) => handleMessage(e)}
            />
            <button>Enviar</button>
          </div>
        )}
      </div>
      {/* <div className="messages">
        <div className="left-message">Hola soy un mensaje</div>
        <div className="right-message">Hola soy otro mensaje</div>
      </div> */}
    </div>
  );
}

export default Chat;
