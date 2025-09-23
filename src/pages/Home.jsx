import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '@gomoku/components';






export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "60vh" }}>
      <Button onClick={() => navigate("/game/roomId")}>
        Start Game
      </Button>
    </div>
  );
}


