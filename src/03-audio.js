function initAudioContext() {
    const dY = cX;
    if (!f.audio.enabled) return false;
    if (PT) return PT.state === "suspended" && PT.resume(), true;
    let c = window.AudioContext ?? window.webkitAudioContext;
    if (!c) return false;
    PT = new c(), Me = PT.createGain(), Me.gain.value = G().sound ? G().volume : 0, Me.connect(PT.destination), de = PT.createGain(), de.gain.value = Kn, de.connect(Me);
    let d = Math.floor(PT.sampleRate * 0.5);
    $n = PT.createBuffer(1, d, PT.sampleRate);
    let g = $n.getChannelData(0);
    for (let i = 0; i < d; i++) g[i] = Math.random() * 2 - 1;
    return true;
}
A1(c => {
    const dZ = cX;
    !PT || !Me || Me.gain.setTargetAtTime(c.sound ? c.volume : 0, PT.currentTime, 0.03);
});
var Zr = () => {
    initAudioContext();
};

function Ot() {
    return initAudioContext() ? PT : null;
}
var wl = () => Kn;

function Xn(c) {
    const e7 = cX;
    let d = c === true ? "ducked" : c === false ? "full" : c;
    Kn = d === "full" ? 1 : d === "ducked" ? 0.35 : 0, !(!PT || !de) && de.gain.setTargetAtTime(Kn, PT.currentTime, 0.08);
}

function Nt() {
    return initAudioContext() ? de : null;
}
var activeVoices = [];

function registerVoice(c, d, g = false) {
    const e8 = cX;
    let i = PT.currentTime;
    for (let j = activeVoices.length - 1; j >= 0; j--) activeVoices[j].until <= i && activeVoices.splice(j, 1);
    if (activeVoices.length >= f.audio.maxVoices) {
        let l = activeVoices.findIndex(m => !m.keep);
        if (l >= 0) {
            try {
                activeVoices[l].node.disconnect();
            } catch {}
            activeVoices.splice(l, 1);
        }
    }
    return activeVoices.push({
        node: c,
        until: d,
        keep: g
    }), de;
}

function Sl() {
    const e9 = cX;
    if (!PT) return 0;
    let c = PT.currentTime;
    return activeVoices.filter(d => d.until > c).length;
}

function pW() {
    return !initAudioContext() || !PT || !Me || !de || !$n ? null : {
        ctx: PT,
        master: Me,
        world: de,
        noise: $n
    };
}
var lastAudioGestureAt = -1000000000,
    Qr = () => lastAudioGestureAt;

function updateAudioActivity(c) {
    const eg = cX;
    Jr = performance.now() / 1000, c && (lastAudioGestureAt = Jr);
}
var ps = {};
J2(ps, {
    sfxAirstrike: () => Ws,
    sfxClick: () => ls,
    sfxCollapse: () => is,
    sfxDenied: () => cs,
    sfxEnemyShot: () => Jn,
    sfxExplosion: () => Zn,
    sfxFlashbang: () => ns,
    sfxJoin: () => rs,
    sfxKlaxon: () => ds,
    sfxLose: () => ms,
    sfxOrder: () => as,
    sfxPickup: () => Ft,
    sfxPlane: () => es,
    sfxShot: () => Ts,
    sfxSmoke: () => ts,
    sfxTinnitus: () => os,
    sfxWade: () => ss,
    sfxWin: () => us
});

function fW(c) {
    const ej = cX;
    if (!G().sound) return;
    let d = pW();
    if (!d) return;
    let {
        ctx: g,
        master: j,
        noise: l
    } = d, m = g.currentTime, p = g.createBufferSource();
    p.buffer = l, p.loop = true, p.loopStart = Math.random() * 0.3, p.loopEnd = p.loopStart + 0.2;
    let q = g.createBiquadFilter();
    q.type = c.type ?? "bandpass", q.frequency.setValueAtTime(c.freq, m), c.sweepTo && q.frequency.exponentialRampToValueAtTime(c.sweepTo, m + c.duration), q.Q.value = c.q;
    let u = g.createGain();
    u.gain.setValueAtTime(0, m), u.gain.linearRampToValueAtTime(c.gain, m + 0.004), u.gain.exponentialRampToValueAtTime(0.0005, m + c.duration), p.connect(q).connect(u).connect(c.chrome ? j : registerVoice(u, m + c.duration + 0.02, c.keep === true)), p.start(m), p.stop(m + c.duration + 0.02);
}

