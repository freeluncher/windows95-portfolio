import React from 'react';

const Skills = () => (
  <section className="properties-dialog" style={{padding:0}}>
    <h1 style={{fontSize:18, margin:'18px 0 8px 0', color:'#222', fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif', textAlign:'center'}}>Skills & Preferences</h1>
    <form className="properties-form" autoComplete="off" style={{maxWidth:440,margin:'0 auto',background:'#c0c0c0',padding:'18px 24px 18px 24px',border:'2px solid #fff',borderRightColor:'#808080',borderBottomColor:'#808080',borderRadius:0,boxShadow:'2px 2px 0 #000, 1px 1px 0 #808080',display:'grid',gridTemplateColumns:'max-content 1fr',rowGap:14,columnGap:16,alignItems:'center'}}>
      <label className="properties-label" htmlFor="frontend" style={{fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:15}}>Frontend:</label>
      <select id="frontend" className="retro-input" style={{width:'100%',fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:15,padding:'2px 6px',border:'2px inset #808080',background:'#fff',color:'#222',borderRadius:0}} defaultValue="React">
        <option>React</option>
        <option>HTML/CSS</option>
        <option>JavaScript</option>
        <option>Redux</option>
      </select>
      <label className="properties-label" htmlFor="design" style={{fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:15}}>Design:</label>
      <select id="design" className="retro-input" style={{width:'100%',fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:15,padding:'2px 6px',border:'2px inset #808080',background:'#fff',color:'#222',borderRadius:0}} defaultValue="Pixel Art">
        <option>Pixel Art</option>
        <option>Figma</option>
        <option>Photoshop</option>
        <option>Illustrator</option>
      </select>
      <label className="properties-label" htmlFor="os" style={{fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:15}}>Favorite OS:</label>
      <select id="os" className="retro-input" style={{width:'100%',fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:15,padding:'2px 6px',border:'2px inset #808080',background:'#fff',color:'#222',borderRadius:0}} defaultValue="Windows 95">
        <option>Windows 95</option>
        <option>Windows XP</option>
        <option>Linux</option>
        <option>Mac OS</option>
      </select>
      <label className="properties-label" htmlFor="theme" style={{fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:15}}>Theme:</label>
      <select id="theme" className="retro-input" style={{width:'100%',fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:15,padding:'2px 6px',border:'2px inset #808080',background:'#fff',color:'#222',borderRadius:0}} defaultValue="Retro">
        <option>Retro</option>
        <option>Modern</option>
        <option>Dark</option>
        <option>Light</option>
      </select>
      <div></div>
      <button type="button" className="btn" style={{marginTop:8,marginBottom:0,justifySelf:'start',fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:15,padding:'4px 24px',border:'2px outset #fff',borderRightColor:'#808080',borderBottomColor:'#808080',borderRadius:0,background:'#e4e4e4',color:'#222',boxShadow:'none'}}>OK</button>
    </form>
  </section>
);

export default Skills;
