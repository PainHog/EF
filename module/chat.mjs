/**
 * NIGHTWAKE — Chat cards.
 * Every automated step posts one card saying what happened and why, so the table
 * can check it against the book and undo it by hand if a ruling goes the other way.
 */
import { FLAG } from "./contracts.mjs";

const esc = s => foundry.utils.escapeHTML(String(s ?? ""));

/**
 * Post a card.
 * @param {string} kind     a CARD kind (contracts.mjs)
 * @param {string} title
 * @param {(string|{html: string})[]} lines  plain text is escaped; {html} is trusted markup built by the system
 * @param {{actor?: Actor, data?: object}} [o]
 */
export async function postCard(kind, title, lines = [], { actor = null, data = {} } = {}) {
  const items = lines.filter(Boolean).map(l => `<li>${typeof l === "string" ? esc(l) : l.html}</li>`).join("");
  const content = `<div class="elemental-fighters nw-card nw-${esc(kind)}"><h3>${esc(title)}</h3>${items ? `<ul>${items}</ul>` : ""}</div>`;
  return ChatMessage.create({
    content,
    speaker: actor ? ChatMessage.getSpeaker({ actor }) : ChatMessage.getSpeaker({ alias: "The Night" }),
    flags: { [FLAG]: { card: kind, ...data } }
  });
}

/** Dice as small squares: hits marked. */
export function diceHtml(faces) {
  return faces.map(f => `<span class="nw-die${f >= 5 ? " hit" : ""}${f === 6 ? " six" : ""}">${Number(f)}</span>`).join("");
}
