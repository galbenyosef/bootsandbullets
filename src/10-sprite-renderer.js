    if (c >= d) return dt;
    let i = c - (d - g);
    return i <= 0 ? 0 : Math.min(dt - 1, 1 + Math.floor(i / g * (dt - 1)));
}
var yi = class {
        constructor(c, d, g) {
            const w9 = cX;
            this.atlas = g, (this.canvas = document.createElement("canvas"), this.canvas.width = c, this.canvas.height = d, this.g = this.canvas.getContext('2d'), this.g.imageSmoothingEnabled = false);
        } ["canvas"];
        ['g'];
        getimage() {
            const wj = cX;
            return this.canvas;
        } dispose() {
            const wk = cX;
            this.history.length = 0, this.wornCorpses.clear(), this.canvas.width = 0, this.canvas.height = 0;
        } ["history"] = [];
        ["sweep"] = p0;
        ["wornCorpses"] = new Map();
        ["theme"] = "jungle";
        clear() {
            const wq = cX;
            this.history = [], this.g.clearRect(0, 0, this.canvas.width, this.canvas.height);
        } flush(c, d) {
            const ww = cX;
            this.theme = c.map.theme;
            for (let m of c.fx.takeDecals()) this.history.push({
                ...m,
                born: c.time,
                level: 0
            }), this.stamp(m, 0);
            if (this.sweep -= d, this.sweep > 0) return;
            this.sweep = p0;
            let {
                decalLife: g,
                decalFade: j
            } = f.fx, l = false;
            for (let p of this.history) {
                let q = iv(c.time - p.born, g, j);
                q !== p.level && (p.level = q, l = true);
            }
            if (l) {
                this.history = this.history.filter(s => s.level < dt), this.g.clearRect(0, 0, this.canvas.width, this.canvas.height);
                for (let s of this.history) this.stamp(s, s.level);
            }
        } ["blood"] = "normal";
        stamp(g, j) {
            const wx = cX;
            let q = this.g,
                v = createRngFromSeed(g.seed);
            if (this.blood === "none" && (g.kind === "blood" || g.kind === "slick")) return;
            let y = this.blood === "carnage" ? 4 : 1,
                A = 1 - j / dt,
                C = {
                    blood: 0.85,
                    slick: 0.75,
                    scorch: 0.6
                };
            if (g.kind === "blood")
                for (let E = 0; E < 10 * y; E++) {
                    let F = v() * Math.PI * 2,
                        H = v() * 7 * (y > 1 ? 2.2 : 1),
                        I = v() < 0.4 ? Ra.dark : Ra.light,
                        K = 1 + (v() * 2 | 0);
                    v() > A * C.blood || (q.fillStyle = I, q.fillRect(Math.round(g.pos.x + Math.cos(F) * H), Math.round(g.pos.y + Math.sin(F) * H), K, K));
                } else {
                    if (g.kind === "corpse") {
                        let L = g.who === "player" ? this.atlas.corpsePlayer : g.who === "hostage" ? this.atlas.corpseHostage : g.who === "chicken" ? this.atlas.chickenCorpse[g.seed % this.atlas.chickenCorpse.length] : Wi(this.atlas, g.who ?? "enemy"),
                            M = T2(g.seed, L.length),
                            N = L[M],
                            P = j === 0 ? N : this.wornCorpse(N, g.who ?? "player", M, j);
                        q.drawImage(P, Math.round(g.pos.x - N.width / 2), Math.round(g.pos.y - N.height + 4));
                    } else {
                        if (g.kind === "slick")
                            for (let Q = 0; Q < 22 * y; Q++) {
                                let R = v() * Math.PI * 2,
                                    S = Math.sqrt(v()) * 9 * (y > 1 ? 1.8 : 1);
                                v() > A * C.slick || (q.fillStyle = v() < 0.45 ? ja.dark : ja.light, q.fillRect(Math.round(g.pos.x + Math.cos(R) * S), Math.round(g.pos.y + Math.sin(R) * S * 0.7), 1, 1));
                            } else {
                                if (g.kind === "print") {
                                    if (v() > A) return;
                                    let U = (g.seed & 7) * (Math.PI / 4),
                                        V = Math.round(Math.cos(U)),
                                        X = Math.round(Math.sin(U)),
                                        Y = Math.round(Math.cos(U + Math.PI / 2)),
                                        a7 = Math.round(Math.sin(U + Math.PI / 2)),
                                        a8 = hf(this.theme, g.who === "mud" ? "mud" : "snow"),
                                        a9 = Math.round(g.pos.x),
                                        aj = Math.round(g.pos.y);
                                    q.fillStyle = a8.hollow, q.fillRect(a9, aj, 1, 1), q.fillRect(a9 + Y, aj + a7, 1, 1), q.fillRect(a9 - V, aj - X, 1, 1), q.fillStyle = a8.lip, q.fillRect(a9 + 1, aj + 1, 1, 1);
                                } else
                                    for (let ak = 0; ak < 26; ak++) {
                                        let aq = v() * Math.PI * 2,
                                            aw = v() * 16,
                                            ax = v() < 0.5 ? Ia.dark : Ia.light;
                                        v() > A * C.scorch || (q.fillStyle = ax, q.fillRect(Math.round(g.pos.x + Math.cos(aq) * aw), Math.round(g.pos.y + Math.sin(aq) * aw), 2, 2));
                                    }
                            }
                    }
                }
        } wornCorpse(d, g, j, m) {
            const wz = cX;
            let p = g + '.' + j + '.' + m,
                q = this.wornCorpses.get(p);
            if (q) return q;
            let u = document.createElement("canvas");
            u.width = d.width, u.height = d.height;
            let v = u.getContext('2d');
            v.imageSmoothingEnabled = false, v.drawImage(d, 0, 0);
            let y = 1 - m / dt;
            for (let A = 0; A < u.height; A++)
                for (let C = 0; C < u.width; C++) ov[(A & 3) * 4 + (C & 3)] / 16 < y || v.clearRect(C, A, 1, 1);
            return this.wornCorpses.set(p, u), u;
        }
    },
    p1 = (c, d, g, i) => isTileSolid(c, d, g) ? !(i && TT[z(c, d, g)].swim) : false,
    f0 = (c, d, g, i = 1) => {
        const wA = cX;
        let j = TT[z(c, d, g)];
        return j.swim ? f.swim.cost * i : j.wade && i > 1 ? f.swim.wadeCost * i : 1;
    };

function segmentWades(c, d, g) {
    const wB = cX;
    let j = g.x - d.x,
        m = g.y - d.y,
        p = Math.hypot(j, m),
        q = Math.max(1, Math.ceil(p / (c.tile * 0.5)));
    for (let u = 0; u <= q; u++) {
        let v = u / q,
            y = Math.floor((d.x + j * v) / c.tile),
            A = Math.floor((d.y + m * v) / c.tile);
        if (TT[z(c, y, A)].wade) return true;
    }
    return false;
}
var NEIGHBOR_STEPS = [
        [1, 0, 1],
        [-1, 0, 1],
        [0, 1, 1],
        [0, -1, 1],
        [1, 1, Math.SQRT2],
        [1, -1, Math.SQRT2],
        [-1, 1, Math.SQRT2],
        [-1, -1, Math.SQRT2]
    ],
    vi = class {
        ["items"] = [];
        ["costs"] = [];
        getsize() {
            const wC = cX;
            return this.items.length;
        } push(c, d) {
            const wD = cX;
            this.items.push(c), this.costs.push(d);
            let g = this.items.length - 1;
            for (; g > 0;) {
                let i = g - 1 >> 1;
                if (this.costs[i] <= this.costs[g]) break;
                this.swap(g, i), g = i;
            }
        } pop() {
            const wE = cX;
            let c = this.items[0],
                d = this.items.pop(),
                g = this.costs.pop();
            if (this.items.length > 0) {
                this.items[0] = d, this.costs[0] = g;
                let j = 0;
                for (;;) {
                    let l = j * 2 + 1,
                        m = l + 1,
                        p = j;
                    if (l < this.items.length && this.costs[l] < this.costs[p] && (p = l), m < this.items.length && this.costs[m] < this.costs[p] && (p = m), p === j) break;
                    this.swap(j, p), j = p;
                }
            }
            return c;
        } swap(c, d) {
            const wF = cX;
            let g = this.items[c];
            this.items[c] = this.items[d], this.items[d] = g;
            let i = this.costs[c];
            this.costs[c] = this.costs[d], this.costs[d] = i;
        }
    };

function yW(j, q, A = false, C = 1) {
    const wG = cX;
    let {
        width: F,
        height: H
    } = j, I = new Float64Array(F * H).fill(1 / 0), K = new Int32Array(F * H).fill(-1), L = Math.min(F - 1, Math.max(0, Math.floor(q.x / j.tile))), N = Math.min(H - 1, Math.max(0, Math.floor(q.y / j.tile))) * F + L, P = new vi();
    for (I[N] = 0, P.push(N, 0); P.size > 0;) {
        let Q = P.pop(),
            R = Q % F,
            S = (Q - R) / F,
            U = I[Q];
        for (let [V, X, Y] of NEIGHBOR_STEPS) {
            let a7 = R + V,
                a8 = S + X;
            if (a7 < 0 || a8 < 0 || a7 >= F || a8 >= H || p1(j, a7, a8, A) || V !== 0 && X !== 0 && (p1(j, R + V, S, A) || p1(j, R, S + X, A))) continue;
            let a9 = a8 * F + a7,
                aj = U + Y * f0(j, a7, a8, C);
            aj < I[a9] - 1e-9 && (I[a9] = aj, K[a9] = Q, P.push(a9, aj));
        }
    }
    return {
        goal: {
            x: q.x,
            y: q.y
        },
        swims: A,
        dry: C > 1,
        swimCost: C,
        dist: I,
        next: K,
        width: F,
        height: H
    };
}
var posToTileIndex = (c, d) => {
    const wH = cX;
    let g = Math.floor(d.x / c.tile),
        i = Math.floor(d.y / c.tile);
    return g < 0 || i < 0 || g >= c.width || i >= c.height ? -1 : i * c.width + g;
};

