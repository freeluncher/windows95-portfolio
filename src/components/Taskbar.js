import React, { useEffect, useState } from 'react';

const Taskbar = ({ openWindows, onFocusWindow }) => {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100vw',
      height: 38,
      background: '#c0c0c0',
      borderTop: '2px solid #fff',
      boxShadow: '0 -2px 0 #808080',
      display: 'flex',
      alignItems: 'center',
      zIndex: 100,
      fontFamily: 'MS Sans Serif',
    }}>
      <div style={{
        background: '#000080',
        color: '#fff',
        fontWeight: 'bold',
        padding: '4px 16px',
        margin: '0 8px',
        border: '2px outset #fff',
        borderRadius: 2,
        fontSize: 14,
        letterSpacing: 1,
        boxShadow: '1px 1px 0 #000',
      }}>
        Start
      </div>
      <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: 8}}>
        {openWindows.map(w => (
          <button
            key={w}
            onClick={() => onFocusWindow(w)}
            style={{
              background: '#e0e0e0',
              border: '2px outset #fff',
              borderRadius: 2,
              padding: '4px 12px',
              marginRight: 4,
              fontFamily: 'inherit',
              fontSize: 13,
              cursor: 'pointer',
              color: '#222',
              boxShadow: '1px 1px 0 #888',
            }}
          >
            {w.charAt(0).toUpperCase() + w.slice(1)}
          </button>
        ))}
      </div>
      <div style={{
        background: '#fff',
        border: '2px inset #808080',
        borderRadius: 2,
        padding: '2px 12px',
        margin: '0 12px',
        fontSize: 13,
        minWidth: 60,
        textAlign: 'right',