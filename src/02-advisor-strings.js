// Advisor/comms lines & key labels
// Loading-screen quips (`il`), key-name mapping, input label helpers.
        ...nl,
        ...ol
    },
    il = ["Stand by. The war is being loaded. Apparently this is normal.", "I have been waiting since 1961. You can manage a few seconds.", "The paperwork is done. I did most of it myself, which explains the delay.", "The sandbags are genuine. The bags, certainly. I have not inspected the sand.", "I asked the machine to hurry. It did not answer, which I took as professionalism.", "The trees are not real. I mention this now to avoid complaints later.", "There is a map. Trees, huts, and a worrying number of small men.", "This is the part of the war where nothing happens. Most of it, in my experience.", "The tea is on. Not for you. You are going to the front.", "I planned this operation on the back of an envelope. The front was already occupied.", "The enemy have huts. We have this screen. I make that roughly even.", "Nobody at headquarters has died of waiting. I checked the records.", "You will be issued a rifle, a name, and a line in the ledger. Try not to alter the ledger.", "The music is the only thing we did not make ourselves. I insisted on standards somewhere.", "I once waited nine days for a boat. It arrived as a lorry. Nobody seemed concerned.", "It is not stuck. I have been assured. I was assured about the boat too.", "The men are being named. They have no say in the matter, which speeds things up.", "Somewhere a very small man is being painted green. One must allow for drying time.", "There will be a briefing. I wrote it. The beginning is sound.", "The war waits until you are ready. The enemy have not agreed to this arrangement.", "You will be given six men. Do not get attached. I always do, which is tiresome.", "The ground is being painted one patch at a time. Unfortunately there is quite a lot of it.", "I have a chair. I mention this so you know somebody is comfortable.", "The huts are made of wood. The men inside are a separate department.", "A brief delay. \"Brief\" is a military term meaning as long as necessary.", "I have signed for all of this. Nothing is to go missing until someone else signs for it."],
    W1 = {
        'wasd': {
            'label': "WASD",
            'codes': ["KeyW", "KeyS", "KeyA", "KeyD"]
        },
        'arrows': {
            'label': "ARROWS",
            'codes': ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
        },
        'ijkl': {
            'label': "IJKL",
            'codes': ["KeyI", "KeyK", "KeyJ", "KeyL"]
        }
    },
    Hr = ["wasd", "arrows", "ijkl"],
    rl = c => Hr[(Hr["indexOf"](c) + 0x1) % Hr["length"]],
    Se = {
        'march': "MOVE SQUAD",
        'pan': "MOVE SCREEN"
    },
    Rt = {
        'march': "wasd",
        'pan': "arrows",
        'fire': 'f',
        'grenade': 'g',
        'pause': "escape"
    },
    G5 = ["marchUp", "marchDown", "marchLeft", "marchRight"],
    V5 = ["panUp", "panDown", "panLeft", "panRight"];

function sl(c) {
    const cY = cX;
    let d = {
        ...Rt
    };
    if (!c || typeof c != "object") return d;
    let g = c,
        i = j => typeof j == "string" && j in W1 ? j : null;
    d["march"] = i(g["march"]) ?? d["march"], d["pan"] = i(g["pan"]) ?? d["pan"], d["pan"] === d["march"] && (d["pan"] = d["march"] === "arrows" ? "wasd" : "arrows");
    for (let j of ["fire", "grenade", "pause"]) {
        let l = g[j];
        typeof l == "string" && l["length"] > 0x0 && l["length"] <= 0xc && (d[j] = l["toLowerCase"]());
    }
    return d;
}
var Gr = c => ({
    '\x20': "SPACE",
    'escape': "ESC",
    'arrowup': 'UP',
    'arrowdown': "DOWN",
    'arrowleft': "LEFT",
    'arrowright': "RIGHT",
    'enter': "ENTER",
    'tab': "TAB"
} [c] ?? c["toUpperCase"]());

function jt(c) {
    const cZ = cX;
    let d = new Map(),
        g = new Map();
    return W1[c["march"]]["codes"]["forEach"]((i, j) => d["set"](i, G5[j])), W1[c["pan"]]["codes"]["forEach"]((i, j) => d["set"](i, V5[j])), g["set"](c["fire"], "fire"), g["set"](c["grenade"], "grenade"), g["set"](c["pause"], "pause"), {
        'byCode': d,
        'byKey': g,
        'label': i => i === "march" || i === "pan" ? W1[c[i]]["label"] : Gr(c[i])
    };
}
var al = "cf.settings",
    qr = {
        'zoomBias': 0x0,
        'edgeScroll': !0x0,
        'sound': !0x0,
        'music': !0x0,
        'volume': 0.35,
        'musicVolume': 0.5,
        'haptics': !0x0,
        'handedness': "right",
        'resolution': "full",
        'crisp': !0x1,
        'reducedMotion': null,
        'rules': "classic",
        'autoFire': !0x0,
        'blood': "normal",
        'arenaLockCamera': !0x1,
        'arenaShowScore': !0x0,
        'keys': Rt
    },
    GW = {
        ...qr
    },
    Vr = new Set();

function q5(c) {
    const d7 = cX;
    let d = {
        ...qr
    };
    if (typeof c != "object" || c === null) return d;
    let g = c;
    return typeof g["zoomBias"] == "number" && (d["zoomBias"] = Math["max"](-0x1, Math["min"](0x1, Math["round"](g["zoomBias"])))), typeof g["edgeScroll"] == "boolean" && (d["edgeScroll"] = g["edgeScroll"]), typeof g["sound"] == "boolean" && (d["sound"] = g["sound"]), typeof g["music"] == "boolean" && (d["music"] = g["music"]), typeof g["volume"] == "number" && (d["volume"] = Math["max"](0x0, Math["min"](0x1, g["volume"]))), typeof g["musicVolume"] == "number" && (d["musicVolume"] = Math["max"](0x0, Math["min"](0x1, g["musicVolume"]))), typeof g["haptics"] == "boolean" && (d["haptics"] = g["haptics"]), (g["handedness"] === "left" || g["handedness"] === "right") && (d["handedness"] = g["handedness"]), (g["resolution"] === "half" || g["resolution"] === "full") && (d["resolution"] = g["resolution"]), typeof g["crisp"] == "boolean" && (d["crisp"] = g["crisp"]), (typeof g["reducedMotion"] == "boolean" || g["reducedMotion"] === null) && (d["reducedMotion"] = g["reducedMotion"]), (g["rules"] === "modern" || g["rules"] === "classic") && (d["rules"] = g["rules"]), typeof g["autoFire"] == "boolean" && (d["autoFire"] = g["autoFire"]), (g["blood"] === "none" || g["blood"] === "normal" || g["blood"] === "carnage") && (d["blood"] = g["blood"]), typeof g["arenaLockCamera"] == "boolean" && (d["arenaLockCamera"] = g["arenaLockCamera"]), typeof g["arenaShowScore"] == "boolean" && (d["arenaShowScore"] = g["arenaShowScore"]), d["keys"] = sl(g["keys"]), d;
}

