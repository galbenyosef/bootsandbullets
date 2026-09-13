// Audio engine
// AudioContext setup, ambience/music/sfx playback, oscillator-based effects, volume settings.
function Yn() {
    const dY = cX;
    if (!f["audio"]["enabled"]) return !0x1;
    if (PT) return PT["state"] === "suspended" && PT["resume"](), !0x0;
    let c = window["AudioContext"] ?? window["webkitAudioContext"];
    if (!c) return !0x1;
    PT = new c(), Me = PT["createGain"](), Me["gain"]["value"] = G()["sound"] ? G()["volume"] : 0x0, Me["connect"](PT["destination"]), de = PT["createGain"](), de["gain"]["value"] = Kn, de["connect"](Me);
    let d = Math["floor"](PT["sampleRate"] * 0.5);
    $n = PT["createBuffer"](0x1, d, PT["sampleRate"]);
    let g = $n["getChannelData"](0x0);
    for (let i = 0x0; i < d; i++) g[i] = Math["random"]() * 0x2 - 0x1;
    return !0x0;
}
A1(c => {
    const dZ = cX;
    !PT || !Me || Me["gain"]["setTargetAtTime"](c["sound"] ? c["volume"] : 0x0, PT["currentTime"], 0.03);
});
var Zr = () => {
    Yn();
};

function Ot() {
    return Yn() ? PT : null;
}
var wl = () => Kn;

function Xn(c) {
    const e7 = cX;
    let d = c === !0x0 ? "ducked" : c === !0x1 ? "full" : c;
    Kn = d === "full" ? 0x1 : d === "ducked" ? 0.35 : 0x0, !(!PT || !de) && de["gain"]["setTargetAtTime"](Kn, PT["currentTime"], 0.08);
}

function Nt() {
    return Yn() ? de : null;
}
var ce = [];

function t1(c, d, g = !0x1) {
    const e8 = cX;
    let i = PT["currentTime"];
    for (let j = ce["length"] - 0x1; j >= 0x0; j--) ce[j]["until"] <= i && ce["splice"](j, 0x1);
    if (ce["length"] >= f["audio"]["maxVoices"]) {
        let l = ce["findIndex"](m => !m["keep"]);
        if (l >= 0x0) {
            try {
                ce[l]["node"]["disconnect"]();
            } catch {}
            ce["splice"](l, 0x1);
        }
    }
    return ce["push"]({
        'node': c,
        'until': d,
        'keep': g
    }), de;
}

function Sl() {
    const e9 = cX;
    if (!PT) return 0x0;
    let c = PT["currentTime"];
    return ce["filter"](d => d["until"] > c)["length"];
}

function pW() {
    return !Yn() || !PT || !Me || !de || !$n ? null : {
        'ctx': PT,
        'master': Me,
        'world': de,
        'noise': $n
    };
}
var El = -0x3b9aca00,
    Qr = () => El;

function Dt(c) {
    const eg = cX;
    Jr = performance["now"]() / 0x3e8, c && (El = Jr);
}
var ps = {};
J2(ps, {
    'sfxAirstrike': () => Ws,
    'sfxClick': () => ls,
    'sfxCollapse': () => is,
    'sfxDenied': () => cs,
    'sfxEnemyShot': () => Jn,
    'sfxExplosion': () => Zn,
    'sfxFlashbang': () => ns,
    'sfxJoin': () => rs,
    'sfxKlaxon': () => ds,
    'sfxLose': () => ms,
    'sfxOrder': () => as,
    'sfxPickup': () => Ft,
    'sfxPlane': () => es,
    'sfxShot': () => Ts,
    'sfxSmoke': () => ts,
    'sfxTinnitus': () => os,
    'sfxWade': () => ss,
    'sfxWin': () => us
});