function f1(d, g, j, m) {
    const wI = cX;
    let p = y => DW(g, j, y, m, d.swims) && !(d.dry && segmentWades(g, j, y));
    if (p(d.goal)) return d.goal;
    let q = posToTileIndex(g, j);
    if (q < 0 || !Number.isFinite(d.dist[q])) return null;
    let u = d.next[q],
        v = null;
    for (let y = 0; y < 4 && u >= 0; y++) {
        let A = u % d.width,
            C = (u - A) / d.width,
            E = {
                x: (A + 0.5) * g.tile,
                y: (C + 0.5) * g.tile
            };
        (y === 0 || p(E)) && (v = E), u = d.next[u];
    }
    return v;
}

function DW(c, d, g, j, m = false) {
    const wJ = cX;
    let p = g.x - d.x,
        q = g.y - d.y,
        u = Math.hypot(p, q);
    if (u < 0.0001) return !fT(c, d.x, d.y, j, m);
    let v = Math.ceil(u / (c.tile * 0.5));
    for (let y = 0; y <= v; y++) {
        let A = y / v;
        if (fT(c, d.x + p * A, d.y + q * A, j, m)) return false;
    }
    return true;
}

function fT(g, j, p, q, v = false) {
    const wK = cX;
    let y = Math.floor((j - q) / g.tile),
        A = Math.floor((j + q) / g.tile),
        C = Math.floor((p - q) / g.tile),
        E = Math.floor((p + q) / g.tile);
    for (let F = C; F <= E; F++)
        for (let H = y; H <= A; H++) {
            if (!p1(g, H, F, v)) continue;
            let I = Math.max(H * g.tile, Math.min(j, (H + 1) * g.tile)),
                K = Math.max(F * g.tile, Math.min(p, (F + 1) * g.tile)),
                L = j - I,
                M = p - K;
            if (L * L + M * M < q * q) return true;
        }
    return false;
}

function findPath(q, F, H, K = 3000, L = false, N = 1) {
    const wL = cX;
    let {
        width: P,
        height: Q
    } = q, U = posToTileIndex(q, F), V = posToTileIndex(q, H);
    if (U < 0 || V < 0) return [];
    let X = V % P,
        Y = (V - X) / P,
        a7 = new Float64Array(P * Q).fill(1 / 0),
        a8 = new Int32Array(P * Q).fill(-1),
        a9 = new Uint8Array(P * Q),
        aj = new vi(),
        ak = ax => {
            const wM = wL;
            let az = ax % P,
                aA = (ax - az) / P,
                aB = Math.abs(az - X),
                aC = Math.abs(aA - Y);
            return aB + aC + (Math.SQRT2 - 2) * Math.min(aB, aC);
        };
    a7[U] = 0, aj.push(U, ak(U));
    let aq = 0;
    for (; aj.size > 0 && aq++ < K;) {
        let ax = aj.pop();
        if (ax === V) break;
        if (a9[ax]) continue;
        a9[ax] = 1;
        let az = ax % P,
            aA = (ax - az) / P;
        for (let [aB, aC, aD] of NEIGHBOR_STEPS) {
            let aE = az + aB,
                aF = aA + aC;
            if (aE < 0 || aF < 0 || aE >= P || aF >= Q || p1(q, aE, aF, L) || aB !== 0 && aC !== 0 && (p1(q, az + aB, aA, L) || p1(q, az, aA + aC, L))) continue;
            let aG = aF * P + aE,
                aH = a7[ax] + aD * f0(q, aE, aF, N);
            aH < a7[aG] - 1e-9 && (a7[aG] = aH, a8[aG] = ax, aj.push(aG, aH + ak(aG)));
        }
    }
    if (!Number.isFinite(a7[V])) return [];
    let aw = [];
    for (let aI = V; aI !== -1 && aI !== U; aI = a8[aI]) {
        let aJ = aI % P,
            aK = (aI - aJ) / P;
        aw.push({
            x: (aJ + 0.5) * q.tile,
            y: (aK + 0.5) * q.tile
        });
    }
    return aw.reverse();
}
var fogRecomputeInterval = 0.08,
    ze = class {
        ["visible"];
        ["explored"];
        ["radius"];
        ["version"] = 0;
        ["timer"] = 0;
        ["width"];
        ["height"];
        ["tile"];
        constructor(c, d) {
            const wN = cX;
            this.width = c.width, this.height = c.height, this.tile = c.tile, this.radius = d, this.visible = new Uint8Array(c.width * c.height), this.explored = new Uint8Array(c.width * c.height), d <= 0 && (this.visible.fill(1), this.explored.fill(1));
        }
        getenabled() {
            const wO = cX;
            return this.radius > 0;
        } isVisible(c, d) {
            const wP = cX;
            if (!this.enabled) return true;
            let g = Math.floor(c / this.tile),
                i = Math.floor(d / this.tile);
            return g < 0 || i < 0 || g >= this.width || i >= this.height ? false : this.visible[i * this.width + g] === 1;
        } step(c, d, g, i) {
            const wQ = cX;
            this.enabled && (this.timer -= g, !(this.timer > 0) && (this.timer = fogRecomputeInterval, this.recompute(c, d, i)));
        } refresh(c, d, g) {
            const wR = cX;
            this.enabled && (this.timer = fogRecomputeInterval, this.recompute(c, d, g));
        } recompute(g, j, q) {
            const wS = cX;
            this.version++, this.visible.fill(0);
            let v = Math.ceil(this.radius / this.tile),
                y = this.radius * this.radius;
            for (let C of j) {
                if (!C.alive || q !== void 0 && C.faction !== q) continue;
                let E = Math.floor(C.pos.x / this.tile),
                    F = Math.floor(C.pos.y / this.tile);
                for (let H = F - v; H <= F + v; H++)
                    if (!(H < 0 || H >= this.height))
                        for (let I = E - v; I <= E + v; I++) {
                            if (I < 0 || I >= this.width) continue;
                            let K = H * this.width + I;
                            if (this.visible[K]) continue;
                            let L = (I + 0.5) * this.tile,
                                M = (H + 0.5) * this.tile,
                                N = L - C.pos.x,
                                P = M - C.pos.y;
                            N * N + P * P > y || kW(g, C.pos, {
                                x: L,
                                y: M
                            }) && (this.visible[K] = 1, this.explored[K] = 1);
                        }
            }
            let A = [];
            for (let Q = 0; Q < this.height; Q++)
                for (let R = 0; R < this.width; R++) {
                    let S = Q * this.width + R;
                    if (this.visible[S] || !TT[z(g, R, Q)].blocksSight) continue;
                    (R > 0 && this.visible[S - 1] === 1 || R < this.width - 1 && this.visible[S + 1] === 1 || Q > 0 && this.visible[S - this.width] === 1 || Q < this.height - 1 && this.visible[S + this.width] === 1) && A.push(S);
                }
            for (let U of A) this.visible[U] = 1, this.explored[U] = 1;
        }
    },
    rv = 3;

function smokeRadius(c) {
    const wU = cX;
    let {
        growUntil: d,
        disperseFrom: g,
        disperseTo: i
    } = f.smoke.shape, j = 1 - c.life / c.maxLife;
    if (j <= 0) return 0;
    if (j < d) return c.radius * (j / d);
    if (j <= g) return c.radius;
    let l = (j - g) / (1 - g);
    return c.radius * (1 - (1 - i) * Math.min(1, l));
}

function smokeConcealment(c, d, g) {
    const wV = cX;
    if (!c || c.length === 0) return 1;
    let j = 1;
    for (let l of c) {
        let m = smokeRadius(l);
        if (m <= 0) continue;
        let p = Math.hypot(d - l.pos.x, g - l.pos.y);
        if (p >= m) continue;
        let q = Math.min(1, (1 - p / m) / f.smoke.rimFade);
        j = Math.min(j, 1 - (1 - f.smoke.concealment) * q);
    }
    return j;
}

function sightDistance(c, d, g, i) {
    const wX = cX;
    return (i && smokeConcealment(i, d, g) < 1 ? f.smoke.sightFloor : rv) * c.tile;
}

function y0(c, d, g, i) {
    const wY = cX;
    return Math.min(TT[getTileDefAt(c, d, g)].concealment, smokeConcealment(i, d, g));
}

function v0(c, d, g, j, l) {
    const wZ = cX;
    let m = y0(d, g.x, g.y, l);
    if (m >= 1) return c;
    let p = 1 - (1 - m) * Math.max(0, Math.min(1, j));
    return Math.max(sightDistance(d, g.x, g.y, l), c * p);
}

function hasLineOfSight(c, d, g, j, l, m) {
    const x5 = cX;
    let p = g.x - d.x,
        q = g.y - d.y,
        u = v0(j, c, g, l, m);
    return smokeConcealment(m, d.x, d.y) < 1 && (u = Math.min(u, sightDistance(c, d.x, d.y, m))), p * p + q * q > u * u ? false : kW(c, d, g);
}

