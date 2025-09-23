function placeStone(board, row, col, player) {
    if (board[row][col]) return null; // Ogiltigt drag, cellen är redan upptagen

    // Skapa en kopia av brädet
    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = player;

    return newBoard;
}

export default { placeStone };
