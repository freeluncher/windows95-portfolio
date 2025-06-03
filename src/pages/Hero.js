import React from 'react';

const Hero = () => (
  <section className="hero-section">
    <h1>Gandhi</h1>
    <h2>Web Developer | Graphic Designer | IT Enthusiast</h2>
    <div style={{margin: '2rem 0'}}>
      <img src="/assets/computer-4.png" alt="Gandhi Illustration" style={{width: 120, animation: 'float 2s infinite alternate'}} />
    </div>
    <p style={{fontStyle: 'italic', color: '#00fff7'}}>"Building the web with a retro soul."</p>
  </section>
);

export default Hero;
