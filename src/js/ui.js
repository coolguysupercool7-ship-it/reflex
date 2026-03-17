import { getRoundClass, getRoundColor } from './utils.js';

export const arena      = document.getElementById('arena');
export const arenaLabel = document.getElementById('arena-label');
export const arenaSub   = document.getElementById('arena-sub');


/**
 * @param {'wait'|'ready'|'go'|'early'|'result'} stateName
 * @param {string} label
 * @param {string} sub
 */
export function setArenaState(stateName, label, sub) {
  arena.className   = `state-${stateName}`;
  arenaLabel.textContent = label;
  arenaSub.textContent   = sub;
}


/**
 * @param {number} total
 */
export function buildRoundsRow(total) {
  const row = document.getElementById('rounds-row');
  row.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const slot = document.createElement('div');
    slot.className   = 'round-slot' + (i === 0 ? ' active' : '');
    slot.id          = `slot-${i}`;
    slot.dataset.n   = i + 1;
    slot.textContent = '—';
    row.appendChild(slot);
  }
}

/**
 * @param {number} index
 * @param {number} ms
 */
export function completeSlot(index, ms) {
  const slot = document.getElementById(`slot-${index}`);
  if (!slot) return;
  slot.textContent = ms + 'ms';
  slot.classList.remove('active');
  slot.classList.add('done', getRoundClass(ms));
}

/**
 * @param {number} index
 */
export function activateSlot(index) {
  const slot = document.getElementById(`slot-${index}`);
  if (slot) slot.classList.add('active');
}


/**
 * @param {{ round: number, total: number, last: number|null, avg: number|null, best: number|null }} data
 */
export function updateStatsBar({ round, total, last, avg, best }) {
  document.getElementById('st-round').textContent = `${Math.min(round + 1, total)}/${total}`;
  document.getElementById('st-last').textContent  = last  ?? '—';
  document.getElementById('st-avg').textContent   = avg   ?? '—';
  document.getElementById('st-best').textContent  = best  ?? '—';
}


/**
 * @param {number|null} ms
 */
export function updateHeaderBest(ms) {
  document.getElementById('hdr-best').textContent = ms !== null ? ms + 'ms' : '—';
}


export function showResetBtn()  { document.getElementById('reset-btn').style.display = 'inline-block'; }
export function hideResetBtn()  { document.getElementById('reset-btn').style.display = 'none'; }

/**
 * @param {{ avg, best, worst, consistency, percentile, verdict, times }} data
 */
export function showResults({ avg, best, worst, consistency, percentile, verdict, times }) {
  document.getElementById('r-avg').textContent       = avg;
  document.getElementById('r-verdict').textContent   = verdict.text;
  document.getElementById('r-verdict').style.color   = verdict.color;
  document.getElementById('r-best').textContent      = best + 'ms';
  document.getElementById('r-worst').textContent     = worst + 'ms';
  document.getElementById('r-consistency').textContent = consistency + 'ms';
  document.getElementById('r-pct-txt').textContent   = percentile + '%';

  const maxT    = Math.max(...times, 400);
  const barsEl  = document.getElementById('r-bars');
  barsEl.innerHTML = times.map((t, i) => {
    const color = getRoundColor(t);
    return `
      <div class="bar-row">
        <div class="mini-bar-label">
          <span>Round ${i + 1}</span>
          <span style="color:${color}">${t}ms</span>
        </div>
        <div class="mini-bar-track">
          <div class="mini-bar-fill" id="mbar-${i}" style="background:${color};width:0%"></div>
        </div>
      </div>`;
  }).join('');

  document.getElementById('results-overlay').classList.add('show');

  requestAnimationFrame(() => {
    setTimeout(() => {
      times.forEach((t, i) => {
        const el = document.getElementById(`mbar-${i}`);
        if (el) el.style.width = Math.round(t / maxT * 100) + '%';
      });
      document.getElementById('r-pct-bar').style.width = percentile + '%';
    }, 60);
  });
}

export function hideResults() {
  document.getElementById('results-overlay').classList.remove('show');
}