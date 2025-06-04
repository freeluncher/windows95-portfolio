import React, { useEffect, useRef, useState, useContext } from 'react';
import { CatPetControlContext } from '../RetroApp';

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
  const catControl = useContext(CatPetControlContext);
  const [frame, setFrame] = useState(0);
  const animRef = useRef();

  // Animasi frame
  useEffect(() => {
    if (!animRef.current) animRef.current = { raf: null };
    function loop() {
      if (catControl.anim === 'walk' && catControl.moving) {
        setFrame(f => (f + 1) % SPRITE_COUNT);
        catControl.setX(x0 => {
          let next = catControl.dir === 'right' ? x0 + WALK_SPEED : x0 - WALK_SPEED;
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
  }, [catControl.anim, catControl.moving, catControl.dir]);

  // Keyboard control (arrow keys) hanya aktif di desktop (non-touch)
  useEffect(() => {
    const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;
    const handleKeyDown = (e) => {
      if (e.repeat) return;
      if (e.key === 'ArrowLeft') catControl.moveLeft();
      if (e.key === 'ArrowRight') catControl.moveRight();
      if (e.key === 'ArrowDown' || e.key === ' ') catControl.idle();
    };
    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') catControl.idle();
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [catControl]);

  // Sprite path
  const sprite = getCatSprite(catControl.anim, catControl.dir, frame);

  return (
    <img
      src={sprite}
      alt="Cat Pet"
      style={{
        position: 'fixed',
        left: catControl.x,
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
