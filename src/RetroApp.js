import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Desktop from './components/Desktop';
import Hero from './pages/Hero';
import AboutMe from './pages/AboutMe';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
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
import galleryIcon from './assets/gallery.png';
import testimonialsIcon from './assets/mydocs.png';
import blogIcon from './assets/blog.png';
import contactIcon from './assets/modem-5.png';
import notFoundIcon from './assets/directory_closed-4.png';
import recycleBinIconEmpty from './assets/recycle_bin_empty.png';
import recycleBinIconFull from './assets/recycle_bin_full.png';

// Tambahkan komponen WallpaperWindow agar window wallpaper konsisten dengan window lain
function WallpaperWindow({ wallpaper, setWallpaper, wallpaperPresets, onClose }) {
  return (
    <div className="window-content" style={{height: '100%', width: '100%', background: '#c0c0c0', boxSizing: 'border-box', overflow: 'auto'}}>
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
      <button style={{marginTop:16}} onClick={onClose}>Close</button>
    </div>
  );
}

function RetroApp() {
  // --- moved from top-level scope ---
  const wallpaperPresets = [
    { type: 'color', value: '#008080', name: 'Teal' },
    { type: 'color', value: '#000080', name: 'Navy' },
    { type: 'color', value: '#228B22', name: 'Forest Green' },
    { type: 'color', value: '#000000', name: 'Black' },
    { type: 'color', value: '#C0C0C0', name: 'Silver' },
    { type: 'image', value: wallpaper1, name: 'Classic 1' },
    { type: 'image', value: wallpaper2, name: 'Classic 2' },
  ];

  const [openWindows, setOpenWindows] = useState([
    { name: 'hero', z: 100 }
  ]); // [{name, z, closing?}]
  const [minimized, setMinimized] = useState([]);
  const [zCounter, setZCounter] = useState(10);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [wallpaper, setWallpaper] = useState(wallpaperPresets[0]);
  const [closedWindows, setClosedWindows] = useState([]);

  // --- moved from top-level scope ---
  function playRetroSound(type, enabled) {
    if (!enabled) return;
    let src = clickSound;
    if (type === 'open') src = openSound;
    if (type === 'close') src = closeSound;
    const audio = new window.Audio(src);
    audio.volume = 0.5;
    audio.play();
  }

  // --- moved from top-level scope ---
  const icons = [
    // { id: 1, label: 'Hero', icon: heroIcon, window: 'hero' }, // Dihilangkan
    { id: 2, label: 'About Me', icon: aboutMeIcon, window: 'aboutMe' },
    { id: 3, label: 'Skills', icon: skillsIcon, window: 'skills' },
    { id: 4, label: 'Projects', icon: projectsIcon, window: 'projects' },
    { id: 6, label: 'Gallery', icon: galleryIcon, window: 'gallery' },
    { id: 7, label: 'Testimonials', icon: testimonialsIcon, window: 'testimonials' },
    { id: 8, label: 'Blog', icon: blogIcon, window: 'blog' },
    { id: 10, label: 'Contact', icon: contactIcon, window: 'contact' },
    { id: 11, label: '404', icon: notFoundIcon, window: 'notfound' },
    { id: 12, label: 'Recycle Bin', icon: recycleBinIconEmpty, window: 'recycleBin' },
  ];

  // --- FIX: Update recycle bin icon based on closedWindows ---
  const recycleBinIcon = closedWindows && closedWindows.length > 0 ? recycleBinIconFull : recycleBinIconEmpty;
  const iconsWithDynamicRecycleBin = icons.map(icon =>
    icon.window === 'recycleBin' ? { ...icon, icon: recycleBinIcon } : icon
  );

  // windowList harus didefinisikan SETELAH semua variabel di atas
  const windowList = [
    { name: 'hero', title: 'Hero', Component: Hero },
    { name: 'aboutMe', title: 'About Me', Component: AboutMe },
    { name: 'skills', title: 'Skills', Component: Skills },
    { name: 'projects', title: 'Projects', Component: Projects },
    { name: 'gallery', title: 'Gallery', Component: Gallery },
    { name: 'testimonials', title: 'Testimonials', Component: Testimonials },
    { name: 'blog', title: 'Blog', Component: Blog },
    { name: 'contact', title: 'Contact', Component: Contact },
    { name: 'notfound', title: '404', Component: NotFound },
    { name: 'recycleBin', title: 'Recycle Bin', Component: (props) => <RecycleBin {...props} /> },
    { name: 'wallpaper', title: 'Wallpaper', Component: (props) => <WallpaperWindow {...props} wallpaper={wallpaper} setWallpaper={setWallpaper} wallpaperPresets={wallpaperPresets} onClose={()=>setOpenWindows(ws=>ws.filter(w=>w.name!=='wallpaper'))} /> },
  ];

  // --- LOG STATE ON EVERY RENDER ---
  console.log('[RENDER] openWindows:', openWindows);
  console.log('[RENDER] closedWindows:', closedWindows);
  console.log('[RENDER] minimized:', minimized);

  // Helper: get zIndex for a window
  const getZIndex = (name) => {
    const win = openWindows.find(w => w.name === name);
    return win ? win.z : 0;
  };

  const handleOpenWindow = (windowName) => {
    window.DEBUG_OPEN = (window.DEBUG_OPEN || 0) + 1;
    console.log('[DEBUG] handleOpenWindow called', windowName, 'call#', window.DEBUG_OPEN);
    setClosedWindows(prevClosed => {
      console.log('[DEBUG] setClosedWindows updater (open) prevClosed:', prevClosed);
      if (prevClosed.some(w => w.name === windowName)) {
        console.log('[DEBUG] Remove from closedWindows:', windowName);
        return prevClosed.filter(w => w.name !== windowName);
      }
      return prevClosed;
    });
    setOpenWindows(prevOpen => {
      console.log('[DEBUG] setOpenWindows updater (open) prevOpen:', prevOpen);
      if (prevOpen.some(w => w.name === windowName) && !minimized.includes(windowName)) {
        console.log('[DEBUG] Window already open and not minimized:', windowName);
        handleFocusWindow(windowName);
        playRetroSound('click', soundEnabled);
        return prevOpen;
      }
      if (prevOpen.some(w => w.name === windowName) && minimized.includes(windowName)) {
        console.log('[DEBUG] Window open but minimized, restoring:', windowName);
        setMinimized(minimized.filter(w => w !== windowName));
        handleFocusWindow(windowName);
        playRetroSound('open', soundEnabled);
        return prevOpen;
      }
      console.log('[DEBUG] openWindows before open:', JSON.stringify(prevOpen));
      playRetroSound('open', soundEnabled);
      setZCounter(z => z + 1);
      const newOpen = [...prevOpen, { name: windowName, z: zCounter + 1 }];
      console.log('[DEBUG] openWindows after open:', newOpen);
      return newOpen;
    });
  };

  const handleCloseWindow = (windowName) => {
    window.DEBUG_CLOSE = (window.DEBUG_CLOSE || 0) + 1;
    console.log('[DEBUG] handleCloseWindow called', windowName, 'call#', window.DEBUG_CLOSE);
    console.log('[DEBUG] openWindows before close:', JSON.stringify(openWindows));
    console.log('[DEBUG] closedWindows before close:', JSON.stringify(closedWindows));
    const winMeta = windowList.find(w => w.name === windowName);
    if (winMeta && windowName !== 'recycleBin' && !closedWindows.some(w => w.name === windowName)) {
      setClosedWindows(prev => {
        const newClosed = [...prev, { name: windowName, title: winMeta.title }];
        console.log('[DEBUG] Add to closedWindows:', windowName, 'newClosed:', newClosed);
        return newClosed;
      });
    }
    setOpenWindows(prev => {
      const mapped = prev.map(w => w.name === windowName ? { ...w, closing: true } : w);
      console.log('[DEBUG] setOpenWindows updater (close) mapped:', mapped);
      return mapped;
    });
    setMinimized(minimized.filter(w => w !== windowName));
    playRetroSound('close', soundEnabled);
    setTimeout(() => {
      setOpenWindows(prev => {
        const filtered = prev.filter(w => w.name !== windowName);
        console.log('[DEBUG] setOpenWindows updater (timeout) filtered:', filtered);
        return filtered;
      });
      // Log state after close
      setTimeout(() => {
        console.log('[DEBUG] openWindows after close:', openWindows);
        console.log('[DEBUG] closedWindows after close:', closedWindows);
      }, 0);
    }, 200);
  };

  const handleMinimizeWindow = (windowName) => {
    console.log('[DEBUG] handleMinimizeWindow', windowName);
    if (!minimized.includes(windowName)) {
      setMinimized(prev => {
        const newMin = [...prev, windowName];
        console.log('[DEBUG] setMinimized updater (minimize) newMin:', newMin);
        return newMin;
      });
      playRetroSound('click', soundEnabled);
    }
  };

  const handleRestoreWindow = (windowName) => {
    console.log('[DEBUG] handleRestoreWindow', windowName);
    setMinimized(prev => {
      const newMin = prev.filter(w => w !== windowName);
      console.log('[DEBUG] setMinimized updater (restore) newMin:', newMin);
      return newMin;
    });
    handleFocusWindow(windowName);
    playRetroSound('open', soundEnabled);
  };

  const handleFocusWindow = (windowName) => {
    console.log('[DEBUG] handleFocusWindow', windowName);
    setOpenWindows(ws => {
      const maxZ = Math.max(...ws.map(w => w.z), zCounter);
      const mapped = ws.map(w => w.name === windowName ? { ...w, z: maxZ + 1 } : w);
      console.log('[DEBUG] setOpenWindows updater (focus) mapped:', mapped);
      return mapped;
    });
    setZCounter(z => z + 1);
    playRetroSound('click', soundEnabled);
  };

  const handleRestoreClosedWindow = (windowName) => {
    console.log('[DEBUG] handleRestoreClosedWindow', windowName);
    setClosedWindows(prev => {
      const newClosed = prev.filter(w => w.name !== windowName);
      console.log('[DEBUG] setClosedWindows updater (restoreClosed) newClosed:', newClosed);
      return newClosed;
    });
    handleOpenWindow(windowName);
  };

  const handleEmptyRecycleBin = () => {
    console.log('[DEBUG] handleEmptyRecycleBin');
    setClosedWindows([]);
  };

  const handleDragToRecycleBin = (windowName) => {
    console.log('[DEBUG] handleDragToRecycleBin', windowName);
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
          icons={iconsWithDynamicRecycleBin}
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
      </div>
    </DndProvider>
  );
}

export default RetroApp;
