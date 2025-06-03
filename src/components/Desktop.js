import React, { useState } from 'react';
import DesktopIcon from '../components/DesktopIcon';
import aboutIcon from '../assets/computer-4.png';
import projectsIcon from '../assets/directory_closed-4.png';

// Icon tambahan untuk semua halaman
import heroIcon from '../assets/computer-4.png';
import aboutMeIcon from '../assets/computer-4.png';
import skillsIcon from '../assets/skill.png';
import failuresIcon from '../assets/modem-5.png';
import galleryIcon from '../assets/camera.png';
import testimonialsIcon from '../assets/mydocs.png';
import blogIcon from '../assets/modem-5.png';
import dreamIcon from '../assets/computer-4.png';
import notFoundIcon from '../assets/directory_closed-4.png';

const icons = [
  { id: 1, label: 'Hero', icon: heroIcon, window: 'hero' },
  { id: 2, label: 'About Me', icon: aboutMeIcon, window: 'aboutMe' },
  { id: 3, label: 'Skills', icon: skillsIcon, window: 'skills' },
  { id: 4, label: 'Projects', icon: projectsIcon, window: 'projects' },
  { id: 5, label: 'Failures', icon: failuresIcon, window: 'failures' },
  { id: 6, label: 'Gallery', icon: galleryIcon, window: 'gallery' },
  { id: 7, label: 'Testimonials', icon: testimonialsIcon, window: 'testimonials' },
  { id: 8, label: 'Blog', icon: blogIcon, window: 'blog' },
  { id: 9, label: 'Dream', icon: dreamIcon, window: 'dream' },
  { id: 10, label: '404', icon: notFoundIcon, window: 'notfound' },
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
