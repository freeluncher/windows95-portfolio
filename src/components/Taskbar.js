import React, { useEffect, useState } from 'react';
import StartMenu from './StartMenu';

const Taskbar = ({ openWindows, minimized = [], onFocusWindow, onRestoreWindow, onStartMenu, soundEnabled, onToggleSound, onWallpaperMenu, wallpaperList, currentWallpaper }) => {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [wallpaperMenuOpen, setWallpaperMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStartClick = () => setStartMenuOpen(v => !v);
  const handleMenuSelect = (window) => {
    if (onStartMenu) onStartMenu(window);
    setStartMenuOpen(false);
  };

  // Ganti handler agar benar-benar membuka window wallpaper
  const handleWallpaperMenu = () => {
    if (onWallpaperMenu) onWallpaperMenu();
    setWallpaperMenuOpen(false);
  };
  const handleWallpaperSelect = (wall) => {
    if (onWallpaperMenu) onWallpaperMenu(wall);
    setWallpaperMenuOpen(false);
  };

  return (
    <>
      <StartMenu visible={startMenuOpen} onSelect={handleMenuSelect} onClose={() => setStartMenuOpen(false)} soundEnabled={soundEnabled} onToggleSound={onToggleSound} onWallpaperMenu={onWallpaperMenu} />
      {wallpaperMenuOpen && (
        <div style={{
          position: 'fixed',
          left: 220,
          bottom: 46,
          width: 220,
          background: '#c0c0c0',
          border: '2px outset #fff',
          boxShadow: '2px 2px 0 #888',
          zIndex: 9999,
          fontFamily: 'MS Sans Serif',
          padding: 0,
        }}>
          <div style={{background:'#000080',color:'#fff',padding:'8px 12px',fontWeight:'bold',fontSize:16}}>Wallpaper</div>
          {wallpaperList && wallpaperList.map(wall => (
            <div
              key={wall.name}
              onClick={() => handleWallpaperSelect(wall)}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                borderBottom: '1px solid #b0b0b0',
                background: currentWallpaper.name === wall.name ? '#e0e0e0' : 'transparent',
                fontSize: 15,
                fontWeight: currentWallpaper.name === wall.name ? 'bold' : 'normal',
              }}
              onMouseDown={e => e.preventDefault()}
              onMouseOver={e => e.currentTarget.style.background = '#e0e0e0'}
              onMouseOut={e => e.currentTarget.style.background = currentWallpaper.name === wall.name ? '#e0e0e0' : 'transparent'}
            >
              {wall.name}
            </div>
          ))}
        </div>
      )}
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
          background: startMenuOpen ? '#000060' : '#000080',
          color: '#fff',
          fontWeight: 'bold',
          padding: '4px 16px',
          margin: '0 8px',
          border: '2px outset #fff',
          borderRadius: 2,
          fontSize: 14,
          letterSpacing: 1,
          boxShadow: '1px 1px 0 #000',
          cursor: 'pointer',
        }}
        onClick={handleStartClick}
        >
          Start
        </div>
        <div style={{
          background: wallpaperMenuOpen ? '#b0b0b0' : '#e0e0e0',
          color: '#222',
          fontWeight: 'bold',
          padding: '4px 12px',
          margin: '0 4px',
          border: '2px outset #fff',
          borderRadius: 2,
          fontSize: 13,
          cursor: 'pointer',
        }}
        onClick={handleWallpaperMenu}
        >
          Wallpaper
        </div>
        <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: 8}}>
          {openWindows.map(w => (
            <button
              key={w}
              onClick={() => minimized.includes(w) ? onRestoreWindow(w) : onFocusWindow(w)}
              style={{
                background: minimized.includes(w) ? '#b0b0b0' : '#e0e0e0',
                border: '2px outset #fff',
                borderRadius: 2,
                padding: '4px 12px',
                marginRight: 4,
                fontFamily: 'inherit',
                fontSize: 13,
                cursor: 'pointer',
                color: '#222',
                boxShadow: '1px 1px 0 #888',
                opacity: minimized.includes(w) ? 0.7 : 1,
              }}
              title={minimized.includes(w) ? 'Restore' : 'Focus'}
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
          color: '#222',
          fontWeight: 'bold',
          textShadow: '0 1px 0 #fff, 1px 0 0 #888',
          boxShadow: '1px 1px 0 #888',
        }}>{time}</div>
      </div>
    </>
  );
};

export default Taskbar;
