            c && (c.classList.remove("flash"), c.offsetWidth, c.classList.add("flash"));
        } updateLoadout(c) {
            const IL = cX;
            let d = c.squadThrowable,
                g = [c.squadWeapon, d, c.grenadesHeld, c.squadCallIn, c.callInsLeft, this.armed].join('|');
            if (g === this.loadoutKey) return;
            this.loadoutKey = g;
            let j = (p, q, v, y = '') => {
                const IM = IL;
                let A = document.createElement(y ? "button" : "div");
                A.className = ("hud-kit " + y).trim(), A instanceof HTMLButtonElement && (A.type = "button");
                let C = document.createElement("span");
                C.className = "hud-kit-icon";
                let E = $f(p ?? '');
                E && C.appendChild(scaleCanvas(E, 1)), A.appendChild(C);
                let F = document.createElement("span");
                F.className = "hud-kit-text";
                let H = document.createElement('b');
                H.className = "hud-kit-label", H.textContent = q, F.appendChild(H);
                let I = document.createElement("span");
                return I.className = "hud-kit-value", I.textContent = v, A.append(F, I), A;
            };
            if (setChildren(this.loadout, j(c.squadWeapon, ci[c.squadWeapon] ?? c.squadWeapon, ''), j(d === "flash" ? "flashbang" : d, S6[d] ?? d, 'x' + c.grenadesHeld)), c.squadCallIn !== "none") {
                let l = c.callInsLeft <= 0,
                    m = j(c.squadCallIn, di[c.squadCallIn] ?? c.squadCallIn, 'x' + c.callInsLeft, "hud-kit-callin" + (this.armed ? " on" : '') + (l ? " off" : ''));
                m instanceof HTMLButtonElement && (l && m.setAttribute("aria-disabled", "true"), m.addEventListener("click", () => this.onCallInPress?.(m))), this.loadout.appendChild(m);
            }
        } update(c) {
            const IN = cX;
            if (c.skirmish ? this.clock.hide() : this.clock.update(c), this.matchPanel.update(c), c.phase !== 0) {
                let {
                    hold: m,
                    fade: p
                } = f.banner;
                setBlackout(Math.max(0, Math.min(1, (c.phaseTime - (m - p)) / p)));
            }
            let d = c.map.name + '/' + c.difficulty;
            d !== this.lastMission && (this.lastMission = d, setChildren(this.mission, Object.assign(document.createElement('b'), {
                textContent: c.map.name
            })), c.skirmish || this.mission.appendChild(Object.assign(document.createElement("span"), {
                className: "hud-diff diff-" + c.difficulty,
                textContent: DIFFICULTIES[c.difficulty].name
            })), this.goal.textContent = _t(c.map), this.plates = [], this.lastPhase = null), this.ensureRoster(c);
            let g = this.mine(c);
            for (let q = 0; q < this.plates.length; q++) {
                let s = g[q].alive;
                s !== this.plates[q].alive && (this.plates[q].alive = s, this.plates[q].root.classList.toggle("dead", !s));
            }
            if (this.updateLoadout(c), c.grenadesHeld !== this.lastGrenades && (this.lastGrenades >= 0 && this.flashLoadout(), this.lastGrenades = c.grenadesHeld), c.status !== this.lastStatus) {
                this.lastStatus = c.status, this.objective.textContent = '';
                let u = c.status.split(" · ");
                this.objective.appendChild(Object.assign(document.createElement('b'), {
                    className: "hud-objective-lead",
                    textContent: u[0]
                }));
                for (let v of u.slice(1)) this.objective.appendChild(Object.assign(document.createElement("span"), {
                    className: "hud-objective-note",
                    textContent: v
                }));
            }
            this.objective.classList.toggle("stalled", c.map.objective === "hold" && !c.inZone && c.phase === 0);
            let j = c.skirmish ? c.skirmish.endsAt : 0,
                l = c.map.timeLimit > 0 ? c.map.timeLimit : c.map.objective === "survive" ? c.map.duration : j;
            if (l > 0) {
                this.timer.root.hidden = false;
                let y = this.timer.root.querySelector(".ui-meter-label");
                y && (y.textContent = c.skirmish || c.map.timeLimit > 0 ? "time left" : "hold");
                let A = Math.max(0, l - c.time);
                this.timer.set(1 - A / l, formatClock(Math.ceil(A))), this.timer.root.classList.toggle("big", !!c.skirmish);
            } else this.timer.root.hidden = true;
            if (!(this.ov.briefingUp && c.phase === 0) && c.phase !== this.lastPhase && !(c.phase !== 0 && c.phaseTime < f.banner.hold)) {
                if (this.lastPhase = c.phase, c.phase === 0) {
                    this.ov.conceal();
                    return;
                }
                if (this.outcome.score) {
                    this.scorePanel.show(c, {
                        score: this.outcome.score,
                        onRetry: this.setup.onRetry,
                        onMissions: this.setup.onMissions
                    });
                    return;
                }
                this.resultPanel.show(c, {
                    record: this.outcome.record,
                    aftermath: this.outcome.aftermath,
                    hasNext: this.setup.hasNext,
                    missionNumber: this.setup.missionNumber,
                    difficulties: this.setup.difficulties,
                    onNext: this.setup.onNext,
                    onRetry: this.setup.onRetry,
                    onMissions: this.setup.onMissions
                });
            }
        } hideOverlay() {
            const IO = cX;
            this.resultPanel.close(), this.ov.hide(), this.lastPhase = null;
        } showBriefing(c) {
            const IP = cX;
            this.briefingPanel.show(c, this.setup);
        } showArena(c, d = false) {
            const IQ = cX;
            this.arena.show(c, d);
        } showScore(c) {
            const IR = cX;
            this.arena.showScore(c);
        } hideArena() {
            const IS = cX;
            this.arena.hide();
        } hideClock() {
            const IU = cX;
            this.clock.hide();
        }
    },
    j3 = {
        '\x20': ["........", "........", "........", "........", "........", "........", "........", "........", "........", "........", "........"],
        A: ["..####..", ".######.", "###..###", "###..###", "###..###", "########", "########", "###..###", "###..###", "###..###", "###..###"],
        B: ["#######.", "########", "###..###", "###..###", "#######.", "#######.", "###..###", "###..###", "###..###", "########", "#######."],
        C: ["..#####.", ".#######", "###..###", "###.....", "###.....", "###.....", "###.....", "###.....", "###..###", ".#######", "..#####."],
        D: ["######..", "#######.", "###..###", "###...##", "###...##", "###...##", "###...##", "###...##", "###..###", "#######.", "######.."],
        E: ["########", "########", "###.....", "###.....", "#######.", "#######.", "###.....", "###.....", "###.....", "########", "########"],
        F: ["########", "########", "###.....", "###.....", "#######.", "#######.", "###.....", "###.....", "###.....", "###.....", "###....."],
        G: ["..#####.", ".#######", "###..###", "###.....", "###.....", "###.####", "###.####", "###..###", "###..###", ".#######", "..#####."],
        H: ["###..###", "###..###", "###..###", "###..###", "########", "########", "###..###", "###..###", "###..###", "###..###", "###..###"],
        I: ["########", "########", "..###...", "..###...", "..###...", "..###...", "..###...", "..###...", "..###...", "########", "########"],
        J: [".....###", ".....###", ".....###", ".....###", ".....###", ".....###", ".....###", "###..###", "###..###", ".#######", "..#####."],
        K: ["###...##", "###..##.", "###.##..", "######..", "#####...", "#####...", "######..", "###.##..", "###..##.", "###...##", "###...##"],
        L: ["###.....", "###.....", "###.....", "###.....", "###.....", "###.....", "###.....", "###.....", "###.....", "########", "########"],
        M: ["##....##", "###..###", "###..###", "##.##.##", "##.##.##", "##.##.##", "##.##.##", "##....##", "##....##", "##....##", "##....##"],
        N: ["##....##", "###...##", "####..##", "####..##", "##.#..##", "##.##.##", "##..#.##", "##..####", "##..####", "##...###", "##....##"],
        O: ["..#####.", ".#######", "###..###", "##....##", "##....##", "##....##", "##....##", "##....##", "###..###", ".#######", "..#####."],
        P: ["#######.", "########", "###..###", "###..###", "###..###", "########", "#######.", "###.....", "###.....", "###.....", "###....."],
        Q: ["..#####.", ".#######", "###..###", "##....##", "##....##", "##....##", "##....##", "##....##", "###..###", ".######.", "..###.##"],
        R: ["#######.", "########", "###..###", "###..###", "###..###", "########", "#####...", "###.##..", "###..##.", "###...##", "###...##"],
        S: [".######.", "########", "##....##", "##......", ".######.", "..#####.", "......##", "##....##", "##....##", "########", ".######."],
        T: ["########", "########", "..###...", "..###...", "..###...", "..###...", "..###...", "..###...", "..###...", "..###...", "..###..."],
        U: ["##....##", "##....##", "##....##", "##....##", "##....##", "##....##", "##....##", "##....##", "###..###", ".#######", "..#####."],
        V: ["##....##", "##....##", "##....##", "##....##", "##....##", "##....##", ".##..##.", ".##..##.", "..####..", "..####..", "...##..."],
        W: ["##....##", "##....##", "##....##", "##....##", "##....##", "##.##.##", "##.##.##", "##.##.##", "########", "###..###", "##....##"],
        X: ["##....##", "###..###", ".##..##.", ".######.", "..####..", "..####..", "..####..", ".######.", ".##..##.", "###..###", "##....##"],
        Y: ["##....##", "###..###", ".##..##.", ".######.", "..####..", "...##...", "...##...", "...##...", "...##...", "...##...", "...##..."],
        Z: ["########", "########", ".....##.", "....##..", "...##...", "..##....", "..##....", ".##.....", "##......", "########", "########"],
        0x0: ["..#####.", ".#######", "###..###", "##...###", "##..#.##", "##..#.##", "##.#..##", "##....##", "###..###", ".#######", "..#####."],
        0x1: ["...###..", "..####..", ".#####..", "...###..", "...###..", "...###..", "...###..", "...###..", "...###..", "########", "########"],
        0x2: [".######.", "########", "##....##", "......##", ".....##.", "...###..", "..###...", ".###....", "##......", "########", "########"],
        0x3: [".######.", "########", "##....##", "......##", "..#####.", "..#####.", "......##", "##....##", "##....##", "########", ".######."],
        0x4: ["....###.", "...####.", "..##.##.", ".##..##.", "##...##.", "########", "########", ".....##.", ".....##.", ".....##.", ".....##."],
        0x5: ["########", "########", "##......", "##......", "#######.", "########", "......##", "##....##", "##....##", "########", ".######."],
        0x6: ["..#####.", ".#######", "###.....", "##......", "#######.", "########", "##....##", "##....##", "###..###", ".#######", "..#####."],
        0x7: ["########", "########", ".....##.", ".....##.", "....##..", "....##..", "...##...", "...##...", "..##....", "..##....", "..##...."],
        0x8: ["..#####.", ".#######", "##....##", "##....##", ".######.", ".######.", "##....##", "##....##", "##....##", ".#######", "..#####."],
        0x9: ["..#####.", ".#######", "###..###", "##....##", "##....##", "########", ".#######", "......##", ".....###", ".######.", "..#####."],
        '.': ["........", "........", "........", "........", "........", "........", "........", "........", "........", "...##...", "...##..."],
        ',': ["........", "........", "........", "........", "........", "........", "........", "........", "...##...", "...##...", "..##...."],
        ':': ["........", "........", "...##...", "...##...", "........", "........", "........", "...##...", "...##...", "........", "........"],
        '\x27': ["...##...", "...##...", "...##...", "........", "........", "........", "........", "........", "........", "........", "........"],
        '-': ["........", "........", "........", "........", ".######.", ".######.", "........", "........", "........", "........", "........"],
        '!': ["..###...", "..###...", "..###...", "..###...", "..###...", "..###...", "..###...", "..###...", "........", "..###...", "..###..."],
        '?': [".######.", "########", "##....##", "......##", ".....##.", "...###..", "...##...", "...##...", "........", "...##...", "...##..."],
        '/': [".....###", ".....##.", "....###.", "....##..", "...###..", "...##...", "..###...", "..##....", ".###....", ".##.....", "###....."],
        '&': [".####...", "######..", "##..##..", "##..##..", ".####...", "#####.##", "####..##", "##..#.##", "##...###", "#######.", ".#####.#"]
    };
