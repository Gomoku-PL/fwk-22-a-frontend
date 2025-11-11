import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@gomoku/components";
import { loginUser } from "../lib/api.js";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginUser({
        identifier: formData.email, // Backend expects 'identifier' (email or username)
        password: formData.password,
      });

      // Store auth token if provided
      if (response.data?.accessToken) {
        localStorage.setItem("authToken", response.data.accessToken);
      }

      // Redirect to home or game page
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

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
            maxWidth: "500px",
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

      {/* LoginForm centered */}
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <LoginForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          disabled={isLoading}
          isModal={false}
        />
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <p style={{ color: "var(--muted)", fontSize: "var(--fs-ui)" }}>
            Don't have an account?{" "}
            <button
              onClick={handleRegisterRedirect}
              style={{
                background: "none",
                border: "none",
                color: "var(--accent2)",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "inherit",
              }}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
