// HUD state & main loop
// Loadout HUD binding, mission timer/results, `T5` summary builder, end-of-mission screens and the final bootstrap lines.
            }
        }
    return A;
}

function T5(c) {
    let {
        layer: d
    } = c;
    return d();
}
var cW = f["audio"]["ambience"],
    e5 = {
        'jungle': {
            'windCutoff': 0x190,
            'windTrim': 0x1,
            'whistle': !0x1,
            'insects': "crickets",
            'insectsFloor': 0x0,
            'birds': "jungle",
            'birdRate': 0x1,
            'birdFloor': 0x0
        },
        'desert': {
            'windCutoff': 0x2bc,
            'windTrim': 0.9,
            'whistle': !0x1,
            'insects': "cicadas",
            'insectsFloor': 0.35,
            'birds': "desert",
            'birdRate': 0.4,
            'birdFloor': 0.3
        },
        'arctic': {
            'windCutoff': 0x12c,
            'windTrim': 1.3,
            'whistle': !0x0,
            'insects': "none",
            'insectsFloor': 0x0,
            'birds': "arctic",
            'birdRate': 0.25,
            'birdFloor': 0.2
        }
    },
    k1 = null,
    ke = null,
    we = e5["jungle"],
    bT = null,
    Xe = {
        'water': 0x0,
        'wind': 0x0,
        'rustle': 0x0,
        'insects': 0x0,
        'birds': 0x0,
        'gust': 0x0,
        'scared': !0x1
    },
    Nn = 0x0,
    Dn = 0x0,
    jr = !0x1,
    W5 = c => c < 0x0 ? 0x0 : c > 0x1 ? 0x1 : c,
    Q6 = (c, d, g) => c + (d - c) * g,
    t5 = () => {
        const LC = cX;
        if (!bT) return;
        let c = bT["ctx"]["currentTime"];
        bT["bus"]["gain"]["setTargetAtTime"](document["hidden"] ? 0x0 : cW["level"], c, document["hidden"] ? 0.05 : 0.3);
    };

function Je(c) {
    const LD = cX;
    Dn && (window["clearTimeout"](Dn), Dn = 0x0), n5(), k1 = c, ke = no(c), we = e5[c["theme"]], Xe = {
        'water': 0x0,
        'wind': 0x0,
        'rustle': 0x0,
        'insects': 0x0,
        'birds': 0x0,
        'gust': 0x0,
        'scared': !0x1
    }, Nn = 0x0, jr || (document["addEventListener"]("visibilitychange", t5), jr = !0x0);
}

function Ze() {
    const LE = cX;
    if (k1 = null, ke = null, jr && (document["removeEventListener"]("visibilitychange", t5), jr = !0x1), !bT) return;
    let c = bT["ctx"]["currentTime"];
    bT["bus"]["gain"]["cancelScheduledValues"](c), bT["bus"]["gain"]["setValueAtTime"](bT["bus"]["gain"]["value"], c), bT["bus"]["gain"]["linearRampToValueAtTime"](0x0, c + 0.5), Dn = window["setTimeout"](() => {
        Dn = 0x0, n5();
    }, 0x2bc);
}

function n5() {
    const LF = cX;
    if (bT) {
        for (let c of bT["sources"]) try {
            c["stop"]();
        } catch {}
        for (let d of bT["oscillators"]) try {
            d["stop"]();
        } catch {}
        bT["bus"]["disconnect"](), bT = null;
    }
}

function o5() {
    const LG = cX;
    return k1 ? {
        ...Xe,
        'running': bT !== null,
        'theme': k1["theme"],
        'ctxState': bT?.["ctx"]["state"] ?? null
    } : null;
}

function T_(g, j) {
    const LH = cX;
    let l = g["createGain"]();
    l["gain"]["value"] = document["hidden"] ? 0x0 : cW["level"], l["connect"](j);
    let q = [],
        s = [],
        y = Math["floor"](g["sampleRate"] * 0x4),
        A = g["createBuffer"](0x1, y, g["sampleRate"]),
        C = A["getChannelData"](0x0);
    for (let M = 0x0; M < y; M++) C[M] = Math["random"]() * 0x2 - 0x1;
    let E = {
            'ctx': g,
            'voice': we,
            'oscillators': s,
            'bed': () => {
                const LI = LH;
                let N = g[LI(0x10e5)]();
                return N[LI(0xcdf)] = A, N[LI(0x101f)] = !0x0, N[LI(0x151e)](g[LI(0x1604)], Math[LI(0xeed)]() * 0x4), q[LI(0xc0f)](N), N;
            },
            'lfo': (N, P, Q) => {
                const LJ = LH;
                let R = g[LJ(0x778)]();
                R[LJ(0x1133)][LJ(0x35e)] = N;
                let S = g[LJ(0x12dc)]();
                S[LJ(0x9d3)][LJ(0x35e)] = P, R[LJ(0x536)](S)[LJ(0x536)](Q), R[LJ(0x151e)](), s[LJ(0xc0f)](R);
            },
            'layer': () => {
                const LK = LH;
                let N = g[LK(0x12dc)]();
                return N[LK(0x9d3)][LK(0x35e)] = 0x0, N[LK(0x536)](l), N;
            }
        },
        F = X3(E),
        H = J3(E),
        I = Z3(E),
        K = Q3(E),
        L = T5(E);
    return {
        'ctx': g,
        'bus': l,
        'water': F,
        'wind': H,
        'rustle': I,
        'insects': K,
        'birds': L,
        'sources': q,
        'oscillators': s
    };
}

function W_(d) {
    const LL = cX;
    let g = d["ctx"],
        j = g["currentTime"] + 0.02,
        m = g["createStereoPanner"]();
    m["pan"]["value"] = Math["random"]() * 1.6 - 0.8, m["connect"](d["birds"]);
    let p = (A, C, E, F, H, I = "triangle") => {
        const LM = LL;
        let K = g[LM(0x778)]();
        K[LM(0xb42)] = I, K[LM(0x1133)][LM(0x7a6)](C, A), K[LM(0x1133)][LM(0x1404)](E, A + F);
        let L = g[LM(0x12dc)]();
        L[LM(0x9d3)][LM(0x7a6)](0x0, A), L[LM(0x9d3)][LM(0x11fd)](H, A + 0.005), L[LM(0x9d3)][LM(0x1404)](0.0005, A + F), K[LM(0x536)](L)[LM(0x536)](m), K[LM(0x151e)](A), K[LM(0x16a7)](A + F + 0.02);
    };
    if (we["birds"] === "arctic") {
        p(j, 0x4b0, 0x28a, 0.5, 0.05, "sawtooth");
        return;
    }
    if (we["birds"] === "desert" || Math["random"]() < 0.2) {
        p(j, 0x384, 0x578, 0.2, 0.07);
        return;
    }
    let q = 0x708 + Math["random"]() * 0x708,
        u = Math["random"]() < 0.5,
        v = 0x2 + Math["floor"](Math["random"]() * 0x4),
        y = j;
    for (let A = 0x0; A < v; A++) {
        let C = q * (0x1 + (Math["random"]() - 0.5) * 0.1),
            E = 1.25 + Math["random"]() * 0.15;
        p(y, C, u ? C * E : C / E, 0.04 + Math["random"]() * 0.04, 0.08), y += 0.07 + Math["random"]() * 0.07;
    }
}

function Qe(j, q, A, C) {
    const LN = cX;
    if (!k1 || !ke || (Nn += A, Nn < cW["tick"])) return;
    let F = Nn;
    if (Nn = 0x0, !bT) {
        let aj = Ot(),
            ak = Nt();
        if (!aj || !ak) return;
        bT = T_(aj, ak);
    }
    let H = f["wind"],
        I = j['x'] + j["viewW"] / 0x2,
        K = j['y'] + j["viewH"] / 0x2,
        L = performance["now"]() / 0x3e8,
        N = (aq, aw) => wW(ke["wetSdf"], ke["width"], ke["height"], k1["tile"], aq, aw),
        P = Math["min"](N(I, K), N(j['x'] + j["viewW"] * 0.25, K), N(j['x'] + j["viewW"] * 0.75, K), N(I, j['y'] + j["viewH"] * 0.25), N(I, j['y'] + j["viewH"] * 0.75)),
        Q = W5(0x1 - P / cW["waterRange"]),
        R = wW(ke["foliageSdf"], ke["width"], ke["height"], k1["tile"], I, K),
        S = W5(0x1 - R / cW["foliageRange"]),
        U = 0.65 + 0.35 * Math["sin"]((I + K) * H["gustScale"] + q * H["gustSpeed"]),
        V = L - zn() < cW["scareTime"],
        X = we["insects"] === "none" ? 0x0 : Math["max"](S, we["insectsFloor"]),
        Y = L - zn() < 0x2 ? 0.4 : 0x1;
    Xe = {
        'water': C ? cW["water"] * Q * Q : 0x0,
        'wind': C ? cW["wind"] * we["windTrim"] * U * U : 0x0,
        'rustle': C ? cW["rustle"] * S * Math["pow"](Math["max"](0x0, U - 0.5), 0x3) * 0x8 : 0x0,
        'insects': C ? cW["insects"] * X * Y : 0x0,
        'birds': C && !V ? cW["birds"] : 0x0,
        'gust': U,
        'scared': V
    };
    let a7 = bT["ctx"]["currentTime"],
        a8 = C ? cW["ramp"] : 0.4;
    bT["water"]["gain"]["setTargetAtTime"](Xe["water"], a7, a8), bT["insects"]["gain"]["setTargetAtTime"](Xe["insects"], a7, a8), bT["wind"]["gain"]["setTargetAtTime"](Xe["wind"], a7, C ? 0.2 : 0.4), bT["rustle"]["gain"]["setTargetAtTime"](Xe["rustle"], a7, C ? 0.2 : 0.4), bT["birds"]["gain"]["setTargetAtTime"](Xe["birds"], a7, V || !C ? 0.15 : cW["birdRecover"]);
    let a9 = Math["max"](S, we["birdFloor"]);
    if (C && !V && G()["sound"] && a9 >= 0.1) {
        let aq = Q6(cW["birdMaxGap"], cW["birdMinGap"], a9);
        Math["random"]() < F / aq * we["birdRate"] && W_(bT);
    }
}
var e_ = "loading",
    t_ = "#f0d878",
    n_ = "#4a4326",
    _W = null,
    O2 = 0x0;

