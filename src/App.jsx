import React from 'react'
import Home from './pages/Home'

import BoardWrapper from './components/board/BoardWrapper'
import './App.css'
import Game from './pages/Game'
export default function App() {
  return (
    <>
      <h1>Gomoku-PL</h1>
      <Home />
      <BoardWrapper />
      <Game />
    </>
  )
}
