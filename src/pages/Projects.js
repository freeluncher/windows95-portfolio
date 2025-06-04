import React from 'react';

const win95Window = {
  background: '#c0c0c0',
  border: '2px solid #fff',
  borderRightColor: '#808080',
  borderBottomColor: '#808080',
  borderRadius: 0,
  boxShadow: '2px 2px 0 #000, 1px 1px 0 #808080',
  fontFamily: 'MS Sans Serif, Tahoma, Geneva, sans-serif',
  width: 420,
  maxWidth: '100%',
  margin: '0 auto',
  padding: 0,
};
const win95Content = {
  padding: '18px 24px 18px 24px',
  background: '#c0c0c0',
  minHeight: 180,
  textAlign: 'center',
};
const win95Group = {
  border: '2px groove #808080',
  background: '#c0c0c0',
  margin: '0 0 18px 0',
  padding: '12px 16px 10px 16px',
  minWidth: 0,
};
const win95Legend = {
  fontFamily: 'MS Sans Serif, Tahoma, Geneva, sans-serif',
  fontSize: 13,
  color: '#222',
  padding: '0 8px',
};
const win95Btn = {
  minWidth: 72,
  fontFamily: 'MS Sans Serif, Tahoma, Geneva, sans-serif',
  fontSize: 15,
  padding: '4px 24px',
  border: '2px outset #fff',
  borderRightColor: '#808080',
  borderBottomColor: '#808080',
  borderRadius: 0,
  background: '#e4e4e4',
  color: '#222',
  boxShadow: 'none',
  marginTop: 8,
};

const Projects = () => (
  <section className="win95-window" style={win95Window}>
    <div className="win95-content" style={win95Content}>
      <h1 style={{fontSize:18, margin:'18px 0 8px 0', color:'#222', fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif', textAlign:'center', letterSpacing:2}}>Projects</h1>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'18px',padding:'0 18px'}}>
        <fieldset style={win95Group}>
          <legend style={win95Legend}>Retro Game Landing</legend>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            <span style={{fontWeight:'bold',color:'#222'}}>Landing page for a pixel-art game.</span>
            <span style={{fontSize:12,color:'#333'}}>Sebuah landing page dengan nuansa retro pixel-art, animasi interaktif, dan layout klasik.</span>
            <span style={{fontSize:13,color:'#444'}}>Stack: React, CSS, GSAP</span>
            <button className="btn" style={win95Btn}>View</button>
          </div>
        </fieldset>
        <fieldset style={win95Group}>
          <legend style={win95Legend}>Neon Blog</legend>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            <span style={{fontWeight:'bold',color:'#222'}}>Blog platform with neon retro vibes.</span>
            <span style={{fontSize:12,color:'#333'}}>Platform blog dengan tema neon, efek glowing, dan pengalaman membaca yang modern namun retro.</span>
            <span style={{fontSize:13,color:'#444'}}>Stack: React, Styled-Components</span>
            <button className="btn" style={win95Btn}>View</button>
          </div>
        </fieldset>
      </div>
    </div>
  </section>
);

export default Projects;
