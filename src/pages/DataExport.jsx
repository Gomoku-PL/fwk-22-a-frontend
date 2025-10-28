import React, { useState } from "react";
import { exportUserData } from "../lib/api";
import "./DataExport.css"; // Import CSS

const DataExport = () => {
  const [format, setFormat] = useState("json");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setProgress(0);

    try {
      const blob = await exportUserData(format, setProgress);
      const fileURL = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = fileURL;
      a.download = `userdata.${format}`;
      a.click();
      window.URL.revokeObjectURL(fileURL);
      setSuccess(true);
    } catch (err) {
      setError("Failed to export data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="data-export-container">
      <h1>Export My Data</h1>

      <label>Select format:</label>
      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="json">JSON</option>
        <option value="csv">CSV</option>
      </select>

      <button onClick={handleExport} disabled={loading}>
        {loading ? "Exporting..." : "Download Data"}
      </button>

      {loading && (
        <>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">{progress}%</p>
        </>
      )}

      {success && <p className="success-msg">✅ Data exported successfully!</p>}

      {error && (
        <p className="error-msg">
          ❌ {error}
          <button onClick={handleExport}>Retry</button>
        </p>
      )}
    </div>
  );
};

export default DataExport;
