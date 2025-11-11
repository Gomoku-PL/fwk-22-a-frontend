import React from "react";

export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
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
          Privacy Policy
        </h1>

        <p style={{ color: "var(--muted)", fontSize: "var(--fs-ui)", marginBottom: "2rem" }}>
          Last updated: November 2025
        </p>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "var(--ink)", fontSize: "1.5rem", marginBottom: "1rem" }}>
            1. Introduction
          </h2>
          <p style={{ color: "var(--ink)", lineHeight: 1.6 }}>
            Welcome to Gomoku. We respect your privacy and are committed to protecting your personal
            data. This privacy policy explains how we collect, use, and safeguard your information
            when you use our game platform.
          </p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "var(--ink)", fontSize: "1.5rem", marginBottom: "1rem" }}>
            2. Data We Collect
          </h2>
          <ul style={{ color: "var(--ink)", lineHeight: 1.6, paddingLeft: "1.5rem" }}>
            <li>
              <strong>Account Information:</strong> Email address and encrypted password for
              authentication
            </li>
            <li>
              <strong>Game Data:</strong> Game history, moves, and statistics
            </li>
            <li>
              <strong>Technical Data:</strong> Session information and cookies for functionality
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "var(--ink)", fontSize: "1.5rem", marginBottom: "1rem" }}>
            3. How We Use Your Data
          </h2>
          <ul style={{ color: "var(--ink)", lineHeight: 1.6, paddingLeft: "1.5rem" }}>
            <li>To provide and maintain our game service</li>
            <li>To authenticate your account and ensure security</li>
            <li>To save your game progress and preferences</li>
            <li>To improve our platform based on usage patterns</li>
          </ul>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "var(--ink)", fontSize: "1.5rem", marginBottom: "1rem" }}>
            4. Data Security
          </h2>
          <p style={{ color: "var(--ink)", lineHeight: 1.6 }}>
            We implement industry-standard security measures including:
          </p>
          <ul style={{ color: "var(--ink)", lineHeight: 1.6, paddingLeft: "1.5rem" }}>
            <li>HTTPS encryption for all data transmission</li>
            <li>Bcrypt password hashing</li>
            <li>Secure JWT token-based authentication</li>
            <li>HttpOnly and Secure cookies</li>
          </ul>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "var(--ink)", fontSize: "1.5rem", marginBottom: "1rem" }}>
            5. Your GDPR Rights
          </h2>
          <p style={{ color: "var(--ink)", lineHeight: 1.6 }}>
            Under GDPR, you have the following rights:
          </p>
          <ul style={{ color: "var(--ink)", lineHeight: 1.6, paddingLeft: "1.5rem" }}>
            <li>
              <strong>Right to Access:</strong> Request a copy of your personal data
            </li>
            <li>
              <strong>Right to Portability:</strong> Export your data in JSON or CSV format
            </li>
            <li>
              <strong>Right to Erasure:</strong> Request deletion of your account and data
            </li>
            <li>
              <strong>Right to Withdraw Consent:</strong> Manage your cookie preferences
            </li>
          </ul>
          <p style={{ color: "var(--ink)", lineHeight: 1.6, marginTop: "1rem" }}>
            You can exercise these rights from your Account Settings page.
          </p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "var(--ink)", fontSize: "1.5rem", marginBottom: "1rem" }}>
            6. Data Retention
          </h2>
          <p style={{ color: "var(--ink)", lineHeight: 1.6 }}>
            We retain your data according to the following schedule:
          </p>
          <ul style={{ color: "var(--ink)", lineHeight: 1.6, paddingLeft: "1.5rem" }}>
            <li>Active accounts: Indefinitely while in use</li>
            <li>Inactive accounts: 3 years (1095 days)</li>
            <li>Deleted accounts: 30 days (for recovery)</li>
            <li>Game data: 1 year after last activity</li>
          </ul>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "var(--ink)", fontSize: "1.5rem", marginBottom: "1rem" }}>
            7. Cookies
          </h2>
          <p style={{ color: "var(--ink)", lineHeight: 1.6 }}>
            We use essential cookies for:
          </p>
          <ul style={{ color: "var(--ink)", lineHeight: 1.6, paddingLeft: "1.5rem" }}>
            <li>Session management and authentication</li>
            <li>Security and CSRF protection</li>
            <li>Remembering your preferences</li>
          </ul>
          <p style={{ color: "var(--ink)", lineHeight: 1.6, marginTop: "1rem" }}>
            You can manage cookie preferences from the cookie banner or privacy settings.
          </p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "var(--ink)", fontSize: "1.5rem", marginBottom: "1rem" }}>
            8. Third-Party Services
          </h2>
          <p style={{ color: "var(--ink)", lineHeight: 1.6 }}>
            We do not share your personal data with third parties for marketing purposes. We only
            use essential services for platform operation.
          </p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "var(--ink)", fontSize: "1.5rem", marginBottom: "1rem" }}>
            9. Changes to This Policy
          </h2>
          <p style={{ color: "var(--ink)", lineHeight: 1.6 }}>
            We may update this privacy policy from time to time. We will notify you of any
            significant changes through the platform or via email.
          </p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "var(--ink)", fontSize: "1.5rem", marginBottom: "1rem" }}>
            10. Contact Us
          </h2>
          <p style={{ color: "var(--ink)", lineHeight: 1.6 }}>
            If you have any questions about this privacy policy or your data, please contact us
            through the Account Settings page.
          </p>
        </section>

        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--glass-brd)" }}>
          <button
            onClick={() => window.close()}
            className="btn"
            style={{ marginRight: "1rem" }}
          >
            Close
          </button>
          <button onClick={() => window.history.back()} className="btn-ghost">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
