import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccount, logout } from "../lib/api";
import { PrivacyNotice } from "@gomoku/components";

export default function AccountSettings() {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmStep, setConfirmStep] = useState(0);
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteAccount();

      // Logout and redirect to home
      await logout();
      navigate("/", { replace: true });

      // Optional: Show success message or toast
      console.log("Account deleted successfully");
    } catch (err) {
      console.error("Failed to delete account:", err);
      setError(err.message || "Failed to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleConfirmDelete = () => {
    if (confirmText === "DELETE MY ACCOUNT") {
      handleDeleteAccount();
    }
  };

  const resetModal = () => {
    setShowDeleteModal(false);
    setConfirmStep(0);
    setConfirmText("");
    setError(null);
  };

  return (
    <section className="card board-card" style={{ gridColumn: "1 / -1" }}>
      <div style={{ padding: "2rem" }}>
        <h1
          style={{
            color: "var(--ink)",
            marginBottom: "1rem",
            fontSize: "var(--fs-title)",
            fontWeight: 900,
          }}
        >
          Kontoinställningar
        </h1>

        <div style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              color: "var(--ink)",
              fontSize: "1.2rem",
              marginBottom: "0.5rem",
            }}
          >
            Allmänna inställningar
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "var(--fs-body)" }}>
            Hantera ditt konto och dina data.
          </p>
        </div>

        {/* Privacy Notice for Settings */}
        <div style={{ marginBottom: "2rem" }}>
          <PrivacyNotice
            variant="settings"
            theme="light"
            onPolicyClick={() => {
              window.open("/privacy-policy", "_blank", "noopener,noreferrer");
            }}
            onSettingsClick={() => {
              window.open("/privacy-settings", "_blank", "noopener,noreferrer");
            }}
          />
        </div>

        {/* Danger Zone */}
        <div
          style={{
            border: "2px solid #dc2626",
            borderRadius: "var(--r-lg)",
            padding: "1.5rem",
            background: "rgba(220, 38, 38, 0.05)",
          }}
        >
          <h3
            style={{
              color: "#dc2626",
              fontSize: "1rem",
              marginBottom: "0.5rem",
              fontWeight: 800,
            }}
          >
            ⚠️ Farlig zon
          </h3>

          <p
            style={{
              color: "var(--muted)",
              fontSize: "var(--fs-body)",
              marginBottom: "1rem",
              lineHeight: 1.5,
            }}
          >
            Permanent borttagning av ditt konto. Denna åtgärd kan inte ångras.
          </p>

          <button
            className="btn-ghost"
            onClick={() => setShowDeleteModal(true)}
            style={{
              color: "#dc2626",
              borderColor: "#dc2626",
              background: "transparent",
            }}
          >
            🗑️ Ta bort mitt konto
          </button>
        </div>

        {/* Back button */}
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <button className="btn-ghost" onClick={() => navigate("/")}>
            ← Tillbaka till startsidan
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="card"
            style={{
              width: "90%",
              maxWidth: "500px",
              margin: "1rem",
              background: "var(--bg2)",
              border: "2px solid #dc2626",
            }}
          >
            <div style={{ padding: "2rem" }}>
              {confirmStep === 0 && (
                <>
                  <h3
                    style={{
                      color: "#dc2626",
                      marginBottom: "1rem",
                      fontSize: "1.3rem",
                      fontWeight: 900,
                    }}
                  >
                    ⚠️ Varning: Permanent borttagning
                  </h3>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <p
                      style={{
                        color: "var(--ink)",
                        marginBottom: "1rem",
                        lineHeight: 1.6,
                      }}
                    >
                      Du är på väg att permanent ta bort ditt konto. Detta
                      kommer att:
                    </p>

                    <ul
                      style={{
                        color: "var(--muted)",
                        paddingLeft: "1.5rem",
                        lineHeight: 1.6,
                      }}
                    >
                      <li>Radera alla dina speldata och statistik</li>
                      <li>Ta bort din spelhistorik permanent</li>
                      <li>Avsluta alla aktiva spelsessioner</li>
                      <li>
                        Denna åtgärd kan <strong>INTE</strong> ångras
                      </li>
                    </ul>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button className="btn-ghost" onClick={resetModal}>
                      Avbryt
                    </button>
                    <button
                      className="btn"
                      onClick={() => setConfirmStep(1)}
                      style={{
                        background: "#dc2626",
                        borderColor: "#dc2626",
                      }}
                    >
                      Jag förstår, fortsätt
                    </button>
                  </div>
                </>
              )}

              {confirmStep === 1 && (
                <>
                  <h3
                    style={{
                      color: "#dc2626",
                      marginBottom: "1rem",
                      fontSize: "1.3rem",
                      fontWeight: 900,
                    }}
                  >
                    🔐 Bekräftelse krävs
                  </h3>

                  <p
                    style={{
                      color: "var(--ink)",
                      marginBottom: "1rem",
                      lineHeight: 1.6,
                    }}
                  >
                    För att bekräfta borttagningen, skriv exakt: <br />
                    <strong style={{ color: "#dc2626" }}>
                      DELETE MY ACCOUNT
                    </strong>
                  </p>

                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="Skriv DELETE MY ACCOUNT"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      marginBottom: "1rem",
                      background: "var(--glass)",
                      border: "1px solid var(--glass-brd)",
                      borderRadius: "var(--r-btn)",
                      color: "var(--ink)",
                      fontSize: "var(--fs-body)",
                    }}
                  />

                  {error && (
                    <div
                      style={{
                        color: "#dc2626",
                        marginBottom: "1rem",
                        fontSize: "var(--fs-ui)",
                      }}
                    >
                      ❌ {error}
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      className="btn-ghost"
                      onClick={resetModal}
                      disabled={isDeleting}
                    >
                      Avbryt
                    </button>
                    <button
                      className="btn"
                      onClick={handleConfirmDelete}
                      disabled={
                        confirmText !== "DELETE MY ACCOUNT" || isDeleting
                      }
                      style={{
                        background:
                          confirmText === "DELETE MY ACCOUNT"
                            ? "#dc2626"
                            : "var(--muted)",
                        borderColor:
                          confirmText === "DELETE MY ACCOUNT"
                            ? "#dc2626"
                            : "var(--muted)",
                        opacity: confirmText === "DELETE MY ACCOUNT" ? 1 : 0.5,
                      }}
                    >
                      {isDeleting ? "Raderar..." : "🗑️ Radera konto permanent"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