function fW(c) {
    const ej = cX;
    if (!G()["sound"]) return;
    let d = pW();
    if (!d) return;
    let {
        ctx: g,
        master: j,
        noise: l
    } = d, m = g["currentTime"], p = g["createBufferSource"]();
    p["buffer"] = l, p["loop"] = !0x0, p["loopStart"] = Math["random"]() * 0.3, p["loopEnd"] = p["loopStart"] + 0.2;
    let q = g["createBiquadFilter"]();
    q["type"] = c["type"] ?? "bandpass", q["frequency"]["setValueAtTime"](c["freq"], m), c["sweepTo"] && q["frequency"]["exponentialRampToValueAtTime"](c["sweepTo"], m + c["duration"]), q['Q']["value"] = c['q'];
    let u = g["createGain"]();
    u["gain"]["setValueAtTime"](0x0, m), u["gain"]["linearRampToValueAtTime"](c["gain"], m + 0.004), u["gain"]["exponentialRampToValueAtTime"](0.0005, m + c["duration"]), p["connect"](q)["connect"](u)["connect"](c["chrome"] ? j : t1(u, m + c["duration"] + 0.02, c["keep"] === !0x0)), p["start"](m), p["stop"](m + c["duration"] + 0.02);
}

function L1(c, d, g) {
    const ek = cX;
    if (!G()["sound"]) return;
    let j = pW();
    if (!j) return;
    let {
        ctx: l
    } = j, m = l["currentTime"], p = l["createOscillator"]();
    p["type"] = "sine", p["frequency"]["setValueAtTime"](c, m), p["frequency"]["exponentialRampToValueAtTime"](c * 0.35, m + d);
    let q = l["createGain"]();
    q["gain"]["setValueAtTime"](g, m), q["gain"]["exponentialRampToValueAtTime"](0.0005, m + d), p["connect"](q)["connect"](t1(q, m + d + 0.02)), p["start"](m), p["stop"](m + d + 0.02);
}
var Ml = new Map();

