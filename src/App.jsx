import React, { useCallback, useEffect, useMemo, useState } from "react";
import GameBoard from "./components/GameBoard";
import HUD from "./components/HUD";
import { LEVELS } from "./game/levels";
import { createLevelState, movePlayer } from "./game/engine";

const KEY_TO_DIR = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  KeyW: "up",
  KeyS: "down",
  KeyA: "left",
  KeyD: "right"
};

export default function App() {
  const totalLevels = LEVELS.length;
  const [levelIndex, setLevelIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const [state, setState] = useState(() => createLevelState(LEVELS[0]));

  const currentLevel = useMemo(() => LEVELS[levelIndex], [levelIndex]);

  const loadLevel = useCallback((index) => {
    setLevelIndex(index);
    setState(createLevelState(LEVELS[index]));
  }, []);

  const restartLevel = useCallback(() => {
    loadLevel(levelIndex);
  }, [levelIndex, loadLevel]);

  const skipLevel = useCallback(() => {
    if (levelIndex >= totalLevels - 1) {
      setCompleted(true);
      return;
    }
    loadLevel(levelIndex + 1);
  }, [levelIndex, loadLevel, totalLevels]);

  const resetGame = useCallback(() => {
    setCompleted(false);
    setTutorialCompleted(false);
    loadLevel(0);
  }, [loadLevel]);

  useEffect(() => {
    if (!state.solved || completed) return;
    if (levelIndex === 0) {
      setTutorialCompleted(true);
    }
    if (levelIndex >= totalLevels - 1) {
      setCompleted(true);
      return;
    }
    const timer = setTimeout(() => {
      loadLevel(levelIndex + 1);
    }, 450);
    return () => clearTimeout(timer);
  }, [state.solved, completed, levelIndex, totalLevels, loadLevel]);

  useEffect(() => {
    // Guard: once tutorial is done, never revisit level 0
    // unless user explicitly resets the whole game.
    if (tutorialCompleted && levelIndex === 0 && totalLevels > 1) {
      loadLevel(1);
    }
  }, [tutorialCompleted, levelIndex, totalLevels, loadLevel]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code === "KeyR") {
        restartLevel();
        return;
      }
      if (event.code === "KeyN") {
        skipLevel();
        return;
      }
      if (event.code === "KeyG") {
        resetGame();
        return;
      }

      const dir = KEY_TO_DIR[event.code] ?? KEY_TO_DIR[event.key];
      if (!dir) return;
      event.preventDefault();
      setState((prev) => movePlayer(prev, dir));
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [restartLevel, skipLevel, resetGame]);

  return (
    <main className="app">
      <h1>🎮 Soban 🧩</h1>
      <HUD
        levelNumber={levelIndex + 1}
        totalLevels={totalLevels}
        solved={state.solved}
        completed={completed}
        showInstructions={!tutorialCompleted && levelIndex === 0}
        onRestart={restartLevel}
        onSkip={skipLevel}
        onReset={resetGame}
      />

      {!completed ? (
        <GameBoard key={currentLevel.id} state={state} />
      ) : (
        <section className="finished">
          <h2>Game Over</h2>
          <p>All levels are completed.</p>
          <button type="button" onClick={resetGame}>
            Play Again
          </button>
        </section>
      )}
    </main>
  );
}
