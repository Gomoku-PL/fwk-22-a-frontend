import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "@gomoku/components";
import { registerUser } from "../lib/api.js";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      await registerUser({
        email: formData.email,
        password: formData.password,
        consent: formData.consent,
        timestamp: formData.timestamp,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (success) {
    return (
      <div className="gmk">
        <section className="hero">
          <div
            className="card"
            style={{
              textAlign: "center",
              maxWidth: "500px",
              margin: "0 auto",
              padding: "2rem",
            }}
          >
            <h2
              style={{
                fontSize: "var(--fs-title)",
                fontWeight: 900,
                background:
                  "linear-gradient(90deg, var(--accent1), var(--accent2))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                marginBottom: "1rem",
              }}
            >
              Registration Successful!
            </h2>
            <p
              style={{
                color: "var(--ink)",
                marginBottom: "1rem",
                fontSize: "var(--fs-body)",
              }}
            >
              Your account has been created successfully.
            </p>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "var(--fs-ui)",
              }}
            >
              Redirecting to login page...
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div
      style={{
        gridColumn: "1 / -1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 200px)",
        padding: "2rem",
      }}
    >
      {/* Error message */}
      {error && (
        <div
          style={{
            width: "100%",
            maxWidth: "700px",
            padding: "1rem",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            color: "var(--ink)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* RegisterForm centered */}
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
        }}
      >
        <RegisterForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          disabled={isLoading}
          showValidation={true}
          isModal={false}
        />
      </div>
    </div>
  );
}
