// Sprite palettes & colour tables
// Per-faction/per-unit colour definitions (helmet, face, kit, boots…), terrain and canvas palettes.
        X = j[S * q + K],
        Y = j[S * q + R];
    return U + (V - U) * M + (X + (Y - X) * M - (U + (V - U) * M)) * N;
}
var Rl = [
    [0x0, -0x1],
    [0x1, -0x1],
    [0x1, 0x0],
    [0x1, 0x1],
    [0x0, 0x1],
    [-0x1, 0x1],
    [-0x1, 0x0],
    [-0x1, -0x1]
];

function no(q) {
    const fq = cX;
    let H = q["width"],
        K = q["height"],
        L = H * K,
        P = new Uint8Array(L),
        Q = new Uint8Array(L);
    for (let aE = 0x0; aE < K; aE++)
        for (let aF = 0x0; aF < H; aF++) {
            let aG = z(q, aF, aE),
                aH = aE * H + aF;
            P[aH] = ys(aG), Q[aH] = o4(aG) ? 0x1 : 0x0;
        }
    let U = new Uint8Array(L),
        V = new Uint8Array(L),
        Y = new Uint8Array(L),
        a7 = new Set(P);
    for (let aI of a7) {
        V["fill"](0x0), Y["fill"](0x0);
        for (let aJ = 0x0; aJ < L; aJ++) V[aJ] = P[aJ] === aI ? 0x1 : 0x0;
        bs(H, K, V, Y);
        for (let aK = 0x0; aK < L; aK++) V[aK] && (U[aK] = Y[aK]);
    }
    let a8 = new Uint8Array(L);
    bs(H, K, Q, a8);
    let a9 = jl(H, K, Q, 0x6),
        aj = new Uint8Array(L);
    for (let aL = 0x0; aL < L; aL++) aj[aL] = P[aL] === 0x2 ? 0x1 : 0x0;
    let ak = new Uint8Array(L);
    for (let aM = 0x0; aM < L; aM++) ak[aM] = P[aM] === 0x3 ? 0x1 : 0x0;
    let aq = new Uint8Array(L),
        aw = new Uint8Array(L),
        ax = new Uint8Array(L);
    for (let aN = 0x0; aN < K; aN++)
        for (let aO = 0x0; aO < H; aO++) {
            let aP = z(q, aO, aN);
            aq[aN * H + aO] = aP === 0x2 ? 0x1 : 0x0, aw[aN * H + aO] = aP === 0x8 ? 0x1 : 0x0, ax[aN * H + aO] = aP === 0x29 ? 0x1 : 0x0;
        }
    let az = new Int32Array(L)["fill"](-0x1),
        aA = [],
        aB = new Int32Array(L);
    for (let aQ = 0x0; aQ < L; aQ++) {
        if (az[aQ] !== -0x1) continue;
        let aR = aA["length"],
            aS = P[aQ],
            aU = 0x0,
            aV = 0x0;
        for (aB[aV++] = aQ, az[aQ] = aR; aV > 0x0;) {
            let aX = aB[--aV];
            aU++;
            let aY = aX % H;
            for (let aZ of [aY > 0x0 ? aX - 0x1 : -0x1, aY < H - 0x1 ? aX + 0x1 : -0x1, aX - H, aX + H]) aZ < 0x0 || aZ >= L || az[aZ] !== -0x1 || P[aZ] !== aS || (az[aZ] = aR, aB[aV++] = aZ);
        }
        aA["push"](aU);
    }
    let aC = new Uint8Array(L),
        aD = new Uint8Array(L);
    for (let b4 = 0x0; b4 < K; b4++)
        for (let b7 = 0x0; b7 < H; b7++) {
            let b8 = b4 * H + b7,
                b9 = 0x0,
                bj = 0x0;
            for (let bk = 0x0; bk < 0x8; bk++) {
                let bq = b7 + Rl[bk][0x0],
                    bw = b4 + Rl[bk][0x1],
                    bx = bq < 0x0 || bw < 0x0 || bq >= H || bw >= K,
                    bz = bx ? -0x1 : bw * H + bq;
                (bx || P[bz] === P[b8]) && (b9 |= 0x1 << bk), !bx && Q[bz] && (bj |= 0x1 << bk);
            }
            aC[b8] = b9, aD[b8] = bj;
        }
    return {
        'width': H,
        'height': K,
        'material': P,
        'foliage': Q,
        'depth': U,
        'canopyDepth': a8,
        'canopyNear': a9,
        'wetSdf': N1(H, K, aj, 0x6),
        'foliageSdf': N1(H, K, Q, 0x6),
        'tree': aq,
        'treeSdf': N1(H, K, aq, 0x6),
        'tallGrass': aw,
        'grassSdf': N1(H, K, aw, 0x5),
        'longGrass': ax,
        'longSdf': N1(H, K, ax, 0x5),
        'stoneSdf': N1(H, K, ak, 0x4),
        'mass': az,
        'massSize': Int32Array["from"](aA),
        'bits': aC,
        'canopyBits': aD,
        'noise': new hs([...q['id']]["reduce"]((bA, bB) => bA * 0x1f + bB["charCodeAt"](0x0) | 0x0, 0x7))
    };
}
var LW = c => {
        const fw = cX;
        let d = parseInt(c["replace"]('#', ''), 0x10);
        return [d >> 0x10 & 0xff, d >> 0x8 & 0xff, d & 0xff];
    },
    VW = c => {
        let [d, g, i] = LW(c);
        return (0xff000000 | i << 0x10 | g << 0x8 | d) >>> 0x0;
    },
    SW = c => {
        const fx = cX;
        let d = c & 0xff,
            g = c >> 0x8 & 0xff,
            i = c >> 0x10 & 0xff;
        return '#' + (0x1 << 0x18 | d << 0x10 | g << 0x8 | i)["toString"](0x10)["slice"](0x1);
    },
    Ll = (c, d, g = 0x1) => Dl(d, Math["min"](Nl(c), g), _s(c)),
    Ol = (c, d) => Dl(r4(c), Nl(c), _s(c) * d),
    r4 = c => {
        const fz = cX;
        let [d, g, j] = LW(c)["map"](q => q / 0xff), l = Math["max"](d, g, j), m = Math["min"](d, g, j), p = l - m;
        return p === 0x0 ? 0x0 : (l === d ? (g - j) / p + (g < j ? 0x6 : 0x0) : l === g ? (j - d) / p + 0x2 : (d - g) / p + 0x4) * 0x3c;
    },
    Nl = c => {
        const fA = cX;
        let [d, g, j] = LW(c)["map"](u => u / 0xff), l = Math["max"](d, g, j), m = Math["min"](d, g, j), p = (l + m) / 0x2, q = l - m;
        return q === 0x0 ? 0x0 : p > 0.5 ? q / (0x2 - l - m) : q / (l + m);
    },
    Dl = (c, d, g) => {
        let j = 0x0,
            l = 0x1;
        for (let m = 0x0; m < 0x18; m++) {
            let p = (j + l) / 0x2;
            _s(Il(c, d, p)) < g ? j = p : l = p;
        }
        return Il(c, d, (j + l) / 0x2);
    },
    _s = c => {
        const fB = cX;
        let [d, g, i] = LW(c)["map"](j => j / 0xff)["map"](j => j <= 0.03928 ? j / 12.92 : ((j + 0.055) / 1.055) ** 2.4);
        return 0.2126 * d + 0.7152 * g + 0.0722 * i;
    },
    Il = (c, d, g) => {
        const fD = cX;
        let j = (c % 0x168 + 0x168) % 0x168 / 0x168,
            l = g < 0.5 ? g * (0x1 + d) : g + d - g * d,
            m = 0x2 * g - l,
            p = y => {
                const fC = b;
                let A = (y + 0x1) % 0x1,
                    C = A < 0x1 / 0x6 ? m + (l - m) * 0x6 * A : A < 0x1 / 0x2 ? l : A < 0x2 / 0x3 ? m + (l - m) * (0x2 / 0x3 - A) * 0x6 : m;
                return Math["round"](C * 0xff);
            },
            [q, u, v] = d === 0x0 ? [g, g, g]["map"](y => Math["round"](y * 0xff)) : [p(j + 0x1 / 0x3), p(j), p(j - 0x1 / 0x3)];
        return '#' + (0x1 << 0x18 | q << 0x10 | u << 0x8 | v)["toString"](0x10)["slice"](0x1);
    },
    J = (...c) => Uint32Array["from"](c, VW),
    vT = (c, d = {}) => ({
        'ramp': c,
        'scale': 0.09,
        'contrast': 0.8,
        'bias': 0.5,
        'grain': 0.35,
        ...d
    }),
    s4 = J("#2b3a0f", "#3f5216", "#526b21", "#949429", "#aba838"),
    a4 = J("#5e5322", "#7d6d2c", "#9d8a38", "#c4ad5c", "#ddc87e"),
    l4 = J("#6e929c", "#8bb0b9", "#a9c9d0", "#bcdde2", "#dcf0f3"),
    Pl = {
        'jungle': {
            0x0: vT(s4, {
                'scale': 0.045,
                'contrast': 0.52,
                'bias': 0.615,
                'grain': 0.42
            }),
            0x1: vT(J("#6b5a28", "#8d7836", "#ab9448", "#c9b165", "#ddc98a"), {
                'grain': 0.6
            }),
            0x2: vT(J("#08203a", "#0e3457", "#154a76", "#1d6296", "#2a7cb4"), {
                'scale': 0.11,
                'contrast': 0.75,
                'grain': 0.2
            }),
            0x3: vT(J("#2a2e22", "#3e4433", "#565c46", "#6e755c", "#878e74"), {
                'grain': 0.7
            }),
            0x4: vT(J("#241f14", "#3a3221", "#544a32", "#6e6144", "#877858"), {
                'grain': 0.6
            }),
            0x5: vT(J("#88aebc", "#a3c6d1", "#bcdce4", "#d2ecf1", "#e8f8fa"), {
                'grain': 0.14
            }),
            0x6: vT(J("#3a3325", "#514736", "#6a5e48", "#84765c", "#9c8d70"), {
                'scale': 0.16,
                'grain': 0.75
            }),
            0x7: vT(J("#2e2414", "#43351d", "#584627", "#6d5833", "#826a41"), {
                'scale': 0.13,
                'contrast': 0.8,
                'grain': 0.75
            })
        },
        'desert': {
            0x0: vT(a4, {
                'scale': 0.045,
                'contrast': 0.52,
                'bias': 0.62,
                'grain': 0.42
            }),
            0x1: vT(J("#8a7338", "#a88f48", "#c4a95c", "#dcc47c", "#eedaa0"), {
                'scale': 0.05,
                'contrast': 0.85,
                'grain': 0.5
            }),
            0x2: vT(J("#0e3049", "#154566", "#1e5c88", "#2874a8", "#348dc6"), {
                'scale': 0.11,
                'grain': 0.2
            }),
            0x3: vT(J("#463c26", "#61543a", "#7c6d4f", "#968666", "#ad9d80"), {
                'grain': 0.7
            }),
            0x4: vT(J("#332b1a", "#4c4128", "#665738", "#7f6e4a", "#98865f"), {
                'grain': 0.6
            }),
            0x5: vT(J("#a9bfc7", "#bacfd6", "#cadde3", "#d9e9ee", "#e8f4f7"), {
                'grain': 0.12
            }),
            0x6: vT(J("#514026", "#6b5a36", "#87744a", "#a08c60", "#b8a37a"), {
                'scale': 0.16,
                'grain': 0.75
            }),
            0x7: vT(J("#4a3d1e", "#63522a", "#7c6838", "#957e48", "#a89355"), {
                'scale': 0.13,
                'contrast': 0.85,
                'grain': 0.7
            })
        },
        'arctic': {
            0x0: vT(l4, {
                'scale': 0.04,
                'contrast': 0.66,
                'bias': 0.66,
                'grain': 0.34
            }),
            0x1: vT(J("#5e7079", "#7a8d96", "#96a9b2", "#b2c5cd", "#cee0e6"), {
                'grain': 0.35
            }),
            0x2: vT(J("#08375f", "#0d4a7d", "#135e9b", "#1a74b8", "#2489d2"), {
                'scale': 0.1,
                'contrast': 0.62,
                'grain': 0.14
            }),
            0x3: vT(J("#10171c", "#1e2a31", "#2f3f48", "#45575f", "#5d7078"), {
                'grain': 0.7
            }),
            0x4: vT(J("#181f26", "#28323a", "#3a464f", "#4d5a64", "#616f79"), {
                'grain': 0.55
            }),
            0x5: vT(J("#2f6d8e", "#4a8cad", "#6fabc7", "#98c9de", "#c8e8f4"), {
                'scale': 0.15,
                'contrast': 0x1,
                'bias': 0.62,
                'grain': 0.05
            }),
            0x6: vT(J("#3d4a52", "#54636b", "#6b7b84", "#82929b", "#99a9b2"), {
                'scale': 0.16,
                'grain': 0.55
            }),
            0x7: vT(J("#2f2b24", "#443f34", "#5a5445", "#706a57", "#867f69"), {
                'scale': 0.13,
                'contrast': 0.8,
                'grain': 0.6
            })
        }
    },
    zT = (c, d) => Pl[c][d] ?? Pl["jungle"][0x0],
    c4 = {
        'jungle': {
            'canopy': J("#0a1200", "#1a2404", "#2c3406", "#404000", "#565608", "#6c6c10", "#808010", "#9a9a24"),
            'shadow': VW("#0a1002"),
            'scrub': J("#4a0d02", "#701a04", "#9c2806", "#c04010"),
            'litter': J("#3a4a10", "#54601a", "#8c2408")
        },
        'desert': {
            'canopy': J("#141a04", "#242c06", "#38400a", "#4c520c", "#626610", "#787c18", "#8e9224", "#a4a838"),
            'shadow': VW("#120e02"),
            'scrub': J("#3a1e04", "#5c3208", "#824a10", "#a4661c"),
            'litter': J("#5e5228", "#776834", "#7a4a16")
        },
        'arctic': {
            'canopy': J("#000000", "#04080b", "#0c141a", "#182430", "#26343f", "#36464e", "#46585f", "#586b73"),
            'shadow': VW("#000000"),
            'scrub': J("#1a1008", "#2e1e10", "#452e1c", "#5c4028"),
            'litter': J("#48585f", "#647880", "#2e1e10")
        }
    },
    D1 = c => c4[c],
    d4 = {
        'jungle': {
            'face': J("#14170f", "#242a1c", "#383f2c", "#4e563e", "#666e52", "#7f8768", "#98a081"),
            'cap': VW("#404000"),
            'shadow': VW("#0d1008")
        },
        'desert': {
            'face': J("#231d10", "#3a301c", "#524529", "#6c5c38", "#877449", "#a28d5e", "#bca877"),
            'cap': VW("#c4a95c"),
            'shadow': VW("#171208")
        },
        'arctic': {
            'face': J("#000000", "#050a10", "#101a24", "#1e2c38", "#2e3f4c", "#405260", "#546877"),
            'cap': VW("#eefaff"),
            'shadow': VW("#000000")
        }
    },
    Fl = c => d4[c],
    u4 = {
        'jungle': {
            'fringe': J("#100e08", "#201d12", "#2e2a1b", "#403a26"),
            'shallow': J("#123c5c", "#1a4f74")
        },
        'desert': {
            'fringe': J("#1c1405", "#382a0c", "#544012", "#6e5418"),
            'shallow': J("#154a6c", "#1e5f88")
        },
        'arctic': {
            'fringe': J("#04070c", "#0b1219", "#152029", "#20303c"),
            'shallow': J("#0a4272", "#10558e")
        }
    },
    oo = c => u4[c],
    Re = J("#3d2c17", "#4f3a1f", "#634a29", "#7a5d34", "#916f3f"),
    m4 = [0x0, 0x20, 0x8, 0x28, 0x2, 0x22, 0xa, 0x2a, 0x30, 0x10, 0x38, 0x18, 0x32, 0x12, 0x3a, 0x1a, 0xc, 0x2c, 0x4, 0x24, 0xe, 0x2e, 0x6, 0x26, 0x3c, 0x1c, 0x34, 0x14, 0x3e, 0x1e, 0x36, 0x16, 0x3, 0x23, 0xb, 0x2b, 0x1, 0x21, 0x9, 0x29, 0x33, 0x13, 0x3b, 0x1b, 0x31, 0x11, 0x39, 0x19, 0xf, 0x2f, 0x7, 0x27, 0xd, 0x2d, 0x5, 0x25, 0x3f, 0x1f, 0x37, 0x17, 0x3d, 0x1d, 0x35, 0x15],
    p4 = Float32Array["from"](m4, c => (c + 0.5) / 0x40),
    x8 = Float32Array["from"]([0.25, 0.75, 0.75, 0.25]),
    f4 = 0.34,
    h4 = ((() => {
        const fE = cX;
        let c = new Float32Array(0x1000);
        for (let d = 0x0; d < 0x40; d++)
            for (let g = 0x0; g < 0x40; g++) {
                let i = kT(g, d),
                    j = p4[(d & 0x7) * 0x8 + (g & 0x7)];
                c[d * 0x40 + g] = Math["min"](0.999, Math["max"](0.001, j + (i - 0.5) * f4));
            }
        return c;
    })()),
    qW = (c, d) => h4[(d & 0x3f) * 0x40 + (c & 0x3f)];