for (let [W, T] of Object.entries(j3)) {
    if (T.length !== 11) throw new Error("title glyph \"" + W + "\" has " + T.length + " rows, not 11");
    for (let e of T)
        if (e.length !== 8) throw new Error("title glyph \"" + W + "\" has a row of " + e.length + ", not 8: \"" + e + '"');
}
var BLANK_GLYPH = Array.from({
    length: 11
}, () => '.' .repeat(8));

function glyphRowsFor(c) {
    const IV = cX;
    return j3[c.toUpperCase()] ?? BLANK_GLYPH;
}
var GLYPH_SIZE = 100,
    R6 = 1000,
    _r = -200,
    xt = 32,
    xr = 126,
    O3 = {
        family: "Boots & Bullets Pixel",
        postScript: "BootsAndBulletsPixel-Regular",
        w: 5,
        h: 7,
        advance: 6,
        rows: Rs
    },
    N3 = {
        family: "Boots & Bullets Title",
        postScript: "BootsAndBulletsTitle-Regular",
        w: 8,
        h: 11,
        advance: 9,
        rows: glyphRowsFor
    },
    vW = class {
        ["bytes"] = [];
        getlength() {
            const IX = cX;
            return this.bytes.length;
        } u8(c) {
            const IY = cX;
            this.bytes.push(c & 255);
        } u16(c) {
            this.u8(c >> 8), this.u8(c);
        } i16(c) {
            const IZ = cX;
            this.u16(c < 0 ? c + 65536 : c);
        } u32(c) {
            const J4 = cX;
            this.u16(c >>> 16 & 65535), this.u16(c & 65535);
        } tag(c) {
            const J7 = cX;
            for (let d of c) this.u8(d.charCodeAt(0));
        } pad4() {
            const J8 = cX;
            for (; this.bytes.length % 4 !== 0;) this.u8(0);
        } bytesOut() {
            const J9 = cX;
            return this.bytes;
        }
    };

function glyphRects(c, d) {
    const Jj = cX;
    let g = [];
    for (let j = 0; j < d.h; j++) {
        let l = c[j] ?? '',
            m = 0;
        for (; m < d.w;) {
            if (l[m] !== '#') {
                m++;
                continue;
            }
            let p = m;
            for (; p + 1 < d.w && l[p + 1] === '#';) p++;
            g.push([m * GLYPH_SIZE, (d.h - 1 - j) * GLYPH_SIZE, (p + 1) * GLYPH_SIZE, (d.h - j) * GLYPH_SIZE]), m = p + 1;
        }
    }
    return g;
}