function Ce(c, d) {
    const eq = cX;
    let g = performance["now"]() / 0x3e8;
    return g - (Ml["get"](c) ?? -0x3b9aca00) < d ? !0x1 : (Ml["set"](c, g), !0x0);
}
var $T = (c, d = 0.18) => c * (0x1 + (Math["random"]() * 0x2 - 0x1) * d),
    Ts = () => {
        Dt(!0x0), fW({
            'duration': 0.09,
            'gain': 0.55,
            'freq': $T(0x5dc),
            'q': 1.1,
            'sweepTo': $T(0x1a4),
            'keep': !0x0
        });
    },
    Jn = () => {
        Dt(!0x1), fW({
            'duration': 0.1,
            'gain': 0.4,
            'freq': $T(0x3b6),
            'q': 1.3,
            'sweepTo': $T(0x140)
        });
    },
    Zn = () => {
        const ew = cX;
        Dt(!0x1), fW({
            'duration': 0.55,
            'gain': 0.9,
            'freq': 0x320,
            'q': 0.5,
            'sweepTo': 0x5a,
            'type': "lowpass"
        }), L1(0x6e, 0.45, 0.8);
    },
    Ws = () => {
        const ex = cX;
        Zn(), window["setTimeout"](() => {
            const ez = ex;
            fW({
                'duration': 0.9,
                'gain': 0.75,
                'freq': 0x1a4,
                'q': 0.4,
                'sweepTo': 0x37,
                'type': ez(0xef7)
            }), L1(0x40, 0.8, 0.9);
        }, 0x3c);
    },
    es = () => {
        const eA = cX;
        if (!G()["sound"]) return;
        let c = pW();
        if (!c) return;
        let {
            ctx: d
        } = c, g = d["currentTime"], j = f["callin"]["done"];
        for (let l of [0x52, 0x57]) {
            let m = d["createOscillator"]();
            m["type"] = "sawtooth", m["frequency"]["setValueAtTime"](l, g);
            let p = d["createBiquadFilter"]();
            p["type"] = "lowpass", p["frequency"]["value"] = 0x140;
            let q = d["createGain"]();
            q["gain"]["setValueAtTime"](0.0001, g), q["gain"]["exponentialRampToValueAtTime"](0.16, g + 0.8), q["gain"]["setValueAtTime"](0.16, g + j - 1.2), q["gain"]["exponentialRampToValueAtTime"](0.0005, g + j), m["connect"](p)["connect"](q)["connect"](t1(q, g + j + 0.05)), m["start"](g), m["stop"](g + j + 0.05);
        }
    },
    ts = () => {
        const eB = cX;
        fW({
            'duration': 0.5,
            'gain': 0.4,
            'freq': 0x1a4,
            'q': 0.4,
            'sweepTo': 0xa0,
            'type': "lowpass"
        });
    },
    ns = () => {
        const eC = cX;
        Dt(!0x1), fW({
            'duration': 0.28,
            'gain': 0.95,
            'freq': 0xd48,
            'q': 0.8,
            'sweepTo': 0x2bc,
            'type': "bandpass"
        }), L1(0xf0, 0.12, 0.35);
    },
    os = c => {
        const eD = cX;
        let d = Nt();
        if (!d) return;
        let g = d["context"],
            j = g["currentTime"],
            l = g["createGain"]();
        l["gain"]["setValueAtTime"](0x0, j), l["gain"]["linearRampToValueAtTime"](0.09, j + 0.02), l["gain"]["setValueAtTime"](0.09, j + c * 0.35), l["gain"]["exponentialRampToValueAtTime"](0.0001, j + c), l["connect"](d);
        for (let m of [0x1068, 0x106e]) {
            let p = g["createOscillator"]();
            p["type"] = "sine", p["frequency"]["setValueAtTime"](m, j), p["connect"](l), p["start"](j), p["stop"](j + c + 0.05);
        }
    },
    is = () => {
        const eE = cX;
        if (!Ce("collapse", 0.18) || !G()["sound"]) return;
        let c = pW();
        if (!c) return;
        let {
            ctx: d,
            master: g,
            noise: j
        } = c, l = d["currentTime"] + 0.12, m = (n, q, v, y, A, C, E) => {
            const eF = eE;
            let F = d[eF(0x10e5)]();
            F[eF(0xcdf)] = j, F[eF(0x101f)] = !0x0, F[eF(0x1ea)] = Math[eF(0xeed)]() * 0.3, F[eF(0xdea)] = F[eF(0x1ea)] + 0.2;
            let H = d[eF(0x38c)]();
            H[eF(0xb42)] = n, H[eF(0x1133)][eF(0x7a6)](q, l), H[eF(0x1133)][eF(0x1404)](v, l + E), H['Q'][eF(0x35e)] = y;
            let I = d[eF(0x12dc)]();
            I[eF(0x9d3)][eF(0x7a6)](0.0001, l), I[eF(0x9d3)][eF(0x1404)](A, l + C), I[eF(0x9d3)][eF(0x1404)](0.0005, l + E), F[eF(0x536)](H)[eF(0x536)](I)[eF(0x536)](g), F[eF(0x151e)](l), F[eF(0x16a7)](l + E + 0.05);
        };
        m("lowpass", 0x1f4, 0x3c, 0.6, 0.7, 0.02, 1.4), m("bandpass", 0x578, 0x2bc, 1.4, 0.16, 0.18, 1.1), L1(0x3c, 0.9, 0.65);
    },
    rs = () => {
        const eG = cX;
        if (!G()["sound"]) return;
        let c = pW();
        if (!c) return;
        let {
            ctx: d,
            master: g
        } = c, i = d["currentTime"], j = d["createOscillator"]();
        j["type"] = "triangle", j["frequency"]["setValueAtTime"](0x20b, i), j["frequency"]["setValueAtTime"](0x293, i + 0.08), j["frequency"]["setValueAtTime"](0x310, i + 0.16);
        let l = d["createGain"]();
        l["gain"]["setValueAtTime"](0.3, i), l["gain"]["setValueAtTime"](0.3, i + 0.2), l["gain"]["exponentialRampToValueAtTime"](0.0005, i + 0.34), j["connect"](l)["connect"](g), j["start"](i), j["stop"](i + 0.36);
    },
    Ft = () => {
        const eH = cX;
        if (!G()["sound"]) return;
        let c = pW();
        if (!c) return;
        let {
            ctx: d,
            master: g
        } = c, i = d["currentTime"], j = d["createOscillator"]();
        j["type"] = "square", j["frequency"]["setValueAtTime"](0x294, i), j["frequency"]["setValueAtTime"](0x3de, i + 0.06);
        let l = d["createGain"]();
        l["gain"]["setValueAtTime"](0.18, i), l["gain"]["exponentialRampToValueAtTime"](0.0005, i + 0.16), j["connect"](l)["connect"](g), j["start"](i), j["stop"](i + 0.18);
    },
    ss = c => {
        const eI = cX;
        if (Ce("wade", 0.12)) {
            if (c) {
                fW({
                    'duration': 0.26,
                    'gain': 0.2,
                    'freq': $T(0x1a4, 0.1),
                    'q': 1.2,
                    'sweepTo': 0x8c,
                    'type': "lowpass"
                }), L1($T(0x5a, 0.12), 0.2, 0.22);
                return;
            }
            fW({
                'duration': 0.09,
                'gain': 0.22,
                'freq': $T(0x898),
                'q': 0x2,
                'sweepTo': $T(0x384)
            });
        }
    },
    as = () => fW({
        'duration': 0.045,
        'gain': 0.16,
        'freq': 0x960,
        'q': 0x3
    }),
    ls = () => fW({
        'chrome': !0x0,
        'duration': 0.05,
        'gain': 0.3,
        'freq': 0x5dc,
        'q': 0x3
    }),
    cs = () => fW({
        'duration': 0.07,
        'gain': 0.2,
        'freq': 0x140,
        'q': 0x2,
        'sweepTo': 0xbe
    }),
    ds = () => {
        const eJ = cX;
        if (!G()["sound"]) return;
        let c = pW();
        if (!c) return;
        let {
            ctx: d,
            master: g
        } = c, j = d["currentTime"], l = d["createBiquadFilter"]();
        l["type"] = "lowpass", l["frequency"]["value"] = 0x1f4, l['Q']["value"] = 0.7;
        let m = d["createGain"]();
        m["gain"]["setValueAtTime"](0.0001, j), m["gain"]["exponentialRampToValueAtTime"](0.13, j + 0.06), m["gain"]["setValueAtTime"](0.13, j + 0.45), m["gain"]["exponentialRampToValueAtTime"](0.0005, j + 0.95), l["connect"](m)["connect"](g);
        for (let p of [0x74, 174.5]) {
            let q = d["createOscillator"]();
            q["type"] = "sawtooth", q["frequency"]["setValueAtTime"](p, j), q["frequency"]["exponentialRampToValueAtTime"](p * 0.97, j + 0.95), q["connect"](l), q["start"](j), q["stop"](j + 0x1);
        }
    },
    us = () => {
        const eK = cX;
        if (!G()["sound"]) return;
        let c = pW();
        if (!c) return;
        let {
            ctx: d,
            master: g
        } = c, i = d["currentTime"];
        [0x20b, 0x293, 0x310, 0x417]["forEach"]((j, l) => {
            const eL = eK;
            let m = d[eL(0x778)]();
            m[eL(0xb42)] = eL(0xb60), m[eL(0x1133)][eL(0x35e)] = j;
            let p = d[eL(0x12dc)]();
            p[eL(0x9d3)][eL(0x7a6)](0x0, i + l * 0.11), p[eL(0x9d3)][eL(0x11fd)](0.16, i + l * 0.11 + 0.01), p[eL(0x9d3)][eL(0x1404)](0.0005, i + l * 0.11 + 0.24), m[eL(0x536)](p)[eL(0x536)](g), m[eL(0x151e)](i + l * 0.11), m[eL(0x16a7)](i + l * 0.11 + 0.26);
        });
    },
    ms = () => {
        const eM = cX;
        if (!G()["sound"]) return;
        let c = pW();
        if (!c) return;
        let {
            ctx: d,
            master: g
        } = c, i = d["currentTime"];
        [0x188, 0x14a, 0x106, 0xc4]["forEach"]((j, l) => {
            const eN = eM;
            let m = d[eN(0x778)]();
            m[eN(0xb42)] = eN(0xfea), m[eN(0x1133)][eN(0x35e)] = j;
            let p = d[eN(0x12dc)]();
            p[eN(0x9d3)][eN(0x7a6)](0x0, i + l * 0.14), p[eN(0x9d3)][eN(0x11fd)](0.13, i + l * 0.14 + 0.02), p[eN(0x9d3)][eN(0x1404)](0.0005, i + l * 0.14 + 0.3), m[eN(0x536)](p)[eN(0x536)](g), m[eN(0x151e)](i + l * 0.14), m[eN(0x16a7)](i + l * 0.14 + 0.32);
        });
    },
    fs = {};
