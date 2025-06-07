import React from 'react';
import SoundMenu from './SoundMenu';
import wallpaperIcon from '../assets/directory_closed-4.png';

const menuItems = [
  { label: 'Hero', window: 'hero' },
  { label: 'About Me', window: 'aboutMe' },
  { label: 'Skills', window: 'skills' },
  { label: 'Projects', window: 'projects' },
  { label: 'Failures', window: 'failures' },
  { label: 'Gallery', window: 'gallery' },
  { label: 'Testimonials', window: 'testimonials' },
  { label: 'Blog', window: 'blog' },
  { label: 'Dream', window: 'dream' },
  { label: 'Contact', window: 'contact' },
];

const StartMenu = ({ visible, onSelect, onClose, soundEnabled, onToggleSound, onWallpaperMenu }) => {
  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed',
      left: 8,
      bottom: 46,
      width: 200,
      background: '#c0c0c0',
      border: '2px outset #fff',
      boxShadow: '2px 2px 0 #888',
      zIndex: 9999,
      fontFamily: 'MS Sans Serif',
      padding: 0,
      animation: 'fadeIn .2s',
    }} onMouseLeave={onClose}>
      <div style={{background:'#000080',color:'#fff',padding:'8px 12px',fontWeight:'bold',fontSize:18}}>Start Menu</div>
      {menuItems.map(item => (
        <div
          key={item.window}
          onClick={() => { onSelect(item.window); onClose(); }}
          style={{
            padding: '8px 16px',
            cursor: 'pointer',
            borderBottom: '1px solid #b0b0b0',
            background: 'transparent',
            fontSize: 16,
          }}
          onMouseDown={e => e.preventDefault()}
          onMouseOver={e => e.currentTarget.style.background = '#e0e0e0'}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
        >
          {item.label}
        </div>
      ))}
      <SoundMenu enabled={soundEnabled} onToggle={onToggleSound} />
      <div style={{padding: '8px 16px', borderTop: '1px solid #b0b0b0', background: 'transparent', fontSize: 16, cursor: 'pointer', display:'flex',alignItems:'center',gap:8}} onClick={() => { onWallpaperMenu(); onClose(); }} title="Ganti Wallpaper Desktop">
        <img src={wallpaperIcon} alt="Wallpaper" style={{width:18,height:18,marginRight:4}} /> Wallpaper
      </div>
    </div>
  );
};

export default StartMenu;
