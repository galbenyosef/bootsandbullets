        ...nl,
        ...ol
    },
    il = ["Stand by. The war is being loaded. Apparently this is normal.", "I have been waiting since 1961. You can manage a few seconds.", "The paperwork is done. I did most of it myself, which explains the delay.", "The sandbags are genuine. The bags, certainly. I have not inspected the sand.", "I asked the machine to hurry. It did not answer, which I took as professionalism.", "The trees are not real. I mention this now to avoid complaints later.", "There is a map. Trees, huts, and a worrying number of small men.", "This is the part of the war where nothing happens. Most of it, in my experience.", "The tea is on. Not for you. You are going to the front.", "I planned this operation on the back of an envelope. The front was already occupied.", "The enemy have huts. We have this screen. I make that roughly even.", "Nobody at headquarters has died of waiting. I checked the records.", "You will be issued a rifle, a name, and a line in the ledger. Try not to alter the ledger.", "The music is the only thing we did not make ourselves. I insisted on standards somewhere.", "I once waited nine days for a boat. It arrived as a lorry. Nobody seemed concerned.", "It is not stuck. I have been assured. I was assured about the boat too.", "The men are being named. They have no say in the matter, which speeds things up.", "Somewhere a very small man is being painted green. One must allow for drying time.", "There will be a briefing. I wrote it. The beginning is sound.", "The war waits until you are ready. The enemy have not agreed to this arrangement.", "You will be given six men. Do not get attached. I always do, which is tiresome.", "The ground is being painted one patch at a time. Unfortunately there is quite a lot of it.", "I have a chair. I mention this so you know somebody is comfortable.", "The huts are made of wood. The men inside are a separate department.", "A brief delay. \"Brief\" is a military term meaning as long as necessary.", "I have signed for all of this. Nothing is to go missing until someone else signs for it."],
    W1 = {
        wasd: {
            label: "WASD",
            codes: ["KeyW", "KeyS", "KeyA", "KeyD"]
        },
        arrows: {
            label: "ARROWS",
            codes: ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
        },
        ijkl: {
            label: "IJKL",
            codes: ["KeyI", "KeyK", "KeyJ", "KeyL"]
        }
    },
    Hr = ["wasd", "arrows", "ijkl"],
    rl = c => Hr[(Hr.indexOf(c) + 1) % Hr.length],
    Se = {
        march: "MOVE SQUAD",
        pan: "MOVE SCREEN"
    },
    Rt = {
        march: "wasd",
        pan: "arrows",
        fire: 'f',
        grenade: 'g',
        pause: "escape"
    },
    G5 = ["marchUp", "marchDown", "marchLeft", "marchRight"],
    V5 = ["panUp", "panDown", "panLeft", "panRight"];

function sanitizeControls(c) {
    const cY = cX;
    let d = {
        ...Rt
    };
    if (!c || typeof c != "object") return d;
    let g = c,
        i = j => typeof j == "string" && j in W1 ? j : null;
    d.march = i(g.march) ?? d.march, d.pan = i(g.pan) ?? d.pan, d.pan === d.march && (d.pan = d.march === "arrows" ? "wasd" : "arrows");
    for (let j of ["fire", "grenade", "pause"]) {
        let l = g[j];
        typeof l == "string" && l.length > 0 && l.length <= 12 && (d[j] = l.toLowerCase());
    }
    return d;
}
var Gr = c => ({
    '\x20': "SPACE",
    escape: "ESC",
    arrowup: 'UP',
    arrowdown: "DOWN",
    arrowleft: "LEFT",
    arrowright: "RIGHT",
    enter: "ENTER",
    tab: "TAB"
} [c] ?? c.toUpperCase());

function jt(c) {
    const cZ = cX;
    let d = new Map(),
        g = new Map();
    return W1[c.march].codes.forEach((i, j) => d.set(i, G5[j])), W1[c.pan].codes.forEach((i, j) => d.set(i, V5[j])), g.set(c.fire, "fire"), g.set(c.grenade, "grenade"), g.set(c.pause, "pause"), {
        byCode: d,
        byKey: g,
        label: i => i === "march" || i === "pan" ? W1[c[i]].label : Gr(c[i])
    };
}
var SETTINGS_KEY = "cf.settings",
    qr = {
        zoomBias: 0,
        edgeScroll: true,
        sound: true,
        music: true,
        volume: 0.35,
        musicVolume: 0.5,
        haptics: true,
        handedness: "right",
        resolution: "full",
        crisp: false,
        reducedMotion: null,
        rules: "classic",
        autoFire: true,
        blood: "normal",
        arenaLockCamera: false,
        arenaShowScore: true,
        keys: Rt
    },
    GW = {
        ...qr
    },
    Vr = new Set();

