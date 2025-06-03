import React, { useState } from 'react';
import Desktop from './components/Desktop';
import Window from './components/Window';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function RetroApp() {
  const [openWindows, setOpenWindows] = useState([]);

  const handleOpenWindow = (windowName) => {
    if (!openWindows.includes(windowName)) {
      setOpenWindows([...openWindows, windowName]);
    }
  };

  const handleCloseWindow = (windowName) => {
    setOpenWindows(openWindows.filter(w => w !== windowName));
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
    </div>
  );
}

export default RetroApp;
