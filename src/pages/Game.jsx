import React, { useEffect, useState } from "react";
import BoardWrapper from "../components/board/BoardWrapper";
import { socket, connect, on, off, joinRoom } from "../lib/socket";
import {StatusBar} from '@gomoku/components';

export default function Game() {
  const roomId = "room1";
  const [winner, setWinner] = useState(null);
  const [gameWon, setGameWon] = useState(false);
  //store everymove and derive whos turn it is using state
  const [moves, setMoves] = React.useState([]);
  // last move by opponent or "me". know whos next turn it is
  const moveCount = moves.length;
  const currentPlayer = moveCount % 2 === 0 ? "B" : "W"; // Black starts
  const lastMove =
    moveCount > 0
      ? { row: moves[moveCount - 1].row, col: moves[moveCount - 1].col }
      : null;
  const winner = null; // not in scope for this step
  const boardSize = 15; // adjust if your board is a different size

  useEffect(() => {
    connect();
    joinRoom(roomId);
    //listen for moves from opponent
    on("move", handleOpponentMove);
    on("gameWon", handleGameWon);
    
    return () => {
      off("move");
      off("gameWon");
    };
  }, []);

  const handleOpponentMove = (data) => {
    setMoves((prev) => [
      ...prev,
      { row: data.row, col: data.col, by: "opponent", at: Date.now() },
    ]);
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
  const onRestart = () => setMoves([]);
  const uiMoves = moves.map((m, i) => ({
    id: i + 1,
    who: m.by === "me" ? "you" : "opponent",
    coord: `(${m.row}, ${m.col})`,
    time: new Date(m.at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));
  console.table(uiMoves);
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

      {/* Status + Moves under the board */}
      <section style={{ marginTop: "1rem" }}>
        <StatusBar
          currentPlayer={currentPlayer}
          winner={winner}
          moveCount={moveCount}
          boardSize={boardSize}
          onRestart={onRestart}
          lastMove={lastMove}
        />

        <ol style={{ paddingLeft: "1rem", lineHeight: 1.6 }}>
          {" "}
          {/*replace later with MoveList */}
          {uiMoves.map((m) => (
            <li key={m.id}>
              {m.id}. {m.who} → {m.coord} • {m.time}
            </li>
          ))}
          {uiMoves.length === 0 && <li>No moves yet</li>}
        </ol>
      </section>
    </main>
  );
}