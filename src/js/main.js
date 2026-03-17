import { init, handleInput } from './game.js';
import { hideResults, setArenaState } from './ui.js';

init();

document.getElementById('arena').addEventListener('click', handleInput);

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    handleInput();
  }
});

document.getElementById('reset-btn').addEventListener('click', init);

document.getElementById('btn-play-again').addEventListener('click', (e) => {
  e.stopPropagation();
  init();
});

document.getElementById('btn-review').addEventListener('click', (e) => {
  e.stopPropagation();
  hideResults();
  setArenaState('result', 'DONE', 'click to play again');
});