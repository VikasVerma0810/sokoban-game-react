const keyOf = (row, col) => `${row},${col}`;

const dirDelta = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1]
};

export function createLevelState(level) {
  const walls = new Set(level.walls.map(([r, c]) => keyOf(r, c)));
  const targets = new Set(level.targets.map(([r, c]) => keyOf(r, c)));
  const boxes = new Set(level.boxes.map(([r, c]) => keyOf(r, c)));
  const [playerRow, playerCol] = level.start;

  return {
    levelId: level.id,
    rows: level.rows,
    cols: level.cols,
    player: [playerRow, playerCol],
    walls,
    targets,
    boxes,
    solved: isSolved(targets, boxes)
  };
}

export function isSolved(targets, boxes) {
  if (targets.size === 0) return true;
  for (const box of boxes) {
    if (!targets.has(box)) return false;
  }
  return true;
}

function inBounds(row, col, rows, cols) {
  return row >= 0 && col >= 0 && row < rows && col < cols;
}

export function movePlayer(state, direction) {
  const delta = dirDelta[direction];
  if (!delta || state.solved) return state;

  const [dr, dc] = delta;
  const [row, col] = state.player;
  const nextRow = row + dr;
  const nextCol = col + dc;
  const nextKey = keyOf(nextRow, nextCol);

  if (!inBounds(nextRow, nextCol, state.rows, state.cols)) return state;
  if (state.walls.has(nextKey)) return state;

  const hasBox = state.boxes.has(nextKey);
  if (!hasBox) {
    return {
      ...state,
      player: [nextRow, nextCol]
    };
  }

  const pushRow = nextRow + dr;
  const pushCol = nextCol + dc;
  const pushKey = keyOf(pushRow, pushCol);
  if (!inBounds(pushRow, pushCol, state.rows, state.cols)) return state;
  if (state.walls.has(pushKey) || state.boxes.has(pushKey)) return state;

  const nextBoxes = new Set(state.boxes);
  nextBoxes.delete(nextKey);
  nextBoxes.add(pushKey);

  return {
    ...state,
    player: [nextRow, nextCol],
    boxes: nextBoxes,
    solved: isSolved(state.targets, nextBoxes)
  };
}

export function tileTypeAt(state, row, col) {
  const key = keyOf(row, col);
  if (state.player[0] === row && state.player[1] === col) return "player";
  if (state.walls.has(key)) return "wall";
  if (state.boxes.has(key) && state.targets.has(key)) return "boxTarget";
  if (state.boxes.has(key)) return "box";
  if (state.targets.has(key)) return "target";
  return "floor";
}
