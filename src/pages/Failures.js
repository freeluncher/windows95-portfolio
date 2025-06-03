import React from 'react';

const Failures = () => (
  <section className="failures-section">
    <h1>Kegagalan & Lessons Learned</h1>
    <p>Pernah gagal deploy web karena lupa titik koma, dan pernah salah upload file ke server produksi. Tapi dari situ belajar pentingnya detail dan backup!</p>
    <ul>
      <li>Gagal hackathon: Belajar teamwork & komunikasi</li>
      <li>Bug lucu: Pernah typo jadi <b>console.lag()</b></li>
      <li>Lesson: Setiap kegagalan = insight baru</li>
    </ul>
  </section>
);

export default Failures;
