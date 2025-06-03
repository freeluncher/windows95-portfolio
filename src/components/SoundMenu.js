import React from 'react';

const SoundMenu = ({ enabled, onToggle }) => (
  <div style={{padding: '8px 16px', borderTop: '1px solid #b0b0b0', background: 'transparent', fontSize: 16, cursor: 'pointer'}} onClick={onToggle}>
    <span role="img" aria-label="sound">🔊</span> Sound: <b>{enabled ? 'On' : 'Off'}</b>
  </div>
);

export default SoundMenu;
