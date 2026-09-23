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
var cW = f.audio.ambience,
    e5 = {
        jungle: {
            windCutoff: 400,
            windTrim: 1,
            whistle: false,
            insects: "crickets",
            insectsFloor: 0,
            birds: "jungle",
            birdRate: 1,
            birdFloor: 0
        },
        desert: {
            windCutoff: 700,
            windTrim: 0.9,
            whistle: false,
            insects: "cicadas",
            insectsFloor: 0.35,
            birds: "desert",
            birdRate: 0.4,
            birdFloor: 0.3
        },
        arctic: {
            windCutoff: 300,
            windTrim: 1.3,
            whistle: true,
            insects: "none",
            insectsFloor: 0,
            birds: "arctic",
            birdRate: 0.25,
            birdFloor: 0.2
        }
    },
    k1 = null,
    ke = null,
    we = e5.jungle,
    bT = null,
    Xe = {
        water: 0,
        wind: 0,
        rustle: 0,
        insects: 0,
        birds: 0,
        gust: 0,
        scared: false
    },
    Nn = 0,
    Dn = 0,
    jr = false,
    W5 = c => c < 0 ? 0 : c > 1 ? 1 : c,
    Q6 = (c, d, g) => c + (d - c) * g,
    t5 = () => {
        const LC = cX;
        if (!bT) return;
        let c = bT.ctx.currentTime;
        bT.bus.gain.setTargetAtTime(document.hidden ? 0 : cW.level, c, document.hidden ? 0.05 : 0.3);
    };

function Je(c) {
    const LD = cX;
    Dn && (window.clearTimeout(Dn), Dn = 0), n5(), k1 = c, ke = no(c), we = e5[c.theme], Xe = {
        water: 0,
        wind: 0,
        rustle: 0,
        insects: 0,
        birds: 0,
        gust: 0,
        scared: false
    }, Nn = 0, jr || (document.addEventListener("visibilitychange", t5), jr = true);
}

function Ze() {
    const LE = cX;
    if (k1 = null, ke = null, jr && (document.removeEventListener("visibilitychange", t5), jr = false), !bT) return;
    let c = bT.ctx.currentTime;
    bT.bus.gain.cancelScheduledValues(c), bT.bus.gain.setValueAtTime(bT.bus.gain.value, c), bT.bus.gain.linearRampToValueAtTime(0, c + 0.5), Dn = window.setTimeout(() => {
        Dn = 0, n5();
    }, 700);
}

function n5() {
    const LF = cX;
    if (bT) {
        for (let c of bT.sources) try {
            c.stop();
        } catch {}
        for (let d of bT.oscillators) try {
            d.stop();
        } catch {}
        bT.bus.disconnect(), bT = null;
    }
}

function o5() {
    const LG = cX;
    return k1 ? {
        ...Xe,
        running: bT !== null,
        theme: k1.theme,
        ctxState: bT?.ctx.state ?? null
    } : null;
}

function T_(g, j) {
    const LH = cX;
    let l = g.createGain();
    l.gain.value = document.hidden ? 0 : cW.level, l.connect(j);
    let q = [],
        s = [],
        y = Math.floor(g.sampleRate * 4),
        A = g.createBuffer(1, y, g.sampleRate),
        C = A.getChannelData(0);
    for (let M = 0; M < y; M++) C[M] = Math.random() * 2 - 1;
    let E = {
            ctx: g,
            voice: we,
            oscillators: s,
            bed: () => {
                const LI = LH;
                let N = g[LI(4325)]();
                return N[LI(3295)] = A, N[LI(4127)] = true, N[LI(5406)](g[LI(5636)], Math[LI(3821)]() * 4), q[LI(3087)](N), N;
            },
            lfo: (N, P, Q) => {
                const LJ = LH;
                let R = g[LJ(1912)]();
                R[LJ(4403)][LJ(862)] = N;
                let S = g[LJ(4828)]();
                S[LJ(2515)][LJ(862)] = P, R[LJ(1334)](S)[LJ(1334)](Q), R[LJ(5406)](), s[LJ(3087)](R);
            },
            layer: () => {
                const LK = LH;
                let N = g[LK(4828)]();
                return N[LK(2515)][LK(862)] = 0, N[LK(1334)](l), N;
            }
        },
        F = X3(E),
        H = J3(E),
        I = Z3(E),
        K = Q3(E),
        L = T5(E);
    return {
        ctx: g,
        bus: l,
        water: F,
        wind: H,
        rustle: I,
        insects: K,
        birds: L,
        sources: q,
        oscillators: s
    };
}

function W_(d) {
    const LL = cX;
    let g = d.ctx,
        j = g.currentTime + 0.02,
        m = g.createStereoPanner();
    m.pan.value = Math.random() * 1.6 - 0.8, m.connect(d.birds);
    let p = (A, C, E, F, H, I = "triangle") => {
        const LM = LL;
        let K = g[LM(1912)]();
        K[LM(2882)] = I, K[LM(4403)][LM(1958)](C, A), K[LM(4403)][LM(5124)](E, A + F);
        let L = g[LM(4828)]();
        L[LM(2515)][LM(1958)](0, A), L[LM(2515)][LM(4605)](H, A + 0.005), L[LM(2515)][LM(5124)](0.0005, A + F), K[LM(1334)](L)[LM(1334)](m), K[LM(5406)](A), K[LM(5799)](A + F + 0.02);
    };
    if (we.birds === "arctic") {
        p(j, 1200, 650, 0.5, 0.05, "sawtooth");
        return;
    }
    if (we.birds === "desert" || Math.random() < 0.2) {
        p(j, 900, 1400, 0.2, 0.07);
        return;
    }
    let q = 1800 + Math.random() * 1800,
        u = Math.random() < 0.5,
        v = 2 + Math.floor(Math.random() * 4),
        y = j;
    for (let A = 0; A < v; A++) {
        let C = q * (1 + (Math.random() - 0.5) * 0.1),
            E = 1.25 + Math.random() * 0.15;
        p(y, C, u ? C * E : C / E, 0.04 + Math.random() * 0.04, 0.08), y += 0.07 + Math.random() * 0.07;
    }
}

function Qe(j, q, A, C) {
    const LN = cX;
    if (!k1 || !ke || (Nn += A, Nn < cW.tick)) return;
    let F = Nn;
    if (Nn = 0, !bT) {
        let aj = Ot(),
            ak = Nt();
        if (!aj || !ak) return;
        bT = T_(aj, ak);
    }
    let H = f.wind,
        I = j.x + j.viewW / 2,
        K = j.y + j.viewH / 2,
        L = performance.now() / 1000,
        N = (aq, aw) => wW(ke.wetSdf, ke.width, ke.height, k1.tile, aq, aw),
        P = Math.min(N(I, K), N(j.x + j.viewW * 0.25, K), N(j.x + j.viewW * 0.75, K), N(I, j.y + j.viewH * 0.25), N(I, j.y + j.viewH * 0.75)),
        Q = W5(1 - P / cW.waterRange),
        R = wW(ke.foliageSdf, ke.width, ke.height, k1.tile, I, K),
        S = W5(1 - R / cW.foliageRange),
        U = 0.65 + 0.35 * Math.sin((I + K) * H.gustScale + q * H.gustSpeed),
        V = L - zn() < cW.scareTime,
        X = we.insects === "none" ? 0 : Math.max(S, we.insectsFloor),
        Y = L - zn() < 2 ? 0.4 : 1;
    Xe = {
        water: C ? cW.water * Q * Q : 0,
        wind: C ? cW.wind * we.windTrim * U * U : 0,
        rustle: C ? cW.rustle * S * Math.pow(Math.max(0, U - 0.5), 3) * 8 : 0,
        insects: C ? cW.insects * X * Y : 0,
        birds: C && !V ? cW.birds : 0,
        gust: U,
        scared: V
    };
    let a7 = bT.ctx.currentTime,
        a8 = C ? cW.ramp : 0.4;
    bT.water.gain.setTargetAtTime(Xe.water, a7, a8), bT.insects.gain.setTargetAtTime(Xe.insects, a7, a8), bT.wind.gain.setTargetAtTime(Xe.wind, a7, C ? 0.2 : 0.4), bT.rustle.gain.setTargetAtTime(Xe.rustle, a7, C ? 0.2 : 0.4), bT.birds.gain.setTargetAtTime(Xe.birds, a7, V || !C ? 0.15 : cW.birdRecover);
    let a9 = Math.max(S, we.birdFloor);
    if (C && !V && G().sound && a9 >= 0.1) {
        let aq = Q6(cW.birdMaxGap, cW.birdMinGap, a9);
        Math.random() < F / aq * we.birdRate && W_(bT);
    }
}
var e_ = "loading",
    t_ = "#f0d878",
    n_ = "#4a4326",
    _W = null,
    O2 = 0;

