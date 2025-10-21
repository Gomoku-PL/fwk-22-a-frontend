import React from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@gomoku/components";

export default function Home() {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/game/room1");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      {/* SIDOMENY */}
      <Sidebar onStartGame={handleStartGame} />

      {/* VÄLKOMST SEKTION */}
      <section className="card board-card">
        <div className="board-wrap">
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
              color: "var(--ink)",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(20px, 4vw, 32px)",
                fontWeight: 900,
                letterSpacing: "0.1em",
                background:
                  "linear-gradient(90deg, var(--accent1), var(--accent2), var(--accent3))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                marginBottom: "1rem",
              }}
            >
              Välkommen till Gomoku!
            </h2>

            <p
              style={{
                color: "var(--muted)",
                fontSize: "var(--fs-body)",
                lineHeight: 1.6,
                maxWidth: "400px",
                margin: "0 auto 2rem",
              }}
            >
              Fem i rad - det klassiska strategispelet där du försöker få fem av
              dina stenar i rad, horisontellt, vertikalt eller diagonalt.
            </p>

            <div
              style={{
                display: "grid",
                gap: "12px",
                maxWidth: "300px",
                margin: "0 auto",
              }}
            >
              <button
                className="btn"
                onClick={handleStartGame}
                style={{ width: "100%" }}
              >
                🎮 Starta nytt spel
              </button>

              <button
                className="btn-secondary"
                onClick={handleRegister}
                style={{ width: "100%" }}
              >
                👤 Skapa konto
              </button>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                }}
              >
                <button className="btn-ghost">
                  <span className="txt">📖 Regler</span>
                </button>
                <button className="btn-ghost">
                  <span className="txt">🏆 Statistik</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