function glyphRectStream(c, d) {
    const Jk = cX;
    let g = glyphRects(c, d);
    if (g.length === 0) return [];
    let j = new vW();
    j.i16(g.length), j.i16(Math.min(...g.map(p => p[0]))), j.i16(Math.min(...g.map(p => p[1]))), j.i16(Math.max(...g.map(p => p[2]))), j.i16(Math.max(...g.map(p => p[3])));
    for (let p = 0; p < g.length; p++) j.u16((p + 1) * 4 - 1);
    j.u16(0);
    let l = [];
    for (let [q, u, v, y] of g) l.push([q, u], [q, y], [v, y], [v, u]);
    for (let A = 0; A < l.length; A++) j.u8(1);
    let m = 0;
    for (let [C] of l) j.i16(C - m), m = C;
    m = 0;
    for (let [, E] of l) j.i16(E - m), m = E;
    return j.pad4(), j.bytesOut();
}

function buildFontPdf(q) {
    const Jq = cX;
    let F = xr - xt + 1 + 1,
        H = q.advance,
        K = q.w,
        L = q.h,
        P = (L + 1) * GLYPH_SIZE,
        Q = [
            []
        ];
    for (let aH = xt; aH <= xr; aH++) Q.push(glyphRectStream(q.rows(String.fromCharCode(aH)), q));
    let U = new vW(),
        V = new vW(),
        X = 0;
    for (let aI of Q) {
        V.u32(X);
        for (let aJ of aI) U.u8(aJ);
        X += aI.length;
    }
    V.u32(X);
    let Y = new vW();
    Y.u32(65536), Y.u32(65536), Y.u32(0), Y.u32(1594834165), Y.u16(11), Y.u16(R6);
    for (let aK = 0; aK < 4; aK++) Y.u32(0);
    Y.i16(0), Y.i16(_r), Y.i16(K * GLYPH_SIZE), Y.i16(L * GLYPH_SIZE), Y.u16(0), Y.u16(7), Y.i16(2), Y.i16(1), Y.i16(0);
    let a7 = new vW();
    a7.u32(65536), a7.i16(P), a7.i16(_r), a7.i16(0), a7.u16(H * GLYPH_SIZE), a7.i16(0), a7.i16(0), a7.i16(K * GLYPH_SIZE), a7.i16(1), a7.i16(0), a7.i16(0);
    for (let aL = 0; aL < 4; aL++) a7.i16(0);
    a7.i16(0), a7.u16(F);
    let a8 = new vW();
    for (let aM = 0; aM < F; aM++) a8.u16(H * GLYPH_SIZE), a8.i16(0);
    let a9 = new vW();
    a9.u32(65536), a9.u16(F), a9.u16(K * L * 4), a9.u16(K * L);
    for (let aN = 0; aN < 11; aN++) a9.u16(0);
    a9.u16(0), a9.u16(0);
    let aj = new vW();
    aj.u16(0), aj.u16(1), aj.u16(3), aj.u16(1), aj.u32(12), aj.u16(4), aj.u16(32), aj.u16(0), aj.u16(4), aj.u16(4), aj.u16(1), aj.u16(0), aj.u16(xr), aj.u16(65535), aj.u16(0), aj.u16(xt), aj.u16(65535), aj.u16(1 - xt & 65535), aj.u16(1), aj.u16(0), aj.u16(0);
    let ak = new vW();
    ak.u16(4), ak.i16(H * GLYPH_SIZE), ak.u16(400), ak.u16(5), ak.i16(0);
    for (let aO = 0; aO < 4; aO++) ak.i16(0);
    for (let aP = 0; aP < 4; aP++) ak.i16(0);
    ak.i16(GLYPH_SIZE), ak.i16(4 * GLYPH_SIZE), ak.i16(0);
    for (let aQ = 0; aQ < 10; aQ++) ak.u8(0);
    ak.u32(3), ak.u32(0), ak.u32(0), ak.u32(0), ak.tag("CFDR"), ak.u16(64), ak.u16(xt), ak.u16(xr), ak.i16(P), ak.i16(_r), ak.i16(0), ak.u16(P), ak.u16(-_r), ak.u32(0), ak.u32(0), ak.i16(L * GLYPH_SIZE), ak.i16(L * GLYPH_SIZE), ak.u16(0), ak.u16(xt), ak.u16(2);
    let aq = [q.family, "Regular", q.postScript, q.family, "1.0", q.postScript],
        aw = new vW();
    aw.u16(0), aw.u16(aq.length), aw.u16(6 + aq.length * 12);
    let ax = 0,
        az = [];
    aq.forEach((aR, aS) => {
        const Jw = Jq;
        let aU = [];
        for (let aV of aR) aU.push(0, aV.charCodeAt(0));
        aw.u16(3), aw.u16(1), aw.u16(1033), aw.u16(aS + 1), aw.u16(aU.length), aw.u16(ax), az.push(...aU), ax += aU.length;
    });
    for (let aR of az) aw.u8(aR);
    aw.pad4();
    let aA = new vW();
    aA.u32(196608), aA.u32(0), aA.i16(0), aA.i16(0), aA.u32(1);
    for (let aS = 0; aS < 4; aS++) aA.u32(0);
    let aB = [
        ["OS/2", ak.bytesOut()],
        ["cmap", aj.bytesOut()],
        ["glyf", U.bytesOut()],
        ["head", Y.bytesOut()],
        ["hhea", a7.bytesOut()],
        ["hmtx", a8.bytesOut()],
        ["loca", V.bytesOut()],
        ["maxp", a9.bytesOut()],
        ["name", aw.bytesOut()],
        ["post", aA.bytesOut()]
    ];
    aB.sort((aU, aV) => aU[0] < aV[0] ? -1 : 1);
    let aC = aB.length,
        aD = 2 ** Math.floor(Math.log2(aC)),
        aE = new vW();
    aE.u32(65536), aE.u16(aC), aE.u16(aD * 16), aE.u16(Math.log2(aD)), aE.u16(aC * 16 - aD * 16);
    let aF = 12 + aC * 16,
        aG = [];
    for (let [aU, aV] of aB) aE.tag(aU), aE.u32(0), aE.u32(aF), aE.u32(aV.length), aG.push(aF), aF += aV.length + (4 - aV.length % 4) % 4;
    for (let [, aX] of aB) {
        for (let aY of aX) aE.u8(aY);
        aE.pad4();
    }
    return Uint8Array.from(aE.bytesOut());
}
var PRIMARY_FONT = O3.family,
    EV = N3.family,
    P3 = new Set();
async function embedFontFace(c) {
    const Jx = cX;
    if (P3.has(c.family)) return true;
    if (typeof document > 'u') return false;
    let d;
    try {
        let i = buildFontPdf(c),
            j = '';
        for (let l = 0; l < i.length; l++) j += String.fromCharCode(i[l]);
        d = btoa(j);
    } catch {
        return false;
    }
    let g = document.createElement("style");
    g.textContent = "@font-face{font-family:'" + c.family + "';src:url(data:font/ttf;base64," + d + ") format('truetype');font-weight:100 900;font-style:normal;font-display:block}", document.head.appendChild(g), P3.add(c.family);
    try {
        await document.fonts?.load("20px '" + c.family + '\x27');
    } catch {}
    return true;
}
async function embedFonts() {
    const Jz = cX;
    let [c] = await Promise.all([embedFontFace(O3), embedFontFace(N3)]);
    return c;
}
var CLICKABLE_SELECTOR = "button, [role=\"button\"], .fx-btn, .fx-card, .fx-group",
    F3 = false;

function installClickRouter() {
    const JA = cX;
    F3 || (F3 = true, document.addEventListener("pointerdown", c => {
        const JB = JA;
        if (c.button !== 0) return;
        let d = c.target;
        if (!(d instanceof Element)) return;
        let g = d.closest(CLICKABLE_SELECTOR);
        g && (g.closest("#controls") || g.matches(":disabled, [disabled], [aria-disabled=\"true\"]") || ls());
    }, {
        capture: true,
        passive: true
    }));
}
var OVERLAY_CONTROL_SELECTOR = "button, [role=\"button\"], .fx-btn, .fx-card, .fx-group",
    G3 = "#overlay",
    j2 = new WeakMap(),
    H3 = false;

