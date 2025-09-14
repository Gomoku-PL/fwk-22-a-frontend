import React, { useEffect } from "react";
import BoardWrapper from "../components/board/BoardWrapper";
import { socket, connect, on, off, joinRoom } from "../lib/socket";
import {StatusBar} from '@gomoku/components';

export default function Game() {
  const roomId = "room1";
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
    return () => off("move", handleOpponentMove);
  }, []);

  const handleOpponentMove = (data) => {
    setMoves((prev) => [
      ...prev,
      { row: data.row, col: data.col, by: "opponent", at: Date.now() },
    ]);
    console.log("📥 Drag från motspelare:", data);
    // TODO: Uppdatera board state här om det behövs
  };

  const handleMyMove = (position) => {
    setMoves((prev) => [
      ...prev,
      { row: position.row, col: position.col, by: "me", at: Date.now() },
    ]);
    //send to server
    const move = {
      row: position.row,
      col: position.col,
      player: socket.id,
      roomId,
    };
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

      <div style={{ marginTop: "1rem" }}>
        <BoardWrapper onCellClick={handleMyMove} />
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