function n2(d, g, i, j, m, p) {
    const x7 = cX;
    if (TT[getTileDefAt(d, i.x, i.y)].swim || y0(d, i.x, i.y, p) >= 1) return false;
    let q = v0(j, d, i, m, p),
        u = q * q;
    for (let v of g) {
        if (!v.alive) continue;
        let y = i.x - v.pos.x,
            A = i.y - v.pos.y;
        if (y * y + A * A <= u) return false;
    }
    return true;
}

function wi(c, d, g) {
    const x9 = cX;
    if (d.faction !== j1) return true;
    let i = c.map.critterNotice;
    return i === null ? false : g <= i;
}
var hashCell = (c, d) => c * 73856093 ^ d * 19349663,
    Si = class {
        ["cell"];
        ["buckets"] = new Map();
        constructor(c = 24) {
            const xj = cX;
            this.cell = c;
        } rebuild(c) {
            const xk = cX;
            this.buckets.clear();
            for (let d of c) {
                if (!d.alive) continue;
                let g = hashCell(Math.floor(d.pos.x / this.cell), Math.floor(d.pos.y / this.cell)),
                    i = this.buckets.get(g);
                i ? i.push(d) : this.buckets.set(g, [d]);
            }
        } query(g, j, m, p) {
            const xq = cX;
            p.length = 0;
            let q = Math.floor((g - m) / this.cell),
                u = Math.floor((g + m) / this.cell),
                v = Math.floor((j - m) / this.cell),
                y = Math.floor((j + m) / this.cell);
            for (let A = v; A <= y; A++)
                for (let C = q; C <= u; C++) {
                    let E = this.buckets.get(hashCell(C, A));
                    if (E) {
                        for (let F of E) p.push(F);
                    }
                }
            return p;
        }
    },
    sv = [];

function Ei(K, L, Q, U, Y, a7, a8) {
    const xw = cX;
    let a9 = 0,
        aj = 0;
    if (L) {
        a9 = L.x - K.pos.x, aj = L.y - K.pos.y;
        let aM = Math.hypot(a9, aj);
        if (aM > 0.001) {
            let aN = Math.min(1, aM / 6) / aM;
            a9 *= aN, aj *= aN;
        } else a9 = 0, aj = 0;
    }
    let ak = Q.query(K.pos.x, K.pos.y, Y.separationRadius, sv),
        aq = 0,
        aw = 0;
    for (let aO of ak) {
        if (aO === K || !aO.alive) continue;
        let aP = K.pos.x - aO.pos.x,
            aQ = K.pos.y - aO.pos.y,
            aR = aP * aP + aQ * aQ;
        if (aR >= Y.separationRadius * Y.separationRadius || aR < 0.000001) continue;
        let aS = Math.sqrt(aR),
            aU = (1 - aS / Y.separationRadius) / aS;
        aq += aP * aU, aw += aQ * aU;
    }
    let ax = 0,
        az = 0,
        aA = Y.smokeCost ?? 0;
    if (aA > 0 && a8 && (a9 !== 0 || aj !== 0)) {
        let aV = Math.hypot(a9, aj) || 1,
            aX = a9 / aV,
            aY = aj / aV;
        for (let aZ of a8) {
            let b4 = smokeRadius(aZ);
            if (b4 <= 0) continue;
            let b7 = aZ.pos.x - K.pos.x,
                b8 = aZ.pos.y - K.pos.y;
            if (Math.hypot(b7, b8) < b4) {
                let bx = Math.hypot(b7, b8);
                if (bx < 0.001) {
                    ax += aX, az += aY;
                    continue;
                }
                ax += -b7 / bx, az += -b8 / bx;
                continue;
            }
            let b9 = b7 * aX + b8 * aY;
            if (b9 <= 0 || b9 > b4 * 4) continue;
            let bj = b7 * -aY + b8 * aX,
                bk = Math.abs(bj);
            if (bk >= b4) continue;
            let bq = bj >= 0 ? -1 : 1,
                bw = (1 - (bk / b4) ** 3) * (1 - b9 / (b4 * 4));
            ax += -aY * bq * bw, az += aX * bq * bw;
        }
    }
    let aB = Math.hypot(ax, az);
    aB > 1 && (ax /= aB, az /= aB);
    let aC = Math.min(aA, 0.9),
        aD = a9 + aq * Y.separation + ax * aC,
        aE = aj + aw * Y.separation + az * aC,
        aF = Math.hypot(aD, aE);
    aF > 1 && (aD /= aF, aE /= aF);
    let aG = Ee(U, K.pos.x, K.pos.y);
    K.wading = aG.wade, K.swimming = aG.swim, K.sliding = aG.slippery;
    let aH = Y.speed * aG.speed,
        aI = aD * aH,
        aJ = aE * aH,
        aK = aG.slippery ? Y.accel * Y.iceAccel : Y.accel,
        aL = Math.min(1, aK * a7 / Math.max(1, aH));
    K.vel.x += (aI - K.vel.x) * aL, K.vel.y += (aJ - K.vel.y) * aL;
}

function h1(c, d, g) {
    const xx = cX;
    let j = c.vel.x * g,
        l = c.vel.y * g,
        m = c.canSwim || fT(d, c.pos.x, c.pos.y, c.radius, false) && !fT(d, c.pos.x, c.pos.y, c.radius, true);
    if (j !== 0) {
        let q = c.pos.x + j;
        fT(d, q, c.pos.y, c.radius, m) ? c.vel.x = 0 : c.pos.x = q;
    }
    if (l !== 0) {
        let s = c.pos.y + l;
        fT(d, c.pos.x, s, c.radius, m) ? c.vel.y = 0 : c.pos.y = s;
    }
    let p = Math.hypot(c.pos.x - c.prev.x, c.pos.y - c.prev.y);
    c.walkPhase += p;
}

function x0(j, q, y, A = 2) {
    const xz = cX;
    let C = [];
    for (let E = 0; E < A; E++)
        for (let F of j)
            if (F.alive) {
                q.query(F.pos.x, F.pos.y, F.radius * 2 + 2, C);
                for (let H of C) {
                    if (H === F || !H.alive || H.id <= F.id) continue;
                    let I = H.pos.x - F.pos.x,
                        K = H.pos.y - F.pos.y,
                        L = F.radius + H.radius,
                        M = I * I + K * K;
                    if (M >= L * L) continue;
                    let N, P;
                    if (M < 0.000001) N = F.id % 2 === 0 ? 1 : 0, P = F.id % 2 === 0 ? 0 : 1, M = 0;
                    else {
                        let V = Math.sqrt(M);
                        N = I / V, P = K / V;
                    }
                    let Q = L - Math.sqrt(M),
                        R = Q * 0.5,
                        S = !fT(y, F.pos.x - N * R, F.pos.y - P * R, F.radius, F.canSwim),
                        U = !fT(y, H.pos.x + N * R, H.pos.y + P * R, H.radius, H.canSwim);
                    S && U ? (F.pos.x -= N * R, F.pos.y -= P * R, H.pos.x += N * R, H.pos.y += P * R) : U ? fT(y, H.pos.x + N * Q, H.pos.y + P * Q, H.radius, H.canSwim) ? (H.pos.x += N * R, H.pos.y += P * R) : (H.pos.x += N * Q, H.pos.y += P * Q) : S && (fT(y, F.pos.x - N * Q, F.pos.y - P * Q, F.radius, F.canSwim) ? (F.pos.x -= N * R, F.pos.y -= P * R) : (F.pos.x -= N * Q, F.pos.y -= P * Q));
                }
            }
}

function Mi(c, d, g) {
    const xA = cX;
    if (c.stagger <= 0) return false;
    c.stagger -= g;
    let i = Math.exp(-g * f.blast.drag);
    return c.vel.x *= i, c.vel.y *= i, h1(c, d, g), g1(c, d), Math.hypot(c.vel.x, c.vel.y) > 2 && (c.angle = Math.atan2(c.vel.y, c.vel.x)), true;
}

function g1(c, d) {
    const xB = cX;
    if (!fT(d, c.pos.x, c.pos.y, c.radius, c.canSwim)) return;
    for (let j = 1; j <= 6; j++)
        for (let l = 0; l < 8; l++) {
            let m = l / 8 * Math.PI * 2,
                p = c.pos.x + Math.cos(m) * j,
                q = c.pos.y + Math.sin(m) * j;
            if (!fT(d, p, q, c.radius, c.canSwim)) {
                c.pos.x = p, c.pos.y = q, c.vel.x = 0, c.vel.y = 0;
                return;
            }
        }
    let g = findOpenPosition(d, c.pos);
    (g.x !== c.pos.x || g.y !== c.pos.y) && (c.pos.x = g.x, c.pos.y = g.y, c.vel.x = 0, c.vel.y = 0);
}

function ut(c, d) {
    const xC = cX;
    if (!d.swimming) return null;
    let g = Math.hypot(d.vel.x, d.vel.y);
    if (g > 1) {
        let j = d.vel.x / g,
            l = d.vel.y / g;
        for (let m = 1; m <= 12; m++) {
            let p = d.pos.x + j * m * c.tile,
                q = d.pos.y + l * m * c.tile;
            if (!fT(c, p, q, d.radius)) return {
                x: p,
                y: q
            };
        }
    }
    return findOpenPosition(c, d.pos);
}