function ll() {
    const d8 = cX;
    try {
        let c = localStorage["getItem"](al);
        GW = q5(c ? JSON["parse"](c) : null);
    } catch {
        GW = {
            ...qr
        };
    }
    return GW;
}
var G = () => GW;

function mW(c) {
    const d9 = cX;
    GW = {
        ...GW,
        ...c
    };
    try {
        localStorage["setItem"](al, JSON["stringify"](GW));
    } catch {}
    for (let d of Vr) d(GW);
    return GW;
}

function A1(c) {
    const dj = cX;
    return Vr["add"](c), () => Vr["delete"](c);
}

function e1() {
    const dk = cX;
    if (GW["reducedMotion"] !== null) return GW["reducedMotion"];
    try {
        return window["matchMedia"]("(prefers-reduced-motion: reduce)")["matches"];
    } catch {
        return !0x1;
    }
}
var It = null;

function U5() {
    const dq = cX;
    if (It !== null) return It;
    try {
        let c = navigator["userAgentData"]?.["platform"] ?? navigator["platform"] ?? '';
        It = /mac|iphone|ipad|ipod/i ["test"](c);
    } catch {
        It = !0x1;
    }
    return It;
}

function R1() {
    const dw = cX;
    let c = U5(),
        d = jt(G()["keys"]);
    return [{
        'action': Se["march"]["toLowerCase"](),
        'keys': "CLICK  or  " + d["label"]("march")
    }, {
        'action': "fire",
        'keys': c ? d["label"]("fire") + "  or  CTRL+CLICK" : "RIGHT CLICK  or  " + d["label"]("fire")
    }, {
        'action': "grenade",
        'keys': c ? d["label"]("grenade") : "MIDDLE CLICK  or  " + d["label"]("grenade")
    }, {
        'action': "pause",
        'keys': d["label"]("pause") + "  or  P"
    }, {
        'action': Se["pan"]["toLowerCase"](),
        'keys': d["label"]("pan")
    }];
}
var Z = (c, d, g, i, j = {}) => ({
        'id': c,
        'name': d,
        'color': g,
        'speckle': i,
        'solid': !0x1,
        'blocksSight': !0x1,
        'blocksShots': !0x1,
        'lowWall': !0x1,
        'wade': !0x1,
        'swim': !0x1,
        'concealment': 0x1,
        'speed': 0x1,
        'slippery': !0x1,
        'canopy': !0x1,
        'sway': !0x1,
        ...j
    }),
    TT = {
        0x20: Z(0x20, "shell crater", "#584627", "#6d5833", {
            'speed': f["mud"]["speed"]
        }),
        0x21: Z(0x21, "broken brick wall", "#70502c", "#a08048", {
            'solid': !0x0,
            'blocksSight': !0x0,
            'blocksShots': !0x0
        }),
        0x22: Z(0x22, "anti-tank hedgehog", "#4e5540", "#7c8164", {
            'solid': !0x0,
            'blocksShots': !0x0
        }),
        0x23: Z(0x23, "broken barricade", "#70502c", "#a08048", {
            'solid': !0x0,
            'blocksShots': !0x0
        }),
        0x24: Z(0x24, "tank wreck", "#4e5540", "#7c8164", {
            'solid': !0x0,
            'blocksSight': !0x0,
            'blocksShots': !0x0
        }),
        0x25: Z(0x25, "abandoned field gun", "#4e5540", "#7c8164", {
            'solid': !0x0,
            'blocksSight': !0x0,
            'blocksShots': !0x0
        }),
        0x26: Z(0x26, "empty jerry cans", "#4e5540", "#7c8164"),
        0x27: Z(0x27, "spent ammunition", "#70502c", "#a08048"),
        0x28: Z(0x28, "broken field radio", "#4e5540", "#7c8164"),
        0x1f: Z(0x1f, "truck wreck", "#4e5540", "#7c8164", {
            'solid': !0x0,
            'blocksSight': !0x0,
            'blocksShots': !0x0
        }),
        0x13: Z(0x13, "mud", "#584627", "#6d5833", {
            'speed': f["mud"]["speed"]
        }),
        0x14: Z(0x14, "boulder", "#6b6f66", "#7b8076", {
            'solid': !0x0,
            'blocksSight': !0x0,
            'blocksShots': !0x0
        }),
        0x15: Z(0x15, "fallen log", "#7a6440", "#6a5636", {
            'solid': !0x0,
            'blocksSight': !0x0,
            'blocksShots': !0x0
        }),
        0x16: Z(0x16, "sandbags", "#a5924f", "#b6a15c", {
            'solid': !0x0,
            'blocksShots': !0x0,
            'lowWall': !0x0
        }),
        0x17: Z(0x17, "bush", "#3f6b28", "#4c7d31"),
        0x18: Z(0x18, "fern", "#3f6b28", "#4c7d31"),
        0x19: Z(0x19, "mushrooms", "#8d5a2b", "#b6a15c"),
        0x1a: Z(0x1a, "branches", "#7a6440", "#6a5636"),
        0x1b: Z(0x1b, "stump", "#7a6440", "#6a5636"),
        0x1c: Z(0x1c, "debris", "#5c5348", "#6a6055"),
        0x1d: Z(0x1d, "cold campfire", "#5c5348", "#6a6055"),
        0x1e: Z(0x1e, "signpost", "#7a6440", "#6a5636"),
        0x0: Z(0x0, "grass", "#4a7a2c", "#578a33"),
        0x1: Z(0x1, "sand", "#a5924f", "#b6a15c"),
        0xb: Z(0xb, "road", "#8d8574", "#9c9483", {
            'speed': 1.18
        }),
        0x2: Z(0x2, "tree", "#3d6624", "#345a1e", {
            'solid': !0x0,
            'blocksSight': !0x0,
            'blocksShots': !0x0,
            'canopy': !0x0,
            'sway': !0x0
        }),
        0x5: Z(0x5, "rock", "#6b6f66", "#7b8076", {
            'solid': !0x0,
            'blocksSight': !0x0,
            'blocksShots': !0x0,
            'canopy': !0x0
        }),
        0x6: Z(0x6, "hut", "#8d5a2b", "#7c4e24", {
            'solid': !0x0,
            'blocksSight': !0x0,
            'blocksShots': !0x0,
            'canopy': !0x0
        }),
        0x12: Z(0x12, "allied hut", "#4a6a24", "#3f5c1e", {
            'solid': !0x0,
            'blocksSight': !0x0,
            'blocksShots': !0x0,
            'canopy': !0x0
        }),
        0x10: Z(0x10, "outpost", "#6a6a5e", "#7a7a6c", {
            'solid': !0x0,
            'blocksSight': !0x0,
            'blocksShots': !0x0
        }),
        0x11: Z(0x11, "bunker", "#5c5f55", "#6b6e63", {
            'solid': !0x0,
            'blocksSight': !0x0,
            'blocksShots': !0x0
        }),
        0xe: Z(0xe, "factory", "#6d6f74", "#5e6065", {
            'solid': !0x0,
            'blocksSight': !0x0,
            'blocksShots': !0x0,
            'canopy': !0x0
        }),
        0xc: Z(0xc, "fence", "#7a6440", "#6a5636", {
            'solid': !0x0,
            'blocksShots': !0x0
        }),
        0xd: Z(0xd, "rubble", "#5c5348", "#6a6055", {
            'speed': 0.8
        }),
        0x3: Z(0x3, "water", "#2f6d92", "#3a7ea6", {
            'wade': !0x0,
            'speed': 0.45
        }),
        0x7: Z(0x7, "deep water", "#1d4665", "#245478", {
            'solid': !0x0,
            'swim': !0x0,
            'wade': !0x0,
            'speed': 0.34,
            'concealment': 0.35
        }),
        0x4: Z(0x4, "bridge", "#8a6c3f", "#7a5f37"),
        0x8: Z(0x8, "tall grass", "#3f6b28", "#4c7d31", {
            'blocksSight': !0x0,
            'speed': 0.82,
            'sway': !0x0,
            'concealment': 0.35
        }),
        0x29: Z(0x29, "long grass", "#2f5a1e", "#3b6a26", {
            'blocksSight': !0x0,
            'speed': 0.72,
            'sway': !0x0,
            'concealment': 0.2
        }),
        0x9: Z(0x9, "quicksand", "#8a7a44", "#7a6b3a", {
            'speed': 0.24,
            'wade': !0x0
        }),
        0xa: Z(0xa, "ice", "#c3dbe6", "#d5e8f0", {
            'slippery': !0x0,
            'speed': 1.08
        }),
        0xf: Z(0xf, "tent", "#c9c2ac", "#b8b19b")
    },
    Ur = {
        'q': 0x20,
        'R': 0x21,
        'Y': 0x22,
        'L': 0x23,
        'D': 0x24,
        'a': 0x25,
        'J': 0x26,
        'M': 0x27,
        'N': 0x28,
        'V': 0x1f,
        ';': 0x13,
        'r': 0x14,
        'l': 0x15,
        'b': 0x16,
        'v': 0x17,
        'f': 0x18,
        'm': 0x19,
        'j': 0x1a,
        's': 0x1b,
        'd': 0x1c,
        'z': 0x1d,
        't': 0x1e,
        '.': 0x0,
        ',': 0x1,
        '_': 0xb,
        'T': 0x2,
        '~': 0x3,
        'W': 0x7,
        '=': 0x4,
        '#': 0x5,
        'h': 0x6,
        'F': 0xe,
        '+': 0xc,
        '\x22': 0x8,
        '^': 0x29,
        '%': 0x9,
        'i': 0xa,
        ':': 0xd,
        'A': 0xf,
        'O': 0x10,
        'U': 0x11,
        'G': 0x12
    },
    cl = {
        'P': 0x0,
        'Q': 0x0,
        'E': 0x0,
        'S': 0x0,
        'B': 0x0,
        'c': 0x0,
        'o': 0x0,
        '*': 0x0,
        'p': 0x0,
        'k': 0x0,
        '$': 0x0,
        'C': 0x0,
        'H': 0x0,
        'n': 0x0,
        'X': 0x0
    },
    $5 = {
        'jungle': {},
        'desert': {
            0x0: ["#b4a065", "#c1ad72"],
            0x1: ["#d3bd7f", "#e0cb8e"],
            0x8: ["#93884a", "#a29656"],
            0x29: ["#7f7440", "#8e824c"],
            0x2: ["#5c7a35", "#4a6529"],
            0x5: ["#8a7d63", "#9a8d73"]
        },
        'arctic': {
            0x0: ["#dae6ec", "#e8f1f5"],
            0x1: ["#c2ced6", "#d0dbe2"],
            0x8: ["#a9bcc4", "#b8c9d0"],
            0x29: ["#95aab3", "#a5b8c0"],
            0x2: ["#2e5240", "#264636"],
            0x5: ["#8f9aa2", "#9faab2"],
            0xb: ["#a8b3ba", "#b6c0c6"]
        }
    };

