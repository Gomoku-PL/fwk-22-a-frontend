import React, { useEffect } from "react";
import BoardWrapper from "../components/board/BoardWrapper";
import { socket, connect, on, off, joinRoom } from "../lib/socket";

export default function Game() {
  const roomId = "room1";

  useEffect(() => {
    connect();
    joinRoom(roomId);

    on("move", handleOpponentMove);
    return () => off("move");
  }, []);

  const handleOpponentMove = (data) => {
    console.log("📥 Drag från motspelare:", data);
    // TODO: Uppdatera board state här om det behövs
  };

  const handleMyMove = (position) => {
    const move = {
      row: position.row,
      col: position.col,
      player: socket.id,
      roomId,
    };
    console.log("📤 Mitt drag:", move);
    socket.emit("move", move);
  };

  return (
    <main style={{ padding: "1rem" }}>
      <h1>Game Board</h1>
      <div style={{ marginTop: "1rem" }}>
        <BoardWrapper onCellClick={handleMyMove} />
      </div>
    </main>
  );
}
