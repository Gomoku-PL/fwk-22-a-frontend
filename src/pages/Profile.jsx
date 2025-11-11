import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../lib/api";
import PrivacySettings from "./PrivacySettings.jsx";
import { logout } from "../lib/api";

export default function Profile() {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleDeleteAccount = async () => {
    if (!window.confirm("Är du säker på att du vill radera ditt konto och all din data? Detta kan inte ångras.")) return;
    setIsDeleting(true);
    setError(null);
    setSuccess(false);
    try {
      await deleteAccount();
      setSuccess(true);
      localStorage.clear();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.message || "Kunde inte radera konto.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      style={{
        gridColumn: "1 / -1",
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1rem",
        gap: "2.5rem",
        width: "100%",
      }}
    >
      {/* Profile Card */}
      <section
        className="card board-card"
        style={{
          maxWidth: 650,
          width: "100%",
          textAlign: "center",
          margin: "0 auto",
          padding: "2.5rem 2rem",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ marginBottom: "1.5rem", fontSize: "2.2rem", fontWeight: 900 }}>Profil</h2>
        <p style={{ color: "var(--muted)", marginBottom: "2rem", fontSize: "1.1rem" }}>
          Här kan du hantera ditt konto och radera all din information enligt GDPR.
        </p>
        <button
          className="btn"
          style={{ background: "var(--danger)", color: "white", marginBottom: "1rem", fontWeight: 700, fontSize: "1rem" }}
          onClick={handleDeleteAccount}
          disabled={isDeleting}
        >
          {isDeleting ? "Raderar..." : "Radera konto och all data"}
        </button>
        <button
          className="btn-ghost"
          style={{ marginBottom: "1rem", fontWeight: 700, fontSize: "1rem" }}
          onClick={handleLogout}
        >
          Logga ut
        </button>
        {error && <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>}
        {success && <div style={{ color: "green", marginTop: "1rem" }}>Ditt konto har raderats. Du omdirigeras till startsidan.</div>}
      </section>

      {/* Privacy Settings Card */}
      <section
        className="card board-card"
        style={{
          maxWidth: 650,
          width: "100%",
          margin: "0 auto",
          padding: "2.5rem 2rem",
          boxSizing: "border-box",
        }}
      >
        <PrivacySettings />
      </section>
    </div>
  );
}