function sanitizeSettings(c) {
    const d7 = cX;
    let d = {
        ...qr
    };
    if (typeof c != "object" || c === null) return d;
    let g = c;
    return typeof g.zoomBias == "number" && (d.zoomBias = Math.max(-1, Math.min(1, Math.round(g.zoomBias)))), typeof g.edgeScroll == "boolean" && (d.edgeScroll = g.edgeScroll), typeof g.sound == "boolean" && (d.sound = g.sound), typeof g.music == "boolean" && (d.music = g.music), typeof g.volume == "number" && (d.volume = Math.max(0, Math.min(1, g.volume))), typeof g.musicVolume == "number" && (d.musicVolume = Math.max(0, Math.min(1, g.musicVolume))), typeof g.haptics == "boolean" && (d.haptics = g.haptics), (g.handedness === "left" || g.handedness === "right") && (d.handedness = g.handedness), (g.resolution === "half" || g.resolution === "full") && (d.resolution = g.resolution), typeof g.crisp == "boolean" && (d.crisp = g.crisp), (typeof g.reducedMotion == "boolean" || g.reducedMotion === null) && (d.reducedMotion = g.reducedMotion), (g.rules === "modern" || g.rules === "classic") && (d.rules = g.rules), typeof g.autoFire == "boolean" && (d.autoFire = g.autoFire), (g.blood === "none" || g.blood === "normal" || g.blood === "carnage") && (d.blood = g.blood), typeof g.arenaLockCamera == "boolean" && (d.arenaLockCamera = g.arenaLockCamera), typeof g.arenaShowScore == "boolean" && (d.arenaShowScore = g.arenaShowScore), d.keys = sanitizeControls(g.keys), d;
}

function ll() {
    const d8 = cX;
    try {
        let c = localStorage.getItem(SETTINGS_KEY);
        GW = sanitizeSettings(c ? JSON.parse(c) : null);
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
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(GW));
    } catch {}
    for (let d of Vr) d(GW);
    return GW;
}

function A1(c) {
    const dj = cX;
    return Vr.add(c), () => Vr.delete(c);
}

function e1() {
    const dk = cX;
    if (GW.reducedMotion !== null) return GW.reducedMotion;
    try {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
        return false;
    }
}
var It = null;

function detectAppleDevice() {
    const dq = cX;
    if (It !== null) return It;
    try {
        let c = navigator.userAgentData?.platform ?? navigator.platform ?? '';
        It = /mac|iphone|ipad|ipod/i .test(c);
    } catch {
        It = false;
    }
    return It;
}

