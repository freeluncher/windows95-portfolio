import React, { useEffect, useState } from 'react';
import BootScreen from './components/BootScreen';
import RetroApp from './RetroApp';
import './App.css';

function App() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 3000); // 3 detik
    return () => clearTimeout(timer);
  }, []);

  return isBooting ? <BootScreen /> : <RetroApp />;
}

export default App;
