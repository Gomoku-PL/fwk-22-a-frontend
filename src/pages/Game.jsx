import React from "react";
import { Board } from "@gomoku/components";


export default function Game() {
  return (
    <main style={{ padding: "1rem" }}>
      <h1>Game Board</h1>

      {/* Board from the shared components package */}
      <div style={{ marginTop: "1rem" }}>
        {/* During early integration you can comment this line out if the package isn't wired yet */}
        <Board />
      </div>
    </main>
  );
}