function registerOverlayControls(c, d) {
    const JC = cX;
    if (c instanceof Element) {
        c.matches(OVERLAY_CONTROL_SELECTOR) && j2.set(c, d);
        for (let g of c.querySelectorAll(OVERLAY_CONTROL_SELECTOR)) j2.set(g, d);
    }
}
var isInOverlay = c => !!c.closest(G3);

function installOverlayObserver() {
    const JD = cX;
    if (H3) return;
    H3 = true;
    let c = document.querySelector(G3);
    if (c) {
        new MutationObserver(d => {
            const JE = JD;
            let g = performance.now();
            for (let i of d)
                for (let j of i.addedNodes) registerOverlayControls(j, g);
        }).observe(c, {
            childList: true,
            subtree: true
        });
        for (let d of ["pointerdown", "click"]) document.addEventListener(d, g => {
            const JF = JD;
            let i = g.target;
            if (!(i instanceof Element)) return;
            let j = i.closest(OVERLAY_CONTROL_SELECTOR);
            if (!j || j.closest("#controls") || !isInOverlay(j)) return;
            let l = j2.get(j);
            l === void 0 || performance.now() - l >= 250 || (g.stopPropagation(), g.preventDefault());
        }, {
            capture: true
        });
    }
}
async function q3() {
    const JG = cX;
    startBootTimer(), await embedFonts(), revealBootFace(), loadSettings(), applyTitleArtVars(), revealBootLogo(), await setLoadPhase("boot"), startMusic(), installClickRouter(), installOverlayObserver(), preloadMusicTrack();
    let c = document.getElementById("screen"),
        d = c.getContext('2d', {
            alpha: false
        }),
        g = new fi(),
        j = new tr(d);
    j.setBlood(G().blood), onSettingsChange(u => j.setBlood(u.blood)), buildSpriteVars(), await setLoadPhase("sprites");
    let l = new nr(c, d),
        m = new rr(c, l),
        p = new Ln(),
        q = new sr(m, l);
    return m.onFirstPress(() => unlockAudio()), l.onChange(u => {
        const JH = JG;
        g.zoom = u.deviceZoom, g.resize(c.width, c.height);
    }), l.apply(), window.addEventListener("resize", () => l.apply()), window.addEventListener("orientationchange", () => l.apply()), window.addEventListener("orientationchange", () => {
        const JI = JG;
        window.setTimeout(() => l.apply(), 250);
    }), m.onZoom = u => {
        const JJ = JG;
        let v = Math.max(-1, Math.min(1, G().zoomBias + u));
        v !== G().zoomBias && (updateSettings({
            zoomBias: v
        }), l.apply());
    }, {
        canvas: c,
        ctx: d,
        camera: g,
        renderer: j,
        layout: l,
        input: m,
        hud: p,
        controls: q
    };
}
var viewEdgeX = (c, d) => {
    const JK = cX;
    if (!d) return 0;
    let g = c.viewW / 2;
    return g <= 0 ? 0 : (d.x - (c.x + g)) / g;
};

function soundForEvent(c, d, g) {
    const JL = cX;
    if (!(c.side !== void 0 && c.side !== g)) switch (c.kind) {
        case "shot":
            return c.by === g ? Ts() : Jn();
        case "enemyShot":
            return Jn();
        case "explosion":
            return Zn();
        case "airstrike":
            return Ws();
        case "collapse":
            return is();
        case "klaxon":
            return ds();
        case "plane":
            return es();
        case "smoke":
            return ts();
        case "flashbang":
            return ns();
        case "tinnitus":
            return os(c.value ?? 0);
        case "pickup":
            return Ft();
        case "wade":
            return ss(!!c.value);
        case "order":
            return as();
        case "denied":
            return cs();
        case "grunt":
            return eo(viewEdgeX(d, c.at));
        case "squawk":
            return to(viewEdgeX(d, c.at));
        case "win":
            return us();
        case "lose":
            return ms();
        default:
            return c.kind;
    }
}

