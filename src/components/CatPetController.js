import React from 'react';

const CatPetController = ({ onMoveLeft, onMoveRight, onIdle }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 24,
      width: '100%',
      height: '100%',
      pointerEvents: 'auto',
    }}>
      <button
        aria-label="Kucing ke kiri"
        style={{ fontSize: 32, padding: 12, borderRadius: 8, border: '2px solid #808080', background: '#fff', boxShadow: '2px 2px 0 #0008', minWidth: 56 }}
        onTouchStart={onMoveLeft}
        onMouseDown={onMoveLeft}
        onTouchEnd={onIdle}
        onMouseUp={onIdle}
      >
        ◀️
      </button>
      <button
        aria-label="Kucing idle"
        style={{ fontSize: 32, padding: 12, borderRadius: 8, border: '2px solid #808080', background: '#fff', boxShadow: '2px 2px 0 #0008', minWidth: 56 }}
        onTouchStart={onIdle}
        onMouseDown={onIdle}
      >
        ⏸️
      </button>
      <button
        aria-label="Kucing ke kanan"
        style={{ fontSize: 32, padding: 12, borderRadius: 8, border: '2px solid #808080', background: '#fff', boxShadow: '2px 2px 0 #0008', minWidth: 56 }}
        onTouchStart={onMoveRight}
        onMouseDown={onMoveRight}
        onTouchEnd={onIdle}
        onMouseUp={onIdle}
      >
        ▶️
      </button>
    </div>
  );
};

export default CatPetController;
