import React, { useState } from 'react';
import Failures from './Failures';
import Dream from './Dream';

// Gunakan asset yang sudah ada
import folderIcon from '../assets/mydocs.png';
import userPhoto from '../assets/camera.png'; // Ganti dengan foto user jika ada

const AboutMe = () => {
  const [tab, setTab] = useState('general');
  return (
    <section className="properties-dialog">
      <div className="window-tabs properties-tabs">
        <button className={tab==='general' ? 'window-tab active' : 'window-tab'} onClick={()=>setTab('general')}><span>General</span></button>
        <button className={tab==='details' ? 'window-tab active' : 'window-tab'} onClick={()=>setTab('details')}><span>Details</span></button>
        <button className={tab==='failures' ? 'window-tab active' : 'window-tab'} onClick={()=>setTab('failures')}><span>Failures</span></button>
        <button className={tab==='dream' ? 'window-tab active' : 'window-tab'} onClick={()=>setTab('dream')}><span>Dream</span></button>
      </div>
      <div className="properties-content">
        {tab==='general' && (
          <div className="properties-general">
            <div className="properties-icon-area">
              <img src={folderIcon} alt="Folder Icon" className="properties-icon" />
              <img src={userPhoto} alt="User" className="properties-photo" />
            </div>
            <div className="properties-info">
              <div><span className="properties-label">Name:</span> Gandhi</div>
              <div><span className="properties-label">Type:</span> Folder</div>
              <div><span className="properties-label">Location:</span> C:\Users\Gandhi\Portfolio</div>
              <div><span className="properties-label">Size:</span> 1.44 MB (floppy style!)</div>
              <div><span className="properties-label">Created:</span> 2000-01-01</div>
            </div>
          </div>
        )}
        {tab==='details' && (
          <div className="properties-details">
            <div className="properties-bio">
              <b>About Gandhi</b>
              <p>Hi! Saya Gandhi, suka ngoding sambil dengerin musik 8-bit. Pernah bikin website dari warnet, dan suka koleksi mousepad retro.</p>
              <ul>
                <li>Fun Fact: Pernah ikut lomba mengetik cepat pakai keyboard jadul!</li>
                <li>MBTI: INFP</li>
                <li>Hobi: Pixel art, main game klasik, ngoprek hardware</li>
              </ul>
            </div>
          </div>
        )}
        {tab==='failures' && <Failures />}
        {tab==='dream' && <Dream />}
      </div>
    </section>
  );
};

export default AboutMe;
