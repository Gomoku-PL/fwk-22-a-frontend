import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Game from './pages/Game';
import './App.css';

function App() {
  return (
    <div className="gmk">
      {/* RUBRIK */}
      <section className="hero">
        <div className="title">
          <div className="latin">GOMOKU</div>
          <div className="jp">五目</div>
        </div>
        <div className="divider"></div>
      </section>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:roomId" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
