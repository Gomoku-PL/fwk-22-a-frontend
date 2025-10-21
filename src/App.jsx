import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Game from "./pages/Game.jsx";

import AccountSettings from "./pages/AccountSettings.jsx";
import SecurityNotice from "../src/ui/SecurityNotice/SecurityNotice.jsx";
import "./App.css";

export default function App() {
  return (
    <div className="gmk">
      {/* Header */}
      <section className="hero">
        <div className="title">
          <div className="latin">GOMOKU</div>
          <div className="jp">五目</div>
        </div>
        <div className="divider"></div>
      </section>

      {/* Routes live here (single source of truth) */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Use ONE param name consistently; pick :id */}
        <Route path="/game/:id" element={<Game />} />
        <Route path="/account-settings" element={<AccountSettings />} />
      </Routes>

      <SecurityNotice
        https={window.location.protocol === "https:"}
        encryption={true}
        autth={true}
        docsLink="./security"
      />
    </div>
  );
}
