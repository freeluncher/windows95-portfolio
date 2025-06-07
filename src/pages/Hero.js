import React, { useRef, useEffect, useState, useMemo } from 'react';
import profileAnimated from '../assets/profile_animated.png';
import blink0 from '../assets/blink0.png';
import blink1 from '../assets/blink1.png';
import blink2 from '../assets/blink2.png';
import blink3 from '../assets/blink3.png';
import blink4 from '../assets/blink4.png';
import blink5 from '../assets/blink5.png';
import blink6 from '../assets/blink6.png';

const win95Window = {
  background: '#c0c0c0',
  border: '2px solid #fff',
  borderRightColor: '#808080',
  borderBottomColor: '#808080',
  borderRadius: 0,
  boxShadow: '2px 2px 0 #000, 1px 1px 0 #808080',
  fontFamily: 'MS Sans Serif, Tahoma, Geneva, sans-serif',
  width: 440,
  maxWidth: '100%',
  margin: '32px auto',
  padding: 0,
};
const win95Titlebar = {
  background: 'linear-gradient(to bottom, #000080 80%, #1084d0 100%)',
  color: '#fff',
  padding: '4px 12px',
  fontWeight: 'bold',
  fontSize: 17,
  letterSpacing: 0.5,
  borderBottom: '2px solid #808080',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  userSelect: 'none',
  height: 32,
};
const win95Content = {
  padding: '28px 32px 24px 32px',
  background: '#fff',
  minHeight: 180,
  textAlign: 'center',
  borderTop: '2px solid #fff',
};
const win95Btn = {
  width: 22,
  height: 22,
  background: '#c0c0c0',
  border: '1.5px solid #808080',
  borderRightColor: '#fff',
  borderBottomColor: '#fff',
  borderLeftColor: '#808080',
  borderTopColor: '#808080',
  marginLeft: 6,
  color: '#000',
  fontWeight: 'bold',
  fontSize: 15,
  cursor: 'pointer',
  boxShadow: '1px 1px 0 #fff inset',
  padding: 0,
  borderRadius: 0,
};

const blinkFrames = [blink0, blink1, blink2, blink3, blink4, blink5, blink6];

