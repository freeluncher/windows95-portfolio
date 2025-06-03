import React from 'react';

const RecycleBin = ({ closedWindows, onRestoreWindow, onEmpty }) => {
  return (
    <div style={{minWidth:300}}>
      <h3 style={{marginTop:0}}>Recycle Bin</h3>
      {closedWindows.length === 0 ? (
        <div style={{color:'#888'}}>Recycle Bin is empty.</div>
      ) : (
        <ul style={{paddingLeft:18}}>
          {closedWindows.map((w, i) => (
            <li key={i} style={{marginBottom:6}}>
              <span style={{fontWeight:'bold'}}>{w.title}</span>
              <button style={{marginLeft:12}} onClick={() => onRestoreWindow(w.name)}>Restore</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onEmpty} disabled={closedWindows.length === 0} style={{marginTop:12}}>Empty Recycle Bin</button>
    </div>
  );
};

export default RecycleBin;