function Ci(c, d, g) {
    const xD = cX;
    let j = [{
            x: c.x,
            y: c.y
        }],
        l = 1;
    for (; j.length < d;) {
        let m = Math.max(4, Math.round(Math.PI * 2 * l / 1.15));
        for (let p = 0; p < m && j.length < d; p++) {
            let q = p / m * Math.PI * 2 + l * 0.6;
            j.push({
                x: c.x + Math.cos(q) * l * g,
                y: c.y + Math.sin(q) * l * g
            });
        }
        l++;
    }
    return j;
}

function k0(c, d) {
    const xE = cX;
    let g = new Map(),
        j = new Set();
    for (let l of c) {
        let m = -1,
            p = 1 / 0;
        for (let q = 0; q < d.length; q++) {
            if (j.has(q)) continue;
            let u = (d[q].x - l.pos.x) ** 2 + (d[q].y - l.pos.y) ** 2;
            u < p && (p = u, m = q);
        }
        m >= 0 && (j.add(m), g.set(l, d[m]));
    }
    return g;
}
var w0 = {
    speed: f.soldier.speed,
    accel: f.soldier.accel,
    separation: f.soldier.separation,
    separationRadius: f.soldier.separationRadius,
    iceAccel: f.soldier.iceAccel
};

function S0(c) {
    const xF = cX;
    let d = c.baseLevers,
        g = f.camping,
        i = Math.min(1, c.pressure / g.cap);
    c.levers.spawnInterval = d.spawnInterval * (1 - i * g.spawnBoost), c.levers.hearing = d.hearing * (1 + i * g.hearingBoost);
}

function E0(c, d) {
    const xG = cX;
    let g = hT(c);
    if (!g) return;
    if (!c.campAnchor) {
        c.campAnchor = {
            ...g
        }, c.stillFor = 0;
        return;
    }
    let i = f.camping,
        j = 0;
    for (let l of c.soldiers) l.alive && (j = Math.max(j, Math.hypot(l.vel.x, l.vel.y)));
    j > i.movingSpeed ? (c.campAnchor = {
        ...g
    }, c.stillFor = 0) : c.stillFor += d, c.stillFor < i.settle && (c.pressure = Math.max(0, c.pressure - i.relief * d));
}

function tickCampingPressure(c) {
    const xH = cX;
    c.stillFor < f.camping.settle || (c.pressure = Math.min(f.camping.cap, c.pressure + 1));
}
var shouldHunt = (c, d) => d.traits.hunter || c.pressure >= f.camping.huntFrom,
    mT = (c, d) => hash01(c + 1, d);

function FW(c, d, g, j) {
    const xI = cX;
    if (j <= 0) return {
        x: d.x,
        y: d.y
    };
    let l = Math.imul(g + 1, 2654435761) >>> 0,
        m = (l & 65535) / 65536 * Math.PI * 2,
        p = j * Math.sqrt((l >>> 16 & 65535) / 65536);
    return findOpenPosition(c.map, {
        x: d.x + Math.cos(m) * p,
        y: d.y + Math.sin(m) * p
    });
}
var be = c => !c.map.arena && !c.map.skirmish && c.map.doctrine !== "horde";

function alertFactor(c) {
    const xJ = cX;
    return c.alert <= 0 ? 0 : Math.min(1, c.alert / f.enemy.alert.fade);
}

function re(c, d) {
    const xK = cX;
    if (!be(c)) return false;
    let g = f.enemy.alert,
        i = d.alert <= 0;
    return d.alert = Math.max(d.alert, g.duration), i && (d.exclaim = g.exclaim), i;
}

function decayAlert(c, d) {
    const xL = cX;
    c.alert > 0 && (c.alert = Math.max(0, c.alert - d)), c.exclaim > 0 && (c.exclaim = Math.max(0, c.exclaim - d));
}
var alertSightMult = c => 1 + f.enemy.alert.sight * alertFactor(c),
    j0 = c => 1 + f.enemy.alert.hearing * alertFactor(c),
    I0 = c => 1 - (1 - f.enemy.alert.reaction) * alertFactor(c),
    P0 = Math.PI / 180,
    i2 = (c, d) => {
        const xM = cX;
        let g = c.map,
            i = Math.floor(d.x / g.tile),
            j = Math.floor(d.y / g.tile);
        return i < 0 || j < 0 || i >= g.width || j >= g.height ? -1 : j * g.width + i;
    },
    av = (c, d) => {
        let g = (c - d) % (Math.PI * 2);
        return g > Math.PI && (g -= Math.PI * 2), g <= -Math.PI && (g += Math.PI * 2), g;
    };

function getFlankField(c, d, g) {
    const xN = cX;
    let j = c.map,
        l = Math.floor(d.x / j.tile) + ',' + Math.floor(d.y / j.tile) + ',' + (g.canSwim ? 1 : 0),
        m = c.flankField;
    if (m && m.key === l && c.stepIndex - m.step < f.enemy.flanking.fieldSteps) return m.field;
    c.fieldBuilds++;
    let p = yW(j, d, g.canSwim);
    return c.flankField = {
        key: l,
        step: c.stepIndex,
        field: p
    }, p;
}

function flowDirectionToGoal(c, d, g, j) {
    const xO = cX;
    let l = c.map,
        m = d.goal,
        p = i2(c, g);
    for (let q = 0; p >= 0 && q < l.width * l.height; q++) {
        let u = (p % l.width + 0.5) * l.tile,
            v = (Math.floor(p / l.width) + 0.5) * l.tile;
        if (Math.hypot(u - m.x, v - m.y) <= j) return Math.atan2(v - m.y, u - m.x);
        p = d.next[p];
    }
    return null;
}

function computeFlankMove(q, F, H, K, L = 0) {
    const xP = cX;
    let N = f.enemy.flanking,
        P = N[K],
        Q = q.map,
        U = getFlankField(q, H, F),
        V = i2(q, F.pos);
    if (V < 0) return null;
    let X = U.dist[V] * Q.tile;
    if (!Number.isFinite(X) || X < N.minDistance) return null;
    let Y = flowDirectionToGoal(q, U, F.pos, P.ring);
    if (Y === null) return null;
    let a7 = Math.min(X * P.ratio, X + P.extra),
        a8 = null,
        a9 = 0;
    for (let aj of P.bearings) {
        let ak = aj >= 180 ? [1] : L ? [L] : [1, -1];
        for (let aq of ak) {
            if (a9 >= P.tries) break;
            let aw = Y + aq * aj * P0,
                ax = {
                    x: H.x + Math.cos(aw) * P.ring,
                    y: H.y + Math.sin(aw) * P.ring
                },
                az = findOpenPosition(Q, ax);
            if (Math.hypot(az.x - ax.x, az.y - ax.y) > Q.tile || Math.abs(av(Math.atan2(az.y - H.y, az.x - H.x), Y)) < P.minTurn * P0) continue;
            let aA = i2(q, az);
            if (aA < 0) continue;
            let aB = U.dist[aA] * Q.tile;
            if (!Number.isFinite(aB) || Math.hypot(az.x - F.pos.x, az.y - F.pos.y) + aB > a7) continue;
            a9++, q.pathSearches++;
            let aC = findPath(Q, F.pos, az, 3000, F.canSwim, F.traits.swimCost);
            if (aC.length === 0) continue;
            let aD = 0,
                aE = 1 / 0,
                aF = F.pos;
            for (let aH of aC) aD += Math.hypot(aH.x - aF.x, aH.y - aF.y), aE = Math.min(aE, Math.hypot(aH.x - H.x, aH.y - H.y)), aF = aH;
            let aG = aD + aB;
            aG > a7 || aE < P.ring * N.keepOut || (!a8 || aG < a8.total) && (a8 = {
                via: az,
                side: aq,
                total: aG
            });
        }
    }
    return a8 && {
        via: a8.via,
        side: a8.side
    };
}

function assignFlanks(g, j, q) {
    const xQ = cX;
    if (!be(g) || j.length < 2) return;
    let v = f.enemy.flanking,
        y = g.levers.flank,
        A = g.flankCooldown > 0 ? 0 : v.widePerFlank * y,
        C = g.driftCooldown > 0 ? 0 : v.driftBase + v.driftPerFlank * y;
    if (A + C <= 0) return;
    let E = false,
        F = 0,
        H = false;
    for (let I = 1; I < j.length; I++) {
        let K = j[I];
        if (K.kind !== 0 || K.traits.coward || K.flank) continue;
        let L = mT(K.id, g.stepIndex),
            M = !E && L < A ? "wide" : L < A + C ? "drift" : null;
        if (!M) continue;
        let N = F ? -F : 0,
            P = computeFlankMove(g, K, q, M, N);
        !P && M === "wide" && (M = "drift", P = computeFlankMove(g, K, q, M, N)), P && (K.flank = {
            via: P.via,
            style: M,
            time: 0,
            hp: K.hp
        }, K.path.length = 0, F = P.side, H = true, g.flanksTaken[M]++, M === "wide" && (E = true, g.flankCooldown = v.wideCooldown));
    }
    H && (g.driftCooldown = v.driftCooldown);
}

function shouldBreakFlank(c, d) {
    const xR = cX;
    let g = c.flank;
    if (!g) return null;
    let i = f.enemy.flanking;
    g.time += d;
    let j = c.target !== null && c.target.alive && Math.hypot(c.target.pos.x - c.pos.x, c.target.pos.y - c.pos.y) < i.breakOff;
    return c.hp < g.hp || j || g.time > i.maxTime || c.state !== 4 && c.state !== 3 && c.state !== 2 || Math.hypot(g.via.x - c.pos.x, g.via.y - c.pos.y) < i.arrived ? (c.flank = null, c.path.length = 0, null) : c.state === 2 ? null : g.via;
}

