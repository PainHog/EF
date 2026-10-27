// Nightwake book art (docs/DESIGN.md D32, D35): a city at night, the five
// elements as colour + shape, the grey Unmade. People appear only as small
// silhouettes built from one figure kit (one head, two arms ending in fists,
// two legs ending in feet), so counts are right by construction; fighters are
// otherwise shown by emblems, never faces.
//   node book/tools/art-gen/scenes/build.mjs            (writes every piece)
// Audit tables for every piece: book/art/AUDIT.md.
import { C, svg, n, rng, shadow, line } from "./lib.mjs";

const EL = ["wood", "fire", "earth", "metal", "water"];
const ELC = { wood: C.wood, fire: C.fire, earth: C.earth, metal: C.metal, water: C.water };

/* ------------------------------------------------------------ glyphs -- */
// One flat icon per element (a symbol, not an object in a scene).
// Wood: a tall leaf. Fire: a triangle flame. Earth: a square with a mountain.
// Metal: a ring with a blade-edge glint. Water: three waves.
export function glyph(el, cx, cy, r, fill = C.light, ink = C.ink, sw = Math.max(2, r / 16)) {
  const p = (x, y) => `${n(cx + x * r)} ${n(cy + y * r)}`;
  if (el === "wood") {
    const leaf = `M${p(0, -1)} C${p(0.62, -0.55)} ${p(0.58, 0.45)} ${p(0, 0.78)} C${p(-0.58, 0.45)} ${p(-0.62, -0.55)} ${p(0, -1)}Z`;
    let veins = `M${p(0, -0.78)} L${p(0, 1)}`;
    for (const t of [-0.4, -0.05, 0.3]) veins += ` M${p(0, t)} L${p(0.3, t - 0.24)} M${p(0, t)} L${p(-0.3, t - 0.24)}`;
    return `<path d="${leaf}" fill="${fill}" stroke="${ink}" stroke-width="${n(sw)}" stroke-linejoin="round"/>` + line(veins, sw * 0.7, ink);
  }
  if (el === "fire") {
    // a flame: one tall central tongue and a smaller tongue on each side
    const outer = `M${p(0, -1)} C${p(0.16, -0.66)} ${p(0.34, -0.52)} ${p(0.36, -0.22)} C${p(0.46, -0.36)} ${p(0.52, -0.5)} ${p(0.5, -0.66)} C${p(0.8, -0.32)} ${p(0.86, 0.2)} ${p(0.66, 0.6)} C${p(0.5, 0.9)} ${p(0.24, 0.98)} ${p(0, 0.98)} C${p(-0.24, 0.98)} ${p(-0.5, 0.9)} ${p(-0.66, 0.6)} C${p(-0.86, 0.2)} ${p(-0.78, -0.24)} ${p(-0.5, -0.5)} C${p(-0.5, -0.3)} ${p(-0.42, -0.2)} ${p(-0.34, -0.14)} C${p(-0.36, -0.46)} ${p(-0.18, -0.68)} ${p(0, -1)}Z`;
    const inner = `M${p(0, -0.2)} C${p(0.2, 0.06)} ${p(0.36, 0.3)} ${p(0.3, 0.56)} C${p(0.24, 0.8)} ${p(0.1, 0.84)} ${p(0, 0.84)} C${p(-0.1, 0.84)} ${p(-0.28, 0.8)} ${p(-0.32, 0.56)} C${p(-0.36, 0.3)} ${p(-0.18, 0.06)} ${p(0, -0.2)}Z`;
    return `<path d="${outer}" fill="${fill}" stroke="${ink}" stroke-width="${n(sw)}" stroke-linejoin="round"/><path d="${inner}" fill="none" stroke="${ink}" stroke-width="${n(sw * 0.7)}" stroke-linejoin="round"/>`;
  }
  if (el === "earth") {
    // a square block of earth in layers
    const a = 0.8;
    let s = `<rect x="${n(cx - a * r)}" y="${n(cy - a * r)}" width="${n(2 * a * r)}" height="${n(2 * a * r)}" rx="${n(r * 0.1)}" fill="${fill}" stroke="${ink}" stroke-width="${n(sw)}"/>`;
    s += line(`M${p(-a, -0.28)} Q${p(-0.3, -0.42)} ${p(0, -0.3)} T${p(a, -0.3)} M${p(-a, 0.14)} L${p(a, 0.14)} M${p(-a, 0.5)} L${p(a, 0.5)}`, sw * 0.85, ink);
    for (const [x, y] of [[-0.42, 0.32], [0.1, 0.33], [0.5, 0.31], [-0.15, -0.06], [0.42, -0.08]]) s += `<circle cx="${n(cx + x * r)}" cy="${n(cy + y * r)}" r="${n(r * 0.06)}" fill="${ink}"/>`;
    return s;
  }
  if (el === "metal") {
    // a ring, with a bright edge along its upper left
    let s = `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r * 0.9)}" fill="${fill}" stroke="${ink}" stroke-width="${n(sw)}"/>`;
    s += `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r * 0.42)}" fill="none" stroke="${ink}" stroke-width="${n(sw * 0.9)}"/>`;
    s += line(`M${p(-0.66, 0.08)} A${n(r * 0.66)} ${n(r * 0.66)} 0 0 1 ${p(-0.08, -0.66)}`, sw * 0.8, ink);
    return s;
  }
  // water: three waves, strokes scaled to the glyph
  let s = "";
  for (const t of [-0.5, 0, 0.5]) {
    const d = `M${p(-0.9, t)} C${p(-0.6, t - 0.32)} ${p(-0.3, t - 0.32)} ${p(0, t)} S${p(0.6, t + 0.32)} ${p(0.9, t)}`;
    s += line(d, Math.max(sw * 1.6, r * 0.22), ink) + line(d, Math.max(sw * 0.7, r * 0.11), fill);
  }
  return s;
}

/** A round emblem: navy disc, brass ring, element-coloured field, light glyph. */
function badge(el, cx, cy, R, inner = null) {
  let s = `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(R)}" fill="${C.deep}" stroke="${C.ink}" stroke-width="${n(R * 0.03)}"/>`;
  s += `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(R * 0.9)}" fill="none" stroke="${C.accent}" stroke-width="${n(R * 0.045)}"/>`;
  s += `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(R * 0.78)}" fill="${ELC[el]}" stroke="${C.ink}" stroke-width="${n(R * 0.025)}"/>`;
  s += inner ?? glyph(el, cx, cy, R * 0.46, C.light, C.ink, R * 0.035);
  return s;
}

