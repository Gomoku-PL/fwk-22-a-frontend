/**
 * Secure Storage Wrapper
 * ----------------------
 * Provides safe set, get, and remove functions for frontend storage.
 * Only allows non-sensitive keys (UI preferences) to be stored.
 * Warns if attempts are made to store sensitive data.
 */

const ALLOWED_KEYS = [
  "theme",
  "language",
  "layout",
  "fontSize",
  "showHints",
];

/**
 * Logs warning for restricted keys
 */
const warnRestricted = (key) => {
  console.warn(
    `[SECURE STORAGE] Attempt to store restricted key "${key}" blocked. Allowed keys: ${ALLOWED_KEYS.join(
      ", "
    )}`
  );
};

/**
 * Safe setter
 */
export const safeSet = (key, value, { session = false } = {}) => {
  if (!ALLOWED_KEYS.includes(key)) {
    warnRestricted(key);
    return;
  }

  try {
    const stringValue = JSON.stringify(value);
    if (session) {
      sessionStorage.setItem(key, stringValue);
    } else {
      localStorage.setItem(key, stringValue);
    }
  } catch (err) {
    console.error("[SECURE STORAGE] Failed to set item:", err);
  }
};

/**
 * Safe getter
 */
export const safeGet = (key, { session = false } = {}) => {
  if (!ALLOWED_KEYS.includes(key)) {
    warnRestricted(key);
    return null;
  }

  try {
    const stringValue = session
      ? sessionStorage.getItem(key)
      : localStorage.getItem(key);
    return stringValue ? JSON.parse(stringValue) : null;
  } catch (err) {
    console.error("[SECURE STORAGE] Failed to get item:", err);
    return null;
  }
};

/**
 * Safe remove
 */
export const safeRemove = (key, { session = false } = {}) => {
  if (!ALLOWED_KEYS.includes(key)) {
    warnRestricted(key);
    return;
  }

  try {
    if (session) {
      sessionStorage.removeItem(key);
    } else {
      localStorage.removeItem(key);
    }
  } catch (err) {
    console.error("[SECURE STORAGE] Failed to remove item:", err);
  }
};
