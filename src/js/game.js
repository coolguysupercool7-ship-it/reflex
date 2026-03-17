import { getPercentile, getVerdict, calcStats } from './utils.js';
import { loadBest, maybeSaveBest } from './storage.js';
import {
  setArenaState,
  buildRoundsRow,
  completeSlot,
  activateSlot,
  updateStatsBar,
  updateHeaderBest,
  showResetBtn,
  hideResetBtn,
  showResults,
  hideResults,
} from './ui.js';

const ROUNDS     = 5;
const MIN_DELAY  = 1500;
const MAX_DELAY  = 5000;

let state      = 'idle';
let goTimeout  = null;
let startTime  = null;
let round      = 0;
let times      = [];

export function init() {
  clearTimeout(goTimeout);
  state  = 'idle';
  round  = 0;
  times  = [];

  buildRoundsRow(ROUNDS);
  updateStatsBar({ round: 0, total: ROUNDS, last: null, avg: null, best: null });
  setArenaState('wait', 'CLICK', 'anywhere to start');
  hideResetBtn();
  hideResults();
  updateHeaderBest(loadBest());
}

export function handleInput() {
  switch (state) {
    case 'idle':
    case 'result':
      beginWait();
      break;

    case 'ready':
      clearTimeout(goTimeout);
      earlyClick();
      break;

    case 'go':
      registerReaction();
      break;

    case 'early':
      beginWait();
      break;

    case 'done':
      break;
  }
}


function beginWait() {
  const delay = MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY);
  state = 'ready';
  setArenaState('ready', 'WAIT', "don't click yet…");
  goTimeout = setTimeout(showGo, delay);
}

function showGo() {
  startTime = performance.now();
  state = 'go';
  setArenaState('go', 'NOW!', 'click as fast as you can');
}

function earlyClick() {
  state = 'early';
  setArenaState('early', 'TOO EARLY', 'click to try again');
}

function registerReaction() {
  const ms = Math.round(performance.now() - startTime);
  times.push(ms);

  completeSlot(round, ms);
  round++;

  const avg  = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
  const best = Math.min(...times);
  updateStatsBar({ round, total: ROUNDS, last: ms, avg, best });

  if (round < ROUNDS) {
    activateSlot(round);
    state = 'result';
    setArenaState('result', `${ms}ms`, 'click for next round');
    showResetBtn();
  } else {
    endGame();
  }
}


function endGame() {
  state = 'done';

  const { avg, best, worst, consistency } = calcStats(times);
  const percentile = getPercentile(avg);
  const verdict    = getVerdict(avg);

  const isNewBest = maybeSaveBest(avg);
  if (isNewBest) updateHeaderBest(avg);

  showResults({ avg, best, worst, consistency, percentile, verdict, times });
  showResetBtn();
}