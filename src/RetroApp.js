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

const windowList = [
  { name: 'hero', title: 'Hero', Component: Hero },
  { name: 'aboutMe', title: 'About Me', Component: AboutMe },
  { name: 'skills', title: 'Skills', Component: Skills },
  { name: 'projects', title: 'Projects', Component: Projects },
  { name: 'failures', title: 'Failures', Component: Failures },
  { name: 'gallery', title: 'Gallery', Component: Gallery },
  { name: 'testimonials', title: 'Testimonials', Component: Testimonials },
  { name: 'blog', title: 'Blog', Component: Blog },
  { name: 'dream', title: 'Dream', Component: Dream },
  { name: 'contact', title: 'Contact', Component: Contact },
  { name: 'notfound', title: '404', Component: NotFound },
];

function RetroApp() {
  const [openWindows, setOpenWindows] = useState([]); // [{name, z}]
  const [minimized, setMinimized] = useState([]);
  const [zCounter, setZCounter] = useState(10);

  // Helper: get zIndex for a window
  const getZIndex = (name) => {
    const win = openWindows.find(w => w.name === name);
    return win ? win.z : 0;
  };

  const handleOpenWindow = (windowName) => {
    if (!openWindows.some(w => w.name === windowName)) {
      setOpenWindows([...openWindows, { name: windowName, z: zCounter + 1 }]);
      setZCounter(zCounter + 1);
    } else {
      handleFocusWindow(windowName);
    }
    setMinimized(minimized.filter(w => w !== windowName));
  };

  const handleCloseWindow = (windowName) => {
    setOpenWindows(openWindows.filter(w => w.name !== windowName));
    setMinimized(minimized.filter(w => w !== windowName));
  };

  const handleMinimizeWindow = (windowName) => {
    if (!minimized.includes(windowName)) {
      setMinimized([...minimized, windowName]);
    }
  };

  const handleRestoreWindow = (windowName) => {
    setMinimized(minimized.filter(w => w !== windowName));
    handleFocusWindow(windowName);
  };

  const handleFocusWindow = (windowName) => {
    setOpenWindows(ws => {
      const maxZ = Math.max(...ws.map(w => w.z), zCounter);
      return ws.map(w =>
        w.name === windowName ? { ...w, z: maxZ + 1 } : w
      );
    });
    setZCounter(z => z + 1);
  };

  const renderWindow = (name, title, Component) => {
    const isOpen = openWindows.some(w => w.name === name);
    const isMinimized = minimized.includes(name);
    if (!isOpen || isMinimized) return null;
    const zIndex = getZIndex(name);
    return (
      <Window
        key={name}
        title={title}
        onClose={() => handleCloseWindow(name)}
        onMinimize={() => handleMinimizeWindow(name)}
        onClick={() => handleFocusWindow(name)}
        zIndex={zIndex}
      >
        <Component />
      </Window>
    );
  };

  return (
    <div style={{width:'100vw',height:'100vh',overflow:'hidden'}}>
      <Desktop onOpenWindow={handleOpenWindow} />
      {windowList.map(w => renderWindow(w.name, w.title, w.Component))}
      <Taskbar openWindows={openWindows.map(w => w.name)} minimized={minimized} onFocusWindow={handleFocusWindow} onRestoreWindow={handleRestoreWindow} />
    </div>
  );
}

export default RetroApp;
