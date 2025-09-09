
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Temporary placeholder components
function StartScreen() {
  return <div>Start Screen (placeholder)</div>;
}
function GameScreen() {
  return <div>Game Screen (placeholder)</div>;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/game/:id" element={<GameScreen />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
