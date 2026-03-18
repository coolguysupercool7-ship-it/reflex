# REFLEX
A minimal reaction time tester built with vanilla HTML, CSS, and JavaScript. Test how fast your reflexes are across 5 rounds and see how you rank against the average human reaction time.

## Features
- **5-Round Test** - Consistent format across every session for fair comparison
- **Randomised Delays** - Wait time is random between 1.5s and 5s so you can't anticipate the signal
- **Early Click Detection** - Penalises jumping the gun before the green flash
- **Live Stats** - See your last, average, and best time update after every round
- **Results Breakdown** - Percentile ranking, per-round bar chart, and consistency score
- **Personal Best** - Your all-time best average is saved in the browser across sessions
- **Keyboard Support** - `Space` bar works alongside mouse clicks
- **No Dependencies** - Zero frameworks, no npm, no build step required

## Demo
Try it live: [REFLEX Demo](https://coolguysupercool7-ship-it.github.io/reflex/)

## Getting Started

### Prerequisites
- VS Code
- Live Server extension (VS Code → Extensions → search "Live Server")

### Installation
1. Clone the repo
   ```bash
   git clone https://github.com/coolguysupercool7-ship-it/reflex.git
   cd reflex
   ```

2. Open the folder in VS Code

3. Right-click `index.html` → **Open with Live Server**

> ⚠️ The JS files use ES Modules so the project must be served through a local server. Opening `index.html` directly via `file://` will throw a CORS error.

## Usage
1. **Click the arena** or press `Space` to start a round
2. **Wait for the green flash** — don't click early or you'll be penalised
3. **Click as fast as you can** the moment you see it
4. **Repeat for 5 rounds** — your live stats update after each one
5. **View your results** — average time, percentile, best, worst, and consistency
6. **Click "Play Again"** to try and beat your score!

## Built With
- [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML) - Markup
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) - Styling with custom properties
- [Vanilla JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - ES Modules, no frameworks
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - Personal best persistence

## How It Works

REFLEX measures your **reaction time in milliseconds** from the moment the arena flashes green to the moment you click or press Space.

- **Percentile** — Your average is compared against a human population baseline (~250ms average)
- **Consistency** — The difference between your best and worst round; lower means more consistent
- **Early click** — If you click before the signal the round doesn't count and you retry it

### Verdict scale

| Average | Verdict |
|---|---|
| < 180ms | Superhuman |
| 180–210ms | Elite Reflexes |
| 210–240ms | Above Average |
| 240–270ms | Average |
| 270–320ms | Below Average |
| 320ms+ | Keep Practicing |

## Project Structure

```
reflex/
├── public/                 # Static assets
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

