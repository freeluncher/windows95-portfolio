import React from 'react';

const NotFound = () => (
  <section className="notfound-section" style={{textAlign:'center',padding:'4rem 1rem'}}>
    <h1 style={{fontSize:64}}>404</h1>
    <p style={{fontSize:24}}>Oops! Halaman tidak ditemukan.</p>
    <p style={{fontStyle:'italic',color:'#ff00cc'}}>Mungkin icon-nya lagi ngumpet di recycle bin?</p>
    <img src="/assets/directory_closed-4.png" alt="404" style={{width:120,margin:'2rem auto'}} />
    <a href="/" className="btn">Kembali ke Desktop</a>
  </section>
);

export default NotFound;