function iW(c, d, g, j) {
    const fF = cX;
    let l = c["length"] - 0x1,
        m = d <= 0x0 ? 0x0 : d >= l ? l : d,
        p = m | 0x0;
    return p >= l ? c[l] : qW(g, j) < m - p ? c[p + 0x1] : c[p];
}

function io(c, d) {
    let g = 0x1 - d,
        i = (c & 0xff) * g,
        j = (c >> 0x8 & 0xff) * g;
    return (0xff000000 | (c >> 0x10 & 0xff) * g << 0x10 | j << 0x8 | i) >>> 0x0;
}

function Bt(c, d, g) {
    let j = c & 0xff,
        m = c >> 0x8 & 0xff,
        p = c >> 0x10 & 0xff,
        q = d & 0xff,
        u = d >> 0x8 & 0xff,
        v = d >> 0x10 & 0xff,
        y = j + (q - j) * g | 0x0,
        A = m + (u - m) * g | 0x0;
    return (0xff000000 | (p + (v - p) * g | 0x0) << 0x10 | A << 0x8 | y) >>> 0x0;
}
var rT = {
        'player': {
            'outline': "#0a1204",
            'helmetLight': "#c4d472",
            'helmet': "#5e8c2c",
            'helmetDark': "#2a4014",
            'face': "#e89848",
            'faceDark': "#a05020",
            'body': "#2a4014",
            'bodyLight': "#4a7024",
            'kit': "#8ad655",
            'kitAlt': "#d8c060",
            'boots': "#100c08",
            'gun': "#14181c"
        },
        'blue': {
            'outline': "#040a12",
            'helmetLight': "#72b4d4",
            'helmet': "#2c5e8c",
            'helmetDark': "#142a40",
            'face': "#e89848",
            'faceDark': "#a05020",
            'body': "#142a40",
            'bodyLight': "#24486e",
            'kit': "#55a0d6",
            'kitAlt': "#d8c060",
            'boots': "#100c08",
            'gun': "#14181c"
        },
        'enemy': {
            'outline': "#05070c",
            'helmetLight': "#c8d4e8",
            'helmet': "#5a72a0",
            'helmetDark': "#1e2840",
            'face': "#dc8c40",
            'faceDark': "#94481c",
            'body': "#22304e",
            'bodyLight': "#3f5480",
            'kit': "#6a86bc",
            'kitAlt': "#c0a048",
            'boots': "#0a0a10",
            'gun': "#14181c"
        },
        'camo': {
            'outline': "#060a04",
            'helmetLight': "#6a8438",
            'helmet': "#3a5220",
            'helmetDark': "#182608",
            'face': "#b4763a",
            'faceDark': "#6e3c14",
            'body': "#1f3210",
            'bodyLight': "#33501c",
            'kit': "#4a5f28",
            'kitAlt': "#5c5424",
            'boots': "#080c04",
            'gun': "#14181c"
        },
        'sniper': {
            'outline': "#080a0e",
            'helmetLight': "#b0b8c8",
            'helmet': "#4a5060",
            'helmetDark': "#1d2028",
            'face': "#c88040",
            'faceDark': "#84441c",
            'body': "#232830",
            'bodyLight': "#3d434f",
            'kit': "#616978",
            'kitAlt': "#8c3038",
            'boots': "#0a0a0c",
            'gun': "#0e1014"
        },
        'officer': {
            'outline': "#07080c",
            'helmetLight': "#8d939e",
            'helmet': "#1a1d26",
            'helmetDark': "#0b0d12",
            'face': "#d08848",
            'faceDark': "#8c4c1e",
            'body': "#1d2a22",
            'bodyLight': "#33463a",
            'kit': "#c8a84c",
            'kitAlt': "#8e1f24",
            'boots': "#08080a",
            'gun': "#101418"
        },
        'bazooka': {
            'outline': "#0c0603",
            'helmetLight': "#e8a878",
            'helmet': "#9c3a20",
            'helmetDark': "#4a2013",
            'face': "#dc8c40",
            'faceDark': "#94481c",
            'body': "#3a1a0e",
            'bodyLight': "#6a3020",
            'kit': "#c25438",
            'kitAlt': "#d8b048",
            'boots': "#100806",
            'gun': "#14181c"
        },
        'hostage': {
            'outline': "#100e0a",
            'helmetLight': "#f4ecd4",
            'helmet': "#b8a882",
            'helmetDark': "#6b5029",
            'face': "#e89848",
            'faceDark': "#a05020",
            'body': "#5c5442",
            'bodyLight': "#8c8268",
            'kit': "#cfc4a6",
            'kitAlt': "#9c8a5c",
            'boots': "#2a2018",
            'gun': "#00000000"
        },
        'zombie': {
            'outline': "#0a0a0c",
            'helmetLight': "#e4e2d6",
            'helmet': "#bdbbb0",
            'helmetDark': "#3a3a36",
            'face': "#c9c7ba",
            'faceDark': "#5a5a54",
            'body': "#a8aaa0",
            'bodyLight': "#eeeee6",
            'kit': "#55574f",
            'kitAlt': "#7a2a24",
            'boots': "#141412",
            'gun': "#00000000"
        }
    },
    Bl = {
        'outline': "#2a2620",
        'canvasLit': "#d8d0b4",
        'canvas': "#b8b096",
        'canvasShade': "#8e876f",
        'rope': "#6f684f",
        'interior': "#241f16",
        'cross': "#c8352a",
        'patch': "#e8e2cc"
    },
    Ht = {
        'rim': "#4d5a41",
        'shade': "#7a7f62",
        'body': "#8d8f72",
        'lit': "#aca98b"
    },
    Gt = {
        'core': "#ffffff",
        'hot': "#eef1f6",
        'bone': "#c6ccd6",
        'cold': "#8e99ac"
    },
    O = (c, d) => {
        const fG = cX;
        let g = document["createElement"]("canvas");
        g["width"] = c, g["height"] = d;
        let i = g["getContext"]('2d');
        return i["imageSmoothingEnabled"] = !0x1, {
            'c': g,
            'g': i
        };
    },
    k = (c, d, g, i) => {
        const fH = cX;
        c["fillStyle"] = i, c["fillRect"](Math["round"](d), Math["round"](g), 0x1, 0x1);
    },
    h = (c, d, g, i, j, l) => {
        const fI = cX;
        c["fillStyle"] = l, c["fillRect"](Math["round"](d), Math["round"](g), i, j);
    };

