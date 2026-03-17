const KEY_BEST = 'reflex_best';

/**
 * @returns {number|null}
 */
export function loadBest() {
  const raw = localStorage.getItem(KEY_BEST);
  if (raw === null) return null;
  const val = parseInt(raw, 10);
  return isNaN(val) ? null : val;
}

/**
 * @param {number} avg
 * @returns {boolean}
 */
export function maybeSaveBest(avg) {
  const current = loadBest();
  if (current === null || avg < current) {
    localStorage.setItem(KEY_BEST, String(avg));
    return true;
  }
  return false;
}

export function clearAll() {
  localStorage.removeItem(KEY_BEST);
}