function dl(c) {
    const dx = cX;
    let d = $5[c] ?? {},
        g = {};
    for (let i of Object["keys"](TT)) {
        let j = Number(i),
            l = d[j];
        g[j] = l ? {
            'color': l[0x0],
            'speckle': l[0x1]
        } : {
            'color': TT[j]["color"],
            'speckle': TT[j]["speckle"]
        };
    }
    return g;
}
var D = {
        'Player': 0x0,
        'Enemy': 0x1
    },
    j1 = 0x2,
    nW = (c => (c[c["Idle"] = 0x0] = "Idle", c[c["Patrol"] = 0x1] = "Patrol", c[c["Alert"] = 0x2] = "Alert", c[c["Engage"] = 0x3] = "Engage", c[c["Investigate"] = 0x4] = "Investigate", c[c["Advance"] = 0x5] = "Advance", c))(nW || {}),
    IW = (c => (c[c["Rifle"] = 0x0] = "Rifle", c[c["Sniper"] = 0x1] = "Sniper", c[c["Bazooka"] = 0x2] = "Bazooka", c[c["Officer"] = 0x3] = "Officer", c))(IW || {}),
    I1 = c => c["kind"] === "chicken";

function z(c, d, g) {
    const dz = cX;
    return d < 0x0 || g < 0x0 || d >= c["width"] || g >= c["height"] ? 0x2 : c["grid"][g * c["width"] + d];
}