function xe(c, d) {
    const JM = cX;
    for (let g of c.screams) To(viewEdgeX(d, g));
    for (let i of c.deaths) Wo(viewEdgeX(d, i));
    for (let j of c.sounds) soundForEvent(j, d, c.viewSide);
    c.screams.length = 0, c.deaths.length = 0, c.sounds.length = 0;
}
var musterRadius = 34,
    I2 = class {
        constructor(c) {
            const JN = cX;
            this.world = c;
            let d = f.arena.influenceCell;
            this.cols = Math.max(1, Math.ceil(c.map.width / d)), this.rows = Math.max(1, Math.ceil(c.map.height / d));
            let g = this.cols * this.rows;
            this.side = Array.from({
                length: c.sides
            }, () => new Float32Array(g)), this.rebuild();
        } ["cols"];
        ["rows"];
        ["side"];
        ["timer"] = 0;
        centreOf(c) {
            const JO = cX;
            let d = this.world.map.tile * f.arena.influenceCell;
            return {
                x: (c % this.cols + 0.5) * d,
                y: (Math.floor(c / this.cols) + 0.5) * d
            };
        } strengthOf(c, d) {
            const JP = cX;
            return this.side[c]?.[d] ?? 0;
        } presence(c) {
            const JQ = cX;
            let d = 0;
            for (let g of this.side) d += g[c];
            return d;
        } contested(c) {
            const JR = cX;
            let d = 0,
                g = 0;
            for (let i of this.side) d += i[c], i[c] > g && (g = i[c]);
            return 2 * (d - g);
        } holder(c) {
            const JS = cX;
            let d = 0,
                g = null,
                j = false;
            for (let l = 0; l < this.side.length; l++) {
                let m = this.side[l][c];
                m > d ? (d = m, g = l, j = false) : m === d && (j = true);
            }
            return d <= 0 || j ? null : g;
        } fractionHeld(c) {
            const JU = cX;
            let d = 0,
                g = 0;
            for (let i = 0; i < this.cols * this.rows; i++) this.presence(i) <= 0.05 || (g++, this.holder(i) === c && d++);
            return g === 0 ? 0.5 : d / g;
        } hottest() {
            const JV = cX;
            let c = 0,
                d = 0;
            for (let g = 0; g < this.cols * this.rows; g++) {
                let i = this.contested(g);
                i > d && (d = i, c = g);
            }
            return {
                index: c,
                tension: d
            };
        } step(c) {
            const JX = cX;
            this.timer -= c, !(this.timer > 0) && (this.timer = f.arena.influenceInterval, this.rebuild());
        } rebuild() {
            const JY = cX;
            for (let j of this.side) j.fill(0);
            let d = this.world.map.tile * f.arena.influenceCell,
                g = f.arena.influenceRadius * this.world.map.tile;
            for (let l of this.world.enemies) {
                if (!l.alive) continue;
                let m = this.side[l.faction];
                if (!m) continue;
                let p = l.pos.x / d,
                    q = l.pos.y / d,
                    u = Math.ceil(g / d);
                for (let v = Math.floor(q - u); v <= q + u; v++)
                    for (let y = Math.floor(p - u); y <= p + u; y++) {
                        if (y < 0 || v < 0 || y >= this.cols || v >= this.rows) continue;
                        let A = 1 - Math.hypot((y + 0.5 - p) * d, (v + 0.5 - q) * d) / g;
                        A > 0 && (m[v * this.cols + y] += A);
                    }
            }
        }
    },
    wr = class {
        constructor(c, d, g, j, l) {
            const JZ = cX;
            this.world = c, this.side = d, this.influence = j, this.nextSquad = l;
            let m = g.reduce((u, v) => u + v.centre.x, 0) / g.length,
                p = g.reduce((u, v) => u + v.centre.y, 0) / g.length,
                q = c.map.width * c.map.tile / 2;
            this.muster = {
                x: m + (m < q ? 1 : -1) * c.map.tile * 4,
                y: p
            };
        } ["squads"] = [];
        ["nextSquad"];
        ["muster"];
        strays() {
            const K2 = cX;
            return this.world.enemies.filter(c => c.alive && c.faction === this.side && c.squad < 0);
        } alive() {
            const K4 = cX;
            let c = 0;
            for (let d of this.world.enemies) d.alive && d.faction === this.side && c++;
            return c;
        } step(c) {
            const K7 = cX;
            let d = this.squads.find(g => g.goal === null) ?? this.open();
            for (let g of this.strays()) {
                if (!g.traits.teamwork) {
                    (g.state === 0 || !g.investigate) && this.sendAlone(g);
                    continue;
                }
                this.alive() > f.arena.maxAlive || (d.members.push(g), g.squad = d.id, g.state = 5);
            }
            for (let i of this.squads) {
                if (i.members = i.members.filter(j => j.alive), i.age += c, i.goal === null) {
                    this.world.squadFields[i.id] || (this.world.squadFields[i.id] = yW(this.world.map, i.rally, true)), (i.members.filter(j => Math.hypot(j.pos.x - i.rally.x, j.pos.y - i.rally.y) < musterRadius).length >= f.arena.squadSize || i.age > f.arena.musterTimeout && i.members.length > 0) && this.commit(i);
                    continue;
                }
                i.retarget -= c, i.retarget <= 0 && (i.retarget = f.arena.retargetInterval, this.aim(i));
                for (let j of i.members)(j.state === 0 || j.state === 1) && (j.state = 5);
                i.members.length === 0 && this.retire(i);
            }
        } open() {
            const K8 = cX;
            let c = {
                id: this.nextSquad,
                side: this.side,
                members: [],
                goal: null,
                rally: this.rallyFor(this.nextSquad),
                age: 0,
                retarget: 0
            };
            return this.nextSquad += 2, this.squads.push(c), c;
        } rallyFor(c) {
            const K9 = cX;
            let d = f.arena.musterSpread;
            if (d <= 0) return {
                x: this.muster.x,
                y: this.muster.y
            };
            let g = mT(c, 11) * Math.PI * 2,
                i = d * Math.sqrt(mT(c, 12));
            return findOpenPosition(this.world.map, {
                x: this.muster.x + Math.cos(g) * i,
                y: this.muster.y + Math.sin(g) * i
            });
        } retire(c) {
            const Kd = cX;
            this.world.squadFields[c.id] = null;
            let d = this.squads.indexOf(c);
            d >= 0 && this.squads.splice(d, 1);
        } commit(c) {
            const Kj = cX;
            c.goal = c.rally, c.retarget = 0, this.aim(c);
            for (let d of c.members) d.state = 5;
        } sendAlone(c) {
            const Kk = cX;
            let d = null,
                g = 1 / 0;
            for (let l of this.world.buildings) {
                if (l.owner === this.side || !l.standing) continue;
                let m = Math.hypot(l.centre.x - c.pos.x, l.centre.y - c.pos.y);
                m < g && (g = m, d = l);
            }
            let j = d ? d.centre : this.muster;
            c.state = 4, c.investigate = FW(this.world, j, c.id, f.arena.loneSpread), c.memory = f.enemy.alertMemory, c.searchTime = 0, c.path.length = 0;
        } aim(c) {
            const Kp = cX;
            let d = c.members.length > 0 ? {
                    x: c.members.reduce((l, m) => l + m.pos.x, 0) / c.members.length,
                    y: c.members.reduce((l, m) => l + m.pos.y, 0) / c.members.length
                } : this.muster,
                g = null,
                j = f.arena.tensionThreshold;
            for (let l = 0; l < this.influence.cols * this.influence.rows; l++) {
                let m = this.influence.contested(l);
                if (m < j) continue;
                let p = this.influence.centreOf(l),
                    q = m - Math.hypot(p.x - d.x, p.y - d.y) / (this.world.map.tile * 40);
                q > j && (j = q, g = p);
            }
            if (!g) {
                let u = null,
                    v = 1 / 0;
                for (let y of this.world.buildings) {
                    if (y.owner === this.side || !y.standing) continue;
                    let A = Math.hypot(y.centre.x - d.x, y.centre.y - d.y);
                    A < v && (v = A, u = y);
                }
                g = u ? u.centre : this.muster;
            }
            c.goal = g, this.world.squadFields[c.id] = yW(this.world.map, g, true);
        }
    },
    Sr = class {
        constructor(c) {
            const Kq = cX;
            this.world = c, (c.playerSides = [], this.losses = new Array(c.sides).fill(0), c.sideLevers = {
                [D.Player]: buildDifficultyLevers("veteran", "arena-green"),
                [D.Enemy]: buildDifficultyLevers("veteran", "arena-red")
            }, this.influence = new I2(c));
            let d = g => c.buildings.filter(j => j.owner === g);
            this.commanders[D.Player] = new wr(c, D.Player, d(D.Player), this.influence, 0), this.commanders[D.Enemy] = new wr(c, D.Enemy, d(D.Enemy), this.influence, 1);
            for (let g of [D.Player, D.Enemy]) {
                let j = d(g);
                if (j.length === 0) continue;
                let l = {
                        x: j[0].centre.x + (g === D.Player ? 1 : -1) * c.map.tile * 2,
                        y: j[0].centre.y - c.map.tile * 2
                    },
                    m = WW(c, l, 1, null, c.sideLevers[g], -1, g);
                ve(c, m), m.squad = -2;
            }
            c.arenaPace = p => {
                const Kv = Kq;
                let {
                    paceRange: q
                } = f.arena, r = this.influence.fractionHeld(p);
                return q[0] + (q[1] - q[0]) * r;
            };
        } ["influence"];
        ["commanders"] = [];
        ["losses"];
        ["counted"] = new Set();
        step(c) {
            const Kw = cX;
            this.influence.step(c);
            for (let d of this.commanders) d?.step(c);
            for (let g of this.world.enemies) g.alive || this.counted.has(g.id) || (this.counted.add(g.id), this.losses[g.faction] = (this.losses[g.faction] ?? 0) + 1);
        } standing(c) {
            const Kx = cX;
            return this.commanders[c]?.alive() ?? 0;
        } front() {
            const Kz = cX;
            let c = this.influence.hottest();
            return c.tension < f.arena.tensionThreshold ? null : this.influence.centreOf(c.index);
        }
    };

function siteCentroid(c, d) {
    const KA = cX;
    let g = c.map,
        j = d === "hostages" ? g.hostages : d === "extraction" ? g.extraction : g.playerSpawns;
    if (j.length === 0) return null;
    let l = 0,
        m = 0;
    for (let p of j) l += p.x, m += p.y;
    return {
        x: l / j.length,
        y: m / j.length
    };
}

function pointInZone(c, d, g) {
    const KB = cX;
    let i = c.map.tile;
    if ("rect" in d) {
        let l = d.rect;
        return g.x >= l.x * i && g.x < (l.x + l.w) * i && g.y >= l.y * i && g.y < (l.y + l.h) * i;
    }
    let j = siteCentroid(c, d.at);
    return j !== null && Math.hypot(g.x - j.x, g.y - j.y) <= d.radius * i;
}

