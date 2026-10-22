/**
 * The balance targets (docs/DESIGN.md decision log, from DESIGN-RULES A19–A24).
 * The report marks every measure "ok" or "off" against these.
 */
export const TARGETS = {
  win: { easy: [0.85, 0.95], standard: [0.70, 0.80], hard: [0.52, 0.62] },
  loss: { easy: [0.0, 0.05], standard: [0.08, 0.18], hard: [0.20, 0.35] },
  partial: null,
  crit: [0.15, 0.25],
  fail: [0.08, 0.15],
  awakened: [0.85, 1.0],
  chiHalfSpenders: [0.5, 1.0],
  endedByDawn: [0.10, 0.60],
  longNights: [0.10, 0.60],
  sizeSpread: 0.05,
  optionSpread: 0.03,
  rounds: { clash: [2, 3], anchor: [3, 5], heart: [4, 7] },
};
