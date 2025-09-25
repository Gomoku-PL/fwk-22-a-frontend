import React from "react";
import Game from "./Game";


export default {
  title: "Pages/Game",
  component: Game,
  decorators: [
    (Story) => (
      <div
        style={{ color: "white", textAlign: "center", background: "#0f172a", minHeight: "100vh", padding: "24px" }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Default = () => <Game />;
