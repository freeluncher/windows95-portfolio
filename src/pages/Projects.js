import React from 'react';

const Projects = () => (
  <section>
    <h1>PROJECTS</h1>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2rem'}}>
      <div style={{background:'#1a1a1a',padding:'1rem',border:'2px solid #00fff7',boxShadow:'0 0 8px #ff00cc'}}>
        <h2>Retro Game Landing</h2>
        <p>Landing page for a pixel-art game. <br/>Stack: React, CSS, GSAP</p>
        <button className="btn" style={{width:'100%'}}>View</button>
      </div>
      <div style={{background:'#1a1a1a',padding:'1rem',border:'2px solid #00fff7',boxShadow:'0 0 8px #ff00cc'}}>
        <h2>Neon Blog</h2>
        <p>Blog platform with neon retro vibes.<br/>Stack: React, Styled-Components</p>
        <button className="btn" style={{width:'100%'}}>View</button>
      </div>
    </div>
  </section>
);

export default Projects;