function B(d, g) {
    const fJ = cX;
    let j = d["getContext"]('2d'),
        m = j["getImageData"](0x0, 0x0, d["width"], d["height"]),
        p = m["data"],
        q = new Uint8Array(d["width"] * d["height"]);
    for (let C = 0x0; C < q["length"]; C++) q[C] = p[C * 0x4 + 0x3] > 0x8 ? 0x1 : 0x0;
    let [v, y, A] = LW(g);
    for (let E = 0x0; E < d["height"]; E++)
        for (let F = 0x0; F < d["width"]; F++) {
            let H = E * d["width"] + F;
            if (q[H] || !(F > 0x0 && q[H - 0x1] || F < d["width"] - 0x1 && q[H + 0x1] || E > 0x0 && q[H - d["width"]] || E < d["height"] - 0x1 && q[H + d["width"]])) continue;
            let I = H * 0x4;
            p[I] = v, p[I + 0x1] = y, p[I + 0x2] = A, p[I + 0x3] = 0xff;
        }
    j["putImageData"](m, 0x0, 0x0);
}

function UW(g, j, q = 0x0, v) {
    const fK = cX;
    let y = j["cellW"] * j["frames"],
        A = q * j["cellW"],
        C = v ? j["palette"]["map"](v) : j["palette"],
        E = 0x0;
    for (let F = 0x0; F < j["runs"]["length"]; F += 0x2) {
        let H = j["runs"][F],
            I = j["runs"][F + 0x1];
        if (H) {
            let K = 0x0;
            for (; K < I;) {
                let L = E + K,
                    M = L % y,
                    N = Math["min"](I - K, y - M),
                    P = Math["max"](M, A),
                    Q = Math["min"](M + N, A + j["cellW"]);
                Q > P && h(g, P - A, L / y | 0x0, Q - P, 0x1, C[H - 0x1]), K += N;
            }
        }
        E += I;
    }
}