function R1() {
    const dw = cX;
    let c = detectAppleDevice(),
        d = jt(G().keys);
    return [{
        action: Se.march.toLowerCase(),
        keys: "CLICK  or  " + d.label("march")
    }, {
        action: "fire",
        keys: c ? d.label("fire") + "  or  CTRL+CLICK" : "RIGHT CLICK  or  " + d.label("fire")
    }, {
        action: "grenade",
        keys: c ? d.label("grenade") : "MIDDLE CLICK  or  " + d.label("grenade")
    }, {
        action: "pause",
        keys: d.label("pause") + "  or  P"
    }, {
        action: Se.pan.toLowerCase(),
        keys: d.label("pan")
    }];
}
var Z = (c, d, g, i, j = {}) => ({
        id: c,
        name: d,
        color: g,
        speckle: i,
        solid: false,
        blocksSight: false,
        blocksShots: false,
        lowWall: false,
        wade: false,
        swim: false,
        concealment: 1,
        speed: 1,
        slippery: false,
        canopy: false,
        sway: false,
        ...j
    }),
    TT = {
        0x20: Z(32, "shell crater", "#584627", "#6d5833", {
            speed: f.mud.speed
        }),
        0x21: Z(33, "broken brick wall", "#70502c", "#a08048", {
            solid: true,
            blocksSight: true,
            blocksShots: true
        }),
        0x22: Z(34, "anti-tank hedgehog", "#4e5540", "#7c8164", {
            solid: true,
            blocksShots: true
        }),
        0x23: Z(35, "broken barricade", "#70502c", "#a08048", {
            solid: true,
            blocksShots: true
        }),
        0x24: Z(36, "tank wreck", "#4e5540", "#7c8164", {
            solid: true,
            blocksSight: true,
            blocksShots: true
        }),
        0x25: Z(37, "abandoned field gun", "#4e5540", "#7c8164", {
            solid: true,
            blocksSight: true,
            blocksShots: true
        }),
        0x26: Z(38, "empty jerry cans", "#4e5540", "#7c8164"),
        0x27: Z(39, "spent ammunition", "#70502c", "#a08048"),
        0x28: Z(40, "broken field radio", "#4e5540", "#7c8164"),
        0x1f: Z(31, "truck wreck", "#4e5540", "#7c8164", {
            solid: true,
            blocksSight: true,
            blocksShots: true
        }),
        0x13: Z(19, "mud", "#584627", "#6d5833", {
            speed: f.mud.speed
        }),
        0x14: Z(20, "boulder", "#6b6f66", "#7b8076", {
            solid: true,
            blocksSight: true,
            blocksShots: true
        }),
        0x15: Z(21, "fallen log", "#7a6440", "#6a5636", {
            solid: true,
            blocksSight: true,
            blocksShots: true
        }),
        0x16: Z(22, "sandbags", "#a5924f", "#b6a15c", {
            solid: true,
            blocksShots: true,
            lowWall: true
        }),
        0x17: Z(23, "bush", "#3f6b28", "#4c7d31"),
        0x18: Z(24, "fern", "#3f6b28", "#4c7d31"),
        0x19: Z(25, "mushrooms", "#8d5a2b", "#b6a15c"),
        0x1a: Z(26, "branches", "#7a6440", "#6a5636"),
        0x1b: Z(27, "stump", "#7a6440", "#6a5636"),
        0x1c: Z(28, "debris", "#5c5348", "#6a6055"),
        0x1d: Z(29, "cold campfire", "#5c5348", "#6a6055"),
        0x1e: Z(30, "signpost", "#7a6440", "#6a5636"),
        0x0: Z(0, "grass", "#4a7a2c", "#578a33"),
        0x1: Z(1, "sand", "#a5924f", "#b6a15c"),
        0xb: Z(11, "road", "#8d8574", "#9c9483", {
            speed: 1.18
        }),
        0x2: Z(2, "tree", "#3d6624", "#345a1e", {
            solid: true,
            blocksSight: true,
            blocksShots: true,
            canopy: true,
            sway: true
        }),
        0x5: Z(5, "rock", "#6b6f66", "#7b8076", {
            solid: true,
            blocksSight: true,
            blocksShots: true,
            canopy: true
        }),
        0x6: Z(6, "hut", "#8d5a2b", "#7c4e24", {
            solid: true,
            blocksSight: true,
            blocksShots: true,
            canopy: true
        }),
        0x12: Z(18, "allied hut", "#4a6a24", "#3f5c1e", {
            solid: true,
            blocksSight: true,
            blocksShots: true,
            canopy: true
        }),
        0x10: Z(16, "outpost", "#6a6a5e", "#7a7a6c", {
            solid: true,
            blocksSight: true,
            blocksShots: true
        }),
        0x11: Z(17, "bunker", "#5c5f55", "#6b6e63", {
            solid: true,
            blocksSight: true,
            blocksShots: true
        }),
        0xe: Z(14, "factory", "#6d6f74", "#5e6065", {
            solid: true,
            blocksSight: true,
            blocksShots: true,
            canopy: true
        }),
        0xc: Z(12, "fence", "#7a6440", "#6a5636", {
            solid: true,
            blocksShots: true
        }),
        0xd: Z(13, "rubble", "#5c5348", "#6a6055", {
            speed: 0.8
        }),
        0x3: Z(3, "water", "#2f6d92", "#3a7ea6", {
            wade: true,
            speed: 0.45
        }),
        0x7: Z(7, "deep water", "#1d4665", "#245478", {
            solid: true,
            swim: true,
            wade: true,
            speed: 0.34,
            concealment: 0.35
        }),
        0x4: Z(4, "bridge", "#8a6c3f", "#7a5f37"),
        0x8: Z(8, "tall grass", "#3f6b28", "#4c7d31", {
            blocksSight: true,
            speed: 0.82,
            sway: true,
            concealment: 0.35
        }),
        0x29: Z(41, "long grass", "#2f5a1e", "#3b6a26", {
            blocksSight: true,
            speed: 0.72,
            sway: true,
            concealment: 0.2
        }),
        0x9: Z(9, "quicksand", "#8a7a44", "#7a6b3a", {
            speed: 0.24,
            wade: true
        }),
        0xa: Z(10, "ice", "#c3dbe6", "#d5e8f0", {
            slippery: true,
            speed: 1.08
        }),
        0xf: Z(15, "tent", "#c9c2ac", "#b8b19b")
    },
    Ur = {
        q: 32,
        R: 33,
        Y: 34,
        L: 35,
        D: 36,
        a: 37,
        J: 38,
        M: 39,
        N: 40,
        V: 31,
        ';': 19,
        r: 20,
        l: 21,
        b: 22,
        v: 23,
        f: 24,
        m: 25,
        j: 26,
        s: 27,
        d: 28,
        z: 29,
        t: 30,
        '.': 0,
        ',': 1,
        _: 11,
        T: 2,
        '~': 3,
        W: 7,
        '=': 4,
        '#': 5,
        h: 6,
        F: 14,
        '+': 12,
        '\x22': 8,
        '^': 41,
        '%': 9,
        i: 10,
        ':': 13,
        A: 15,
        O: 16,
        U: 17,
        G: 18
    },
    cl = {
        P: 0,
        Q: 0,
        E: 0,
        S: 0,
        B: 0,
        c: 0,
        o: 0,
        '*': 0,
        p: 0,
        k: 0,
        $: 0,
        C: 0,
        H: 0,
        n: 0,
        X: 0
    },
    $5 = {
        jungle: {},
        desert: {
            0x0: ["#b4a065", "#c1ad72"],
            0x1: ["#d3bd7f", "#e0cb8e"],
            0x8: ["#93884a", "#a29656"],
            0x29: ["#7f7440", "#8e824c"],
            0x2: ["#5c7a35", "#4a6529"],
            0x5: ["#8a7d63", "#9a8d73"]
        },
        arctic: {
            0x0: ["#dae6ec", "#e8f1f5"],
            0x1: ["#c2ced6", "#d0dbe2"],
            0x8: ["#a9bcc4", "#b8c9d0"],
            0x29: ["#95aab3", "#a5b8c0"],
            0x2: ["#2e5240", "#264636"],
            0x5: ["#8f9aa2", "#9faab2"],
            0xb: ["#a8b3ba", "#b6c0c6"]
        }
    };

function resolveTerrainPalette(c) {
    const dx = cX;
    let d = $5[c] ?? {},
        g = {};
    for (let i of Object.keys(TT)) {
        let j = Number(i),
            l = d[j];
        g[j] = l ? {
            color: l[0],
            speckle: l[1]
        } : {
            color: TT[j].color,
            speckle: TT[j].speckle
        };
    }
    return g;
}
var D = {
        Player: 0,
        Enemy: 1
    },
    j1 = 2,
    nW = (c => (c[c.Idle = 0] = "Idle", c[c.Patrol = 1] = "Patrol", c[c.Alert = 2] = "Alert", c[c.Engage = 3] = "Engage", c[c.Investigate = 4] = "Investigate", c[c.Advance = 5] = "Advance", c))(nW || {}),
    IW = (c => (c[c.Rifle = 0] = "Rifle", c[c.Sniper = 1] = "Sniper", c[c.Bazooka = 2] = "Bazooka", c[c.Officer = 3] = "Officer", c))(IW || {}),
    I1 = c => c.kind === "chicken";

