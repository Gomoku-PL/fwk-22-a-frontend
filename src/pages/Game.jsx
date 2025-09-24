import React, { useEffect, useState } from "react";
import BoardWrapper from "../components/board/BoardWrapper";
import { socket, connect, on, off, joinRoom } from "../lib/socket";

export default function Game() {
  const roomId = "room1";
  const [winner, setWinner] = useState(null);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    connect();
    joinRoom(roomId);

    on("move", handleOpponentMove);
    on("gameWon", handleGameWon);
    
    return () => {
      off("move");
      off("gameWon");
    };
  }, []);

  const handleOpponentMove = (data) => {
    console.log("📥 Drag från motspelare:", data);
    // Här kan du uppdatera brädet med motståndarens drag
    if (data.winner) {
      handleGameWon(data);
    }
  };

  const handleGameWon = (data) => {
    console.log("🏆 Spelet är vunnet!", data);
    setWinner(data.winner);
    setGameWon(true);
  };

  const handleMyMove = (position) => {
    if (gameWon) return; // Förhindra drag efter vinst

    const move = {
      row: position.row,
      col: position.col,
      player: socket.id,
      roomId,
    };

    // Om detta drag resulterade i vinst
    if (position.winner) {
      move.winner = position.winner;
      setWinner(position.winner);
      setGameWon(true);
    }

    console.log("📤 Mitt drag:", move);
    socket.emit("move", move);
  };

  return (
    <main style={{ padding: "1rem" }}>
      <h1>Game Board</h1>
      
      {/* 🏆 Winner Banner */}
      {gameWon && (
        <div style={{
          background: 'linear-gradient(90deg, var(--accent1), var(--accent2), var(--accent3))',
          color: '#0b1020',
          padding: '1.5rem',
          margin: '1rem 0',
          borderRadius: 'var(--r-lg)',
          textAlign: 'center',
          fontSize: '1.4rem',
          fontWeight: '900',
          letterSpacing: '0.05em',
          boxShadow: '0 10px 24px color-mix(in oklab, var(--accent2), transparent 60%)',
          border: '1px solid var(--glass-brd)'
        }}>
          🎉 {winner === socket.id ? 'DU VANN!' : 'MOTSTÅNDAREN VANN!'} 🎉
        </div>
      )}
      
      <div style={{ marginTop: "1rem" }}>
        <BoardWrapper onCellClick={handleMyMove} gameWon={gameWon} />
      </div>
    </main>
  );
}
