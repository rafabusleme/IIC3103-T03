import React from 'react';

import '../styles.css';

function Message({ name, message, date, left }) {
  const formattedDate = new Date(date);
  return (
    <div className={left ? 'left-message' : 'right-message'}>
      <p>
        {name} - {`${formattedDate.getHours()}:${formattedDate.getMinutes()}`}
      </p>
      {message}
    </div>
  );
}

export default Message;
