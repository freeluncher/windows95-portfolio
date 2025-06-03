import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';

// Utility: check if two DOM rects overlap
function isOverlapping(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect2.left < rect1.right &&
    rect1.top < rect2.bottom &&
    rect2.top < rect1.bottom
  );
}

const Window = ({ title, children, onClose, onMinimize, onClick, zIndex, top = 100, left = 200, minHeight = 0, width = 0, name, onDragToRecycleBin, recycleBinRef, windowRef }) => {
  const nodeRef = useRef(null);
  const contentRef = useRef(null);
  const [animClass, setAnimClass] = useState('window-anim-open');
  const [closing, setClosing] = useState(false);

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
    if (nodeRef.current instanceof Element) {
      const computed = window.getComputedStyle(nodeRef.current);
      console.log('[Window] computed style:', computed);
    }
  }, []);

  // Logging khusus property transform, left, top, position, transition, will-change
  React.useEffect(() => {
    if (nodeRef.current instanceof Element) {
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
    if (nodeRef.current instanceof Element) {
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
    if (closing && onClose) {
      setTimeout(() => {
        onClose();
      }, 0); // pastikan parent update state setelah animasi
    }
    // Reset state apapun setelah animasi selesai
    setClosing(false);
    setAnimClass('window-anim-open');
  };

  // --- Windows 95 style resize/content refactor FINAL ---
  // 1. Window hanya bisa di-resize sampai batas minimum (titlebar, menu, area konten minimal)
  // 2. Konten window selalu fit di dalam window, tidak overflow keluar
  // 3. Jika konten lebih besar dari window, tampilkan scrollbar pada area konten
  // 4. Handle resize selalu di pojok/tepi window
  // 5. Scrollbar selalu di area konten, style retro

  // Ukuran minimum: titlebar (28px) + menubar (22px) + area konten minimal (misal 60px)
  const WIN95_MIN_WIDTH = 320;
  const WIN95_MIN_HEIGHT = 28 + 22 + 60;

  // DEBUG: Log computed style of scrollbar thumb after mount
  React.useEffect(() => {
    const el = document.querySelector('.window-content');
    if (el) {
      try {
        const style = window.getComputedStyle(el, '::-webkit-scrollbar-thumb');
        // Akan log seluruh properti jika didukung browser
        console.log('[DEBUG] Computed style for ::-webkit-scrollbar-thumb:', style);
      } catch (e) {
        console.warn('[DEBUG] Tidak bisa membaca pseudo-element ::-webkit-scrollbar-thumb:', e);
      }
    } else {
      console.warn('[DEBUG] .window-content tidak ditemukan');
    }
  }, []);

  // LOG props for debugging
  React.useEffect(() => {
    console.log('[Window] MOUNT', name, { onClose, onMinimize, onClick });
    return () => {
      console.log('[Window] UNMOUNT', name);
    };
  }, [name, onClose, onMinimize, onClick]);

  // LOG every render
  console.log('[Window] RENDER', name, { closing, animClass });

  // Logging event for minimize/close
  const handleMinimizeClick = (e) => {
    e.stopPropagation();
    console.log('[Window] Minimize button clicked', name);
    if (onMinimize) onMinimize();
  };
  const handleCloseClick = (e) => {
    e.stopPropagation();
    console.log('[Window] Close button clicked', name);
    handleClose();
  };

  return (
    <Draggable
      handle=".window-title"
      cancel=".window-content,button"
      enableUserSelectHack={false}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
      position={null} // Gunakan controlled mode agar drag selalu aktif
      disabled={closing}
      nodeRef={nodeRef}
      className="window-draggable"
    >
      <div ref={nodeRef} className="window-outer" style={{
        position: 'absolute',
        zIndex: zIndex || 10,
        minWidth: WIN95_MIN_WIDTH,
        minHeight: WIN95_MIN_HEIGHT,
        pointerEvents: closing ? 'none' : 'auto',
        opacity: closing ? 0 : 1, // fade out saat closing
        transition: 'opacity 0.18s',
        // Border 3D Win95 di level terluar
        borderLeft: '2px solid #fff',
        borderTop: '2px solid #fff',
        borderRight: '2px solid #808080',
        borderBottom: '2px solid #808080',
        boxShadow: '2px 2px 0 #000, 1px 1px 0 #808080',
        borderRadius: 0,
        background: '#c0c0c0',
        boxSizing: 'border-box',
      }}>
        <Resizable
          defaultSize={{ width: width || 440, height: minHeight || 320 }}
          minWidth={WIN95_MIN_WIDTH}
          minHeight={WIN95_MIN_HEIGHT}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            // Pastikan Resizable wrapper selalu 100% agar konten ikut resize
          }}
          handleStyles={{
            bottomRight: {
              width: 16,
              height: 16,
              background: '#c0c0c0',
              borderTop: '1px solid #808080',
              borderLeft: '1px solid #808080',
              borderRight: 'none',
              borderBottom: 'none',
              position: 'absolute',
              right: 0,
              bottom: 0,
              zIndex: 1000,
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }
          }}
          handleComponent={{
            bottomRight: <div style={{width:16,height:16,background:'#c0c0c0',position:'absolute',right:0,bottom:0,display:'flex',alignItems:'flex-end',justifyContent:'flex-end'}}><div style={{width:12,height:2,background:'#808080',position:'absolute',right:2,bottom:4}}></div><div style={{width:8,height:2,background:'#808080',position:'absolute',right:2,bottom:8}}></div></div>
          }}
          enable={{
            top: true, right: true, bottom: true, left: true,
            topRight: true, topLeft: true, bottomLeft: true, bottomRight: true
          }}
        >
          <div
            className="retro-window notepad-window"
            style={{
              width: '100%',
              height: '100%',
              minWidth: WIN95_MIN_WIDTH,
              minHeight: WIN95_MIN_HEIGHT,
              zIndex: zIndex || 10,
              background: '#c0c0c0',
              border: 'none',
              position: 'relative',
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              // Pastikan window dan konten ikut resize
              flex: 1,
            }}
            onAnimationEnd={handleAnimationEnd}
          >
            <div
              className={`window-inner ${animClass}`}
              style={{
                width: '100%',
                height: '100%',
                background: '#fff',
                borderLeft: '1px solid #808080',
                borderRight: '1px solid #fff',
                borderBottom: '1px solid #fff',
                borderTop: 'none',
                boxShadow: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
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
                  flex: '0 0 28px',
                }}
                onMouseDown={e => {
                  if (e.button === 0 && e.target === e.currentTarget && onClick) {
                    console.log('[Window] Titlebar clicked', name);
                    onClick();
                  }
                }}
              >
                <span style={{fontWeight:'normal', fontSize:15, letterSpacing:0.5}}>{title}</span>
                <div style={{display:'flex',gap:4}}>
                  <button onClick={handleMinimizeClick} style={{background:'#c0c0c0',border:'1px solid #808080',borderRightColor:'#fff',borderBottomColor:'#fff',borderLeftColor:'#808080',borderTopColor:'#808080',width:20,height:20,cursor:'pointer',fontWeight:'bold',fontSize:13,boxShadow:'1px 1px 0 #fff inset',padding:0}} title="Minimize">_</button>
                  <button onClick={handleCloseClick} style={{background:'#c0c0c0',border:'1px solid #808080',borderRightColor:'#fff',borderBottomColor:'#fff',borderLeftColor:'#808080',borderTopColor:'#808080',width:20,height:20,cursor:'pointer',fontWeight:'bold',fontSize:13,boxShadow:'1px 1px 0 #fff inset',padding:0}}>X</button>
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
                flex: '0 0 22px',
              }}>
                <span style={{marginRight: 18, cursor:'default'}}>File</span>
                <span style={{marginRight: 18, cursor:'default'}}>Edit</span>
                <span style={{marginRight: 18, cursor:'default'}}>Search</span>
                <span style={{marginRight: 18, cursor:'default'}}>Help</span>
              </div>
              {/* Notepad content area */}
              <div
                className="window-content notepad-content"
                ref={contentRef}
                style={{
                  flex: '1 1 0',
                  minHeight: 60,
                  minWidth: 0,
                  padding: '8px 4px',
                  background: '#fff',
                  color: '#222',
                  fontFamily: 'Courier New, monospace',
                  fontSize: 15,
                  whiteSpace: 'pre-wrap',
                  overflow: 'auto',
                  border: 'none',
                  boxSizing: 'border-box',
                  width: '100%',
                  height: '100%',
                  // Pastikan konten ikut resize
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
};

export default Window;