function z(c, d, g) {
    const dz = cX;
    return d < 0 || g < 0 || d >= c.width || g >= c.height ? 2 : c.grid[g * c.width + d];
}

function oW(c, d, g) {
    const dA = cX;
    return z(c, Math.floor(d / c.tile), Math.floor(g / c.tile));
}
var Pt = (c, d, g) => TT[z(c, d, g)].solid,
    Ee = (c, d, g) => TT[oW(c, d, g)],
    $r = (c, d, g, i) => {
        const dB = cX;
        d >= 0 && g >= 0 && d < c.width && g < c.height && (c.grid[g * c.width + d] = i);
    },
    Kr = c => {
        const dC = cX;
        c.grid.set(c.pristine);
    };

function ul(j, q, y, A) {
    const dD = cX;
    let C = j.tile,
        E = Math.floor(q.x / C),
        F = Math.floor(q.y / C),
        H = Math.floor(y.x / C),
        I = Math.floor(y.y / C);
    if (E === H && F === I) return true;
    let K = y.x - q.x,
        L = y.y - q.y,
        M = K > 0 ? 1 : -1,
        N = L > 0 ? 1 : -1,
        P = K === 0 ? 1 / 0 : Math.abs(C / K),
        Q = L === 0 ? 1 / 0 : Math.abs(C / L),
        R = K === 0 ? 1 / 0 : ((E + (M > 0 ? 1 : 0)) * C - q.x) / K,
        S = L === 0 ? 1 / 0 : ((F + (N > 0 ? 1 : 0)) * C - q.y) / L;
    for (let U = 0; U < 8192; U++) {
        if (R < S) {
            if (R > 1) return true;
            R += P, E += M;
        } else {
            if (S > 1) return true;
            S += Q, F += N;
        }
        if (E === H && F === I) return true;
        let V = TT[z(j, E, F)];
        if (A === "sight") {
            if (V.blocksSight) return false;
        } else {
            if (V.blocksShots && !(V.lowWall && withinOverReach(q, E, F, C))) return false;
        }
    }
    return true;
}
var withinOverReach = (c, d, g, i) => Math.hypot((d + 0.5) * i - c.x, (g + 0.5) * i - c.y) <= f.cover.overReach,
    kW = (c, d, g) => ul(c, d, g, "sight"),
    PW = (c, d, g) => ul(c, d, g, "shots");

function uT(c, d, g = 24) {
    const dE = cX;
    let j = Math.floor(d.x / c.tile),
        l = Math.floor(d.y / c.tile);
    if (!Pt(c, j, l)) return {
        x: d.x,
        y: d.y
    };
    for (let m = 1; m <= g; m++)
        for (let p = -m; p <= m; p++)
            for (let q = -m; q <= m; q++) {
                if (Math.max(Math.abs(q), Math.abs(p)) !== m) continue;
                let u = j + q,
                    v = l + p;
                if (!Pt(c, u, v)) return {
                    x: (u + 0.5) * c.tile,
                    y: (v + 0.5) * c.tile
                };
            }
    return {
        x: d.x,
        y: d.y
    };
}

function getMainlandMask(g, j) {
    const dF = cX;
    if (g.mainland) return g.mainland;
    let {
        width: p,
        height: q
    } = g, v = new Uint8Array(p * q), y = new Uint8Array(p * q);
    for (let F of g.buildings)
        for (let [H, I] of F.tiles) H >= 0 && I >= 0 && H < p && I < q && (y[I * p + H] = 1);
    let A = (K, L) => {
            const dG = dF;
            if (K < 0 || L < 0 || K >= p || L >= q) return true;
            if (y[L * p + K]) return false;
            let M = TT[z(g, K, L)];
            return M.solid && !M.swim;
        },
        C = {
            x: Math.floor(j.x / g.tile),
            y: Math.floor(j.y / g.tile)
        };
    if (A(C.x, C.y)) return v;
    let E = [C];
    for (v[C.y * p + C.x] = 1; E.length > 0;) {
        let {
            x: K,
            y: L
        } = E.pop();
        for (let [M, N] of CARDINAL_OFFSETS) {
            let P = K + M,
                Q = L + N;
            A(P, Q) || v[Q * p + P] || (v[Q * p + P] = 1, E.push({
                x: P,
                y: Q
            }));
        }
    }
    return g.mainland = v, v;
}
var CARDINAL_OFFSETS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
];

function zr(c, d, g, j = 24) {
    const dH = cX;
    let m = getMainlandMask(c, g);
    if (m.length === 0 || !m.some(v => v === 1)) return uT(c, d, j);
    let p = Math.floor(d.x / c.tile),
        q = Math.floor(d.y / c.tile),
        u = (v, y) => v >= 0 && y >= 0 && v < c.width && y < c.height && m[y * c.width + v] === 1;
    if (u(p, q)) return {
        x: d.x,
        y: d.y
    };
    for (let v = 1; v <= j; v++)
        for (let y = -v; y <= v; y++)
            for (let A = -v; A <= v; A++)
                if (Math.max(Math.abs(A), Math.abs(y)) === v && u(p + A, q + y)) return {
                    x: (p + A + 0.5) * c.tile,
                    y: (q + y + 0.5) * c.tile
                };
    return uT(c, d, j);
}

