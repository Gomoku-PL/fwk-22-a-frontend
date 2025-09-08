import React from 'react'

import BoardWrapper from './components/board/BoardWrapper'
import './App.css'
import Game from './pages/Game'
function App() {


  return (
    <>
      <h1>Gomoku-PL</h1>
      <BoardWrapper />
      <Game />
    </>
  )
}

export default App