function xs(c) {
    const fL = cX;
    let d = c["getContext"]('2d')["getImageData"](0x0, 0x0, c["width"], c["height"])["data"],
        g = c["width"],
        j = c["height"],
        m = -0x1,
        p = -0x1;
    for (let v = 0x0; v < c["height"]; v++)
        for (let y = 0x0; y < c["width"]; y++) d[(v * c["width"] + y) * 0x4 + 0x3] !== 0x0 && (y < g && (g = y), y > m && (m = y), v < j && (j = v), v > p && (p = v));
    if (m < 0x0) return O(0x1, 0x1)['c'];
    let {
        c: q,
        g: u
    } = O(m - g + 0x1, p - j + 0x1);
    return u["drawImage"](c, -g, -j), q;
}
var Vt = {
        'trumper': {
            'cell': 0x40,
            'frames': 0x6,
            'palette': Cl,
            'runs': Al,
            'loops': {
                'idle': {
                    'frames': [0x0],
                    'hold': 0x1
                },
                'talk': {
                    'frames': [0x1, 0x2, 0x3, 0x4, 0x5],
                    'hold': 0.12
                }
            }
        }
    },
    F1 = Object["keys"](Vt);

function ue(c) {
    const fM = cX;
    let d = Vt[c] ?? Vt[F1[0x0]];
    return {
        'count': d["frames"],
        'cell': d["cell"],
        ...d["loops"]
    };
}

