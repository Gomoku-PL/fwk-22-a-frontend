import React, { useEffect } from "react";
import BoardWrapper from "../components/board/BoardWrapper";
import { socket, connect, on, off, joinRoom } from "../lib/socket";

export default function Game() {
  const roomId = "room1";
  //store everymove and derive whos turn it is using state
  const [moves, setMoves] = React.useState([]);
  // last move by opponent or "me". know whos next turn it is
  const lastBy = moves.length ? moves[moves.length - 1].player.by : null;
  const isMyTurn = lastBy ? lastBy === "opponent" : true;

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
        <div
          aria-live="polite"
          style={{ fontWeight: 600, marginBottom: "0.5rem" }}
        >
          {moves.length === 0
            ? "Waiting for first move…"
            : isMyTurn
            ? "Your turn"
            : "Opponent’s turn"}
        </div>

        <ol style={{ paddingLeft: "1rem", lineHeight: 1.6 }}>
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