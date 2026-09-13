// update.mjs — check the live site for a new bundle and refresh the mirror.
//
// bootsandbullets.com serves one hand-rolled bundle.js (no hashed build churn).
// The cheap probe: GET bundle.js (it is small, ~1.4 MB, gzipped far less) and
// compare its sha256 + the embedded changelog version against the manifest.
// Only when it changed do we re-download the whole file tree, re-decode and
// re-cut slices.
//
// usage: node tools/update.mjs [--pull]
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const proj = path.resolve(here, "..");
const ORIGIN = "https://bootsandbullets.com";
const manifestPath = path.join(proj, ".upstream/manifest.json");

const sha = (buf) => crypto.createHash("sha256").update(buf).digest("hex");
const ua = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0" };

async function fetchBuf(url) {
  const r = await fetch(url, { headers: ua });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return Buffer.from(await r.arrayBuffer());
}
async function fetchText(url) {
  return (await fetchBuf(url)).toString("utf8");
}

async function main() {
  const pull = process.argv.includes("--pull");
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  const manifest = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
    : { sourceUrl: ORIGIN, bundles: [] };

  const bundlePath = path.join(proj, "bundle.js");
  const local = fs.existsSync(bundlePath) ? sha(fs.readFileSync(bundlePath)) : null;

  const live = await fetchText(`${ORIGIN}/bundle.js`);
  const liveSha = sha(Buffer.from(live));

  // version from the live bundle's changelog (first "version": "…")
  const ver = (live.match(/'version':\s*"([^"]+)"/) || live.match(/"version":\s*"([^"]+)"/) || [])[1] ?? "?";

  if (liveSha === local && !pull) {
    console.log(`same (bundle ${liveSha.slice(0, 12)}, version ${ver}) — nothing to do`);
    return;
  }
  console.log(local ? `DRIFT: live bundle ${liveSha.slice(0,12)} (version ${ver}) != local ${local.slice(0,12)}` : `no local bundle; live version ${ver}`);

  if (!pull) {
    console.log("re-run with --pull to download and refresh");
    return;
  }

  // Full refresh: download the served closure we know about.
  const files = ["index.html", "bundle.js", "style.css", "manifest.webmanifest",
    "hq/track.js", "press-kit/index.html", "music/theme.mp3",
    "icons/apple-touch-icon.png", "icons/favicon-32.png", "icons/icon-192.png",
    "icons/icon-512.png", "icons/icon-maskable-192.png", "icons/icon-maskable-512.png"];

  const bundles = [];
  for (const f of files) {
    const buf = await fetchBuf(`${ORIGIN}/${f}`);
    const dst = path.join(proj, f);
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.writeFileSync(dst, buf);
    bundles.push({ file: f, kind: "bundled", url: `${ORIGIN}/${f}`, sha256: sha(buf), bytes: buf.length });
    console.log("  fetched", f, `(${buf.length} bytes)`);
  }
  fs.writeFileSync(manifestPath, JSON.stringify({
    sourceUrl: ORIGIN,
    mirroredAt: new Date().toISOString(),
    version: ver,
    note: "Served closure of bootsandbullets.com (hand-rolled bundle, no hashed builds).",
    bundles,
  }, null, 2) + "\n");
  console.log(`manifest updated: ${bundles.length} artifacts, version ${ver}`);
  console.log("next: node tools/deobfuscate.mjs && node tools/split.mjs && node tools/verify.mjs");
}
main().catch((e) => { console.error(e.message); process.exit(1); });