function y4(g) {
    const fN = cX;
    let j = g["cell"] * g["frames"],
        {
            c: m,
            g: p
        } = O(j, g["cell"]),
        q = 0x0;
    for (let u = 0x0; u < g["runs"]["length"]; u += 0x2) {
        let v = g["runs"][u],
            y = g["runs"][u + 0x1];
        if (v) {
            let A = g["palette"][v - 0x1],
                C = 0x0;
            for (; C < y;) {
                let E = q + C,
                    F = E % j,
                    H = Math["min"](y - C, j - F);
                h(p, F, E / j | 0x0, H, 0x1, A), C += H;
            }
        }
        q += y;
    }
    return m;
}
var Hl = new Map(),
    v4 = (c, d) => {
        const fO = cX;
        let g = Hl["get"](c);
        if (g) return g;
        let i = y4(d);
        return Hl["set"](c, i), i;
    };

function _4(g, j = 0x0) {
    const fP = cX;
    let q = Vt[g] ? g : F1[0x0],
        v = Vt[q],
        y = Math["max"](0x0, Math["min"](v["frames"] - 0x1, j)),
        A = v["cell"],
        C = v4(q, v),
        {
            c: E,
            g: F
        } = O(A, A),
        H = A / 0x2 - 0.5,
        I = A / 0x2 - 0.5;
    for (let K = 0x0; K < A; K++) {
        let L = K - I,
            M = H * H - L * L;
        if (M < 0x0) continue;
        let N = Math["floor"](Math["sqrt"](M)),
            P = Math["ceil"](I - N),
            Q = Math["floor"](I + N) - P + 0x1;
        h(F, P, K, Q, 0x1, "#1a2010"), F["drawImage"](C, y * A + P, K, Q, 0x1, P, K, Q, 0x1);
    }
    return B(E, "#0a0d05"), E;
}

