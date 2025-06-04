import React from 'react';
import './BSOD.css';

const BSOD = ({ onClose }) => (
  <div className="bsod-overlay">
    <div className="bsod-content">
      <div className="bsod-title">A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) + 00010E36.</div>
      <div className="bsod-body">
        The current application will be terminated.<br /><br />
        *  Press any key to terminate the current application.<br />
        *  Press CTRL+ALT+DEL again to restart your computer. You will lose any unsaved information in all applications.<br /><br />
        Press any key to continue _
      </div>
    </div>
    <div className="bsod-close-area" tabIndex={0} onClick={onClose} onKeyDown={onClose} />
  </div>
);

export default BSOD;
