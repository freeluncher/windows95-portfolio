import React from 'react';

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

const Contact = () => (
  <section className="win95-window" style={win95Window}>
    <div className="win95-content" style={win95Content}>
      <h1 style={{fontSize:18, margin:'18px 0 8px 0', color:'#222', fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif', textAlign:'center'}}>Contact</h1>
      <form className="properties-form" autoComplete="off" style={{maxWidth:420,margin:'0 auto',background:'#c0c0c0',padding:'18px 24px 18px 24px',border:'2px solid #fff',borderRightColor:'#808080',borderBottomColor:'#808080',borderRadius:0,boxShadow:'2px 2px 0 #000, 1px 1px 0 #808080',display:'grid',gridTemplateColumns:'max-content 1fr',rowGap:14,columnGap:16,alignItems:'center'}}>
        <label className="properties-label" htmlFor="name" style={{fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:15}}>Name:</label>
        <input id="name" name="name" type="text" className="retro-input" style={{width:'100%',fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:15,padding:'2px 6px',border:'2px inset #808080',background:'#fff',color:'#222',borderRadius:0}} />
        <label className="properties-label" htmlFor="email" style={{fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:15}}>Email:</label>
        <input id="email" name="email" type="email" className="retro-input" style={{width:'100%',fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:15,padding:'2px 6px',border:'2px inset #808080',background:'#fff',color:'#222',borderRadius:0}} />
        <label className="properties-label" htmlFor="message" style={{fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:15,alignSelf:'start'}}>Message:</label>
        <textarea id="message" name="message" rows="4" className="retro-input" style={{width:'100%',fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:15,padding:'2px 6px',border:'2px inset #808080',background:'#fff',color:'#222',borderRadius:0,resize:'vertical',minHeight:60}}></textarea>
        <div></div>
        <button type="submit" className="btn" style={{marginTop:8,marginBottom:0,justifySelf:'start',fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif',fontSize:15,padding:'4px 24px',border:'2px outset #fff',borderRightColor:'#808080',borderBottomColor:'#808080',borderRadius:0,background:'#e4e4e4',color:'#222',boxShadow:'none'}}>Send</button>
      </form>
    </div>
  </section>
);

export default Contact;