function oW(c, d, g) {
    const dA = cX;
    return z(c, Math["floor"](d / c["tile"]), Math["floor"](g / c["tile"]));
}
var Pt = (c, d, g) => TT[z(c, d, g)]["solid"],
    Ee = (c, d, g) => TT[oW(c, d, g)],
    $r = (c, d, g, i) => {
        const dB = cX;
        d >= 0x0 && g >= 0x0 && d < c["width"] && g < c["height"] && (c["grid"][g * c["width"] + d] = i);
    },
    Kr = c => {
        const dC = cX;
        c["grid"]["set"](c["pristine"]);
    };

function ul(j, q, y, A) {
    const dD = cX;
    let C = j["tile"],
        E = Math["floor"](q['x'] / C),
        F = Math["floor"](q['y'] / C),
        H = Math["floor"](y['x'] / C),
        I = Math["floor"](y['y'] / C);
    if (E === H && F === I) return !0x0;
    let K = y['x'] - q['x'],
        L = y['y'] - q['y'],
        M = K > 0x0 ? 0x1 : -0x1,
        N = L > 0x0 ? 0x1 : -0x1,
        P = K === 0x0 ? 0x1 / 0x0 : Math["abs"](C / K),
        Q = L === 0x0 ? 0x1 / 0x0 : Math["abs"](C / L),
        R = K === 0x0 ? 0x1 / 0x0 : ((E + (M > 0x0 ? 0x1 : 0x0)) * C - q['x']) / K,
        S = L === 0x0 ? 0x1 / 0x0 : ((F + (N > 0x0 ? 0x1 : 0x0)) * C - q['y']) / L;
    for (let U = 0x0; U < 0x2000; U++) {
        if (R < S) {
            if (R > 0x1) return !0x0;
            R += P, E += M;
        } else {
            if (S > 0x1) return !0x0;
            S += Q, F += N;
        }
        if (E === H && F === I) return !0x0;
        let V = TT[z(j, E, F)];
        if (A === "sight") {
            if (V["blocksSight"]) return !0x1;
        } else {
            if (V["blocksShots"] && !(V["lowWall"] && K5(q, E, F, C))) return !0x1;
        }
    }
    return !0x0;
}
var K5 = (c, d, g, i) => Math["hypot"]((d + 0.5) * i - c['x'], (g + 0.5) * i - c['y']) <= f["cover"]["overReach"],
    kW = (c, d, g) => ul(c, d, g, "sight"),
    PW = (c, d, g) => ul(c, d, g, "shots");

function uT(c, d, g = 0x18) {
    const dE = cX;
    let j = Math["floor"](d['x'] / c["tile"]),
        l = Math["floor"](d['y'] / c["tile"]);
    if (!Pt(c, j, l)) return {
        'x': d['x'],
        'y': d['y']
    };
    for (let m = 0x1; m <= g; m++)
        for (let p = -m; p <= m; p++)
            for (let q = -m; q <= m; q++) {
                if (Math["max"](Math["abs"](q), Math["abs"](p)) !== m) continue;
                let u = j + q,
                    v = l + p;
                if (!Pt(c, u, v)) return {
                    'x': (u + 0.5) * c["tile"],
                    'y': (v + 0.5) * c["tile"]
                };
            }
    return {
        'x': d['x'],
        'y': d['y']
    };
}

function ml(g, j) {
    const dF = cX;
    if (g["mainland"]) return g["mainland"];
    let {
        width: p,
        height: q
    } = g, v = new Uint8Array(p * q), y = new Uint8Array(p * q);
    for (let F of g["buildings"])
        for (let [H, I] of F["tiles"]) H >= 0x0 && I >= 0x0 && H < p && I < q && (y[I * p + H] = 0x1);
    let A = (K, L) => {
            const dG = dF;
            if (K < 0x0 || L < 0x0 || K >= p || L >= q) return !0x0;
            if (y[L * p + K]) return !0x1;
            let M = TT[z(g, K, L)];
            return M[dG(0x226)] && !M[dG(0xb8e)];
        },
        C = {
            'x': Math["floor"](j['x'] / g["tile"]),
            'y': Math["floor"](j['y'] / g["tile"])
        };
    if (A(C['x'], C['y'])) return v;
    let E = [C];
    for (v[C['y'] * p + C['x']] = 0x1; E["length"] > 0x0;) {
        let {
            x: K,
            y: L
        } = E["pop"]();
        for (let [M, N] of z5) {
            let P = K + M,
                Q = L + N;
            A(P, Q) || v[Q * p + P] || (v[Q * p + P] = 0x1, E["push"]({
                'x': P,
                'y': Q
            }));
        }
    }
    return g["mainland"] = v, v;
}
var z5 = [
    [0x1, 0x0],
    [-0x1, 0x0],
    [0x0, 0x1],
    [0x0, -0x1]
];

function zr(c, d, g, j = 0x18) {
    const dH = cX;
    let m = ml(c, g);
    if (m["length"] === 0x0 || !m["some"](v => v === 0x1)) return uT(c, d, j);
    let p = Math["floor"](d['x'] / c["tile"]),
        q = Math["floor"](d['y'] / c["tile"]),
        u = (v, y) => v >= 0x0 && y >= 0x0 && v < c["width"] && y < c["height"] && m[y * c["width"] + v] === 0x1;
    if (u(p, q)) return {
        'x': d['x'],
        'y': d['y']
    };
    for (let v = 0x1; v <= j; v++)
        for (let y = -v; y <= v; y++)
            for (let A = -v; A <= v; A++)
                if (Math["max"](Math["abs"](A), Math["abs"](y)) === v && u(p + A, q + y)) return {
                    'x': (p + A + 0.5) * c["tile"],
                    'y': (q + y + 0.5) * c["tile"]
                };
    return uT(c, d, j);
}

