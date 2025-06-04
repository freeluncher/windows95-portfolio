import React from 'react';
import './Gallery.css';

const galleryItems = [
  { src: require('../assets/computer-4.png'), label: 'PC.png' },
  { src: require('../assets/directory_closed-4.png'), label: 'Folder.png' },
  { src: require('../assets/modem-5.png'), label: 'Modem.png' },
  { src: require('../assets/cat-sitting.gif'), label: 'Cat.gif' },
  { src: require('../assets/gallery.png'), label: 'Gallery.png' },
  { src: require('../assets/cat-sitting-border.gif'), label: 'CatBorder.gif' },
  { src: require('../assets/cat-sitting-2.gif'), label: 'Cat2.gif' },
];

const Gallery = () => (
  <section className="gallery-explorer">
    <div className="gallery-explorer-toolbar">
      <button>File</button>
      <button>Edit</button>
      <button>View</button>
      <span style={{marginLeft:'auto',color:'#222',fontSize:13}}>C:\Portfolio\Gallery</span>
    </div>
    <div className="gallery-explorer-content">
      <div className="gallery-grid">
        {galleryItems.map((item, idx) => (
          <div className="gallery-item" key={idx}>
            <img src={item.src} alt={item.label} />
            <div className="gallery-item-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Gallery;
