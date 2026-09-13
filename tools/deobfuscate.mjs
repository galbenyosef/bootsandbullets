// deobfuscate.mjs — decode the obfuscator.io string-array protection in the
// bootsandbullets bundle. Layout (typical javascript-obfuscator output):
//   function a()        — the string array (self-memoizing)
//   function b(c, d)    — the decoder: index into shifted array
//   IIFE (a, 0xa43c3)   — the rotator: shifts `a` until a checksum matches
// Once the rotator has run, every cX(0x…) call resolves to a real string.
// We run just those three pieces in a node VM (no DOM needed), then rewrite
// the prettified bundle, inlining every decoded call.
//
// usage: node tools/deobfuscate.mjs
import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const proj = path.resolve(here, "..");
const pretty = fs.readFileSync(path.join(proj, "readable/bundle.pretty.js"), "utf8");
const lines = pretty.split("\n");

// --- locate the three pieces -------------------------------------------
const findFn = (name) => {
  const i = lines.findIndex((l) => l.startsWith(`function ${name}(`));
  if (i < 0) throw new Error(`function ${name} not found`);
  // brace-match to the closing line
  let depth = 0, end = -1;
  for (let j = i; j < lines.length; j++) {
    for (const ch of lines[j]) {
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
    }
    if (depth === 0 && j > i) { end = j; break; }
  }
  return [i, end];
};
const [aS, aE] = findFn("a");
const [bS, bE] = findFn("b");
const prelude = [...lines.slice(aS, aE + 1), ...lines.slice(bS, bE + 1)].join("\n");

// --- run array + rotator in VM -----------------------------------------
const ctx = vm.createContext({ parseInt });
// find the rotator IIFE: "(function(c, d) { … }(a, 0x…));" right after `const cX = b;`
const rotMatch = pretty.match(/\(function\(c, d\) \{[\s\S]*?\}\(a, (0x[0-9a-f]+)\)\);/);
if (!rotMatch) throw new Error("rotator IIFE not found");
const rotator = rotMatch[0].replace(/;$/, "");
const ctx2 = vm.createContext({ parseInt });
vm.runInContext(prelude, ctx2, { timeout: 30000 });
vm.runInContext(rotator, ctx2, { timeout: 30000 });
const decode = (idx) => vm.runInContext(`b(${idx})`, ctx2, { timeout: 1000 });

// --- sanity ------------------------------------------------------------
const sample = decode(0x150d);
console.log("decode(0x150d) =", JSON.stringify(sample));

// --- rewrite -----------------------------------------------------------
// All aliases: `const eY = cX;` style local aliases plus cX itself. Any call
// of the form alias(0x…) where alias is bound to cX decodes statically.
const aliases = new Set(["cX", "b"]); // cX = the exported alias; b = the decoder itself
for (const l of lines) {
  // `const eY = cX;`  and  `const sT = b;`  (incl. comma-lists: `const cV = b,`)
  const m = l.matchAll(/(?:const|var|let)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:cX|b)\b/g);
  for (const a of m) aliases.add(a[1]);
}
console.log("aliases:", [...aliases].join(", "));

const aliasAlt = [...aliases].join("|");
const callRe = new RegExp(`\\b(${aliasAlt})\\((0x[0-9a-fA-F]+)\\)`, "g");

let n = 0;
const out = pretty.replace(callRe, (all, al, hex) => {
  const idx = parseInt(hex, 16);
  let s;
  try { s = decode(idx); } catch { return all; }
  if (typeof s !== "string") return all;
  n++;
  return JSON.stringify(s);
});
fs.writeFileSync(path.join(proj, "readable/bundle.deob.js"), out);
console.log(`inlined ${n} calls -> readable/bundle.deob.js (${(out.length / 1e6).toFixed(2)} MB)`);