function pl(j) {
    const dI = cX;
    let q = new Uint8Array(j["width"] * j["height"]),
        A = [];
    for (let C = 0x0; C < j["height"]; C++)
        for (let E = 0x0; E < j["width"]; E++) {
            let F = z(j, E, C);
            if (F !== 0x6 && F !== 0xe && F !== 0x10 && F !== 0x11 && F !== 0x12 || q[C * j["width"] + E]) continue;
            let H = [],
                I = [
                    [E, C]
                ];
            q[C * j["width"] + E] = 0x1;
            let K = E,
                L = C,
                M = E,
                N = C;
            for (; I["length"];) {
                let [R, S] = I["pop"]();
                H["push"]([R, S]), K = Math["min"](K, R), L = Math["min"](L, S), M = Math["max"](M, R), N = Math["max"](N, S);
                for (let [U, V] of [
                        [0x1, 0x0],
                        [-0x1, 0x0],
                        [0x0, 0x1],
                        [0x0, -0x1]
                    ]) {
                    let X = R + U,
                        Y = S + V;
                    X < 0x0 || Y < 0x0 || X >= j["width"] || Y >= j["height"] || q[Y * j["width"] + X] || z(j, X, Y) !== F || (q[Y * j["width"] + X] = 0x1, I["push"]([X, Y]));
                }
            }
            let P = F === 0xe ? "factory" : F === 0x10 ? "outpost" : F === 0x11 ? "bunker" : "hut",
                Q = F === 0x12 || F === 0x10 || F === 0x11 ? D["Player"] : D["Enemy"];
            A["push"]({
                'kind': P,
                'owner': Q,
                'role': P === "outpost" || P === "bunker" ? "protect" : "spawner",
                'tiles': H,
                'centre': {
                    'x': ((K + M) / 0x2 + 0.5) * j["tile"],
                    'y': ((L + N) / 0x2 + 0.5) * j["tile"]
                },
                'x0': K,
                'y0': L,
                'w': M - K + 0x1,
                'h': N - L + 0x1
            });
        }
    return A;
}

function fl(g) {
    const dJ = cX;
    let j = new Uint8Array(g["width"] * g["height"]),
        q = [];
    for (let v = 0x0; v < g["height"]; v++)
        for (let y = 0x0; y < g["width"]; y++) {
            if (z(g, y, v) !== 0xf || j[v * g["width"] + y]) continue;
            let A = [
                [y, v]
            ];
            j[v * g["width"] + y] = 0x1;
            let C = y,
                E = v,
                F = y,
                H = v;
            for (; A["length"];) {
                let [I, K] = A["pop"]();
                C = Math["min"](C, I), E = Math["min"](E, K), F = Math["max"](F, I), H = Math["max"](H, K);
                for (let [L, M] of [
                        [0x1, 0x0],
                        [-0x1, 0x0],
                        [0x0, 0x1],
                        [0x0, -0x1]
                    ]) {
                    let N = I + L,
                        P = K + M;
                    N < 0x0 || P < 0x0 || N >= g["width"] || P >= g["height"] || j[P * g["width"] + N] || z(g, N, P) !== 0xf || (j[P * g["width"] + N] = 0x1, A["push"]([N, P]));
                }
            }
            q["push"]({
                'x': ((C + F) / 0x2 + 0.5) * g["tile"],
                'y': ((E + H) / 0x2 + 0.5) * g["tile"],
                'pad': (Math["max"](F - C, H - E) + 0x1) * g["tile"] / 0x2
            });
        }
    return q;
}
var Y5 = 0x4;

function hl(c, d) {
    const dK = cX;
    let g = c["buildings"]["filter"](i => i["kind"] === "bunker");
    return g["length"] === 0x0 ? d : d["map"](j => {
        const dL = dK;
        if (j[dL(0xde2)] !== 0x0) return j;
        let p = Math[dL(0x7a7)](j['x'] / c[dL(0x158f)]),
            q = Math[dL(0x7a7)](j['y'] / c[dL(0x158f)]),
            v = null;
        for (let y of g) {
            let A = y[dL(0x698)][dL(0x24c)](([L]) => L),
                C = y[dL(0x698)][dL(0x24c)](([, L]) => L),
                E = Math[dL(0x220)](...A),
                F = Math[dL(0xbba)](...A),
                H = Math[dL(0x220)](...C),
                I = Math[dL(0xbba)](...C),
                K = Math[dL(0xbba)](Math[dL(0xbba)](E - p, 0x0, p - F), Math[dL(0xbba)](H - q, 0x0, q - I));
            K > Y5 || v && v['d'] <= K || (v = {
                'd': K,
                'zone': {
                    'x': ((E + F) / 0x2 + 0.5) * c[dL(0x158f)],
                    'y': ((H + I) / 0x2 + 0.5) * c[dL(0x158f)],
                    'pad': (Math[dL(0xbba)](F - E, I - H) + 0x1) * c[dL(0x158f)] / 0x2
                }
            });
        }
        return v ? v[dL(0x13cd)] : j;
    });
}
var Yr = {
    0x1f: "truck wreck (V)",
    0x24: "tank wreck (D)",
    0x25: "field gun (a)",
    0x20: "shell crater (q)"
};

