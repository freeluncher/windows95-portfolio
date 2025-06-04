import React, { useRef, useEffect, useState } from 'react';
import Draggable from 'react-draggable';

const DesktopIcon = ({ icon, label, onDoubleClick, onOpen, defaultPosition }) => {
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

  // Handler untuk touch (mobile) dan click (mobile fallback)
  const handleTouchEnd = (e) => {
    console.log('[DEBUG] DesktopIcon: onTouchEnd triggered for', label);
    if (typeof onOpen === 'function') {
      console.log('[DEBUG] DesktopIcon: calling onOpen from onTouchEnd for', label);
      onOpen(e);
    } else if (typeof onDoubleClick === 'function') {
      console.log('[DEBUG] DesktopIcon: calling onDoubleClick from onTouchEnd for', label);
      onDoubleClick(e);
    }
  };

  // Fallback: manual double click detection (desktop only)
  const handleClick = (e) => {
    console.log('[DEBUG] DesktopIcon: onClick triggered for', label);
    // Jika device touch, anggap single tap = open
    if (window.matchMedia('(pointer: coarse)').matches) {
      if (typeof onOpen === 'function') {
        console.log('[DEBUG] DesktopIcon: calling onOpen from onClick (touch) for', label);
        onOpen(e);
      } else if (typeof onDoubleClick === 'function') {
        console.log('[DEBUG] DesktopIcon: calling onDoubleClick from onClick (touch) for', label);
        onDoubleClick(e);
      }
      return;
    }
    // Desktop: manual double click fallback
    const now = Date.now();
    if (now - lastClick < 350) {
      if (onDoubleClick) {
        console.log('[DEBUG] DesktopIcon: calling onDoubleClick from manual fallback for', label);
        onDoubleClick(e);
      }
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

  // Handler pointer event universal
  const handlePointerDown = (e) => {
    console.log('[DEBUG] DesktopIcon: onPointerDown', label, e.pointerType, e.type);
  };
  const handlePointerUp = (e) => {
    console.log('[DEBUG] DesktopIcon: onPointerUp', label, e.pointerType, e.type);
  };

  // Deteksi device touch
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  const iconDiv = (
    <div
      ref={nodeRef}
      className="desktop-icon"
      onDoubleClick={(e) => {
        console.log('[DEBUG] DesktopIcon: onDoubleClick event for', label);
        if (onOpen) onOpen(e);
        else if (onDoubleClick) onDoubleClick(e);
      }}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      tabIndex={0}
      draggable={false}
      style={{
        width: 80,
        textAlign: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        background: 'transparent',
        boxShadow: 'none',
        borderRadius: 4,
        padding: '8px 4px 4px 4px',
        ...(isTouchDevice ? {} : { position: 'absolute' }), // hanya absolute di desktop
        touchAction: 'none',
      }}
    >
      <img src={icon} alt={label} style={{width: 48, height: 48, marginBottom: 4, pointerEvents: 'none'}} draggable={false} />
      <div style={{color: '#fff', fontSize: 12, textShadow: '1px 1px 0 #000', pointerEvents: 'none'}}>{label}</div>
    </div>
  );

  if (isTouchDevice) {
    // Jangan gunakan Draggable di device touch
    return iconDiv;
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={defaultPosition}
      enableUserSelectHack={false}
      onStart={(e, data) => { console.log('[DEBUG] Draggable: onStart', label, data); }}
      onStop={(e, data) => { console.log('[DEBUG] Draggable: onStop', label, data); }}
      onDrag={(e, data) => { if (e && e.type) console.log('[DEBUG] Draggable: onDrag', label, e.type, data); }}
    >
      {iconDiv}
    </Draggable>
  );
};

export default DesktopIcon;