function i5() {
    const LO = cX;
    if (_W && _W["isConnected"]) return _W;
    _W = document["createElement"]("div"), _W['id'] = e_;
    let c = document["createElement"]("canvas");
    return c["width"] = 0x7c, c["height"] = 0x7c, c["style"]["width"] = "62px", c["style"]["height"] = "62px", _W["appendChild"](c), _W["appendChild"](Object["assign"](document["createElement"]('p'), {
        'className': "loading-word"
    })), document["body"]["appendChild"](_W), _W;
}

function r5() {
    const LP = cX;
    let c = i5()["querySelector"]("canvas");
    if (!c) return;
    let d = c["getContext"]('2d');
    if (!d) return;
    d["imageSmoothingEnabled"] = !0x1, d["clearRect"](0x0, 0x0, c["width"], c["height"]);
    let g = c["width"] / 0x2,
        j = c["height"] / 0x2;
    for (let m = 0x0; m < 0x8; m++) {
        let p = m / 0x8 * Math['PI'] * 0x2 - Math['PI'] / 0x2,
            q = Math["round"](g + Math["cos"](p) * 0x1a * 0x2),
            u = Math["round"](j + Math["sin"](p) * 0x1a * 0x2),
            v = m === O2 % 0x8;
        d["fillStyle"] = v ? t_ : n_;
        let y = (v ? 0x6 : 0x5) * 0x2;
        d["fillRect"](Math["round"](q - y / 0x2), Math["round"](u - y / 0x2), y, y);
    }
}

function s5() {
    const LQ = cX;
    O2 = 0x0;
    let c = i5();
    c["hidden"] = !0x1, r5(), l5('');
}

function a5(c) {
    const LR = cX;
    !_W || _W["hidden"] || (O2++, r5(), l5(c));
}

function l5(c) {
    const LS = cX;
    let d = _W?.["querySelector"](".loading-word");
    d && (d["textContent"] = c["toUpperCase"]());
}

function c5() {
    const LU = cX;
    _W && (_W["hidden"] = !0x0);
}
var N2 = () => new Promise(c => {
    requestAnimationFrame(() => requestAnimationFrame(() => c()));
});

function T1(c) {
    return new Promise(d => {
        let g = () => {
            const LV = b;
            let i = c();
            if (i !== null) {
                d(i);
                return;
            }
            window["requestAnimationFrame"](g);
        };
        g();
    });
}
async function Et(c, d, g) {
    const LX = cX;
    s5(), await N2(), await c["prepareStaged"](d, BW(d, g), async i => {
        a5(i), await N2();
    }), c5();
}

function Mt(c, d, g) {
    const LY = cX;
    Go("Paused", c, [{
        'label': d,
        'tone': "good",
        'key': "Enter P",
        'primary': !0x0,
        'onPick': () => {}
    }, g, {
        'label': "Settings",
        'onPick': () => Vo()
    }], !0x0);
}
var d5 = "arena-forest";
async function u5(d) {
    const LZ = cX;
    let {
        camera: g,
        renderer: j,
        input: m,
        hud: p,
        layout: q
    } = d["shell"], u = null;
    nt();
    let v = Te(aT[d5], d5);
    j["prepare"](v, BW(v, "veteran")), m["mode"] = "spectator", document["body"]["dataset"]["mode"] = "spectator", q["apply"](), u = new St(v, g, m, () => j["clearDecals"]());
    let y = u;
    d["set"]({
        'name': "arena",
        'world': y["world"],
        'step': F => {
            const M1 = LZ;
            y[M1(0x15ea)](F), G()[M1(0x1529)] && p[M1(0xc9e)](y[M1(0xfa6)](), G()[M1(0x830)]);
        },
        'draw': (F, H) => {
            const M5 = LZ;
            j[M5(0x9df)](y[M5(0xce4)], g, F, H), Qe(g, j[M5(0x4ed)], H, !0x0);
        }
    }), Je(v);
    let A = () => {
            const M6 = LZ;
            u && (G()[M6(0x1529)] ? p[M6(0xc9e)](u[M6(0xfa6)](), G()[M6(0x830)]) : p[M6(0x6d1)]());
        },
        C = F => {
            const M7 = LZ;
            F[M7(0x9f3)] === 'c' || F[M7(0x9f3)] === 'C' ? (mW({
                'arenaLockCamera': !G()[M7(0x830)]
            }), G()[M7(0x830)] || g[M7(0x1526)](), A()) : (F[M7(0x9f3)] === 'h' || F[M7(0x9f3)] === 'H') && (mW({
                'arenaShowScore': !G()[M7(0x1529)]
            }), A());
        };
    window["addEventListener"]("keydown", C), A();
    let E = () => {
        const M8 = LZ;
        u && (u[M8(0xf2e)] = !0x0);
    };
    m["onPause"] = E, MW(0x1), He(f["banner"]["fade"]), await T1(() => u?.["exitRequested"] ? (u = null, d["set"](null), m["mode"] = "play", delete document["body"]["dataset"]["mode"], q["apply"](), m["onPause"] = null, window["removeEventListener"]("keydown", C), Ze(), p["hideArena"](), !0x0) : null);
}
var m5 = {
        'weapon': "basicRifle",
        'throwable': "frag",
        'grenades': 0x2
    },
    o_ = ["ABLE", "BAKER", "CHARLIE", "DOG", "EASY", "FOX"],
    i_ = ["ROT", "GELB", "BLAU", "GRAU", "BRAUN", "GRUN"],
    p5 = (c, d) => c["slice"](0x0, d)["map"](g => ({
        'name': g,
        'missions': 0x0,
        'own': !0x1,
        'fresh': !0x0
    }));

function Ir(g, j = f["skirmish"]["seconds"], m = m5, p = m5, q = [], u = 0x0, v = f["skirmish"]["squad"], y = 0x0) {
    const M9 = cX;
    let A = Number["isInteger"](v) && v > 0x0 ? v : f["skirmish"]["squad"],
        C = Math["max"](0x1, Math["min"](A, g["playerSpawns"]["length"], g["playerSpawnsB"]["length"])),
        E = BW(g, "rookie", p5(o_, C), {
            'weapon': m["weapon"],
            'grenades': m["grenades"],
            'throwable': m["throwable"]
        }, u),
        F = p5(i_, C);
    for (let H = 0x0; H < C; H++) E["soldiers"]["push"](_1(E, g["playerSpawnsB"][H], p["weapon"], F[H], D["Enemy"]));
    x1(E), E["fog"] = new ze(g, y), E["playerSides"] = [D["Player"], D["Enemy"]], E["fog"]["refresh"](g, E["soldiers"], D["Player"]), E["seatColours"] = q;
    for (let I of E["soldiers"]) I["owner"] = I["faction"] === D["Player"] ? 0x0 : 0x1;
    return E["autoEngage"] = !0x1, E["sideB"] = {
        'field': null,
        'orderGoal': null,
        'orderMarker': 0x0,
        'squadTarget': null,
        'targetBuilding': null,
        'repathTimer': 0x0,
        'lastTargetPos': null,
        'grenadesHeld': p["grenades"],
        'grenadeCooldown': 0x0,
        'squadWeapon': p["weapon"],
        'squadThrowable': p["throwable"],
        'autoEngage': !0x1
    }, E["skirmish"] = {
        'endsAt': j,
        'over': !0x1,
        'winner': null,
        'reason': null
    }, E;
}
var f5 = (c, d) => c["soldiers"]["filter"](g => g["alive"] && g["faction"] === d);

