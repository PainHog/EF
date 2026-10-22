// Real dice for playtests. Every roll is printed and appended to a log with its label.
//   node review/v0.1/dice.mjs <log file> "<label>:<number of d6>" ["<label>:<n>" ...]
// Example: node review/v0.1/dice.mjs review/v0.1/playtest-a-dice.log "R1 Dani strikes Warden:6" "R1 Surge:1"
import { appendFileSync } from "node:fs";
import { randomInt } from "node:crypto";

const [log, ...asks] = process.argv.slice(2);
if (!log || !asks.length) {
  console.error('usage: node review/v0.1/dice.mjs <log> "<label>:<n>" ...');
  process.exit(1);
}
for (const ask of asks) {
  const i = ask.lastIndexOf(":");
  const label = ask.slice(0, i).trim(), n = Number(ask.slice(i + 1));
  if (!label || !Number.isInteger(n) || n < 1 || n > 20) { console.error(`bad roll request: ${ask}`); process.exit(1); }
  const dice = Array.from({ length: n }, () => randomInt(1, 7));
  const hits = dice.filter(d => d >= 5).length, sixes = dice.filter(d => d === 6).length;
  const line = `${new Date().toISOString()}\t${label}\t${n}d6\t${dice.join(" ")}\thits=${hits} sixes=${sixes}`;
  appendFileSync(log, line + "\n");
  console.log(line);
}
