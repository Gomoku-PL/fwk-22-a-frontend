import React, { useState } from "react";
import { deleteAccount } from "../lib/api";
import "./DeleteData.css";

const DeleteData = () => {

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async () => {
    console.log("Delete btton clicked");
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your personal data? This action cannot be undone."
    );
    if (!confirmed) return;

    setStatus("pending");
    setError("");

    try {
      await deleteAccount();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Failed to delete data");
    }
  };

  return (
    <div className="delete-container">
      <h1>Delete Your Personal Data</h1>
      <p>Deleting your data is permanent. This action cannot be undone.</p>

      <button
        className="delete-button"
        onClick={handleDelete}
        disabled={status === "pending"}
      >
        {status === "pending" ? "Deleting..." : "Delete My Data"}
      </button>

      {status === "success" && (
        <p className="status-success">Your data was successfully deleted.</p>
      )}
      {status === "error" && <p className="status-error">Error: {error}</p>}
    </div>
  );
};

export default DeleteData;
