import React, { useState } from 'react';
import Desktop from './components/Desktop';
import Window from './components/Window';
import Hero from './pages/Hero';
import AboutMe from './pages/AboutMe';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Failures from './pages/Failures';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import Dream from './pages/Dream';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
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
      {openWindows.includes('hero') && (
        <Window title="Hero" onClose={() => handleCloseWindow('hero')}>
          <Hero />
        </Window>
      )}
      {openWindows.includes('aboutMe') && (
        <Window title="About Me" onClose={() => handleCloseWindow('aboutMe')}>
          <AboutMe />
        </Window>
      )}
      {openWindows.includes('skills') && (
        <Window title="Skills" onClose={() => handleCloseWindow('skills')}>
          <Skills />
        </Window>
      )}
      {openWindows.includes('projects') && (
        <Window title="Projects" onClose={() => handleCloseWindow('projects')}>
          <Projects />
        </Window>
      )}
      {openWindows.includes('failures') && (
        <Window title="Failures" onClose={() => handleCloseWindow('failures')}>
          <Failures />
        </Window>
      )}
      {openWindows.includes('gallery') && (
        <Window title="Gallery" onClose={() => handleCloseWindow('gallery')}>
          <Gallery />
        </Window>
      )}
      {openWindows.includes('testimonials') && (
        <Window title="Testimonials" onClose={() => handleCloseWindow('testimonials')}>
          <Testimonials />
        </Window>
      )}
      {openWindows.includes('blog') && (
        <Window title="Blog" onClose={() => handleCloseWindow('blog')}>
          <Blog />
        </Window>
      )}
      {openWindows.includes('dream') && (
        <Window title="Dream" onClose={() => handleCloseWindow('dream')}>
          <Dream />
        </Window>
      )}
      {openWindows.includes('contact') && (
        <Window title="Contact" onClose={() => handleCloseWindow('contact')}>
          <Contact />
        </Window>
      )}
      {openWindows.includes('notfound') && (
        <Window title="404" onClose={() => handleCloseWindow('notfound')}>
          <NotFound />
        </Window>
      )}
      <Taskbar openWindows={openWindows} onFocusWindow={handleFocusWindow} />
    </div>
  );
}

export default RetroApp;