function floodFillRegions(j) {
    const dI = cX;
    let q = new Uint8Array(j.width * j.height),
        A = [];
    for (let C = 0; C < j.height; C++)
        for (let E = 0; E < j.width; E++) {
            let F = z(j, E, C);
            if (F !== 6 && F !== 14 && F !== 16 && F !== 17 && F !== 18 || q[C * j.width + E]) continue;
            let H = [],
                I = [
                    [E, C]
                ];
            q[C * j.width + E] = 1;
            let K = E,
                L = C,
                M = E,
                N = C;
            for (; I.length;) {
                let [R, S] = I.pop();
                H.push([R, S]), K = Math.min(K, R), L = Math.min(L, S), M = Math.max(M, R), N = Math.max(N, S);
                for (let [U, V] of [
                        [1, 0],
                        [-1, 0],
                        [0, 1],
                        [0, -1]
                    ]) {
                    let X = R + U,
                        Y = S + V;
                    X < 0 || Y < 0 || X >= j.width || Y >= j.height || q[Y * j.width + X] || z(j, X, Y) !== F || (q[Y * j.width + X] = 1, I.push([X, Y]));
                }
            }
            let P = F === 14 ? "factory" : F === 16 ? "outpost" : F === 17 ? "bunker" : "hut",
                Q = F === 18 || F === 16 || F === 17 ? D.Player : D.Enemy;
            A.push({
                kind: P,
                owner: Q,
                role: P === "outpost" || P === "bunker" ? "protect" : "spawner",
                tiles: H,
                centre: {
                    x: ((K + M) / 2 + 0.5) * j.tile,
                    y: ((L + N) / 2 + 0.5) * j.tile
                },
                x0: K,
                y0: L,
                w: M - K + 1,
                h: N - L + 1
            });
        }
    return A;
}

function floodFillWater(g) {
    const dJ = cX;
    let j = new Uint8Array(g.width * g.height),
        q = [];
    for (let v = 0; v < g.height; v++)
        for (let y = 0; y < g.width; y++) {
            if (z(g, y, v) !== 15 || j[v * g.width + y]) continue;
            let A = [
                [y, v]
            ];
            j[v * g.width + y] = 1;
            let C = y,
                E = v,
                F = y,
                H = v;
            for (; A.length;) {
                let [I, K] = A.pop();
                C = Math.min(C, I), E = Math.min(E, K), F = Math.max(F, I), H = Math.max(H, K);
                for (let [L, M] of [
                        [1, 0],
                        [-1, 0],
                        [0, 1],
                        [0, -1]
                    ]) {
                    let N = I + L,
                        P = K + M;
                    N < 0 || P < 0 || N >= g.width || P >= g.height || j[P * g.width + N] || z(g, N, P) !== 15 || (j[P * g.width + N] = 1, A.push([N, P]));
                }
            }
            q.push({
                x: ((C + F) / 2 + 0.5) * g.tile,
                y: ((E + H) / 2 + 0.5) * g.tile,
                pad: (Math.max(F - C, H - E) + 1) * g.tile / 2
            });
        }
    return q;
}
var Y5 = 4;

function repositionBunkers(c, d) {
    const dK = cX;
    let g = c.buildings.filter(i => i.kind === "bunker");
    return g.length === 0 ? d : d.map(j => {
        const dL = dK;
        if (j.pad !== 0) return j;
        let p = Math.floor(j.x / c.tile),
            q = Math.floor(j.y / c.tile),
            v = null;
        for (let y of g) {
            let A = y.tiles.map(([L]) => L),
                C = y.tiles.map(([, L]) => L),
                E = Math.min(...A),
                F = Math.max(...A),
                H = Math.min(...C),
                I = Math.max(...C),
                K = Math.max(Math.max(E - p, 0, p - F), Math.max(H - q, 0, q - I));
            K > Y5 || v && v.d <= K || (v = {
                d: K,
                zone: {
                    x: ((E + F) / 2 + 0.5) * c.tile,
                    y: ((H + I) / 2 + 0.5) * c.tile,
                    pad: (Math.max(F - E, I - H) + 1) * c.tile / 2
                }
            });
        }
        return v ? v.zone : j;
    });
}
var Yr = {
    0x1f: "truck wreck (V)",
    0x24: "tank wreck (D)",
    0x25: "field gun (a)",
    0x20: "shell crater (q)"
};

