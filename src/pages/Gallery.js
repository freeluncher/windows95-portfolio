import React from 'react';
import './Gallery.css';

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

const Gallery = () => (
  <section className="win95-window" style={win95Window}>
    <div className="win95-content" style={win95Content}>
      <h1>Gallery</h1>
      <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
        <img src="/assets/computer-4.png" alt="Foto 1" style={{width:120,borderRadius:8}} />
        <img src="/assets/directory_closed-4.png" alt="Foto 2" style={{width:120,borderRadius:8}} />
        <img src="/assets/modem-5.png" alt="Foto 3" style={{width:120,borderRadius:8}} />
        <video width="180" controls style={{borderRadius:8}}>
          <source src="/assets/sample.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </section>
);

export default Gallery;