function UT(j, q, y, A = null, C = 0) {
    const xS = cX;
    if (y <= 0) return;
    let E = y * y,
        F = y * f.enemy.noticeSpread,
        H = F * F,
        I = [];
    for (let P of j.enemies) {
        if (!P.alive || P === A || P.state === 3 || P.state === 2) continue;
        let Q = P.pos.x - q.x,
            R = P.pos.y - q.y;
        if (C > 0 && be(j) && Q * Q + R * R <= C * C) {
            re(j, P), glanceAt(P, q);
            continue;
        }
        let S = P.traits.hearing,
            U = (Q * Q + R * R) / (S * S),
            V = S * j0(P);
        if (!((Q * Q + R * R) / (V * V) > H)) {
            if (U > E) {
                glanceAt(P, q);
                continue;
            }
            I.push({
                e: P,
                d2: U
            });
        }
    }
    if (I.length === 0) return;
    I.sort((X, Y) => X.d2 - Y.d2);
    let K = f.enemy.alarmNearRadius * f.enemy.alarmNearRadius,
        L = I[0].d2 <= K ? f.enemy.alarmCapNear : f.enemy.alarmCap,
        M = [];
    for (let {
            e: X
        }
        of I) {
        if (M.length >= L) {
            glanceAt(X, q);
            continue;
        }
        M.push(X);
    }
    if (M.length === 0) return;
    let N = M.length > 1 ? f.enemy.searchSpread * Math.sqrt(M.length) : 0;
    for (let Y of M) re(j, Y), Y.state = 4, Y.investigate = FW(j, q, Y.id, N), Y.glance = null, Y.searchTime = 0, Y.memory = f.enemy.alertMemory, Y.path.length = 0;
    assignFlanks(j, M, q);
}

function emitShout(c, d, g) {
    const xU = cX;
    let i = f.enemy.shoutRadius;
    for (let j of c.shouts)
        if (Math.hypot(j.x - d.x, j.y - d.y) <= i) return;
    c.shouts.push({
        x: d.x,
        y: d.y,
        t: f.enemy.shoutCooldown
    }), UT(c, d, g);
}

function Ai(c, d, g) {
    const xV = cX;
    if (g <= 0) return;
    let j = g * g;
    for (let l of c.enemies) {
        if (!l.alive || l.state !== 0 && l.state !== 1) continue;
        let m = l.pos.x - d.x,
            p = l.pos.y - d.y,
            q = l.traits.hearing;
        (m * m + p * p) / (q * q) > j || glanceAt(l, d);
    }
}

function glanceAt(c, d) {
    const xW = cX;
    c.glance = {
        at: {
            x: d.x,
            y: d.y
        },
        time: f.enemy.glanceHold
    };
}

function tickBleeding(c, d, g) {
    const xX = cX;
    if (d.bleeding += g, d.bleeding >= f.enemy.bleedOut) {
        Ye(c, d, d.hp, null, null);
        return;
    }
    if (d.screamTimer -= g, d.screamTimer > 0) return;
    d.screamTimer = f.enemy.screamInterval * (0.8 + c.jitter(d.faction) * 0.4), d.cries++;
    let i = c.levers.hearing * f.enemy.woundAlarm;
    d.cries <= f.enemy.woundCries ? UT(c, d.pos, i, d) : Ai(c, d.pos, i), c.fx.blood(d.pos), c.screams.push({
        x: d.pos.x,
        y: d.pos.y
    });
}
var isIdleOrPatrol = c => c.state === 0 || c.state === 1;

function enterSearchState(c, d, g) {
    const xY = cX;
    d.state = 4, d.investigate = FW(c, g, d.id, f.enemy.searchSpread), d.glance = null, d.searchTime = 0, d.memory = f.enemy.alertMemory, d.path.length = 0;
}

function H0(c, d, g) {
    const xZ = cX;
    !re(c, d) && d.alert <= 0 || (glanceAt(d, g), !(!isIdleOrPatrol(d) || d.rooted || d.traits.coward) && enterSearchState(c, d, g));
}

function checkCorpseSighting(c, d) {
    const y7 = cX;
    if (c.bodies.length === 0 || !isIdleOrPatrol(d)) return;
    let g = f.enemy.alert,
        i = d.stats.aggroRadius * d.traits.vision * g.bodySight * g.sensitivity;
    if (!(i <= 0))
        for (let j = 0; j < c.bodies.length; j++) {
            let l = c.bodies[j];
            if (l.faction === d.faction && !(Math.hypot(l.x - d.pos.x, l.y - d.pos.y) > i) && hasLineOfSight(c.map, d.pos, l, i, c.levers.concealment, c.clouds)) {
                if (c.bodies.splice(j, 1), !re(c, d) && d.alert <= 0) return;
                glanceAt(d, l), d.rooted || enterSearchState(c, d, l);
                return;
            }
        }
}
var searchSpreadScale = 2,
    V0 = c => ({
        speed: c.stats.speed,
        accel: f.enemy.accel,
        separation: f.enemy.separation,
        separationRadius: f.enemy.separationRadius * c.traits.spacing,
        iceAccel: f.enemy.iceAccel,
        smokeCost: c.traits.smokeCost
    }),
    wn = c => c.lastSeen ?? c.target?.pos ?? null;

function shouldPursue(c, d) {
    const y8 = cX;
    return shouldHunt(c, d) ? true : !d.fought || !d.home ? d.fought : Math.hypot(d.home.x - d.pos.x, d.home.y - d.pos.y) <= f.enemy.pursuitLeash;
}

function senseStep(c, d, g) {
    const y9 = cX;
    c.senseCalls++, d.target && !d.target.alive && (d.target = null, d.lastSeen = null);
    let i = findVisibleEnemy(c, d);
    if (i) {
        c.lastKnown = {
            x: i.pos.x,
            y: i.pos.y
        }, c.lastKnownAge = 0, d.target || (d.state = 2, d.reaction = d.stats.reactionTime * I0(d), re(c, d), d.path.length = 0, emitShout(c, i.pos, c.levers.hearing)), d.target = i, d.lastSeen = {
            x: i.pos.x,
            y: i.pos.y
        }, d.memory = f.enemy.alertMemory;
        return;
    }
    if (!d.target) {
        checkCorpseSighting(c, d);
        return;
    }
    if (d.memory -= g, !(d.memory > 0)) {
        if (d.target = null, d.lastSeen = null, d.path.length = 0, shouldPursue(c, d) && c.lastKnown) d.state = 4, d.investigate = FW(c, c.lastKnown, d.id, f.enemy.searchSpread * searchSpreadScale), d.searchTime = 0;
        else {
            let j = d.state;
            d.state = d.patrols ? 1 : 0, j !== 0 && j !== 1 && (d.goal = null);
        }
    }
}

function findVisibleEnemy(c, d) {
    const ye = cX;
    let g = null,
        j = 1 / 0;
    for (let l of c.actors) {
        if (!l.alive || l.faction === d.faction) continue;
        let m = Math.hypot(l.pos.x - d.pos.x, l.pos.y - d.pos.y);
        if (m >= j || !wi(c, l, m)) continue;
        let p = d.stats.aggroRadius * d.traits.vision * alertSightMult(d);
        hasLineOfSight(c.map, d.pos, l.pos, p, c.levers.concealment, c.clouds) && (j = m, g = l);
    }
    return g;
}

function $0(c, d) {
    const yj = cX;
    let g = d.squad >= 0 ? c.squadFields[d.squad] : null;
    if (!g) return null;
    let i = g.goal;
    return Math.hypot(i.x - d.pos.x, i.y - d.pos.y) < f.movement.enemyArrived * 2 ? null : f1(g, c.map, d.pos, d.radius) ?? i;
}

function nextPathTarget(c, d, g) {
    const yk = cX;
    if (d.stuck < f.movement.enemyStuckTrigger) {
        if (d.path.length === 0) {
            if (!tryLookAhead(c, d, g)) return g;
            let i = searchHerdField(c, d, g);
            if (i) return i;
            if (d.path = computeEnemyPath(c, d, g), d.path.length === 0) return g;
        }
    } else {
        if (d.path.length === 0 && (d.path = computeEnemyPath(c, d, g), d.stuck = 0, d.path.length === 0)) return g;
    }
    for (; d.path.length > 0 && Math.hypot(d.path[0].x - d.pos.x, d.path[0].y - d.pos.y) < 7;) d.path.shift();
    return d.path.length === 0 || canTraverse(c, d, g) ? (d.path.length = 0, g) : d.path[0];
}

function computeEnemyPath(c, d, g) {
    const yq = cX;
    return c.pathSearches++, findPath(c.map, d.pos, g, 3000, d.canSwim, d.traits.swimCost).slice(0, 40);
}

function searchHerdField(c, d, g) {
    const yw = cX;
    if (!Sn(c)) return null;
    let j = c.lastKnown;
    if (!j) return null;
    let l = f.enemy.searchSpread * searchSpreadScale * 1.5;
    if (Math.hypot(g.x - j.x, g.y - j.y) > l) return null;
    let m = c.map,
        p = Math.floor(j.x / m.tile) + ',' + Math.floor(j.y / m.tile),
        q = c.herdField;
    (!q || q.age > f.enemy.herdFieldInterval) && (q = {
        key: p,
        age: 0,
        fields: new Map()
    }, c.herdField = q);
    let u = d.canSwim ? d.traits.swimCost > 1 ? "minds" : "swims" : "walks",
        v = q.fields.get(u);
    return v || (c.fieldBuilds++, v = yW(m, j, d.canSwim, u === "minds" ? f.enemy.swimCostBase : 1), q.fields.set(u, v)), f1(v, m, d.pos, d.radius);
}

