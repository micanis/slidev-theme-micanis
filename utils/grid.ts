// Number of columns / rows for n-columns and n-rows: an integer from 1 to 12;
// anything that is not a number falls back to 2.
export function toTrackCount(value: number | string | undefined) {
  const n = Math.floor(Number(value))
  return Number.isFinite(n) ? Math.min(12, Math.max(1, n)) : 2
}

// `gap`: a bare number is px, anything else is used as a CSS length.
export function toCssLength(value: number | string) {
  return /^\d+(\.\d+)?$/.test(String(value)) ? `${value}px` : String(value)
}
