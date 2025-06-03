import React, { useRef } from 'react';
import Draggable from 'react-draggable';

const Window = ({ title, children, onClose }) => {
  const nodeRef = useRef(null);
  return (
    <Draggable handle=".window-title" nodeRef={nodeRef}>
      <div ref={nodeRef} className="retro-window" style={{position:'absolute',top:100,left:200,minWidth:320,zIndex:10,background:'#c0c0c0',border:'2px solid #fff',boxShadow:'4px 4px 0 #000'}}>
        <div className="window-title" style={{background:'#000080',color:'#fff',padding:'4px 8px',cursor:'move',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span>{title}</span>
          <button onClick={onClose} style={{background:'#c0c0c0',border:'1px solid #000',width:20,height:20,cursor:'pointer'}}>X</button>
        </div>
        <div className="window-content" style={{padding:'1rem'}}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
