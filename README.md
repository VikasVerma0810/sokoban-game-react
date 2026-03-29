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
```

Open the local URL shown in terminal (usually `http://localhost:5173`).

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

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

## Deploy to GitHub Pages (Vite)

1. Create a GitHub repository and push this project.
2. Set `base` in `vite.config.js` to your repo path:

```js
export default defineConfig({
  base: "/your-repo-name/"
});
```

3. Add a GitHub Actions workflow for Pages deploy.
4. In GitHub repo settings, enable **Pages → Source: GitHub Actions**.

## License

This project is for learning and personal use.  
You can add a license file (for example MIT) if you want to share it publicly.