/* ------------------------------------------------------------ figure -- */
// Local coordinates: feet on y = 0, up is negative, facing +x. Height about 102.
const POSES = {
  stand:  { lk: [-6, -24], lf: [-8, 0], rk: [6, -24], rf: [8, 0], le: [-15, -60], lh: [-16, -44], re: [15, -60], rh: [16, -44], lean: 0, head: [0, -92] },
  guard:  { lk: [-11, -24], lf: [-16, 0], rk: [13, -25], rf: [17, 0], le: [4, -62], lh: [12, -78], re: [22, -68], rh: [26, -84], lean: 3, head: [3, -92] },
  strike: { lk: [-12, -22], lf: [-22, 0], rk: [19, -24], rf: [24, 0], le: [-2, -62], lh: [8, -74], re: [30, -77], rh: [46, -78], lean: 6, head: [7, -91] },
  raise:  { lk: [-9, -24], lf: [-13, 0], rk: [9, -24], rf: [13, 0], le: [-18, -92], lh: [-22, -110], re: [18, -92], rh: [22, -110], lean: 0, head: [0, -93] },
  walk:   { lk: [3, -24], lf: [9, 0], rk: [-5, -23], rf: [-10, 0], le: [-6, -60], lh: [-4, -44], re: [8, -60], rh: [11, -45], lean: 2, head: [2, -92] },
  lookup: { lk: [-5, -24], lf: [-7, 0], rk: [5, -24], rf: [7, 0], le: [-14, -60], lh: [-15, -44], re: [14, -60], rh: [15, -44], lean: -3, head: [-4, -92] },
};

/** A silhouette: fill + outline. `still` = a grey Still (dashed light edge). */
export function figure({ x, y, s = 1, flip = false, pose = "stand", fill = C.dark, glow = null, still = false }) {
  const P = POSES[pose];
  const f = ([lx, ly]) => [x + (flip ? -lx : lx) * s, y + ly * s];
  const L = P.lean;
  const sh = [[-10 + L, -79], [10 + L, -79]], hp = [[-7, -46], [7, -46]];
  const limb = (a, b, c, w) => `M${n(f(a)[0])} ${n(f(a)[1])} L${n(f(b)[0])} ${n(f(b)[1])} L${n(f(c)[0])} ${n(f(c)[1])}`;
  const legW = 8.5 * s, armW = 6.6 * s;
  const col = still ? C.unmade : fill;
  const edge = still ? C.unmadeDeep : C.ink;
  let out = "";
  if (glow) out += `<ellipse cx="${n(f([L / 2, -50])[0])}" cy="${n(f([0, -50])[1])}" rx="${n(34 * s)}" ry="${n(62 * s)}" fill="${glow}" opacity=".32"/>`;
  out += shadow(x, y + 1, 18 * s, 3.2 * s, 0.22);
  // legs (behind torso), with feet pointing forward
  const legs = limb(hp[0], P.lk, P.lf) + limb(hp[1], P.rk, P.rf);
  const feet = `M${n(f(P.lf)[0])} ${n(f(P.lf)[1])} l${n((flip ? -7 : 7) * s)} 0 M${n(f(P.rf)[0])} ${n(f(P.rf)[1])} l${n((flip ? -7 : 7) * s)} 0`;
  const arms = limb(sh[0], P.le, P.lh) + limb(sh[1], P.re, P.rh);
  const torso = [sh[0], sh[1], [hp[1][0] + 1, hp[1][1]], [hp[0][0] - 1, hp[0][1]]].map(f);
  const outline = (d, w) => line(d, w + 3 * s, edge) + line(d, w, col);
  out += outline(legs, legW) + outline(feet, 5 * s);
  out += `<path d="M${torso.map(p => `${n(p[0])} ${n(p[1])}`).join(" L")}Z" fill="${col}" stroke="${edge}" stroke-width="${n(1.5 * s)}" stroke-linejoin="round"/>`;
  out += outline(arms, armW);
  for (const h of [P.lh, P.rh]) out += `<circle cx="${n(f(h)[0])}" cy="${n(f(h)[1])}" r="${n(4.4 * s)}" fill="${col}" stroke="${edge}" stroke-width="${n(1.5 * s)}"/>`;
  const hd = f(P.head);
  out += `<path d="M${n(f([P.head[0] - 3, -83])[0])} ${n(f([0, -83])[1])} L${n(f([P.head[0] + 3, -83])[0])} ${n(f([0, -83])[1])}" stroke="${col}" stroke-width="${n(6 * s)}"/>`; // neck
  out += `<circle cx="${n(hd[0])}" cy="${n(hd[1])}" r="${n(8.6 * s)}" fill="${col}" stroke="${edge}" stroke-width="${n(1.5 * s)}"/>`;
  if (still) out += `<path d="M${torso.map(p => `${n(p[0])} ${n(p[1])}`).join(" L")}Z" fill="none" stroke="${C.light}" stroke-width="${n(1.1 * s)}" stroke-dasharray="${n(3 * s)} ${n(3 * s)}" opacity=".7"/>`;
  return out;
}

/* ------------------------------------------------------------- city --- */
/** Buildings standing on baseline y; windows printed on their faces. */
function skyline(seed, x0, x1, y, { hMin = 50, hMax = 160, fill = C.dark, win = C.accentB, winP = 0.35, edge = C.ink, wMin = 34, wMax = 80 } = {}) {
  const R = rng(seed);
  let s = "", x = x0;
  while (x < x1) {
    const w = wMin + R() * (wMax - wMin), h = hMin + R() * (hMax - hMin);
    const bx = x, bw = Math.min(w, x1 - x);
    s += `<rect x="${n(bx)}" y="${n(y - h)}" width="${n(bw)}" height="${n(h)}" fill="${fill}" stroke="${edge}" stroke-width="1.6"/>`;
    if (R() < 0.35 && bw > 40) { // a setback storey sitting fully on the roof
      const sw2 = bw * 0.5, sh2 = 14 + R() * 22;
      s += `<rect x="${n(bx + bw * 0.25)}" y="${n(y - h - sh2)}" width="${n(sw2)}" height="${n(sh2)}" fill="${fill}" stroke="${edge}" stroke-width="1.6"/>`;
    }
    for (let wy = y - h + 9; wy < y - 10; wy += 12) for (let wx = bx + 6; wx < bx + bw - 9; wx += 10) {
      if (R() < winP) s += `<rect x="${n(wx)}" y="${n(wy)}" width="4.4" height="6" fill="${win}" opacity=".85"/>`;
    }
    x += bw;
  }
  return s;
}

