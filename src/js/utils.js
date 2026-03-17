/**
 * @param {number} ms
 * @returns {number} 1–99
 */
export function getPercentile(ms) {
  if (ms < 150) return 99;
  if (ms < 175) return 97;
  if (ms < 200) return 93;
  if (ms < 220) return 87;
  if (ms < 240) return 78;
  if (ms < 260) return 65;
  if (ms < 280) return 50;
  if (ms < 310) return 38;
  if (ms < 350) return 25;
  if (ms < 400) return 15;
  if (ms < 500) return 8;
  return 3;
}

/**
 * @param {number} ms
 * @returns {{ text: string, color: string }}
 */
export function getVerdict(ms) {
  if (ms < 180) return { text: 'SUPERHUMAN',      color: '#00ff88' };
  if (ms < 210) return { text: 'ELITE REFLEXES',  color: '#00ff88' };
  if (ms < 240) return { text: 'ABOVE AVERAGE',   color: '#ffe033' };
  if (ms < 270) return { text: 'AVERAGE',          color: '#ffe033' };
  if (ms < 320) return { text: 'BELOW AVERAGE',   color: '#ff9933' };
  return             { text: 'KEEP PRACTICING',  color: '#ff3333' };
}

/**
 * @param {number} ms
 * @returns {'fast'|'ok'|'slow'}
 */
export function getRoundClass(ms) {
  if (ms < 220) return 'fast';
  if (ms < 310) return 'ok';
  return 'slow';
}

/**
 * @param {number} ms
 * @returns {string}
 */
export function getRoundColor(ms) {
  if (ms < 220) return '#00ff88';
  if (ms < 310) return '#ffe033';
  return '#ff3333';
}

/**
 * @param {number[]} times
 * @returns {{ avg: number, best: number, worst: number, consistency: number }}
 */
export function calcStats(times) {
  const avg         = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
  const best        = Math.min(...times);
  const worst       = Math.max(...times);
  const consistency = worst - best;
  return { avg, best, worst, consistency };
}

/**
 * @param {number} val
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}