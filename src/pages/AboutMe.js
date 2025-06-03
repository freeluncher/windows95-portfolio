import React, { useState } from 'react';
import Failures from './Failures';
import Dream from './Dream';

const AboutMe = () => {
  const [tab, setTab] = useState('about');
  return (
    <section className="about-section" style={{paddingTop: 0, marginTop: 0}}>
      <div className="window-tabs" style={{marginTop: '-8px'}}>
        <button className={tab==='about' ? 'window-tab active' : 'window-tab'} onClick={()=>setTab('about')}>About Me</button>
        <button className={tab==='failures' ? 'window-tab active' : 'window-tab'} onClick={()=>setTab('failures')}>Failures</button>
        <button className={tab==='dream' ? 'window-tab active' : 'window-tab'} onClick={()=>setTab('dream')}>Dream</button>
      </div>
      <div>
        {tab==='about' && (
          <>
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
          </>
        )}
        {tab==='failures' && <Failures />}
        {tab==='dream' && <Dream />}
      </div>
    </section>
  );
};

export default AboutMe;
