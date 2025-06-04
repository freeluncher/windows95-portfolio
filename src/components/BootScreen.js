import React from 'react';
import win95Logo from '../assets/cat-sitting-border.gif'; // Ganti dengan logo Win95 jika ada

const BootScreen = () => (
  <div style={{
    position: 'fixed', zIndex: 9999, inset: 0, background: '#000',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
  }}>
    <img src={win95Logo} alt="Windows 95" style={{width: 180, marginBottom: 32}} />
    <div style={{color: '#fff', fontSize: 28, fontFamily: 'MS Sans Serif, Tahoma, Geneva, sans-serif', marginBottom: 24}}>
      Starting Windows 95...
    </div>
    <div style={{
      width: 320, height: 18, background: '#222', border: '2px inset #888', marginBottom: 8
    }}>
      <div style={{
        width: '60%', height: '100%', background: 'linear-gradient(90deg, #00f 60%, #fff 100%)',
        animation: 'boot-bar 2.5s linear forwards'
      }} />
    </div>
    <style>
      {`@keyframes boot-bar { from { width: 0; } to { width: 100%; } }`}
    </style>
  </div>
);

export default BootScreen;