function $3(c, d) {
    const KC = cX;
    let g = c.map.triggers;
    if (g.length === 0) return;
    c.triggerState ??= g.map(() => ({
        fired: 0,
        inside: 0,
        cooldown: 0,
        armed: true
    }));
    let i = c.soldiers.filter(j => j.alive && j.faction === D.Player);
    g.forEach((j, l) => {
        const KD = KC;
        let m = c.triggerState[l];
        if (m.cooldown > 0 && (m.cooldown = Math.max(0, m.cooldown - d)), !(m.fired >= (j.times ?? 1))) {
            if (!i.some(p => pointInZone(c, j.when, p.pos))) {
                m.inside = 0, m.armed = true;
                return;
            }
            m.inside += d, !(!m.armed || m.cooldown > 0 || m.inside < (j.dwell ?? 0.5)) && (spawnReinforcements(c, j.action), m.fired++, m.inside = 0, m.cooldown = j.cooldown ?? 0, (j.rearm ?? "exit") === "exit" && (m.armed = false));
        }
    });
}

function spawnReinforcements(g, j) {
    const KE = cX;
    let m = g.map.tile,
        p = j.near,
        q = typeof p == "string" ? siteCentroid(g, p) : {
            x: (p.x + 0.5) * m,
            y: (p.y + 0.5) * m
        };
    if (!q) return;
    let v = (j.spread ?? 6) * m,
        y = (j.minDistance ?? 14) * m,
        A = g.soldiers.filter(E => E.alive && E.faction === D.Player),
        C = 0;
    for (let E = 0; C < j.count && E < j.count * 12; E++) {
        let F = g.rng() * Math.PI * 2,
            H = v * Math.sqrt(g.rng()),
            I = findOpenPosition(g.map, {
                x: q.x + Math.cos(F) * H,
                y: q.y + Math.sin(F) * H
            });
        if (A.some(L => Math.hypot(L.pos.x - I.x, L.pos.y - I.y) < y)) continue;
        let K = WW(g, I, 0, null, g.levers, -1, D.Enemy, g.map.personas);
        re(g, K), K.state = 0, ve(g, K), g.enemyTotal++, C++;
    }
}
var pathFollowDistance = 40,
    V6 = 20;

function Er(c, d, g = 9, j) {
    const KF = cX;
    let l = null,
        m = 1 / 0;
    for (let q of c.actors) {
        if (!q.alive || q.faction === j) continue;
        let u = Math.hypot(q.pos.x - d.x, q.pos.y - d.y);
        u <= q.radius + g && u < m && (m = u, l = q);
    }
    if (l) return {
        kind: "enemy",
        actor: l
    };
    let p = ft(c, d.x, d.y, 2);
    return p && p.role !== "protect" ? {
        kind: "building",
        building: p
    } : {
        kind: "ground"
    };
}
var soldiersOfSide = (c, d) => c.soldiers.filter(g => g.faction === d),
    P2 = (c, d) => {
        const KG = cX;
        d === c.viewSide && c.sounds.push({
            kind: "order"
        });
    };

function ae(c, d, g = c, j, l = {}) {
    const KH = cX;
    if (c.preroll > 0) return;
    let m = findOpenPosition(c.map, d);
    g.squadTarget = null, g.targetBuilding = null, g.field = yW(c.map, m, true, l.swimCost ?? 1), g.orderGoal = m, g.orderMarker = f.soldier.orderMarkerTime, assignFormation(c, m, j);
    for (let p of soldiersOfSide(c, j)) p.alive && (p.state = 1);
    l.quiet || P2(c, j);
}

function Cr(c, d, g) {
    const KI = cX;
    for (let i of soldiersOfSide(c, g)) i.alive && (i.fireLatch = _T[i.weapon].fireInterval, i.fireLatchAt = {
        x: d.x,
        y: d.y
    });
}

function kt(c, d, g = c, i, j = {}) {
    const KJ = cX;
    if (!(c.preroll > 0)) {
        g.squadTarget = d, g.targetBuilding = null, g.field = yW(c.map, d.pos, true, j.swimCost ?? 1), g.orderGoal = {
            ...d.pos
        }, g.orderMarker = f.soldier.orderMarkerTime, g.lastTargetPos = {
            ...d.pos
        }, g.repathTimer = 0, assignFormation(c, d.pos, i);
        for (let l of soldiersOfSide(c, i)) l.alive && (l.state = 2);
        P2(c, i);
    }
}

function Ar(c, d, g = c, j, l = {}) {
    const KK = cX;
    if (c.preroll > 0) return;
    g.squadTarget = null, g.targetBuilding = d;
    let m = findOpenPosition(c.map, d.centre);
    g.field = yW(c.map, m, true, l.swimCost ?? 1), g.orderGoal = {
        ...d.centre
    }, g.orderMarker = f.soldier.orderMarkerTime, assignFormation(c, m, j);
    for (let p of soldiersOfSide(c, j)) p.alive && (p.state = 2);
    P2(c, j);
}

function assignFormation(c, d, g) {
    const KL = cX;
    let j = c.soldiers.filter(u => u.alive && u.faction === g),
        l = f.soldier.formationSpacing,
        m = f.soldier.formationJitter,
        p = Ci(d, j.length * 3, l).map(u => ({
            x: u.x + (c.jitter() * 2 - 1) * m,
            y: u.y + (c.jitter() * 2 - 1) * m
        })).filter(u => !fT(c.map, u.x, u.y, f.soldier.radius)).slice(0, Math.max(j.length, 1));
    if (p.length === 0) {
        for (let u of j) u.slot = {
            ...d
        }, u.slotStuck = 0;
        return;
    }
    let q = k0(j, p);
    for (let v of j) v.slot = q.get(v) ?? {
        ...d
    }, v.slotStuck = 0;
}

function findFreeSlot(g, j, m) {
    const KM = cX;
    let p = f.soldier.formationSpacing,
        q = j.orderGoal ?? m.pos,
        v = null,
        y = -1 / 0;
    for (let A = 0; A < 14; A++) {
        let C = g.jitter() * Math.PI * 2,
            E = p * (0.5 + g.jitter() * 2),
            F = {
                x: q.x + Math.cos(C) * E,
                y: q.y + Math.sin(C) * E
            };
        if (fT(g.map, F.x, F.y, m.radius) || !DW(g.map, m.pos, F, m.radius)) continue;
        let H = Math.hypot(F.x - q.x, F.y - q.y),
            I = TT[getTileDefAt(g.map, F.x, F.y)].blocksSight,
            K = -H + (I ? p * 1.5 : 0);
        K > y && (y = K, v = F);
    }
    m.slotStuck = 0, v && (m.slot = v);
}

function thinkSoldier(d, g, j, l = null, m = d, p, q = false) {
    const KN = cX;
    let u = f.soldier;
    if (p === d.viewSide && tickStepNoise(d, g), m.squadTarget) {
        if (!m.squadTarget.alive) m.squadTarget = null;
        else {
            m.repathTimer -= g;
            let v = m.lastTargetPos ? Math.hypot(m.squadTarget.pos.x - m.lastTargetPos.x, m.squadTarget.pos.y - m.lastTargetPos.y) : 1 / 0;
            m.repathTimer <= 0 && v > V6 && (m.field = yW(d.map, m.squadTarget.pos, true, m.field?.swimCost ?? 1), m.orderGoal = {
                ...m.squadTarget.pos
            }, m.lastTargetPos = {
                ...m.squadTarget.pos
            }, assignFormation(d, m.squadTarget.pos, p), m.repathTimer = 0.35);
        }
    }
    m.targetBuilding && !m.targetBuilding.standing && (m.targetBuilding = null);
    for (let y of d.soldiers) {
        if (!y.alive || y.faction !== p || (y.prev.x = y.pos.x, y.prev.y = y.pos.y, y.fireCooldown -= g, y.fireLatch > 0 && (y.fireLatch -= g), Mi(y, d.map, g))) continue;
        let A = moveTargetFor(d, m, y) ?? ut(d.map, y);
        if (Ei(y, A, d.hash, d.map, w0, g), h1(y, d.map, g), g1(y, d.map), A && y.slot && Math.hypot(y.vel.x, y.vel.y) < f.movement.slotStuckSpeed ? (y.slotStuck += g, y.slotStuck > f.movement.slotStuckTrigger && findFreeSlot(d, m, y)) : y.slotStuck > 0 && (y.slotStuck = Math.max(0, y.slotStuck - g * 2)), ji(d, y), p === d.viewSide && y.wading && d.jitter() < 0.08 && Math.hypot(y.vel.x, y.vel.y) > 8) {
            let C = z(d.map, Math.floor(y.pos.x / d.map.tile), Math.floor(y.pos.y / d.map.tile)) === 9;
            d.fx.splash(y.pos, C), d.sounds.push({
                kind: "wade",
                at: y.pos,
                value: C ? 1 : 0
            });
        }
        tickFire(d, m, y, j, u, l, q);
    }
}