function i5() {
    const LO = cX;
    if (_W && _W.isConnected) return _W;
    _W = document.createElement("div"), _W.id = e_;
    let c = document.createElement("canvas");
    return c.width = 124, c.height = 124, c.style.width = "62px", c.style.height = "62px", _W.appendChild(c), _W.appendChild(Object.assign(document.createElement('p'), {
        className: "loading-word"
    })), document.body.appendChild(_W), _W;
}

function r5() {
    const LP = cX;
    let c = i5().querySelector("canvas");
    if (!c) return;
    let d = c.getContext('2d');
    if (!d) return;
    d.imageSmoothingEnabled = false, d.clearRect(0, 0, c.width, c.height);
    let g = c.width / 2,
        j = c.height / 2;
    for (let m = 0; m < 8; m++) {
        let p = m / 8 * Math.PI * 2 - Math.PI / 2,
            q = Math.round(g + Math.cos(p) * 26 * 2),
            u = Math.round(j + Math.sin(p) * 26 * 2),
            v = m === O2 % 8;
        d.fillStyle = v ? t_ : n_;
        let y = (v ? 6 : 5) * 2;
        d.fillRect(Math.round(q - y / 2), Math.round(u - y / 2), y, y);
    }
}

function s5() {
    const LQ = cX;
    O2 = 0;
    let c = i5();
    c.hidden = false, r5(), l5('');
}

function a5(c) {
    const LR = cX;
    !_W || _W.hidden || (O2++, r5(), l5(c));
}

function l5(c) {
    const LS = cX;
    let d = _W?.querySelector(".loading-word");
    d && (d.textContent = c.toUpperCase());
}

function c5() {
    const LU = cX;
    _W && (_W.hidden = true);
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
            window.requestAnimationFrame(g);
        };
        g();
    });
}
async function Et(c, d, g) {
    const LX = cX;
    s5(), await N2(), await c.prepareStaged(d, BW(d, g), async i => {
        a5(i), await N2();
    }), c5();
}

function Mt(c, d, g) {
    const LY = cX;
    Go("Paused", c, [{
        label: d,
        tone: "good",
        key: "Enter P",
        primary: true,
        onPick: () => {}
    }, g, {
        label: "Settings",
        onPick: () => Vo()
    }], true);
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
    } = d.shell, u = null;
    nt();
    let v = Te(aT[d5], d5);
    j.prepare(v, BW(v, "veteran")), m.mode = "spectator", document.body.dataset.mode = "spectator", q.apply(), u = new St(v, g, m, () => j.clearDecals());
    let y = u;
    d.set({
        name: "arena",
        world: y.world,
        step: F => {
            const M1 = LZ;
            y[M1(5610)](F), G()[M1(5417)] && p[M1(3230)](y[M1(4006)](), G()[M1(2096)]);
        },
        draw: (F, H) => {
            const M5 = LZ;
            j[M5(2527)](y[M5(3300)], g, F, H), Qe(g, j[M5(1261)], H, true);
        }
    }), Je(v);
    let A = () => {
            const M6 = LZ;
            u && (G()[M6(5417)] ? p[M6(3230)](u[M6(4006)](), G()[M6(2096)]) : p[M6(1745)]());
        },
        C = F => {
            const M7 = LZ;
            F[M7(2547)] === 'c' || F[M7(2547)] === 'C' ? (mW({
                arenaLockCamera: !G()[M7(2096)]
            }), G()[M7(2096)] || g[M7(5414)](), A()) : (F[M7(2547)] === 'h' || F[M7(2547)] === 'H') && (mW({
                arenaShowScore: !G()[M7(5417)]
            }), A());
        };
    window.addEventListener("keydown", C), A();
    let E = () => {
        const M8 = LZ;
        u && (u[M8(3886)] = true);
    };
    m.onPause = E, MW(1), He(f.banner.fade), await T1(() => u?.exitRequested ? (u = null, d.set(null), m.mode = "play", delete document.body.dataset.mode, q.apply(), m.onPause = null, window.removeEventListener("keydown", C), Ze(), p.hideArena(), true) : null);
}
var m5 = {
        weapon: "basicRifle",
        throwable: "frag",
        grenades: 2
    },
    o_ = ["ABLE", "BAKER", "CHARLIE", "DOG", "EASY", "FOX"],
    i_ = ["ROT", "GELB", "BLAU", "GRAU", "BRAUN", "GRUN"],
    p5 = (c, d) => c.slice(0, d).map(g => ({
        name: g,
        missions: 0,
        own: false,
        fresh: true
    }));

function Ir(g, j = f.skirmish.seconds, m = m5, p = m5, q = [], u = 0, v = f.skirmish.squad, y = 0) {
    const M9 = cX;
    let A = Number.isInteger(v) && v > 0 ? v : f.skirmish.squad,
        C = Math.max(1, Math.min(A, g.playerSpawns.length, g.playerSpawnsB.length)),
        E = BW(g, "rookie", p5(o_, C), {
            weapon: m.weapon,
            grenades: m.grenades,
            throwable: m.throwable
        }, u),
        F = p5(i_, C);
    for (let H = 0; H < C; H++) E.soldiers.push(_1(E, g.playerSpawnsB[H], p.weapon, F[H], D.Enemy));
    x1(E), E.fog = new ze(g, y), E.playerSides = [D.Player, D.Enemy], E.fog.refresh(g, E.soldiers, D.Player), E.seatColours = q;
    for (let I of E.soldiers) I.owner = I.faction === D.Player ? 0 : 1;
    return E.autoEngage = false, E.sideB = {
        field: null,
        orderGoal: null,
        orderMarker: 0,
        squadTarget: null,
        targetBuilding: null,
        repathTimer: 0,
        lastTargetPos: null,
        grenadesHeld: p.grenades,
        grenadeCooldown: 0,
        squadWeapon: p.weapon,
        squadThrowable: p.throwable,
        autoEngage: false
    }, E.skirmish = {
        endsAt: j,
        over: false,
        winner: null,
        reason: null
    }, E;
}
var f5 = (c, d) => c.soldiers.filter(g => g.alive && g.faction === d);

