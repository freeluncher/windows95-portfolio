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
  const [minimized, setMinimized] = useState([]);
  const [focusedWindow, setFocusedWindow] = useState(null);

  const handleOpenWindow = (windowName) => {
    if (!openWindows.includes(windowName)) {
      setOpenWindows([...openWindows, windowName]);
    }
    setMinimized(minimized.filter(w => w !== windowName));
    setFocusedWindow(windowName);
  };

  const handleCloseWindow = (windowName) => {
    setOpenWindows(openWindows.filter(w => w !== windowName));
    setMinimized(minimized.filter(w => w !== windowName));
    if (focusedWindow === windowName) setFocusedWindow(null);
  };

  const handleMinimizeWindow = (windowName) => {
    if (!minimized.includes(windowName)) {
      setMinimized([...minimized, windowName]);
    }
  };

  const handleRestoreWindow = (windowName) => {
    setMinimized(minimized.filter(w => w !== windowName));
    setFocusedWindow(windowName);
  };

  const handleFocusWindow = (windowName) => {
    setFocusedWindow(windowName);
  };

  const renderWindow = (name, title, Component) => (
    openWindows.includes(name) && !minimized.includes(name) && (
      <Window
        title={title}
        onClose={() => handleCloseWindow(name)}
        onMinimize={() => handleMinimizeWindow(name)}
      >
        <Component />
      </Window>
    )
  );

  return (
    <div style={{width:'100vw',height:'100vh',overflow:'hidden'}}>
      <Desktop onOpenWindow={handleOpenWindow} />
      {renderWindow('hero', 'Hero', Hero)}
      {renderWindow('aboutMe', 'About Me', AboutMe)}
      {renderWindow('skills', 'Skills', Skills)}
      {renderWindow('projects', 'Projects', Projects)}
      {renderWindow('failures', 'Failures', Failures)}
      {renderWindow('gallery', 'Gallery', Gallery)}
      {renderWindow('testimonials', 'Testimonials', Testimonials)}
      {renderWindow('blog', 'Blog', Blog)}
      {renderWindow('dream', 'Dream', Dream)}
      {renderWindow('contact', 'Contact', Contact)}
      {renderWindow('notfound', '404', NotFound)}
      <Taskbar openWindows={openWindows} minimized={minimized} onFocusWindow={handleFocusWindow} onRestoreWindow={handleRestoreWindow} />
    </div>
  );
}

export default RetroApp;
