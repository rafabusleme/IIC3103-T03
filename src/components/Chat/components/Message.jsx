import React from 'react';

import '../styles.css';

function Message({ props }) {
  const { message, left } = props;
  return <div className={left ? 'left-message' : 'right-message'}>{message}</div>;
}

export default Message;
