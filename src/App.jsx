import React from 'react'
import Home from './pages/Home'

import BoardWrapper from './components/board/BoardWrapper'
import './App.css'
import Game from './pages/Game'
 function App() {
  return (
    <div className="App">
      <h1>Gomoku-PL</h1>
      <Home />
      <BoardWrapper />
      <Game />
    </div>
  );
}

export default App;
