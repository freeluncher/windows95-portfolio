import React from 'react';

const skillBarStyle = {
  flex: 1,
  background: '#c0c0c0',
  border: '2px solid #808080',
  height: 15,
  position: 'relative',
  minWidth: 60,
  boxShadow: 'inset 1px 1px 0 #fff',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
};
const skillFillStyle = (percent, color) => ({
  width: percent,
  height: '100%',
  background: color || 'repeating-linear-gradient(135deg,#e4e4e4 0 4px,#c0c0c0 4px 8px)',
  borderRight: '2px solid #222',
  transition: 'width 0.5s',
});
const skillLabelStyle = {
  position: 'absolute',
  right: 6,
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: 12,
  color: '#222',
  background: '#c0c0c0',
  padding: '0 2px',
  lineHeight: '15px',
  zIndex: 2,
  fontFamily: 'MS Sans Serif, Tahoma, Geneva, sans-serif',
};

const Skills = () => (
  <section className="properties-dialog" style={{ padding: 0, height: '100%', minHeight: 0 }}>
    <h1 style={{fontSize:18, margin:'18px 0 8px 0', color:'#222', fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif', textAlign:'center'}}>Skills & Proficiency</h1>
    <div style={{height:'calc(100% - 44px)', minHeight:220, width:'100%', maxWidth:'none', margin:0, background:'#c0c0c0', padding:'18px 24px 18px 24px', border:'2px solid #fff', borderRightColor:'#808080', borderBottomColor:'#808080', borderRadius:0, boxShadow:'2px 2px 0 #000, 1px 1px 0 #808080', boxSizing:'border-box', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
      <fieldset style={{border:'2px groove #808080',margin:'0 0 12px 0',padding:'8px 8px 4px 8px',background:'#c0c0c0'}}>
        <legend style={{fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:13,color:'#222',padding:'0 8px'}}>Frontend</legend>
        <div style={{display:'grid',rowGap:6}}>
          <label style={{display:'flex',alignItems:'center',gap:8}}>
            <span style={{width:70}}>React</span>
            <div style={skillBarStyle}>
              <div style={skillFillStyle('90%','#00aaff')}></div>
              <span style={skillLabelStyle}>Expert</span>
            </div>
          </label>
          <label style={{display:'flex',alignItems:'center',gap:8}}>
            <span style={{width:70}}>HTML/CSS</span>
            <div style={skillBarStyle}>
              <div style={skillFillStyle('85%','#00cc66')}></div>
              <span style={skillLabelStyle}>Advanced</span>
            </div>
          </label>
          <label style={{display:'flex',alignItems:'center',gap:8}}>
            <span style={{width:70}}>JavaScript</span>
            <div style={skillBarStyle}>
              <div style={skillFillStyle('80%','#ffcc00')}></div>
              <span style={skillLabelStyle}>Advanced</span>
            </div>
          </label>
        </div>
      </fieldset>
      <fieldset style={{border:'2px groove #808080',margin:'0 0 12px 0',padding:'8px 8px 4px 8px',background:'#c0c0c0'}}>
        <legend style={{fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:13,color:'#222',padding:'0 8px'}}>Design</legend>
        <div style={{display:'grid',rowGap:6}}>
          <label style={{display:'flex',alignItems:'center',gap:8}}>
            <span style={{width:70}}>Pixel Art</span>
            <div style={skillBarStyle}>
              <div style={skillFillStyle('85%','repeating-linear-gradient(135deg,#e4e4e4 0 4px,#c0c0c0 4px 8px)')}></div>
              <span style={skillLabelStyle}>Advanced</span>
            </div>
          </label>
          <label style={{display:'flex',alignItems:'center',gap:8}}>
            <span style={{width:70}}>Figma</span>
            <div style={skillBarStyle}>
              <div style={skillFillStyle('80%','repeating-linear-gradient(135deg,#e4e4e4 0 4px,#c0c0c0 4px 8px)')}></div>
              <span style={skillLabelStyle}>Intermediate</span>
            </div>
          </label>
        </div>
      </fieldset>
      <fieldset style={{border:'2px groove #808080',margin:'0 0 12px 0',padding:'8px 8px 4px 8px',background:'#c0c0c0'}}>
        <legend style={{fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:13,color:'#222',padding:'0 8px'}}>Other</legend>
        <div style={{display:'grid',rowGap:6}}>
          <label style={{display:'flex',alignItems:'center',gap:8}}>
            <span style={{width:70}}>Linux</span>
            <div style={skillBarStyle}>
              <div style={skillFillStyle('60%','#888')}></div>
              <span style={skillLabelStyle}>Basic</span>
            </div>
          </label>
        </div>
      </fieldset>
      <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:10}}>
        <button type="button" className="btn" style={{minWidth:72,fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:15,padding:'4px 24px',border:'2px outset #fff',borderRightColor:'#808080',borderBottomColor:'#808080',borderRadius:0,background:'#e4e4e4',color:'#222',boxShadow:'none'}}>OK</button>
        <button type="button" className="btn" style={{minWidth:72,fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:15,padding:'4px 24px',border:'2px outset #fff',borderRightColor:'#808080',borderBottomColor:'#808080',borderRadius:0,background:'#e4e4e4',color:'#222',boxShadow:'none'}}>Cancel</button>
      </div>
    </div>
  </section>
);

export default Skills;