function playSineTone(c, d, g) {
    const ek = cX;
    if (!G().sound) return;
    let j = pW();
    if (!j) return;
    let {
        ctx: l
    } = j, m = l.currentTime, p = l.createOscillator();
    p.type = "sine", p.frequency.setValueAtTime(c, m), p.frequency.exponentialRampToValueAtTime(c * 0.35, m + d);
    let q = l.createGain();
    q.gain.setValueAtTime(g, m), q.gain.exponentialRampToValueAtTime(0.0005, m + d), p.connect(q).connect(registerVoice(q, m + d + 0.02)), p.start(m), p.stop(m + d + 0.02);
}
var lastPlayedAt = new Map();

function Ce(c, d) {
    const eq = cX;
    let g = performance.now() / 1000;
    return g - (lastPlayedAt.get(c) ?? -1000000000) < d ? false : (lastPlayedAt.set(c, g), true);
}
var $T = (c, d = 0.18) => c * (1 + (Math.random() * 2 - 1) * d),
    Ts = () => {
        updateAudioActivity(true), fW({
            duration: 0.09,
            gain: 0.55,
            freq: $T(1500),
            q: 1.1,
            sweepTo: $T(420),
            keep: true
        });
    },
    Jn = () => {
        updateAudioActivity(false), fW({
            duration: 0.1,
            gain: 0.4,
            freq: $T(950),
            q: 1.3,
            sweepTo: $T(320)
        });
    },
    Zn = () => {
        const ew = cX;
        updateAudioActivity(false), fW({
            duration: 0.55,
            gain: 0.9,
            freq: 800,
            q: 0.5,
            sweepTo: 90,
            type: "lowpass"
        }), playSineTone(110, 0.45, 0.8);
    },
    Ws = () => {
        const ex = cX;
        Zn(), window.setTimeout(() => {
            const ez = ex;
            fW({
                duration: 0.9,
                gain: 0.75,
                freq: 420,
                q: 0.4,
                sweepTo: 55,
                type: "lowpass"
            }), playSineTone(64, 0.8, 0.9);
        }, 60);
    },
    es = () => {
        const eA = cX;
        if (!G().sound) return;
        let c = pW();
        if (!c) return;
        let {
            ctx: d
        } = c, g = d.currentTime, j = f.callin.done;
        for (let l of [82, 87]) {
            let m = d.createOscillator();
            m.type = "sawtooth", m.frequency.setValueAtTime(l, g);
            let p = d.createBiquadFilter();
            p.type = "lowpass", p.frequency.value = 320;
            let q = d.createGain();
            q.gain.setValueAtTime(0.0001, g), q.gain.exponentialRampToValueAtTime(0.16, g + 0.8), q.gain.setValueAtTime(0.16, g + j - 1.2), q.gain.exponentialRampToValueAtTime(0.0005, g + j), m.connect(p).connect(q).connect(registerVoice(q, g + j + 0.05)), m.start(g), m.stop(g + j + 0.05);
        }
    },
    ts = () => {
        const eB = cX;
        fW({
            duration: 0.5,
            gain: 0.4,
            freq: 420,
            q: 0.4,
            sweepTo: 160,
            type: "lowpass"
        });
    },
    ns = () => {
        const eC = cX;
        updateAudioActivity(false), fW({
            duration: 0.28,
            gain: 0.95,
            freq: 3400,
            q: 0.8,
            sweepTo: 700,
            type: "bandpass"
        }), playSineTone(240, 0.12, 0.35);
    },
    os = c => {
        const eD = cX;
        let d = Nt();
        if (!d) return;
        let g = d.context,
            j = g.currentTime,
            l = g.createGain();
        l.gain.setValueAtTime(0, j), l.gain.linearRampToValueAtTime(0.09, j + 0.02), l.gain.setValueAtTime(0.09, j + c * 0.35), l.gain.exponentialRampToValueAtTime(0.0001, j + c), l.connect(d);
        for (let m of [4200, 4206]) {
            let p = g.createOscillator();
            p.type = "sine", p.frequency.setValueAtTime(m, j), p.connect(l), p.start(j), p.stop(j + c + 0.05);
        }
    },
    is = () => {
        const eE = cX;
        if (!Ce("collapse", 0.18) || !G().sound) return;
        let c = pW();
        if (!c) return;
        let {
            ctx: d,
            master: g,
            noise: j
        } = c, l = d.currentTime + 0.12, m = (n, q, v, y, A, C, E) => {
            const eF = eE;
            let F = d.createBufferSource();
            F.buffer = j, F.loop = true, F.loopStart = Math.random() * 0.3, F.loopEnd = F.loopStart + 0.2;
            let H = d.createBiquadFilter();
            H.type = n, H.frequency.setValueAtTime(q, l), H.frequency.exponentialRampToValueAtTime(v, l + E), H.Q.value = y;
            let I = d.createGain();
            I.gain.setValueAtTime(0.0001, l), I.gain.exponentialRampToValueAtTime(A, l + C), I.gain.exponentialRampToValueAtTime(0.0005, l + E), F.connect(H).connect(I).connect(g), F.start(l), F.stop(l + E + 0.05);
        };
        m("lowpass", 500, 60, 0.6, 0.7, 0.02, 1.4), m("bandpass", 1400, 700, 1.4, 0.16, 0.18, 1.1), playSineTone(60, 0.9, 0.65);
    },
    rs = () => {
        const eG = cX;
        if (!G().sound) return;
        let c = pW();
        if (!c) return;
        let {
            ctx: d,
            master: g
        } = c, i = d.currentTime, j = d.createOscillator();
        j.type = "triangle", j.frequency.setValueAtTime(523, i), j.frequency.setValueAtTime(659, i + 0.08), j.frequency.setValueAtTime(784, i + 0.16);
        let l = d.createGain();
        l.gain.setValueAtTime(0.3, i), l.gain.setValueAtTime(0.3, i + 0.2), l.gain.exponentialRampToValueAtTime(0.0005, i + 0.34), j.connect(l).connect(g), j.start(i), j.stop(i + 0.36);
    },
    Ft = () => {
        const eH = cX;
        if (!G().sound) return;
        let c = pW();
        if (!c) return;
        let {
            ctx: d,
            master: g
        } = c, i = d.currentTime, j = d.createOscillator();
        j.type = "square", j.frequency.setValueAtTime(660, i), j.frequency.setValueAtTime(990, i + 0.06);
        let l = d.createGain();
        l.gain.setValueAtTime(0.18, i), l.gain.exponentialRampToValueAtTime(0.0005, i + 0.16), j.connect(l).connect(g), j.start(i), j.stop(i + 0.18);
    },
    ss = c => {
        const eI = cX;
        if (Ce("wade", 0.12)) {
            if (c) {
                fW({
                    duration: 0.26,
                    gain: 0.2,
                    freq: $T(420, 0.1),
                    q: 1.2,
                    sweepTo: 140,
                    type: "lowpass"
                }), playSineTone($T(90, 0.12), 0.2, 0.22);
                return;
            }
            fW({
                duration: 0.09,
                gain: 0.22,
                freq: $T(2200),
                q: 2,
                sweepTo: $T(900)
            });
        }
    },
    as = () => fW({
        duration: 0.045,
        gain: 0.16,
        freq: 2400,
        q: 3
    }),
    ls = () => fW({
        chrome: true,
        duration: 0.05,
        gain: 0.3,
        freq: 1500,
        q: 3
    }),
    cs = () => fW({
        duration: 0.07,
        gain: 0.2,
        freq: 320,
        q: 2,
        sweepTo: 190
    }),
    ds = () => {
        const eJ = cX;
        if (!G().sound) return;
        let c = pW();
        if (!c) return;
        let {
            ctx: d,
            master: g
        } = c, j = d.currentTime, l = d.createBiquadFilter();
        l.type = "lowpass", l.frequency.value = 500, l.Q.value = 0.7;
        let m = d.createGain();
        m.gain.setValueAtTime(0.0001, j), m.gain.exponentialRampToValueAtTime(0.13, j + 0.06), m.gain.setValueAtTime(0.13, j + 0.45), m.gain.exponentialRampToValueAtTime(0.0005, j + 0.95), l.connect(m).connect(g);
        for (let p of [116, 174.5]) {
            let q = d.createOscillator();
            q.type = "sawtooth", q.frequency.setValueAtTime(p, j), q.frequency.exponentialRampToValueAtTime(p * 0.97, j + 0.95), q.connect(l), q.start(j), q.stop(j + 1);
        }
    },
    us = () => {
        const eK = cX;
        if (!G().sound) return;
        let c = pW();
        if (!c) return;
        let {
            ctx: d,
            master: g
        } = c, i = d.currentTime;
        [523, 659, 784, 1047].forEach((j, l) => {
            const eL = eK;
            let m = d.createOscillator();
            m.type = "square", m.frequency.value = j;
            let p = d.createGain();
            p.gain.setValueAtTime(0, i + l * 0.11), p.gain.linearRampToValueAtTime(0.16, i + l * 0.11 + 0.01), p.gain.exponentialRampToValueAtTime(0.0005, i + l * 0.11 + 0.24), m.connect(p).connect(g), m.start(i + l * 0.11), m.stop(i + l * 0.11 + 0.26);
        });
    },
    ms = () => {
        const eM = cX;
        if (!G().sound) return;
        let c = pW();
        if (!c) return;
        let {
            ctx: d,
            master: g
        } = c, i = d.currentTime;
        [392, 330, 262, 196].forEach((j, l) => {
            const eN = eM;
            let m = d.createOscillator();
            m.type = "sawtooth", m.frequency.value = j;
            let p = d.createGain();
            p.gain.setValueAtTime(0, i + l * 0.14), p.gain.linearRampToValueAtTime(0.13, i + l * 0.14 + 0.02), p.gain.exponentialRampToValueAtTime(0.0005, i + l * 0.14 + 0.3), m.connect(p).connect(g), m.start(i + l * 0.14), m.stop(i + l * 0.14 + 0.32);
        });
    },
    fs = {};