/** A clock face, hands at 23:58; ticks only (no numerals). */
function clockFace(cx, cy, r, { face = C.light, ink = C.ink, dark = false } = {}) {
  let s = `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${dark ? C.deep : face}" stroke="${ink}" stroke-width="${n(Math.max(1.5, r / 14))}"/>`;
  let d = "";
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * Math.PI * 2, r0 = r * (i % 3 ? 0.8 : 0.7);
    d += `M${n(cx + Math.sin(a) * r0)} ${n(cy - Math.cos(a) * r0)} L${n(cx + Math.sin(a) * r * 0.9)} ${n(cy - Math.cos(a) * r * 0.9)}`;
  }
  s += line(d, Math.max(1, r / 18), dark ? C.unmade : ink);
  const hh = (11 + 58 / 60) / 12 * Math.PI * 2, mm = 58 / 60 * Math.PI * 2;
  s += line(`M${n(cx)} ${n(cy)} L${n(cx + Math.sin(hh) * r * 0.5)} ${n(cy - Math.cos(hh) * r * 0.5)}`, Math.max(1.6, r / 9), dark ? C.unmade : ink);
  s += line(`M${n(cx)} ${n(cy)} L${n(cx + Math.sin(mm) * r * 0.78)} ${n(cy - Math.cos(mm) * r * 0.78)}`, Math.max(1.2, r / 13), dark ? C.unmade : ink);
  s += `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(Math.max(1.4, r / 12))}" fill="${dark ? C.unmade : ink}"/>`;
  return s;
}

/** The Heart: a great grey wheel with nothing on it. */
function heartWheel(cx, cy, r, { op = 1 } = {}) {
  let s = `<g opacity="${op}">`;
  for (const k of [1, 0.74, 0.46]) s += `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r * k)}" fill="none" stroke="${C.unmade}" stroke-width="${n(r * 0.05)}"/>`;
  let d = "";
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * Math.PI * 2 + 0.13;
    d += `M${n(cx + Math.cos(a) * r * 0.2)} ${n(cy + Math.sin(a) * r * 0.2)} L${n(cx + Math.cos(a) * r)} ${n(cy + Math.sin(a) * r)}`;
  }
  s += line(d, r * 0.025, C.unmade);
  s += `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r * 0.2)}" fill="${C.deep}" stroke="${C.unmade}" stroke-width="${n(r * 0.04)}"/>`;
  return s + "</g>";
}

/** A clock tower standing on baseline y. */
function clockTower(cx, y, h, w, { heart = false, fill = C.soft, edge = C.accent } = {}) {
  const top = y - h;
  let s = `<rect x="${n(cx - w / 2)}" y="${n(top + w * 0.6)}" width="${n(w)}" height="${n(h - w * 0.6)}" fill="${fill}" stroke="${edge}" stroke-width="2.4"/>`;
  // belfry and roof sit on the shaft
  s += `<rect x="${n(cx - w * 0.6)}" y="${n(top + w * 0.35)}" width="${n(w * 1.2)}" height="${n(w * 0.3)}" fill="${fill}" stroke="${edge}" stroke-width="2.4"/>`;
  s += `<path d="M${n(cx - w * 0.62)} ${n(top + w * 0.35)} L${n(cx)} ${n(top - w * 0.55)} L${n(cx + w * 0.62)} ${n(top + w * 0.35)} Z" fill="${C.dark}" stroke="${edge}" stroke-width="2.4" stroke-linejoin="round"/>`;
  const fr = w * 0.36, fy = top + w * 1.2;
  if (heart) { s += `<circle cx="${n(cx)}" cy="${n(fy)}" r="${n(fr)}" fill="${C.deep}" stroke="${C.ink}" stroke-width="2"/>` + heartWheel(cx, fy, fr * 0.9); }
  else s += clockFace(cx, fy, fr);
  for (let k = 0; k < 3; k++) s += `<rect x="${n(cx - w * 0.12)}" y="${n(fy + fr * 1.6 + k * w * 0.55)}" width="${n(w * 0.24)}" height="${n(w * 0.34)}" rx="${n(w * 0.1)}" fill="${C.accentB}" opacity=".6"/>`;
  return s;
}

function stars(seed, x0, y0, x1, y1, count, col = C.accentB) {
  const R = rng(seed); let d = "";
  for (let i = 0; i < count; i++) d += `M${n(x0 + R() * (x1 - x0))} ${n(y0 + R() * (y1 - y0))}h0.01`;
  return `<path d="${d}" stroke="${col}" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>`;
}

const nightSky = (id, w, h, top = C.deep, bottom = C.night) =>
  `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#${id})"/>`;

/** A rounded night panel for vignettes on light pages. Returns [open, close]. */
function panel(id, w, h) {
  return [`<defs><clipPath id="${id}-clip"><rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="18"/></clipPath></defs><g clip-path="url(#${id}-clip)">` + nightSky(id + "-sky", w, h),
    `</g><rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="18" fill="none" stroke="${C.ink}" stroke-width="3"/><rect x="10" y="10" width="${w - 20}" height="${h - 20}" rx="14" fill="none" stroke="${C.accent}" stroke-width="1.4" opacity=".7"/>`];
}

/** A flat roof (or pavement) slab: top surface at y. */
const slab = (x0, x1, y, h = 40, fill = C.soft) => `<rect x="${n(x0)}" y="${n(y)}" width="${n(x1 - x0)}" height="${n(h)}" fill="${fill}" stroke="${C.ink}" stroke-width="2"/>`;

/* ------------------------------------------------------------ pieces --- */
export function el_wood() { return svg("0 0 400 400", "Wood emblem: a tall leaf", badge("wood", 200, 200, 188)); }
export function el_fire() { return svg("0 0 400 400", "Fire emblem: a flame", badge("fire", 200, 200, 188)); }
export function el_earth() { return svg("0 0 400 400", "Earth emblem: a square with a mountain", badge("earth", 200, 200, 188)); }
export function el_metal() { return svg("0 0 400 400", "Metal emblem: a ring with an edge", badge("metal", 200, 200, 188)); }
export function el_water() { return svg("0 0 400 400", "Water emblem: three waves", badge("water", 200, 200, 188)); }

/* Fighter emblems: the element badge with a flat icon of the fighter's ordinary life,
   and the element's glyph printed small on the ring. */
