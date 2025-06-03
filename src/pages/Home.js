import React from 'react';

const Home = () => (
  <section>
    <h1>WELCOME TO MY PORTFOLIO</h1>
    <p style={{fontSize: '1.1rem'}}>Hi, I am <span style={{color:'#00fff7'}}>Gandhi</span>.<br/>Web Developer | Graphic Designer | IT Enthusiast.</p>
    <img src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif" alt="retro computer" style={{width:'220px',margin:'2rem auto',display:'block',border:'4px solid #ff00cc',boxShadow:'0 0 16px #00fff7'}} />
    <a href="/projects" className="btn">See My Projects</a>
  </section>
);

export default Home;
