import React, { useState } from 'react';
import engine from '../../lib/engine'; // Kontrollera att pathen stämmer
import './BoardWrapper.css';

const SIZE = 15;

const BoardWrapper = ({ onCellClick, gameWon }) => {
  const [board, setBoard] = useState(
    Array(SIZE).fill(null).map(() => Array(SIZE).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState('●');

  const handleCellClick = (row, col) => {
    // 🚫 Om spelet är vunnet, tillåt inga fler drag
    if (gameWon) return;

    // 🧠 Använd engine för att försöka placera stenen
    const newBoard = engine.placeStone(board, row, col, currentPlayer);
    if (!newBoard) return; // ogiltigt drag (t.ex. cell upptagen)

    // 🟢 Uppdatera state
    setBoard(newBoard);
    
    // 🏆 Kontrollera om detta drag resulterade i vinst
    const hasWon = engine.checkWin(newBoard, row, col, currentPlayer);
    
    if (hasWon) {
      // 📤 Skicka vinst-information till Game.jsx
      if (onCellClick) {
        onCellClick({ row, col, player: currentPlayer, winner: currentPlayer });
      }
    } else {
      // 📤 Skicka vanligt drag
      if (onCellClick) {
        onCellClick({ row, col, player: currentPlayer });
      }
      setCurrentPlayer(currentPlayer === '●' ? '○' : '●');
    }
  };

  return (
    <div className="board-wrap">
      <div className={`board ${gameWon ? 'board-disabled' : ''}`}>
        <div className="grid"></div>
        
        {/* Koordinater */}
        <div className="coords top">
          <span>A</span><span>B</span><span>C</span><span>D</span><span>E</span>
          <span>F</span><span>G</span><span>H</span><span>I</span><span>J</span>
          <span>K</span><span>L</span><span>M</span><span>N</span><span>O</span>
        </div>
        <div className="coords left">
          <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
          <span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
          <span>11</span><span>12</span><span>13</span><span>14</span><span>15</span>
        </div>

        {/* Overlay med klickbara celler */}
        <div className="overlay">
          {board.map((row, rowIndex) => 
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell ${gameWon ? 'cell-disabled' : ''}`}
                style={{ gridColumn: colIndex + 1, gridRow: rowIndex + 1 }}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell && (
                  <div className={`stone ${cell === '●' ? 'black' : 'white'}`}></div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="status">TUR: {currentPlayer === '●' ? '● SVART' : '○ VIT'}</div>
    </div>
  );
};

export default BoardWrapper;
