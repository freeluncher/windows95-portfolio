import React, { useEffect, useRef, useState } from 'react';

// Konfigurasi sprite
const SPRITE_COUNT = 8;
const SPRITE_SIZE = 64; // px, sesuaikan dengan ukuran gambar
const WALK_SPEED = 4; // px per frame
const ANIMATION_INTERVAL = 100; // ms per frame
const TASKBAR_HEIGHT = 48; // px, sesuaikan dengan taskbar

// Helper untuk load gambar
function getCatSprite(type, dir, frame) {
  // type: 'walk' | 'idle', dir: 'right' | 'left', frame: 0-7
  try {
    return require(`../assets/cat-${type}-${dir}-${frame}.png`);
  } catch {
    return '';
  }
}

const CatPet = () => {
  const [x, setX] = useState(200); // posisi horizontal
  const [dir, setDir] = useState('right'); // 'right' | 'left'
  const [anim, setAnim] = useState('idle'); // 'idle' | 'walk'
  const [frame, setFrame] = useState(0);
  const [moving, setMoving] = useState(false);
  const animRef = useRef();

  // Keyboard event
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return;
      if (e.key === 'ArrowRight') {
        setDir('right');
        setAnim('walk');
        setMoving(true);
      } else if (e.key === 'ArrowLeft') {
        setDir('left');
        setAnim('walk');
        setMoving(true);
      }
    };
    const handleKeyUp = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        setAnim('idle');
        setMoving(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Animasi frame
  useEffect(() => {
    if (!animRef.current) animRef.current = { raf: null };
    let last = Date.now();
    function loop() {
      if (anim === 'walk' && moving) {
        setFrame(f => (f + 1) % SPRITE_COUNT);
        setX(x0 => {
          let next = dir === 'right' ? x0 + WALK_SPEED : x0 - WALK_SPEED;
          // Batas layar
          next = Math.max(0, Math.min(window.innerWidth - SPRITE_SIZE, next));
          return next;
        });
      } else {
        setFrame(f => (f + 1) % SPRITE_COUNT);
      }
      animRef.current.raf = setTimeout(loop, ANIMATION_INTERVAL);
    }
    animRef.current.raf = setTimeout(loop, ANIMATION_INTERVAL);
    return () => clearTimeout(animRef.current.raf);
  }, [anim, moving, dir]);

  // Sprite path
  const sprite = getCatSprite(anim, dir, frame);

  return (
    <img
      src={sprite}
      alt="Cat Pet"
      style={{
        position: 'fixed',
        left: x,
        bottom: TASKBAR_HEIGHT - 9, // lebih menempel ke taskbar
        width: SPRITE_SIZE,
        height: SPRITE_SIZE,
        zIndex: 9999,
        pointerEvents: 'none',
        userSelect: 'none',
        imageRendering: 'pixelated',
        transition: 'left 0.08s linear',
      }}
      draggable={false}
    />
  );
};

export default CatPet;