function emblem(el, title, icon) {
  let s = badge(el, 200, 200, 188, icon);
  s += `<circle cx="200" cy="352" r="30" fill="${C.deep}" stroke="${C.accent}" stroke-width="4"/>` + glyph(el, 200, 352, 17, ELC[el], C.light, 2.4);
  return svg("0 0 400 400", title, s);
}
export function pc_dani() { // a bicycle wheel
  let s = `<circle cx="200" cy="190" r="92" fill="none" stroke="${C.ink}" stroke-width="16"/><circle cx="200" cy="190" r="92" fill="none" stroke="${C.light}" stroke-width="9"/>`;
  let d = ""; for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; d += `M200 190 L${n(200 + Math.cos(a) * 86)} ${n(190 + Math.sin(a) * 86)}`; }
  s += line(d, 3, C.light) + `<circle cx="200" cy="190" r="14" fill="${C.light}" stroke="${C.ink}" stroke-width="4"/>`;
  return emblem("wood", "Dani Okafor: a bicycle wheel", s);
}
export function pc_marcus() { // an open-ended spanner
  let g = `<rect x="-118" y="-15" width="160" height="30" rx="15" fill="${C.light}" stroke="${C.ink}" stroke-width="6"/>`;
  g += `<circle cx="66" cy="0" r="40" fill="${C.light}" stroke="${C.ink}" stroke-width="6"/>`;
  g += `<path d="M110 -15 L84 -15 L84 15 L110 15" fill="${C.fire}" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>`; // the jaw
  g += `<rect x="96" y="-12" width="20" height="24" fill="${C.fire}"/>`;
  g += `<rect x="-96" y="-4" width="96" height="8" rx="4" fill="${C.edge}"/>`;
  return emblem("fire", "Marcus Bell: a spanner", `<g transform="translate(200 196) rotate(-45)">${g}</g>`);
}
export function pc_jun() { // a boxing glove: fist, thumb along the side, cuff
  const body = `M152 252 L150 168 C150 122 188 100 228 102 C270 104 290 136 288 176 L284 252 Z`;
  const thumb = `M154 238 C130 228 124 196 140 180 C152 168 170 172 178 186 C186 202 178 222 166 238 Z`;
  let s = `<path d="${body}" fill="${C.light}" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>`;
  s += line("M160 150 C196 138 250 138 286 154", 5, C.ink);
  s += `<path d="${thumb}" fill="${C.light}" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>`;
  s += `<rect x="152" y="252" width="132" height="44" rx="6" fill="${C.light}" stroke="${C.ink}" stroke-width="6"/>`;
  s += line("M170 274 L266 274", 4, C.ink);
  return emblem("earth", "Jun Park: a boxing glove", s);
}
export function pc_priya() { // trauma shears
  let s = `<path d="M196 110 L222 200 L206 206 Z" fill="${C.light}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>`;
  s += `<path d="M228 104 L214 200 L198 196 Z" fill="${C.light}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>`;
  s += `<ellipse cx="180" cy="246" rx="30" ry="40" fill="none" stroke="${C.ink}" stroke-width="15" transform="rotate(20 180 246)"/><ellipse cx="180" cy="246" rx="30" ry="40" fill="none" stroke="${C.light}" stroke-width="8" transform="rotate(20 180 246)"/>`;
  s += `<ellipse cx="246" cy="246" rx="30" ry="40" fill="none" stroke="${C.ink}" stroke-width="15" transform="rotate(-20 246 246)"/><ellipse cx="246" cy="246" rx="30" ry="40" fill="none" stroke="${C.light}" stroke-width="8" transform="rotate(-20 246 246)"/>`;
  s += line("M206 206 L188 212 M214 200 L236 210", 9, C.ink) + line("M206 206 L188 212 M214 200 L236 210", 4, C.light);
  s += `<circle cx="210" cy="200" r="8" fill="${C.light}" stroke="${C.ink}" stroke-width="4"/>`;
  return emblem("metal", "Priya Raman: trauma shears", s);
}
export function pc_sam() { // a belt tied in a knot
  let s = `<path d="M110 176 Q200 150 290 176 L290 206 Q200 180 110 206 Z" fill="${C.light}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>`;
  s += `<path d="M186 196 L150 292 L178 296 L204 206 Z" fill="${C.light}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>`;
  s += `<path d="M214 196 L250 292 L222 296 L196 206 Z" fill="${C.light}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>`;
  s += `<rect x="176" y="160" width="48" height="56" rx="10" fill="${C.light}" stroke="${C.ink}" stroke-width="5"/>`;
  return emblem("water", "Sam Whitlock: a judo belt, tied", s);
}

/** Five fighters on a rooftop, with the five emblems painted on the parapet. */
export function ch_fighters() {
  const W = 900, H = 300, [o, c] = panel("chf", W, H);
  let s = o + stars(3, 20, 15, 880, 140, 60) + skyline(11, 10, 890, 236, { hMin: 40, hMax: 120, fill: C.soft, winP: 0.25 });
  s += slab(0, 900, 236, 70, C.dark); // the roof
  const poses = ["guard", "stand", "raise", "stand", "guard"];
  EL.forEach((el, i) => {
    const x = 150 + i * 150;
    s += figure({ x, y: 236, s: 1.25, pose: poses[i], flip: i > 2, fill: C.deep, glow: ELC[el] });
    s += `<circle cx="${x}" cy="266" r="20" fill="${ELC[el]}" stroke="${C.ink}" stroke-width="2"/>` + glyph(el, x, 266, 12, C.light, C.ink, 1.8);
  });
  return svg(`0 0 ${W} ${H}`, "Five fighters on a rooftop at night, each with an element emblem painted on the parapet", s + c);
}

/** The feeding cycle as a ring of emblems (Part One). */
export function part_awaken() {
  const W = 900, H = 300; let s = "";
  const pos = EL.map((_, i) => [130 + i * 160, 150]);
  // arrows Wood→Fire→Earth→Metal→Water, and the return arc Water→Wood beneath
  for (let i = 0; i < 4; i++) {
    const [x0, y0] = pos[i], [x1] = pos[i + 1];
    s += line(`M${x0 + 58} ${y0} L${x1 - 64} ${y0}`, 4, C.accent) + `<path d="M${x1 - 62} ${y0} l-14 -8 l0 16 Z" fill="${C.accent}"/>`;
  }
  s += line(`M${pos[4][0]} 212 C${pos[4][0]} 290 ${pos[0][0]} 290 ${pos[0][0]} 214`, 4, C.accent) + `<path d="M${pos[0][0]} 212 l-8 14 l16 0 Z" fill="${C.accent}"/>`;
  EL.forEach((el, i) => { s += badge(el, pos[i][0], pos[i][1], 54); });
  return svg(`0 0 ${W} ${H}`, "The feeding cycle: Wood, Fire, Earth, Metal, Water and back to Wood", s);
}

/** The Unmade over a grey city (Part Two). */
export function part_unmade() {
  const W = 900, H = 300; let s = "";
  s += heartWheel(450, 120, 110, { op: 0.9 });
  s += skyline(21, 40, 860, 280, { hMin: 40, hMax: 130, fill: C.unmadeDeep, win: C.unmade, winP: 0.2, edge: C.deep });
  s += line("M40 280 L860 280", 2.6, C.unmade);
  return svg(`0 0 ${W} ${H}`, "The Heart of the Unmade, a grey wheel, turning over a grey city", s);
}

