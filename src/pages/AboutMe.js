import React, { useState } from 'react';
import Failures from './Failures';
import Dream from './Dream';
import './AboutMe.css';

// Gunakan asset yang sudah ada
import folderIcon from '../assets/mydocs.png';
import userPhoto from '../assets/profile.jpg'; // Ganti dengan foto user jika ada

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

const AboutMe = () => {
  const [tab, setTab] = useState('general');
  return (
    <section className="win95-window" style={win95Window}>
      <div className="win95-content" style={win95Content}>
        <div className="window-tabs properties-tabs">
          <button className={tab==='general' ? 'window-tab active' : 'window-tab'} onClick={()=>setTab('general')}><span>General</span></button>
          <button className={tab==='details' ? 'window-tab active' : 'window-tab'} onClick={()=>setTab('details')}><span>Details</span></button>
          <button className={tab==='failures' ? 'window-tab active' : 'window-tab'} onClick={()=>setTab('failures')}><span>Failures</span></button>
          <button className={tab==='dream' ? 'window-tab active' : 'window-tab'} onClick={()=>setTab('dream')}><span>Dream</span></button>
        </div>
        <div className="properties-content">
          {tab==='general' && (
            <div className="properties-general" style={{display: 'flex', alignItems: 'center', gap: 32}}>
              <div className="properties-photo-area" style={{flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 180, minWidth: 180}}>
                <img src={userPhoto} alt="User" className="properties-photo" style={{width: 160, height: 160, border: '3px solid #808080', background: '#fff', objectFit: 'cover', borderRadius: 0, boxShadow: '2px 2px 0 #0008'}} />
              </div>
              <form className="properties-info properties-form" autoComplete="off" style={{flex: 1, display: 'grid', gridTemplateColumns: 'max-content 1fr', rowGap: 10, columnGap: 12, alignItems: 'center', marginTop: 0}}>
                <label className="properties-label" htmlFor="nama">Nama:</label>
                <input id="nama" type="text" defaultValue="Gandhi Satria Dewa" className="retro-input" style={{width: '100%', fontFamily: 'inherit', fontSize: 16, padding: '2px 6px', border: '2px inset #808080', background: '#fff', color: '#222', borderRadius: 0}} readOnly />
                <label className="properties-label" htmlFor="tgl">Tanggal Lahir:</label>
                <input id="tgl" type="text" defaultValue="6 May 2003" className="retro-input" style={{width: '100%', fontFamily: 'inherit', fontSize: 16, padding: '2px 6px', border: '2px inset #808080', background: '#fff', color: '#222', borderRadius: 0}} readOnly />
                <label className="properties-label" htmlFor="lokasi">Lokasi:</label>
                <input id="lokasi" type="text" defaultValue="Semarang, Indonesia" className="retro-input" style={{width: '100%', fontFamily: 'inherit', fontSize: 16, padding: '2px 6px', border: '2px inset #808080', background: '#fff', color: '#222', borderRadius: 0}} readOnly />
                <label className="properties-label" htmlFor="hobi">Hobi:</label>
                <input id="hobi" type="text" defaultValue="Programming, Design, Technology" className="retro-input" style={{width: '100%', fontFamily: 'inherit', fontSize: 16, padding: '2px 6px', border: '2px inset #808080', background: '#fff', color: '#222', borderRadius: 0}} readOnly />
                <label className="properties-label" htmlFor="email">Email:</label>
                <input id="email" type="text" defaultValue="gandhisatriadewa06@gmail.com" className="retro-input" style={{width: '100%', fontFamily: 'inherit', fontSize: 16, padding: '2px 6px', border: '2px inset #808080', background: '#fff', color: '#222', borderRadius: 0}} readOnly />
              </form>
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
                  <li>Motto: "Keep it retro, keep it fun!"</li>
                </ul>
              </div>
            </div>
          )}
          {tab==='failures' && <Failures />}
          {tab==='dream' && <Dream />}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
