import React, { useState } from 'react';
import Failures from './Failures';
import Dream from './Dream';

const AboutMe = () => {
  const [tab, setTab] = useState('about');
  return (
    <section className="about-section">
      <div style={{display:'flex',gap:8,marginBottom:16}}>
        <button onClick={()=>setTab('about')} style={{background:tab==='about'?'#000080':'#c0c0c0',color:tab==='about'?'#fff':'#222',border:'1px solid #000',padding:'4px 16px',cursor:'pointer'}}>About Me</button>
        <button onClick={()=>setTab('failures')} style={{background:tab==='failures'?'#000080':'#c0c0c0',color:tab==='failures'?'#fff':'#222',border:'1px solid #000',padding:'4px 16px',cursor:'pointer'}}>Failures</button>
        <button onClick={()=>setTab('dream')} style={{background:tab==='dream'?'#000080':'#c0c0c0',color:tab==='dream'?'#fff':'#222',border:'1px solid #000',padding:'4px 16px',cursor:'pointer'}}>Dream</button>
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
