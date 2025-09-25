// frontend/src/store/gameStore.js
import { create } from "zustand";
import { createGame, getGame, postMove } from "../lib/api";

export const useGameStore = create((set, get) => ({
  board: [],            // 2D array of "B", "W", or null
  currentPlayer: "B",   // "B" or "W"
  gameId: null,         // Current game ID
  status: "ongoing",    // "ongoing", "won", "draw"
  winner: null,         // "B", "W", or null

  // Initialize/reset the game
  reset: async (options = {}) => {
    try {
      const game = await createGame(options);
      set({
        board: game.board,
        currentPlayer: game.nextPlayer,
        gameId: game.gameId,
        status: game.status,
        winner: game.winner,
      });
    } catch (err) {
      console.error("reset error:", err);
    }
  },

  // Place a move on the board
  place: async (x, y) => {
    const { gameId, board, currentPlayer, status } = get();

    if (!gameId || status !== "ongoing") return;

    try {
      const game = await postMove(gameId, { x, y });
      set({
        board: game.board,
        currentPlayer: game.nextPlayer,
        status: game.status,
        winner: game.winner,
      });
    } catch (err) {
      console.error("place error:", err);
    }
  },

  // Optionally, load an existing game
  loadGame: async (id) => {
    try {
      const game = await getGame(id);
      set({
        board: game.board,
        currentPlayer: game.nextPlayer,
        gameId: game.gameId,
        status: game.status,
        winner: game.winner,
      });
    } catch (err) {
      console.error("loadGame error:", err);
    }
  },
}));
