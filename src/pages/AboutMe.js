import React from 'react';

const AboutMe = () => (
  <section className="about-section">
    <h1>About Me</h1>
    <p>Hi! Saya Gandhi, suka ngoding sambil dengerin musik 8-bit. Pernah bikin website dari warnet, dan suka koleksi mousepad retro.</p>
    <ul>
      <li>Fun Fact: Pernah ikut lomba mengetik cepat pakai keyboard jadul!</li>
      <li>MBTI: INFP</li>
      <li>Hobi: Pixel art, main game klasik, ngoprek hardware</li>
    </ul>
    <div style={{marginTop: 24}}>
      <img src="/assets/directory_closed-4.png" alt="Infografik Kepribadian" style={{width: 100}} />
      <p style={{fontSize: 12, color: '#888'}}>Infografik kepribadian (dummy)</p>
    </div>
  </section>
);

export default AboutMe;