function validateBuildingBlocks(c, d, g) {
    const dM = cX;
    let j = new Set();
    for (let l = 0; l < g; l++)
        for (let m = 0; m < d; m++) {
            let p = l * d + m,
                q = c[p],
                u = Yr[q];
            if (!u || j.has(p)) continue;
            let v = [p, p + 1, p + d, p + d + 1];
            if (m + 1 >= d || l + 1 >= g || v.some(y => c[y] !== q || j.has(y))) throw new Error(u + " at " + m + ',' + l + " must be a 2x2 block");
            if (m > 0 && c[p - 1] === q || l > 0 && c[p - d] === q) throw new Error(u + " at " + m + ',' + l + " needs a gap from the next object");
            v.forEach(y => j.add(y));
        }
}
var QW = {
        rookie: {
            id: "rookie",
            name: "Rookie",
            blurb: "They shoot slowly and badly, but a shot nearby brings a neighbour looking.",
            levers: {
                spread: 1.4,
                fireInterval: 1.4,
                aggro: 1.05,
                reaction: 1.3,
                speed: 0.95,
                fireRange: 0.95,
                extraEnemies: 0.25,
                spawnInterval: 1.7,
                maxSpawned: 2,
                waveSize: 0.7,
                hearing: 95,
                hunters: 0.15,
                rushers: 0,
                grenadiers: 0,
                flank: 0,
                camo: 0,
                wander: 0.85,
                teamwork: 0,
                triggerHappy: 0,
                foresight: 90,
                vision: 0,
                concealment: 1,
                grenades: 0,
                predictable: 1
            }
        },
        veteran: {
            id: "veteran",
            name: "Veteran",
            blurb: "They hunt you across the map, flank hard, and the huts keep feeding. No fog.",
            levers: {
                spread: 1.05,
                fireInterval: 0.76,
                aggro: 1.25,
                reaction: 0.68,
                speed: 1.12,
                fireRange: 1.12,
                extraEnemies: 1,
                spawnInterval: 0.66,
                maxSpawned: 4,
                waveSize: 1.1,
                hearing: 220,
                hunters: 0.55,
                rushers: 0.3,
                grenadiers: 0.12,
                flank: 0.55,
                camo: 0.32,
                wander: 1.15,
                teamwork: 0,
                triggerHappy: 0,
                foresight: 180,
                vision: 0,
                concealment: 0.85,
                grenades: 0,
                predictable: 1
            }
        },
        elite: {
            id: "elite",
            name: "Elite",
            blurb: "Thick fog. They swarm, they flank, and they throw grenades.",
            levers: {
                spread: 0.72,
                fireInterval: 0.61,
                aggro: 1.41,
                reaction: 0.49,
                speed: 1.2,
                fireRange: 1.2,
                extraEnemies: 1.75,
                spawnInterval: 0.56,
                maxSpawned: 5,
                waveSize: 1.33,
                hearing: 265,
                hunters: 0.76,
                rushers: 0.46,
                grenadiers: 0.3,
                flank: 0.71,
                camo: 0.4,
                wander: 1.22,
                teamwork: 0,
                triggerHappy: 0,
                foresight: 235,
                vision: 245,
                concealment: 0.73,
                grenades: 0,
                predictable: 1
            }
        }
    },
    qT = ["rookie", "veteran", "elite"],
    P1 = c => qT.includes(c),
    X5 = {
        garrison: {
            id: "garrison",
            name: "Garrison",
            blurb: "Dug in. They hold what they have and make you come to them.",
            mod: {
                hunters: 0.35,
                rushers: 0.4,
                aggro: 1.1,
                hearing: 0.8,
                flank: 0.6,
                vision: 1.15
            }
        },
        patrol: {
            id: "patrol",
            name: "Patrols",
            blurb: "Roving pickets. Contact spreads quickly once the first shot goes off.",
            mod: {
                hearing: 1.25,
                hunters: 1.1,
                speed: 1.06
            }
        },
        hunters: {
            id: "hunters",
            name: "Hunters",
            blurb: "They abandon their posts to find you. Standing still is not an option.",
            mod: {
                hunters: 1.8,
                hearing: 1.5,
                speed: 1.12,
                rushers: 1.4,
                aggro: 1.15
            }
        },
        ambush: {
            id: "ambush",
            name: "Ambush",
            blurb: "Quiet until you are close, then fast and accurate.",
            mod: {
                aggro: 0.62,
                reaction: 0.55,
                spread: 0.7,
                hearing: 0.6,
                rushers: 1.5,
                hunters: 0.5,
                vision: 0.8
            }
        },
        'arena-red': {
            id: "arena-red",
            name: "Red Assault",
            blurb: "Numbers and speed. They close, and they keep closing.",
            mod: {
                hunters: 4,
                hearing: 2.2,
                aggro: 1.34,
                rushers: 2.2,
                flank: 0.5,
                grenadiers: 4,
                speed: 1.06,
                spread: 0.98,
                fireRange: 1.04,
                camo: 0,
                vision: 0,
                extraEnemies: 0,
                concealment: 1,
                teamwork: 0.8,
                maxSpawned: 2.6,
                spawnInterval: 0.42
            }
        },
        'arena-green': {
            id: "arena-green",
            name: "Green Manoeuvre",
            blurb: "Wider, slower, and around the side of you.",
            mod: {
                hunters: 4,
                hearing: 2.2,
                aggro: 1.34,
                rushers: 0.7,
                flank: 1.8,
                grenadiers: 4,
                speed: 1,
                spread: 0.94,
                fireRange: 1.06,
                camo: 0,
                vision: 0,
                extraEnemies: 0,
                teamwork: 0.8,
                concealment: 1,
                maxSpawned: 2.6,
                spawnInterval: 0.42
            }
        },
        horde: {
            id: "horde",
            name: "Horde",
            blurb: "All of them, at once, at you. They do not stop and they do not shoot.",
            mod: {
                hunters: 4,
                rushers: 4,
                hearing: 2.5,
                aggro: 1.4,
                speed: 1.15,
                grenadiers: 0,
                camo: 0,
                flank: 0
            }
        },
        swarm: {
            id: "swarm",
            name: "Swarm",
            blurb: "Many, close, and careless. They will trade lives to reach you.",
            mod: {
                extraEnemies: 2,
                rushers: 1.8,
                spread: 1.35,
                fireInterval: 1.2,
                speed: 1.1,
                spawnInterval: 0.7,
                maxSpawned: 1.5,
                hunters: 1.3
            }
        }
    };