function h5(c) {
    const Mj = cX;
    let d = c.skirmish;
    if (!d || d.over) return;
    let g = Fi(c),
        i = g.filter(j => j > 0).length;
    if (i <= 1) {
        d.over = true, d.reason = "elimination", d.winner = i === 0 ? null : g2(g);
        return;
    }
    c.time >= d.endsAt && (d.over = true, d.reason = "time", d.winner = g2(g));
}
var Fn = class {
        constructor(c, d) {
            const Mk = cX;
            this.side = c, this.ctx = d;
        } ["thinkIn"] = 0;
        ["lastSeen"] = null;
        ["lastSeenAge"] = 0;
        ["regrouped"] = false;
        step(g, j) {
            const Mq = cX;
            if (g.skirmish?.over || (this.lastSeenAge += j, this.thinkIn -= j, this.thinkIn > 0)) return;
            let m = f.skirmish,
                p = this.lastSeenAge < m.memory ? m.contactThink : m.think;
            this.thinkIn = p * (0.8 + g.jitter(this.side) * 0.4);
            let q = f5(g, this.side);
            if (q.length === 0) return;
            let u = f5(g, this.side === D.Player ? D.Enemy : D.Player);
            if (u.length === 0) return;
            let v = null,
                y = 1 / 0;
            for (let C of u)
                for (let E of q) {
                    let F = Math.hypot(C.pos.x - E.pos.x, C.pos.y - E.pos.y);
                    F < m.sense && F < y && kW(g.map, E.pos, C.pos) && (v = C, y = F);
                }
            if (v && (this.lastSeen = {
                    ...v.pos
                }, this.lastSeenAge = 0), !this.regrouped && u.length - q.length >= m.retreatDeficit) {
                this.regrouped = true, ae(g, this.home(g), this.ctx, this.side);
                return;
            }
            if (v) {
                if (this.maybeGrenade(g, q, u), g.jitter(this.side) < m.flankChance) {
                    let H = Math.atan2(v.pos.y - q[0].pos.y, v.pos.x - q[0].pos.x) + (g.jitter(this.side) < 0.5 ? 1 : -1) * Math.PI / 2;
                    ae(g, {
                        x: v.pos.x + Math.cos(H) * m.flankOffset,
                        y: v.pos.y + Math.sin(H) * m.flankOffset
                    }, this.ctx, this.side);
                } else kt(g, v, this.ctx, this.side);
                return;
            }
            let A = this.lastSeen && this.lastSeenAge < m.memory ? this.lastSeen : this.probe(g);
            ae(g, this.bound(q, A), this.ctx, this.side);
        } home(c) {
            const Mw = cX;
            let d = this.side === D.Player ? c.map.playerSpawns : c.map.playerSpawnsB;
            return D2(d);
        } bound(c, d) {
            const Mx = cX;
            let g = D2(c.map(q => q.pos)),
                j = d.x - g.x,
                l = d.y - g.y,
                m = Math.hypot(j, l),
                p = f.skirmish.bound;
            return m <= p ? d : {
                x: g.x + j / m * p,
                y: g.y + l / m * p
            };
        } probe(c) {
            const Mz = cX;
            let d = this.side === D.Player ? c.map.playerSpawnsB : c.map.playerSpawns,
                g = D2(d);
            return {
                x: g.x + (c.jitter(this.side) * 2 - 1) * 40,
                y: g.y + (c.jitter(this.side) * 2 - 1) * 40
            };
        } maybeGrenade(c, d, g) {
            const MA = cX;
            if (Rn(this.ctx) !== 'ok') return;
            let i = f.skirmish;
            for (let j of g) {
                if (g.filter(m => Math.hypot(m.pos.x - j.pos.x, m.pos.y - j.pos.y) < i.grenadeCluster).length < 2) continue;
                let l = d.find(m => !m.wading && Math.hypot(m.pos.x - j.pos.x, m.pos.y - j.pos.y) <= f.grenade.throwRange);
                if (l && ht(c, j.pos, this.side, this.ctx, l)) return;
            }
        }
    },
    D2 = c => ({
        x: c.reduce((d, g) => d + g.x, 0) / Math.max(1, c.length),
        y: c.reduce((d, g) => d + g.y, 0) / Math.max(1, c.length)
    });

function Bn(c) {
    const MB = cX;
    if (c.length === 0) return null;
    let d = 0,
        g = 0;
    for (let i of c) d += i.pos.x, g += i.pos.y;
    return {
        x: d / c.length,
        y: g / c.length
    };
}

function F2(c, d) {
    return hT(c, d);
}

function r_(g, j) {
    const MC = cX;
    let p = b2(g, j);
    if (p.length <= 1) return Bn(p);
    let q = g.orderGoal,
        v = Bn(p);
    if (!q || !v) return v;
    let y = q.x - v.x,
        A = q.y - v.y,
        C = Math.hypot(y, A);
    if (C < 1) return v;
    let E = y / C,
        F = A / C,
        H = -1 / 0,
        I = [];
    for (let L of p) {
        let M = L.pos.x * E + L.pos.y * F;
        I.push(M), M > H && (H = M);
    }
    let K = p.filter((N, P) => H - I[P] <= f.camera.stragglerDistance);
    return Bn(K) ?? v;
}

function s_(d, g) {
    const MD = cX;
    let j = b2(d, g);
    if (j.length <= 1) return Bn(j);
    let m = f.camera.clusterRadius,
        p = new Int32Array(j.length).fill(-1),
        q = 0;
    for (let v = 0; v < j.length; v++) {
        if (p[v] >= 0) continue;
        let y = q++;
        p[v] = y;
        let A = [v];
        for (; A.length > 0;) {
            let C = A.pop();
            for (let E = 0; E < j.length; E++) p[E] >= 0 || Math.hypot(j[C].pos.x - j[E].pos.x, j[C].pos.y - j[E].pos.y) > m || (p[E] = y, A.push(E));
        }
    }
    let u = [];
    for (let F = 0; F < q; F++) {
        let H = j.filter((I, K) => p[K] === F);
        H.length > u.length && (u = H);
    }
    return Bn(u);
}
var a_ = {
    squad: F2,
    commanded: r_,
    largestGroup: s_
};