function gl(c, d, g) {
    const dM = cX;
    let j = new Set();
    for (let l = 0x0; l < g; l++)
        for (let m = 0x0; m < d; m++) {
            let p = l * d + m,
                q = c[p],
                u = Yr[q];
            if (!u || j["has"](p)) continue;
            let v = [p, p + 0x1, p + d, p + d + 0x1];
            if (m + 0x1 >= d || l + 0x1 >= g || v["some"](y => c[y] !== q || j["has"](y))) throw new Error(u + " at " + m + ',' + l + " must be a 2x2 block");
            if (m > 0x0 && c[p - 0x1] === q || l > 0x0 && c[p - d] === q) throw new Error(u + " at " + m + ',' + l + " needs a gap from the next object");
            v["forEach"](y => j["add"](y));
        }
}
var QW = {
        'rookie': {
            'id': "rookie",
            'name': "Rookie",
            'blurb': "They shoot slowly and badly, but a shot nearby brings a neighbour looking.",
            'levers': {
                'spread': 1.4,
                'fireInterval': 1.4,
                'aggro': 1.05,
                'reaction': 1.3,
                'speed': 0.95,
                'fireRange': 0.95,
                'extraEnemies': 0.25,
                'spawnInterval': 1.7,
                'maxSpawned': 0x2,
                'waveSize': 0.7,
                'hearing': 0x5f,
                'hunters': 0.15,
                'rushers': 0x0,
                'grenadiers': 0x0,
                'flank': 0x0,
                'camo': 0x0,
                'wander': 0.85,
                'teamwork': 0x0,
                'triggerHappy': 0x0,
                'foresight': 0x5a,
                'vision': 0x0,
                'concealment': 0x1,
                'grenades': 0x0,
                'predictable': 0x1
            }
        },
        'veteran': {
            'id': "veteran",
            'name': "Veteran",
            'blurb': "They hunt you across the map, flank hard, and the huts keep feeding. No fog.",
            'levers': {
                'spread': 1.05,
                'fireInterval': 0.76,
                'aggro': 1.25,
                'reaction': 0.68,
                'speed': 1.12,
                'fireRange': 1.12,
                'extraEnemies': 0x1,
                'spawnInterval': 0.66,
                'maxSpawned': 0x4,
                'waveSize': 1.1,
                'hearing': 0xdc,
                'hunters': 0.55,
                'rushers': 0.3,
                'grenadiers': 0.12,
                'flank': 0.55,
                'camo': 0.32,
                'wander': 1.15,
                'teamwork': 0x0,
                'triggerHappy': 0x0,
                'foresight': 0xb4,
                'vision': 0x0,
                'concealment': 0.85,
                'grenades': 0x0,
                'predictable': 0x1
            }
        },
        'elite': {
            'id': "elite",
            'name': "Elite",
            'blurb': "Thick fog. They swarm, they flank, and they throw grenades.",
            'levers': {
                'spread': 0.72,
                'fireInterval': 0.61,
                'aggro': 1.41,
                'reaction': 0.49,
                'speed': 1.2,
                'fireRange': 1.2,
                'extraEnemies': 1.75,
                'spawnInterval': 0.56,
                'maxSpawned': 0x5,
                'waveSize': 1.33,
                'hearing': 0x109,
                'hunters': 0.76,
                'rushers': 0.46,
                'grenadiers': 0.3,
                'flank': 0.71,
                'camo': 0.4,
                'wander': 1.22,
                'teamwork': 0x0,
                'triggerHappy': 0x0,
                'foresight': 0xeb,
                'vision': 0xf5,
                'concealment': 0.73,
                'grenades': 0x0,
                'predictable': 0x1
            }
        }
    },
    qT = ["rookie", "veteran", "elite"],
    P1 = c => qT["includes"](c),
    X5 = {
        'garrison': {
            'id': "garrison",
            'name': "Garrison",
            'blurb': "Dug in. They hold what they have and make you come to them.",
            'mod': {
                'hunters': 0.35,
                'rushers': 0.4,
                'aggro': 1.1,
                'hearing': 0.8,
                'flank': 0.6,
                'vision': 1.15
            }
        },
        'patrol': {
            'id': "patrol",
            'name': "Patrols",
            'blurb': "Roving pickets. Contact spreads quickly once the first shot goes off.",
            'mod': {
                'hearing': 1.25,
                'hunters': 1.1,
                'speed': 1.06
            }
        },
        'hunters': {
            'id': "hunters",
            'name': "Hunters",
            'blurb': "They abandon their posts to find you. Standing still is not an option.",
            'mod': {
                'hunters': 1.8,
                'hearing': 1.5,
                'speed': 1.12,
                'rushers': 1.4,
                'aggro': 1.15
            }
        },
        'ambush': {
            'id': "ambush",
            'name': "Ambush",
            'blurb': "Quiet until you are close, then fast and accurate.",
            'mod': {
                'aggro': 0.62,
                'reaction': 0.55,
                'spread': 0.7,
                'hearing': 0.6,
                'rushers': 1.5,
                'hunters': 0.5,
                'vision': 0.8
            }
        },
        'arena-red': {
            'id': "arena-red",
            'name': "Red Assault",
            'blurb': "Numbers and speed. They close, and they keep closing.",
            'mod': {
                'hunters': 0x4,
                'hearing': 2.2,
                'aggro': 1.34,
                'rushers': 2.2,
                'flank': 0.5,
                'grenadiers': 0x4,
                'speed': 1.06,
                'spread': 0.98,
                'fireRange': 1.04,
                'camo': 0x0,
                'vision': 0x0,
                'extraEnemies': 0x0,
                'concealment': 0x1,
                'teamwork': 0.8,
                'maxSpawned': 2.6,
                'spawnInterval': 0.42
            }
        },
        'arena-green': {
            'id': "arena-green",
            'name': "Green Manoeuvre",
            'blurb': "Wider, slower, and around the side of you.",
            'mod': {
                'hunters': 0x4,
                'hearing': 2.2,
                'aggro': 1.34,
                'rushers': 0.7,
                'flank': 1.8,
                'grenadiers': 0x4,
                'speed': 0x1,
                'spread': 0.94,
                'fireRange': 1.06,
                'camo': 0x0,
                'vision': 0x0,
                'extraEnemies': 0x0,
                'teamwork': 0.8,
                'concealment': 0x1,
                'maxSpawned': 2.6,
                'spawnInterval': 0.42
            }
        },
        'horde': {
            'id': "horde",
            'name': "Horde",
            'blurb': "All of them, at once, at you. They do not stop and they do not shoot.",
            'mod': {
                'hunters': 0x4,
                'rushers': 0x4,
                'hearing': 2.5,
                'aggro': 1.4,
                'speed': 1.15,
                'grenadiers': 0x0,
                'camo': 0x0,
                'flank': 0x0
            }
        },
        'swarm': {
            'id': "swarm",
            'name': "Swarm",
            'blurb': "Many, close, and careless. They will trade lives to reach you.",
            'mod': {
                'extraEnemies': 0x2,
                'rushers': 1.8,
                'spread': 1.35,
                'fireInterval': 1.2,
                'speed': 1.1,
                'spawnInterval': 0.7,
                'maxSpawned': 1.5,
                'hunters': 1.3
            }
        }
    };

