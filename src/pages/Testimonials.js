import React from 'react';

const cardStyle = {
  background: '#fff',
  border: '2px solid #fff',
  borderRightColor: '#808080',
  borderBottomColor: '#808080',
  borderLeftColor: '#fff',
  borderTopColor: '#fff',
  boxShadow: '2px 2px 0 #000, 1px 1px 0 #808080',
  fontFamily: 'MS Sans Serif, Tahoma, Geneva, sans-serif',
  color: '#222',
  padding: '18px 22px',
  margin: '0 0 24px 0',
  minWidth: 260,
  maxWidth: 340,
  borderRadius: 0,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};
const cardHeader = {
  background: 'linear-gradient(to bottom, #000080 80%, #1084d0 100%)',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 15,
  padding: '4px 10px',
  margin: '-18px -22px 12px -22px',
  borderBottom: '2px solid #808080',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};
const cardFooter = {
  fontSize: 13,
  color: '#000080',
  marginTop: 18,
  fontStyle: 'italic',
};
const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 32,
  justifyContent: 'center',
  alignItems: 'flex-start',
  margin: '36px 0',
};
const pageTitle = {
  fontFamily: 'MS Sans Serif, Tahoma, Geneva, sans-serif',
  color: '#000080',
  fontSize: 22,
  textAlign: 'center',
  margin: '32px 0 12px 0',
  letterSpacing: 1,
};

const testimonials = [
  {
    name: 'Project Manager, Tech Solutions Inc.',
    avatar: '/assets/mydocs.png',
    text: 'Gandhi consistently delivers high-quality work with exceptional attention to detail. His ability to translate complex requirements into elegant solutions is impressive.',
  },
  {
    name: 'Lead Designer, Pixel Studio',
    avatar: '/assets/skill.png',
    text: 'A true professional with a creative mindset. Gandhi\'s designs are not only visually appealing but also user-centric and functional.',
  },
  {
    name: 'Client, Freelance Web Project',
    avatar: '/assets/modem-5.png',
    text: 'Working with Gandhi was a seamless experience. He communicates clearly, meets deadlines, and always strives for excellence.',
  },
];

const Testimonials = () => (
  <section>
    <h1 style={pageTitle}>Testimonials</h1>
    <div style={containerStyle}>
      {testimonials.map((t, i) => (
        <div key={i} style={cardStyle}>
          <div style={cardHeader}>
            <img src={t.avatar} alt="avatar" style={{width:20, height:20}} onError={e=>e.target.style.display='none'} />
            {t.name}
          </div>
          <div style={{fontSize:15, color:'#222', lineHeight:1.6}}>
            "{t.text}"
          </div>
          <div style={cardFooter}>— {t.name.split(',')[0]}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
