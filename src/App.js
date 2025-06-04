import React, { useEffect, useState } from 'react';
import BootScreen from './components/BootScreen';
import RetroApp from './RetroApp';
import BSOD from './components/BSOD';
import './App.css';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [showBSOD, setShowBSOD] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 3000); // 3 detik
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+Shift+B untuk trigger BSOD
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'b') {
        setShowBSOD(true);
      }
      // Jika BSOD aktif, tombol apapun close
      if (showBSOD) {
        setShowBSOD(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showBSOD]);

  return (
    <>
      {showBSOD && <BSOD onClose={() => setShowBSOD(false)} />}
      {isBooting ? <BootScreen /> : <RetroApp />}
    </>
  );
}

export default App;