function Gl(c) {
    const fQ = cX;
    let {
        count: d,
        cell: g
    } = ue(c), {
        c: i,
        g: j
    } = O(g * d, g);
    for (let l = 0x0; l < d; l++) j["drawImage"](_4(c, l), g * l, 0x0);
    return i;
}
var x4 = {
        'id': "narrator",
        'name': ''
    },
    EW = {
        'trumper': {
            'id': "trumper",
            'name': "Major Trumper",
            'portrait': "trumper",
            'voice': {
                'wave': "square",
                'hz': 0x140,
                'jitter': 0.06,
                'everyNth': 0x2
            }
        }
    },
    k4 = 1.2,
    w4 = 0x9,
    rW = null,
    qt = 0x1e,
    ro = 0x0,
    We = [],
    so = !0x1,
    ks = 0x0;

function o1(c, d, g = null) {
    const fR = cX;
    let i = {
        'left': c,
        'every': g,
        'run': d
    };
    return We["push"](i), ro === 0x0 && (ro = window["setInterval"](() => {
        const fS = fR;
        if (!(so || We[fS(0x1e8)] === 0x0)) {
            for (let j of [...We]) We[fS(0x13d1)](j) && (j[fS(0x60f)] -= qt / 0x3e8, !(j[fS(0x60f)] > 0x0) && (j[fS(0x796)] === null ? We = We[fS(0xe37)](l => l !== j) : j[fS(0x60f)] += j[fS(0x796)], j[fS(0x170f)]()));
        }
    }, qt)), i;
}
var S4 = c => {
    const fU = cX;
    c && (We = We["filter"](d => d !== c));
};

