import React from "react";

export default function BoardWrapper({
  board,
  size = 15,
  renderCell,
  onCellClick,
  className = "",
  style = {},
}) {
  const rows = Array.isArray(board) ? board.length : size;
  const cols =
    Array.isArray(board) && board[0] ? board[0].length : size;

  const data =
    Array.isArray(board)
      ? board
      : Array.from({ length: rows }, () =>
          Array.from({ length: cols }, () => null)
        );

  return (
    <div
      className={`board-wrapper ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 32px)`,
        gridTemplateRows: `repeat(${rows}, 32px)`,
        gap: "2px",
        background: "#c69a4b",
        padding: "8px",
        border: "2px solid #8a5a12",
        width: "fit-content",
        ...style,
      }}
    >
      {data.map((row, r) =>
        row.map((value, c) => {
          const content = renderCell
            ? renderCell({ row: r, col: c, value })
            : value ?? "";
            return (
            <button
              key={`${r}-${c}`}
              onClick={() => onCellClick && onCellClick(r, c)}
              style={{
                width: 32,
                height: 32,
                background: "#f2d7a2",
                border: "1px solid #a9792b",
                fontSize: 18,
                lineHeight: "1",
                cursor: onCellClick ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                userSelect: "none",
              }}
            >
              {content}
              </button>
          );
        })
      )}
    </div>
  );
} 