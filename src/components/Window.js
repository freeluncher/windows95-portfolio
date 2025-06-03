import React, { useRef } from 'react';
import Draggable from 'react-draggable';

const Window = ({ title, children, onClose, onMinimize, onClick, zIndex }) => {
  const nodeRef = useRef(null);
  return (
    <Draggable handle=".window-title" nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        className="retro-window"
        style={{
          position: 'absolute',
          top: 100,
          left: 200,
          minWidth: 320,
          zIndex: zIndex || 10,
          background: '#c0c0c0',
          border: '2px solid #fff',
          boxShadow: '4px 4px 0 #000',
        }}
      >
        <div
          className="window-title"
          style={{background:'#000080',color:'#fff',padding:'4px 8px',cursor:'move',display:'flex',justifyContent:'space-between',alignItems:'center'}}
          onMouseDown={e => {
            if (e.button === 0 && e.target === e.currentTarget && onClick) onClick();
          }}
        >
          <span>{title}</span>
          <div style={{display:'flex',gap:4}}>
            <button onClick={onMinimize} style={{background:'#c0c0c0',border:'1px solid #000',width:20,height:20,cursor:'pointer',fontWeight:'bold'}} title="Minimize">_</button>
            <button onClick={onClose} style={{background:'#c0c0c0',border:'1px solid #000',width:20,height:20,cursor:'pointer'}}>X</button>
          </div>
        </div>
        <div className="window-content" style={{padding:'1rem'}}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