function canTraverse(c, d, g) {
    const yx = cX;
    return DW(c.map, d.pos, g, d.radius, d.canSwim) ? d.traits.swimCost <= 1 ? true : !segmentWades(c.map, d.pos, g) : false;
}

function tryLookAhead(c, d, g) {
    const yz = cX;
    let j = d.traits.foresight;
    if (j <= 0 || d.lookAhead > 0) return false;
    d.lookAhead = f.enemy.lookAheadInterval;
    let l = g.x - d.pos.x,
        m = g.y - d.pos.y,
        p = Math.hypot(l, m),
        q = p > j ? j / p : 1,
        u = {
            x: d.pos.x + l * q,
            y: d.pos.y + m * q
        };
    return DW(c.map, d.pos, u, d.radius, d.canSwim) ? d.traits.swimCost <= 1 ? false : segmentWades(c.map, d.pos, u) : true;
}
var lowWallCache = new WeakMap();

function fv(c) {
    const yA = cX;
    let d = lowWallCache.get(c);
    if (!d) {
        d = [];
        for (let g = 0; g < c.grid.length; g++) TT[c.grid[g]].lowWall && d.push(g);
        lowWallCache.set(c, d);
    }
    return d;
}
var hasCoverAdvantage = (c, d, g) => !PW(c, g, d) && PW(c, d, g),
    hv = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ],
    gv = (c, d, g) => c.enemies.some(i => i !== d && i.alive && i.state === 3 && i.coverSpot !== null && i.coverSpot.x === g.x && i.coverSpot.y === g.y);

function findCoverSpot(g, j, q) {
    const yB = cX;
    let {
        map: v
    } = g, y = v.tile, A = null, C = 1 / 0;
    for (let E of fv(v)) {
        if (!TT[v.grid[E]].lowWall) continue;
        let F = E % v.width,
            H = Math.floor(E / v.width),
            I = {
                x: (F + 0.5) * y,
                y: (H + 0.5) * y
            };
        if (!(Math.hypot(I.x - j.pos.x, I.y - j.pos.y) > f.cover.seekRadius) && kW(v, j.pos, I))
            for (let [K, L] of hv) {
                let M = F + K,
                    N = H + L;
                if (M < 0 || N < 0 || M >= v.width || N >= v.height || TT[v.grid[N * v.width + M]].solid || K * (q.x - I.x) + L * (q.y - I.y) >= 0) continue;
                let P = {
                    x: (M + 0.5) * y,
                    y: (N + 0.5) * y
                };
                if (!hasCoverAdvantage(v, P, q) || gv(g, j, P)) continue;
                let Q = Math.hypot(P.x - j.pos.x, P.y - j.pos.y);
                Q < C && (C = Q, A = P);
            }
    }
    return A;
}

function updateCoverSpot(c, d, g) {
    const yC = cX;
    if (!d.traits.cover || d.rooted || d.alert <= 0 || uW(d.weapon).melee === true) return d.coverSpot = null, null;
    if (d.coverSpot) {
        if (hasCoverAdvantage(c.map, d.coverSpot, g)) return d.coverSpot;
        d.coverSpot = null, d.coverLookAt = c.time + f.cover.relook;
    }
    return c.time < d.coverLookAt ? null : (d.coverLookAt = c.time + f.cover.relook, d.coverSpot = findCoverSpot(c, d, g), d.coverSpot);
}

function tryFire(d, g) {
    const yD = cX;
    let j = g.target;
    if (!j) return g.state = g.patrols ? 1 : 0, g.coverSpot = null, null;
    let m = wn(g) ?? j.pos,
        p = m.x - g.pos.x,
        q = m.y - g.pos.y,
        u = Math.hypot(p, q) || 1,
        v = uW(g.weapon).melee === true,
        y = v || PW(d.map, g.pos, m);
    if (y && u <= g.stats.fireRange && !g.wading && (g.angle = Math.atan2(q, p), g.fireCooldown <= 0)) {
        let E = g.traits.triggerHappy ? f.enemy.triggerHappy : null;
        g.fireCooldown = g.stats.fireInterval * (E ? E.rate : 1) * (0.8 + d.jitter(g.faction) * 0.4), y1(d, g, m, g.stats.spread * (E ? E.spread : 1)), g.fought = true;
    }
    pickGrenadeTarget(d, g, u);
    let A = updateCoverSpot(d, g, m);
    if (A) return Math.hypot(A.x - g.pos.x, A.y - g.pos.y) > f.cover.arrive ? A : null;
    if (g.rooted) return u < g.stats.preferredRange * 0.45 ? Z0(d, g, p, q, u, 20) : null;
    let C = g.traits.rusher ? f.enemy.rushRange : g.traits.coward ? Math.min(g.stats.fireRange * 0.9, g.stats.preferredRange * f.enemy.cowardRange) : g.stats.preferredRange;
    return !y || u > C * 1.15 ? flankOffset(g, m, p, q, u) : !g.traits.rusher && !v && u < C * 0.6 ? Z0(d, g, p, q, u, 24) : null;
}

function flankOffset(c, d, g, j, l) {
    const yE = cX;
    if (c.traits.flank <= 0) return d;
    let m = Math.min(1, l / 140),
        p = -j / l,
        q = g / l,
        u = c.traits.flank * c.traits.flankSide * m;
    return {
        x: d.x + p * u,
        y: d.y + q * u
    };
}

function Z0(c, d, g, j, l, m) {
    const yF = cX;
    let p = {
        x: d.pos.x - g / l * m,
        y: d.pos.y - j / l * m
    };
    return fT(c.map, p.x, p.y, d.radius) ? null : p;
}

function pickGrenadeTarget(d, g, j) {
    const yG = cX;
    if (!g.traits.grenadier || g.grenades <= 0 || g.grenadeCooldown > 0 || g.wading || j > f.enemy.grenadeRange || j < f.enemy.grenadeMinRange) return;
    let m = d.actors.filter(v => v.alive && v.faction !== g.faction),
        p = null,
        q = 0;
    for (let v of m) {
        let y = 0,
            A = 0,
            C = 0;
        for (let E of m) Math.hypot(E.pos.x - v.pos.x, E.pos.y - v.pos.y) > f.grenade.blastRadius || (y++, A += E.pos.x, C += E.pos.y);
        y > q && (q = y, p = {
            x: A / y,
            y: C / y
        });
    }
    let u = g.traits.grenadeKind === "frag" ? f.enemy.grenadeMinCluster : 1;
    !p || q < u || Math.hypot(p.x - g.pos.x, p.y - g.pos.y) > f.enemy.grenadeRange || (g.grenades--, g.grenadeCooldown = f.enemy.grenadeCooldown, Ri(d, g.pos, p, g.faction, g.traits.grenadeKind));
}

function tickFidget(c, d, g) {
    const yH = cX;
    let j = f.enemy.fidgetRange * c.levers.wander * d.traits.wander;
    if (d.home && Math.hypot(d.home.x - d.pos.x, d.home.y - d.pos.y) > j * 2) return d.home;
    if (d.goal) {
        if (Math.hypot(d.goal.x - d.pos.x, d.goal.y - d.pos.y) > 3 && d.stuck < f.movement.enemyStuckTrigger) return d.goal;
        d.goal = null, d.stuck = 0;
    }
    if (d.idleTimer -= g, d.idleTimer > 0) return null;
    let l = d.traits.rusher ? 0.55 : d.traits.hunter ? 0.75 : 1,
        [m, p] = f.enemy.fidgetPause;
    if (d.idleTimer = (m + c.jitter(d.faction) * (p - m)) * l, d.angle += (c.jitter(d.faction) * 2 - 1) * 1.2, !d.home || c.jitter(d.faction) < 0.45) return null;
    let q = j * (d.rooted ? f.enemy.rootedFidget : 1),
        u = c.jitter(d.faction) * Math.PI * 2,
        v = q * (0.4 + c.jitter(d.faction) * 0.6);
    return d.goal = {
        x: d.home.x + Math.cos(u) * v,
        y: d.home.y + Math.sin(u) * v
    }, d.goal;
}

function tickPatrol(c, d, g) {
    const yI = cX;
    if (d.pause > 0) return d.pause -= g, null;
    if (d.route) {
        let i = d.route[d.routeIndex];
        if (Math.hypot(i.x - d.pos.x, i.y - d.pos.y) < 6 || d.stuck > f.movement.enemyStuckTrigger) {
            d.stuck = 0, d.path.length = 0, (d.routeIndex + d.routeDir < 0 || d.routeIndex + d.routeDir >= d.route.length) && (d.routeDir *= -1), d.routeIndex += d.routeDir;
            let [j, l] = f.enemy.patrolPause;
            return d.pause = j + c.jitter(d.faction) * (l - j), null;
        }
        return i;
    }
    if (!d.goal || Math.hypot(d.goal.x - d.pos.x, d.goal.y - d.pos.y) < 5 || d.stuck > f.movement.enemyStuckTrigger) {
        d.goal = vv(c, d), d.stuck = 0, d.path.length = 0;
        let [m, p] = f.enemy.patrolPause;
        return d.pause = m + c.jitter(d.faction) * (p - m), null;
    }
    return d.goal;
}