function h5(c) {
    const Mj = cX;
    let d = c["skirmish"];
    if (!d || d["over"]) return;
    let g = Fi(c),
        i = g["filter"](j => j > 0x0)["length"];
    if (i <= 0x1) {
        d["over"] = !0x0, d["reason"] = "elimination", d["winner"] = i === 0x0 ? null : g2(g);
        return;
    }
    c["time"] >= d["endsAt"] && (d["over"] = !0x0, d["reason"] = "time", d["winner"] = g2(g));
}
var Fn = class {
        constructor(c, d) {
            const Mk = cX;
            this["side"] = c, this["ctx"] = d;
        } ["thinkIn"] = 0x0;
        ["lastSeen"] = null;
        ["lastSeenAge"] = 0x0;
        ["regrouped"] = !0x1;
        ["step"](g, j) {
            const Mq = cX;
            if (g["skirmish"]?.["over"] || (this["lastSeenAge"] += j, this["thinkIn"] -= j, this["thinkIn"] > 0x0)) return;
            let m = f["skirmish"],
                p = this["lastSeenAge"] < m["memory"] ? m["contactThink"] : m["think"];
            this["thinkIn"] = p * (0.8 + g["jitter"](this["side"]) * 0.4);
            let q = f5(g, this["side"]);
            if (q["length"] === 0x0) return;
            let u = f5(g, this["side"] === D["Player"] ? D["Enemy"] : D["Player"]);
            if (u["length"] === 0x0) return;
            let v = null,
                y = 0x1 / 0x0;
            for (let C of u)
                for (let E of q) {
                    let F = Math["hypot"](C["pos"]['x'] - E["pos"]['x'], C["pos"]['y'] - E["pos"]['y']);
                    F < m["sense"] && F < y && kW(g["map"], E["pos"], C["pos"]) && (v = C, y = F);
                }
            if (v && (this["lastSeen"] = {
                    ...v["pos"]
                }, this["lastSeenAge"] = 0x0), !this["regrouped"] && u["length"] - q["length"] >= m["retreatDeficit"]) {
                this["regrouped"] = !0x0, ae(g, this["home"](g), this["ctx"], this["side"]);
                return;
            }
            if (v) {
                if (this["maybeGrenade"](g, q, u), g["jitter"](this["side"]) < m["flankChance"]) {
                    let H = Math["atan2"](v["pos"]['y'] - q[0x0]["pos"]['y'], v["pos"]['x'] - q[0x0]["pos"]['x']) + (g["jitter"](this["side"]) < 0.5 ? 0x1 : -0x1) * Math['PI'] / 0x2;
                    ae(g, {
                        'x': v["pos"]['x'] + Math["cos"](H) * m["flankOffset"],
                        'y': v["pos"]['y'] + Math["sin"](H) * m["flankOffset"]
                    }, this["ctx"], this["side"]);
                } else kt(g, v, this["ctx"], this["side"]);
                return;
            }
            let A = this["lastSeen"] && this["lastSeenAge"] < m["memory"] ? this["lastSeen"] : this["probe"](g);
            ae(g, this["bound"](q, A), this["ctx"], this["side"]);
        } ["home"](c) {
            const Mw = cX;
            let d = this["side"] === D["Player"] ? c["map"]["playerSpawns"] : c["map"]["playerSpawnsB"];
            return D2(d);
        } ["bound"](c, d) {
            const Mx = cX;
            let g = D2(c["map"](q => q["pos"])),
                j = d['x'] - g['x'],
                l = d['y'] - g['y'],
                m = Math["hypot"](j, l),
                p = f["skirmish"]["bound"];
            return m <= p ? d : {
                'x': g['x'] + j / m * p,
                'y': g['y'] + l / m * p
            };
        } ["probe"](c) {
            const Mz = cX;
            let d = this["side"] === D["Player"] ? c["map"]["playerSpawnsB"] : c["map"]["playerSpawns"],
                g = D2(d);
            return {
                'x': g['x'] + (c["jitter"](this["side"]) * 0x2 - 0x1) * 0x28,
                'y': g['y'] + (c["jitter"](this["side"]) * 0x2 - 0x1) * 0x28
            };
        } ["maybeGrenade"](c, d, g) {
            const MA = cX;
            if (Rn(this["ctx"]) !== 'ok') return;
            let i = f["skirmish"];
            for (let j of g) {
                if (g["filter"](m => Math["hypot"](m["pos"]['x'] - j["pos"]['x'], m["pos"]['y'] - j["pos"]['y']) < i["grenadeCluster"])["length"] < 0x2) continue;
                let l = d["find"](m => !m["wading"] && Math["hypot"](m["pos"]['x'] - j["pos"]['x'], m["pos"]['y'] - j["pos"]['y']) <= f["grenade"]["throwRange"]);
                if (l && ht(c, j["pos"], this["side"], this["ctx"], l)) return;
            }
        }
    },
    D2 = c => ({
        'x': c["reduce"]((d, g) => d + g['x'], 0x0) / Math["max"](0x1, c["length"]),
        'y': c["reduce"]((d, g) => d + g['y'], 0x0) / Math["max"](0x1, c["length"])
    });

function Bn(c) {
    const MB = cX;
    if (c["length"] === 0x0) return null;
    let d = 0x0,
        g = 0x0;
    for (let i of c) d += i["pos"]['x'], g += i["pos"]['y'];
    return {
        'x': d / c["length"],
        'y': g / c["length"]
    };
}

function F2(c, d) {
    return hT(c, d);
}

function r_(g, j) {
    const MC = cX;
    let p = b2(g, j);
    if (p["length"] <= 0x1) return Bn(p);
    let q = g["orderGoal"],
        v = Bn(p);
    if (!q || !v) return v;
    let y = q['x'] - v['x'],
        A = q['y'] - v['y'],
        C = Math["hypot"](y, A);
    if (C < 0x1) return v;
    let E = y / C,
        F = A / C,
        H = -0x1 / 0x0,
        I = [];
    for (let L of p) {
        let M = L["pos"]['x'] * E + L["pos"]['y'] * F;
        I["push"](M), M > H && (H = M);
    }
    let K = p["filter"]((N, P) => H - I[P] <= f["camera"]["stragglerDistance"]);
    return Bn(K) ?? v;
}

function s_(d, g) {
    const MD = cX;
    let j = b2(d, g);
    if (j["length"] <= 0x1) return Bn(j);
    let m = f["camera"]["clusterRadius"],
        p = new Int32Array(j["length"])["fill"](-0x1),
        q = 0x0;
    for (let v = 0x0; v < j["length"]; v++) {
        if (p[v] >= 0x0) continue;
        let y = q++;
        p[v] = y;
        let A = [v];
        for (; A["length"] > 0x0;) {
            let C = A["pop"]();
            for (let E = 0x0; E < j["length"]; E++) p[E] >= 0x0 || Math["hypot"](j[C]["pos"]['x'] - j[E]["pos"]['x'], j[C]["pos"]['y'] - j[E]["pos"]['y']) > m || (p[E] = y, A["push"](E));
        }
    }
    let u = [];
    for (let F = 0x0; F < q; F++) {
        let H = j["filter"]((I, K) => p[K] === F);
        H["length"] > u["length"] && (u = H);
    }
    return Bn(u);
}
var a_ = {
    'squad': F2,
    'commanded': r_,
    'largestGroup': s_
};

function Ct(c, d = D["Player"]) {
    const ME = cX;
    return (a_[f["camera"]["focus"]] ?? F2)(c, d) ?? F2(c, d);
}
var Pr = class {
        constructor(c, d, g, i, j = f["skirmish"]["seconds"]) {
            const MF = cX;
            this["map"] = c, this["camera"] = d, this["renderer"] = g, this["input"] = i, this["seconds"] = j, (this["world"] = this["newWorld"](), this["commander"] = new Fn(D["Enemy"], this["world"]["sideB"]));
        } ["world"];
        ["exitRequested"] = !0x1;
        ["onOver"] = null;
        ["commander"];
        ["overFired"] = !0x1;
        ["newWorld"]() {
            const MG = cX;
            let c = Ir(this["map"], this["seconds"], void 0x0, void 0x0, [], 0x0, f["skirmish"]["squad"], f["skirmish"]["fog"]);
            this["renderer"]["clearDecals"]();
            let d = hT(c);
            return d && this["camera"]["centreOn"](d, this["map"]), this["camera"]["release"](), c;
        } ["restart"]() {
            const MH = cX;
            this["world"] = this["newWorld"](), this["commander"] = new Fn(D["Enemy"], this["world"]["sideB"]), this["overFired"] = !0x1;
        } ["step"](c) {
            const MI = cX;
            let d = this["world"];
            this["input"]["syncWorld"](this["camera"]), this["input"]["syncAim"](d), this["handleCommands"](), this["moveCamera"](c), d["skirmish"]?.["over"] || this["commander"]["step"](d, c), wt(d, c, {
                'manualAim': this["input"]["firing"] ? this["input"]["aim"]["point"] : null,
                'cursor': this["input"]["inside"] ? this["input"]["world"] : null
            }), h5(d), d["status"] = w2(d)["status"], d["skirmish"]?.["over"] && !this["overFired"] && (this["overFired"] = !0x0, d["skirmish"]["winner"] === d["viewSide"] ? d["sounds"]["push"]({
                'kind': "win"
            }) : d["sounds"]["push"]({
                'kind': "lose"
            }), this["onOver"]?.(d));
        } ["handleCommands"]() {
            const MJ = cX;
            let c = this["world"];
            for (let d of this["input"]["drain"]()) {
                if (d["type"] === "exit") {
                    this["exitRequested"] = !0x0;
                    continue;
                }
                if (d["type"] === "restart") {
                    c["skirmish"]?.["over"] && this["restart"]();
                    continue;
                }
                if (d["type"] === "recentre") {
                    this["camera"]["release"]();
                    continue;
                }
                if (c["skirmish"]?.["over"]) continue;
                if (d["type"] === "grenade") {
                    this["tryGrenade"]();
                    continue;
                }
                if (d["type"] === "fire") {
                    Cr(c, this["input"]["aim"]["point"], D["Player"]);
                    continue;
                }
                if (d["type"] === "callin" || d["type"] === "armcallin" || d["type"] === "select") continue;
                if (d["type"] === "march") {
                    let i = hT(c),
                        j = f["controls"]["marchStep"];
                    i && (ae(c, {
                        'x': i['x'] + d["dir"]['x'] * j,
                        'y': i['y'] + d["dir"]['y'] * j
                    }, c, D["Player"], {
                        'quiet': !0x0
                    }), this["camera"]["release"]());
                    continue;
                }
                let g = Er(c, d["world"], this["input"]["slack"], D["Player"]);
                g["kind"] === "enemy" ? kt(c, g["actor"], c, D["Player"]) : g["kind"] === "building" ? Ar(c, g["building"], c, D["Player"]) : ae(c, d["world"], c, D["Player"]), this["camera"]["release"]();
            }
        } ["tryGrenade"]() {
            const MK = cX;
            let c = this["world"];
            ht(c, {
                ...this["input"]["aim"]["point"]
            }, D["Player"], c, this["input"]["aim"]["thrower"]) && this["input"]["aim"]["idle"]();
        } ["moveCamera"](c) {
            const ML = cX;
            let d = this["input"]["consumePan"](this["camera"]["zoom"]),
                g = this["input"]["edgeScroll"](c);
            this["camera"]["pan"](d['x'] + g['x'], d['y'] + g['y'], this["map"], this["input"]["isTouch"] ? "timed" : "sticky");
            let i = this["world"]['fx']["takeShake"]();
            i > 0x0 && this["camera"]["addShake"](i), this["camera"]["update"](c, Ct(this["world"]), this["map"]), xe(this["world"], this["camera"]);
        } ["standing"]() {
            const MM = cX;
            return {
                'a': eW(this["world"], D["Player"])["length"],
                'b': eW(this["world"], D["Enemy"])["length"]
            };
        }
    },
    l_ = "the-crossings";