/** The city at 23:58: skyline, a stopped street clock, a stopped bus. */
export function ch_city() {
  const W = 900, H = 300, [o, c] = panel("chc", W, H);
  let s = o + stars(5, 20, 15, 880, 120, 70);
  s += `<circle cx="760" cy="62" r="26" fill="${C.accentB}" stroke="${C.ink}" stroke-width="2"/>`;
  s += skyline(7, 10, 890, 240, { hMin: 50, hMax: 170, fill: C.dark });
  s += slab(0, 900, 240, 70, C.soft);
  // street clock: post on the pavement, face on the post
  s += shadow(250, 241, 16, 3) + `<rect x="244" y="150" width="12" height="90" fill="${C.deep}" stroke="${C.ink}" stroke-width="2"/>` + clockFace(250, 132, 22);
  // the bus, on its four wheels (two visible)
  s += shadow(560, 241, 120, 4) + `<rect x="450" y="168" width="220" height="62" rx="10" fill="${C.alarmB}" stroke="${C.ink}" stroke-width="2.4"/>`;
  for (let k = 0; k < 6; k++) s += `<rect x="${464 + k * 34}" y="180" width="26" height="22" rx="3" fill="${C.accentB}" stroke="${C.ink}" stroke-width="1.6"/>`;
  s += `<circle cx="492" cy="230" r="11" fill="${C.deep}" stroke="${C.ink}" stroke-width="2"/><circle cx="630" cy="230" r="11" fill="${C.deep}" stroke="${C.ink}" stroke-width="2"/>`;
  return svg(`0 0 ${W} ${H}`, "The city at two minutes to midnight: a stopped street clock and a stopped night bus", s + c);
}

/** A fighter strikes a Still. */
export function ch_fights() {
  const W = 900, H = 300, [o, c] = panel("chs", W, H);
  let s = o + skyline(31, 10, 890, 246, { hMin: 40, hMax: 110, fill: C.soft, winP: 0.2 }) + slab(0, 900, 246, 60, C.dark);
  const fx = 380, sx = 470;
  s += figure({ x: sx, y: 246, s: 1.55, pose: "walk", flip: true, still: true });
  s += figure({ x: fx, y: 246, s: 1.55, pose: "strike", fill: C.deep, glow: C.fire });
  // impact burst where the fist meets the Still's chest
  const ix = fx + 46 * 1.55, iy = 246 - 78 * 1.55;
  let d = ""; for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2, r = i % 2 ? 9 : 22; d += (i ? "L" : "M") + n(ix + 4 + Math.cos(a) * r) + " " + n(iy + Math.sin(a) * r); }
  s += `<path d="${d}Z" fill="${C.accentB}" stroke="${C.ink}" stroke-width="2" opacity=".9"/>`;
  s += line(`M${fx - 40} ${iy - 6} L${fx + 10} ${iy - 6} M${fx - 30} ${iy + 6} L${fx + 14} ${iy + 6}`, 3, C.accentB, ` opacity=".7"`);
  return svg(`0 0 ${W} ${H}`, "A fighter's punch lands on a grey Still", s + c);
}

/** Awakening: a figure, arms raised, in a column of five-coloured light. */
export function ch_awakening() {
  const W = 900, H = 300, [o, c] = panel("cha", W, H);
  let s = o + stars(9, 20, 15, 880, 160, 50) + slab(0, 900, 250, 60, C.dark);
  EL.forEach((el, i) => { s += `<ellipse cx="450" cy="${238 - i * 40}" rx="${70 - i * 6}" ry="14" fill="none" stroke="${ELC[el]}" stroke-width="5" opacity=".9"/>`; });
  s += figure({ x: 450, y: 250, s: 1.5, pose: "raise", fill: C.deep, glow: C.accentB });
  return svg(`0 0 ${W} ${H}`, "A fighter Awakens, arms raised, in rings of light in the five element colours", s + c);
}

/** Midnight to dawn: the sky lightens left to right; four Hours and the Heart's hour. */
export function ch_night() {
  const W = 900, H = 300;
  let s = `<defs><clipPath id="chn-clip"><rect x="4" y="4" width="892" height="292" rx="18"/></clipPath><linearGradient id="chn-sky" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.deep}"/><stop offset=".65" stop-color="${C.night}"/><stop offset="1" stop-color="${C.dawn}"/></linearGradient></defs><g clip-path="url(#chn-clip)"><rect width="900" height="300" fill="url(#chn-sky)"/>`;
  s += stars(12, 20, 80, 520, 160, 35);
  s += skyline(13, 10, 890, 236, { hMin: 40, hMax: 140, fill: C.dark }) + slab(0, 900, 236, 70, C.soft);
  // a timeline strip across the top of the frame (a diagram band, not objects in the sky)
  s += `<rect x="4" y="4" width="892" height="62" fill="${C.deep}" opacity=".85"/>` + line("M4 66 L896 66", 2.4, C.accent);
  for (let i = 0; i < 5; i++) {
    const x = 140 + i * 150;
    if (i < 4) s += line(`M${x + 24} 35 L${x + 126} 35`, 2.4, C.accentB, ` stroke-dasharray="4 6"`);
    s += i < 4 ? clockFace(x, 35, 20) : `<circle cx="${x}" cy="35" r="20" fill="${C.deep}" stroke="${C.ink}" stroke-width="2.4"/>` + heartWheel(x, 35, 18);
  }
  s += `</g><rect x="4" y="4" width="892" height="292" rx="18" fill="none" stroke="${C.ink}" stroke-width="3"/>`;
  return svg(`0 0 ${W} ${H}`, "From midnight to dawn: four Hours of the Hunt and the Heart, with the sun rising at the right", s);
}

/** The Unmade: the Heart over a line of Stills. */
export function ch_unmade() {
  const W = 900, H = 300, [o, c] = panel("chu", W, H);
  let s = o + heartWheel(450, 104, 84) + slab(0, 900, 250, 60, C.unmadeDeep);
  for (let i = 0; i < 7; i++) s += figure({ x: 160 + i * 96, y: 250, s: 0.95, pose: i % 2 ? "walk" : "stand", flip: i > 3, still: true });
  return svg(`0 0 ${W} ${H}`, "The Heart of the Unmade turning above a line of grey Stills", s + c);
}