function vv(c, d) {
    const yJ = cX;
    let g = d.home ?? d.pos;
    for (let j = 0; j < 12; j++) {
        let l = c.jitter(d.faction) * Math.PI * 2,
            m = Math.sqrt(c.jitter(d.faction)) * f.enemy.patrolRadius * d.traits.wander,
            p = {
                x: g.x + Math.cos(l) * m,
                y: g.y + Math.sin(l) * m
            };
        if (!fT(c.map, p.x, p.y, d.radius) && DW(c.map, d.pos, p, d.radius)) return p;
    }
    return {
        ...g
    };
}

function refreshTrailSearch(c, d, g) {
    const yK = cX;
    return shouldPursue(c, d) && c.lastKnown && c.lastKnownAge < f.enemy.trailMemory && (d.investigate = FW(c, c.lastKnown, d.id, f.enemy.searchSpread * searchSpreadScale)), d.investigate ? Math.hypot(d.investigate.x - d.pos.x, d.investigate.y - d.pos.y) > f.movement.enemyArrived ? d.investigate : (d.searchTime += g, d.angle += g * 2.2, d.searchTime > f.enemy.searchTime && (d.investigate = null, d.searchTime = 0, d.state = d.patrols ? 1 : 0, d.goal = null), null) : (d.state = d.patrols ? 1 : 0, null);
}

function protectBuilding(c, d) {
    const yL = cX;
    let g = c.buildings.find(q => q.role === "protect" && q.standing);
    if (!g) return null;
    let j = g.centre.x - d.pos.x,
        l = g.centre.y - d.pos.y,
        m = Math.hypot(j, l) || 1;
    if (m <= d.stats.fireRange && PW(c.map, d.pos, g.centre) && !d.wading) return d.angle = Math.atan2(l, j), d.fireCooldown <= 0 && (d.fireCooldown = d.stats.fireInterval * (0.8 + c.jitter(d.faction) * 0.4), y1(c, d, g.centre, d.stats.spread)), null;
    let p = d.stats.fireRange * (0.62 + mT(d.id, 3) * 0.26);
    return findOpenPosition(c.map, {
        x: g.centre.x - j / m * p,
        y: g.centre.y - l / m * p
    });
}

function surfaceAt(c, d, g) {
    const yM = cX;
    let i = z(c, Math.floor(d / c.tile), Math.floor(g / c.tile));
    return i === 19 || i === 9 || i === 32 ? "mud" : c.theme !== "arctic" ? null : i === 0 || i === 1 || i === 11 ? "snow" : null;
}

function ji(g, j) {
    const yN = cX;
    if (!f.fx.decals) return;
    let m = Math.hypot(j.pos.x - j.prev.x, j.pos.y - j.prev.y);
    if (m <= 0 || Math.hypot(j.vel.x, j.vel.y) < f.fx.printSpeed) return;
    let p = f.fx.printStride,
        q = Math.floor(j.walkPhase / p);
    if (q === Math.floor((j.walkPhase - m) / p)) return;
    let u = surfaceAt(g.map, j.pos.x, j.pos.y);
    if (!u) return;
    let v = Math.atan2(j.pos.y - j.prev.y, j.pos.x - j.prev.x),
        y = (Math.round(v / (Math.PI / 4)) % 8 + 8) % 8,
        A = q & 1,
        C = v + Math.PI / 2,
        E = hash01(j.id, q) * 2 - 1,
        F = {
            x: j.pos.x + Math.cos(C) * (A ? 1.5 : -1.5) + Math.cos(v) * E,
            y: j.pos.y + Math.sin(C) * (A ? 1.5 : -1.5) + Math.sin(v) * E
        },
        H = hashInt(Math.round(F.x), Math.round(F.y)) & 67108863;
    g.fx.print(F, u, H * 16 + (A << 3) + y);
}

function th(c, d) {
    const yO = cX;
    c.flankCooldown > 0 && (c.flankCooldown = Math.max(0, c.flankCooldown - d)), c.driftCooldown > 0 && (c.driftCooldown = Math.max(0, c.driftCooldown - d));
    for (let g of c.enemies) {
        if (!g.alive) continue;
        if (g.prev.x = g.pos.x, g.prev.y = g.pos.y, g.fireCooldown -= d, g.grenadeCooldown -= d, decayAlert(g, d), g.wounded) {
            tickBleeding(c, g, d);
            continue;
        }
        if (Mi(g, c.map, d)) continue;
        g.senseDebt += d;
        let j = Math.max(1, Math.round(f.enemy.senseInterval / d));
        (c.stepIndex + g.id) % j === 0 && (senseStep(c, g, g.senseDebt), g.senseDebt = 0), g.glance && (g.glance.time -= d, (g.glance.time <= 0 || g.state === 3 || g.state === 2) && (g.glance = null));
        let l = g.glance !== null && (g.state === 0 || g.state === 1);
        l && g.glance && (g.angle = Math.atan2(g.glance.at.y - g.pos.y, g.glance.at.x - g.pos.x), g.goal = null);
        let m = null;
        switch (g.state) {
            case 0:
                m = l ? null : protectBuilding(c, g) ?? tickFidget(c, g, d);
                break;
            case 1:
                m = l ? null : protectBuilding(c, g) ?? tickPatrol(c, g, d);
                break;
            case 4:
                m = refreshTrailSearch(c, g, d);
                break;
            case 2:
                g.reaction -= d;
                {
                    let q = wn(g);
                    q && (g.angle = Math.atan2(q.y - g.pos.y, q.x - g.pos.x));
                }
                g.reaction <= 0 && (g.state = 3, g.traits.rusher && c.sounds.push({
                    kind: "grunt",
                    at: {
                        x: g.pos.x,
                        y: g.pos.y
                    }
                }));
                break;
            case 3:
                m = tryFire(c, g);
                break;
            case 5:
                m = $0(c, g);
                break;
        }
        if (g.flank && (m = shouldBreakFlank(g, d) ?? m), m ??= ut(c.map, g), m && (m = nextPathTarget(c, g, m)), Ei(g, m, c.hash, c.map, V0(g), d, c.clouds), h1(g, c.map, d), g1(g, c.map), ji(c, g), g.wading && c.jitter(g.faction) < 0.08 && Math.hypot(g.vel.x, g.vel.y) > 8) {
            let s = z(c.map, Math.floor(g.pos.x / c.map.tile), Math.floor(g.pos.y / c.map.tile));
            c.fx.splash(g.pos, s === 9);
        }
        let p = Math.hypot(g.vel.x, g.vel.y);
        if (g.lookAhead > 0 && (g.lookAhead -= d), m && p < f.movement.enemyStuckSpeed ? g.stuck += d : g.stuck = Math.max(0, g.stuck - d * 2), l && g.glance) g.angle = Math.atan2(g.glance.at.y - g.pos.y, g.glance.at.x - g.pos.x);
        else {
            if (!m && p < 2 && g.target && g.state === 3) {
                let u = wn(g);
                u && (g.angle = Math.atan2(u.y - g.pos.y, u.x - g.pos.x));
            } else p > 2 && (g.angle = Math.atan2(g.vel.y, g.vel.x));
        }
    }
}

function isSwimAt(c, d) {
    const yP = cX;
    return TT[getTileDefAt(c.map, d.pos.x, d.pos.y)].swim;
}

function tickCorpseFade(c, d) {
    const yQ = cX;
    return c.alive || c.deathTime < 0 || c.deathTime >= f.fx.deathTime || (c.deathTime += d, c.deathTime < f.fx.deathTime) ? false : (c.deathTime = f.fx.deathTime, true);
}

function oh(c, d) {
    const yR = cX;
    for (let g of c.actors) I1(g) || tickCorpseFade(g, d);
}

function Ii(c, d) {
    const yS = cX;
    for (let g of c.actors)
        if (!I1(g) && tickCorpseFade(g, d)) {
            if (isSwimAt(c, g)) {
                c.fx.slick(g.pos, g.id);
                continue;
            }
            c.fx.blood(g.pos), c.fx.corpse(g.pos, ct(g, c), g.id);
        }
}

function applyWound(c, d) {
    const yT = cX;
    return c.map.arena || c.skirmish || d.faction !== D.Enemy || d.wounded || c.jitter() >= f.enemy.woundChance ? false : (d.wounded = true, d.hp = 1, d.vel.x = 0, d.vel.y = 0, d.screamTimer = 0, c.fx.blood(d.pos), true);
}

function Ye(c, d, g = 1, j = null, m = null) {
    const yU = cX;
    if (!d.alive || (d.hp -= g, d.hp > 0) || applyWound(c, d)) return;
    if (I1(d)) {
        pt(c, d);
        return;
    }
    d.alive = false, d.vel.x = 0, d.vel.y = 0, d.deathTime = 0, d.faction === c.viewSide && c.casualties.push({
        t: c.time,
        id: d.id,
        cause: j ? "shot" : "blast",
        pos: {
            ...d.pos
        }
    }), isSwimAt(c, d) ? c.fx.drown(d.pos) : c.fx.blood(d.pos), c.deaths.push({
        x: d.pos.x,
        y: d.pos.y
    }), d.faction !== c.viewSide && be(c) && (c.bodies.push({
        x: d.pos.x,
        y: d.pos.y,
        faction: d.faction
    }), c.bodies.length > f.enemy.alert.bodiesKept && c.bodies.shift());
    let p = f.enemy.deathAlarmLead,
        q = d.pos;
    if (j) {
        let v = j.x - d.pos.x,
            y = j.y - d.pos.y,
            A = Math.hypot(v, y);
        A > 1 && (q = {
            x: d.pos.x + v / A * p,
            y: d.pos.y + y / A * p
        });
    }
    UT(c, q, c.levers.hearing * f.enemy.deathAlarm), d.faction === D.Enemy && (c.kills++, tickCampingPressure(c)), m !== null && m !== d.faction && (c.killsBySide[m] = (c.killsBySide[m] ?? 0) + 1);
    let u = d.spawnedBy ?? -1;
    if (u >= 0) {
        let C = c.buildings.find(E => E.id === u);
        C && (C.spawned = Math.max(0, C.spawned - 1));
    }
    for (let E of c.enemies) E.target === d && (E.target = null);
    c.squadTarget === d && (c.squadTarget = null);
}