async function g5(g, j) {
    const MN = cX;
    let {
        camera: m,
        renderer: p,
        input: q,
        hud: u,
        controls: v
    } = g["shell"], y = null, A = j && aT[j]?.["objective"] === "skirmish" ? j : l_, C = Te(aT[A], A);
    await Et(p, C, "rookie"), y = new Pr(C, m, p, q);
    let E = y;
    g["set"]({
        'name': "skirmish",
        'world': E["world"],
        'step': I => {
            const MO = MN;
            v[MO(0x545)](E[MO(0xce4)]);
            let K = JT();
            K ? B1() : H1(), !K && (E[MO(0x15ea)](I), u[MO(0x545)](E[MO(0xce4)]));
        },
        'draw': (I, K) => {
            const MP = MN;
            p[MP(0x9df)](E[MP(0xce4)], m, I, K, q[MP(0x16c0)]), Qe(m, p[MP(0x4ed)], K, !st() && !E[MP(0xce4)][MP(0xf49)]?.[MP(0x1505)]);
        }
    }), Je(C), He(f["banner"]["fade"]), q["mode"] = "play", je(EW["trumper"], "The other lot want the glade. They have been told it is spoken for; persuade them.", {
        'seconds': 0x9
    });
    let F = () => {
            const MQ = MN;
            y && (y[MQ(0xf2e)] = !0x0);
        },
        H = () => {
            const MR = MN;
            JT() || Mt(MR(0x617), MR(0x5b2), {
                'label': MR(0xf2c),
                'onPick': F
            });
        };
    q["onPause"] = H, q["modalOpen"] = JT, u["setTools"]({
        'restart': !0x1,
        'pause': !0x0,
        'exitLabel': "Leave the match"
    }), u["onRestart"] = null, u["onPause"] = H, u["onExit"] = () => {
        const MU = MN;
        JT() || ST({
            'title': MU(0xa95),
            'body': MU(0x102d),
            'buttons': [{
                'label': MU(0x303),
                'value': MU(0x47b),
                'variant': MU(0x2a9)
            }, {
                'label': MU(0x7e7),
                'value': MU(0x3cf)
            }],
            'dismiss': MU(0x3cf)
        })[MU(0x1101)](I => {
            const MV = MU;
            I === MV(0x47b) && F();
        });
    }, y["onOver"] = I => {
        const MX = MN;
        let K = I[MX(0xf49)],
            L = y[MX(0x1243)](),
            M = K[MX(0x2c4)] === I[MX(0x15d4)] ? MX(0x293) : K[MX(0x2c4)] === null ? MX(0x1271) : MX(0x84b),
            N = document[MX(0xae0)]('p');
        N[MX(0x1338)] = K[MX(0xf37)] === MX(0x1558) ? MX(0x25d) + L['a'] + MX(0x997) + L['b'] + MX(0x7b4) : K[MX(0x2c4)] === I[MX(0x15d4)] ? MX(0x1175) + L['a'] + MX(0x1067) : MX(0x973), ST({
            'title': M,
            'body': N,
            'buttons': [{
                'label': MX(0x21f),
                'value': MX(0xde0),
                'variant': MX(0x2a9)
            }, {
                'label': MX(0x303),
                'value': MX(0x47b)
            }],
            'dismiss': MX(0x47b)
        })[MX(0x1101)](P => {
            const MY = MX;
            y && (P === MY(0xde0) ? y[MY(0x114c)]() : y[MY(0xf2e)] = !0x0);
        });
    }, await T1(() => y?.["exitRequested"] ? (y = null, g["set"](null), Ze(), zW(), G1(), q["onPause"] = null, u["onExit"] = u["onPause"] = null, u["setTools"]({
        'restart': !0x0,
        'pause': !0x0,
        'exitLabel': "Leave the mission"
    }), !0x0) : null);
}

