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
import clickSound from './assets/sound/click.wav';
import openSound from './assets/sound/open.wav';
import closeSound from './assets/sound/close.wav';
import wallpaper1 from './assets/wallpaper1.jpg';
import wallpaper2 from './assets/wallpaper2.jpg';

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

function playRetroSound(type, enabled) {
  if (!enabled) return;
  let src = clickSound;
  if (type === 'open') src = openSound;
  if (type === 'close') src = closeSound;
  const audio = new window.Audio(src);
  audio.volume = 0.5;
  audio.play();
}

const wallpaperPresets = [
  { type: 'color', value: '#008080', name: 'Teal' },
  { type: 'color', value: '#000080', name: 'Navy' },
  { type: 'color', value: '#228B22', name: 'Forest Green' },
  { type: 'color', value: '#000000', name: 'Black' },
  { type: 'color', value: '#C0C0C0', name: 'Silver' },
  { type: 'image', value: wallpaper1, name: 'Classic 1' },
  { type: 'image', value: wallpaper2, name: 'Classic 2' },
  // Tambahkan gambar lain jika ada di assets
];

function RetroApp() {
  const [openWindows, setOpenWindows] = useState([]); // [{name, z}]
  const [minimized, setMinimized] = useState([]);
  const [zCounter, setZCounter] = useState(10);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [wallpaper, setWallpaper] = useState(wallpaperPresets[0]);

  // Helper: get zIndex for a window
  const getZIndex = (name) => {
    const win = openWindows.find(w => w.name === name);
    return win ? win.z : 0;
  };

  const handleOpenWindow = (windowName) => {
    if (!openWindows.some(w => w.name === windowName)) {
      setOpenWindows([...openWindows, { name: windowName, z: zCounter + 1 }]);
      setZCounter(zCounter + 1);
      playRetroSound('open', soundEnabled);
    } else {
      handleFocusWindow(windowName);
      playRetroSound('click', soundEnabled);
    }
    setMinimized(minimized.filter(w => w !== windowName));
  };

  const handleCloseWindow = (windowName) => {
    setOpenWindows(openWindows.filter(w => w.name !== windowName));
    setMinimized(minimized.filter(w => w !== windowName));
    playRetroSound('close', soundEnabled);
  };

  const handleMinimizeWindow = (windowName) => {
    if (!minimized.includes(windowName)) {
      setMinimized([...minimized, windowName]);
      playRetroSound('click', soundEnabled);
    }
  };

  const handleRestoreWindow = (windowName) => {
    setMinimized(minimized.filter(w => w !== windowName));
    handleFocusWindow(windowName);
    playRetroSound('open', soundEnabled);
  };

  const handleFocusWindow = (windowName) => {
    setOpenWindows(ws => {
      const maxZ = Math.max(...ws.map(w => w.z), zCounter);
      return ws.map(w =>
        w.name === windowName ? { ...w, z: maxZ + 1 } : w
      );
    });
    setZCounter(z => z + 1);
    playRetroSound('click', soundEnabled);
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
      <Desktop onOpenWindow={handleOpenWindow} wallpaper={wallpaper} />
      {windowList.map(w => renderWindow(w.name, w.title, w.Component))}
      <Taskbar 
        openWindows={openWindows.map(w => w.name)} 
        minimized={minimized} 
        onFocusWindow={handleFocusWindow} 
        onRestoreWindow={handleRestoreWindow}
        onStartMenu={handleOpenWindow}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(v => !v)}
        onWallpaperMenu={() => setOpenWindows(ws => ws.some(w=>w.name==='wallpaper')?ws:[...ws,{name:'wallpaper',z:zCounter+1}])}
      />
      {/* Window untuk memilih wallpaper */}
      {openWindows.some(w=>w.name==='wallpaper') && (
        <Window
          key="wallpaper"
          title="Wallpaper"
          onClose={()=>handleCloseWindow('wallpaper')}
          onMinimize={()=>handleMinimizeWindow('wallpaper')}
          onClick={()=>handleFocusWindow('wallpaper')}
          zIndex={getZIndex('wallpaper')}
          top={120}
          left={window.innerWidth/2-220}
          minHeight={320}
          width={440}
        >
          <div style={{marginBottom:8,fontSize:13,color:'#333'}}>Pilih Wallpaper Desktop:</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:12,minHeight:180}}>
            {wallpaperPresets.map((wp,i)=>(
              <div key={i} style={{margin:4,cursor:'pointer',border:wp===wallpaper?'2px solid #000':'1px solid #888',padding:4,borderRadius:4,background:'#fff'}} onClick={()=>setWallpaper(wp)}>
                {wp.type==='color' ? (
                  <div style={{width:60,height:40,background:wp.value}} />
                ) : (
                  <img src={wp.value} alt={wp.name} style={{width:60,height:40,objectFit:'cover'}} />
                )}
                <div style={{fontSize:12,textAlign:'center'}}>{wp.name}</div>
              </div>
            ))}
          </div>
        </Window>
      )}
    </div>
  );
}

export default RetroApp;
