import React from 'react';

const Blog = () => (
  <section className="blog-section">
    <h1>Blog & Artikel</h1>
    <div style={{display:'flex',flexDirection:'column',gap:24}}>
      <div style={{background:'#fff',color:'#222',padding:16,borderRadius:8}}>
        <h3>Tips: Bikin Portfolio Retro</h3>
        <p>Mulai dari palet warna, font pixel, dan animasi sederhana. Jangan lupa tambahkan cerita personal!</p>
      </div>
      <div style={{background:'#1a1a1a',color:'#fff',padding:16,borderRadius:8}}>
        <h3>Pengalaman: Gagal Deploy = Belajar</h3>
        <p>Setiap error adalah guru terbaik. Catat dan bagikan insight-nya!</p>
      </div>
    </div>
  </section>
);

export default Blog;
