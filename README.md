# REFLEX — Reaction Time Tester

> Browser-based reaction time tester. 5 rounds, live stats, percentile ranking, personal best tracking. Built with vanilla HTML, CSS & JS — no frameworks, no build tools.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)

---

## Overview

REFLEX is a lightweight, browser-based reaction time tester built with vanilla HTML, CSS, and JavaScript. It measures how fast you can respond to a visual stimulus across 5 rounds and gives you a detailed performance breakdown at the end — including a percentile ranking against average human reaction times.

---

## Features

- 5-round reaction test with randomised delays to prevent anticipation
- Live stats — last, average, and best time updated after each round
- Results screen with percentile ranking against the human population average
- Per-round bar chart showing consistency across the session
- Personal best saved locally in the browser and persisted across sessions
- Early click detection — penalises jumping the gun before the signal
- Keyboard support — `Space` bar works alongside mouse clicks
- Zero dependencies, no frameworks, no npm, no build step required

---

## How It Works

1. Click the arena (or press `Space`) to begin
2. Wait for the screen to flash **green** — the delay is random between 1.5s and 5s so you can't time it
3. Click or press `Space` as fast as you can the moment you see green
4. Click too early and you'll get a penalty — you must wait and retry that round
5. After 5 rounds you'll see your full results breakdown

---

## Results Breakdown

| Metric | Description |
|---|---|
| Average | Mean reaction time across all 5 rounds |
| Percentile | How you rank against the human population average (~250ms) |
| Best | Your fastest single round |
| Worst | Your slowest single round |
| Consistency | Difference between best and worst (lower = more consistent) |

---

## Getting Started

### Run locally

1. Clone the repo
   ```bash
   git clone https://github.com/YOUR_USERNAME/reflex.git
   cd reflex
   ```

2. Open in VS Code and right-click `index.html` → **Open with Live Server**

---

## Project Structure

```
reflex/               # Static assets (favicon etc.)
├── src/
│   ├── js/
│   │   ├── main.js         Entry point — wires DOM events to game
│   │   ├── game.js         Core state machine — all game logic
│   │   ├── ui.js           DOM rendering helpers — no logic
│   │   ├── utils.js        Pure functions — percentile, verdict, stats
│   │   └── storage.js      localStorage read/write wrapper
│   └── css/
│       └── styles.css      All styling and CSS variables
├── index.html              Markup — zero inline CSS or JS
└── README.md
```

### Module responsibilities

- **`main.js`** — boots the app, attaches all event listeners
- **`game.js`** — owns game state (`idle → ready → go → result → done`), imports from all other modules
- **`ui.js`** — only touches the DOM, knows nothing about game rules
- **`utils.js`** — stateless pure functions, fully unit-testable
- **`storage.js`** — abstracts localStorage so the rest of the app never calls it directly

---

---

## License

MIT — free to use, modify, and distribute.
