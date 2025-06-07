import React from 'react';
import './Projects.css';

const projects = [
  {
    icon: require('../assets/directory_closed-4.png'),
    title: 'Campus API Gateway',
    desc: 'RESTful API backend for campus management.',
    detail: 'A robust, secure, and scalable RESTful API backend for campus management.',
    stack: 'Node.js, Express, MongoDB, JWT, Mongoose, Helmet, CORS, Multer, Moment Timezone, Nodemailer',
    link: 'https://github.com/freeluncher/campus-api-gateway',
  },
  {
    icon: require('../assets/joystick-5.png'),
    title: 'Dopply App',
    desc: 'Flutter-based fetal heart rate monitoring app.',
    detail: 'Flutter app for fetal BPM monitoring, integrated with ESP32 BLE, multi-role (Admin, Doctor, Patient), real-time monitoring, user management, Google Drive updates.',
    stack: 'Flutter, Dart, Python, NGINX',
    link: 'https://github.com/freeluncher/dopply_app',
  },
  {
    icon: require('../assets/computer-4.png'),
    title: 'SiServiks',
    desc: 'Web app for cervical examination and diagnosis.',
    detail: 'Cervical Detection web app based on Laravel (backend & frontend) and Flask (ML API) for early detection of cervical cancer using AI.',
    stack: 'Laravel, PHP, NGINX, Bootstrap, HTML5, CSS3, JavaScript',
    link: 'https://github.com/freeluncher/serviks-detection',
  },
  {
    icon: require('../assets/directory_closed-4.png'),
    title: 'Sailong',
    desc: 'Tourism, culinary, and accommodation portal.',
    detail: 'Reservation and information portal for tourism, culinary, and accommodation in Ngesrepbalong Village, with modern, responsive, and professional UI.',
    stack: 'Laravel, PHP, NGINX, Tailwind CSS, HTML5, CSS3, JavaScript',
    link: 'https://github.com/freeluncher/sailong',
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
