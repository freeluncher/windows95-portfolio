import React from 'react';
import './Projects.css';

const projects = [
  {
    icon: require('../assets/directory_closed-4.png'),
    title: 'Retro Game Landing',
    desc: 'Landing page for a pixel-art game.',
    detail: 'Sebuah landing page dengan nuansa retro pixel-art, animasi interaktif, dan layout klasik.',
    stack: 'Stack: React, CSS, GSAP',
    link: '#',
  },
  {
    icon: require('../assets/blog.png'),
    title: 'Neon Blog',
    desc: 'Blog platform with neon retro vibes.',
    detail: 'Platform blog dengan tema neon, efek glowing, dan pengalaman membaca yang modern namun retro.',
    stack: 'Stack: React, Styled-Components',
    link: '#',
  },
];

const Projects = () => (
  <section className="projects-explorer">
    <div className="projects-explorer-toolbar">
      <button>File</button>
      <button>Edit</button>
      <button>View</button>
      <span style={{marginLeft:'auto',color:'#222',fontSize:13}}>C:\Portfolio\Projects</span>
    </div>
    <div className="projects-explorer-content">
      {projects.map((proj, idx) => (
        <div className="project-groupbox" key={idx}>
          <img className="project-icon" src={proj.icon} alt="icon" />
          <div className="project-details">
            <div className="project-title">{proj.title}</div>
            <div className="project-description">{proj.desc}</div>
            <div className="project-description">{proj.detail}</div>
            <div className="project-description" style={{fontSize:12}}>{proj.stack}</div>
            <a className="project-link" href={proj.link} target="_blank" rel="noopener noreferrer">View</a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Projects;
