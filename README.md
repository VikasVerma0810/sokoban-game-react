# 🎮 Soban Puzzle Game

A web-based Sokoban-style puzzle game built with **React + Vite**.

This project was converted from a C++ console concept into a modern browser game with keyboard controls, level progression, and a tutorial-style first level.

## Features

- React + Vite project setup
- Tile-based Sokoban gameplay
- Multiple levels with progression
- Tutorial instructions shown on first level only
- Keyboard + button controls
- Responsive dark-themed UI

## Tech Stack

- React
- Vite
- JavaScript (ES Modules)
- CSS

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev


Open the local URL shown in terminal (usually `http://localhost:5173`).


## Project Structure

```text
.
├─ index.html
├─ package.json
├─ vite.config.js
└─ src
   ├─ App.jsx
   ├─ main.jsx
   ├─ styles.css
   ├─ components
   │  ├─ GameBoard.jsx
   │  └─ HUD.jsx
   └─ game
      ├─ engine.js
      └─ levels.js
```

## Controls

- **Move:** Arrow keys or `W / A / S / D`
- **Restart current level:** `R`
- **Skip level:** `N`
- **Reset full game:** `G`

## Tile Legend

- **Player:** Red tile
- **Box:** Orange tile
- **Placeholder (Target):** Green tile
- **Wall:** Blue tile

## Gameplay Rules

- Push all boxes onto target tiles to clear a level.
- You can push only one box at a time.
- You cannot pull boxes.