/** The Storyteller's table from above: sheets, dice, pencils, tokens. */
export function ch_storyteller() {
  const W = 900, H = 300; let s = "";
  s += `<rect x="6" y="6" width="888" height="288" rx="18" fill="${C.earth}" stroke="${C.ink}" stroke-width="3"/>`; // the table top
  s += `<rect x="16" y="16" width="868" height="268" rx="12" fill="none" stroke="${C.accentDeep}" stroke-width="1.4" opacity=".6"/>`;
  const sheet = (x, y, w, h, rot) => {
    let t = `<g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C.light}" stroke="${C.ink}" stroke-width="2"/>`;
    t += `<rect x="${x + 10}" y="${y + 10}" width="${w - 20}" height="14" fill="${C.dark}"/>`;
    for (let k = 0; k < 6; k++) t += line(`M${x + 12} ${y + 40 + k * 16} L${x + w - 12} ${y + 40 + k * 16}`, 1.4, C.edge);
    return t + "</g>";
  };
  s += sheet(60, 40, 150, 200, -6) + sheet(250, 50, 150, 200, 3) + sheet(640, 40, 170, 210, 5);
  const die = (x, y, v, col) => {
    let t = `<rect x="${x}" y="${y}" width="40" height="40" rx="7" fill="${col}" stroke="${C.ink}" stroke-width="2.4"/>`;
    const P = { 1: [[20, 20]], 2: [[11, 11], [29, 29]], 3: [[10, 10], [20, 20], [30, 30]], 4: [[11, 11], [29, 11], [11, 29], [29, 29]], 5: [[10, 10], [30, 10], [20, 20], [10, 30], [30, 30]], 6: [[11, 9], [29, 9], [11, 20], [29, 20], [11, 31], [29, 31]] }[v];
    for (const [a, b] of P) t += `<circle cx="${x + a}" cy="${y + b}" r="3.6" fill="${col === C.light ? C.ink : C.light}"/>`;
    return t;
  };
  [[440, 70, 6], [492, 96, 5], [452, 130, 2], [512, 150, 6], [560, 86, 3]].forEach(([x, y, v]) => { s += die(x, y, v, C.light); });
  s += die(470, 196, 5, C.alarmB) + die(530, 210, 1, C.alarmB);
  // pencils lying flat on the table
  const pencil = (x, y, len, rot) => `<g transform="rotate(${rot} ${x} ${y})"><rect x="${x}" y="${y - 6}" width="${len}" height="12" fill="${C.accent}" stroke="${C.ink}" stroke-width="2"/><path d="M${x + len} ${y - 6} L${x + len + 18} ${y} L${x + len} ${y + 6} Z" fill="${C.paper2}" stroke="${C.ink}" stroke-width="2" stroke-linejoin="round"/><path d="M${x + len + 12} ${y - 2} L${x + len + 18} ${y} L${x + len + 12} ${y + 2} Z" fill="${C.ink}"/></g>`;
  s += pencil(100, 266, 130, -3) + pencil(600, 268, 120, 2);
  for (let k = 0; k < 5; k++) s += `<circle cx="${430 + k * 26}" cy="262" r="10" fill="${C.accentB}" stroke="${C.ink}" stroke-width="2"/>`;
  return svg(`0 0 ${W} ${H}`, "A table seen from above: fighter sheets, dice, pencils and Chi tokens", s);
}

/** The clock tower, the Heart in its face, a frozen crowd looking up. */
export function ch_clocktower() {
  const W = 900, H = 300, [o, c] = panel("cht", W, H);
  let s = o + stars(15, 20, 15, 880, 120, 60) + skyline(17, 10, 890, 252, { hMin: 40, hMax: 110, fill: C.soft, winP: 0.15 });
  s += clockTower(450, 252, 230, 64, { heart: true }) + slab(0, 900, 252, 60, C.dark);
  [180, 236, 300, 600, 664, 720].forEach((x, i) => { s += figure({ x, y: 252, s: 0.9, pose: "lookup", flip: x > 450, still: true }); });
  return svg(`0 0 ${W} ${H}`, "The clock tower with the Heart turning in its face; frozen grey people in the square look up", s + c);
}

/** Ch 10: the lighthouse on the point with the Heart in its lamp, a wave stopped mid-break, the pier on its posts. */
export function ch_lighthouse() {
  const W = 900, H = 300, [o, c] = panel("chl", W, H);
  const sea = 236;
  let s = o + stars(19, 20, 15, 880, 130, 60) + `<circle cx="150" cy="60" r="22" fill="${C.accentB}" stroke="${C.ink}" stroke-width="2"/>`;
  // the sea, flat and still, filling the bottom of the frame
  s += `<rect x="0" y="${sea}" width="${W}" height="${H - sea}" fill="${C.water}" stroke="${C.ink}" stroke-width="2"/>`;
  // the pier: a deck resting on posts that stand in the water and run down out of frame
  // (it runs in from the left edge of the frame, so its landward end is cropped)
  s += `<rect x="-10" y="196" width="330" height="12" fill="${C.unmadeDeep}" stroke="${C.ink}" stroke-width="2"/>`;
  for (let x = 34; x <= 306; x += 34) s += `<rect x="${x - 4}" y="208" width="8" height="${H - 208}" fill="${C.unmadeDeep}" stroke="${C.ink}" stroke-width="1.6"/>`;
  let rail = "M-10 182 L320 182"; for (let x = 20; x <= 320; x += 25) rail += `M${x} 182 L${x} 196`;
  s += line(rail, 2, C.ink);
  // a wave stopped mid-break: it rises from the sea surface, its crest curled over, spray hanging above
  s += `<path d="M380 ${sea} L380 196 Q400 150 450 146 Q500 144 520 168 Q506 160 492 166 Q482 176 500 190 L520 ${sea} Z" fill="${C.water}" stroke="${C.ink}" stroke-width="2.4" stroke-linejoin="round"/>`;
  s += `<path d="M392 186 Q430 160 470 158" fill="none" stroke="${C.light}" stroke-width="2.4" opacity=".6"/>`;
  for (const [x, y, r] of [[440, 132, 4], [468, 124, 3], [496, 134, 4], [520, 150, 3]]) s += `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.light}" stroke="${C.ink}" stroke-width="1.4"/>`;
  // the headland: rock rising out of the sea on the right
  s += `<path d="M600 ${sea} L640 200 L700 186 L900 182 L900 ${sea} Z" fill="${C.dark}" stroke="${C.ink}" stroke-width="2.4" stroke-linejoin="round"/>`;
  // the lighthouse stands on the headland: tapered tower, gallery on the tower, lantern on the gallery, cap on the lantern
  const lx = 780, base = 184;
  s += shadow(lx, base + 1, 30, 3);
  s += `<path d="M${lx - 26} ${base} L${lx - 16} 82 L${lx + 16} 82 L${lx + 26} ${base} Z" fill="${C.light}" stroke="${C.ink}" stroke-width="2.4" stroke-linejoin="round"/>`;
  // red bands painted on the tower, each inside its tapering outline
  const half = y => 16 + (y - 82) / (base - 82) * 10;
  for (const y of [104, 134, 162]) s += `<path d="M${n(lx - half(y))} ${y} L${n(lx + half(y))} ${y} L${n(lx + half(y + 10))} ${y + 10} L${n(lx - half(y + 10))} ${y + 10} Z" fill="${C.alarm}" opacity=".8"/>`;
  s += `<rect x="${lx - 26}" y="74" width="52" height="8" fill="${C.dark}" stroke="${C.ink}" stroke-width="2"/>`;
  s += `<rect x="${lx - 17}" y="42" width="34" height="32" fill="${C.deep}" stroke="${C.ink}" stroke-width="2"/>` + heartWheel(lx, 58, 14);
  s += `<path d="M${lx - 20} 42 L${lx} 26 L${lx + 20} 42 Z" fill="${C.dark}" stroke="${C.ink}" stroke-width="2" stroke-linejoin="round"/>`;
  return svg(`0 0 ${W} ${H}`, "The lighthouse on the point with the Heart turning in its lamp, a wave stopped mid-break and the pier on its posts", s + c);
}

