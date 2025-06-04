import React from 'react';
import CatPetController from './CatPetController';
import { CatPetControlContext } from '../RetroApp';

const CatPetControllerWindow = () => {
  const control = React.useContext(CatPetControlContext);
  if (!control) return null;
  // Use 100% width/height to fill .window-content, center controller with flex
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      position: 'relative',
      minHeight: 0,
      minWidth: 0,
      boxSizing: 'border-box',
    }}>
      <CatPetController 
        onMoveLeft={control.moveLeft} 
        onMoveRight={control.moveRight} 
        onIdle={control.idle} 
      />
    </div>
  );
};

export default CatPetControllerWindow;
