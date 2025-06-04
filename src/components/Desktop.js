import React, { useRef } from 'react';
import DesktopIcon from './DesktopIcon';
import Window from './Window';

const Desktop = ({
  icons,
  windows,
  onIconDoubleClick,
  onWindowClose,
  onWindowMinimize,
  onWindowClick,
  onDragToRecycleBin,
  closedWindows,
  recycleBinItems,
  onRestoreWindow,
  onEmptyRecycleBin,
  wallpaper,
}) => {
  const recycleBinRef = useRef(null);

  let bgStyle = {};
  if (wallpaper) {
    if (wallpaper.type === 'color') {
      bgStyle.background = wallpaper.value;
    } else if (wallpaper.type === 'image') {
      bgStyle.backgroundImage = `url(${wallpaper.value})`;
      bgStyle.backgroundSize = 'cover';
      bgStyle.backgroundPosition = 'center';
    }
  }

  // Tentukan icon Recycle Bin berdasarkan isi
  const recycleBinIcon = closedWindows && closedWindows.length > 0 ? require('../assets/recycle_bin_full.png') : require('../assets/recycle_bin_empty.png');
  const iconsWithDynamicRecycleBin = icons
    ? icons.map(icon => icon.window === 'recycleBin' ? { ...icon, icon: recycleBinIcon } : icon)
    : [];

  // Hitung posisi default icon agar wrap ke kolom baru jika melebihi tinggi desktop
  const iconHeight = 90; // tinggi + margin
  const iconWidth = 80; // lebar icon
  const iconGap = 8;
  let positions = [];
  let x = 24;
  let y = 32;
  // Ambil tinggi taskbar (default 48, bisa diubah jika taskbar beda)
  const TASKBAR_HEIGHT = 48;
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  // Untuk mobile: wrap horizontal jika tinggi sudah penuh (100vh - taskbar)
  const maxHeight = isTouchDevice ? (window.innerHeight - TASKBAR_HEIGHT) : (window.innerHeight || 800);
  iconsWithDynamicRecycleBin.forEach((icon, idx) => {
    if (y + iconHeight > maxHeight - 32) {
      y = 32;
      x += iconWidth + iconGap;
    }
    positions.push({ x, y });
    y += iconHeight + iconGap;
  });

  // Pada mobile, gunakan flexbox untuk .desktop-area dan .desktop-icon agar wrap horizontal
  // dan hilangkan posisi absolute
  return (
    <div
      className="desktop-area"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        display: isTouchDevice ? 'flex' : 'block',
        flexWrap: isTouchDevice ? 'wrap' : undefined,
        alignItems: isTouchDevice ? 'flex-start' : undefined,
        justifyContent: isTouchDevice ? 'flex-start' : undefined,
        overflowY: isTouchDevice ? 'auto' : 'hidden',
        ...bgStyle,
      }}
    >
      {/* Desktop Icons */}
      {iconsWithDynamicRecycleBin.map((icon, idx) => (
        <DesktopIcon
          key={icon.id}
          icon={icon.icon}
          label={icon.label}
          onDoubleClick={() => onIconDoubleClick(icon.window)}
          onOpen={() => onIconDoubleClick(icon.window)}
          defaultPosition={positions[idx]}
        />
      ))}
      {/* Windows */}
      {windows && windows.map(win => (
        <Window
          key={win.name}
          title={win.title}
          name={win.name}
          zIndex={win.zIndex}
          top={win.top}
          left={win.left}
          minHeight={win.minHeight}
          width={win.width}
          onClose={onWindowClose ? () => { console.log('[Desktop] onWindowClose called', win.name); onWindowClose(win.name); } : undefined}
          onMinimize={onWindowMinimize ? () => { console.log('[Desktop] onWindowMinimize called', win.name); onWindowMinimize(win.name); } : undefined}
          onClick={onWindowClick ? () => { console.log('[Desktop] onWindowClick called', win.name); onWindowClick(win.name); } : undefined}
          onDragToRecycleBin={onDragToRecycleBin}
          recycleBinRef={win.name === 'recycleBin' ? recycleBinRef : recycleBinRef}
          windowRef={win.name === 'recycleBin' ? recycleBinRef : undefined}
        >
          {win.content}
        </Window>
      ))}
    </div>
  );
};

export default Desktop;