function Lt(c, d) {
    const dN = cX;
    let g = QW[c].levers,
        j = X5[d].mod,
        l = {
            ...g
        };
    for (let m of Object.keys(j)) {
        let p = j[m];
        if (p !== void 0) {
            if (m === "teamwork") {
                l.teamwork = p;
                continue;
            }
            l[m] = g[m] * p;
        }
    }
    return l.hunters = Math.min(1, l.hunters), l.rushers = Math.min(1, l.rushers), l.grenadiers = Math.min(1, l.grenadiers), l.camo = Math.min(1, l.camo), l.flank = Math.min(1, l.flank), l.maxSpawned = Math.max(1, Math.round(l.maxSpawned)), l;
}
var Xr = "trumper",
    J5 = 9,
    Z5 = [{
        when: c => c.nokill && c.objective === "eliminate",
        why: "`nokill` with `eliminate`: the objective cannot be met without the kill that fails it"
    }, {
        when: c => c.nokill && c.objective === "assassinate",
        why: "`nokill` with `assassinate`: the objective is a kill"
    }, {
        when: c => c.nokill && c.waves !== null,
        why: "`nokill` with `waves`: reinforcements walk into the route the approach depends on being empty"
    }, {
        when: c => c.timeLimit > 0 && c.objective === "survive",
        why: "`timelimit` with `survive`: the mission already has a clock, and the two run opposite ways"
    }, {
        when: c => c.timeLimit > 0 && c.objective === "endless",
        why: "`timelimit` with `endless`: the clock is the score, and a limit ends a run the objective says has no end"
    }, {
        when: c => c.objective === "cull" && c.chickens <= 0,
        why: "`cull` with no `chickens`: there is nothing to kill, and the mission would be won on the first step"
    }];

function validateDifficulties(c) {
    const dO = cX;
    if (c === void 0) return null;
    if (c.length === 0) throw new Error("difficulties: an empty list is a mission nobody can play");
    for (let d of c)
        if (!P1(d)) throw new Error("difficulties: \"" + d + "\" is not a difficulty");
    return c;
}

function validateWeapons(c) {
    const dP = cX;
    if (c === void 0) return null;
    if (c.length === 0) throw new Error("weapons: an empty list arms nobody");
    for (let d of c)
        if (!(d in _T)) throw new Error("weapons: \"" + d + "\" is not a row in WEAPONS");
    return c;
}

function requirePositive(c, d) {
    const dQ = cX;
    if (d === void 0) return null;
    if (!(d > 0)) throw new Error(c + ": must be a positive number, got " + String(d));
    return d;
}

function validateCountdown(c) {
    const dR = cX;
    if (c === void 0) return null;
    if (c.steps.length === 0) throw new Error("countdown: steps must name at least one beat");
    let d = c.beat ?? f.countdown.beat;
    if (!(d > 0)) throw new Error("countdown: beat must be positive, got " + String(c.beat));
    return {
        steps: c.steps,
        beat: d
    };
}
var yl = c => c.countdown ? c.countdown.steps.length * c.countdown.beat : 0;

function countdownStepAt(c, d) {
    const dS = cX;
    if (!c || d <= 0) return null;
    let g = c.steps.length - Math.ceil(d / c.beat);
    return c.steps[Math.max(0, Math.min(c.steps.length - 1, g))];
}
var ROUND_LABELS = {
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
    if (d <= 0) return null;
    let i = c.countdown,
        j = i ? i.steps.length * i.beat : f.countdown.match;
    if (g > 0 && d > j) return ROUND_LABELS[g] ?? "ROUND " + g;
    if (i) return countdownStepAt(i, Math.min(d, j));
    if (d <= t4) return _l;
    let l = Un.length - Math.ceil(Math.min(d, j));
    return Un[Math.max(0, Math.min(Un.length - 1, l))];
}

function kl(c, d) {
    const dU = cX;
    let g = c.countdown ? [...c.countdown.steps] : [...Un, _l];
    return d > 0 ? [ROUND_LABELS[d] ?? "ROUND " + d, ...g] : g;
}

