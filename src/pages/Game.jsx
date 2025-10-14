import React, { useEffect, useState } from "react";

import {Sidebar, StatusBar, BoardWrapper} from "@gomoku/components";
import { socket, connect, on, off, joinRoom } from "../lib/socket";

import engine from "../lib/engine";

export default function Game() {
  const roomId = "room1";
  const boardSize = 15;

  const [moves, setMoves] = useState([]);
  const [winner, setWinner] = useState(null);
  const [gameWon, setGameWon] = useState(false);

  const moveCount = moves.length;
  const currentPlayer = moveCount % 2 === 0 ? "B" : "W";
  const lastMove =
    moveCount > 0
      ? { row: moves[moveCount - 1].row, col: moves[moveCount - 1].col }
      : null;

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

  const buildBoard = (size, list) => {
    const b = Array.from({ length: size }, () => Array(size).fill(null));
    list.forEach((m, i) => {
      const p = i % 2 === 0 ? "B" : "W";
      b[m.row][m.col] = p;
    });
    return b;
  };

  const checkAndFinalize = (board, row, col) => {
    const p = moves.length % 2 === 0 ? "B" : "W";
    if (engine.checkWin(board, row, col, p)) {
      setWinner(p);
      setGameWon(true);
      socket.emit("gameWon", { winner: p, roomId });
    }
  };

  const handleOpponentMove = (data) => {
    setMoves((prev) => {
      const next = [
        ...prev,
        { row: data.row, col: data.col, by: "opponent", at: Date.now() },
      ];
      const b = buildBoard(boardSize, next);
      const p = (next.length - 1) % 2 === 0 ? "B" : "W";
      if (engine.checkWin(b, data.row, data.col, p)) {
        setWinner(p);
        setGameWon(true);
      }
      return next;
    });
  };

  const handleGameWon = (data) => {
    setWinner(data.winner);
    setGameWon(true);
  };

  const handleMyMove = ({ row, col }) => {
    if (gameWon) return;
    setMoves((prev) => {
      const next = [...prev, { row, col, by: "me", at: Date.now() }];
      const b = buildBoard(boardSize, next);
      const p = (next.length - 1) % 2 === 0 ? "B" : "W";
      if (engine.checkWin(b, row, col, p)) {
        setWinner(p);
        setGameWon(true);
      }
      return next;
    });
    socket.emit("move", { row, col, player: socket.id, roomId });
  };

  const onRestart = () => {
    setMoves([]);
    setWinner(null);
    setGameWon(false);
  };

  const board = buildBoard(boardSize, moves);

  const uiMoves = moves.map((m, i) => ({
    id: i + 1,
    who: m.by === "me" ? "you" : "opponent",
    coord: `(${m.row}, ${m.col})`,
    time: new Date(m.at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  return (
    <>
      <Sidebar onStartGame={onRestart} onRestart={onRestart} />

      <section className="card board-card">
        {gameWon && (
          <div
            style={{
              background:
                "linear-gradient(90deg, var(--accent1), var(--accent2), var(--accent3))",
              color: "#0b1020",
              padding: "1.5rem",
              margin: "0 0 1rem 0",
              borderRadius: "var(--r-lg)",
              textAlign: "center",
              fontSize: "1.4rem",
              fontWeight: "900",
              letterSpacing: "0.05em",
              boxShadow:
                "0 10px 24px color-mix(in oklab, var(--accent2), transparent 60%)",
              border: "1px solid var(--glass-brd)",
            }}
          >
            🎉 {winner === socket.id ? "DU VANN!" : "MOTSTÅNDAREN VANN!"} 🎉
          </div>
        )}

        <BoardWrapper
          board={board}
          disabled={gameWon}
          onCellClick={handleMyMove}
        />

        <section style={{ marginTop: "1rem", padding: "0 10px" }}>
          <StatusBar
            currentPlayer={currentPlayer}
            winner={winner}
            moveCount={moveCount}
            boardSize={boardSize}
            onRestart={onRestart}
            lastMove={lastMove}
          />

          <details style={{ marginTop: "1rem" }}>
            <summary
              style={{
                cursor: "pointer",
                color: "var(--muted)",
                fontSize: "12px",
                fontWeight: "800",
              }}
            >
              Drag historik ({uiMoves.length})
            </summary>
            <ol
              style={{
                paddingLeft: "1rem",
                lineHeight: 1.6,
                fontSize: "12px",
                color: "var(--muted)",
              }}
            >
              {uiMoves.map((m) => (
                <li key={m.id}>
                  {m.id}. {m.who} → {m.coord} • {m.time}
                </li>
              ))}
              {uiMoves.length === 0 && <li>Inga drag än</li>}
            </ol>
          </details>
        </section>
      </section>
    </>
  );
}