function Lt(c, d) {
    const dN = cX;
    let g = QW[c]["levers"],
        j = X5[d]["mod"],
        l = {
            ...g
        };
    for (let m of Object["keys"](j)) {
        let p = j[m];
        if (p !== void 0x0) {
            if (m === "teamwork") {
                l["teamwork"] = p;
                continue;
            }
            l[m] = g[m] * p;
        }
    }
    return l["hunters"] = Math["min"](0x1, l["hunters"]), l["rushers"] = Math["min"](0x1, l["rushers"]), l["grenadiers"] = Math["min"](0x1, l["grenadiers"]), l["camo"] = Math["min"](0x1, l["camo"]), l["flank"] = Math["min"](0x1, l["flank"]), l["maxSpawned"] = Math["max"](0x1, Math["round"](l["maxSpawned"])), l;
}
var Xr = "trumper",
    J5 = 0x9,
    Z5 = [{
        'when': c => c["nokill"] && c["objective"] === "eliminate",
        'why': "`nokill` with `eliminate`: the objective cannot be met without the kill that fails it"
    }, {
        'when': c => c["nokill"] && c["objective"] === "assassinate",
        'why': "`nokill` with `assassinate`: the objective is a kill"
    }, {
        'when': c => c["nokill"] && c["waves"] !== null,
        'why': "`nokill` with `waves`: reinforcements walk into the route the approach depends on being empty"
    }, {
        'when': c => c["timeLimit"] > 0x0 && c["objective"] === "survive",
        'why': "`timelimit` with `survive`: the mission already has a clock, and the two run opposite ways"
    }, {
        'when': c => c["timeLimit"] > 0x0 && c["objective"] === "endless",
        'why': "`timelimit` with `endless`: the clock is the score, and a limit ends a run the objective says has no end"
    }, {
        'when': c => c["objective"] === "cull" && c["chickens"] <= 0x0,
        'why': "`cull` with no `chickens`: there is nothing to kill, and the mission would be won on the first step"
    }];

function Q5(c) {
    const dO = cX;
    if (c === void 0x0) return null;
    if (c["length"] === 0x0) throw new Error("difficulties: an empty list is a mission nobody can play");
    for (let d of c)
        if (!P1(d)) throw new Error("difficulties: \"" + d + "\" is not a difficulty");
    return c;
}

function T4(c) {
    const dP = cX;
    if (c === void 0x0) return null;
    if (c["length"] === 0x0) throw new Error("weapons: an empty list arms nobody");
    for (let d of c)
        if (!(d in _T)) throw new Error("weapons: \"" + d + "\" is not a row in WEAPONS");
    return c;
}

function qn(c, d) {
    const dQ = cX;
    if (d === void 0x0) return null;
    if (!(d > 0x0)) throw new Error(c + ": must be a positive number, got " + String(d));
    return d;
}

function W4(c) {
    const dR = cX;
    if (c === void 0x0) return null;
    if (c["steps"]["length"] === 0x0) throw new Error("countdown: steps must name at least one beat");
    let d = c["beat"] ?? f["countdown"]["beat"];
    if (!(d > 0x0)) throw new Error("countdown: beat must be positive, got " + String(c["beat"]));
    return {
        'steps': c["steps"],
        'beat': d
    };
}
var yl = c => c["countdown"] ? c["countdown"]["steps"]["length"] * c["countdown"]["beat"] : 0x0;

function e4(c, d) {
    const dS = cX;
    if (!c || d <= 0x0) return null;
    let g = c["steps"]["length"] - Math["ceil"](d / c["beat"]);
    return c["steps"][Math["max"](0x0, Math["min"](c["steps"]["length"] - 0x1, g))];
}
var vl = {
        0x1: "ROUND ONE",
        0x2: "ROUND TWO",
        0x3: "ROUND THREE",
        0x4: "ROUND FOUR",
        0x5: "ROUND FIVE",
        0x6: "ROUND SIX",
        0x7: "ROUND SEVEN",
        0x8: "ROUND EIGHT",
        0x9: "ROUND NINE",
        0xa: "ROUND TEN"
    },
    Un = ["THREE", "TWO", "ONE"],
    _l = "GO!",
    t4 = 0.35;

function xl(c, d, g) {
    const dT = cX;
    if (d <= 0x0) return null;
    let i = c["countdown"],
        j = i ? i["steps"]["length"] * i["beat"] : f["countdown"]["match"];
    if (g > 0x0 && d > j) return vl[g] ?? "ROUND " + g;
    if (i) return e4(i, Math["min"](d, j));
    if (d <= t4) return _l;
    let l = Un["length"] - Math["ceil"](Math["min"](d, j));
    return Un[Math["max"](0x0, Math["min"](Un["length"] - 0x1, l))];
}

function kl(c, d) {
    const dU = cX;
    let g = c["countdown"] ? [...c["countdown"]["steps"]] : [...Un, _l];
    return d > 0x0 ? [vl[d] ?? "ROUND " + d, ...g] : g;
}