/** A map of the night: river, roads, five Anchors and the Heart; symbols only. */
export function ch_map() {
  const W = 900, H = 300; let s = "";
  s += `<rect x="6" y="6" width="888" height="288" rx="18" fill="${C.paper2}" stroke="${C.ink}" stroke-width="3"/>`;
  s += line("M6 220 C200 190 300 260 460 220 S760 160 894 190", 26, C.water, ` opacity=".55"`); // the river
  let d = ""; for (let x = 80; x < 880; x += 110) d += `M${x} 12 L${x + 30} 288`; for (let y = 60; y < 290; y += 70) d += `M12 ${y} L888 ${y - 20}`;
  s += line(d, 3, C.edge);
  s += `<ellipse cx="190" cy="100" rx="90" ry="50" fill="${C.wood}" opacity=".35" stroke="${C.ink}" stroke-width="1.6"/>`; // the park
  s += line("M450 150 m-120 0 a120 70 0 1 0 240 0 a120 70 0 1 0 -240 0", 6, C.accentDeep, ` stroke-dasharray="10 8" opacity=".6"`); // the ring road
  const spots = { wood: [190, 98], fire: [700, 92], earth: [330, 150], metal: [560, 214], water: [800, 210] };
  for (const el of EL) s += badge(el, spots[el][0], spots[el][1], 26);
  s += `<circle cx="450" cy="120" r="30" fill="${C.deep}" stroke="${C.ink}" stroke-width="2.4"/>` + heartWheel(450, 120, 26);
  return svg(`0 0 ${W} ${H}`, "A city map with the five Anchors marked by their element emblems and the Heart at the centre", s);
}

/** Cover: the city at night, the clock tower with the Heart, five fighters on a roof. */
export function cover_night() {
  const W = 612, H = 792;
  let s = nightSky("cov-sky", W, H) + stars(1, 0, 230, 612, 520, 90);
  s += `<circle cx="470" cy="300" r="34" fill="${C.accentB}" stroke="${C.ink}" stroke-width="2" opacity=".95"/>`;
  s += skyline(2, -10, 622, 640, { hMin: 120, hMax: 260, fill: C.dark, wMin: 40, wMax: 90, winP: 0.28 });
  s += clockTower(306, 640, 330, 86, { heart: true });
  s += slab(0, 612, 640, 152, C.soft) + `<rect x="0" y="640" width="612" height="12" fill="${C.dark}" stroke="${C.ink}" stroke-width="2"/>`;
  EL.forEach((el, i) => { s += figure({ x: 106 + i * 100, y: 712, s: 0.95, pose: ["guard", "stand", "raise", "stand", "guard"][i], flip: i > 2, fill: C.deep, glow: ELC[el] }); });
  return svg(`0 0 ${W} ${H}`, "Nightwake: five fighters on a rooftop facing the clock tower, the Heart turning in its face", s);
}

/** Back cover panel: the Heart in the clock face, dawn coming up behind the city. */
export function back_heart() {
  const W = 800, H = 600;
  let s = `<defs><linearGradient id="bk-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.deep}"/><stop offset=".7" stop-color="${C.night}"/><stop offset="1" stop-color="${C.dawn}"/></linearGradient><clipPath id="bk-clip"><rect x="4" y="4" width="792" height="592" rx="22"/></clipPath></defs><g clip-path="url(#bk-clip)"><rect width="800" height="600" fill="url(#bk-sky)"/>`;
  s += stars(4, 10, 10, 790, 300, 80);
  s += `<circle cx="400" cy="230" r="150" fill="${C.deep}" stroke="${C.ink}" stroke-width="4"/>` + heartWheel(400, 230, 136);
  s += skyline(8, -10, 810, 560, { hMin: 60, hMax: 180, fill: C.dark }) + slab(0, 800, 560, 50, C.soft);
  s += `</g><rect x="4" y="4" width="792" height="592" rx="22" fill="none" stroke="${C.accent}" stroke-width="4"/>`;
  return svg(`0 0 ${W} ${H}`, "The Heart, a grey wheel, filling the sky over the city as dawn begins", s);
}

