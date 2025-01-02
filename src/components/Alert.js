import React from 'react';

const Alert = (props) => {
  const { message, type } = props; // Destructuring props

  // Define icon based on alert type
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✔️';
      case 'danger':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '';
    }
  };

  return (
    <div
      className={`alert alert-${type} d-flex align-items-center shadow-sm alert-dismissible fade show`}
      role="alert"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1050,
        maxWidth: '400px',
        borderRadius: '8px',
      }}
    >
      <span
        style={{
          fontSize: '1.5rem',
          marginRight: '10px',
        }}
      >
        {getIcon(type)}
      </span>
      <div style={{ flex: 1 }}>
        <strong>{message}</strong>
      </div>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '1.2rem',
        }}
      ></button>
    </div>
  );
};

export default Alert;
