import React from 'react';

const Notification = ({ message, messageStatus }) => {
  if (message === null) {
    return null;
  }
  return (
    <div
      className={messageStatus ? 'notification-success' : 'notification-fail'}
    >
      {message}
    </div>
  );
};

export default Notification;
