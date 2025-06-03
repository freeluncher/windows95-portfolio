import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { useDrop } from 'react-dnd';

// Utility: check if two DOM rects overlap
function isOverlapping(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}

const Window = ({ title, children, onClose, onMinimize, onClick, zIndex, top = 100, left = 200, minHeight = 0, width = 0, name, onDragToRecycleBin, recycleBinRef, windowRef }) => {
  const nodeRef = useRef(null);
  // Use windowRef if provided (for Recycle Bin), else use nodeRef
  const refToUse = windowRef || nodeRef;

  // Only use react-dnd drop for Recycle Bin window
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'WINDOW',
    drop: () => {}, // No-op, handled by drag-to-bin logic
    canDrop: () => name === 'recycleBin',
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    })
  });

  // Handle drag stop: check overlap with Recycle Bin
  const handleStop = (e, data) => {
    if (name === 'recycleBin' || !onDragToRecycleBin || !recycleBinRef?.current) return;
    const winRect = refToUse.current?.getBoundingClientRect();
    const binRect = recycleBinRef.current?.getBoundingClientRect();
    if (winRect && binRect && isOverlapping(winRect, binRect)) {
      onDragToRecycleBin(name);
    }
  };

  return (
    <Draggable
      handle=".window-title"
      nodeRef={refToUse}
      cancel=".window-content,button"
      enableUserSelectHack={false}
      onStop={handleStop}
      defaultPosition={{ x: left, y: top }}
    >
      <div
        ref={el => {
          refToUse.current = el;
          if (name === 'recycleBin') {
            drop(el);
          }
        }}
        className="retro-window"
        style={{
          position: 'absolute',
          minWidth: width || 320,
          minHeight: minHeight || undefined,
          zIndex: zIndex || 10,
          background: '#c0c0c0',
          border: isOver && canDrop ? '2px solid #008000' : '2px solid #fff',
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