function Te(j, q = "level") {
    const dV = cX;
    let y = j.grid.replace(/\r\n?/g, '\x0a').split('\x0a').filter(N => N.length > 0);
    for (; y.length && y[y.length - 1].trim() === '';) y.pop();
    if (y.length === 0) throw new Error("map has no rows");
    let A = Math.max(...y.map(N => N.length)),
        C = y.length,
        E = new Uint8Array(A * C),
        F = j.tile ?? f.TILE,
        H = j.objective,
        I = {
            id: q,
            name: j.name,
            theme: j.theme,
            tile: F,
            width: A,
            height: C,
            grid: E,
            pristine: E,
            pixelWidth: A * F,
            pixelHeight: C * F,
            colors: resolveTerrainPalette(j.theme),
            objective: H === "covert" ? "reach" : H,
            nokill: H === "covert" || j.nokill === true,
            timeLimit: Math.max(0, j.timeLimit ?? 0),
            startGrenades: j.grenades === void 0 ? -1 : Math.max(0, j.grenades),
            advice: j.advice ? {
                text: j.advice,
                speaker: j.advisor ?? Xr,
                seconds: j.adviceSeconds ?? J5
            } : null,
            gated: j.gated === true,
            arena: j.arena === true,
            doctrine: j.doctrine,
            duration: j.duration ?? 90,
            waves: j.waves ?? null,
            brief: j.brief,
            mechanic: j.mechanic,
            guide: j.guide ?? (H === "reach" || H === "covert" ? "extraction" : "none"),
            indestructible: (j.indestructible ?? ["bunker", "wave-spawners"]).filter(N => N !== "all"),
            unlevellable: j.indestructible?.includes("all") ?? false,
            waveSize: j.waveSize ?? {
                first: f.wave.first,
                growth: f.wave.growth
            },
            fog: j.fog ?? null,
            enemySpeed: j.enemySpeed ?? 1,
            rungMod: j.rungMod ?? {},
            triggers: j.triggers ?? [],
            difficulties: validateDifficulties(j.difficulties),
            conceals: false,
            weapons: validateWeapons(j.weapons),
            countdown: validateCountdown(j.countdown),
            spawn: {
                interval: requirePositive("spawn.interval", j.spawn?.interval),
                perBuilding: requirePositive("spawn.perBuilding", j.spawn?.perBuilding),
                maxAlive: requirePositive("spawn.maxAlive", j.spawn?.maxAlive),
                aggroRange: requirePositive("spawn.aggroRange", j.spawn?.aggroRange) ?? f.building.spawnAggroRange
            },
            personas: j.personas ?? null,
            challenge: j.challenge ? {
                verb: j.challenge.verb ?? "OVERRUN",
                score: ((() => {
                    const dW = dV;
                    if (j.challenge.score.length === 0) throw new Error("challenge: score must name at least one stat");
                    return j.challenge.score;
                })())
            } : null,
            sidePersonas: j.sidePersonas ? {
                [D.Player]: j.sidePersonas.green,
                [D.Enemy]: j.sidePersonas.red
            } : null,
            playerSpawns: [],
            squadSize: 0,
            enemySpawns: [],
            sniperSpawns: [],
            bazookaSpawns: [],
            patrolNodes: [],
            playerSpawnsB: [],
            skirmish: j.objective === "skirmish",
            crates: [],
            packages: [],
            barrels: [],
            mines: [],
            hostages: [],
            henhouses: [],
            chickens: Math.max(0, Math.floor(j.chickens ?? 0)),
            critterNotice: j.hostileChickens ? j.hostileChickens.noticeRadius ?? f.critter.noticeRadius : null,
            supplies: [],
            officers: [],
            extraction: [],
            buildings: [],
            protects: false
        };
    for (let N of Z5)
        if (N.when(I)) throw new Error(q + ': ' + N.why);
    let K = (P, Q) => ({
            x: (P + 0.5) * F,
            y: (Q + 0.5) * F
        }),
        L = [];
    for (let P = 0; P < C; P++) {
        let Q = y[P];
        for (let R = 0; R < A; R++) {
            let S = R < Q.length ? Q[R] : '.',
                U = Ur[S];
            if (U === void 0) {
                let V = cl[S];
                if (V === void 0) throw new Error("unknown map character '" + S + "' at " + R + ',' + P);
                U = V, L.push([R, P]);
                let X = K(R, P);
                S === 'P' ? I.playerSpawns.push(X) : S === 'Q' ? I.playerSpawnsB.push(X) : S === 'E' ? I.enemySpawns.push(X) : S === 'S' ? I.sniperSpawns.push(X) : S === 'B' ? I.bazookaSpawns.push(X) : S === 'p' ? I.patrolNodes.push(X) : S === 'c' ? I.crates.push(X) : S === '$' ? I.packages.push(X) : S === 'o' ? I.barrels.push(X) : S === '*' ? I.mines.push(X) : S === 'H' ? I.hostages.push(X) : S === 'n' ? I.henhouses.push(X) : S === 'k' ? I.supplies.push(X) : S === 'C' ? I.officers.push(X) : S === 'X' && I.extraction.push({
                    ...X,
                    pad: 0
                });
            }
            E[P * A + R] = U;
        }
    }
    validateBuildingBlocks(E, A, C), scanTerrainRings(I, y, L), I.pristine = E.slice(), I.conceals = E.some(Y => TT[Y].concealment < 1);
    let M = j.squad ?? 0;
    I.squadSize = M > 0 ? Math.min(M, I.playerSpawns.length) : I.playerSpawns.length, I.buildings = floodFillRegions(I), I.extraction = repositionBunkers(I, I.extraction), I.protects = I.buildings.some(Y => Y.role === "protect");
    for (let Y of floodFillWater(I)) I.extraction.push(Y);
    return I;
}
var bl = [0, 1, 11, 8, 10, 13, 4, 19, 41];

function scanTerrainRings(g, j, p) {
    const dX = cX;
    let q = (v, y) => v < 0 || y < 0 || y >= j.length || v >= g.width ? null : v < j[y].length ? j[y][v] : '.';
    for (let [v, y] of p) {
        let A = null;
        for (let C = 1; C <= 4 && A === null; C++) {
            let E = new Map();
            for (let I = -C; I <= C; I++)
                for (let K = -C; K <= C; K++) {
                    if (Math.max(Math.abs(K), Math.abs(I)) !== C) continue;
                    let L = q(v + K, y + I);
                    if (L === null) continue;
                    let M = Ur[L];
                    M === void 0 || !bl.includes(M) || E.set(M, (E.get(M) ?? 0) + 1);
                }
            let F = null,
                H = 0;
            for (let N of bl) {
                let P = E.get(N) ?? 0;
                P > H && (F = N, H = P);
            }
            F !== null && (A = F);
        }
        A !== null && A !== 0 && (g.grid[y * g.width + v] = A);
    }
}
var PT = null,
    Me = null,
    $n = null,
    de = null,
    Kn = 1,
    Jr = -1000000000,
    zn = () => Jr;
