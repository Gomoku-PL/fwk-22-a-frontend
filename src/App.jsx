import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Game from './pages/Game';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Gomoku-PL</h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:roomId" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
