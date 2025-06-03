import React, { useState } from 'react';
import DesktopIcon from '../components/DesktopIcon';
import aboutIcon from '../assets/computer-4.png';
import projectsIcon from '../assets/directory_closed-4.png';
import contactIcon from '../assets/modem-5.png';

const icons = [
  { id: 1, label: 'About', icon: aboutIcon, window: 'about' },
  { id: 2, label: 'Projects', icon: projectsIcon, window: 'projects' },
  { id: 3, label: 'Contact', icon: contactIcon, window: 'contact' },
];

// Fungsi untuk menentukan posisi default icon (grid vertikal seperti Windows)
const getDefaultPosition = (index) => {
  const iconSize = 90; // tinggi icon + margin
  const marginTop = 32;
  const marginLeft = 24;
  return {
    x: marginLeft,
    y: marginTop + index * iconSize,
  };
};

const Desktop = ({ onOpenWindow }) => (
  <div className="desktop-area" style={{position: 'relative', width: '100vw', height: '100vh', background: '#008080'}}>
    {icons.map((icon, idx) => (
      <DesktopIcon
        key={icon.id}
        icon={icon.icon}
        label={icon.label}
        onDoubleClick={() => onOpenWindow(icon.window)}
        defaultPosition={getDefaultPosition(idx)}
      />
    ))}
  </div>
);

export default Desktop;
