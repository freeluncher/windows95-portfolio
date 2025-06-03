import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Desktop from './components/Desktop';
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
import RecycleBin from './pages/RecycleBin';
import heroIcon from './assets/computer-4.png';
import aboutMeIcon from './assets/computer-4.png';
import skillsIcon from './assets/skill.png';
import projectsIcon from './assets/directory_closed-4.png';
import failuresIcon from './assets/modem-5.png';
import galleryIcon from './assets/camera.png';
import testimonialsIcon from './assets/mydocs.png';
import blogIcon from './assets/modem-5.png';
import dreamIcon from './assets/computer-4.png';
import contactIcon from './assets/modem-5.png';
import notFoundIcon from './assets/directory_closed-4.png';
import recycleBinIconEmpty from './assets/recycle_bin_empty.png';
import recycleBinIconFull from './assets/recycle_bin_full.png';

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
  { name: 'recycleBin', title: 'Recycle Bin', Component: (props) => <RecycleBin {...props} /> },
];

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
  { id: 10, label: 'Contact', icon: contactIcon, window: 'contact' },
  { id: 11, label: '404', icon: notFoundIcon, window: 'notfound' },
  { id: 12, label: 'Recycle Bin', icon: recycleBinIconEmpty, window: 'recycleBin' },
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
];

function RetroApp() {
  const [openWindows, setOpenWindows] = useState([]); // [{name, z}]
  const [minimized, setMinimized] = useState([]);
  const [zCounter, setZCounter] = useState(10);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [wallpaper, setWallpaper] = useState(wallpaperPresets[0]);
  const [closedWindows, setClosedWindows] = useState([]);

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
    const winMeta = windowList.find(w => w.name === windowName);
    if (winMeta && windowName !== 'recycleBin') {
      setClosedWindows(prev => ([...prev, { name: windowName, title: winMeta.title }]));
    }
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

  const handleRestoreClosedWindow = (windowName) => {
    setClosedWindows(closedWindows.filter(w => w.name !== windowName));
    handleOpenWindow(windowName);
  };

  const handleEmptyRecycleBin = () => setClosedWindows([]);

  // Handler drag to recycle bin
  const handleDragToRecycleBin = (windowName) => {
    if (windowName && windowName !== 'recycleBin') {
      handleCloseWindow(windowName);
    }
  };

  // Compose windows for Desktop
  const desktopWindows = openWindows
    .filter(w => !minimized.includes(w.name))
    .map(w => {
      const meta = windowList.find(win => win.name === w.name);
      return {
        name: w.name,
        title: meta?.title || w.name,
        zIndex: w.z,
        top: 120,
        left: 220,
        minHeight: 320,
        width: 440,
        content:
          w.name === 'recycleBin'
            ? <RecycleBin closedWindows={closedWindows} onRestoreWindow={handleRestoreClosedWindow} onEmpty={handleEmptyRecycleBin} />
            : meta && meta.Component ? <meta.Component /> : null,
      };
    });

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{width:'100vw',height:'100vh',overflow:'hidden'}}>
        <Desktop
          icons={icons}
          windows={desktopWindows}
          onIconDoubleClick={handleOpenWindow}
          onWindowClose={handleCloseWindow}
          onWindowMinimize={handleMinimizeWindow}
          onWindowClick={handleFocusWindow}
          onDragToRecycleBin={handleDragToRecycleBin}
          closedWindows={closedWindows}
          onRestoreWindow={handleRestoreClosedWindow}
          onEmptyRecycleBin={handleEmptyRecycleBin}
          wallpaper={wallpaper}
        />
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
          <div style={{position:'absolute',top:120,left:window.innerWidth/2-220,zIndex:9999}}>
            <div style={{background:'#c0c0c0',border:'2px solid #fff',minWidth:440,minHeight:320,padding:16}}>
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
              <button style={{marginTop:16}} onClick={()=>setOpenWindows(ws=>ws.filter(w=>w.name!=='wallpaper'))}>Close</button>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}

export default RetroApp;
