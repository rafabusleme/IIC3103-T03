import React, { useEffect, useState } from 'react';

import Message from './components/Message';

import './styles.css';

function Chat({ socket }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [displayChat, setDisplayChat] = useState(false);

  function handleMessage(e) {
    setMessage(e.target.value);
  }

  function sendMessage() {
    socket.emit('CHAT', { name: nickname, message });
    setMessage('');
  }

  function onSetNickName() {
    if (nickname.length > 0) return setDisplayChat(true);
    alert('Debes elegir un nombre válido');
  }

  useEffect(() => {
    socket.on('CHAT', (data) => {
      console.log(data);
      setMessages((prevState) => [...prevState, data]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="chat">
      <div className="box-message">
        <h1>Chat - {nickname}</h1>
        <div className="messages">
          {messages.map((message, index) => (
            <Message
              key={index}
              name={message.name}
              message={message.message}
              date={message.date}
              left={!(message.name === nickname)}
            />
          ))}
        </div>
        {!displayChat ? (
          <div className="send">
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
            <button onClick={() => sendMessage()}>Enviar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
