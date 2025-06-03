import React, { useRef } from 'react';
import Draggable from 'react-draggable';

const DesktopIcon = ({ icon, label, onDoubleClick, defaultPosition }) => {
  const nodeRef = useRef(null);
  return (
    <Draggable nodeRef={nodeRef} defaultPosition={defaultPosition}>
      <div
        ref={nodeRef}
        className="desktop-icon"
        onDoubleClick={onDoubleClick}
        style={{
          width: 80,
          textAlign: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          background: 'transparent', // transparan
          boxShadow: 'none', // hilangkan shadow
          borderRadius: 4,
          padding: '8px 4px 4px 4px',
        }}
        tabIndex={0}
        draggable={false}
      >
        <img src={icon} alt={label} style={{width: 48, height: 48, marginBottom: 4, pointerEvents: 'none'}} draggable={false} />
        <div style={{color: '#fff', fontSize: 12, textShadow: '1px 1px 0 #000', pointerEvents: 'none'}}>{label}</div>
      </div>
    </Draggable>
  );
};

export default DesktopIcon;