J2(fs, {
    sfxDeath: () => Wo,
    sfxGrunt: () => eo,
    sfxScream: () => To,
    sfxSquawk: () => to,
    sfxVoice: () => O1
});

function Qn(j, q, A) {
    const eO = cX;
    if (!G().sound) return;
    let C = pW();
    if (!C) return;
    let {
        ctx: F,
        noise: H
    } = C, I = F.currentTime, K = F.createStereoPanner();
    K.pan.value = Math.max(-1, Math.min(1, j));
    let L = I + Math.max(A.dur, ...q.map(Q => Q.at + Q.dur)) + 0.05;
    K.connect(registerVoice(K, L));
    for (let Q of q) {
        let R = I + Q.at,
            S = F.createOscillator();
        S.type = "sawtooth", S.frequency.setValueAtTime(Q.from, R), Q.peak && S.frequency.exponentialRampToValueAtTime(Q.peak, R + Q.dur * 0.18), S.frequency.exponentialRampToValueAtTime(Q.to, R + Q.dur);
        let U = F.createBiquadFilter();
        U.type = "lowpass", U.frequency.setValueAtTime(1800, R), U.frequency.exponentialRampToValueAtTime(700, R + Q.dur);
        let V = F.createGain();
        V.gain.setValueAtTime(0.0001, R), V.gain.exponentialRampToValueAtTime(Q.gain, R + 0.03), V.gain.exponentialRampToValueAtTime(0.0005, R + Q.dur), S.connect(U).connect(V).connect(K);
        let X = F.createBiquadFilter();
        X.type = "bandpass", X.frequency.value = 700, X.Q.value = 4;
        let Y = F.createGain();
        if (Y.gain.value = Q.gain * 0.5, S.connect(X).connect(Y).connect(K), S.start(R), S.stop(R + Q.dur + 0.02), Q.breathy) {
            let a7 = F.createBufferSource();
            a7.buffer = H, a7.loop = true, a7.loopStart = Math.random() * 0.3, a7.loopEnd = a7.loopStart + 0.2;
            let a8 = F.createBiquadFilter();
            a8.type = "bandpass", a8.frequency.value = 900, a8.Q.value = 1.2;
            let a9 = F.createGain();
            a9.gain.setValueAtTime(Q.gain * 0.9, R), a9.gain.exponentialRampToValueAtTime(0.0005, R + Q.dur), a7.connect(a8).connect(a9).connect(K), a7.start(R), a7.stop(R + Q.dur + 0.02);
        }
    }
    let M = F.createBufferSource();
    M.buffer = H, M.loop = true, M.loopStart = Math.random() * 0.3, M.loopEnd = M.loopStart + 0.2;