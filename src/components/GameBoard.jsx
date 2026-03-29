import React from "react";
import { tileTypeAt } from "../game/engine";

function Tile({ type }) {
  return <div className={`tile tile-${type}`} />;
}

export default function GameBoard({ state }) {
  const cells = [];
  for (let row = 0; row < state.rows; row += 1) {
    for (let col = 0; col < state.cols; col += 1) {
      cells.push(<Tile key={`${row}-${col}`} type={tileTypeAt(state, row, col)} />);
    }
  }

  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${state.cols}, 28px)`,
        gridTemplateRows: `repeat(${state.rows}, 28px)`
      }}
    >
      {cells}
    </div>
  );
}
