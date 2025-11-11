import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ConsentToggle } from "@gomoku/components";
import { getCookiePreferences, saveCookiePreferences } from "../lib/api.js";

export default function PrivacySettings() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const saved = getCookiePreferences();
    if (saved) {
      setPreferences({
        essential: true, // Always true
        analytics: saved.analytics || false,
        marketing: saved.marketing || false,
      });
    }
  }, []);

  const handleToggle = (type) => {
    if (type === "essential") return; // Can't toggle essential
    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSuccessMessage("");

    try {
      await saveCookiePreferences(preferences);
      setSuccessMessage("Privacy settings saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Failed to save preferences:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <div className="card" style={{ padding: "2rem" }}>
        <h1
          style={{
            fontSize: "var(--fs-title)",
            fontWeight: 900,
            background: "linear-gradient(90deg, var(--accent1), var(--accent2))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "1.5rem",
          }}
        >
          Privacy Settings
        </h1>

        <p style={{ color: "var(--muted)", fontSize: "var(--fs-ui)", marginBottom: "2rem" }}>
          Manage your cookie preferences and data privacy settings below.
        </p>

        {successMessage && (
          <div
            style={{
              padding: "1rem",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              color: "var(--ink)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "8px",
              marginBottom: "2rem",
            }}
          >
            {successMessage}
          </div>
        )}

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "var(--ink)", fontSize: "1.3rem", marginBottom: "1rem" }}>
            Cookie Preferences
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <ConsentToggle
              label="Essential Cookies"
              description="Required for the platform to function. Cannot be disabled."
              checked={preferences.essential}
              disabled={true}
              onChange={() => {}}
            />

            <ConsentToggle
              label="Analytics Cookies"
              description="Help us understand how you use the platform to improve your experience."
              checked={preferences.analytics}
              onChange={() => handleToggle("analytics")}
            />

            <ConsentToggle
              label="Marketing Cookies"
              description="Used to deliver personalized content and advertisements."
              checked={preferences.marketing}
              onChange={() => handleToggle("marketing")}
            />
          </div>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "var(--ink)", fontSize: "1.3rem", marginBottom: "1rem" }}>
            Data Management
          </h2>
          <p style={{ color: "var(--ink)", lineHeight: 1.6, marginBottom: "1rem" }}>
            You have full control over your personal data:
          </p>
          <ul style={{ color: "var(--ink)", lineHeight: 1.6, paddingLeft: "1.5rem" }}>
            <li>Request data export from Account Settings</li>
            <li>Delete your account and all associated data</li>
            <li>Withdraw consent for data processing</li>
          </ul>
        </section>

        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
          <button onClick={handleSave} className="btn" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Preferences"}
          </button>
          <button onClick={() => navigate("/account-settings")} className="btn-ghost">
            Back to Settings
          </button>
          <button
            onClick={() => navigate("/privacy-policy")}
            className="btn-ghost"
            style={{ marginLeft: "auto" }}
          >
            Read Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
}
