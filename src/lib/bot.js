// Simple Gomoku AI with difficulty levels

// Get all empty cells on the board
function getEmptyCells(board) {
  const empty = [];
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (!board[r][c]) {
        empty.push({ row: r, col: c });
      }
    }
  }
  return empty;
}

// Check if a position would create a winning line
function isWinningMove(board, row, col, player) {
  const directions = [
    [0, 1],  // horizontal
    [1, 0],  // vertical
    [1, 1],  // diagonal \
    [1, -1], // diagonal /
  ];

  for (const [dx, dy] of directions) {
    let count = 1;

    // Check positive direction
    let r = row + dx;
    let c = col + dy;
    while (
      r >= 0 &&
      r < board.length &&
      c >= 0 &&
      c < board[0].length &&
      board[r][c] === player
    ) {
      count++;
      r += dx;
      c += dy;
    }

    // Check negative direction
    r = row - dx;
    c = col - dy;
    while (
      r >= 0 &&
      r < board.length &&
      c >= 0 &&
      c < board[0].length &&
      board[r][c] === player
    ) {
      count++;
      r -= dx;
      c -= dy;
    }

    if (count >= 5) return true;
  }

  return false;
}

// Count threats for a position (lines of 2, 3, or 4)
function evaluatePosition(board, row, col, player) {
  let score = 0;

  const directions = [
    [0, 1],  // horizontal
    [1, 0],  // vertical
    [1, 1],  // diagonal \
    [1, -1], // diagonal /
  ];

  for (const [dx, dy] of directions) {
    let count = 1;
    let openEnds = 0;

    // Check positive direction
    let r = row + dx;
    let c = col + dy;
    while (
      r >= 0 &&
      r < board.length &&
      c >= 0 &&
      c < board[0].length &&
      board[r][c] === player
    ) {
      count++;
      r += dx;
      c += dy;
    }
    if (
      r >= 0 &&
      r < board.length &&
      c >= 0 &&
      c < board[0].length &&
      !board[r][c]
    ) {
      openEnds++;
    }

    // Check negative direction
    r = row - dx;
    c = col - dy;
    while (
      r >= 0 &&
      r < board.length &&
      c >= 0 &&
      c < board[0].length &&
      board[r][c] === player
    ) {
      count++;
      r -= dx;
      c -= dy;
    }
    if (
      r >= 0 &&
      r < board.length &&
      c >= 0 &&
      c < board[0].length &&
      !board[r][c]
    ) {
      openEnds++;
    }

    // Score based on count and open ends
    if (count >= 4) score += 10000;
    else if (count === 3 && openEnds === 2) score += 1000;
    else if (count === 3 && openEnds === 1) score += 100;
    else if (count === 2 && openEnds === 2) score += 50;
    else if (count === 2) score += 10;
  }

  return score;
}

// EASY: Random move near existing stones
function getEasyMove(board) {
  const empty = getEmptyCells(board);
  if (empty.length === 0) return null;

  // Find cells with neighbors
  const near = empty.filter(({ row, col }) => {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const r = row + dr;
        const c = col + dc;
        if (
          r >= 0 &&
          r < board.length &&
          c >= 0 &&
          c < board[0].length &&
          board[r][c]
        ) {
          return true;
        }
      }
    }
    return false;
  });

  // Pick random from near stones, or any empty cell
  const candidates = near.length > 0 ? near : empty;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

// NORMAL: Block opponent wins and look for good moves
function getNormalMove(board, botPlayer) {
  const opponent = botPlayer === "B" ? "W" : "B";
  const empty = getEmptyCells(board);
  if (empty.length === 0) return null;

  // Check if bot can win
  for (const cell of empty) {
    if (isWinningMove(board, cell.row, cell.col, botPlayer)) {
      return cell;
    }
  }

  // Block opponent winning moves
  for (const cell of empty) {
    if (isWinningMove(board, cell.row, cell.col, opponent)) {
      return cell;
    }
  }

  // Evaluate all positions and pick best
  let best = null;
  let bestScore = -1;

  for (const cell of empty) {
    const score = evaluatePosition(board, cell.row, cell.col, botPlayer);
    if (score > bestScore) {
      bestScore = score;
      best = cell;
    }
  }

  return best || empty[Math.floor(Math.random() * empty.length)];
}

// HARD: Advanced evaluation with look-ahead
function getHardMove(board, botPlayer) {
  const opponent = botPlayer === "B" ? "W" : "B";
  const empty = getEmptyCells(board);
  if (empty.length === 0) return null;

  // Check if bot can win
  for (const cell of empty) {
    if (isWinningMove(board, cell.row, cell.col, botPlayer)) {
      return cell;
    }
  }

  // Block opponent winning moves
  for (const cell of empty) {
    if (isWinningMove(board, cell.row, cell.col, opponent)) {
      return cell;
    }
  }

  // Advanced evaluation: consider both offense and defense
  let best = null;
  let bestScore = -1;

  for (const cell of empty) {
    const offenseScore = evaluatePosition(board, cell.row, cell.col, botPlayer);
    const defenseScore = evaluatePosition(board, cell.row, cell.col, opponent);
    const totalScore = offenseScore * 1.2 + defenseScore * 0.8;

    if (totalScore > bestScore) {
      bestScore = totalScore;
      best = cell;
    }
  }

  return best || empty[Math.floor(Math.random() * empty.length)];
}

// Main function: get bot move based on difficulty
export function getBotMove(board, botPlayer, difficulty = "NORMAL") {
  switch (difficulty) {
    case "LÄTT":
      return getEasyMove(board);
    case "NORMAL":
      return getNormalMove(board, botPlayer);
    case "SVÅR":
      return getHardMove(board, botPlayer);
    default:
      return getNormalMove(board, botPlayer);
  }
}

export default { getBotMove };