function moveTargetFor(c, d, g) {
    const KO = cX;
    let i = f.soldier,
        j = d.squadTarget?.alive ? d.squadTarget.pos : d.targetBuilding?.standing ? d.targetBuilding.centre : null;
    if (j) {
        let m = Math.hypot(j.x - g.pos.x, j.y - g.pos.y),
            p = uW(g.weapon),
            q = p.melee ? p.fireRange * 0.75 : p.fireRange - i.engageBuffer;
        if (m <= q && (p.melee || PW(c.map, g.pos, j))) return g.state = 2, null;
    }
    if (g.state === 0 || !g.slot) return null;
    let l = Math.hypot(g.slot.x - g.pos.x, g.slot.y - g.pos.y);
    return l <= f.movement.slotArrived ? (j || (g.state = 0), null) : l < pathFollowDistance || !d.field ? g.slot : f1(d.field, c.map, g.pos, g.radius) ?? g.slot;
}

function $6(c, d, g) {
    const KP = cX;
    let j = f.soldier.manualFan;
    if (j <= 0) return g;
    let l = hT(c, d.faction);
    if (!l) return g;
    let m = d.pos.x - l.x,
        p = d.pos.y - l.y,
        q = Math.hypot(m, p);
    if (q < 0.001) return g;
    let u = Math.min(1, j / q);
    return {
        x: g.x + m * u,
        y: g.y + p * u
    };
}

function tickFire(c, d, g, j, m, p, q = false) {
    const KQ = cX;
    let u = j ?? (g.fireLatch > 0 ? g.fireLatchAt : null);
    if (g.wading) {
        Math.hypot(g.vel.x, g.vel.y) > 2 && (g.angle = Math.atan2(g.vel.y, g.vel.x));
        return;
    }
    let v = null;
    if (u) v = q ? u : $6(c, g, u);
    else {
        if (d.squadTarget?.alive && inFireRange(c, g, d.squadTarget.pos)) v = d.squadTarget.pos;
        else {
            if (d.targetBuilding?.standing && inFireRange(c, g, d.targetBuilding.centre)) v = d.targetBuilding.centre;
            else {
                if (m.autoEngage && d.autoEngage) {
                    let y = findEngageTarget(c, g);
                    y && (v = y.pos);
                }
            }
        }
    }
    if (!v) {
        if (Math.hypot(g.vel.x, g.vel.y) > 2) g.angle = Math.atan2(g.vel.y, g.vel.x);
        else {
            if (p) {
                let A = p.x - g.pos.x,
                    C = p.y - g.pos.y;
                Math.hypot(A, C) > 12 && (g.angle = Math.atan2(C, A));
            }
        }
        return;
    }
    if (g.angle = Math.atan2(v.y - g.pos.y, v.x - g.pos.x), g.fireCooldown <= 0) {
        let E = rankWeaponModifiers(g);
        g.fireCooldown = E.fireInterval, g.fireLatch = 0;
        let F = _T[g.weapon];
        y1(c, g, v, E.spread, u ? F.fireRange * m.manualRange : void 0);
    }
}

function rankWeaponModifiers(c) {
    const KR = cX;
    let d = _T[c.weapon];
    if (c.rank <= 0) return {
        spread: d.spread,
        fireInterval: d.fireInterval
    };
    let g = rankIndexForMissions(c.rank) / (Tt.length - 1);
    return {
        spread: d.spread * (1 + (f.veteran.spread - 1) * g),
        fireInterval: d.fireInterval * (1 + (f.veteran.fireInterval - 1) * g)
    };
}
var inFireRange = (c, d, g) => Math.hypot(g.x - d.pos.x, g.y - d.pos.y) <= _T[d.weapon].fireRange && (uW(d.weapon).melee === true || PW(c.map, d.pos, g));

function findEngageTarget(c, d) {
    const KS = cX;
    let g = null,
        j = uW(d.weapon),
        l = j.fireRange * (j.autoEngage ?? f.soldier.autoEngageRange),
        m = j.rocket ? j.rocket.speed * j.rocket.life : f.bullet.speed * (j.bulletLife ?? f.bullet.life);
    for (let p of c.actors) {
        if (!p.alive || p.faction === d.faction) continue;
        let q = Math.hypot(p.pos.x - d.pos.x, p.pos.y - d.pos.y);
        wi(c, p, q) && q < l && kW(c.map, d.pos, p.pos) && PW(c.map, d.pos, p.pos) && !Uh(c, d.pos, p.pos, j.spread, m) && (l = q, g = p);
    }
    return g;
}

function tickStepNoise(c, d) {
    const KU = cX;
    if (c.stepNoise -= d, c.stepNoise > 0) return;
    c.stepNoise = f.enemy.stepInterval;
    let g = null,
        j = 0;
    for (let m of c.soldiers) {
        if (!m.alive || m.wading || !c.playerSides.includes(m.faction)) continue;
        let p = Math.hypot(m.vel.x, m.vel.y);
        p > j && (j = p, g = m);
    }
    if (!g) return;
    let l = Math.min(1, j / f.soldier.speed);
    Ai(c, g.pos, f.enemy.stepNoise * l);
}
var On = [];

function collectWorldActors(c) {
    const KV = cX;
    On.length = 0;
    for (let d of c.actors) On.push(d);
    for (let g of c.hostages) g.alive && !g.delivered && On.push(g);
    for (let i of c.critters) i.alive && On.push(i);
    return On;
}

function wt(c, d, g, i = null) {
    const KX = cX;
    if (c.preroll > 0) {
        c.preroll = Math.max(0, c.preroll - d), c.fx.step(d);
        return;
    }
    if (c.time += d, c.phaseTime += d, c.stepIndex++, c.phase !== 0) {
        c.fx.step(d), Ui(c, d), $i(c, d), gt(c, d), c2(c, d), Ii(c, d);
        return;
    }
    if (c.orderMarker = Math.max(0, c.orderMarker - d), c.shouts.length > 0) {
        for (let l of c.shouts) l.t -= d;
        c.shouts = c.shouts.filter(m => m.t > 0);
    }
    c.grenadeCooldown = Math.max(0, c.grenadeCooldown - d), c.herdField && (c.herdField.age += d), c.hostageField && (c.hostageField.age += d), c.sideB && (c.sideB.grenadeCooldown = Math.max(0, c.sideB.grenadeCooldown - d), c.sideB.orderMarker = Math.max(0, c.sideB.orderMarker - d)), c.screams.length = 0, c.deaths.length = 0, c.sounds.length = 0, E0(c, d), S0(c);
    let j = collectWorldActors(c);
    c.hash.rebuild(j), g && thinkSoldier(c, d, g.manualAim, g.cursor, c, D.Player, g.targeted), c.sideB && thinkSoldier(c, d, i?.manualAim ?? null, null, c.sideB, D.Enemy), th(c, d), $h(c, d), mh(c, d), $3(c, d), x0(j, c.hash, c.map, 2), c.lastKnownAge += d, c.fog.step(c.map, c.soldiers, d, c.viewSide ?? D.Player), Vh(c, d), qh(c, d), Ui(c, d), $i(c, d), gt(c, d), c3(c, d), Ii(c, d), Yh(c, d), zh(c), c.fx.step(d), Sn(c) && reapDeadActors(c, d);
}