function B2(c, d) {
    const MZ = cX;
    c['fx']["step"](d), c["fog"]["step"](c["map"], c["soldiers"], d, c["viewSide"] ?? D["Player"]), Zh(c, d), T3(c, d), gt(c, d), oh(c, d), uh(c, d);
}
var b5 = 0xe,
    c_ = 0x64,
    Lr = class {
        constructor(c, d, g, j, l) {
            const N5 = cX;
            this["map"] = c, this["camera"] = d, this["input"] = j, (this["serverSide"] = l["side"], this["roundId"] = l["roundId"], this["world"] = Ir(c, l["seconds"], void 0x0, void 0x0, l["colours"], 0x0, l["squad"], l["fog"] ? f["skirmish"]["fog"] : 0x0), this["world"]["viewSide"] = l["side"], this["input"]["edgeScrollBlocked"] = !l["edgeScroll"]);
            let m = (performance["now"]() - (l["receivedAt"] ?? performance["now"]())) / 0x3e8;
            this["world"]["preroll"] = Math["max"](0x0, l["preroll"] - m), this["world"]["round"] = l["round"], g["clearDecals"]();
            let p = hT(this["world"], this["serverSide"]);
            p && this["camera"]["centreOn"](p, c), this["camera"]["release"]();
        } ["world"];
        ["exitRequested"] = !0x1;
        ["pausedBy"] = null;
        ["over"] = null;
        ["onOver"] = null;
        ["onPauseChange"] = null;
        ["serverSide"];
        ["targets"] = new Map();
        ["henTargets"] = new Map();
        ["lastSnapTime"] = -0x1;
        ["lastSequence"] = -0x1;
        ["roundId"];
        ["sinceSnap"] = 0x0;
        ["lastFireSent"] = 0x0;
        ["triggerDown"] = !0x1;
        ["handleMsg"](c) {
            const N7 = cX;
            if (!("roundId" in c && c["roundId"] !== this["roundId"])) {
                if (c['t'] === "snap") {
                    this["applySnap"](c);
                    return;
                }
                if (c['t'] === "pause") {
                    this["pausedBy"] = c['on'] ? c["who"] : null, this["onPauseChange"]?.();
                    return;
                }
                if (c['t'] === "over" && (!this["over"] || c["last"] && !this["over"]["last"])) {
                    let d = this["world"],
                        g = this["serverSide"],
                        j = c["standing"][g] ?? 0x0,
                        l = c["standing"]["reduce"]((u, v, y) => u + (y === g ? 0x0 : v), 0x0),
                        m = c["winner"] === null ? null : c["winner"] === g,
                        p = c["initial"][g] ?? 0x0,
                        q = c["initial"]["reduce"]((u, v, y) => u + (y === g ? 0x0 : v), 0x0);
                    this["over"] = {
                        'won': m,
                        'winnerId': c["winnerId"],
                        'winnerName': c["winnerName"],
                        'reason': c["reason"],
                        'a': j,
                        'b': l,
                        'kills': q - l,
                        'lost': p - j,
                        'seconds': Math["round"](c["seconds"]),
                        'round': c["round"],
                        'rounds': c["rounds"],
                        'last': c["last"]
                    }, d["sounds"]["push"]({
                        'kind': m ? "win" : "lose"
                    }), this["onOver"]?.();
                }
            }
        } ["applySnap"](g) {
            const N8 = cX;
            if (g["seq"] <= this["lastSequence"] || g["time"] < this["lastSnapTime"]) return;
            this["lastSequence"] = g["seq"], this["lastSnapTime"] = g["time"], this["sinceSnap"] = 0x0;
            let j = this["world"],
                m = new Map(j["soldiers"]["map"](y => [y['id'], y])),
                p = new Set(g["actors"]["map"](y => y['id']));
            for (let y of j["soldiers"]) p["has"](y['id']) || (y["faction"] !== this["serverSide"] && (y["visible"] = !0x1), this["targets"]["has"](y['id']) && (this["targets"]["delete"](y['id']), y["vel"]['x'] = 0x0, y["vel"]['y'] = 0x0));
            for (let A of g["actors"]) {
                let C = m["get"](A['id']);
                C && (this["targets"]["set"](A['id'], A), C["visible"] = !0x0, C["stagger"] = A["stagger"], C["wading"] = (A['w'] ?? 0x0) > 0x0, C["swimming"] = A['w'] === 0x2, !A["alive"] && C["alive"] && (C["alive"] = !0x1, C["deathTime"] = 0x0, C["vel"]['x'] = 0x0, C["vel"]['y'] = 0x0, C["pos"]['x'] = A['x'], C["pos"]['y'] = A['y']));
            }
            j["bullets"] = g["bullets"]["map"](([E, F, H, I, K, L, M, N]) => ({
                'pos': {
                    'x': E,
                    'y': F
                },
                'prev': {
                    'x': H,
                    'y': I
                },
                'vel': {
                    'x': (E - H) * 0x3c,
                    'y': (F - I) * 0x3c
                },
                ...M !== void 0x0 && N !== void 0x0 ? {
                    'from': {
                        'x': M,
                        'y': N
                    }
                } : {},
                'faction': K,
                'life': L,
                'buildingDamage': 0x0,
                'blast': 0x0
            })), j["grenades"] = g["grenades"]["map"](([E, F, H, I, K, L, M, N]) => {
                let P = E + (H - E) * L,
                    Q = F + (I - F) * L;
                return {
                    'kind': M,
                    'pos': {
                        'x': P,
                        'y': Q
                    },
                    'prev': {
                        'x': P,
                        'y': Q
                    },
                    'from': {
                        'x': E,
                        'y': F
                    },
                    'to': {
                        'x': H,
                        'y': I
                    },
                    't': L,
                    'duration': K,
                    'faction': N
                };
            }), j["clouds"] = g["clouds"]["map"](([E, F, H, I, K]) => ({
                'pos': {
                    'x': E,
                    'y': F
                },
                'radius': H,
                'life': I,
                'maxLife': K
            }));
            let q = new Map(j["critters"]["map"](E => [E['id'], E])),
                v = new Set(g["critters"]["map"](([E]) => E));
            for (let E of j["critters"]) v["has"](E['id']) || (E["visible"] = !0x1, this["henTargets"]["delete"](E['id']), E["vel"]['x'] = 0x0, E["vel"]['y'] = 0x0);
            for (let [F, H, I, K, L, M] of g["critters"]) {
                let N = q["get"](F);
                N && (N["visible"] = !0x0, this["henTargets"]["set"](F, {
                    'x': H,
                    'y': I,
                    'a': K
                }), N["state"] = M, !L && N["alive"] && (N["alive"] = !0x1, N["deathTime"] = 0x0, N["vel"]['x'] = 0x0, N["vel"]['y'] = 0x0, N["pos"]['x'] = H, N["pos"]['y'] = I, this["henTargets"]["delete"](F)));
            }
            for (let P of g['fx']) j['fx']["replay"](P);
            for (let Q of g["sounds"]) j["sounds"]["push"](Q);
            for (let [R, S] of g["screams"]) j["screams"]["push"]({
                'x': R,
                'y': S
            });
            for (let [U, V] of g["deaths"]) j["deaths"]["push"]({
                'x': U,
                'y': V
            });
            j["grenadesHeld"] = g["grenadesBySide"][this["serverSide"]] ?? 0x0, j["grenadeCooldown"] = g["grenadeCooldownBySide"][this["serverSide"]] ?? 0x0;
            for (let X of g["cratesGone"]) {
                let Y = j["crates"][X];
                Y && (Y["alive"] = !0x1);
            }
            for (let a7 of g["packagesGone"]) {
                let a8 = j["packages"][a7];
                a8 && (a8["taken"] = !0x0);
            }
            for (let a9 of g["minesGone"]) {
                let aj = j["mines"][a9];
                aj && (aj["alive"] = !0x1);
            }
            j["time"] = g["time"];
        } ["step"](c) {
            const N9 = cX;
            let d = this["world"];
            if (this["sinceSnap"] += c, this["input"]["syncWorld"](this["camera"]), this["input"]["syncAim"](d), d["preroll"] > 0x0) {
                d["preroll"] = Math["max"](0x0, d["preroll"] - c), B2(d, c), this["moveCamera"](c);
                return;
            }
            this["handleCommands"](), this["sendTrigger"](), this["moveCamera"](c), B2(d, c);
            for (let m of d["soldiers"]) {
                if (m["prev"]['x'] = m["pos"]['x'], m["prev"]['y'] = m["pos"]['y'], !m["alive"]) continue;
                let p = this["targets"]["get"](m['id']);
                if (!p) continue;
                let q = Math["min"](0x1, c * b5),
                    u = (p['x'] - m["pos"]['x']) * q,
                    v = (p['y'] - m["pos"]['y']) * q;
                m["pos"]['x'] += u, m["pos"]['y'] += v, m["vel"]['x'] = c > 0x0 ? u / c : 0x0, m["vel"]['y'] = c > 0x0 ? v / c : 0x0, m["walkPhase"] += Math["hypot"](u, v);
                let y = p['a'] - m["angle"];
                for (; y > Math['PI'];) y -= Math['PI'] * 0x2;
                for (; y < -Math['PI'];) y += Math['PI'] * 0x2;
                m["angle"] += y * q;
            }
            for (let A of d["critters"]) {
                if (A["prev"]['x'] = A["pos"]['x'], A["prev"]['y'] = A["pos"]['y'], !A["alive"]) continue;
                let C = this["henTargets"]["get"](A['id']);
                if (!C) continue;
                let E = Math["min"](0x1, c * b5),
                    F = (C['x'] - A["pos"]['x']) * E,
                    H = (C['y'] - A["pos"]['y']) * E;
                A["pos"]['x'] += F, A["pos"]['y'] += H, A["vel"]['x'] = c > 0x0 ? F / c : 0x0, A["vel"]['y'] = c > 0x0 ? H / c : 0x0, A["walkPhase"] += Math["hypot"](F, H);
                let I = C['a'] - A["angle"];
                for (; I > Math['PI'];) I -= Math['PI'] * 0x2;
                for (; I < -Math['PI'];) I += Math['PI'] * 0x2;
                A["angle"] += I * E;
            }
            d["orderMarker"] = Math["max"](0x0, d["orderMarker"] - c);
            let g = eW(d, this["serverSide"])["length"],
                j = d["soldiers"]["filter"](K => K["alive"] && K["faction"] !== this["serverSide"])["length"];
            d["status"] = g + " v " + j;
        } ["sendTrigger"]() {
            const Nj = cX;
            let c = this["input"]["firing"] && !this["over"] && !this["pausedBy"],
                d = performance["now"]();
            if (c) {
                if (d - this["lastFireSent"] < c_) return;
                this["lastFireSent"] = d, this["triggerDown"] = !0x0, $["fire"](this["roundId"], {
                    ...this["input"]["aim"]["point"]
                });
                return;
            }
            this["triggerDown"] && (this["triggerDown"] = !0x1, $["fire"](this["roundId"], null));
        } ["handleCommands"]() {
            const Nk = cX;
            for (let c of this["input"]["drain"]()) {
                if (c["type"] === "exit") {
                    this["exitRequested"] = !0x0;
                    continue;
                }
                if (c["type"] === "recentre") {
                    this["camera"]["release"]();
                    continue;
                }
                if (!(this["over"] || this["pausedBy"])) {
                    if (c["type"] === "order" || c["type"] === "march") {
                        let d = c["type"] === "order" ? c["world"] : null;
                        if (c["type"] === "march") {
                            let g = hT(this["world"], this["serverSide"]),
                                i = f["controls"]["marchStep"];
                            d = g ? {
                                'x': g['x'] + c["dir"]['x'] * i,
                                'y': g['y'] + c["dir"]['y'] * i
                            } : null;
                        }
                        if (!d) continue;
                        $["order"](this["roundId"], {
                            'x': d['x'],
                            'y': d['y']
                        }), this["world"]["orderGoal"] = {
                            'x': d['x'],
                            'y': d['y']
                        }, this["world"]["orderMarker"] = f["soldier"]["orderMarkerTime"], this["camera"]["release"](), c["type"] === "order" && this["world"]["sounds"]["push"]({
                            'kind': "order"
                        });
                        continue;
                    }
                    if (c["type"] === "grenade") {
                        if (this["world"]["grenadesHeld"] <= 0x0) continue;
                        let j = this["input"]["aim"]["thrower"];
                        if (!j || !j["alive"] || j["wading"]) continue;
                        $["grenade"](this["roundId"], {
                            ...this["input"]["aim"]["point"]
                        }), this["input"]["aim"]["idle"]();
                    }
                }
            }
        } ["moveCamera"](c) {
            const Nq = cX;
            let d = this["input"]["consumePan"](this["camera"]["zoom"]),
                g = this["input"]["edgeScroll"](c);
            this["camera"]["pan"](d['x'] + g['x'], d['y'] + g['y'], this["map"], this["input"]["isTouch"] ? "timed" : "sticky");
            let i = this["world"]['fx']["takeShake"]();
            i > 0x0 && this["camera"]["addShake"](i), this["camera"]["update"](c, Ct(this["world"], this["serverSide"]), this["map"]), xe(this["world"], this["camera"]);
        } ["standing"]() {
            const Nv = cX;
            return {
                'a': eW(this["world"], this["serverSide"])["length"],
                'b': this["world"]["soldiers"]["filter"](c => c["alive"] && c["faction"] !== this["serverSide"])["length"]
            };
        }
    },
    d_ = 0x3,
    u_ = 1.5;
