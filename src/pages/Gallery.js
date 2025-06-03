import React from 'react';

const Gallery = () => (
  <section className="gallery-section">
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
  </section>
);

export default Gallery;
