import React, { useState } from 'react';
import engine from '../../lib/engine'; // Kontrollera att pathen stämmer
import './BoardWrapper.css';

const SIZE = 15;

const BoardWrapper = () => {
  const [board, setBoard] = useState(
    Array(SIZE).fill(null).map(() => Array(SIZE).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState('●');

  const handleCellClick = (row, col) => {
    // 🧠 Använd engine för att försöka placera stenen
    const newBoard = engine.placeStone(board, row, col, currentPlayer);
    if (!newBoard) return; // ogiltigt drag (t.ex. cell upptagen)

    // 🟢 Uppdatera state
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === '●' ? '○' : '●');
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="cell"
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BoardWrapper;