function Ct(c, d = D.Player) {
    const ME = cX;
    return (a_[f.camera.focus] ?? F2)(c, d) ?? F2(c, d);
}
var Pr = class {
        constructor(c, d, g, i, j = f.skirmish.seconds) {
            const MF = cX;
            this.map = c, this.camera = d, this.renderer = g, this.input = i, this.seconds = j, (this.world = this.newWorld(), this.commander = new Fn(D.Enemy, this.world.sideB));
        } ["world"];
        ["exitRequested"] = false;
        ["onOver"] = null;
        ["commander"];
        ["overFired"] = false;
        newWorld() {
            const MG = cX;
            let c = Ir(this.map, this.seconds, void 0, void 0, [], 0, f.skirmish.squad, f.skirmish.fog);
            this.renderer.clearDecals();
            let d = hT(c);
            return d && this.camera.centreOn(d, this.map), this.camera.release(), c;
        } restart() {
            const MH = cX;
            this.world = this.newWorld(), this.commander = new Fn(D.Enemy, this.world.sideB), this.overFired = false;
        } step(c) {
            const MI = cX;
            let d = this.world;
            this.input.syncWorld(this.camera), this.input.syncAim(d), this.handleCommands(), this.moveCamera(c), d.skirmish?.over || this.commander.step(d, c), wt(d, c, {
                manualAim: this.input.firing ? this.input.aim.point : null,
                cursor: this.input.inside ? this.input.world : null
            }), h5(d), d.status = w2(d).status, d.skirmish?.over && !this.overFired && (this.overFired = true, d.skirmish.winner === d.viewSide ? d.sounds.push({
                kind: "win"
            }) : d.sounds.push({
                kind: "lose"
            }), this.onOver?.(d));
        } handleCommands() {
            const MJ = cX;
            let c = this.world;
            for (let d of this.input.drain()) {
                if (d.type === "exit") {
                    this.exitRequested = true;
                    continue;
                }
                if (d.type === "restart") {
                    c.skirmish?.over && this.restart();
                    continue;
                }
                if (d.type === "recentre") {
                    this.camera.release();
                    continue;
                }
                if (c.skirmish?.over) continue;
                if (d.type === "grenade") {
                    this.tryGrenade();
                    continue;
                }
                if (d.type === "fire") {
                    Cr(c, this.input.aim.point, D.Player);
                    continue;
                }
                if (d.type === "callin" || d.type === "armcallin" || d.type === "select") continue;
                if (d.type === "march") {
                    let i = hT(c),
                        j = f.controls.marchStep;
                    i && (ae(c, {
                        x: i.x + d.dir.x * j,
                        y: i.y + d.dir.y * j
                    }, c, D.Player, {
                        quiet: true
                    }), this.camera.release());
                    continue;
                }
                let g = Er(c, d.world, this.input.slack, D.Player);
                g.kind === "enemy" ? kt(c, g.actor, c, D.Player) : g.kind === "building" ? Ar(c, g.building, c, D.Player) : ae(c, d.world, c, D.Player), this.camera.release();
            }
        } tryGrenade() {
            const MK = cX;
            let c = this.world;
            ht(c, {
                ...this.input.aim.point
            }, D.Player, c, this.input.aim.thrower) && this.input.aim.idle();
        } moveCamera(c) {
            const ML = cX;
            let d = this.input.consumePan(this.camera.zoom),
                g = this.input.edgeScroll(c);
            this.camera.pan(d.x + g.x, d.y + g.y, this.map, this.input.isTouch ? "timed" : "sticky");
            let i = this.world.fx.takeShake();
            i > 0 && this.camera.addShake(i), this.camera.update(c, Ct(this.world), this.map), xe(this.world, this.camera);
        } standing() {
            const MM = cX;
            return {
                a: eW(this.world, D.Player).length,
                b: eW(this.world, D.Enemy).length
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
    } = g.shell, y = null, A = j && aT[j]?.objective === "skirmish" ? j : l_, C = Te(aT[A], A);
    await Et(p, C, "rookie"), y = new Pr(C, m, p, q);
    let E = y;
    g.set({
        name: "skirmish",
        world: E.world,
        step: I => {
            const MO = MN;
            v[MO(1349)](E[MO(3300)]);
            let K = JT();
            K ? B1() : H1(), !K && (E[MO(5610)](I), u[MO(1349)](E[MO(3300)]));
        },
        draw: (I, K) => {
            const MP = MN;
            p[MP(2527)](E[MP(3300)], m, I, K, q[MP(5824)]), Qe(m, p[MP(1261)], K, !st() && !E[MP(3300)][MP(3913)]?.[MP(5381)]);
        }
    }), Je(C), He(f.banner.fade), q.mode = "play", je(EW.trumper, "The other lot want the glade. They have been told it is spoken for; persuade them.", {
        seconds: 9
    });
    let F = () => {
            const MQ = MN;
            y && (y[MQ(3886)] = true);
        },
        H = () => {
            const MR = MN;
            JT() || Mt(MR(1559), MR(1458), {
                label: MR(3884),
                onPick: F
            });
        };
    q.onPause = H, q.modalOpen = JT, u.setTools({
        restart: false,
        pause: true,
        exitLabel: "Leave the match"
    }), u.onRestart = null, u.onPause = H, u.onExit = () => {
        const MU = MN;
        JT() || ST({
            title: MU(2709),
            body: MU(4141),
            buttons: [{
                label: MU(771),
                value: MU(1147),
                variant: MU(681)
            }, {
                label: MU(2023),
                value: MU(975)
            }],
            dismiss: MU(975)
        })[MU(4353)](I => {
            const MV = MU;
            I === MV(1147) && F();
        });
    }, y.onOver = I => {
        const MX = MN;
        let K = I[MX(3913)],
            L = y[MX(4675)](),
            M = K[MX(708)] === I[MX(5588)] ? MX(659) : K[MX(708)] === null ? MX(4721) : MX(2123),
            N = document[MX(2784)]('p');
        N[MX(4920)] = K[MX(3895)] === MX(5464) ? MX(605) + L.a + MX(2455) + L.b + MX(1972) : K[MX(708)] === I[MX(5588)] ? MX(4469) + L.a + MX(4199) : MX(2419), ST({
            title: M,
            body: N,
            buttons: [{
                label: MX(543),
                value: MX(3552),
                variant: MX(681)
            }, {
                label: MX(771),
                value: MX(1147)
            }],
            dismiss: MX(1147)
        })[MX(4353)](P => {
            const MY = MX;
            y && (P === MY(3552) ? y[MY(4428)]() : y[MY(3886)] = true);
        });
    }, await T1(() => y?.exitRequested ? (y = null, g.set(null), Ze(), zW(), G1(), q.onPause = null, u.onExit = u.onPause = null, u.setTools({
        restart: true,
        pause: true,
        exitLabel: "Leave the mission"
    }), true) : null);
}

function B2(c, d) {
    const MZ = cX;
    c.fx.step(d), c.fog.step(c.map, c.soldiers, d, c.viewSide ?? D.Player), Zh(c, d), T3(c, d), gt(c, d), oh(c, d), uh(c, d);
}
var b5 = 14,
    c_ = 100,
    Lr = class {
        constructor(c, d, g, j, l) {
            const N5 = cX;
            this.map = c, this.camera = d, this.input = j, (this.serverSide = l.side, this.roundId = l.roundId, this.world = Ir(c, l.seconds, void 0, void 0, l.colours, 0, l.squad, l.fog ? f.skirmish.fog : 0), this.world.viewSide = l.side, this.input.edgeScrollBlocked = !l.edgeScroll);
            let m = (performance.now() - (l.receivedAt ?? performance.now())) / 1000;
            this.world.preroll = Math.max(0, l.preroll - m), this.world.round = l.round, g.clearDecals();
            let p = hT(this.world, this.serverSide);
            p && this.camera.centreOn(p, c), this.camera.release();
        } ["world"];
        ["exitRequested"] = false;
        ["pausedBy"] = null;
        ["over"] = null;
        ["onOver"] = null;
        ["onPauseChange"] = null;
        ["serverSide"];
        ["targets"] = new Map();
        ["henTargets"] = new Map();
        ["lastSnapTime"] = -1;
        ["lastSequence"] = -1;
        ["roundId"];
        ["sinceSnap"] = 0;
        ["lastFireSent"] = 0;
        ["triggerDown"] = false;
        handleMsg(c) {
            const N7 = cX;
            if (!("roundId" in c && c.roundId !== this.roundId)) {
                if (c.t === "snap") {
                    this.applySnap(c);
                    return;
                }
                if (c.t === "pause") {
                    this.pausedBy = c.on ? c.who : null, this.onPauseChange?.();
                    return;
                }
                if (c.t === "over" && (!this.over || c.last && !this.over.last)) {
                    let d = this.world,
                        g = this.serverSide,
                        j = c.standing[g] ?? 0,
                        l = c.standing.reduce((u, v, y) => u + (y === g ? 0 : v), 0),
                        m = c.winner === null ? null : c.winner === g,
                        p = c.initial[g] ?? 0,
                        q = c.initial.reduce((u, v, y) => u + (y === g ? 0 : v), 0);
                    this.over = {
                        won: m,
                        winnerId: c.winnerId,
                        winnerName: c.winnerName,
                        reason: c.reason,
                        a: j,
                        b: l,
                        kills: q - l,
                        lost: p - j,
                        seconds: Math.round(c.seconds),
                        round: c.round,
                        rounds: c.rounds,
                        last: c.last
                    }, d.sounds.push({
                        kind: m ? "win" : "lose"
                    }), this.onOver?.();
                }
            }
        } applySnap(g) {
            const N8 = cX;
            if (g.seq <= this.lastSequence || g.time < this.lastSnapTime) return;
            this.lastSequence = g.seq, this.lastSnapTime = g.time, this.sinceSnap = 0;
            let j = this.world,
                m = new Map(j.soldiers.map(y => [y.id, y])),
                p = new Set(g.actors.map(y => y.id));
            for (let y of j.soldiers) p.has(y.id) || (y.faction !== this.serverSide && (y.visible = false), this.targets.has(y.id) && (this.targets.delete(y.id), y.vel.x = 0, y.vel.y = 0));
            for (let A of g.actors) {
                let C = m.get(A.id);
                C && (this.targets.set(A.id, A), C.visible = true, C.stagger = A.stagger, C.wading = (A.w ?? 0) > 0, C.swimming = A.w === 2, !A.alive && C.alive && (C.alive = false, C.deathTime = 0, C.vel.x = 0, C.vel.y = 0, C.pos.x = A.x, C.pos.y = A.y));
            }
            j.bullets = g.bullets.map(([E, F, H, I, K, L, M, N]) => ({
                pos: {
                    x: E,
                    y: F
                },
                prev: {
                    x: H,
                    y: I
                },
                vel: {
                    x: (E - H) * 60,
                    y: (F - I) * 60
                },
                ...M !== void 0 && N !== void 0 ? {
                    from: {
                        x: M,
                        y: N
                    }
                } : {},
                faction: K,
                life: L,
                buildingDamage: 0,
                blast: 0
            })), j.grenades = g.grenades.map(([E, F, H, I, K, L, M, N]) => {
                let P = E + (H - E) * L,
                    Q = F + (I - F) * L;
                return {
                    kind: M,
                    pos: {
                        x: P,
                        y: Q
                    },
                    prev: {
                        x: P,
                        y: Q
                    },
                    from: {
                        x: E,
                        y: F
                    },
                    to: {
                        x: H,
                        y: I
                    },
                    t: L,
                    duration: K,
                    faction: N
                };
            }), j.clouds = g.clouds.map(([E, F, H, I, K]) => ({
                pos: {
                    x: E,
                    y: F
                },
                radius: H,
                life: I,
                maxLife: K
            }));
            let q = new Map(j.critters.map(E => [E.id, E])),
                v = new Set(g.critters.map(([E]) => E));
            for (let E of j.critters) v.has(E.id) || (E.visible = false, this.henTargets.delete(E.id), E.vel.x = 0, E.vel.y = 0);
            for (let [F, H, I, K, L, M] of g.critters) {
                let N = q.get(F);
                N && (N.visible = true, this.henTargets.set(F, {
                    x: H,
                    y: I,
                    a: K
                }), N.state = M, !L && N.alive && (N.alive = false, N.deathTime = 0, N.vel.x = 0, N.vel.y = 0, N.pos.x = H, N.pos.y = I, this.henTargets.delete(F)));
            }
            for (let P of g.fx) j.fx.replay(P);
            for (let Q of g.sounds) j.sounds.push(Q);
            for (let [R, S] of g.screams) j.screams.push({
                x: R,
                y: S
            });
            for (let [U, V] of g.deaths) j.deaths.push({
                x: U,
                y: V
            });
            j.grenadesHeld = g.grenadesBySide[this.serverSide] ?? 0, j.grenadeCooldown = g.grenadeCooldownBySide[this.serverSide] ?? 0;
            for (let X of g.cratesGone) {
                let Y = j.crates[X];
                Y && (Y.alive = false);
            }
            for (let a7 of g.packagesGone) {
                let a8 = j.packages[a7];
                a8 && (a8.taken = true);
            }
            for (let a9 of g.minesGone) {
                let aj = j.mines[a9];
                aj && (aj.alive = false);
            }
            j.time = g.time;
        } step(c) {
            const N9 = cX;
            let d = this.world;
            if (this.sinceSnap += c, this.input.syncWorld(this.camera), this.input.syncAim(d), d.preroll > 0) {
                d.preroll = Math.max(0, d.preroll - c), B2(d, c), this.moveCamera(c);
                return;
            }
            this.handleCommands(), this.sendTrigger(), this.moveCamera(c), B2(d, c);
            for (let m of d.soldiers) {
                if (m.prev.x = m.pos.x, m.prev.y = m.pos.y, !m.alive) continue;
                let p = this.targets.get(m.id);
                if (!p) continue;
                let q = Math.min(1, c * b5),
                    u = (p.x - m.pos.x) * q,
                    v = (p.y - m.pos.y) * q;
                m.pos.x += u, m.pos.y += v, m.vel.x = c > 0 ? u / c : 0, m.vel.y = c > 0 ? v / c : 0, m.walkPhase += Math.hypot(u, v);
                let y = p.a - m.angle;
                for (; y > Math.PI;) y -= Math.PI * 2;
                for (; y < -Math.PI;) y += Math.PI * 2;
                m.angle += y * q;
            }
            for (let A of d.critters) {
                if (A.prev.x = A.pos.x, A.prev.y = A.pos.y, !A.alive) continue;
                let C = this.henTargets.get(A.id);
                if (!C) continue;
                let E = Math.min(1, c * b5),
                    F = (C.x - A.pos.x) * E,
                    H = (C.y - A.pos.y) * E;
                A.pos.x += F, A.pos.y += H, A.vel.x = c > 0 ? F / c : 0, A.vel.y = c > 0 ? H / c : 0, A.walkPhase += Math.hypot(F, H);
                let I = C.a - A.angle;
                for (; I > Math.PI;) I -= Math.PI * 2;
                for (; I < -Math.PI;) I += Math.PI * 2;
                A.angle += I * E;
            }
            d.orderMarker = Math.max(0, d.orderMarker - c);
            let g = eW(d, this.serverSide).length,
                j = d.soldiers.filter(K => K.alive && K.faction !== this.serverSide).length;
            d.status = g + " v " + j;
        } sendTrigger() {
            const Nj = cX;
            let c = this.input.firing && !this.over && !this.pausedBy,
                d = performance.now();
            if (c) {
                if (d - this.lastFireSent < c_) return;
                this.lastFireSent = d, this.triggerDown = true, $.fire(this.roundId, {
                    ...this.input.aim.point
                });
                return;
            }
            this.triggerDown && (this.triggerDown = false, $.fire(this.roundId, null));
        } handleCommands() {
            const Nk = cX;
            for (let c of this.input.drain()) {
                if (c.type === "exit") {
                    this.exitRequested = true;
                    continue;
                }
                if (c.type === "recentre") {
                    this.camera.release();
                    continue;
                }
                if (!(this.over || this.pausedBy)) {
                    if (c.type === "order" || c.type === "march") {
                        let d = c.type === "order" ? c.world : null;
                        if (c.type === "march") {
                            let g = hT(this.world, this.serverSide),
                                i = f.controls.marchStep;
                            d = g ? {
                                x: g.x + c.dir.x * i,
                                y: g.y + c.dir.y * i
                            } : null;
                        }
                        if (!d) continue;
                        $.order(this.roundId, {
                            x: d.x,
                            y: d.y
                        }), this.world.orderGoal = {
                            x: d.x,
                            y: d.y
                        }, this.world.orderMarker = f.soldier.orderMarkerTime, this.camera.release(), c.type === "order" && this.world.sounds.push({
                            kind: "order"
                        });
                        continue;
                    }
                    if (c.type === "grenade") {
                        if (this.world.grenadesHeld <= 0) continue;
                        let j = this.input.aim.thrower;
                        if (!j || !j.alive || j.wading) continue;
                        $.grenade(this.roundId, {
                            ...this.input.aim.point
                        }), this.input.aim.idle();
                    }
                }
            }
        } moveCamera(c) {
            const Nq = cX;
            let d = this.input.consumePan(this.camera.zoom),
                g = this.input.edgeScroll(c);
            this.camera.pan(d.x + g.x, d.y + g.y, this.map, this.input.isTouch ? "timed" : "sticky");
            let i = this.world.fx.takeShake();
            i > 0 && this.camera.addShake(i), this.camera.update(c, Ct(this.world, this.serverSide), this.map), xe(this.world, this.camera);
        } standing() {
            const Nv = cX;
            return {
                a: eW(this.world, this.serverSide).length,
                b: this.world.soldiers.filter(c => c.alive && c.faction !== this.serverSide).length
            };
        }
    },
    d_ = 3,
    u_ = 1.5;
async function y5(c, d) {
    const Nw = cX;
    if (nt(), !(d.mapId in aT)) {
        $.leave(), await yo(d.mapId);
        return;
    }
    let g = d,
        i = null;
    for (;;) {
        if (!(g.mapId in aT)) {
            $.leave(), await yo(g.mapId);
            return;
        }
        let j = await m_(c, g, i);
        if (j === "left") return;
        i = v5(g), g = j;
    }
}
var v5 = c => c.mapId;
async function m_(j, q, y) {
    const Nx = cX;
    let {
        camera: A,
        renderer: C,
        input: E,
        hud: F,
        controls: H
    } = j.shell, I = null, K = null, L = false, M = 0, N = v5(q), P = Te(aT[N], N);
    y !== N && await Et(C, P, "rookie"), I = new Lr(P, A, C, E, q);
    let Q = I;
    j.set({
        name: "net",
        world: Q.world,
        step: X => {
            const Nz = Nx;
            H[Nz(1349)](Q[Nz(3300)]), JT() ? B1() : H1(), Q[Nz(5610)](X), F[Nz(1349)](Q[Nz(3300)]), F[Nz(4649)](Q[Nz(951)] ? {
                kind: Nz(1949),
                who: Q[Nz(951)]
            } : !$[Nz(2661)] || Q[Nz(4439)] > u_ ? {
                kind: Nz(1476)
            } : {
                kind: 'ok'
            });
        },
        draw: (X, Y) => {
            const NA = Nx;
            C[NA(2527)](Q[NA(3300)], A, X, Y, E[NA(5824)]), Qe(A, C[NA(1261)], Y, !st() && !Q[NA(5381)]);
        }
    }), Je(P), He(f.banner.fade), E.mode = "play";
    let R = () => {
            const NB = Nx;
            I && (I[NB(3886)] = true);
        },
        S = () => {
            const NC = Nx;
            $[NC(1147)](), R();
        },
        U = () => {
            const ND = Nx;
            JT() || Mt(ND(1559), ND(4159), {
                label: ND(3884),
                onPick: S
            });
        };
    E.onPause = U, E.modalOpen = JT, F.setTools({
        restart: false,
        pause: false,
        exitLabel: "Leave the match"
    }), F.onRestart = null, F.onPause = null, F.onExit = () => {
        const NE = Nx;
        JT() || ST({
            title: NE(2709),
            body: NE(5225),
            buttons: [{
                label: NE(771),
                value: NE(1147),
                variant: NE(681)
            }, {
                label: NE(2023),
                value: NE(975)
            }],
            dismiss: NE(975)
        })[NE(4353)](X => {
            const NF = NE;
            X === NF(1147) && S();
        });
    }, I.onPauseChange = () => {
        const NG = Nx;
        !I || I[NG(5381)] || (I[NG(951)] ? (zW(), Go(NG(5568), I[NG(951)] + NG(4423), [{
            label: NG(3884),
            onPick: S
        }], true)) : zW());
    }, I.onOver = () => {
        const NH = Nx;
        if (!I?.[NH(5381)] || M > 0) return;
        let X = I[NH(5381)];
        M = performance[NH(2864)](), zW(), $[NH(3606)](X[NH(2328)], X[NH(3895)], X[NH(4674)] === null || X[NH(4674)] ? X.a : X.b, X[NH(4674)] === null || X[NH(4674)] ? X.b : X.a, X[NH(4674)]);
        let Y = document[NH(2784)](NH(991)),
            a7 = document[NH(2784)]('p');
        a7[NH(4920)] = X[NH(3895)] === NH(5231) ? X[NH(4674)] ? NH(1515) : NH(3023) : X[NH(3895)] === NH(5464) ? NH(605) + X.a + NH(2455) + X.b + NH(1972) : X[NH(4674)] ? NH(4469) + X.a + NH(4199) : NH(2419), Y[NH(2592)](a7);
        let a8 = document[NH(2784)]('p');
        a8[NH(2084)] = NH(5666);
        let a9 = Math[NH(1959)](X[NH(4290)] / 60),
            aj = String(X[NH(4290)] % 60)[NH(5898)](2, '0');
        a8[NH(4920)] = NH(3407) + X[NH(3101)] + NH(3416) + X[NH(5421)] + NH(1026) + a9 + ':' + aj, Y[NH(2592)](a8);
        let ak = X[NH(1469)] > 1;
        if (ak) {
            let aw = document[NH(2784)]('p');
            aw[NH(2084)] = NH(5666), aw[NH(4920)] = NH(483) + X[NH(1207)] + NH(2550) + X[NH(1469)], Y[NH(3091)](aw, Y[NH(803)]);
        }
        let aq = ak && !X[NH(5349)];
        ST({
            title: X[NH(4674)] === true ? NH(659) : X[NH(4674)] === null ? NH(4721) : NH(2123),
            body: Y,
            buttons: aq ? [] : [{
                label: NH(4136),
                value: NH(866),
                variant: NH(681)
            }],
            autoClose: {
                value: NH(866),
                seconds: aq ? Fa : 10,
                label: aq ? NH(5115) : void 0
            }
        })[NH(4353)](() => {
            L = true, aq || R();
        });
    }, $.onStart = X => {
        const NI = Nx;
        X[NI(5649)] !== q[NI(5649)] && (K = X);
    }, $.bindRound(q.roundId, X => {
        const NJ = Nx;
        X.t === NJ(4880) ? R() : I?.[NJ(3504)](X);
    });
    let V = await T1(() => I?.exitRequested || L && I?.over?.last ? "left" : L && K || K && !I?.over ? K : L && performance.now() - M > (Fa + d_) * 1000 ? "left" : null);
    return I = null, j.set(null), E.edgeScrollBlocked = false, $.onGameMsg = null, $.onStart = null, Ze(), F.setLink(null), F.hideClock(), zW(), G1(), E.onPause = null, F.onExit = null, F.setTools({
        restart: true,
        pause: true,
        exitLabel: "Leave the mission"
    }), V;
}
var Or = class {
        constructor(c, d, g, j, l, m = () => [], p = () => {}, q = 0) {
            const NK = cX;
            this.map = c, this.camera = d, this.renderer = g, this.input = j, this.difficulty = l, this.roster = m, this.loadout = p, this.runSeed = q, this.world = this.newWorld();
        } ["world"];
        ["exitRequested"] = false;
        ["nextRequested"] = false;
        ["onResolved"] = null;
        ["onCallIn"] = null;
        ["onArmCallIn"] = null;
        ["autopilot"] = null;
        newWorld() {
            const NL = cX;
            let c = BW(this.map, this.difficulty, this.roster(), this.loadout(), this.runSeed);
            this.renderer.clearDecals();
            let d = hT(c);
            return d && this.camera.centreOn(d, this.map), this.camera.release(), c;
        } restart() {
            const NM = cX;
            this.world = this.newWorld();
        } setDifficulty(c) {
            const NN = cX;
            c !== this.difficulty && (this.difficulty = c, this.world = this.newWorld());
        } step(c) {
            const NO = cX;
            let d = this.world;
            d.autoEngage = G().autoFire, this.input.syncWorld(this.camera), this.input.syncAim(d), this.handleCommands(), this.moveCamera(c);
            let g = d.phase;
            if (g === 0 && this.autopilot?.step(d, c), wt(d, c, {
                    manualAim: this.autopilot?.aim ?? (this.input.firing ? this.input.aim.point : null),
                    targeted: this.autopilot != null,
                    cursor: this.input.inside ? this.input.world : null
                }), g === 0 && (_3(d, c), d.phase !== g)) {
                if (d.phase === 1) {
                    d.sounds.push({
                        kind: "win"
                    });
                    for (let i of eW(d)) i.angle = Math.PI / 2, i.vel.x = 0, i.vel.y = 0;
                } else d.phase === 2 && d.sounds.push({
                    kind: "lose"
                });
                this.onResolved?.(d);
            }
        } handleCommands() {
            const NP = cX;
            let c = this.world;
            for (let d of this.input.drain()) {
                if (d.type === "exit") {
                    this.exitRequested = true;
                    continue;
                }
                if (d.type === "restart") {
                    c.phase !== 0 && this.restart();
                    continue;
                }
                if (d.type === "recentre") {
                    this.camera.release();
                    continue;
                }
                if (c.phase !== 0) continue;
                if (d.type === "armcallin") {
                    this.onArmCallIn?.();
                    continue;
                }
                if (d.type === "fire") {
                    Cr(c, this.input.aim.point, D.Player);
                    continue;
                }
                if (d.type === "grenade") {
                    this.tryGrenade(this.input.aim.point);
                    continue;
                }
                if (d.type === "callin") {
                    k2(c, d.at) && this.onCallIn?.(c.squadCallIn);
                    continue;
                }
                if (d.type === "select") continue;
                if (d.type === "march") {
                    let i = hT(c),
                        j = f.controls.marchStep;
                    i && (ae(c, {
                        x: i.x + d.dir.x * j,
                        y: i.y + d.dir.y * j
                    }, c, D.Player, {
                        quiet: true
                    }), this.camera.release());
                    continue;
                }
                let g = Er(c, d.world, this.input.slack, D.Player);
                g.kind === "enemy" ? kt(c, g.actor, c, D.Player) : g.kind === "building" ? Ar(c, g.building, c, D.Player) : ae(c, d.world, c, D.Player), this.camera.release();
            }
        } tryGrenade(c) {
            const NQ = cX;
            let d = this.world,
                g = Rn(d);
            if (g !== 'ok') {
                let i = hT(d) ?? c;
                g === "empty" ? d.fx.popup(i, "no grenades", "#ff6a48") : d.fx.popup(i, "reloading", "#d8a13c"), d.sounds.push({
                    kind: "denied"
                });
                return;
            }
            ht(d, c, D.Player, d, this.input.aim.thrower);
        } moveCamera(c) {
            const NR = cX;
            let d = this.input.consumePan(this.camera.zoom),
                g = this.input.edgeScroll(c);
            this.camera.pan(d.x + g.x, d.y + g.y, this.map, this.input.isTouch ? "timed" : "sticky");
            let i = this.world.fx.takeShake();
            i > 0 && this.camera.addShake(i), this.camera.update(c, Ct(this.world), this.map), xe(this.world, this.camera);
        }
    },
    p_ = new Set(["eliminate"]),
    Nr = class {
        constructor(c = 1 / 0) {
            const NS = cX;
            this.order = c;
        } ["said"] = 0;
        ["nextAt"] = f.onboarding.nudgeAfter;
        ["seen"] = null;
        fresh(c) {
            const NT = cX;
            this.seen !== c && (this.seen = c, this.said = 0, this.nextAt = f.onboarding.nudgeAfter);
        } due(c) {
            const NU = cX;
            let d = f.onboarding;
            if (this.fresh(c), this.said >= d.nudgeMax || this.order > d.nudgeUntilOrder || c.time < this.nextAt || Ul()) return null;
            this.said++, this.nextAt = c.time + d.nudgeEvery;
            let g = p_.has(c.map.objective) ? Math.max(0, c.enemyTotal - c.kills) : null;
            return Im(_t(c.map), g, c.jitter());
        } step(c) {
            const NV = cX;
            let d = this.due(c);
            d !== null && je(EW.trumper, d, {
                delay: 0
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
    } = K.shell, {
        info: a7,
        campaign: a8,
        campaignLevels: a9
    } = K, aj = gd(Ut[a7.id], aT[a7.id]), ak = bd(aj, K.difficulty);
    K.setDifficulty(ak);
    let aq = null,
        aw = null,
        ax = null,
        az = async () => {
            const NY = NX;
            try {
                ax = await navigator[NY(1813)]?.[NY(2936)](NY(695)) ?? null;
            } catch {}
        };
    nt();
    let aA = Te(aT[a7.id], a7.id),
        aB = Ha(aT[a7.id]);
    await Et(P, aA, ak);
    let aC = Kt(Ut[a7.id]).roster === "fresh",
        aD = [],
        aE = !aC && _n(a8) === "reinforcements",
        aF = () => {
            const NZ = NX;
            if (aC) return aD = [], A3(aA[NZ(2770)]);
            let b4 = Hu(a8, aA[NZ(2770)] + (aE ? f[NZ(2624)][NZ(5068)] : 0));
            return aD = b4[NZ(4157)](aA[NZ(2770)]), b4[NZ(4157)](0, aA[NZ(2770)]);
        },
        aG = () => {
            const O5 = NX;
            if (aC) return {
                weapon: O5(777),
                grenades: 0,
                throwable: O5(5292),
                reserves: [],
                packagesTaken: []
            };
            let b4 = a8[O5(2396)][O5(2785)],
                b7 = b4 !== O5(5591) && Ya(a8, b4),
                b8 = b7 ? gW(a8, ge[b4]) : 0;
            return {
                weapon: li(a8),
                grenades: Math[O5(3002)](0, Math[O5(544)](a8[O5(2396)][O5(3144)], b8)),
                throwable: b7 ? b4 : O5(5292),
                callIn: _n(a8),
                reserves: aD,
                packagesTaken: a8[O5(3184)][a7.id]?.[O5(884)]?.[ak] ?? []
            };
        },
        aH = false,
        aI = () => {
            const O7 = NX;
            if (aH || aC) return;
            aH = true;
            let b4 = a8[O7(2396)][O7(2785)];
            if (b4 === O7(5591) || !Ya(a8, b4)) return;
            let b7 = Math[O7(3002)](0, Math[O7(544)](a8[O7(2396)][O7(3144)], gW(a8, ge[b4])));
            b7 > 0 && Ka(a8, ge[b4], b7);
        };
    aq = new Or(aA, L, P, Q, ak, aF, aG);
    let aJ = aq,
        aK = new Nr(aT[a7.id].order);
    K.set({
        name: "mission",
        get world() {
            const O8 = NX;
            return aJ[O8(3300)];
        },
        step: b4 => {
            const O9 = NX;
            Y[O9(1349)](aJ[O9(3300)]), aJ[O9(3300)][O9(5798)] === 0 && !JT() && vm(b4), U[O9(1309)](Q[O9(4392)]);
            let b7 = JT();
            b7 ? B1() : H1(), !(b7 || U[O9(4039)]) && (aJ[O9(5610)](b4), aK[O9(5610)](aJ[O9(3300)]), U[O9(1349)](aJ[O9(3300)]));
        },
        draw: (b4, b7) => {
            const Oj = NX;
            P[Oj(2527)](aJ[Oj(3300)], L, b4, b7, Q[Oj(5824)]), Qe(L, P[Oj(1261)], b7, !st() && aJ[Oj(3300)][Oj(5798)] === 0);
        }
    }), Je(aA), um(a7.id, ak, aB);
    let aL = a9.findIndex(b4 => b4.id === a7.id),
        aM = q1(a9).find(b4 => b4.levels.some(b7 => b7.id === a7.id)),
        aN = () => {
            const Ok = NX;
            if (!aq) return;
            let b4 = aq[Ok(3300)][Ok(5798)] === 1 ? Uu(ak, aj) : null;
            b4 ? (ak = b4, zt(U1, b4), aq[Ok(3402)](b4)) : aq[Ok(4428)](), U[Ok(3902)](), aX();
        },
        aO = b4 => {
            const Oq = NX;
            (!aq || aq[Oq(3300)][Oq(5798)] !== 0) && !aq || aj[Oq(5073)](b4) && (ak = b4, zt(U1, b4), aq[Oq(3402)](b4), U[Oq(2978)](aq[Oq(3300)]));
        },
        aP = aM ? aM.levels.findIndex(b4 => b4.id === a7.id) + 1 : 0;
    U.open({
        hasNext: !aC && aL >= 0 && aL < a9.length - 1,
        missionNumber: aP,
        theatreName: aM?.zone.name ?? '',
        record: aC ? null : a8.records[a7.id] ?? null,
        onNext: () => {
            const Ov = NX;
            aq && (aq[Ov(1461)] = true);
        },
        onRetry: aN,
        onDifficulty: aO,
        difficulties: aj,
        campaign: aC ? null : a8,
        onLoadout: aC ? null : () => {
            const Ow = NX;
            aq && (aq[Ow(4428)](), U[Ow(2978)](aq[Ow(3300)]));
        },
        onMissions: () => {
            const Ox = NX;
            aq && (aq[Ox(3886)] = true);
        }
    }), U.setTools({
        restart: true,
        pause: true,
        exitLabel: "Leave the mission"
    }), U.onExit = () => {
        const Oz = NX;
        ST({
            title: Oz(4084),
            body: Oz(2512),
            buttons: [{
                label: Oz(771),
                value: Oz(1147),
                variant: Oz(681)
            }, {
                label: Oz(2023),
                value: Oz(975)
            }],
            dismiss: Oz(975)
        })[Oz(4353)](b4 => {
            const OA = Oz;
            b4 === OA(1147) && aq && (aq[OA(3886)] = true);
        });
    };
    let aQ = async () => {
        const OB = NX;
        mm(a7.id, ak, aB), await Om(f[OB(4315)][OB(3209)]), aq && ai(a8, aq[OB(3300)]), aq?.[OB(4428)](), U[OB(3902)](), zW(), aX();
    };
    U.onRestart = () => {
        const OC = NX;
        ST({
            title: OC(5559),
            body: OC(2228),
            buttons: [{
                label: OC(745),
                value: OC(4428),
                variant: OC(681)
            }],
            dismiss: OC(5233)
        })[OC(4353)](b4 => {
            const OD = OC;
            b4 === OD(4428) && aQ();
        });
    };
    let aR = () => {
        const OE = NX;
        !aq || JT() || U[OE(4039)] || aq[OE(3300)][OE(5798)] !== 0 || Mt(!aC && aP ? aP + '. ' + aA[OE(3918)] : aA[OE(3918)], OE(1458), {
            label: OE(2365),
            tone: OE(5135),
            key: 'R',
            onPick: () => {
                aQ();
            }
        });
    };
    Q.onPause = aR, Q.modalOpen = JT, U.onPause = aR;
    let aS = () => {
        const OF = NX;
        document[OF(1709)] && aR();
    };
    document.addEventListener("visibilitychange", aS), aw = () => document.removeEventListener("visibilitychange", aS), az(), aq.onCallIn = () => {
        const OG = NX;
        let b4 = EW[OG(1541)];
        b4 && aq && je(b4, Rm(aq[OG(3300)][OG(4350)]()), {
            seconds: 3
        });
    }, U.onCallInPress = b4 => {
        const OH = NX;
        if (aq) {
            if (aq[OH(3300)][OH(3479)] <= 0) {
                CW(b4, OH(3746));
                return;
            }
            Q[OH(4392)] ? Q[OH(1224)]() : Q[OH(1706)](), U[OH(1309)](Q[OH(4392)]);
        }
    }, aq.onArmCallIn = () => {
        const OI = NX;
        let b4 = EW[OI(1541)];
        b4 && je(b4, Am(), {
            sticky: true
        });
    };
    let aU = b4 => ({
        seconds: b4.time,
        kills: b4.kills,
        survived: b4.soldiers.filter(b7 => b7.alive).length,
        died: b4.soldiers.filter(b7 => !b7.alive).length,
        packages: b4.packages.filter(b7 => b7.taken).length,
        shotsFired: b4.shotsFired,
        shotsHit: b4.shotsHit,
        incomingFired: b4.incomingFired,
        incomingHit: b4.incomingHit
    });
    aq.onResolved = b4 => {
        const OJ = NX;
        if (aC) {
            U[OJ(5317)](null, null, aA[OJ(4658)] ? C3(a7.id, b4, aA[OJ(4658)][OJ(856)]) : null), aa(a7.id, ak, aB, b4[OJ(5798)] === 1, aU(b4)), ua(b4[OJ(5798)] === 1);
            return;
        }
        ai(a8, b4);
        let b7 = a8[OJ(3184)][a7.id]?.[OJ(884)]?.[ak] ?? [],
            b8 = Gu(a8, {
                won: b4[OJ(5798)] === 1,
                missionId: a7.id,
                missionName: aA[OJ(3918)],
                difficulty: ak,
                time: b4[OJ(5464)],
                kills: b4[OJ(3101)],
                crates: b4[OJ(2611)],
                packagesFound: b4[OJ(5267)][OJ(588)]((b9, bj) => b9[OJ(884)] && !b7[OJ(5073)](bj) ? bj : -1)[OJ(3639)](b9 => b9 >= 0),
                survived: b4[OJ(4874)][OJ(3639)](b9 => b9[OJ(1101)])[OJ(588)](b9 => b9[OJ(3918)]),
                died: b4[OJ(4874)][OJ(3639)](b9 => !b9[OJ(1101)])[OJ(588)](b9 => b9[OJ(3918)])
            });
        U[OJ(5317)](a8[OJ(3184)][a7.id] ?? null, b8), aa(a7.id, ak, aB, b4[OJ(5798)] === 1, {
            ...aU(b4),
            bonds: b8[OJ(4422)][OJ(1199)],
            balance: a8[OJ(4422)]
        }), ua(b4[OJ(5798)] === 1);
    }, o5, WW, ve, IW, nW;
    let aV = hT(aq.world);
    aV && L.centreOn(aV, aA);
    let aX = () => {
            const OK = NX;
            MW(1), U[OK(2978)](aq[OK(3300)]), window[OK(1661)](OK(2082), aY, true), window[OK(1661)](OK(1777), aY, true);
        },
        aY = b4 => {
            const OL = NX;
            if (!aq || aq[OL(3300)][OL(5798)] !== 0 || JT()) return;
            let b7 = b4[OL(5099)];
            if (b7 instanceof Element && b7[OL(2325)](OL(3270))) return;
            b4[OL(2670)](), b4[OL(5788)](), aI(), U[OL(3902)](), He(f[OL(4315)][OL(3209)]), aZ();
            let b8 = Kl(aA);
            b8 && je(b8[OL(4706)], b8[OL(5412)], b8[OL(2454)]);
        },
        aZ = () => {
            const OM = NX;
            window[OM(4704)](OM(2082), aY, true), window[OM(4704)](OM(1777), aY, true);
        };
    aX();
    try {
        localStorage.setItem(uo, a7.id);
    } catch {}
    return T1(() => {
        const ON = NX;
        let b4 = aq?.[ON(3886)] ? ON(4294) : aq?.[ON(1461)] ? ON(5856) : null;
        return b4 ? (aq && ai(a8, aq[ON(3300)]), aq = null, K[ON(5635)](null), Ze(), U[ON(3902)](), U[ON(1136)](), zW(), aZ(), G1(), aw?.(), aw = null, Q[ON(2599)] = null, U[ON(4554)] = U[ON(3347)] = U[ON(2599)] = null, ax?.[ON(5414)]()[ON(2008)](() => {}), ax = null, b4) : null;
    });
}
async function f_() {
    const OO = cX;
    oc();
    let j = await q3(),
        q = await yd();
    if (await V1("missions"), q.length === 0) throw new Error("no missions found in data/");
    let y = co(q),
        A = Bu(),
        C = null,
        E = null,
        F = performance.now();
    ic(R => (C ?? E)?.step(R), R => {
        const OP = OO;
        let S = performance[OP(2864)](),
            U = Math[OP(544)](0.1, (S - F) / 1000);
        F = S, (C ?? E)?.[OP(2527)](R, U);
    });
    let H = Y3({
            shell: j,
            set: R => {
                E = R;
            }
        }),
        I = R => _5({
            shell: j,
            set: S => {
                C = S;
            },
            info: R,
            difficulty: N,
            setDifficulty: S => {
                N = S;
            },
            campaign: A,
            campaignLevels: y
        }),
        K = R => g5({
            shell: j,
            set: S => {
                C = S;
            }
        }, R),
        L = R => y5({
            shell: j,
            set: S => {
                C = S;
            }
        }, R),
        M = () => u5({
            shell: j,
            set: R => {
                C = R;
            }
        });
    xm(oi().userId), t0;
    let N = vd(U1),
        P = null,
        Q;
    for (;;) {
        let R = P;
        if (P = null, !R) {
            if (window.location.hash === "#arena") {
                history.replaceState(null, '', window.location.pathname), await Es(), H.stop(), await M();
                continue;
            }
            let S = null;
            try {
                S = localStorage.getItem(uo);
            } catch {
                S = null;
            }
            wo(), await V1("ready"), Es().then(() => H.start());
            let U = await Jf(q, S, N, V => {
                N = V, zt(U1, V);
            }, A, Q);
            if (Q = void 0, H.stop(), "skirmish" in U) {
                await K(U.skirmish);
                continue;
            }
            if ("net" in U) {
                await L(U.net), Q = "lobby";
                continue;
            }
            if (N = U.difficulty, R = q.find(V => V.id === U.id) ?? null, !R) continue;
        }
        if (await n0(A, y) === "armoury") {
            Q = "armoury";
            continue;
        }
        if (await I(R) === "next") {
            let V = y.findIndex(X => X.id === R.id);
            P = V >= 0 ? y[V + 1] ?? null : null;
        }
    }
}
f_().catch(c => {
    const OQ = cX;
    console.error(c), Zl(c);
    let d = document.getElementById("overlay"),
        g = document.getElementById("overlay-title"),
        i = document.getElementById("overlay-sub");
    d && g && i && (d.hidden = false, g.textContent = "Error", i.textContent = c instanceof Error ? c.message : String(c));