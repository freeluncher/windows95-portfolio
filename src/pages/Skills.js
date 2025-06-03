import React from 'react';

const Skills = () => (
  <section className="skills-section">
    <h1>Skills</h1>
    <div style={{display: 'flex', gap: 32, flexWrap: 'wrap'}}>
      <div>
        <h3>Frontend</h3>
        <div style={{background:'#222',borderRadius:8,padding:8}}>
          <div style={{color:'#00fff7'}}>React</div>
          <div style={{background:'#00fff7',height:8,width:'90%',borderRadius:4,margin:'4px 0'}}></div>
          <div style={{color:'#ff00cc'}}>CSS Retro</div>
          <div style={{background:'#ff00cc',height:8,width:'80%',borderRadius:4,margin:'4px 0'}}></div>
        </div>
      </div>
      <div>
        <h3>Design</h3>
        <div style={{background:'#222',borderRadius:8,padding:8}}>
          <div style={{color:'#ffea00'}}>Pixel Art</div>
          <div style={{background:'#ffea00',height:8,width:'85%',borderRadius:4,margin:'4px 0'}}></div>
          <div style={{color:'#00fff7'}}>Figma</div>
          <div style={{background:'#00fff7',height:8,width:'70%',borderRadius:4,margin:'4px 0'}}></div>
        </div>
      </div>
    </div>
  </section>
);

export default Skills;