function Te(j, q = "level") {
    const dV = cX;
    let y = j["grid"]["replace"](/\r\n?/g, '\x0a')["split"]('\x0a')["filter"](N => N["length"] > 0x0);
    for (; y["length"] && y[y["length"] - 0x1]["trim"]() === '';) y["pop"]();
    if (y["length"] === 0x0) throw new Error("map has no rows");
    let A = Math["max"](...y["map"](N => N["length"])),
        C = y["length"],
        E = new Uint8Array(A * C),
        F = j["tile"] ?? f["TILE"],
        H = j["objective"],
        I = {
            'id': q,
            'name': j["name"],
            'theme': j["theme"],
            'tile': F,
            'width': A,
            'height': C,
            'grid': E,
            'pristine': E,
            'pixelWidth': A * F,
            'pixelHeight': C * F,
            'colors': dl(j["theme"]),
            'objective': H === "covert" ? "reach" : H,
            'nokill': H === "covert" || j["nokill"] === !0x0,
            'timeLimit': Math["max"](0x0, j["timeLimit"] ?? 0x0),
            'startGrenades': j["grenades"] === void 0x0 ? -0x1 : Math["max"](0x0, j["grenades"]),
            'advice': j["advice"] ? {
                'text': j["advice"],
                'speaker': j["advisor"] ?? Xr,
                'seconds': j["adviceSeconds"] ?? J5
            } : null,
            'gated': j["gated"] === !0x0,
            'arena': j["arena"] === !0x0,
            'doctrine': j["doctrine"],
            'duration': j["duration"] ?? 0x5a,
            'waves': j["waves"] ?? null,
            'brief': j["brief"],
            'mechanic': j["mechanic"],
            'guide': j["guide"] ?? (H === "reach" || H === "covert" ? "extraction" : "none"),
            'indestructible': (j["indestructible"] ?? ["bunker", "wave-spawners"])["filter"](N => N !== "all"),
            'unlevellable': j["indestructible"]?.["includes"]("all") ?? !0x1,
            'waveSize': j["waveSize"] ?? {
                'first': f["wave"]["first"],
                'growth': f["wave"]["growth"]
            },
            'fog': j["fog"] ?? null,
            'enemySpeed': j["enemySpeed"] ?? 0x1,
            'rungMod': j["rungMod"] ?? {},
            'triggers': j["triggers"] ?? [],
            'difficulties': Q5(j["difficulties"]),
            'conceals': !0x1,
            'weapons': T4(j["weapons"]),
            'countdown': W4(j["countdown"]),
            'spawn': {
                'interval': qn("spawn.interval", j["spawn"]?.["interval"]),
                'perBuilding': qn("spawn.perBuilding", j["spawn"]?.["perBuilding"]),
                'maxAlive': qn("spawn.maxAlive", j["spawn"]?.["maxAlive"]),
                'aggroRange': qn("spawn.aggroRange", j["spawn"]?.["aggroRange"]) ?? f["building"]["spawnAggroRange"]
            },
            'personas': j["personas"] ?? null,
            'challenge': j["challenge"] ? {
                'verb': j["challenge"]["verb"] ?? "OVERRUN",
                'score': ((() => {
                    const dW = dV;
                    if (j[dW(0x1232)][dW(0x358)][dW(0x1e8)] === 0x0) throw new Error(dW(0x294));
                    return j[dW(0x1232)][dW(0x358)];
                })())
            } : null,
            'sidePersonas': j["sidePersonas"] ? {
                [D["Player"]]: j["sidePersonas"]["green"],
                [D["Enemy"]]: j["sidePersonas"]["red"]
            } : null,
            'playerSpawns': [],
            'squadSize': 0x0,
            'enemySpawns': [],
            'sniperSpawns': [],
            'bazookaSpawns': [],
            'patrolNodes': [],
            'playerSpawnsB': [],
            'skirmish': j["objective"] === "skirmish",
            'crates': [],
            'packages': [],
            'barrels': [],
            'mines': [],
            'hostages': [],
            'henhouses': [],
            'chickens': Math["max"](0x0, Math["floor"](j["chickens"] ?? 0x0)),
            'critterNotice': j["hostileChickens"] ? j["hostileChickens"]["noticeRadius"] ?? f["critter"]["noticeRadius"] : null,
            'supplies': [],
            'officers': [],
            'extraction': [],
            'buildings': [],
            'protects': !0x1
        };
    for (let N of Z5)
        if (N["when"](I)) throw new Error(q + ':\x20' + N["why"]);
    let K = (P, Q) => ({
            'x': (P + 0.5) * F,
            'y': (Q + 0.5) * F
        }),
        L = [];
    for (let P = 0x0; P < C; P++) {
        let Q = y[P];
        for (let R = 0x0; R < A; R++) {
            let S = R < Q["length"] ? Q[R] : '.',
                U = Ur[S];
            if (U === void 0x0) {
                let V = cl[S];
                if (V === void 0x0) throw new Error("unknown map character '" + S + "' at " + R + ',' + P);
                U = V, L["push"]([R, P]);
                let X = K(R, P);
                S === 'P' ? I["playerSpawns"]["push"](X) : S === 'Q' ? I["playerSpawnsB"]["push"](X) : S === 'E' ? I["enemySpawns"]["push"](X) : S === 'S' ? I["sniperSpawns"]["push"](X) : S === 'B' ? I["bazookaSpawns"]["push"](X) : S === 'p' ? I["patrolNodes"]["push"](X) : S === 'c' ? I["crates"]["push"](X) : S === '$' ? I["packages"]["push"](X) : S === 'o' ? I["barrels"]["push"](X) : S === '*' ? I["mines"]["push"](X) : S === 'H' ? I["hostages"]["push"](X) : S === 'n' ? I["henhouses"]["push"](X) : S === 'k' ? I["supplies"]["push"](X) : S === 'C' ? I["officers"]["push"](X) : S === 'X' && I["extraction"]["push"]({
                    ...X,
                    'pad': 0x0
                });
            }
            E[P * A + R] = U;
        }
    }
    gl(E, A, C), n4(I, y, L), I["pristine"] = E["slice"](), I["conceals"] = E["some"](Y => TT[Y]["concealment"] < 0x1);
    let M = j["squad"] ?? 0x0;
    I["squadSize"] = M > 0x0 ? Math["min"](M, I["playerSpawns"]["length"]) : I["playerSpawns"]["length"], I["buildings"] = pl(I), I["extraction"] = hl(I, I["extraction"]), I["protects"] = I["buildings"]["some"](Y => Y["role"] === "protect");
    for (let Y of fl(I)) I["extraction"]["push"](Y);
    return I;
}
var bl = [0x0, 0x1, 0xb, 0x8, 0xa, 0xd, 0x4, 0x13, 0x29];

function n4(g, j, p) {
    const dX = cX;
    let q = (v, y) => v < 0x0 || y < 0x0 || y >= j["length"] || v >= g["width"] ? null : v < j[y]["length"] ? j[y][v] : '.';
    for (let [v, y] of p) {
        let A = null;
        for (let C = 0x1; C <= 0x4 && A === null; C++) {
            let E = new Map();
            for (let I = -C; I <= C; I++)
                for (let K = -C; K <= C; K++) {
                    if (Math["max"](Math["abs"](K), Math["abs"](I)) !== C) continue;
                    let L = q(v + K, y + I);
                    if (L === null) continue;
                    let M = Ur[L];
                    M === void 0x0 || !bl["includes"](M) || E["set"](M, (E["get"](M) ?? 0x0) + 0x1);
                }
            let F = null,
                H = 0x0;
            for (let N of bl) {
                let P = E["get"](N) ?? 0x0;
                P > H && (F = N, H = P);
            }
            F !== null && (A = F);
        }
        A !== null && A !== 0x0 && (g["grid"][y * g["width"] + v] = A);
    }
}
var PT = null,
    Me = null,
    $n = null,
    de = null,
    Kn = 0x1,
    Jr = -0x3b9aca00,
    zn = () => Jr;

