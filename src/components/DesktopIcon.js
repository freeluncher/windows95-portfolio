import React, { useRef, useEffect, useState } from 'react';
import Draggable from 'react-draggable';

const DesktopIcon = ({ icon, label, onDoubleClick, defaultPosition }) => {
  const nodeRef = useRef(null);
  const [lastClick, setLastClick] = useState(0);

  // DEBUG: log onDoubleClick prop
  useEffect(() => {
    if (typeof onDoubleClick === 'function') {
      console.log('[DEBUG] DesktopIcon: onDoubleClick prop is function for', label);
    } else {
      console.warn('[DEBUG] DesktopIcon: onDoubleClick prop is NOT function for', label);
    }
  }, [onDoubleClick, label]);

  // Fallback: manual double click detection
  const handleClick = (e) => {
    const now = Date.now();
    if (now - lastClick < 350) {
      console.log('[DEBUG] DesktopIcon: manual double click fallback for', label);
      if (onDoubleClick) onDoubleClick(e);
      setLastClick(0);
    } else {
      setLastClick(now);
    }
  };

  // DEBUG: manual dblclick event listener
  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;
    const manualDblClick = (e) => {
      console.log('[DEBUG] DesktopIcon: manual dblclick event for', label);
    };
    el.addEventListener('dblclick', manualDblClick);
    return () => el.removeEventListener('dblclick', manualDblClick);
  }, [label]);

  return (
    <Draggable nodeRef={nodeRef} defaultPosition={defaultPosition} enableUserSelectHack={false}>
      <div
        ref={nodeRef}
        className="desktop-icon"
        // onDoubleClick={handleDoubleClick} // disable native, pakai fallback
        onClick={handleClick}
        style={{
          width: 80,
          textAlign: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          background: 'transparent',
          boxShadow: 'none',
          borderRadius: 4,
          padding: '8px 4px 4px 4px',
          position: 'absolute',
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