function reapDeadActors(c, d) {
    const KY = cX;
    if (c.reapTimer -= d, c.reapTimer > 0) return;
    c.reapTimer = 2;
    let g = i => !i.alive && i.deathTime >= f.fx.deathTime;
    if (c.actors.some(g)) {
        for (let i of c.enemies) g(i) && c.fx.forget(i.id);
        c.enemies = c.enemies.filter(j => !g(j)), x1(c);
    }
}
var St = class {
        constructor(c, d, g, j, l = false, m = 0) {
            const KZ = cX;
            this.map = c, this.camera = d, this.input = g, this.onClearDecals = j, this.alwaysLocked = l, this.runSeed = m, (this.world = this.newWorld(), this.arena = new Sr(this.world));
            let p = this.arena.front() ?? this.centre();
            this.camera.centreOn(p, this.map);
        } ["world"];
        ["arena"];
        ["exitRequested"] = false;
        ["idle"] = 0;
        newWorld() {
            const L5 = cX;
            let c = BW(this.map, "veteran", void 0, void 0, this.runSeed);
            return this.onClearDecals(), c.fog = new ze(this.map, 0), c.viewSide = null, c;
        } centre() {
            const L7 = cX;
            return {
                x: this.map.pixelWidth / 2,
                y: this.map.pixelHeight / 2
            };
        } step(c) {
            const L8 = cX;
            this.moveCamera(c), wt(this.world, c, null), this.arena.step(c);
            for (let d of this.input.drain()) d.type === "exit" && (this.exitRequested = true), d.type === "recentre" && this.camera.release();
        } moveCamera(c) {
            const L9 = cX;
            if (this.alwaysLocked || G().arenaLockCamera) {
                this.input.consumePan(this.camera.zoom), this.input.edgeScroll(c), this.world.fx.takeShake(), this.camera.lookAt(this.centre(), this.map), this.camera.update(c, null, this.map), xe(this.world, this.camera);
                return;
            }
            let d = this.input.consumePan(this.camera.zoom),
                g = this.input.edgeScroll(c);
            d.x !== 0 || d.y !== 0 || g.x !== 0 || g.y !== 0 ? this.idle = 0 : this.idle += c, this.camera.pan(d.x + g.x, d.y + g.y, this.map, "timed");
            let i = this.world.fx.takeShake();
            i > 0 && this.camera.addShake(i);
            let j = this.idle > f.arena.driftAfter ? this.arena.front() ?? this.centre() : null;
            this.camera.update(c, j, this.map), xe(this.world, this.camera);
        } readout() {
            const Lj = cX;
            let c = this.world,
                d = (j, l, m) => ({
                    label: l,
                    cls: m,
                    up: this.arena.standing(j),
                    lost: this.arena.losses[j] ?? 0,
                    kills: c.killsBySide[j] ?? 0
                }),
                g = [d(D.Player, "GREEN", "ab-green"), d(D.Enemy, "BLUE", "ab-red")];
            if (c.map.critterNotice !== null) {
                let i = c.critters.filter(j => j.alive).length;
                g.push({
                    label: "CHICKENS",
                    cls: "ab-hen",
                    up: i,
                    lost: c.critters.length - i,
                    kills: c.killsBySide[j1] ?? 0
                });
            }
            return g;
        }
    },
    z3 = "arena-forest";

function Y3(c) {
    const Lk = cX;
    let {
        camera: d,
        renderer: g,
        input: j,
        hud: m,
        layout: p
    } = c.shell, q = null, u = null, v = false, y = null, A = () => p.state.mode === "wide";
    return {
        wanted: A,
        start: async () => {
            const Lq = Lk;
            if (!A()) return;
            try {
                if (q) g.prepare(u, q.world);
                else {
                    u = parseMapDef(aT[z3], z3), g.prepare(u, BW(u, "veteran"));
                    let F = Math.floor(Math.random() * 2147483647);
                    q = new St(u, d, j, () => g.clearDecals(), true, F);
                }
            } catch {
                return;
            }
            j.mode = "sealed", document.body.dataset.mode = "backdrop", p.apply(), v = true;
            let C = q;
            c.set({
                name: "backdrop",
                world: C.world,
                step: H => {
                    const Lv = Lq;
                    document.hidden || (C.step(H), m.showScore(C.readout()));
                },
                draw: (H, I) => g.draw(C.world, d, H, I)
            });
            let E = () => setWorldDuck(isMusicEnabled() ? "ducked" : "silent");
            E(), y = onMusicStateChange(E);
        },
        stop: () => {
            const Lw = Lk;
            v && (v = false, c.set(null), m.hideArena(), y?.(), y = null, setWorldDuck("full"), j.mode = "play", delete document.body.dataset.mode, p.apply());
        }
    };
}

function X3(g) {
    const Lx = cX;
    let {
        ctx: j,
        bed: m,
        lfo: p,
        layer: q
    } = g, v = q(), y = j.createBiquadFilter();
    y.type = "lowpass", y.frequency.value = 400, y.Q.value = 0.7;
    let A = j.createGain();
    A.gain.value = 0.12, m().connect(y).connect(A).connect(v);
    for (let [C, E, F, H] of [
            [1750, 140, 1.9, 0.3],
            [2600, 140, 3.1, 0.26],
            [3550, 140, 2.3, 0.22]
        ]) {
        let I = j.createBiquadFilter();
        I.type = "bandpass", I.frequency.value = C, I.Q.value = 8;
        let K = j.createGain();
        K.gain.value = 0.34, m().connect(I).connect(K).connect(v), p(0.5 + F * 0.07, E, I.frequency), p(F, H, K.gain);
    }
    return v;
}

function J3(c) {
    const Lz = cX;
    let {
        ctx: d,
        voice: g,
        bed: j,
        lfo: l,
        layer: m
    } = c, p = m(), q = d.createBiquadFilter();
    if (q.type = "lowpass", q.frequency.value = g.windCutoff, q.Q.value = 0.6, j().connect(q).connect(p), g.whistle) {
        let u = d.createBiquadFilter();
        u.type = "bandpass", u.frequency.value = 900, u.Q.value = 9;
        let v = d.createGain();
        v.gain.value = 0.35, j().connect(u).connect(v).connect(p), l(0.07, 200, u.frequency);
    }
    return p;
}

function Z3(c) {
    const LA = cX;
    let {
        ctx: d,
        bed: g,
        layer: i
    } = c, j = i(), l = d.createBiquadFilter();
    return l.type = "highpass", l.frequency.value = 3000, g().connect(l).connect(j), j;
}

function Q3(g) {
    const LB = cX;
    let {
        ctx: j,
        voice: m,
        oscillators: p,
        bed: q,
        lfo: v,
        layer: y
    } = g, A = y();
    if (m.insects === "crickets")
        for (let [C, E, F] of [
                [4300, 27, -0.4],
                [4900, 31, 0.4]
            ]) {
            let H = j.createOscillator();
            H.frequency.value = C;
            let I = j.createGain();
            I.gain.value = 0.5, v(E, 0.5, I.gain);
            let K = j.createStereoPanner();
            K.pan.value = F, H.connect(I).connect(K).connect(A), H.start(), p.push(H);
        } else {
            if (m.insects === "cicadas") {
                let L = j.createBiquadFilter();
                L.type = "bandpass", L.frequency.value = 5500, L.Q.value = 5;
                let M = j.createGain();
                M.gain.value = 0.5, v(90, 0.5, M.gain), q().connect(L).connect(M).connect(A);