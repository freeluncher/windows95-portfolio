import React, { useRef, useState } from 'react';
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
  const [animClass, setAnimClass] = useState('window-anim-open');
  const [closing, setClosing] = useState(false);

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

  // Logging untuk debugging drag
  React.useEffect(() => {
    if (nodeRef.current) {
      console.log('[Window] nodeRef.current:', nodeRef.current);
      if (nodeRef.current.parentNode) {
        console.log('[Window] parentNode:', nodeRef.current.parentNode);
        console.log('[Window] parentNode.style:', nodeRef.current.parentNode.getAttribute('style'));
      }
    } else {
      console.warn('[Window] nodeRef.current is null');
    }
  }, []); // hanya saat mount

  // Logging semua computed style window
  React.useEffect(() => {
    if (nodeRef.current) {
      const computed = window.getComputedStyle(nodeRef.current);
      console.log('[Window] computed style:', computed);
    }
  }, []);

  // Logging khusus property transform, left, top, position, transition, will-change
  React.useEffect(() => {
    if (nodeRef.current) {
      const computed = window.getComputedStyle(nodeRef.current);
      console.log('[Window] computed style (khusus):', {
        transform: computed.transform,
        left: computed.left,
        top: computed.top,
        position: computed.position,
        transition: computed.transition,
        willChange: computed.willChange,
        pointerEvents: computed.pointerEvents,
        display: computed.display,
      });
    }
  }, []);

  // Logging event drag
  const handleStart = (e, data) => {
    console.log('[Window] Drag start', { name, e, data, node: nodeRef.current });
  };
  const handleDrag = (e, data) => {
    // Uncomment if needed: console.log('[Window] Dragging', { name, x: data.x, y: data.y });
  };
  const handleStop = (e, data) => {
    console.log('[Window] Drag stop', { name, e, data, node: nodeRef.current });
    if (nodeRef.current) {
      const computed = window.getComputedStyle(nodeRef.current);
      console.log('[Window] computed style after drag (khusus):', {
        transform: computed.transform,
        left: computed.left,
        top: computed.top,
        position: computed.position,
        transition: computed.transition,
        willChange: computed.willChange,
        pointerEvents: computed.pointerEvents,
        display: computed.display,
      });
    }
    if (name === 'recycleBin' || !onDragToRecycleBin || !recycleBinRef?.current) return;
    const winRect = nodeRef.current?.getBoundingClientRect();
    const binRect = recycleBinRef.current?.getBoundingClientRect();
    if (winRect && binRect && isOverlapping(winRect, binRect)) {
      onDragToRecycleBin(name);
    }
  };

  // Handle close with animation
  const handleClose = () => {
    setAnimClass('window-anim-close');
    setClosing(true);
  };

  // After close animation, call onClose
  const handleAnimationEnd = () => {
    if (closing && onClose) onClose();
  };

  // Gabungkan ref Draggable dan drop (untuk recycleBin)
  const combinedRef = React.useCallback(
    (el) => {
      nodeRef.current = el;
      if (name === 'recycleBin' && el) {
        drop(el);
        if (windowRef) windowRef.current = el;
      }
    },
    [name, drop, windowRef]
  );

  return (
    <Draggable
      handle=".window-title"
      cancel=".window-content,button"
      enableUserSelectHack={false}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
      defaultPosition={{ x: left, y: top }}
      disabled={closing}
      nodeRef={nodeRef}
    >
      <div
        ref={combinedRef}
        className="retro-window"
        style={{
          minWidth: width || 320,
          minHeight: minHeight || undefined,
          zIndex: zIndex || 10,
          background: '#c0c0c0',
          border: isOver && canDrop ? '2px solid #008000' : '2px solid #fff',
          boxShadow: '4px 4px 0 #000',
          backgroundColor: '#c0c0c0',
          position: 'absolute',
        }}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className={`window-inner ${animClass}`} style={{ width: '100%', height: '100%' }}>
          <div
            className="window-title"
            style={{
              background:'#000080',
              color:'#fff',
              padding:'4px 8px',
              cursor:'move',
              display:'flex',
              justifyContent:'space-between',
              alignItems:'center',
              userSelect:'none',
              backgroundColor:'#000080',
            }}
            onMouseDown={e => {
              if (e.button === 0 && e.target === e.currentTarget && onClick) onClick();
            }}
          >
            <span>{title}</span>
            <div style={{display:'flex',gap:4}}>
              <button onClick={onMinimize} style={{background:'#c0c0c0',border:'1px solid #000',width:20,height:20,cursor:'pointer',fontWeight:'bold'}} title="Minimize">_</button>
              <button onClick={handleClose} style={{background:'#c0c0c0',border:'1px solid #000',width:20,height:20,cursor:'pointer'}}>X</button>
            </div>
          </div>
          <div className="window-content" style={{padding:'1rem'}}>
            {children}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
