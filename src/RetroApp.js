import React, { useState } from 'react';
import Desktop from './components/Desktop';
import Window from './components/Window';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Taskbar from './components/Taskbar';

function RetroApp() {
  const [openWindows, setOpenWindows] = useState([]);
  const [focusedWindow, setFocusedWindow] = useState(null);

  const handleOpenWindow = (windowName) => {
    if (!openWindows.includes(windowName)) {
      setOpenWindows([...openWindows, windowName]);
    }
    setFocusedWindow(windowName);
  };

  const handleCloseWindow = (windowName) => {
    setOpenWindows(openWindows.filter(w => w !== windowName));
    if (focusedWindow === windowName) setFocusedWindow(null);
  };

  const handleFocusWindow = (windowName) => {
    setFocusedWindow(windowName);
  };

  return (
    <div style={{width:'100vw',height:'100vh',overflow:'hidden'}}>
      <Desktop onOpenWindow={handleOpenWindow} />
      {openWindows.includes('about') && (
        <Window title="About" onClose={() => handleCloseWindow('about')}>
          <About />
        </Window>
      )}
      {openWindows.includes('projects') && (
        <Window title="Projects" onClose={() => handleCloseWindow('projects')}>
          <Projects />
        </Window>
      )}
      {openWindows.includes('contact') && (
        <Window title="Contact" onClose={() => handleCloseWindow('contact')}>
          <Contact />
        </Window>
      )}
      <Taskbar openWindows={openWindows} onFocusWindow={handleFocusWindow} />
    </div>
  );
}

export default RetroApp;
