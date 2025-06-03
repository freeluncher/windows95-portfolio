import React from 'react';

const Testimonials = () => (
  <section className="testimonials-section">
    <h1>Testimonials</h1>
    <div style={{display:'flex',gap:24,flexWrap:'wrap'}}>
      <div style={{background:'#fff',color:'#222',padding:16,borderRadius:8,maxWidth:260}}>
        <b>"Kerja bareng Gandhi seru, idenya out of the box!"</b>
        <p style={{fontSize:12}}>— Teman Kolaborasi (via chat)</p>
      </div>
      <div style={{background:'#000',color:'#fff',padding:16,borderRadius:8,maxWidth:260}}>
        <b>"Presentasinya selalu kreatif dan fun!"</b>
        <p style={{fontSize:12}}>— Mentor (via video call)</p>
      </div>
      <div style={{background:'#ffea00',color:'#222',padding:16,borderRadius:8,maxWidth:260}}>
        <b>"Suka banget sama desain pixel art-nya!"</b>
        <p style={{fontSize:12}}>— Klien (via surat)</p>
      </div>
    </div>
  </section>
);

export default Testimonials;
