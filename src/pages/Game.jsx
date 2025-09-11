import React from "react";
import { Board } from "@gomoku/components";

export default function Game() {
  return (
    <main style={{ padding: "1rem" }}>
      <h1>Game Board</h1>
      <div style={{ marginTop: "1rem" }}>
        <Board />
      </div>
    </main>
  );
}