async function y5(c, d) {
    const Nw = cX;
    if (nt(), !(d["mapId"] in aT)) {
        $["leave"](), await yo(d["mapId"]);
        return;
    }
    let g = d,
        i = null;
    for (;;) {
        if (!(g["mapId"] in aT)) {
            $["leave"](), await yo(g["mapId"]);
            return;
        }
        let j = await m_(c, g, i);
        if (j === "left") return;
        i = v5(g), g = j;
    }
}
var v5 = c => c["mapId"];
async function m_(j, q, y) {
    const Nx = cX;
    let {
        camera: A,
        renderer: C,
        input: E,
        hud: F,
        controls: H
    } = j["shell"], I = null, K = null, L = !0x1, M = 0x0, N = v5(q), P = Te(aT[N], N);
    y !== N && await Et(C, P, "rookie"), I = new Lr(P, A, C, E, q);
    let Q = I;
    j["set"]({
        'name': "net",
        'world': Q["world"],
        'step': X => {
            const Nz = Nx;
            H[Nz(0x545)](Q[Nz(0xce4)]), JT() ? B1() : H1(), Q[Nz(0x15ea)](X), F[Nz(0x545)](Q[Nz(0xce4)]), F[Nz(0x1229)](Q[Nz(0x3b7)] ? {
                'kind': Nz(0x79d),
                'who': Q[Nz(0x3b7)]
            } : !$[Nz(0xa65)] || Q[Nz(0x1157)] > u_ ? {
                'kind': Nz(0x5c4)
            } : {
                'kind': 'ok'
            });
        },
        'draw': (X, Y) => {
            const NA = Nx;
            C[NA(0x9df)](Q[NA(0xce4)], A, X, Y, E[NA(0x16c0)]), Qe(A, C[NA(0x4ed)], Y, !st() && !Q[NA(0x1505)]);
        }
    }), Je(P), He(f["banner"]["fade"]), E["mode"] = "play";
    let R = () => {
            const NB = Nx;
            I && (I[NB(0xf2e)] = !0x0);
        },
        S = () => {
            const NC = Nx;
            $[NC(0x47b)](), R();
        },
        U = () => {
            const ND = Nx;
            JT() || Mt(ND(0x617), ND(0x103f), {
                'label': ND(0xf2c),
                'onPick': S
            });
        };
    E["onPause"] = U, E["modalOpen"] = JT, F["setTools"]({
        'restart': !0x1,
        'pause': !0x1,
        'exitLabel': "Leave the match"
    }), F["onRestart"] = null, F["onPause"] = null, F["onExit"] = () => {
        const NE = Nx;
        JT() || ST({
            'title': NE(0xa95),
            'body': NE(0x1469),
            'buttons': [{
                'label': NE(0x303),
                'value': NE(0x47b),
                'variant': NE(0x2a9)
            }, {
                'label': NE(0x7e7),
                'value': NE(0x3cf)
            }],
            'dismiss': NE(0x3cf)
        })[NE(0x1101)](X => {
            const NF = NE;
            X === NF(0x47b) && S();
        });
    }, I["onPauseChange"] = () => {
        const NG = Nx;
        !I || I[NG(0x1505)] || (I[NG(0x3b7)] ? (zW(), Go(NG(0x15c0), I[NG(0x3b7)] + NG(0x1147), [{
            'label': NG(0xf2c),
            'onPick': S
        }], !0x0)) : zW());
    }, I["onOver"] = () => {
        const NH = Nx;
        if (!I?.[NH(0x1505)] || M > 0x0) return;
        let X = I[NH(0x1505)];
        M = performance[NH(0xb30)](), zW(), $[NH(0xe16)](X[NH(0x918)], X[NH(0xf37)], X[NH(0x1242)] === null || X[NH(0x1242)] ? X['a'] : X['b'], X[NH(0x1242)] === null || X[NH(0x1242)] ? X['b'] : X['a'], X[NH(0x1242)]);
        let Y = document[NH(0xae0)](NH(0x3df)),
            a7 = document[NH(0xae0)]('p');
        a7[NH(0x1338)] = X[NH(0xf37)] === NH(0x146f) ? X[NH(0x1242)] ? NH(0x5eb) : NH(0xbcf) : X[NH(0xf37)] === NH(0x1558) ? NH(0x25d) + X['a'] + NH(0x997) + X['b'] + NH(0x7b4) : X[NH(0x1242)] ? NH(0x1175) + X['a'] + NH(0x1067) : NH(0x973), Y[NH(0xa20)](a7);
        let a8 = document[NH(0xae0)]('p');
        a8[NH(0x824)] = NH(0x1622);
        let a9 = Math[NH(0x7a7)](X[NH(0x10c2)] / 0x3c),
            aj = String(X[NH(0x10c2)] % 0x3c)[NH(0x170a)](0x2, '0');
        a8[NH(0x1338)] = NH(0xd4f) + X[NH(0xc1d)] + NH(0xd58) + X[NH(0x152d)] + NH(0x402) + a9 + ':' + aj, Y[NH(0xa20)](a8);
        let ak = X[NH(0x5bd)] > 0x1;
        if (ak) {
            let aw = document[NH(0xae0)]('p');
            aw[NH(0x824)] = NH(0x1622), aw[NH(0x1338)] = NH(0x1e3) + X[NH(0x4b7)] + NH(0x9f6) + X[NH(0x5bd)], Y[NH(0xc13)](aw, Y[NH(0x323)]);
        }
        let aq = ak && !X[NH(0x14e5)];
        ST({
            'title': X[NH(0x1242)] === !0x0 ? NH(0x293) : X[NH(0x1242)] === null ? NH(0x1271) : NH(0x84b),
            'body': Y,
            'buttons': aq ? [] : [{
                'label': NH(0x1028),
                'value': NH(0x362),
                'variant': NH(0x2a9)
            }],
            'autoClose': {
                'value': NH(0x362),
                'seconds': aq ? Fa : 0xa,
                'label': aq ? NH(0x13fb) : void 0x0
            }
        })[NH(0x1101)](() => {
            L = !0x0, aq || R();
        });
    }, $["onStart"] = X => {
        const NI = Nx;
        X[NI(0x1611)] !== q[NI(0x1611)] && (K = X);
    }, $["bindRound"](q["roundId"], X => {
        const NJ = Nx;
        X['t'] === NJ(0x1310) ? R() : I?.[NJ(0xdb0)](X);
    });
    let V = await T1(() => I?.["exitRequested"] || L && I?.["over"]?.["last"] ? "left" : L && K || K && !I?.["over"] ? K : L && performance["now"]() - M > (Fa + d_) * 0x3e8 ? "left" : null);
    return I = null, j["set"](null), E["edgeScrollBlocked"] = !0x1, $["onGameMsg"] = null, $["onStart"] = null, Ze(), F["setLink"](null), F["hideClock"](), zW(), G1(), E["onPause"] = null, F["onExit"] = null, F["setTools"]({
        'restart': !0x0,
        'pause': !0x0,
        'exitLabel': "Leave the mission"
    }), V;
}
var Or = class {
        constructor(c, d, g, j, l, m = () => [], p = () => {}, q = 0x0) {
            const NK = cX;
            this["map"] = c, this["camera"] = d, this["renderer"] = g, this["input"] = j, this["difficulty"] = l, this["roster"] = m, this["loadout"] = p, this["runSeed"] = q, this["world"] = this["newWorld"]();
        } ["world"];
        ["exitRequested"] = !0x1;
        ["nextRequested"] = !0x1;
        ["onResolved"] = null;
        ["onCallIn"] = null;
        ["onArmCallIn"] = null;
        ["autopilot"] = null;
        ["newWorld"]() {
            const NL = cX;
            let c = BW(this["map"], this["difficulty"], this["roster"](), this["loadout"](), this["runSeed"]);
            this["renderer"]["clearDecals"]();
            let d = hT(c);
            return d && this["camera"]["centreOn"](d, this["map"]), this["camera"]["release"](), c;
        } ["restart"]() {
            const NM = cX;
            this["world"] = this["newWorld"]();
        } ["setDifficulty"](c) {
            const NN = cX;
            c !== this["difficulty"] && (this["difficulty"] = c, this["world"] = this["newWorld"]());
        } ["step"](c) {
            const NO = cX;
            let d = this["world"];
            d["autoEngage"] = G()["autoFire"], this["input"]["syncWorld"](this["camera"]), this["input"]["syncAim"](d), this["handleCommands"](), this["moveCamera"](c);
            let g = d["phase"];
            if (g === 0x0 && this["autopilot"]?.["step"](d, c), wt(d, c, {
                    'manualAim': this["autopilot"]?.["aim"] ?? (this["input"]["firing"] ? this["input"]["aim"]["point"] : null),
                    'targeted': this["autopilot"] != null,
                    'cursor': this["input"]["inside"] ? this["input"]["world"] : null
                }), g === 0x0 && (_3(d, c), d["phase"] !== g)) {
                if (d["phase"] === 0x1) {
                    d["sounds"]["push"]({
                        'kind': "win"
                    });
                    for (let i of eW(d)) i["angle"] = Math['PI'] / 0x2, i["vel"]['x'] = 0x0, i["vel"]['y'] = 0x0;
                } else d["phase"] === 0x2 && d["sounds"]["push"]({
                    'kind': "lose"
                });
                this["onResolved"]?.(d);
            }
        } ["handleCommands"]() {
            const NP = cX;
            let c = this["world"];
            for (let d of this["input"]["drain"]()) {
                if (d["type"] === "exit") {
                    this["exitRequested"] = !0x0;
                    continue;
                }
                if (d["type"] === "restart") {
                    c["phase"] !== 0x0 && this["restart"]();
                    continue;
                }
                if (d["type"] === "recentre") {
                    this["camera"]["release"]();
                    continue;
                }
                if (c["phase"] !== 0x0) continue;
                if (d["type"] === "armcallin") {
                    this["onArmCallIn"]?.();
                    continue;
                }
                if (d["type"] === "fire") {
                    Cr(c, this["input"]["aim"]["point"], D["Player"]);
                    continue;
                }
                if (d["type"] === "grenade") {
                    this["tryGrenade"](this["input"]["aim"]["point"]);
                    continue;
                }
                if (d["type"] === "callin") {
                    k2(c, d['at']) && this["onCallIn"]?.(c["squadCallIn"]);
                    continue;
                }
                if (d["type"] === "select") continue;
                if (d["type"] === "march") {
                    let i = hT(c),
                        j = f["controls"]["marchStep"];
                    i && (ae(c, {
                        'x': i['x'] + d["dir"]['x'] * j,
                        'y': i['y'] + d["dir"]['y'] * j
                    }, c, D["Player"], {
                        'quiet': !0x0
                    }), this["camera"]["release"]());
                    continue;
                }
                let g = Er(c, d["world"], this["input"]["slack"], D["Player"]);
                g["kind"] === "enemy" ? kt(c, g["actor"], c, D["Player"]) : g["kind"] === "building" ? Ar(c, g["building"], c, D["Player"]) : ae(c, d["world"], c, D["Player"]), this["camera"]["release"]();
            }
        } ["tryGrenade"](c) {
            const NQ = cX;
            let d = this["world"],
                g = Rn(d);
            if (g !== 'ok') {
                let i = hT(d) ?? c;
                g === "empty" ? d['fx']["popup"](i, "no grenades", "#ff6a48") : d['fx']["popup"](i, "reloading", "#d8a13c"), d["sounds"]["push"]({
                    'kind': "denied"
                });
                return;
            }
            ht(d, c, D["Player"], d, this["input"]["aim"]["thrower"]);
        } ["moveCamera"](c) {
            const NR = cX;
            let d = this["input"]["consumePan"](this["camera"]["zoom"]),
                g = this["input"]["edgeScroll"](c);
            this["camera"]["pan"](d['x'] + g['x'], d['y'] + g['y'], this["map"], this["input"]["isTouch"] ? "timed" : "sticky");
            let i = this["world"]['fx']["takeShake"]();
            i > 0x0 && this["camera"]["addShake"](i), this["camera"]["update"](c, Ct(this["world"]), this["map"]), xe(this["world"], this["camera"]);
        }
    },
    p_ = new Set(["eliminate"]),
    Nr = class {
        constructor(c = 0x1 / 0x0) {
            const NS = cX;
            this["order"] = c;
        } ["said"] = 0x0;
        ["nextAt"] = f["onboarding"]["nudgeAfter"];
        ["seen"] = null;
        ["fresh"](c) {
            const NT = cX;
            this["seen"] !== c && (this["seen"] = c, this["said"] = 0x0, this["nextAt"] = f["onboarding"]["nudgeAfter"]);
        } ["due"](c) {
            const NU = cX;
            let d = f["onboarding"];
            if (this["fresh"](c), this["said"] >= d["nudgeMax"] || this["order"] > d["nudgeUntilOrder"] || c["time"] < this["nextAt"] || Ul()) return null;
            this["said"]++, this["nextAt"] = c["time"] + d["nudgeEvery"];
            let g = p_["has"](c["map"]["objective"]) ? Math["max"](0x0, c["enemyTotal"] - c["kills"]) : null;
            return Im(_t(c["map"]), g, c["jitter"]());
        } ["step"](c) {
            const NV = cX;
            let d = this["due"](c);
            d !== null && je(EW["trumper"], d, {
                'delay': 0x0
            });
        }
    };
