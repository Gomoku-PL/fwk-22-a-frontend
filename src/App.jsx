import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Game from "./pages/Game.jsx";
import AccountSettings from "./pages/AccountSettings.jsx";
import SecurityNotice from "../src/ui/SecurityNotice/SecurityNotice.jsx";
import { CookieBanner } from "@gomoku/components";
import { getCookiePreferences, setCookiePreferences, saveCookiePreferences } from "./lib/api.js";
import "./App.css";

export default function App() {
  const [cookiePreferences, setCookiePrefs] = useState(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const savedPrefs = getCookiePreferences();
    if (savedPrefs) {
      setCookiePrefs(savedPrefs);
      setShowCookieBanner(false);
    } else {
      setShowCookieBanner(true);
    }
  }, []);

  const handleCookieSave = async (preferences) => {
    const formattedPrefs = {
      essential: preferences.necessary,
      analytics: preferences.analytics,
      marketing: preferences.marketing
    };
    
    setCookiePreferences(formattedPrefs);
    setCookiePrefs(formattedPrefs);
    setShowCookieBanner(false);

    try {
      await saveCookiePreferences(formattedPrefs);
    } catch (error) {
      console.warn('Failed to sync cookie preferences to backend:', error);
    }
  };

  const handleCookieDismiss = () => {
    setShowCookieBanner(false);
  };

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

      <CookieBanner 
        isVisible={showCookieBanner}
        initialPreferences={{
          analytics: cookiePreferences?.analytics || false,
          marketing: cookiePreferences?.marketing || false
        }}
        onSave={handleCookieSave}
        onDismiss={handleCookieDismiss}
      />
    </div>
  );
}