const Hero = () => {
  const avatarRef = useRef(null);
  const [eyePos, setEyePos] = useState({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
  const [isBlinking, setIsBlinking] = useState(false);
  const [blinkFrame, setBlinkFrame] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const blinkTimeout = useRef();
  const blinkInterval = useRef();

  // Responsif: hitung ukuran avatar dan pupil berdasarkan lebar layar
  const [avatarSize, setAvatarSize] = useState(256);
  useEffect(() => {
    const handleResize = () => {
      const vw = Math.min(window.innerWidth, window.innerHeight);
      setAvatarSize(Math.max(128, Math.min(256, Math.floor(vw * 0.8))));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Hitung posisi mata dan pupil proporsional
  const leftEye = useMemo(() => ({ x: Math.round(avatarSize * 0.42), y: Math.round(avatarSize * 0.37) }), [avatarSize]);
  const rightEye = useMemo(() => ({ x: Math.round(avatarSize * 0.58), y: Math.round(avatarSize * 0.37) }), [avatarSize]);
  const eyeRadius = Math.max(2, avatarSize * 0.007);
  const pupilRadius = Math.max(3, Math.round(avatarSize * 0.016));

  useEffect(() => {
    let idleTimeout;
    const setIdle = () => setIsIdle(true);
    const resetIdle = () => {
      setIsIdle(false);
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(setIdle, 2500);
    };
    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('touchmove', resetIdle);
    window.addEventListener('touchstart', resetIdle);
    resetIdle();
    return () => {
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('touchmove', resetIdle);
      window.removeEventListener('touchstart', resetIdle);
      if (idleTimeout) clearTimeout(idleTimeout);
    };
  }, []);

  useEffect(() => {
    // BLINK LOOP selama idle
    if (!isIdle) {
      setIsBlinking(false);
      setBlinkFrame(0);
      if (blinkTimeout.current) clearTimeout(blinkTimeout.current);
      if (blinkInterval.current) clearInterval(blinkInterval.current);
      return;
    }
    const startBlink = () => {
      setIsBlinking(true);
      setBlinkFrame(0);
      let frame = 0;
      blinkInterval.current = setInterval(() => {
        frame++;
        setBlinkFrame(frame);
        if (frame >= blinkFrames.length - 1) {
          clearInterval(blinkInterval.current);
          setTimeout(() => {
            setIsBlinking(false);
            setBlinkFrame(0);
            // Ulangi blink jika masih idle
            if (isIdle) {
              blinkTimeout.current = setTimeout(startBlink, 1200);
            }
          }, 80);
        }
      }, 60);
    };
    startBlink();
    return () => {
      if (blinkTimeout.current) clearTimeout(blinkTimeout.current);
      if (blinkInterval.current) clearInterval(blinkInterval.current);
    };
  }, [isIdle]);

  // --- Eye follow cursor logic ---
  useEffect(() => {
    const handleMove = (e) => {
      const rect = avatarRef.current.getBoundingClientRect();
      let mouseX, mouseY;
      if (e.touches && e.touches[0]) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        // Cegah scroll saat touchmove di avatar
        if (
          mouseX >= rect.left && mouseX <= rect.right &&
          mouseY >= rect.top && mouseY <= rect.bottom
        ) {
          e.preventDefault();
        }
      } else {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }
      // Jika sentuhan/mouse di luar avatar, bola mata kembali ke tengah
      if (
        mouseX < rect.left || mouseX > rect.right ||
        mouseY < rect.top || mouseY > rect.bottom
      ) {
        setEyePos({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
        return;
      }
      const relX = mouseX - rect.left;
      const relY = mouseY - rect.top;
      const calcPupil = (eye) => {
        const dx = relX - eye.x;
        const dy = relY - eye.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const maxDist = eyeRadius;
        if (dist < maxDist) return { x: dx, y: dy };
        return { x: dx * maxDist / dist, y: dy * maxDist / dist };
      };
      setEyePos({
        left: calcPupil(leftEye),
        right: calcPupil(rightEye)
      });
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: false });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [leftEye, rightEye, eyeRadius]);

  return (
    <section style={win95Window}>
      <div style={win95Titlebar}>
        <span style={{display:'flex',alignItems:'center',gap:8}}>
          <img src="/assets/internet-explorer.png" alt="IE" style={{width:22,marginRight:6}} onError={e=>e.target.style.display='none'} />
          <span>Welcome - Gandhi Satria Dewa</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 2, whiteSpace: 'nowrap', overflow: 'hidden' }}>
          <button style={win95Btn} title="Minimize">_</button>
          <button style={win95Btn} title="Maximize">▢</button>
          <button style={win95Btn} title="Close">✕</button>
        </span>
      </div>
      <div style={win95Content}>
        <div
          ref={avatarRef}
          style={{
            position: 'relative',
            width: avatarSize,
            height: avatarSize,
            margin: '0 auto 18px auto',
            border: '2px solid #808080',
            background: '#fff',
            boxShadow: '2px 2px 0 #0008',
            borderRadius: 0,
            overflow: 'hidden',
            cursor: 'pointer',
            display: 'inline-block',
            maxWidth: '90vw',
            maxHeight: '90vw',
          }}
        >
          <img
            src={isBlinking ? blinkFrames[blinkFrame] : profileAnimated}
            alt="Gandhi Avatar"
            style={{ width: avatarSize, height: avatarSize, display: 'block', maxWidth: '100%', maxHeight: '100%' }}
            draggable={false}
          />
          {/* Bola mata kiri */}
          {!isBlinking && (
            <img
              src={require('../assets/pupil.png')}
              alt="pupil"
              style={{
                position: 'absolute',
                left: leftEye.x - pupilRadius + eyePos.left.x,
                top: leftEye.y - pupilRadius + eyePos.left.y,
                width: pupilRadius * 2,
                height: pupilRadius * 2,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
              draggable={false}
            />
          )}
          {/* Bola mata kanan */}
          {!isBlinking && (
            <img
              src={require('../assets/pupil.png')}
              alt="pupil"
              style={{
                position: 'absolute',
                left: rightEye.x - pupilRadius + eyePos.right.x,
                top: rightEye.y - pupilRadius + eyePos.right.y,
                width: pupilRadius * 2,
                height: pupilRadius * 2,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
              draggable={false}
            />
          )}
        </div>
        <h1 style={{fontSize: 22, color: '#000080', margin: '0 0 8px 0', fontFamily: 'MS Sans Serif, Tahoma, Geneva, sans-serif'}}>Gandhi Satria Dewa</h1>
        <h2 style={{fontSize: 15, color: '#222', fontWeight: 'normal', margin: '0 0 18px 0'}}>Web Developer & UI/UX Designer</h2>
        <p style={{fontSize: 15, color: '#222', margin: '0 0 18px 0', lineHeight: 1.7}}>
          Passionate about building interactive, user-friendly web applications with a touch of retro style.<br/>
          Experienced in React, JavaScript, and modern web technologies.<br/>
          Dedicated to delivering clean code, pixel-perfect design, and seamless user experience.
        </p>
        <div style={{margin: '18px 0'}}>
          <a href="#projects" style={{
            background: '#000080', color: '#fff', border: '2px outset #fff',
            fontFamily: 'MS Sans Serif, Tahoma, Geneva, sans-serif', fontSize: 15,
            padding: '8px 28px', textDecoration: 'none', borderRadius: 0, boxShadow: '1px 1px 0 #808080',
            marginRight: 12, cursor: 'pointer', display: 'inline-block'
          }}>View Projects</a>
          <a href="#contact" style={{
            background: '#c0c0c0', color: '#000080', border: '2px outset #fff',
            fontFamily: 'MS Sans Serif, Tahoma, Geneva, sans-serif', fontSize: 15,
            padding: '8px 28px', textDecoration: 'none', borderRadius: 0, boxShadow: '1px 1px 0 #808080',
            cursor: 'pointer', display: 'inline-block'
          }}>Contact Me</a>
        </div>
        <p style={{fontStyle: 'italic', color: '#000080', fontSize: 15, marginTop: 24}}>
          "Blending modern web with the spirit of Windows 95. Let’s build something memorable together!"
        </p>
        {/* Petunjuk penggunaan:
          - Gambar avatar harus memiliki area mata yang jelas (posisi bola mata diatur di leftEye dan rightEye)
          - Bola mata (pupil) akan mengikuti gerakan kursor di area gambar avatar
          - Untuk hasil terbaik, gunakan gambar dengan area putih mata yang cukup
        */}
      </div>
    </section>
  );
};

export default Hero;
