const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || "/api/games";

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw { status: response.status, ...data };
  }
  return data;
}

export async function createGame(options = {}) {
  try {
    const response = await fetch(VITE_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options),
    });
    const game = await handleResponse(response);
    localStorage.setItem("currentGameId", game.gameId);
    return game;
  } catch (err) {
    console.error("createGame error:", err);
    throw err;
  }
}

export async function getGame(gameId) {
  if (!gameId)
    throw { status: 400, error: "MISSING_ID", message: "Game ID is required" };

  try {
    const response = await fetch(
      `${VITE_BASE_URL}/${encodeURIComponent(gameId)}`,
    );
    return await handleResponse(response);
  } catch (err) {
    console.error("getGame error:", err);
    throw err;
  }
}

export async function postMove(gameId, { x, y }) {
  if (!gameId)
    throw { status: 400, error: "MISSING_ID", message: "Game ID is required" };
  if (!Number.isInteger(x) || !Number.isInteger(y))
    throw {
      status: 400,
      error: "INVALID_COORDS",
      message: "x and y must be integers",
    };

  try {
    const response = await fetch(
      `${VITE_BASE_URL}/${encodeURIComponent(gameId)}/moves`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ x, y }),
      },
    );
    return await handleResponse(response);
  } catch (err) {
    console.error("postMove error:", err);
    throw err;
  }
}

export function getSavedGameId() {
  return localStorage.getItem("currentGameId");
}

export function clearSavedGameId() {
  localStorage.removeItem("currentGameId");
}

export async function deleteAccount() {
  try {
    const response = await fetch(
      `${VITE_BASE_URL.replace("/games", "")}/data`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies for authentication
      },
    );

    if (response.ok) {
      // Clear all local storage data
      localStorage.clear();
      sessionStorage.clear();

      return { success: true };
    } else {
      // Check content-type before parsing JSON
      const contentType = response.headers.get("content-type");
      let errorData = { message: `HTTP ${response.status}` };
      if (contentType && contentType.includes("application/json")) {
        try {
          errorData = await response.json();
        } catch (parseErr) {
          console.warn("Failed to parse error JSON:", parseErr);
        }
      } else {
        // Server returned HTML or other non-JSON (likely 404 page)
        const text = await response.text();
        errorData.message = `Server error: ${response.status} ${response.statusText}`;
        console.error("Non-JSON response:", text.substring(0, 200));
      }
      throw { status: response.status, ...errorData };
    }
  } catch (err) {
    console.error("deleteAccount error:", err);
    throw err;
  }
}

export function logout() {
  // Clear all session data
  localStorage.clear();
  sessionStorage.clear();

  // If using cookies, you might want to call a logout endpoint
  // For now, just clear local data
  return Promise.resolve();
}

export async function saveCookiePreferences(preferences) {
  try {
    const response = await fetch('/cookies/prefs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preferences),
      credentials: 'include'
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw { status: response.status, message: 'Failed to save preferences' };
    }
  } catch (err) {
    console.warn('Cookie preferences sync failed:', err);
    throw err;
  }
}

export function getCookiePreferences() {
  const savedPrefs = localStorage.getItem('app.cookiePrefs');
  return savedPrefs ? JSON.parse(savedPrefs) : null;
}

export function setCookiePreferences(preferences) {
  localStorage.setItem('app.cookiePrefs', JSON.stringify(preferences));
}

export function canUseAnalytics() {
  const prefs = getCookiePreferences();
  return prefs?.analytics === true;
}

export function canUseMarketing() {
  const prefs = getCookiePreferences();
  return prefs?.marketing === true;
}

export function trackEvent(eventName, eventData = {}) {
  if (!canUseAnalytics()) {
    return;
  }

  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventData);
  }

  if (typeof analytics !== 'undefined') {
    analytics.track(eventName, eventData);
  }

  console.log('Analytics event:', eventName, eventData);
}

export function trackPageView(page) {
  if (!canUseAnalytics()) {
    return;
  }

  if (typeof gtag !== 'undefined') {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: page,
      page_location: window.location.href
    });
  }

  console.log('Page view tracked:', page);
}

export async function registerUser(userData) {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userData),
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Registration failed');
    }

    return data;
  } catch (err) {
    console.error('Registration error:', err);
    throw err;
  }
}
