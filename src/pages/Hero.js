import React from 'react';

const ie95Window = {
  background: '#fff',
  border: '2px solid #808080',
  borderTopColor: '#fff',
  borderLeftColor: '#fff',
  borderRadius: 0,
  boxShadow: '2px 2px 0 #000, 1px 1px 0 #808080',
  fontFamily: 'MS Sans Serif, Tahoma, Geneva, sans-serif',
  width: 420,
  maxWidth: '100%',
  margin: '0 auto',
  padding: 0,
};
const ie95Toolbar = {
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(to bottom,#e4e4e4 80%,#c0c0c0 100%)',
  borderBottom: '2px solid #808080',
  padding: '2px 6px',
  height: 32,
  gap: 6,
};
const ie95Btn = {
  width: 24,
  height: 24,
  background: '#e4e4e4',
  border: '2px outset #fff',
  borderRightColor: '#808080',
  borderBottomColor: '#808080',
  borderRadius: 0,
  marginRight: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: 0,
};
const ie95AddrBar = {
  flex: 1,
  background: '#fff',
  border: '2px inset #808080',
  height: 22,
  fontSize: 14,
  padding: '0 6px',
  marginLeft: 8,
  fontFamily: 'MS Sans Serif, Tahoma, Geneva, sans-serif',
};
const ie95Content = {
  padding: '18px 24px 18px 24px',
  background: '#fff',
  minHeight: 180,
  textAlign: 'center',
};

const Hero = () => (
  <section className="ie95-window" style={ie95Window}>
    <div className="ie95-toolbar" style={ie95Toolbar}>
      <span style={{marginRight:4}}>
        <img src="/assets/internet-explorer.png" alt="IE" style={{width:20,verticalAlign:'middle'}} onError={e=>e.target.style.display='none'} />
      </span>
      <button className="ie95-btn" style={ie95Btn} title="Back"><img src="/assets/ie-back.png" alt="Back" style={{width:16}} onError={e=>e.target.style.display='none'} /></button>
      <button className="ie95-btn" style={ie95Btn} title="Forward"><img src="/assets/ie-forward.png" alt="Forward" style={{width:16}} onError={e=>e.target.style.display='none'} /></button>
      <button className="ie95-btn" style={ie95Btn} title="Stop"><img src="/assets/ie-stop.png" alt="Stop" style={{width:16}} onError={e=>e.target.style.display='none'} /></button>
      <button className="ie95-btn" style={ie95Btn} title="Refresh"><img src="/assets/ie-refresh.png" alt="Refresh" style={{width:16}} onError={e=>e.target.style.display='none'} /></button>
      <input className="ie95-addrbar" style={ie95AddrBar} value="https://gandhi.dev" readOnly aria-label="Address bar" />
    </div>
    <div className="ie95-content" style={ie95Content}>
      <h1 className="ie95-title" style={{fontSize:22,margin:'18px 0 8px 0',color:'#000',fontFamily:'MS Sans Serif, Tahoma, Geneva, sans-serif'}}>Gandhi</h1>
      <h2 className="ie95-subtitle" style={{fontSize:15,margin:'0 0 18px 0',color:'#222',fontWeight:'normal'}}>Web Developer | Graphic Designer | IT Enthusiast</h2>
      <div className="ie95-img" style={{margin: '2rem 0'}}>
        <img src="/assets/computer-4.png" alt="Gandhi Illustration" style={{width: 120, animation: 'float 2s infinite alternate'}} />
      </div>
      <p className="ie95-quote" style={{fontStyle: 'italic', color: '#000080', fontSize: 15}}>&quot;Building the web with a retro soul.&quot;</p>
    </div>
  </section>
);

export default Hero;