J2(fs, {
    'sfxDeath': () => Wo,
    'sfxGrunt': () => eo,
    'sfxScream': () => To,
    'sfxSquawk': () => to,
    'sfxVoice': () => O1
});

function Qn(j, q, A) {
    const eO = cX;
    if (!G()["sound"]) return;
    let C = pW();
    if (!C) return;
    let {
        ctx: F,
        noise: H
    } = C, I = F["currentTime"], K = F["createStereoPanner"]();
    K["pan"]["value"] = Math["max"](-0x1, Math["min"](0x1, j));
    let L = I + Math["max"](A["dur"], ...q["map"](Q => Q['at'] + Q["dur"])) + 0.05;
    K["connect"](t1(K, L));
    for (let Q of q) {
        let R = I + Q['at'],
            S = F["createOscillator"]();
        S["type"] = "sawtooth", S["frequency"]["setValueAtTime"](Q["from"], R), Q["peak"] && S["frequency"]["exponentialRampToValueAtTime"](Q["peak"], R + Q["dur"] * 0.18), S["frequency"]["exponentialRampToValueAtTime"](Q['to'], R + Q["dur"]);
        let U = F["createBiquadFilter"]();
        U["type"] = "lowpass", U["frequency"]["setValueAtTime"](0x708, R), U["frequency"]["exponentialRampToValueAtTime"](0x2bc, R + Q["dur"]);
        let V = F["createGain"]();
        V["gain"]["setValueAtTime"](0.0001, R), V["gain"]["exponentialRampToValueAtTime"](Q["gain"], R + 0.03), V["gain"]["exponentialRampToValueAtTime"](0.0005, R + Q["dur"]), S["connect"](U)["connect"](V)["connect"](K);
        let X = F["createBiquadFilter"]();
        X["type"] = "bandpass", X["frequency"]["value"] = 0x2bc, X['Q']["value"] = 0x4;
        let Y = F["createGain"]();
        if (Y["gain"]["value"] = Q["gain"] * 0.5, S["connect"](X)["connect"](Y)["connect"](K), S["start"](R), S["stop"](R + Q["dur"] + 0.02), Q["breathy"]) {
            let a7 = F["createBufferSource"]();
            a7["buffer"] = H, a7["loop"] = !0x0, a7["loopStart"] = Math["random"]() * 0.3, a7["loopEnd"] = a7["loopStart"] + 0.2;
            let a8 = F["createBiquadFilter"]();
            a8["type"] = "bandpass", a8["frequency"]["value"] = 0x384, a8['Q']["value"] = 1.2;
            let a9 = F["createGain"]();
            a9["gain"]["setValueAtTime"](Q["gain"] * 0.9, R), a9["gain"]["exponentialRampToValueAtTime"](0.0005, R + Q["dur"]), a7["connect"](a8)["connect"](a9)["connect"](K), a7["start"](R), a7["stop"](R + Q["dur"] + 0.02);
        }
    }
    let M = F["createBufferSource"]();
    M["buffer"] = H, M["loop"] = !0x0, M["loopStart"] = Math["random"]() * 0.3, M["loopEnd"] = M["loopStart"] + 0.2;
