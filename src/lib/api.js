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
  if (!gameId) throw { status: 400, error: "MISSING_ID", message: "Game ID is required" };

  try {
    const response = await fetch(`${VITE_BASE_URL}/${encodeURIComponent(gameId)}`);
    return await handleResponse(response);
  } catch (err) {
    console.error("getGame error:", err);
    throw err;
  }
}

export async function postMove(gameId, { x, y }) {
  if (!gameId) throw { status: 400, error: "MISSING_ID", message: "Game ID is required" };
  if (!Number.isInteger(x) || !Number.isInteger(y))
    throw { status: 400, error: "INVALID_COORDS", message: "x and y must be integers" };

  try {
    const response = await fetch(`${VITE_BASE_URL}/${encodeURIComponent(gameId)}/moves`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ x, y }),
    });
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