async function _5(K) {
    const NX = cX;
    let {
        camera: L,
        renderer: P,
        input: Q,
        hud: U,
        controls: Y
    } = K["shell"], {
        info: a7,
        campaign: a8,
        campaignLevels: a9
    } = K, aj = gd(Ut[a7['id']], aT[a7['id']]), ak = bd(aj, K["difficulty"]);
    K["setDifficulty"](ak);
    let aq = null,
        aw = null,
        ax = null,
        az = async () => {
            const NY = NX;
            try {
                ax = await navigator[NY(0x715)]?.[NY(0xb78)](NY(0x2b7)) ?? null;
            } catch {}
        };
    nt();
    let aA = Te(aT[a7['id']], a7['id']),
        aB = Ha(aT[a7['id']]);
    await Et(P, aA, ak);
    let aC = Kt(Ut[a7['id']])["roster"] === "fresh",
        aD = [],
        aE = !aC && _n(a8) === "reinforcements",
        aF = () => {
            const NZ = NX;
            if (aC) return aD = [], A3(aA[NZ(0xad2)]);
            let b4 = Hu(a8, aA[NZ(0xad2)] + (aE ? f[NZ(0xa40)][NZ(0x13cc)] : 0x0));
            return aD = b4[NZ(0x103d)](aA[NZ(0xad2)]), b4[NZ(0x103d)](0x0, aA[NZ(0xad2)]);
        },
        aG = () => {
            const O5 = NX;
            if (aC) return {
                'weapon': O5(0x309),
                'grenades': 0x0,
                'throwable': O5(0x14ac),
                'reserves': [],
                'packagesTaken': []
            };
            let b4 = a8[O5(0x95c)][O5(0xae1)],
                b7 = b4 !== O5(0x15d7) && Ya(a8, b4),
                b8 = b7 ? gW(a8, ge[b4]) : 0x0;
            return {
                'weapon': li(a8),
                'grenades': Math[O5(0xbba)](0x0, Math[O5(0x220)](a8[O5(0x95c)][O5(0xc48)], b8)),
                'throwable': b7 ? b4 : O5(0x14ac),
                'callIn': _n(a8),
                'reserves': aD,
                'packagesTaken': a8[O5(0xc70)][a7['id']]?.[O5(0x374)]?.[ak] ?? []
            };
        },
        aH = !0x1,
        aI = () => {
            const O7 = NX;
            if (aH || aC) return;
            aH = !0x0;
            let b4 = a8[O7(0x95c)][O7(0xae1)];
            if (b4 === O7(0x15d7) || !Ya(a8, b4)) return;
            let b7 = Math[O7(0xbba)](0x0, Math[O7(0x220)](a8[O7(0x95c)][O7(0xc48)], gW(a8, ge[b4])));
            b7 > 0x0 && Ka(a8, ge[b4], b7);
        };
    aq = new Or(aA, L, P, Q, ak, aF, aG);
    let aJ = aq,
        aK = new Nr(aT[a7['id']]["order"]);
    K["set"]({
        'name': "mission",
        get 'world'() {
            const O8 = NX;
            return aJ[O8(0xce4)];
        },
        'step': b4 => {
            const O9 = NX;
            Y[O9(0x545)](aJ[O9(0xce4)]), aJ[O9(0xce4)][O9(0x16a6)] === 0x0 && !JT() && vm(b4), U[O9(0x51d)](Q[O9(0x1128)]);
            let b7 = JT();
            b7 ? B1() : H1(), !(b7 || U[O9(0xfc7)]) && (aJ[O9(0x15ea)](b4), aK[O9(0x15ea)](aJ[O9(0xce4)]), U[O9(0x545)](aJ[O9(0xce4)]));
        },
        'draw': (b4, b7) => {
            const Oj = NX;
            P[Oj(0x9df)](aJ[Oj(0xce4)], L, b4, b7, Q[Oj(0x16c0)]), Qe(L, P[Oj(0x4ed)], b7, !st() && aJ[Oj(0xce4)][Oj(0x16a6)] === 0x0);
        }
    }), Je(aA), um(a7['id'], ak, aB);
    let aL = a9["findIndex"](b4 => b4['id'] === a7['id']),
        aM = q1(a9)["find"](b4 => b4["levels"]["some"](b7 => b7['id'] === a7['id'])),
        aN = () => {
            const Ok = NX;
            if (!aq) return;
            let b4 = aq[Ok(0xce4)][Ok(0x16a6)] === 0x1 ? Uu(ak, aj) : null;
            b4 ? (ak = b4, zt(U1, b4), aq[Ok(0xd4a)](b4)) : aq[Ok(0x114c)](), U[Ok(0xf3e)](), aX();
        },
        aO = b4 => {
            const Oq = NX;
            (!aq || aq[Oq(0xce4)][Oq(0x16a6)] !== 0x0) && !aq || aj[Oq(0x13d1)](b4) && (ak = b4, zt(U1, b4), aq[Oq(0xd4a)](b4), U[Oq(0xba2)](aq[Oq(0xce4)]));
        },
        aP = aM ? aM["levels"]["findIndex"](b4 => b4['id'] === a7['id']) + 0x1 : 0x0;
    U["open"]({
        'hasNext': !aC && aL >= 0x0 && aL < a9["length"] - 0x1,
        'missionNumber': aP,
        'theatreName': aM?.["zone"]["name"] ?? '',
        'record': aC ? null : a8["records"][a7['id']] ?? null,
        'onNext': () => {
            const Ov = NX;
            aq && (aq[Ov(0x5b5)] = !0x0);
        },
        'onRetry': aN,
        'onDifficulty': aO,
        'difficulties': aj,
        'campaign': aC ? null : a8,
        'onLoadout': aC ? null : () => {
            const Ow = NX;
            aq && (aq[Ow(0x114c)](), U[Ow(0xba2)](aq[Ow(0xce4)]));
        },
        'onMissions': () => {
            const Ox = NX;
            aq && (aq[Ox(0xf2e)] = !0x0);
        }
    }), U["setTools"]({
        'restart': !0x0,
        'pause': !0x0,
        'exitLabel': "Leave the mission"
    }), U["onExit"] = () => {
        const Oz = NX;
        ST({
            'title': Oz(0xff4),
            'body': Oz(0x9d0),
            'buttons': [{
                'label': Oz(0x303),
                'value': Oz(0x47b),
                'variant': Oz(0x2a9)
            }, {
                'label': Oz(0x7e7),
                'value': Oz(0x3cf)
            }],
            'dismiss': Oz(0x3cf)
        })[Oz(0x1101)](b4 => {
            const OA = Oz;
            b4 === OA(0x47b) && aq && (aq[OA(0xf2e)] = !0x0);
        });
    };
    let aQ = async () => {
        const OB = NX;
        mm(a7['id'], ak, aB), await Om(f[OB(0x10db)][OB(0xc89)]), aq && ai(a8, aq[OB(0xce4)]), aq?.[OB(0x114c)](), U[OB(0xf3e)](), zW(), aX();
    };
    U["onRestart"] = () => {
        const OC = NX;
        ST({
            'title': OC(0x15b7),
            'body': OC(0x8b4),
            'buttons': [{
                'label': OC(0x2e9),
                'value': OC(0x114c),
                'variant': OC(0x2a9)
            }],
            'dismiss': OC(0x1471)
        })[OC(0x1101)](b4 => {
            const OD = OC;
            b4 === OD(0x114c) && aQ();
        });
    };
    let aR = () => {
        const OE = NX;
        !aq || JT() || U[OE(0xfc7)] || aq[OE(0xce4)][OE(0x16a6)] !== 0x0 || Mt(!aC && aP ? aP + '.\x20' + aA[OE(0xf4e)] : aA[OE(0xf4e)], OE(0x5b2), {
            'label': OE(0x93d),
            'tone': OE(0x140f),
            'key': 'R',
            'onPick': () => {
                aQ();
            }
        });
    };
    Q["onPause"] = aR, Q["modalOpen"] = JT, U["onPause"] = aR;
    let aS = () => {
        const OF = NX;
        document[OF(0x6ad)] && aR();
    };
    document["addEventListener"]("visibilitychange", aS), aw = () => document["removeEventListener"]("visibilitychange", aS), az(), aq["onCallIn"] = () => {
        const OG = NX;
        let b4 = EW[OG(0x605)];
        b4 && aq && je(b4, Rm(aq[OG(0xce4)][OG(0x10fe)]()), {
            'seconds': 0x3
        });
    }, U["onCallInPress"] = b4 => {
        const OH = NX;
        if (aq) {
            if (aq[OH(0xce4)][OH(0xd97)] <= 0x0) {
                CW(b4, OH(0xea2));
                return;
            }
            Q[OH(0x1128)] ? Q[OH(0x4c8)]() : Q[OH(0x6aa)](), U[OH(0x51d)](Q[OH(0x1128)]);
        }
    }, aq["onArmCallIn"] = () => {
        const OI = NX;
        let b4 = EW[OI(0x605)];
        b4 && je(b4, Am(), {
            'sticky': !0x0
        });
    };
    let aU = b4 => ({
        'seconds': b4["time"],
        'kills': b4["kills"],
        'survived': b4["soldiers"]["filter"](b7 => b7["alive"])["length"],
        'died': b4["soldiers"]["filter"](b7 => !b7["alive"])["length"],
        'packages': b4["packages"]["filter"](b7 => b7["taken"])["length"],
        'shotsFired': b4["shotsFired"],
        'shotsHit': b4["shotsHit"],
        'incomingFired': b4["incomingFired"],
        'incomingHit': b4["incomingHit"]
    });
    aq["onResolved"] = b4 => {
        const OJ = NX;
        if (aC) {
            U[OJ(0x14c5)](null, null, aA[OJ(0x1232)] ? C3(a7['id'], b4, aA[OJ(0x1232)][OJ(0x358)]) : null), aa(a7['id'], ak, aB, b4[OJ(0x16a6)] === 0x1, aU(b4)), ua(b4[OJ(0x16a6)] === 0x1);
            return;
        }
        ai(a8, b4);
        let b7 = a8[OJ(0xc70)][a7['id']]?.[OJ(0x374)]?.[ak] ?? [],
            b8 = Gu(a8, {
                'won': b4[OJ(0x16a6)] === 0x1,
                'missionId': a7['id'],
                'missionName': aA[OJ(0xf4e)],
                'difficulty': ak,
                'time': b4[OJ(0x1558)],
                'kills': b4[OJ(0xc1d)],
                'crates': b4[OJ(0xa33)],
                'packagesFound': b4[OJ(0x1493)][OJ(0x24c)]((b9, bj) => b9[OJ(0x374)] && !b7[OJ(0x13d1)](bj) ? bj : -0x1)[OJ(0xe37)](b9 => b9 >= 0x0),
                'survived': b4[OJ(0x130a)][OJ(0xe37)](b9 => b9[OJ(0x44d)])[OJ(0x24c)](b9 => b9[OJ(0xf4e)]),
                'died': b4[OJ(0x130a)][OJ(0xe37)](b9 => !b9[OJ(0x44d)])[OJ(0x24c)](b9 => b9[OJ(0xf4e)])
            });
        U[OJ(0x14c5)](a8[OJ(0xc70)][a7['id']] ?? null, b8), aa(a7['id'], ak, aB, b4[OJ(0x16a6)] === 0x1, {
            ...aU(b4),
            'bonds': b8[OJ(0x1146)][OJ(0x4af)],
            'balance': a8[OJ(0x1146)]
        }), ua(b4[OJ(0x16a6)] === 0x1);
    }, o5, WW, ve, IW, nW;
    let aV = hT(aq["world"]);
    aV && L["centreOn"](aV, aA);
    let aX = () => {
            const OK = NX;
            MW(0x1), U[OK(0xba2)](aq[OK(0xce4)]), window[OK(0x67d)](OK(0x822), aY, !0x0), window[OK(0x67d)](OK(0x6f1), aY, !0x0);
        },
        aY = b4 => {
            const OL = NX;
            if (!aq || aq[OL(0xce4)][OL(0x16a6)] !== 0x0 || JT()) return;
            let b7 = b4[OL(0x13eb)];
            if (b7 instanceof Element && b7[OL(0x915)](OL(0xcc6))) return;
            b4[OL(0xa6e)](), b4[OL(0x169c)](), aI(), U[OL(0xf3e)](), He(f[OL(0x10db)][OL(0xc89)]), aZ();
            let b8 = Kl(aA);
            b8 && je(b8[OL(0x1262)], b8[OL(0x1524)], b8[OL(0x996)]);
        },
        aZ = () => {
            const OM = NX;
            window[OM(0x1260)](OM(0x822), aY, !0x0), window[OM(0x1260)](OM(0x6f1), aY, !0x0);
        };
    aX();
    try {
        localStorage["setItem"](uo, a7['id']);
    } catch {}
    return T1(() => {
        const ON = NX;
        let b4 = aq?.[ON(0xf2e)] ? ON(0x10c6) : aq?.[ON(0x5b5)] ? ON(0x16e0) : null;
        return b4 ? (aq && ai(a8, aq[ON(0xce4)]), aq = null, K[ON(0x1603)](null), Ze(), U[ON(0xf3e)](), U[ON(0x470)](), zW(), aZ(), G1(), aw?.(), aw = null, Q[ON(0xa27)] = null, U[ON(0x11ca)] = U[ON(0xd13)] = U[ON(0xa27)] = null, ax?.[ON(0x1526)]()[ON(0x7d8)](() => {}), ax = null, b4) : null;
    });
}
async function f_() {
    const OO = cX;
    oc();
    let j = await q3(),
        q = await yd();
    if (await V1("missions"), q["length"] === 0x0) throw new Error("no missions found in data/");
    let y = co(q),
        A = Bu(),
        C = null,
        E = null,
        F = performance["now"]();
    ic(R => (C ?? E)?.["step"](R), R => {
        const OP = OO;
        let S = performance[OP(0xb30)](),
            U = Math[OP(0x220)](0.1, (S - F) / 0x3e8);
        F = S, (C ?? E)?.[OP(0x9df)](R, U);
    });
    let H = Y3({
            'shell': j,
            'set': R => {
                E = R;
            }
        }),
        I = R => _5({
            'shell': j,
            'set': S => {
                C = S;
            },
            'info': R,
            'difficulty': N,
            'setDifficulty': S => {
                N = S;
            },
            'campaign': A,
            'campaignLevels': y
        }),
        K = R => g5({
            'shell': j,
            'set': S => {
                C = S;
            }
        }, R),
        L = R => y5({
            'shell': j,
            'set': S => {
                C = S;
            }
        }, R),
        M = () => u5({
            'shell': j,
            'set': R => {
                C = R;
            }
        });
    xm(oi()["userId"]), t0;
    let N = vd(U1),
        P = null,
        Q;
    for (;;) {
        let R = P;
        if (P = null, !R) {
            if (window["location"]["hash"] === "#arena") {
                history["replaceState"](null, '', window["location"]["pathname"]), await Es(), H["stop"](), await M();
                continue;
            }
            let S = null;
            try {
                S = localStorage["getItem"](uo);
            } catch {
                S = null;
            }
            wo(), await V1("ready"), Es()["then"](() => H["start"]());
            let U = await Jf(q, S, N, V => {
                N = V, zt(U1, V);
            }, A, Q);
            if (Q = void 0x0, H["stop"](), "skirmish" in U) {
                await K(U["skirmish"]);
                continue;
            }
            if ("net" in U) {
                await L(U["net"]), Q = "lobby";
                continue;
            }
            if (N = U["difficulty"], R = q["find"](V => V['id'] === U['id']) ?? null, !R) continue;
        }
        if (await n0(A, y) === "armoury") {
            Q = "armoury";
            continue;
        }
        if (await I(R) === "next") {
            let V = y["findIndex"](X => X['id'] === R['id']);
            P = V >= 0x0 ? y[V + 0x1] ?? null : null;
        }
    }
}
f_()["catch"](c => {
    const OQ = cX;
    console["error"](c), Zl(c);
    let d = document["getElementById"]("overlay"),
        g = document["getElementById"]("overlay-title"),
        i = document["getElementById"]("overlay-sub");
    d && g && i && (d["hidden"] = !0x1, g["textContent"] = "Error", i["textContent"] = c instanceof Error ? c["message"] : String(c));
