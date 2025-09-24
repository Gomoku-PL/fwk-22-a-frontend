function placeStone(board, row, col, player) {
    if (board[row][col]) return null; // Ogiltigt drag, cellen är redan upptagen

    // Skapa en kopia av brädet
    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = player;

    return newBoard;
}

function checkWin(board, row, col, player) {
    const directions = [
        [0, 1],   // horizontal
        [1, 0],   // vertical
        [1, 1],   // diagonal \
        [1, -1]   // diagonal /
    ];

    for (const [dx, dy] of directions) {
        let count = 1; // Count the current stone

        // Check in positive direction
        let r = row + dx;
        let c = col + dy;
        while (r >= 0 && r < board.length && c >= 0 && c < board[0].length && board[r][c] === player) {
            count++;
            r += dx;
            c += dy;
        }

        // Check in negative direction
        r = row - dx;
        c = col - dy;
        while (r >= 0 && r < board.length && c >= 0 && c < board[0].length && board[r][c] === player) {
            count++;
            r -= dx;
            c -= dy;
        }

        if (count >= 5) {
            return true;
        }
    }

    return false;
}

export default { placeStone, checkWin };
