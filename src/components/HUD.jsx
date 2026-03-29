import React from "react";

export default function HUD({
  levelNumber,
  totalLevels,
  solved,
  completed,
  showInstructions,
  onRestart,
  onSkip,
  onReset
}) {
  return (
    <div className="hud">
      <div className="hud-row">
        <strong>Level:</strong> {levelNumber}/{totalLevels}
      </div>
      <div className="controls">
        <button type="button" onClick={onRestart}>
          Restart (R)
        </button>
        <button type="button" onClick={onSkip} disabled={completed}>
          Skip (N)
        </button>
        <button type="button" onClick={onReset}>
          Reset Game (G)
        </button>
      </div>
      {showInstructions ? (
        <div className="instructions">
          <h3>How To Play</h3>
          <p className="instructions-subtitle">Complete this tutorial level to hide instructions and start the full challenge.</p>
          <div className="instructions-grid">
            <div className="instruction-card">
              <h4>Goal</h4>
              <p>Push all boxes onto green target tiles.</p>
            </div>
            <div className="instruction-card">
              <h4>Rule</h4>
              <p>You can push one box at a time, but you cannot pull boxes.</p>
            </div>
            <div className="instruction-card">
              <h4>Move</h4>
              <p>Arrow keys or W/A/S/D</p>
            </div>
            <div className="instruction-card">
              <h4>Actions</h4>
              <p>Restart: R | Skip: N | Reset game: G</p>
            </div>
            <div className="instruction-card">
              <h4>Legend</h4>
              <p className="legend-row">
                <span className="legend-swatch legend-player" /> Player
              </p>
              <p className="legend-row">
                <span className="legend-swatch legend-box" /> Box
              </p>
              <p className="legend-row">
                <span className="legend-swatch legend-target" /> Placeholder (target)
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
