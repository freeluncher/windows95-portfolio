import React from 'react';

const Contact = () => (
  <section>
    <h1>CONTACT</h1>
    <form style={{maxWidth:'400px',margin:'2rem auto',background:'#1a1a1a',padding:'2rem',border:'2px solid #ff00cc',boxShadow:'0 0 8px #00fff7'}}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" style={{width:'100%',marginBottom:'1rem',fontFamily:'inherit',fontSize:'1rem',padding:'0.5rem'}} />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" style={{width:'100%',marginBottom:'1rem',fontFamily:'inherit',fontSize:'1rem',padding:'0.5rem'}} />
      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" rows="4" style={{width:'100%',marginBottom:'1rem',fontFamily:'inherit',fontSize:'1rem',padding:'0.5rem'}}></textarea>
      <button type="submit" className="btn">Send</button>
    </form>
  </section>
);

export default Contact;
