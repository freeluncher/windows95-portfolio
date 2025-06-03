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
  const maxHeight = window.innerHeight || 800;
  iconsWithDynamicRecycleBin.forEach((icon, idx) => {
    if (y + iconHeight > maxHeight - 32) {
      y = 32;
      x += iconWidth + iconGap;
    }
    positions.push({ x, y });
    y += iconHeight + iconGap;
  });

  return (
    <div className="desktop-area" style={{position: 'relative', width: '100vw', height: '100vh', ...bgStyle}}>
      {/* Desktop Icons */}
      {iconsWithDynamicRecycleBin.map((icon, idx) => (
        <DesktopIcon
          key={icon.id}
          icon={icon.icon}
          label={icon.label}
          onDoubleClick={() => onIconDoubleClick(icon.window)}
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
          onClose={() => onWindowClose(win.name)}
          onMinimize={() => onWindowMinimize(win.name)}
          onClick={() => onWindowClick(win.name)}
          onDragToRecycleBin={onDragToRecycleBin}
          recycleBinRef={win.name === 'recycleBin' ? recycleBinRef : recycleBinRef}
          // Attach the ref to the actual Recycle Bin window DOM node only
          windowRef={win.name === 'recycleBin' ? recycleBinRef : undefined}
        >
          {win.content}
        </Window>
      ))}
    </div>
  );
};

export default Desktop;