function ih(c) {
    const yV = cX;
    let d = new Map();
    for (let i of c.critters) {
        if (!i.alive) continue;
        let j = d.get(i.flock) ?? {
            x: 0,
            y: 0,
            n: 0
        };
        j.x += i.pos.x, j.y += i.pos.y, j.n++, d.set(i.flock, j);
    }
    let g = new Map();
    for (let [l, m] of d) g.set(l, {
        x: m.x / m.n,
        y: m.y / m.n
    });
    return g;
}

function rh(c, d) {
    const yX = cX;
    for (let g of c.critters)
        if (g.alive && g.flock === d.flock && g.id < d.id) return false;
    return true;
}

function critterDashDelay(c) {
    const yY = cX;
    let [d, g] = f.critter.dashEvery;
    return d + c.jitter() * (g - d);
}

function sh(c, d) {
    const yZ = cX;
    let g = c.jitter() * Math.PI * 2;
    for (let i of c.critters) {
        if (!i.alive || i.flock !== d.flock || i.state === 3) continue;
        let j = (mT(i.id, 4127) - 0.5) * 0.5;
        i.heading.x = Math.cos(g + j), i.heading.y = Math.sin(g + j), i.state = 2, i.stateTime = f.critter.dashTime, i.goal = null;
    }
    d.clock = critterDashDelay(c);
}
var headingLerpFactor = 0.25;

function scanBirdsInRadius(j, m, q) {
    const z2 = cX;
    let A = f.birds,
        C = j.map,
        E = Math.min(q, A.reach),
        F = {
            x: Math.floor((m.x - E) / C.tile),
            y: Math.floor((m.y - E) / C.tile)
        },
        H = {
            x: Math.floor((m.x + E) / C.tile),
            y: Math.floor((m.y + E) / C.tile)
        },
        I = 0;
    for (let K = F.y; K <= H.y && I < A.trees; K++)
        for (let L = F.x; L <= H.x && I < A.trees; L++) {
            if (L < 0 || K < 0 || L >= C.width || K >= C.height || z(C, L, K) !== 2) continue;
            let M = {
                    x: (L + 0.5) * C.tile,
                    y: (K + 0.3) * C.tile
                },
                N = M.x - m.x,
                P = M.y - m.y;
            if (N * N + P * P > E * E || j.fx.birds.some(X => Math.abs(X.pos.x - M.x) < A.quiet && X.pos.y < M.y + A.quiet)) continue;
            let Q = A.copse,
                R = hash01(Math.floor(L / Q), Math.floor(K / Q), 528765) * A.settle,
                S = j.time % A.settle,
                U = Math.abs(S - R);
            if (Math.min(U, A.settle - U) > A.openFor / 2) continue;
            let V = Math.hypot(N, P);
            j.fx.flush(M, V > 1 ? {
                x: N / V,
                y: P / V
            } : {
                x: 0,
                y: -1
            }), I++;
        }
}

function v1(g, j, p) {
    const z4 = cX;
    scanBirdsInRadius(g, j, p);
    let q = false;
    for (let v of g.critters) {
        if (!v.alive) continue;
        let y = v.pos.x - j.x,
            A = v.pos.y - j.y,
            C = p * v.traits.skittish,
            E = y * y + A * A;
        if (E > C * C) continue;
        let F = Math.sqrt(E) || 1,
            H = E > 0 ? y / F : v.heading.x,
            I = E > 0 ? A / F : v.heading.y;
        if (v.state === 3) {
            let K = v.heading.x + (H - v.heading.x) * headingLerpFactor,
                L = v.heading.y + (I - v.heading.y) * headingLerpFactor,
                M = Math.hypot(K, L) || 1;
            v.heading.x = K / M, v.heading.y = L / M;
        } else v.heading.x = H, v.heading.y = I, v.state = 3, v.goal = null, q || (g.sounds.push({
            kind: "squawk",
            at: {
                ...v.pos
            }
        }), q = true);
        v.stateTime = f.critter.fleeTime * v.traits.skittish;
    }
}
var TRAIT_SEEDS = {
    pace: 4101,
    restless: 4103,
    skittish: 4107,
    flocking: 4111
};

function critterTraits(c) {
    const z7 = cX;
    return {
        pace: 0.85 + mT(c, TRAIT_SEEDS.pace) * 0.3,
        restless: 0.7 + mT(c, TRAIT_SEEDS.restless) * 0.6,
        skittish: 0.8 + mT(c, TRAIT_SEEDS.skittish) * 0.6,
        flocking: 0.5 + mT(c, TRAIT_SEEDS.flocking) * 0.5
    };
}
var Mn = (c, d) => !TT[getTileDefAt(c, d.x, d.y)].swim,
    ch = (c, d) => {
        const z8 = cX;
        let g = f.critter.mineClearance ** 2;
        for (let i of c.mines) {
            let j = i.x - d.x,
                l = i.y - d.y;
            if (j * j + l * l < g) return false;
        }
        return true;
    };

function dh(g, j, p) {
    const z9 = cX;
    let q = [],
        v = g.chickens;
    if (v <= 0) return q;
    let y = g.henhouses.length > 0 ? g.henhouses : spawnFlock(g, v, p);
    for (let A = 0; A < v; A++) {
        let C = A % y.length,
            E = y[C],
            F = E;
        for (let I = 0; I < 8; I++) {
            let K = p() * Math.PI * 2,
                L = f.critter.scatter * Math.sqrt(p()),
                M = findOpenPosition(g, {
                    x: E.x + Math.cos(K) * L,
                    y: E.y + Math.sin(K) * L
                });
            if (Mn(g, M) && ch(g, M)) {
                F = M;
                break;
            }
        }
        let H = j.nextId++;
        q.push({
            id: H,
            kind: "chicken",
            pos: {
                ...F
            },
            prev: {
                ...F
            },
            vel: {
                x: 0,
                y: 0
            },
            radius: f.critter.radius,
            angle: p() * Math.PI * 2,
            alive: true,
            canSwim: false,
            walkPhase: 0,
            faction: j1,
            hp: 1,
            fireCooldown: 0,
            weapon: "fists",
            wading: false,
            swimming: false,
            wounded: false,
            bleeding: 0,
            screamTimer: 0,
            cries: 0,
            sliding: false,
            stagger: 0,
            flock: C,
            state: 1,
            stateTime: p() * 2,
            goal: null,
            heading: {
                x: 1,
                y: 0
            },
            clock: f.critter.dashEvery[0] + p() * (f.critter.dashEvery[1] - f.critter.dashEvery[0]),
            traits: critterTraits(H),
            deathTime: -1,
            visible: true
        });
    }
    return q;
}

function spawnFlock(d, g, j) {
    const zd = cX;
    let m = Math.max(1, Math.round(g / f.critter.perFlock)),
        p = f.critter.flockSpacing ** 2,
        q = [];
    for (let u = 0; u < m; u++) {
        let v = null,
            y = -1;
        for (let A = 0; A < 12; A++) {
            let C = pickCritterSpawn(d, j),
                E = q.reduce((F, H) => Math.min(F, (H.x - C.x) ** 2 + (H.y - C.y) ** 2), 1 / 0);
            if (E > p) {
                v = C;
                break;
            }
            E > y && (y = E, v = C);
        }
        v && q.push(v);
    }
    return q;
}

function pickCritterSpawn(c, d) {
    const zj = cX;
    for (let g = 0; g < 32; g++) {
        let i = findOpenPosition(c, {
            x: (0.1 + d() * 0.8) * c.pixelWidth,
            y: (0.1 + d() * 0.8) * c.pixelHeight
        });
        if (Mn(c, i) && ch(c, i)) return i;
    }
    return findOpenPosition(c, {
        x: c.pixelWidth / 2,
        y: c.pixelHeight / 2
    });
}

function pt(c, d) {
    const zk = cX;
    d.alive && (d.alive = false, d.deathTime = 0, d.vel.x = 0, d.vel.y = 0, d.goal = null, c.sounds.push({
        kind: "squawk",
        at: {
            ...d.pos
        }
    }));
}

function uh(c, d) {
    const zq = cX;
    for (let g of c.critters) tickCorpseFade(g, d);
}

function Cv(c, d, g) {
    const zw = cX;
    c.map.critterNotice !== null && (d.fireCooldown -= g, !(d.fireCooldown > 0) && (d.fireCooldown = _T[d.weapon].fireInterval, d2(c, d, _T[d.weapon].fireRange)));
}

function c2(c, d) {
    const zx = cX;
    for (let g of c.critters) tickCorpseFade(g, d) && (c.fx.blood(g.pos, f.critter.bloodParticles), c.fx.corpse(g.pos, "chicken", g.id));
}