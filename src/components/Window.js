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
        className="retro-window notepad-window"
        style={{
          minWidth: width || 320,
          minHeight: minHeight || undefined,
          zIndex: zIndex || 10,
          background: '#c0c0c0',
          border: '2px solid #fff',
          borderRight: '2px solid #808080',
          borderBottom: '2px solid #808080',
          borderLeft: '2px solid #fff',
          borderTop: '2px solid #fff',
          boxShadow: '2px 2px 0 #000, 1px 1px 0 #808080',
          backgroundColor: '#c0c0c0',
          position: 'absolute',
          padding: 0,
          overflow: 'hidden',
        }}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className={`window-inner ${animClass}`} style={{
          width: '100%',
          height: '100%',
          background: '#fff',
          borderLeft: '1px solid #808080',
          borderRight: '1px solid #fff',
          borderBottom: '1px solid #fff',
          borderTop: 'none',
          boxShadow: 'none',
          padding: 0,
        }}>
          <div
            className="window-title"
            style={{
              fontFamily: 'MS Sans Serif, Tahoma, Geneva, sans-serif',
              background: '#000080',
              color: '#fff',
              padding: '2px 8px',
              cursor: 'move',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              userSelect: 'none',
              height: 28,
              borderBottom: '2px solid #808080',
              boxShadow: '0 1px 0 #fff inset',
            }}
            onMouseDown={e => {
              if (e.button === 0 && e.target === e.currentTarget && onClick) onClick();
            }}
          >
            <span style={{fontWeight:'normal', fontSize:15, letterSpacing:0.5}}>{title}</span>
            <div style={{display:'flex',gap:4}}>
              <button onClick={onMinimize} style={{background:'#c0c0c0',border:'1px solid #808080',borderRightColor:'#fff',borderBottomColor:'#fff',borderLeftColor:'#808080',borderTopColor:'#808080',width:20,height:20,cursor:'pointer',fontWeight:'bold',fontSize:13,boxShadow:'1px 1px 0 #fff inset',padding:0}} title="Minimize">_</button>
              <button onClick={handleClose} style={{background:'#c0c0c0',border:'1px solid #808080',borderRightColor:'#fff',borderBottomColor:'#fff',borderLeftColor:'#808080',borderTopColor:'#808080',width:20,height:20,cursor:'pointer',fontWeight:'bold',fontSize:13,boxShadow:'1px 1px 0 #fff inset',padding:0}}>X</button>
            </div>
          </div>
          {/* Notepad menu bar */}
          <div className="notepad-menubar" style={{
            display: 'flex',
            alignItems: 'center',
            background: '#e0e0e0',
            borderBottom: '2px solid #808080',
            borderTop: '1px solid #fff',
            height: 22,
            paddingLeft: 6,
            fontFamily: 'MS Sans Serif, Tahoma, Geneva, sans-serif',
            fontSize: 14,
            color: '#222',
            userSelect: 'none',
          }}>
            <span style={{marginRight: 18, cursor:'default'}}>File</span>
            <span style={{marginRight: 18, cursor:'default'}}>Edit</span>
            <span style={{marginRight: 18, cursor:'default'}}>Search</span>
            <span style={{marginRight: 18, cursor:'default'}}>Help</span>
          </div>
          {/* Notepad content area */}
          <div className="window-content notepad-content" style={{
            padding: '8px 4px',
            background: '#fff',
            color: '#222',
            fontFamily: 'Courier New, monospace',
            fontSize: 15,
            minHeight: 'calc(100% - 50px)',
            whiteSpace: 'pre-wrap',
            overflow: 'auto',
            border: 'none',
          }}>
            {children}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
