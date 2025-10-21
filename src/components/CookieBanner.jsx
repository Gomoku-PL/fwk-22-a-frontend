import React, { useState, useEffect } from 'react';
import { getCookiePreferences, setCookiePreferences, saveCookiePreferences } from '../lib/api.js';

const COOKIE_PREFS_KEY = 'app.cookiePrefs';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const savedPrefs = getCookiePreferences();
    if (!savedPrefs) {
      setIsVisible(true);
    } else {
      setPreferences(savedPrefs);
    }
  }, []);

  const savePreferences = async (prefs) => {
    setCookiePreferences(prefs);
    setPreferences(prefs);
    setIsVisible(false);

    try {
      await saveCookiePreferences(prefs);
    } catch (error) {
      console.warn('Failed to sync cookie preferences to backend:', error);
    }
  };

  const acceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      marketing: true
    });
  };

  const acceptEssential = () => {
    savePreferences({
      essential: true,
      analytics: false,
      marketing: false
    });
  };

  const handleCustomSave = () => {
    savePreferences(preferences);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#f8f9fa',
      border: '1px solid #dee2e6',
      padding: '1rem',
      zIndex: 1000,
      boxShadow: '0 -2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Cookie Preferences</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#6c757d' }}>
          We use cookies to enhance your experience. Choose your preferences below.
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={preferences.essential}
              disabled
              style={{ margin: 0 }}
            />
            <span>Essential (Required)</span>
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
              style={{ margin: 0 }}
            />
            <span>Analytics</span>
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
              style={{ margin: 0 }}
            />
            <span>Marketing</span>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={acceptAll}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Accept All
          </button>
          
          <button
            onClick={acceptEssential}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Essential Only
          </button>
          
          <button
            onClick={handleCustomSave}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}