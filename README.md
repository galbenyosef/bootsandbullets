# Boots & Bullets — offline mirror

Full mirror of **Boots & Bullets** (bootsandbullets.com): a pixel-art WW2-platoon
tactics game — squads, orders, grenades, call-ins (airstrike/smoke), enemy
flanking AI, hold-position and assassinate objectives, a campaign with
briefings, War Bonds upgrades, andWebSocket multiplayer (public/private lobbies
with join codes). Single self-contained `bundle.js`, PWA installable, includes
`press-kit/` and its own hand-written `hq/track.js` music engine.

Source: https://bootsandbullets.com/

![bootsandbullets](docs/cover.png)

## Stack

What the mirror is built with, read from the files themselves:

- **WebSocket networking** — `readable/bundle.deob.js`
- **Web Audio API** — `readable/bundle.deob.js`

Assets in the mirror: 23 images, 1 audio, 1 data files.

## What this is

The deployment lives in the repo root, mirrored byte-for-byte — page, scripts, styles and the assets the site actually serves. The site's own bundles are here too: `readable/bundle.deob.js` (2.2 MB), `bundle.js` (1.4 MB), `src/11-map-data.js` (594 KB), `src/07-ui-widgets.js` (507 KB). `readable/` carries the readable layer (3 files), 2 prettified bundles (47,960 lines); `split-spec.json` indexes 15 entries, each naming the file it came from.

## Layout

- `index.html`, `bundle.js`, `style.css`, `icons/`, `music/`, `manifest.webmanifest` — served files, byte-exact
- `hq/track.js` — the site's own hand-written music-track player (kept as-is)
- `press-kit/` — the author's press kit page
- `readable/bundle.pretty.js` — prettified view of the raw bundle (23,979 lines)
- `readable/bundle.deob.js` / `bundle.deob.pretty.js` — **deobfuscated view**: the
  obfuscator.io string-array protection (decoder `b`, rotator IIFE, `cX` aliases)
  resolved by `tools/deobfuscate.mjs`, which runs the array in a VM and inlines
  all 20,736 encoded-string calls. Every string in this view reads literally.
- `src/` — 15 readable slices cut from the deobfuscated view via `split-spec.json`:

| Slice | Contents |
|---|---|
| `00-obfuscator-runtime` | string array, decoder, rotator (still load-bearing in the mirror) |
| `01-changelog` | version history (0.3.0, 2026-09-12) |
| `02-advisor-strings` | loading quips, key labels |
| `03-audio` | AudioContext, ambience/music/sfx, oscillator effects |
| `04-value-noise` | seeded value-noise terrain generator |
| `05-unit-palettes` | per-faction sprite colour tables |
| `06-asset-loading` | boot stages, atlas decode |
| `07-ui-widgets` | DOM UI framework, modals, briefing screens |
| `08-multiplayer-net` | WebSocket client (`ii` class), dial/retry, join codes |
| `09-lobby` | room listing, leaderboard |
| `10-sprite-renderer` | terrain/decal/fog canvas layers |
| `11-map-data` | string-array data: ASCII mission maps, soldier surnames, briefing text |
| `12-soldier-model` | soldier state template, spawn factory, faction helpers |
| `13-simulation` | combat, AI, orders, objectives |
| `14-hud-loop` | loadout HUD, mission results, bootstrap |

Also present at top level: `.upstream/`, `docs/`, `icon.svg`, `README.md`.

## Run

```bash
npx http-server . -p 4308   # serves index.html
```

## Verify

```bash
node tools/update.mjs               # compare the mirror against the live origin
```

This project's own tooling: `tools/deobfuscate.mjs`, `tools/split.mjs`, `tools/verify.mjs`.

## Updating from upstream

```
node tools/update.mjs          # probe live site, report drift, pull if changed
node tools/deobfuscate.mjs     # re-decode (after any bundle refresh)
node tools/split.mjs           # re-cut src/ from the spec
node tools/verify.mjs          # byte-exact check
```

This site is a single hand-rolled bundle (no build-hash churn) and the author
versions releases in the changelog — the update tool compares the bundle hash
plus the `changelog` version string, so a no-change probe is one HEAD-ish
request.

![bootsandbullets](docs/cover.png)

## Multiplayer note

The live game dials `ws(s)://<host>/ws`. Offline, that lands on the static
server and fails gracefully (the netcode has its own retry cap). The campaign
is fully playable offline.

## Mirror conventions

- **Capture layer** — the files under the deployment directory are byte-exact copies of what the origin served; nothing in them is edited.
- **Readable layer** — derived, on top of the capture: prettified bundles and reconstructed modules. Vendor libraries ship whole and are listed in `dependencies.json`; they are never split.
- **Provenance** — `split-spec.json` maps every readable file back to the bundle (and byte range) it came from; `.upstream/manifest.json` records sha256 for each mirrored artifact.
- **Drift** — `tools/update.mjs` is a read-only probe: it reports what changed upstream and never rewrites the capture. Refreshing regenerates the readable layer on top of a newly pulled build.
- **Standalone** — the tooling engine is vendored in `tools/engine/`, so this repo works from a fresh clone with no sibling checkout.