/* ------------------------------------------------------------- spots --- */
function spotPanel(id, title, body, { ground = 470 } = {}) {
  const W = 800, H = 600, [o, c] = panel(id, W, H);
  return svg(`0 0 ${W} ${H}`, title, o + stars(id.length * 7, 20, 20, 780, 260, 40) + body + c);
}
export function spot_greenhouse() {
  let s = skyline(41, 10, 790, 470, { hMin: 40, hMax: 120, fill: C.soft, winP: 0.15 }) + slab(0, 800, 470, 140, C.dark);
  s += `<path d="M200 470 L200 330 Q400 170 600 330 L600 470 Z" fill="${C.unmade}" fill-opacity=".35" stroke="${C.ink}" stroke-width="4"/>`;
  s += line("M250 470 L250 300 M320 470 L320 250 M400 470 L400 238 M480 470 L480 250 M550 470 L550 300 M200 400 L600 400", 3, C.ink, ` opacity=".7"`);
  return spotPanel("spg", "The Old Greenhouse, grey and still", s + badge("wood", 400, 540, 40));
}
export function spot_bridge() {
  let s = `<rect x="0" y="420" width="800" height="200" fill="${C.water}" opacity=".6"/>`;
  s += `<rect x="60" y="300" width="680" height="26" fill="${C.unmadeDeep}" stroke="${C.ink}" stroke-width="3"/>`;
  for (let k = 0; k < 4; k++) s += `<rect x="${110 + k * 190}" y="326" width="30" height="130" fill="${C.unmadeDeep}" stroke="${C.ink}" stroke-width="3"/>`;
  let d = ""; for (let x = 80; x < 720; x += 40) d += `M${x} 300 L${x + 20} 250 L${x + 40} 300`; s += line(d + "M80 250 L740 250", 4, C.ink);
  return spotPanel("spb", "The Iron Bridge over the river", s + badge("metal", 400, 530, 40));
}
export function spot_reservoir() {
  let s = skyline(47, 10, 790, 470, { hMin: 40, hMax: 110, fill: C.soft, winP: 0.1 }) + slab(0, 800, 470, 140, C.dark);
  // Basin: embankment walls on the slab, a flat strip of water between them.
  s += `<path d="M60 470 L110 400 L690 400 L740 470 Z" fill="${C.unmadeDeep}" stroke="${C.ink}" stroke-width="4"/>`;
  s += `<path d="M130 408 L670 408 L700 452 L100 452 Z" fill="${C.water}" stroke="${C.ink}" stroke-width="3"/>`;
  // The standing sheet: rises from the water surface, crest frozen mid-curl.
  s += `<path d="M280 430 L280 200 Q320 160 360 190 Q400 220 440 180 Q480 150 520 190 L520 430 Z" fill="${C.water}" stroke="${C.ink}" stroke-width="4"/>`;
  for (const y of [240, 290, 340, 390]) s += `<path d="M296 ${y} Q340 ${y - 12} 384 ${y} T472 ${y} T504 ${y - 4}" fill="none" stroke="${C.light}" stroke-width="3" opacity=".45"/>`;
  // Spray frozen in the air above the crest (the Unmade's stillness, Ch 1).
  for (const [x, y, r] of [[310, 170, 6], [350, 150, 5], [395, 175, 7], [440, 150, 5], [480, 135, 6], [505, 165, 4]]) s += `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.water}" stroke="${C.ink}" stroke-width="2"/>`;
  return spotPanel("spr", "The Reservoir, its water standing up in a sheet", s + badge("water", 400, 540, 40));
}
export function spot_substation() {
  let s = skyline(43, 10, 790, 470, { hMin: 40, hMax: 100, fill: C.soft, winP: 0.1 }) + slab(0, 800, 470, 140, C.dark);
  s += `<rect x="260" y="290" width="280" height="180" fill="${C.dark}" stroke="${C.ink}" stroke-width="4"/>`;
  for (const x of [300, 400, 500]) s += `<rect x="${x - 14}" y="210" width="28" height="80" fill="${C.unmadeDeep}" stroke="${C.ink}" stroke-width="3"/>`;
  s += glyph("fire", 400, 380, 50, C.unmade, C.ink, 4);
  return spotPanel("sps", "The Substation, humming without a sound", s + badge("fire", 400, 540, 40));
}
export function spot_underpass() {
  let s = slab(0, 800, 470, 140, C.dark) + `<rect x="0" y="230" width="800" height="70" fill="${C.soft}" stroke="${C.ink}" stroke-width="4"/>`;
  s += `<path d="M260 470 L260 340 Q400 250 540 340 L540 470 Z" fill="${C.deep}" stroke="${C.ink}" stroke-width="4"/>`;
  s += `<path d="M0 300 L260 300 L260 470 L0 470 Z M540 300 L800 300 L800 470 L540 470 Z" fill="${C.unmadeDeep}" stroke="${C.ink}" stroke-width="3"/>`;
  return spotPanel("spu", "The Underpass beneath the ring road", s + badge("earth", 400, 540, 40));
}
export function spot_stills() {
  let s = slab(0, 800, 470, 140, C.dark);
  [250, 400, 550].forEach((x, i) => { s += figure({ x, y: 470, s: 1.9, pose: i === 1 ? "stand" : "walk", flip: i === 2, still: true }); });
  return spotPanel("spt", "Three grey Stills walking", s);
}
export function spot_dice() {
  const W = 800, H = 600;
  let s = `<rect x="6" y="6" width="788" height="588" rx="22" fill="${C.earth}" stroke="${C.ink}" stroke-width="4"/>`;
  const die = (x, y, v, col) => {
    let t = `<rect x="${x}" y="${y}" width="130" height="130" rx="20" fill="${col}" stroke="${C.ink}" stroke-width="5"/>`;
    const P = { 5: [[30, 30], [100, 30], [65, 65], [30, 100], [100, 100]], 6: [[34, 28], [96, 28], [34, 65], [96, 65], [34, 102], [96, 102]] }[v];
    for (const [a, b] of P) t += `<circle cx="${x + a}" cy="${y + b}" r="11" fill="${col === C.light ? C.ink : C.light}"/>`;
    return t;
  };
  s += die(220, 230, 6, C.light) + die(450, 240, 5, C.alarmB);
  return svg(`0 0 ${W} ${H}`, "Two dice on a table: a six and a five, two hits", s);
}

/* -------------------------------------------- the online version's art --- */
// Round token images and the system background for the Foundry system
// (written to assets/ by tools/build-assets.mjs; not book pieces, so the
// names don't match the book's PIECE pattern).

/** A round token frame: dark disc, brass ring, optional coloured inner ring. */
function tokenFrame(ring, body) {
  return `<circle cx="200" cy="200" r="196" fill="${C.deep}" stroke="${C.ink}" stroke-width="6"/>`
    + `<circle cx="200" cy="200" r="182" fill="none" stroke="${C.accent}" stroke-width="8"/>`
    + (ring ? `<circle cx="200" cy="200" r="168" fill="none" stroke="${ring}" stroke-width="10"/>` : "")
    + `<defs><clipPath id="tk-clip"><circle cx="200" cy="200" r="162"/></clipPath></defs><g clip-path="url(#tk-clip)">${body}</g>`;
}

/** A Still: a grey figure peeled from the city. */
export function tokenStill() {
  const body = `<rect x="0" y="300" width="400" height="100" fill="${C.soft}"/>` + figure({ x: 200, y: 318, s: 2.45, pose: "walk", still: true });
  return svg("0 0 400 400", "Token: a Still, a grey figure with a dashed outline", tokenFrame(C.unmade, body));
}

/** A Warden: a hulking grey figure ringed in its Shell's colour, the Shell's glyph on its chest. */
export function tokenWarden(shell) {
  let body = `<rect x="0" y="318" width="400" height="90" fill="${C.soft}"/>` + figure({ x: 200, y: 336, s: 2.75, pose: "guard", still: true });
  body += `<circle cx="200" cy="214" r="34" fill="${ELC[shell]}" stroke="${C.ink}" stroke-width="4"/>` + glyph(shell, 200, 214, 20, C.light, C.ink, 2.6);
  return svg("0 0 400 400", `Token: a Warden with a ${shell} Shell`, tokenFrame(ELC[shell], body));
}

/** The Heart: the grey wheel. */
export function tokenHeart() {
  return svg("0 0 400 400", "Token: the Heart, a grey wheel with nothing on it", tokenFrame(C.unmade, heartWheel(200, 200, 150)));
}

/** The system's background: the clock tower with the Heart in its face, the city asleep around it. */
export function systemBackground() {
  const W = 1920, H = 1080;
  let s = nightSky("bg-sky", W, H) + stars(31, 0, 0, W, 620, 260);
  s += `<circle cx="1540" cy="240" r="70" fill="${C.accentB}" stroke="${C.ink}" stroke-width="3" opacity=".95"/>`;
  s += skyline(32, -20, W + 20, 900, { hMin: 160, hMax: 420, fill: C.dark, wMin: 60, wMax: 150, winP: 0.25 });
  s += clockTower(960, 900, 620, 150, { heart: true });
  s += slab(0, W, 900, 180, C.soft) + `<rect x="0" y="900" width="${W}" height="16" fill="${C.dark}" stroke="${C.ink}" stroke-width="2"/>`;
  EL.forEach((el, i) => { s += figure({ x: 660 + i * 150, y: 1010, s: 1.5, pose: ["guard", "stand", "raise", "stand", "guard"][i], flip: i > 2, fill: C.deep, glow: ELC[el] }); });
  return svg(`0 0 ${W} ${H}`, "Nightwake: five fighters facing the clock tower, the Heart turning in its face", s);
}