function B1() {
    so = !0x0;
}

function H1() {
    so = !0x1;
}
var Vl = 0.035,
    E4 = /[\s.,;:!?'"()\-·]/;

function M4() {
    const fV = cX;
    if (rW) return rW;
    let c = document["getElementById"]("viewport");
    return c ? (rW = document["createElement"]("div"), rW['id'] = "comms", rW["hidden"] = !0x0, c["appendChild"](rW), rW) : null;
}
var ws = () => {
    const fX = cX;
    We = [], window["clearInterval"](ro), ro = 0x0, window["clearTimeout"](ks), ks = 0x0, so = !0x1;
};

function C4(c, d, g, j) {
    const fY = cX;
    if (e1() || !g) {
        c["textContent"] = d;
        return;
    }
    c["textContent"] = '';
    let l = 0x0,
        m = 0x0;
    j["talk"]();
    let p = o1(Vl, () => {
        const fZ = fY;
        if (l >= d[fZ(0x1e8)]) {
            S4(p), j[fZ(0x1534)]();
            return;
        }
        let q = d[l++];
        c[fZ(0x1338)] += q, !E4[fZ(0x127c)](q) && m++ % g[fZ(0x3f2)] === 0x0 && G()[fZ(0xc92)] && O1(g);
    }, Vl);
}

function A4(c, d) {
    const g7 = cX;
    let g = v => {
            const g4 = b;
            c["style"]["setProperty"]("--comms-face-f", String(v)), c["dataset"]["frame"] = String(v);
        },
        {
            idle: j,
            talk: l
        } = ue(d);
    if (g(j["frames"][0x0]), e1()) return {
        'talk': () => {},
        'rest': () => {}
    };
    let m = j,
        p = !0x1,
        q = 0x0,
        u = 0x0;
    return o1(qt / 0x3e8, () => {
        const g8 = g7;
        u += qt / 0x3e8, !(u < m[g8(0x1114)]) && (u = 0x0, q++, q >= m[g8(0x1340)][g8(0x1e8)] && (q = 0x0, p && (p = !0x1, m = j)), g(m[g8(0x1340)][q]));
    }, qt / 0x3e8), {
        'talk': () => {
            const g9 = g7;
            if (m === l) {
                p = !0x1;
                return;
            }
            m = l, p = !0x1, q = 0x0, u = 0x0, g(l[g9(0x1340)][0x0]);
        },
        'rest': () => {
            m === l && (p = !0x0);
        }
    };
}

function je(c, d, g = {}) {
    const gj = cX;
    let j = M4();
    if (!j) return;
    ws(), j["textContent"] = '', j["dataset"]["speaker"] = c['id'], j["classList"]["toggle"]("with-face", !!c["portrait"]);
    let l = {
        'talk': () => {},
        'rest': () => {}
    };
    if (c["portrait"]) {
        let u = Object["assign"](document["createElement"]('i'), {
                'className': "comms-face"
            }),
            v = Object["assign"](document["createElement"]('i'), {
                'className': "comms-portrait"
            });
        v["style"]["backgroundImage"] = "var(--sk-face-" + c["portrait"] + ')', u["style"]["setProperty"]("--comms-face-n", "var(--sk-face-" + c["portrait"] + "-n)"), u["appendChild"](v), j["appendChild"](u), l = A4(u, c["portrait"]);
    }
    let m = document["createElement"]("div");
    m["className"] = "comms-said", c["name"] && m["appendChild"](Object["assign"](document["createElement"]("span"), {
        'className': "comms-who",
        'textContent': c["name"]["toUpperCase"]()
    }));
    let p = Object["assign"](document["createElement"]("span"), {
        'className': "comms-line"
    });
    m["appendChild"](p), j["appendChild"](m);
    let q = g["delay"] ?? k4;
    o1(q, () => {
        const gk = gj;
        j[gk(0x6ad)] = !0x1, requestAnimationFrame(() => {
            const gq = gk;
            j[gq(0x13c1)][gq(0x851)]('in'), e1() && j[gq(0x13c1)][gq(0x851)](gq(0x1f5)), o1(e1() ? 0x0 : 0.26, () => C4(p, d, c[gq(0x5a1)], l));
        }), g[gk(0x119b)] || (o1(g[gk(0x10c2)] ?? w4, $l), R4());
    });
}
var ql = 0x1;

function R4() {
    const gw = cX;
    let c = performance["now"]() / 0x3e8;
    o1(ql, () => {
        o1(0.1, () => {
            Qr() < c + ql || $l();
        }, 0.1);
    });
}
var Ul = () => We["length"] > 0x0 || rW !== null && !rW["hidden"];

function $l() {
    const gx = cX;
    ws(), rW && (rW["classList"]["remove"]('in'), ks = window["setTimeout"](() => {
        const gz = gx;
        rW && (rW[gz(0x6ad)] = !0x0);
    }, f["timing"]["commsExit"]));
}

function G1() {
    const gA = cX;
    ws(), rW?.["remove"](), rW = null;
}

function Kl(c) {
    const gB = cX;
    let d = c["advice"];
    if (!d || !d["text"]["trim"]()) return null;
    let g = new Map(R1()["map"](m => [m["action"], m["keys"]])),
        i = d["text"]["replace"](/\{FIRE\}/g, g["get"]("fire") ?? '')["replace"](/\{GRENADE\}/g, g["get"]("grenade") ?? '')["replace"](/\{MOVE\}/g, g["get"]("move") ?? '')["replace"](/\s+/g, '\x20')["trim"](),
        j = EW[d["speaker"]] ?? EW[Xr] ?? x4,
        l = d["seconds"] < 0x0 ? {
            'sticky': !0x0
        } : {
            'seconds': d["seconds"]
        };
    return {
        'speaker': j,
        'text': i,
        'opts': l
    };
}
