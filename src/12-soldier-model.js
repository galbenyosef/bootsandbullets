// Soldier model & spawn factory
// Soldier state template (screamTimer, stagger, sliding…), `WW` soldier spawn factory, faction helpers (`eW`, `Mr`), squad filtering.
    'wounded': !0x1,
    'bleeding': 0x0,
    'screamTimer': 0x0,
    'cries': 0x0,
    'sliding': !0x1,
    'stagger': 0x0,
    'deathTime': -0x1,
    'visible': !0x0
});

function WW(g, j, m, p, q, v = -0x1, y = D["Enemy"], A = null, C, E) {
    const AG = cX;
    let F = Ph(A, g["nextId"]),
        H = Lh(q, m, F, g["nextId"]),
        I = C ?? F["weapon"];
    E && (H["grenadeKind"] = E);
    let K = g["nextId"];
    return {
        ...h2(g, j, y, f["enemy"]["radius"], I ?? Di[m]),
        'faction': y,
        'kind': m,
        'stats': Yv(Xv(m, q, I), H["pace"]),
        'state': p !== null || H["patrols"] ? 0x1 : 0x0,
        'home': p ? {
            ...p
        } : {
            ...j
        },
        'patrols': p !== null || H["patrols"],
        'rooted': m !== 0x0,
        'route': null,
        'routeIndex': 0x0,
        'routeDir': 0x1,
        'goal': null,
        'path': [],
        'target': null,
        'reaction': 0x0,
        'lastSeen': null,
        'memory': 0x0,
        'fought': !0x1,
        'alert': 0x0,
        'exclaim': 0x0,
        'coverSpot': null,
        'coverLookAt': 0x0,
        'pause': mT(K, 0x9a1) * 0x2,
        'stuck': 0x0,
        'lookAhead': 0x0,
        'senseDebt': 0x0,
        'traits': H,
        'investigate': null,
        'flank': null,
        'glance': null,
        'searchTime': 0x0,
        'idleTimer': mT(K, 0x9a2) * 0x2,
        'grenades': H["grenadier"] ? Math["max"](0x1, Math["round"](f["enemy"]["grenadeCount"] * H["grenades"])) : 0x0,
        'grenadeCooldown': f["enemy"]["grenadeCooldown"] * mT(K, 0x9a3),
        'spawnedBy': v,
        'squad': -0x1
    };
}

function _1(c, d, g, i, j = D["Player"]) {
    const AH = cX;
    return {
        ...h2(c, d, j, f["soldier"]["radius"], g),
        'faction': j,
        'state': 0x0,
        'fireLatch': 0x0,
        'fireLatchAt': null,
        'slot': null,
        'slotStuck': 0x0,
        'name': i["name"],
        'rank': i["missions"],
        'own': i["own"],
        'fresh': i["fresh"]
    };
}

function Fh(c) {
    const AI = cX;
    let d = [],
        g = new Set();
    for (let j of c) {
        if (g["has"](j)) continue;
        let l = [j];
        g["add"](j);
        for (let m = 0x0; m < l["length"]; m++)
            for (let p of c) g["has"](p) || Math["hypot"](p['x'] - l[m]['x'], p['y'] - l[m]['y']) <= 0xc0 && (l["push"](p), g["add"](p));
        d["push"](l);
    }
    return d["map"](q => {
        const AJ = AI;
        if (q[AJ(0x1e8)] < 0x2) return q;
        let u = q[AJ(0x707)]((E, F) => E + F['x'], 0x0) / q[AJ(0x1e8)],
            v = q[AJ(0x707)]((E, F) => E + F['y'], 0x0) / q[AJ(0x1e8)],
            y = q[0x0];
        for (let E of q) Math[AJ(0x12b2)](E['x'] - u, E['y'] - v) > Math[AJ(0x12b2)](y['x'] - u, y['y'] - v) && (y = E);
        let A = [y],
            C = new Set(q[AJ(0xe37)](F => F !== y));
        for (; C[AJ(0x1384)] > 0x0;) {
            let F = A[A[AJ(0x1e8)] - 0x1],
                H = null;
            for (let I of C)(!H || Math[AJ(0x12b2)](I['x'] - F['x'], I['y'] - F['y']) < Math[AJ(0x12b2)](H['x'] - F['x'], H['y'] - F['y'])) && (H = I);
            A[AJ(0xc0f)](H), C[AJ(0xc01)](H);
        }
        return A;
    });
}

function Bh(j, q, y, A) {
    const AL = cX;
    let C = N => {
            const AK = b;
            let P = null,
                Q = f["enemy"]["patrolRadius"] * 1.6;
            for (let R of j["patrolNodes"]) {
                let S = Math["hypot"](R['x'] - N['x'], R['y'] - N['y']);
                S < Q && (Q = S, P = R);
            }
            return P;
        },
        E = j["personas"],
        F = [...j["enemySpawns"]["map"](N => WW(y, N, 0x0, C(N), q, -0x1, D["Enemy"], E)), ...j["sniperSpawns"]["map"](N => WW(y, N, 0x1, null, q, -0x1, D["Enemy"], E)), ...j["bazookaSpawns"]["map"](N => WW(y, N, 0x2, null, q, -0x1, D["Enemy"], E)), ...j["officers"]["map"](N => WW(y, N, 0x3, null, q, -0x1, D["Enemy"], E))],
        H = Math["round"](j["enemySpawns"]["length"] * q["extraEnemies"]),
        I = [...j["enemySpawns"]];
    for (let N = I["length"] - 0x1; N > 0x0; N--) {
        let P = Math["floor"](A() * (N + 0x1));
        [I[N], I[P]] = [I[P], I[N]];
    }
    let K = 0xc * j["tile"],
        L = j["playerSpawns"]["slice"](0x0, j["squadSize"]);
    for (let Q = 0x0; Q < H && I["length"] > 0x0; Q++) {
        let R = I[Q % I["length"]],
            S = R;
        for (let U = 0x0; U < 0x8; U++) {
            let V = A() * Math['PI'] * 0x2,
                X = 0xc + A() * 0x1a,
                Y = zr(j, {
                    'x': R['x'] + Math["cos"](V) * X,
                    'y': R['y'] + Math["sin"](V) * X
                }, L[0x0] ?? R);
            if (L["every"](a7 => Math["hypot"](Y['x'] - a7['x'], Y['y'] - a7['y']) >= K)) {
                S = Y;
                break;
            }
        }
        F["push"](WW(y, S, 0x0, C(S), q, -0x1, D["Enemy"], E));
    }
    let M = Fh(j["patrolNodes"]);
    for (let a7 of F)
        if (!(!a7["patrols"] || !a7["home"]))
            for (let a8 of M) {
                let a9 = a8["findIndex"](aj => aj['x'] === a7["home"]['x'] && aj['y'] === a7["home"]['y']);
                if (a9 >= 0x0 && a8["length"] > 0x1) {
                    a7["route"] = a8, a7["routeIndex"] = a9;
                    break;
                }
            }
    return F;
}

function Hh(c, d, g) {
    const AM = cX;
    return c["buildings"]["map"]((j, l) => {
        const AN = AM;
        let m = j[AN(0x944)] === AN(0xce5) ? f[AN(0xdbd)][AN(0x15dc)] : f[AN(0xdbd)][AN(0x234)];
        return {
            'indestructible': c[AN(0xfac)] || c[AN(0x650)] || c[AN(0xfd4)][AN(0x13d1)](AN(0x751)) && j[AN(0x944)] === AN(0x751) || c[AN(0xfd4)][AN(0x13d1)](AN(0xd00)) && c[AN(0x1423)] !== null && j[AN(0x96b)] === AN(0xc52),
            'damageStage': 0x0,
            'ruinAge': 0x0,
            'id': l,
            'kind': j[AN(0x944)],
            'role': j[AN(0x96b)],
            'owner': j[AN(0x12dd)],
            'tiles': j[AN(0x698)],
            'centre': {
                ...j[AN(0x1629)]
            },
            'x0': j['x0'],
            'y0': j['y0'],
            'w': j['w'],
            'h': j['h'],
            'hp': m,
            'maxHp': m,
            'standing': !0x0,
            'spawnTimer': f[AN(0xdbd)][AN(0x1368)] * d[AN(0x1368)] * (0.4 + g() * 0.8),
            'spawned': 0x0,
            'flash': 0x0
        };
    });
}

function Gh(c, d) {
    const AO = cX;
    return c["hostages"]["map"](g => ({
        'id': d["nextId"]++,
        'pos': {
            ...g
        },
        'prev': {
            ...g
        },
        'vel': {
            'x': 0x0,
            'y': 0x0
        },
        'radius': f["hostage"]["radius"],
        'angle': Math['PI'] / 0x2,
        'alive': !0x0,
        'canSwim': !0x1,
        'wading': !0x1,
        'swimming': !0x1,
        'walkPhase': 0x0,
        'freed': !0x1,
        'delivered': !0x1
    }));
}
var Jv = Fe["slice"](0x0, 0xc)["map"](c => ({
    'name': c,
    'missions': 0x0,
    'own': !0x1,
    'fresh': !0x1
}));

function Zv(c, d) {
    const AP = cX;
    let g = 0x811c9dc5 ^ d;
    for (let i = 0x0; i < c["length"]; i++) g = Math["imul"](g ^ c["charCodeAt"](i), 0x1000193) >>> 0x0;
    return g >>> 0x0 || 0x1;
}

function BW(j, q, A, C, F = 0x0) {
    const AQ = cX;
    Kr(j);
    let H = Lt(q, j["doctrine"]);
    H["speed"] *= j["enemySpeed"];
    let I = j["rungMod"][q];
    if (I) {
        for (let [a8, a9] of Object["entries"](I)) H[a8] *= a9;
    }
    let K = Zv(j['id'], F),
        L = GT(K),
        M = {
            'nextId': 0x1
        },
        N = A && A["length"] > 0x0 ? A : Jv,
        P = j["weapons"]?.[0x0] ?? C?.["weapon"] ?? "basicRifle",
        Q = aj => j["weapons"] ? j["weapons"][aj % j["weapons"]["length"]] : P,
        R = A && A["length"] > 0x0 ? Math["min"](j["squadSize"], A["length"]) : j["squadSize"],
        S = j["playerSpawns"]["slice"](0x0, R)["map"]((aj, ak) => {
            const AR = AQ;
            let aq = N[ak % N[AR(0x1e8)]];
            return _1(M, aj, Q(ak), aq);
        }),
        U = Bh(j, H, M, L),
        V = Hh(j, H, L),
        X = Gh(j, M),
        Y = dh(j, M, L),
        a7 = {
            'map': j,
            'difficulty': q,
            'levers': H,
            'seed': K,
            'rng': L,
            'jitter': aj => (aj !== void 0x0 && a7["sideLevers"]?.[aj] || a7["levers"])["predictable"] ? L() : Math["random"](),
            'fog': new ze(j, j["fog"] ?? H["vision"]),
            'baseLevers': {
                ...H
            },
            'stepNoise': 0x0,
            'pressure': 0x0,
            'campAnchor': null,
            'stillFor': 0x0,
            'lastKnown': null,
            'lastKnownAge': 0x0,
            'sides': j["critterNotice"] !== null ? 0x3 : 0x2,
            'viewSide': D["Player"],
            'playerSides': [D["Player"]],
            'killsBySide': [0x0, 0x0],
            'soldiers': S,
            'enemies': U,
            'actors': [...S, ...U],
            'bullets': [],
            'grenades': [],
            'clouds': [],
            'packages': j["packages"]["map"]((aj, ak) => ({
                'pos': {
                    ...aj
                },
                'taken': C?.["packagesTaken"]?.["includes"](ak) ?? !0x1,
                'lost': !0x1
            })),
            'crates': [...j["crates"]["map"](aj => ({
                'pos': {
                    ...aj
                },
                'alive': !0x0,
                'barrel': !0x1
            })), ...j["barrels"]["map"](aj => ({
                'pos': {
                    ...aj
                },
                'alive': !0x0,
                'barrel': !0x0
            }))],
            'mines': j["mines"]["map"](aj => ({
                'pos': {
                    ...aj
                },
                'alive': !0x0,
                'fuse': -0x1,
                'triggered': !0x1
            })),
            'hostages': X,
            'critters': Y,
            'supplies': j["supplies"]["map"](aj => ({
                'pos': {
                    ...aj
                },
                'alive': !0x0,
                'collected': !0x1
            })),
            'buildings': V,
            'extraction': j["extraction"]["map"](aj => ({
                ...aj
            })),
            'fx': new Ni(() => a7["jitter"]()),
            'hash': new Si(0x18),
            'field': null,
            'orderGoal': null,
            'orderMarker': 0x0,
            'squadTarget': null,
            'targetBuilding': null,
            'repathTimer': 0x0,
            'lastTargetPos': null,
            'grenadesHeld': (j["startGrenades"] >= 0x0 ? j["startGrenades"] : H["grenades"]) + (C?.["grenades"] ?? 0x0),
            'grenadeCooldown': 0x0,
            'cratesTaken': 0x0,
            'squadWeapon': P,
            'squadThrowable': C?.["throwable"] ?? "frag",
            'autoEngage': !0x0,
            'sideB': null,
            'skirmish': null,
            'squadCallIn': C?.["callIn"] ?? "none",
            'callInsLeft': C?.["callIn"] ? f["callin"]["uses"] : 0x0,
            'callInsUsed': 0x0,
            'callIn': null,
            'reserves': C?.["reserves"] ?? [],
            'phase': 0x0,
            'phaseTime': 0x0,
            'preroll': yl(j),
            'round': 0x0,
            'time': 0x0,
            'kills': 0x0,
            'shotsFired': 0x0,
            'senseCalls': 0x0,
            'stepIndex': 0x0,
            'shotsHit': 0x0,
            'incomingFired': 0x0,
            'incomingHit': 0x0,
            'shouts': [],
            'screams': [],
            'deaths': [],
            'bodies': [],
            'casualties': [],
            'sounds': [],
            'enemyTotal': U["length"],
            'timeLeft': j["duration"],
            'heldFor': 0x0,
            'inZone': !0x1,
            'wavesSent': 0x0,
            'waveTimer': j["waves"] ? j["waves"]["lead"] ?? f["wave"]["lead"] : 0x0,
            'status': '',
            'arenaPace': null,
            'squadFields': [],
            'herdField': null,
            'hostageField': null,
            'pathSearches': 0x0,
            'fieldBuilds': 0x0,
            'flankCooldown': 0x0,
            'driftCooldown': 0x0,
            'triggerState': null,
            'flankField': null,
            'flanksTaken': {
                'drift': 0x0,
                'wide': 0x0
            },
            'sideLevers': null,
            'reapTimer': 0x2,
            'nextId': M["nextId"]
        };
    return x1(a7), a7["fog"]["refresh"](j, S), a7;
}

function Fi(c) {
    const AS = cX;
    let d = new Array(c["sides"])["fill"](0x0);
    for (let g of c["soldiers"]) g["alive"] && g["faction"] < c["sides"] && d[g["faction"]]++;
    return d;
}

function g2(c) {
    const AT = cX;
    let d = -0x1,
        g = null,
        i = !0x1;
    for (let j = 0x0; j < c["length"]; j++) c[j] > d ? (d = c[j], g = j, i = !0x1) : c[j] === d && (i = !0x0);
    return i ? null : g;
}
var eW = (c, d = D["Player"]) => c["soldiers"]["filter"](g => g["alive"] && g["faction"] === d),
    b2 = (c, d = D["Player"]) => eW(c, d);

function hT(c, d = D["Player"]) {
    const AU = cX;
    let g = 0x0,
        i = 0x0,
        j = 0x0;
    for (let l of c["soldiers"]) !l["alive"] || l["faction"] !== d || (g += l["pos"]['x'], i += l["pos"]['y'], j++);
    return j === 0x0 ? null : {
        'x': g / j,
        'y': i / j
    };
}

function ve(c, d) {
    const AV = cX;
    c["enemies"]["push"](d), c["actors"]["push"](d);
}
var Sn = c => c["map"]["arena"] || c["map"]["spawn"]["maxAlive"] !== null;

function x1(c) {
    const AX = cX;
    c["actors"] = [...c["soldiers"], ...c["enemies"]], c["map"]["critterNotice"] !== null && c["actors"]["push"](...c["critters"]);
}

function Qv(c, d) {
    const AY = cX;
    let g = (c["sideLevers"]?.[d["owner"]] ?? c["levers"])["spawnInterval"];
    return c["arenaPace"] ? g * c["arenaPace"](d["owner"]) : g;
}

function Vh(c, d) {
    const AZ = cX;
    for (let g of c["buildings"]) {
        if (g["flash"] = Math["max"](0x0, g["flash"] - d * 0x3), !g["standing"]) {
            g["ruinAge"] += d;
            let y = Math["max"](0.12, 0x1 - g["ruinAge"] / f["building"]["smokeDuration"]);
            c["jitter"]() < y * 0.75 && c['fx']["smoke"]({
                'x': g["centre"]['x'] + (c["jitter"]() - 0.5) * g['w'] * 0xc,
                'y': g["centre"]['y'] + (c["jitter"]() - 0.5) * g['h'] * 0x8
            }, y);
            continue;
        }
        if (g["damageStage"] = g['hp'] > g["maxHp"] * 0.66 ? 0x0 : g['hp'] > g["maxHp"] * 0.3 ? 0x1 : 0x2, g["damageStage"] === 0x2 && c["jitter"]() < 0.14 && c['fx']["smoke"]({
                'x': g["centre"]['x'] + (c["jitter"]() - 0.5) * 0xa,
                'y': g["centre"]['y'] - 0x6
            }, 0.4), g["role"] !== "spawner" || c["map"]["waves"] && c["map"]["spawn"]["interval"] === null) continue;
        if (!c["map"]["arena"]) {
            let A = c["map"]["spawn"]["aggroRange"];
            if (!c["soldiers"]["some"](C => C["alive"] && Math["hypot"](C["pos"]['x'] - g["centre"]['x'], C["pos"]['y'] - g["centre"]['y']) < A)) continue;
        }
        let j = c["sideLevers"]?.[g["owner"]] ?? c["levers"];
        if (g["spawnTimer"] -= d, g["spawnTimer"] > 0x0) continue;
        let m = c["map"]["spawn"];
        if (g["spawnTimer"] = m["interval"] ?? f["building"]["spawnInterval"] * Qv(c, g), g["spawned"] >= (m["perBuilding"] ?? j["maxSpawned"])) continue;
        if (m["maxAlive"] !== null) {
            let C = 0x0;
            for (let E of c["enemies"]) E["alive"] && C++;
            if (C >= m["maxAlive"]) continue;
        }
        let p = y2(c, g, c["map"]["arena"]) ?? y2(c, g);
        if (!p) continue;
        let q = c["map"]["sidePersonas"]?.[g["owner"]] ?? c["map"]["personas"],
            u = c["map"]["arena"] ? f2(c["nextId"]) : null,
            v = WW(c, p, u?.["kind"] ?? 0x0, null, j, g['id'], g["owner"], q, u?.["gun"], u?.["throwable"]);
        c["map"]["arena"] ? v["state"] = 0x0 : (v["state"] = 0x4, v["investigate"] = c["lastKnown"] ? {
            ...c["lastKnown"]
        } : {
            ...p
        }, v["memory"] = f["enemy"]["alertMemory"]), ve(c, v), v["faction"] === D["Enemy"] && c["enemyTotal"]++, g["spawned"]++;
    }
}

function qh(j, q) {
    const B7 = cX;
    let A = j["map"]["waves"];
    if (!A || j["wavesSent"] >= A["count"] || (j["waveTimer"] -= q, j["waveTimer"] > 0x0)) return;
    j["wavesSent"]++;
    let {
        pace: C
    } = f["wave"];
    j["waveTimer"] = A["interval"] * (0x1 - C + C * j["levers"]["spawnInterval"]);
    let E = j["buildings"]["filter"](U => U["role"] === "spawner"),
        F = E["filter"](U => U["standing"]);
    if (F["length"] === 0x0 || E["length"] === 0x0) return;
    let {
        sizeRange: H
    } = f["wave"], {
        first: I,
        growth: K
    } = j["map"]["waveSize"], L = 0x1 + (j["wavesSent"] - 0x1) * K, M = Math["min"](H[0x1], Math["max"](H[0x0], j["levers"]["waveSize"])), N = Math["max"](0x1, Math["round"](I * L * M));
    if (j["map"]["spawn"]["maxAlive"] !== null) {
        let U = 0x0;
        for (let V of j["enemies"]) V["alive"] && U++;
        N = Math["min"](N, Math["max"](0x0, j["map"]["spawn"]["maxAlive"] - U));
    }
    let P = j["buildings"]["find"](X => X["role"] === "protect" && X["standing"]),
        Q = P ? P["centre"] : hT(j),
        R = F["map"]((X, Y) => ({
            'b': X,
            'k': (Y + j["wavesSent"]) % F["length"]
        }))["sort"]((X, Y) => X['k'] - Y['k'])["map"](X => X['b']),
        S = 0x0;
    for (let X = 0x0; X < N; X++) {
        let Y = R[X % R["length"]],
            a7 = y2(j, Y, !0x0);
        if (!a7) continue;
        let a8 = j["map"]["sidePersonas"]?.[Y["owner"]] ?? j["map"]["personas"],
            a9 = WW(j, a7, 0x0, null, j["levers"], Y['id'], Y["owner"], a8);
        P ? a9["state"] = 0x0 : (a9["state"] = 0x4, a9["investigate"] = Q ? FW(j, Q, a9['id'], f["wave"]["fan"]) : {
            ...a7
        }, a9["memory"] = f["enemy"]["alertMemory"]), ve(j, a9), j["enemyTotal"]++, Y["spawned"]++, S++;
    }
    S > 0x0 && (j["map"]["waves"]?.["interval"] ?? 0x1 / 0x0) >= f['fx']["waveNoticeInterval"] && (j["sounds"]["push"]({
        'kind': "klaxon"
    }), Q && j['fx']["popup"](Q, "wave " + j["wavesSent"], "#ff8a3c"));
}

function y2(g, j, m = !0x1) {
    const B8 = cX;
    let p = g["map"]["tile"],
        q = [],
        v = [],
        y = [],
        A = [];
    for (let C = j['y0'] - 0x1; C <= j['y0'] + j['h']; C++)
        for (let E = j['x0'] - 0x1; E <= j['x0'] + j['w']; E++) {
            let F = E >= j['x0'] && E < j['x0'] + j['w'],
                H = C >= j['y0'] && C < j['y0'] + j['h'];
            if (F && H) continue;
            let I = (g["jitter"]() - 0.5) * 0.66,
                K = {
                    'x': (E + 0.5 + (F ? I : 0x0)) * p,
                    'y': (C + 0.5 + (H ? I : 0x0)) * p
                };
            fT(g["map"], K['x'], K['y'], f["enemy"]["radius"]) || m && T6(g, K, j["owner"]) || (F ? (C === j['y0'] + j['h'] ? q : y)["push"](K) : H ? v["push"](K) : A["push"](K));
        }
    for (let L of [q, v, y, A])
        if (L["length"] > 0x0) return L[g["jitter"]() * L["length"] | 0x0];
    return null;
}

function T6(c, d, g) {
    const B9 = cX;
    for (let i of c["actors"])
        if (!(!i["alive"] || i["faction"] === g) && !(Math["hypot"](i["pos"]['x'] - d['x'], i["pos"]['y'] - d['y']) > f["wave"]["hideRadius"]) && kW(c["map"], i["pos"], d)) return !0x0;
    return !0x1;
}

function Bi(c, d, g, i = null, j = null) {
    const Bd = cX;
    if (!d["standing"]) return !0x1;
    if (d["indestructible"]) return d["flash"] = Math["max"](d["flash"], 0.4), i && c['fx']["spall"](i, j ?? d["centre"]), !0x1;
    d['hp'] -= g;
    let l = g < d["maxHp"] * f["building"]["scratchFraction"];
    return l && i && c['fx']["spall"](i, j ?? d["centre"]), d["flash"] = l ? 0.25 : 0x1, d['hp'] > 0x0 ? !0x1 : (W6(c, d), l && UT(c, d["centre"], c["levers"]["hearing"] * 0x2, null, f["enemy"]["alert"]["blastHold"]), !0x0);
}

function ft(d, g, j, m = 0x0) {
    const Bj = cX;
    let p = d["map"]["tile"];
    for (let q of d["buildings"])
        if (q["standing"])
            for (let [u, v] of q["tiles"]) {
                let y = Math["max"](u * p, Math["min"](g, (u + 0x1) * p)),
                    A = Math["max"](v * p, Math["min"](j, (v + 0x1) * p)),
                    C = g - y,
                    E = j - A;
                if (C * C + E * E <= m * m) return q;
            }
    return null;
}

function W6(c, d) {
    const Bk = cX;
    d["standing"] = !0x1, d['hp'] = 0x0, d["damageStage"] = 0x2, d["ruinAge"] = 0x0;
    for (let [g, i] of d["tiles"]) $r(c["map"], g, i, 0xd);
    c['fx']["explosion"](d["centre"]), c['fx']["shake"](f['fx']["screenShake"] * 1.6), c["sounds"]["push"]({
        'kind': "explosion",
        'at': d["centre"]
    }), c["sounds"]["push"]({
        'kind': "collapse",
        'at': d["centre"]
    });
    for (let [j, l] of d["tiles"]) {
        let m = {
            'x': (j + 0.5) * c["map"]["tile"],
            'y': (l + 0.5) * c["map"]["tile"]
        };
        c['fx']["explosion"](m, f["grenade"]["blastRadius"], 0x1), f['fx']["decals"] && c['fx']["addDecal"]({
            'kind': "scorch",
            'pos': m,
            'seed': c["jitter"]() * 0x3b9aca00 | 0x0
        });
    }
}

function Uh(g, j, q, v, y) {
    const Bq = cX;
    let A = q['x'] - j['x'],
        C = q['y'] - j['y'],
        E = Math["hypot"](A, C);
    if (E < 0.000001) return !0x1;
    A = A / E * y, C = C / E * y;
    let F = y * y,
        H = f["body"]["radius"] + f["bullet"]["radius"] + f["hostage"]["radius"],
        {
            rise: I,
            drop: K
        } = f["body"];
    for (let L of g["hostages"])
        if (!(!L["alive"] || L["delivered"]))
            for (let M = 0x0; M <= 0x3; M++) {
                let N = L["pos"]['y'] - I + (I + K) * M / 0x3,
                    P = Math["max"](0x0, Math["min"](0x1, ((L["pos"]['x'] - j['x']) * A + (N - j['y']) * C) / F)),
                    Q = H + v * y * P;
                if (Math["hypot"](L["pos"]['x'] - (j['x'] + A * P), N - (j['y'] + C * P)) <= Q) return !0x0;
            }
    return !0x1;
}

function $h(c, d) {
    const Br = cX;
    for (let g of c["hostages"])
        if (!(!g["alive"] || g["delivered"])) {
            if (g["prev"]['x'] = g["pos"]['x'], g["prev"]['y'] = g["pos"]['y'], !g["freed"]) {
                Kh(c, g["pos"], f["hostage"]["freeRadius"]) && (g["freed"] = !0x0, c['fx']["sparkle"](g["pos"], "#8fe0ff"), c['fx']["popup"]({
                    'x': g["pos"]['x'],
                    'y': g["pos"]['y'] - 0xc
                }, "RESCUED", "#8fe0ff", "hostage"), c["sounds"]["push"]({
                    'kind': "pickup",
                    'at': g["pos"]
                }));
                continue;
            }
            for (let i of c["extraction"])
                if (Math["hypot"](i['x'] - g["pos"]['x'], i['y'] - g["pos"]['y']) <= i["pad"] + f["hostage"]["deliverRadius"]) {
                    g["delivered"] = !0x0, c['fx']["sparkle"](g["pos"], "#9bf07a"), c['fx']["popup"]({
                        'x': g["pos"]['x'],
                        'y': g["pos"]['y'] - 0xc
                    }, "DELIVERED", "#9bf07a", "hostage"), c["sounds"]["push"]({
                        'kind': "pickup",
                        'at': g["pos"]
                    });
                    break;
                } g["delivered"] || n6(c, g, d);
        }
}

function Kh(c, d, g) {
    const Bv = cX;
    let j = null,
        l = g;
    for (let m of c["soldiers"]) {
        if (!m["alive"]) continue;
        let p = Math["hypot"](m["pos"]['x'] - d['x'], m["pos"]['y'] - d['y']);
        p < l && (l = p, j = m);
    }
    return j;
}

function e6(c, d, g) {
    const Bw = cX;
    let i = c["hostages"]["filter"](l => l["alive"] && l["freed"] && !l["delivered"]),
        j = i["indexOf"](d);
    return j <= 0x0 ? g["pos"] : Ci(g["pos"], i["length"], f["hostage"]["followDistance"] * 0.8)[j] ?? g["pos"];
}

function t6(c, d, g) {
    const Bx = cX;
    let j = c["map"],
        l = c["hostageField"];
    (!l || l["age"] > f["hostage"]["routeInterval"]) && (l = {
        'key': '',
        'age': 0x0,
        'fields': new Map()
    }, c["hostageField"] = l);
    let m = Math["floor"](g["pos"]['x'] / j["tile"]) + ',' + Math["floor"](g["pos"]['y'] / j["tile"]),
        p = l["fields"]["get"](m);
    return p || (p = yW(j, g["pos"], !0x1, f["hostage"]["swimCost"]), l["fields"]["set"](m, p)), f1(p, j, d["pos"], d["radius"]);
}

function n6(g, j, m) {
    const Bz = cX;
    let q = Ee(g["map"], j["pos"]['x'], j["pos"]['y']);
    j["wading"] = q["wade"], j["swimming"] = q["swim"];
    let y = Kh(g, j["pos"], 0x1 / 0x0);
    if (!y) {
        j["vel"]['x'] *= 0.9, j["vel"]['y'] *= 0.9;
        return;
    }
    let A = j["swimming"] ? null : e6(g, j, y),
        C = A !== null && !DW(g["map"], j["pos"], y["pos"], j["radius"], !0x1),
        E = A === null ? ut(g["map"], j) ?? y["pos"] : C ? t6(g, j, y) ?? A : A,
        F = E['x'] - j["pos"]['x'],
        H = E['y'] - j["pos"]['y'],
        I = Math["hypot"](F, H),
        K = 0x0,
        L = 0x0;
    if (I > 0.5 && (j["swimming"] || C || I > f["hostage"]["followDistance"])) {
        let N = Ee(g["map"], j["pos"]['x'], j["pos"]['y']),
            P = f["hostage"]["speed"] * N["speed"],
            Q = j["swimming"] || C ? 0x1 : Math["min"](0x1, (I - f["hostage"]["followDistance"]) / 0x8);
        K = F / I * P * Q, L = H / I * P * Q;
    }
    let M = Math["min"](0x1, 0x9 * m);
    j["vel"]['x'] += (K - j["vel"]['x']) * M, j["vel"]['y'] += (L - j["vel"]['y']) * M, h1(j, g["map"], m), g1(j, g["map"]), Math["hypot"](j["pos"]['x'] - j["prev"]['x'], j["pos"]['y'] - j["prev"]['y']) > 0.05 && (j["angle"] = Math["atan2"](j["vel"]['y'], j["vel"]['x']));
}

function Hi(c, d) {
    const BA = cX;
    if (!(!d["alive"] || d["delivered"])) {
        if (d["alive"] = !0x1, TT[oW(c["map"], d["pos"]['x'], d["pos"]['y'])]["swim"]) {
            c['fx']["drown"](d["pos"]), c['fx']["slick"](d["pos"], d['id']);
            return;
        }
        c['fx']["blood"](d["pos"]), c['fx']["corpse"](d["pos"], "hostage", d['id']);
    }
}

function Gi(c, d) {
    const BB = cX;
    d["taken"] || d["lost"] || (d["lost"] = !0x0, c['fx']["popup"]({
        'x': d["pos"]['x'],
        'y': d["pos"]['y'] - 0xa
    }, "LOST", "#ff6a48", "bond"));
}

function zh(c) {
    const BC = cX;
    for (let d of c["supplies"])
        if (!(!d["alive"] || d["collected"])) {
            for (let g of c["soldiers"])
                if (g["alive"] && !(Math["hypot"](g["pos"]['x'] - d["pos"]['x'], g["pos"]['y'] - d["pos"]['y']) > g["radius"] + f["supply"]["radius"])) {
                    d["collected"] = !0x0, c['fx']["sparkle"](d["pos"], "#9bf07a"), c['fx']["popup"]({
                        'x': d["pos"]['x'],
                        'y': d["pos"]['y'] - 0xa
                    }, "RECOVERED", "#9bf07a"), c["sounds"]["push"]({
                        'kind': "pickup",
                        'at': d["pos"]
                    });
                    break;
                }
        } for (let i of c["packages"])
        if (!(i["taken"] || i["lost"])) {
            for (let j of c["soldiers"])
                if (j["alive"] && !(Math["hypot"](j["pos"]['x'] - i["pos"]['x'], j["pos"]['y'] - i["pos"]['y']) > j["radius"] + f["crate"]["radius"])) {
                    i["taken"] = !0x0, c['fx']["sparkle"](i["pos"], "#ffd24a"), c['fx']["popup"]({
                        'x': i["pos"]['x'],
                        'y': i["pos"]['y'] - 0xa
                    }, '+' + f["economy"]["income"]["package"], "#ffd24a", "bond"), c["sounds"]["push"]({
                        'kind': "pickup",
                        'at': i["pos"]
                    });
                    break;
                }
        } for (let l of c["crates"])
        if (l["alive"])
            for (let m of c["soldiers"]) {
                if (!m["alive"]) continue;
                let o = m["radius"] + f["crate"]["radius"];
                if (Math["hypot"](m["pos"]['x'] - l["pos"]['x'], m["pos"]['y'] - l["pos"]['y']) > o) continue;
                l["alive"] = !0x1, c["cratesTaken"]++;
                let p = m["faction"] === D["Player"] ? c : c["sideB"] ?? c;
                p["grenadesHeld"] += f["grenade"]["perCrate"], c['fx']["sparkle"](l["pos"], "#ffd24a"), c['fx']["popup"]({
                    'x': l["pos"]['x'],
                    'y': l["pos"]['y'] - 0xa
                }, '+' + f["grenade"]["perCrate"] + " GRENADES", "#ffd24a", "grenade"), c["sounds"]["push"]({
                    'kind': "pickup",
                    'at': l["pos"]
                });
                break;
            }
}

function Yh(c, d) {
    const BD = cX;
    for (let g of c["mines"])
        if (g["alive"]) {
            if (g["fuse"] < 0x0) {
                for (let i of c["actors"])
                    if (i["alive"] && !(Math["hypot"](i["pos"]['x'] - g["pos"]['x'], i["pos"]['y'] - g["pos"]['y']) > f["mine"]["triggerRadius"])) {
                        g["fuse"] = f["mine"]["fuse"], g["triggered"] = !0x0;
                        break;
                    } if (g["fuse"] < 0x0 && f["mine"]["critterTrigger"]) {
                    for (let j of c["critters"])
                        if (j["alive"] && !(Math["hypot"](j["pos"]['x'] - g["pos"]['x'], j["pos"]['y'] - g["pos"]['y']) > f["mine"]["triggerRadius"])) {
                            g["fuse"] = f["mine"]["fuse"], g["triggered"] = !0x0;
                            break;
                        }
                }
                continue;
            }
            g["fuse"] -= d, !(g["fuse"] > 0x0) && (g["alive"] = !0x1, se(c, g["pos"], f["mine"]["blastRadius"]));
        }
}

function Xh(c, d, g, i) {
    const BE = cX;
    let j = Math["max"](i, f["mine"]["chainRadius"]);
    for (let l of c["mines"]) !l["alive"] || l["fuse"] >= 0x0 || Math["hypot"](l["pos"]['x'] - d, l["pos"]['y'] - g) > j || (l["triggered"] = !0x0, l["fuse"] = 0.08 + c["jitter"]() * 0.12);
}

function se(d, g, j, m) {
    const BF = cX;
    d['fx']["explosion"](g, j), d["sounds"]["push"]({
        'kind': "explosion",
        'at': g
    }), d['fx']["shake"](f['fx']["screenShake"]), UT(d, g, d["levers"]["hearing"] * 0x2, null, f["enemy"]["alert"]["blastHold"]), v1(d, g, f["critter"]["startleRadius"] * 0x2);
    let p = j * f["blast"]["lethal"];
    for (let u of d["actors"]) {
        if (!u["alive"]) continue;
        let v = u["pos"]['x'] - g['x'],
            y = u["pos"]['y'] - g['y'],
            A = Math["hypot"](v, y);
        if (A > j) continue;
        if (A <= p) {
            Ye(d, u);
            continue;
        }
        let C = 0x1 - (A - p) / Math["max"](0.000001, j - p),
            E = A < 0.000001 ? {
                'x': 0x0,
                'y': -0x1
            } : {
                'x': v / A,
                'y': y / A
            };
        u["vel"]['x'] += E['x'] * f["blast"]["knockback"] * C, u["vel"]['y'] += E['y'] * f["blast"]["knockback"] * C, u["stagger"] = Math["max"](u["stagger"], f["blast"]["stagger"] * C);
    }
    for (let F of d["hostages"]) !F["alive"] || F["delivered"] || Math["hypot"](F["pos"]['x'] - g['x'], F["pos"]['y'] - g['y']) <= p && Hi(d, F);
    for (let H of d["critters"]) H["alive"] && Math["hypot"](H["pos"]['x'] - g['x'], H["pos"]['y'] - g['y']) <= p && pt(d, H);
    let q = ft(d, g['x'], g['y'], j);
    q && !v2(q, m) && Bi(d, q, f["building"]["blastDamage"]);
    for (let I of d["crates"]) I["alive"] && Math["hypot"](I["pos"]['x'] - g['x'], I["pos"]['y'] - g['y']) <= j && Vi(d, I);
    Xh(d, g['x'], g['y'], j);
    for (let K of d["packages"]) K["taken"] || K["lost"] || Math["hypot"](K["pos"]['x'] - g['x'], K["pos"]['y'] - g['y']) <= j && Gi(d, K);
    for (let L of d["supplies"]) !L["alive"] || L["collected"] || Math["hypot"](L["pos"]['x'] - g['x'], L["pos"]['y'] - g['y']) <= j && (L["alive"] = !0x1, d['fx']["sparkle"](L["pos"], "#c86a3a"), d['fx']["popup"]({
        'x': L["pos"]['x'],
        'y': L["pos"]['y'] - 0xa
    }, "SUPPLIES LOST", "#ff6a48"));
}

function Vi(c, d) {
    const BG = cX;
    d["alive"] && (d["alive"] = !0x1, se(c, d["pos"], d["barrel"] ? f["barrel"]["blastRadius"] : f["crate"]["blastRadius"]));
}

function y1(g, j, q, v, y) {
    const BH = cX;
    let A = q['x'] - j["pos"]['x'],
        C = q['y'] - j["pos"]['y'],
        E = Math["atan2"](C, A);
    j["angle"] = E;
    let F = uW(j["weapon"]);
    if (F["melee"]) {
        d2(g, j, F["fireRange"]);
        return;
    }
    let H = F["rocket"],
        I = H ? H["speed"] : f["bullet"]["speed"],
        K = F["pellets"] ?? 0x1,
        L = Math["min"](H ? H["life"] : F["bulletLife"] ?? f["bullet"]["life"], y === void 0x0 ? 0x1 / 0x0 : y / I),
        M = j["pos"]['x'] + Math["cos"](E) * f["bullet"]["muzzle"],
        N = j["pos"]['y'] + Math["sin"](E) * f["bullet"]["muzzle"] - 0x3;
    for (let P = 0x0; P < K; P++) {
        let Q = E + (g["jitter"]() * 0x2 - 0x1) * v;
        g["bullets"]["push"]({
            'pos': {
                'x': M,
                'y': N
            },
            'prev': {
                'x': M,
                'y': N
            },
            'from': {
                'x': j["pos"]['x'],
                'y': j["pos"]['y']
            },
            'vel': {
                'x': Math["cos"](Q) * I,
                'y': Math["sin"](Q) * I
            },
            'faction': j["faction"],
            'life': L,
            'buildingDamage': f["building"]["bulletDamage"],
            'blast': H ? H["blastRadius"] : 0x0
        });
    }
    g['fx']["muzzle"]({
        'x': M,
        'y': N
    }, E), j["faction"] !== g["viewSide"] && (g["incomingFired"] += K), j["faction"] === g["viewSide"] && (g["shotsFired"] += K, H || g['fx']["casing"]({
        'x': M,
        'y': N
    }, E)), g["sounds"]["push"]({
        'kind': "shot",
        'at': j["pos"],
        'by': j["faction"]
    }), g["playerSides"]["includes"](j["faction"]) && UT(g, j["pos"], g["levers"]["hearing"]), v1(g, j["pos"], f["critter"]["startleRadius"]);
}

function d2(c, d, g) {
    const BI = cX;
    let j = null,
        l = g + f["body"]["radius"];
    for (let m of c["actors"]) {
        if (!m["alive"] || m["faction"] === d["faction"]) continue;
        let p = Math["hypot"](m["pos"]['x'] - d["pos"]['x'], m["pos"]['y'] - d["pos"]['y']);
        p < l && (l = p, j = m);
    }
    d["faction"] === c["viewSide"] ? c["shotsFired"]++ : c["incomingFired"]++, j && (d["faction"] === c["viewSide"] ? c["shotsHit"]++ : c["incomingHit"]++, Ye(c, j, 0x1, {
        'x': d["pos"]['x'],
        'y': d["pos"]['y']
    }, d["faction"]));
}

function _2(d, g, j, m, p, q) {
    const BJ = cX;
    let u = p - j,
        v = q - m,
        y = u * u + v * v,
        A = y < 1e-9 ? 0x0 : ((d - j) * u + (g - m) * v) / y;
    A = Math["max"](0x0, Math["min"](0x1, A));
    let C = j + u * A,
        E = m + v * A;
    return (d - C) ** 0x2 + (g - E) ** 0x2;
}

function Jh(d, g, j) {
    const BK = cX;
    g["prev"]['x'] = g["pos"]['x'], g["prev"]['y'] = g["pos"]['y'];
    let m = g["pos"]['x'] + g["vel"]['x'] * j,
        p = g["pos"]['y'] + g["vel"]['y'] * j,
        q = Math["hypot"](m - g["pos"]['x'], p - g["pos"]['y']),
        u = Math["max"](0x1, Math["ceil"](q / 0x4));
    for (let v = 0x1; v <= u; v++) {
        let y = v / u,
            A = g["prev"]['x'] + (m - g["prev"]['x']) * y,
            C = g["prev"]['y'] + (p - g["prev"]['y']) * y,
            E = TT[oW(d, A, C)];
        if (E["blocksShots"] && !(E["lowWall"] && g["from"] && Math["hypot"]((Math["floor"](A / d["tile"]) + 0.5) * d["tile"] - g["from"]['x'], (Math["floor"](C / d["tile"]) + 0.5) * d["tile"] - g["from"]['y']) <= f["cover"]["overReach"])) return g["pos"]['x'] = A, g["pos"]['y'] = C, !0x0;
    }
    return g["pos"]['x'] = m, g["pos"]['y'] = p, !0x1;
}

function Zh(c, d) {
    const BL = cX;
    for (let g = c["bullets"]["length"] - 0x1; g >= 0x0; g--) {
        let i = c["bullets"][g];
        i["life"] -= d, (i["life"] <= 0x0 || Jh(c["map"], i, d)) && c["bullets"]["splice"](g, 0x1);
    }
}

function Ui(c, d) {
    const BM = cX;
    let {
        map: g
    } = c;
    for (let j = c["bullets"]["length"] - 0x1; j >= 0x0; j--) {
        let l = c["bullets"][j];
        if (l["life"] -= d, l["life"] <= 0x0) {
            l["blast"] > 0x0 ? An(c, l) : l["faction"] === c["viewSide"] && c['fx']["impact"](l["pos"]), c["bullets"]["splice"](j, 0x1);
            continue;
        }
        if (Jh(g, l, d)) {
            let m = ft(c, l["pos"]['x'], l["pos"]['y'], 0x3);
            if (m && !v2(m, l["faction"])) {
                let o = {
                    'x': l["pos"]['x'] - l["vel"]['x'],
                    'y': l["pos"]['y'] - l["vel"]['y']
                };
                Bi(c, m, l["blast"] > 0x0 ? f["building"]["blastDamage"] : l["buildingDamage"], {
                    'x': l["pos"]['x'],
                    'y': l["pos"]['y']
                }, o);
            }
            l["blast"] > 0x0 ? An(c, l) : c['fx']["impact"](l["pos"]), UT(c, l["pos"], Math["max"](c["levers"]["hearing"] * f["enemy"]["impactAlarm"], f["enemy"]["impactAlarmFloor"])), c["bullets"]["splice"](j, 0x1);
            continue;
        }
        o6(c, l), i6(c, l) && c["bullets"]["splice"](j, 0x1);
    }
}

function o6(c, d) {
    const BN = cX;
    if (!d["from"] || !be(c) || !c["playerSides"]["includes"](d["faction"])) return;
    let g = f["enemy"]["alert"],
        i = g["nearMiss"] * g["sensitivity"];
    if (!(i <= 0x0)) {
        for (let j of c["enemies"]) !j["alive"] || j["wounded"] || j["faction"] === d["faction"] || qi(d, j["pos"], i) && H0(c, j, d["from"]);
    }
}
var An = (c, d) => {
    const BO = cX;
    se(c, d["pos"], d["blast"], d["faction"]);
};

function v2(c, d) {
    const BP = cX;
    return c["role"] === "protect" && d !== void 0x0 && c["owner"] === d;
}

function qi(c, d, g) {
    const BQ = cX;
    let j = f["body"],
        l = g + f["bullet"]["radius"],
        m = d['y'] - j["rise"],
        p = d['y'] + j["drop"];
    for (let q = 0x0; q <= 0x3; q++) {
        let u = m + (p - m) * q / 0x3;
        if (_2(d['x'], u, c["prev"]['x'], c["prev"]['y'], c["pos"]['x'], c["pos"]['y']) <= l * l) return !0x0;
    }
    return !0x1;
}

function i6(c, d) {
    const BR = cX;
    for (let g of c["actors"])
        if (!(!g["alive"] || g["faction"] === d["faction"]) && qi(d, g["pos"], f["body"]["radius"])) return d["faction"] === c["viewSide"] ? c["shotsHit"]++ : c["incomingHit"]++, d["blast"] > 0x0 ? An(c, d) : Ye(c, g, 0x1, {
            'x': d["pos"]['x'] - d["vel"]['x'],
            'y': d["pos"]['y'] - d["vel"]['y']
        }, d["faction"]), !0x0;
    for (let i of c["hostages"])
        if (!(!i["alive"] || i["delivered"]) && qi(d, i["pos"], f["body"]["radius"])) return d["blast"] > 0x0 ? An(c, d) : Hi(c, i), !0x0;
    for (let j of c["critters"])
        if (j["alive"] && qi(d, j["pos"], f["critter"]["radius"])) return d["blast"] > 0x0 ? An(c, d) : pt(c, j), !0x0;
    for (let l of c["crates"]) {
        if (!l["alive"]) continue;
        let m = (l["barrel"] ? f["barrel"]["radius"] : f["crate"]["radius"]) + f["bullet"]["radius"];
        if (_2(l["pos"]['x'], l["pos"]['y'], d["prev"]['x'], d["prev"]['y'], d["pos"]['x'], d["pos"]['y']) <= m * m) return Vi(c, l), !0x0;
    }
    for (let n of c["packages"]) {
        if (n["taken"] || n["lost"]) continue;
        let o = f["crate"]["radius"] + f["bullet"]["radius"];
        if (_2(n["pos"]['x'], n["pos"]['y'], d["prev"]['x'], d["prev"]['y'], d["pos"]['x'], d["pos"]['y']) <= o * o) return Gi(c, n), !0x0;
    }
    return !0x1;
}

function Ri(c, d, g, j, l = "frag") {
    const BS = cX;
    let m = g['x'] - d['x'],
        p = g['y'] - d['y'],
        q = Math["hypot"](m, p),
        u = Math["min"](q, f["grenade"]["throwRange"]),
        v = q < 0.000001 ? 0x0 : u / q;
    c["grenades"]["push"]({
        'kind': l,
        'pos': {
            'x': d['x'],
            'y': d['y']
        },
        'prev': {
            'x': d['x'],
            'y': d['y']
        },
        'from': {
            'x': d['x'],
            'y': d['y']
        },
        'to': {
            'x': d['x'] + m * v,
            'y': d['y'] + p * v
        },
        't': 0x0,
        'duration': f["grenade"]["flightTime"] * Math["max"](0.35, u / f["grenade"]["throwRange"]),
        'faction': j
    });
}

function Rn(c) {
    const BT = cX;
    return c["grenadesHeld"] <= 0x0 ? "empty" : c["grenadeCooldown"] > 0x0 ? "cooling" : 'ok';
}

function r6(c, d, g, j = null) {
    const BU = cX;
    if (j && j["alive"] && !j["wading"] && j["faction"] === d) return j;
    let l = null,
        m = 0x1 / 0x0;
    for (let p of c["soldiers"]) {
        if (!p["alive"] || p["wading"] || p["faction"] !== d) continue;
        let q = Math["hypot"](p["pos"]['x'] - g['x'], p["pos"]['y'] - g['y']);
        q < m && (m = q, l = p);
    }
    return l;
}

function ht(c, d, g = D["Player"], i = c, j = null) {
    const BV = cX;
    if (Rn(i) !== 'ok') return !0x1;
    let l = r6(c, g, d, j);
    return l ? (i["grenadesHeld"]--, i["grenadeCooldown"] = f["grenade"]["cooldown"], Ri(c, l["pos"], d, g, i["squadThrowable"]), !0x0) : !0x1;
}

function Qh(c, d) {
    const BX = cX;
    return c["prev"]['x'] = c["pos"]['x'], c["prev"]['y'] = c["pos"]['y'], c['t'] += d / c["duration"], c['t'] >= 0x1 ? !0x0 : (c["pos"]['x'] = c["from"]['x'] + (c['to']['x'] - c["from"]['x']) * c['t'], c["pos"]['y'] = c["from"]['y'] + (c['to']['y'] - c["from"]['y']) * c['t'], !0x1);
}

function T3(c, d) {
    const BY = cX;
    for (let g = c["grenades"]["length"] - 0x1; g >= 0x0; g--) Qh(c["grenades"][g], d) && c["grenades"]["splice"](g, 0x1);
}

function $i(c, d) {
    const BZ = cX;
    for (let g = c["grenades"]["length"] - 0x1; g >= 0x0; g--) {
        let i = c["grenades"][g];
        Qh(i, d) && (i["kind"] === "flash" ? e3(c, i['to']) : i["kind"] === "smoke" ? W3(c, i['to']) : se(c, i['to'], f["grenade"]["blastRadius"], i["faction"]), c["grenades"]["splice"](g, 0x1));
    }
}
var jn = c => Math["sin"](c * Math['PI']) * 0xb;

function W3(c, d) {
    const C1 = cX;
    c["clouds"]["push"]({
        'pos': {
            'x': d['x'],
            'y': d['y']
        },
        'radius': f["smoke"]["radius"],
        'life': f["smoke"]["life"],
        'maxLife': f["smoke"]["life"]
    }), c['fx']["sparkle"](d, "#c9cec6"), c["sounds"]["push"]({
        'kind': "smoke",
        'at': d
    }), UT(c, d, c["levers"]["hearing"] * 0.3);
}

function gt(c, d) {
    const C5 = cX;
    for (let g = c["clouds"]["length"] - 0x1; g >= 0x0; g--) c["clouds"][g]["life"] -= d, c["clouds"][g]["life"] <= 0x0 && c["clouds"]["splice"](g, 0x1);
}

function e3(c, d) {
    const C6 = cX;
    let g = f["flashbang"];
    c['fx']["bang"](d, g["blastRadius"]), c["sounds"]["push"]({
        'kind': "flashbang",
        'at': d
    }), c['fx']["shake"](f['fx']["screenShake"] * 0.6), UT(c, d, c["levers"]["hearing"] * 0x2), v1(c, d, f["critter"]["startleRadius"] * 0x2);
    let j = new Set();
    for (let l of c["actors"]) {
        if (!l["alive"]) continue;
        let m = l["pos"]['x'] - d['x'],
            p = l["pos"]['y'] - d['y'],
            q = Math["hypot"](m, p);
        if (q > g["blastRadius"]) continue;
        j["add"](l["faction"]);
        let u = 0x1 - q / g["blastRadius"],
            v = q < 0.000001 ? {
                'x': 0x0,
                'y': -0x1
            } : {
                'x': m / q,
                'y': p / q
            };
        l["vel"]['x'] += v['x'] * g["knockback"] * u, l["vel"]['y'] += v['y'] * g["knockback"] * u, l["stagger"] = Math["max"](l["stagger"], g["stagger"] * (0.6 + 0.4 * u));
    }
    if (!c["map"]["arena"]) {
        for (let y of j) c["sounds"]["push"]({
            'kind': "tinnitus",
            'value': g["stagger"],
            'side': y
        });
    }
}

function zi(j, q, A, C, F) {
    const C7 = cX;
    if (C < 0x1) return;
    let {
        tones: H
    } = F, [I, K] = F["dash"] ?? [0x1, 0x0], L = I + K, N = F["drift"] ?? 0x0, P = H["length"] - 0x1 - Math["floor"]((H["length"] - 0x1) / 0x2), Q = (L > 0x1 ? 2.2 : 1.1) / C, R = 0x0;
    for (let X = 0x0; X < Math['PI'] * 0x2; X += Q, R++) {
        if (L > 0x1 && (R + N) % L >= I) continue;
        let Y = F["jitter"] ? C + (R * 0x9e3779b1 >>> 0x8) % 0x3 - 0x1 : C,
            a7 = Math["cos"](X),
            a8 = Math["sin"](X);
        for (let a9 = 0x0; a9 < H["length"]; a9++) {
            let aj = Y + P - a9;
            j["fillStyle"] = H[a9], j["fillRect"](Math["round"](q + a7 * aj), Math["round"](A + a8 * aj), 0x1, 0x1);
        }
    }
    if (!F["ticks"]) return;
    let {
        len: S,
        tones: [U, V]
    } = F["ticks"];
    for (let [ak, aq] of [
            [0x1, 0x0],
            [-0x1, 0x0],
            [0x0, 0x1],
            [0x0, -0x1]
        ]) {
        let aw = aq ? 0x2 : 0x1,
            ax = ak ? 0x2 : 0x1,
            az = aq ? 0x1 : 0x0,
            aA = ak ? 0x1 : 0x0;
        j["fillStyle"] = U, j["fillRect"](Math["round"](q + ak * (C + 0x1)) - az, Math["round"](A + aq * (C + 0x1)) - aA, aw, ax), j["fillStyle"] = V;
        for (let aB = 0x0; aB < S; aB++) j["fillRect"](Math["round"](q + ak * (C - aB)) - az, Math["round"](A + aq * (C - aB)) - aA, aw, ax);
    }
}

function In(c, d, g, i, j, m) {
    const C8 = cX;
    let p = Math["min"](0.5, (m ? 4.08 : 8.16) / Math["max"](0x1, g)),
        q = Math["max"](0x1, Math["round"](i));
    c["fillStyle"] = j;
    let u = 0x0;
    for (let v = 0x0; v < Math['PI'] * 0x2; v += p) !m && u++ % 0x3 === 0x0 || c["fillRect"](Math["round"](d['x'] + Math["cos"](v) * g), Math["round"](d['y'] + Math["sin"](v) * g), q, q);
}

function n3(c, d, g, j) {
    const C9 = cX;
    if (g < 0x1) return;
    c["fillStyle"] = j;
    let l = Math["max"](0.1, 2.6 / g),
        m = 0x0;
    for (let p = 0x0; p < Math['PI'] * 0x2; p += l, m++) {
        let q = Math["sin"](m * 12.9898) * 43758.5453,
            u = (q - Math["floor"](q)) * 0x3 - 0x1 | 0x0,
            v = g + u;
        c["fillRect"](Math["round"](d['x'] + Math["cos"](p) * v), Math["round"](d['y'] + Math["sin"](p) * v), 0x1, 0x1);
    }
}
var _e = ["......#......", "......#......", "....#####....", "...##.#.##...", "..##..#..##..", "..#.......#..", "#####.#.#####", "..#.......#..", "..##..#..##..", "...##.#.##...", "....#####....", "......#......", "......#......"],
    Ki = (_e["length"] - 0x1) / 0x2,
    s6 = 0x4,
    t3 = (c, d) => c >= 0x0 && d >= 0x0 && d < _e["length"] && c < _e[d]["length"] && _e[d][c] === '#',
    a6 = ((() => {
        const Cj = cX;
        let c = [],
            d = new Set();
        for (let g = -0x1; g <= _e["length"]; g++)
            for (let j = -0x1; j <= _e["length"]; j++) {
                if (t3(j, g) || d["has"](j + ',' + g) || Math["hypot"](j - Ki, g - Ki) < s6 - 0.5) continue;
                let l = !0x1;
                for (let m = -0x1; m <= 0x1 && !l; m++)
                    for (let p = -0x1; p <= 0x1; p++)
                        if (t3(j + p, g + m)) {
                            l = !0x0;
                            break;
                        } l && (d["add"](j + ',' + g), c["push"]([j, g]));
            }
        return c;
    })());

function o3(c, d, g, j) {
    const Ck = cX;
    let l = Math["round"](d['x']) - Ki,
        m = Math["round"](d['y']) - Ki;
    c["fillStyle"] = j;
    for (let [p, q] of a6) c["fillRect"](l + p, m + q, 0x1, 0x1);
    c["fillStyle"] = g;
    for (let s = 0x0; s < _e["length"]; s++)
        for (let u = 0x0; u < _e[s]["length"]; u++) _e[s][u] === '#' && c["fillRect"](l + u, m + s, 0x1, 0x1);
}

function x2(c, d, g, j, l) {
    const Cq = cX;
    let m = Math["max"](0x1, j),
        p = g * 0.4;
    c["fillStyle"] = l, c["fillRect"](Math["round"](d['x'] - g), Math["round"](d['y']), Math["round"](g - p), m), c["fillRect"](Math["round"](d['x'] + p), Math["round"](d['y']), Math["round"](g - p), m), c["fillRect"](Math["round"](d['x']), Math["round"](d['y'] - g), m, Math["round"](g - p)), c["fillRect"](Math["round"](d['x']), Math["round"](d['y'] + p), m, Math["round"](g - p));
}

function i3(c, d, g, j, m) {
    const Cw = cX;
    c["fillStyle"] = m;
    let p = 0xe;
    for (let q = 0x1; q < p; q++) {
        if (q % 0x3 === 0x0) continue;
        let u = q / p,
            v = d['x'] + (g['x'] - d['x']) * u,
            y = d['y'] + (g['y'] - d['y']) * u - jn(u),
            A = Math["max"](0x1, Math["round"](1.5 * j));
        c["fillRect"](Math["round"](v), Math["round"](y), A, A);
    }
}

function Pn(c, d, g, j, m, p) {
    const Cx = cX;
    c["fillStyle"] = p;
    for (let q = Math["round"](g - m); q <= g + m; q++) {
        let u = (q - g) / m,
            v = Math["sqrt"](Math["max"](0x0, 0x1 - u * u)) * j;
        for (let y = Math["round"](d - v); y <= d + v; y++) {
            let A = 0x1 - Math["hypot"]((y - d) / j, u);
            qW(y, q) > A * 1.15 || c["fillRect"](y, q, 0x1, 0x1);
        }
    }
}

function bt(c, d, g) {
    const Cz = cX;
    let i = d["get"](c);
    if (i) return i;
    let j = document["createElement"]("canvas");
    j["width"] = c["width"], j["height"] = c["height"];
    let l = j["getContext"]('2d');
    return l["drawImage"](c, 0x0, 0x0), l["globalCompositeOperation"] = "source-in", l["fillStyle"] = g, l["fillRect"](0x0, 0x0, j["width"], j["height"]), d["set"](c, j), j;
}
var Yi = {
        'x': 0x2,
        'y': 0x3
    },
    r3 = 0.4,
    Xi = class {
        constructor(c, d) {
            const CA = cX;
            this["ctx"] = c, this["atlas"] = d;
        } ["silhouettes"] = new Map();
        ["lastWorld"] = null;
        ["time"] = 0x0;
        ["map"];
        ["jumperId"] = -0x1;
        ["cheerTime"] = -0x1;
        get["viewSide"]() {
            const CB = cX;
            return this["lastWorld"]?.["viewSide"] ?? null;
        } ["spritesFor"](c, d) {
            const CC = cX;
            let g = Ef(this["atlas"], ct(c, d ?? this["lastWorld"]));
            return g[c['id'] % g["length"]];
        } ["drawActor"](c, d) {
            const CD = cX;
            let g = YT(c["prev"]['x'], c["pos"]['x'], d),
                j = YT(c["prev"]['y'], c["pos"]['y'], d),
                l = this["cheerTime"] >= 0x0 && c["alive"] && c["faction"] === this["viewSide"],
                m = Math["hypot"](c["vel"]['x'], c["vel"]['y']) > 0x4,
                p = l ? Math["floor"](this["cheerTime"] * 0x9) % u1 : m ? Math["floor"](c["walkPhase"] / 3.2) % u1 : 0x0,
                q = this["spritesFor"](c)[pn(c["angle"])][p];
            if (!c["alive"]) {
                this["drawCollapse"](c, q, g, j);
                return;
            }
            if (c["wounded"]) {
                this["drawWounded"](c, g, j);
                return;
            }
            this["drawFigure"](q, g, j - (l ? this["hopHeight"](c) : 0x0), this["wadeAt"](c)), this["rankPips"](c, g, j), this["dizzyStars"](c, g, j), this["alertMark"](c, g, j);
        } ["alertMark"](c, d, g) {
            const CE = cX;
            let j = c["exclaim"] ?? 0x0;
            if (j <= 0x0) return;
            let l = this["ctx"],
                m = j > f["enemy"]["alert"]["exclaim"] - 0.12 ? 0x1 : 0x0,
                p = Math["round"](g - d1['y']) - 0x9 - m,
                q = Math["round"](d);
            l["fillStyle"] = gT["shade"], l["fillRect"](q + 0x1, p, 0x1, 0x3), l["fillRect"](q + 0x1, p + 0x4, 0x1, 0x1), l["fillStyle"] = JW["white"], l["fillRect"](q, p, 0x1, 0x3), l["fillRect"](q, p + 0x4, 0x1, 0x1);
        } ["dizzyStars"](c, d, g) {
            const CF = cX;
            if (c["stagger"] <= f["flashbang"]["dizzyAbove"]) return;
            let j = Math["floor"](this["time"] * 0xa) % 0x8;
            for (let l = 0x0; l < 0x3; l++) {
                let m = (j + l * 2.67) % 0x8 / 0x8 * Math['PI'] * 0x2,
                    p = Math["round"](d + Math["cos"](m) * 0x5),
                    q = Math["round"](g - 0xd + Math["sin"](m) * 0x2);
                this["ctx"]["fillStyle"] = l === 0x1 ? JW["bone"] : JW["white"], this["ctx"]["fillRect"](p, q, 0x1, 0x1);
            }
        } ["rankPips"](c, d, g) {
            const CG = cX;
            if (c["faction"] !== this["viewSide"]) return;
            let j = ne(c["rank"] ?? 0x0);
            if (j < 0x1) return;
            let m = this["ctx"],
                p = Math["min"](0x3, j),
                q = Math["round"](g - d1['y']) - 0x5,
                u = Math["round"](d) - (p * 0x4 - 0x1) / 0x2;
            m["fillStyle"] = gT["shade"], m["fillRect"](u - 0x1, q - 0x1, p * 0x4, 0x3), m["fillStyle"] = j >= 0x5 ? TW["star"] : TW["starDim"];
            for (let v = 0x0; v < p; v++) {
                let y = u + v * 0x4;
                m["fillRect"](y, q, 0x1, 0x1), m["fillRect"](y + 0x1, q + 0x1, 0x1, 0x1), m["fillRect"](y + 0x2, q, 0x1, 0x1);
            }
        } ["drawCollapse"](g, j, m, p) {
            const CH = cX;
            let q = this["ctx"],
                v = Math["max"](0x0, Math["min"](0x1, g["deathTime"] / f['fx']["deathTime"]));
            if (v < r3) {
                let F = v < r3 / 0x2 ? 0x1 : 0x2,
                    H = Math["round"](m - d1['x']),
                    I = Math["round"](p - d1['y']) + F;
                q["drawImage"](this["silhouette"](j), H + Yi['x'], I + Yi['y']), q["drawImage"](j, H, I);
                return;
            }
            let y = Wi(this["atlas"], ct(g, this["lastWorld"])),
                A = y[T2(g['id'], y["length"])],
                C = Math["round"](m - A["width"] / 0x2),
                E = Math["round"](p - A["height"] + 0x4);
            if (TT[z(this["map"], Math["floor"](g["pos"]['x'] / this["map"]["tile"]), Math["floor"](g["pos"]['y'] / this["map"]["tile"]))]["swim"]) {
                let K = Math["min"](0x1, g["deathTime"] / f['fx']["deathTime"]),
                    L = Math["max"](0x0, Math["round"](A["height"] * (0x1 - K)));
                if (L <= 0x0) return;
                q["drawImage"](A, 0x0, A["height"] - L, A["width"], L, C, E + (A["height"] - L), A["width"], L);
                return;
            }
            q["drawImage"](A, C, E);
        } ["hopHeight"](c) {
            const CI = cX;
            let d = this["cheerTime"];
            if (c['id'] === this["jumperId"]) {
                let g = d * 1.7 % 0x1;
                return g > 0.55 ? 0x0 : Math["round"](Math["sin"](g / 0.55 * Math['PI']) * 0x6);
            }
            return Math["sin"](d * 0x7 + c['id'] * 1.3) > 0.4 ? 0x1 : 0x0;
        } ["drawWounded"](c, d, g) {
            const CJ = cX;
            let i = Mf(this["atlas"], ct(c, this["lastWorld"])),
                j = Math["sin"](this["time"] * 3.1 + c['id'] * 1.7) > 0.72 ? 0x1 : 0x0;
            this["ctx"]["drawImage"](i, Math["round"](d - i["width"] / 0x2) + j, Math["round"](g - i["height"] + 0x4));
        } ["wadeAt"](c) {
            const CK = cX;
            let d = Math["floor"](c["pos"]['x'] / this["map"]["tile"]),
                g = Math["floor"](c["pos"]['y'] / this["map"]["tile"]);
            return z(this["map"], d, g) === 0x29 ? "grass" : c["wading"] ? c["swimming"] ? "deep" : z(this["map"], Math["floor"](c["pos"]['x'] / this["map"]["tile"]), Math["floor"](c["pos"]['y'] / this["map"]["tile"])) === 0x9 ? "mud" : "water" : "none";
        } ["drawHostage"](c, d) {
            const CL = cX;
            let g = YT(c["prev"]['x'], c["pos"]['x'], d),
                j = YT(c["prev"]['y'], c["pos"]['y'], d),
                l = Math["hypot"](c["vel"]['x'], c["vel"]['y']) > 0x4 ? Math["floor"](c["walkPhase"] / 3.2) % u1 : 0x0;
            if (this["drawFigure"](this["atlas"]["hostage"][c['id'] % this["atlas"]["hostage"]["length"]][pn(c["angle"])][l], g, j, this["wadeAt"](c)), !c["freed"]) {
                let m = this["ctx"],
                    o = Math["sin"](this["time"] * 0x3) * 1.5;
                m["fillStyle"] = JW["paper"], m["fillRect"](Math["round"](g), Math["round"](j - 0x13 + o), 0x1, 0x4), m["fillRect"](Math["round"](g), Math["round"](j - 0xe + o), 0x1, 0x1);
            }
        } ["drawCritter"](c, d) {
            const CM = cX;
            let g = YT(c["prev"]['x'], c["pos"]['x'], d),
                i = YT(c["prev"]['y'], c["pos"]['y'], d),
                j = this["atlas"]["chicken"][c['id'] % this["atlas"]["chicken"]["length"]];
            if (!c["alive"]) {
                let m = this["atlas"]["chickenCorpse"][c['id'] % this["atlas"]["chickenCorpse"]["length"]];
                this["drawFigure"](m[c['id'] % m["length"]], g, i, "none", Ea);
                return;
            }
            let l = Math["hypot"](c["vel"]['x'], c["vel"]['y']) > 0x3 ? Math["floor"](c["walkPhase"] / 2.5) % 0x4 : c["state"] === 0x1 && Math["floor"](c["stateTime"] / 0.35) % 0x2 === 0x0 ? Ma : 0x0;
            this["drawFigure"](j[pn(c["angle"])][l], g, i, "none", Ea);
        } ["drawFigure"](j, q, A, C, F = d1) {
            const CN = cX;
            let H = this["ctx"],
                I = Math["round"](A - F['y']),
                K = Math["round"](q - F['x']);
            if (C === "none") {
                H["drawImage"](this["silhouette"](j), K + Yi['x'], I + Yi['y']), H["drawImage"](j, K, I);
                return;
            }
            if (C === "grass") {
                H["drawImage"](j, K, I);
                let {
                    clear: R
                } = Aa["grass"], S = D1(this["map"]["theme"])["canopy"];
                for (let U = 0x0; U < j["width"]; U++) {
                    let V = xT(K + U, 0x7);
                    if (V % 0x3 === 0x0) continue;
                    let X = I + R + (V >> 0x2 & 0x3),
                        Y = I + j["height"],
                        a7 = (V >> 0x4 & 0x3) * 0.4 - 0.6,
                        a8 = Math["max"](0x1, Y - X - 0x1);
                    for (let a9 = X; a9 < Y; a9++) {
                        let aj = 6.4 - (a9 - X) / a8 * 3.4 + a7;
                        H["fillStyle"] = SW(iW(S, aj, K + U, a9)), H["fillRect"](K + U, a9, 0x1, 0x1);
                    }
                }
                return;
            }
            let {
                visible: L,
                line: N,
                foam: P
            } = Aa[C];
            H["drawImage"](j, 0x0, 0x0, j["width"], L, K, I, j["width"], L), H["fillStyle"] = N, H["fillRect"](K, I + L, j["width"], 0x1), H["fillStyle"] = P, H["fillRect"](K + 0x1, I + L - 0x1, j["width"] - 0x2, 0x1);
            let Q = Math["round"](Math["sin"](this["time"] * 0x4 + q * 0.3));
            H["fillRect"](K + 0x3 + Q, I + L + 0x1, j["width"] - 0x6, 0x1);
        } ["silhouette"](c) {
            const CO = cX;
            return bt(c, this["silhouettes"], gT["void"]);
        }
    };

function k2(c, d) {
    const CP = cX;
    return c["callInsLeft"] <= 0x0 || c["callIn"] !== null || c["squadCallIn"] === "none" ? !0x1 : (c["callInsLeft"]--, c["callInsUsed"]++, c["callIn"] = {
        'kind': c["squadCallIn"],
        'at': {
            ...d
        },
        't': 0x0
    }, c["sounds"]["push"]({
        'kind': "plane"
    }), !0x0);
}

function s3(c) {
    const CQ = cX;
    let d = f["callin"],
        g = (c['t'] - d["dropAt"]) * d["planeSpeed"];
    return {
        'x': c['at']['x'] + g,
        'y': c['at']['y'] - d["altitude"] - g * l6
    };
}
var l6 = 0.51;

function a3(c) {
    const CR = cX;
    let d = f["callin"];
    if (c['t'] < d["dropAt"] || c['t'] >= d["dropAt"] + d["chuteTime"]) return -0x1;
    let g = (c['t'] - d["dropAt"]) / d["chuteTime"];
    return Math["round"](d["altitude"] * (0x1 - g));
}

function l3(c) {
    const CS = cX;
    let d = f["callin"];
    return Math["max"](0x0, Math["min"](0x1, (c['t'] - d["dropAt"]) / d["chuteTime"]));
}

function c3(c, d) {
    const CU = cX;
    let g = c["callIn"];
    if (!g) return;
    let i = f["callin"],
        j = g['t'];
    g['t'] += d;
    let l = i["dropAt"] + i["chuteTime"];
    j < l && g['t'] >= l && c6(c, g["kind"], g['at']), g['t'] >= i["done"] && (c["callIn"] = null);
}

function c6(c, d, g) {
    const CV = cX;
    let j = uT(c["map"], g);
    if (UT(c, j, c["levers"]["hearing"] * 0.6), d === "supplyDrop") {
        c["crates"]["push"]({
            'pos': {
                ...j
            },
            'alive': !0x0,
            'barrel': !0x1
        }), c['fx']["sparkle"](j, "#ffd24a");
        return;
    }
    if (d === "airstrike") {
        se(c, j, f["callin"]["bombRadius"], D["Player"]), c['fx']["shake"](f['fx']["screenShake"]), c["sounds"]["push"]({
            'kind': "airstrike",
            'at': j
        });
        return;
    }
    for (let l = 0x0; l < c["reserves"]["length"]; l++) {
        let m = c["reserves"][l],
            p = uT(c["map"], {
                'x': j['x'] + l * 0xe - 0x7,
                'y': j['y'] + 0x6
            });
        c["soldiers"]["push"](_1(c, p, c["squadWeapon"], m));
    }
    c["reserves"] = [], x1(c);
}
var d3 = {
        'A': ".#./#.#/###/#.#/#.#",
        'B': "##./#.#/##./#.#/##.",
        'C': ".##/#../#../#../.##",
        'D': "##./#.#/#.#/#.#/##.",
        'E': "###/#../##./#../###",
        'F': "###/#../##./#../#..",
        'G': ".##/#../#.#/#.#/.##",
        'H': "#.#/#.#/###/#.#/#.#",
        'I': "###/.#./.#./.#./###",
        'J': "..#/..#/..#/#.#/.#.",
        'K': "#.#/#.#/##./#.#/#.#",
        'L': "#../#../#../#../###",
        'M': "#.#/###/###/#.#/#.#",
        'N': "#.#/##./###/.##/#.#",
        'O': ".#./#.#/#.#/#.#/.#.",
        'P': "##./#.#/##./#../#..",
        'Q': ".#./#.#/#.#/##./.##",
        'R': "##./#.#/##./#.#/#.#",
        'S': ".##/#../.#./..#/##.",
        'T': "###/.#./.#./.#./.#.",
        'U': "#.#/#.#/#.#/#.#/###",
        'V': "#.#/#.#/#.#/#.#/.#.",
        'W': "#.#/#.#/###/###/#.#",
        'X': "#.#/#.#/.#./#.#/#.#",
        'Y': "#.#/#.#/.#./.#./.#.",
        'Z': "###/..#/.#./#../###",
        0x0: "###/#.#/#.#/#.#/###",
        0x1: ".#./##./.#./.#./###",
        0x2: "##./..#/.#./#../###",
        0x3: "##./..#/.#./..#/##.",
        0x4: "#.#/#.#/###/..#/..#",
        0x5: "###/#../##./..#/##.",
        0x6: ".##/#../###/#.#/###",
        0x7: "###/..#/.#./#../#..",
        0x8: "###/#.#/###/#.#/###",
        0x9: "###/#.#/###/..#/##.",
        '+': ".../.#./###/.#./...",
        '-': ".../.../###/.../...",
        '!': ".#./.#./.#./.../.#.",
        '.': ".../.../.../.../.#.",
        ':': ".../.#./.../.#./...",
        '\x20': ".../.../.../.../..."
    },
    d6 = 0x7,
    u6 = 0x100,
    Ji = new Map(),
    m6 = c => c["length"] * 0x4 - 0x1 + 0x2;

function u3(g, j, m = "#12180c") {
    const CX = cX;
    let p = g + '|' + j + '|' + m,
        q = Ji["get"](p);
    if (q) return q;
    let u = [...g["toUpperCase"]()],
        v = document["createElement"]("canvas");
    v["width"] = m6(g), v["height"] = d6;
    let y = v["getContext"]('2d');
    y["imageSmoothingEnabled"] = !0x1;
    let A = [];
    u["forEach"]((C, E) => {
        const CY = CX;
        let F = (d3[C] ?? d3['\x20'])[CY(0xf4c)]('/'),
            H = 0x1 + E * 0x4;
        for (let I = 0x0; I < 0x5; I++)
            for (let K = 0x0; K < 0x3; K++) F[I][K] === '#' && A[CY(0xc0f)]([H + K, 0x1 + I]);
    }), y["fillStyle"] = m;
    for (let [C, E] of A)
        for (let F = -0x1; F <= 0x1; F++)
            for (let H = -0x1; H <= 0x1; H++) y["fillRect"](C + H, E + F, 0x1, 0x1);
    y["fillStyle"] = j;
    for (let [I, K] of A) y["fillRect"](I, K, 0x1, 0x1);
    return Ji["size"] >= u6 && Ji["clear"](), Ji["set"](p, v), v;
}
var Zi = class W {
    constructor(c, d) {
        const CZ = cX;
        this["ctx"] = c, this["atlas"] = d;
    } ["shadows"] = new Map();
    static["SLANT"] = {
        'x': 0.1,
        'y': 0.15
    };
    ["drawEffect"](c, d, g, j, l) {
        const D5 = cX;
        let m = c[Tf(j, c["length"], l)];
        if (!m) return;
        let p = Math["max"](0x1, Math["ceil"](g * 0x2 / m["width"])),
            q = m["width"] * p,
            u = m["height"] * p;
        this["ctx"]["drawImage"](m, Math["round"](d['x'] - q / 0x2), Math["round"](d['y'] - u / 0x2), q, u);
    } ["drawCloud"](c) {
        const D7 = cX;
        this["drawEffect"](this["atlas"]["smokeAnim"], c["pos"], c["radius"], 0x1 - c["life"] / c["maxLife"], nf);
    } ["drawBangs"](c) {
        const D8 = cX;
        for (let d of c['fx']["bangs"]) this["drawEffect"](this["atlas"]["flashAnim"], d["pos"], d["radius"], 0x1 - d["life"] / d["maxLife"], sf);
    } ["drawBlasts"](c) {
        const D9 = cX;
        for (let d of c['fx']["blasts"]) {
            if (d["delay"] > 0x0) continue;
            let {
                r: g
            } = vh(0x1 - d["life"] / d["maxLife"], d["full"], d["scale"]);
            g < 0x1 || this["drawEffect"](this["atlas"]["blastAnim"], d["pos"], g, 0x1 - d["life"] / d["maxLife"]);
        }
    } ["blood"] = "normal";
    ["drawParticles"](c) {
        const Dd = cX;
        let d = this["ctx"],
            g = j => j === CT["blood"]["dark"] || j === CT["blood"]["light"] || j === CT["blood"]["bone"];
        for (let j of c['fx']["particles"]) {
            let l = j["life"] / j["maxLife"],
                m = l > 0.55 ? j["size"] : l > 0.22 ? Math["max"](0x1, j["size"] - 0x1) : 0x1;
            if (this["blood"] !== "normal" && g(j["color"])) {
                if (this["blood"] === "none") continue;
                m += 0x1;
            }
            d["fillStyle"] = j["color"], d["fillRect"](Math["round"](j["pos"]['x']), Math["round"](j["pos"]['y']), m, m);
        }
    } ["drawBirds"](c) {
        const Dj = cX;
        let d = this["ctx"];
        for (let g of c['fx']["birds"]) {
            if (g["delay"] > 0x0) continue;
            let i = this["atlas"]["birds"][g["look"]][gh(g)];
            d["drawImage"](i, Math["round"](g["pos"]['x'] - i["width"] / 0x2), Math["round"](g["pos"]['y'] - i["height"] / 0x2));
        }
    } ["drawMuzzleFlashes"](c) {
        const Dk = cX;
        let d = this["ctx"],
            g = this["atlas"]["muzzle"];
        for (let i of c['fx']["flashes"]) d["drawImage"](g, Math["round"](i["pos"]['x'] - 0x3), Math["round"](i["pos"]['y'] - 0x3));
    } ["drawBullets"](c) {
        const Dq = cX;
        let d = this["ctx"];
        d["lineWidth"] = 0x1;
        for (let g of c["bullets"]) {
            if (g["blast"] > 0x0) {
                d["fillStyle"] = gT["stone"], d["fillRect"](Math["round"](g["pos"]['x'] - g["vel"]['x'] * 0.03), Math["round"](g["pos"]['y'] - g["vel"]['y'] * 0.03), 0x2, 0x2), d["fillStyle"] = TW["label"], d["fillRect"](Math["round"](g["pos"]['x'] - 0x1), Math["round"](g["pos"]['y'] - 0x1), 0x3, 0x3);
                continue;
            }
            let j = g["pos"]['x'] - g["vel"]['x'] * 0.012,
                l = g["pos"]['y'] - g["vel"]['y'] * 0.012;
            d["fillStyle"] = g["faction"] === c["viewSide"] ? TW["friendly"] : TW["hostile"];
            for (let m = 0x1; m <= 0x3; m++) {
                let p = m / 0x4;
                d["fillRect"](Math["round"](j + (g["pos"]['x'] - j) * p), Math["round"](l + (g["pos"]['y'] - l) * p), 0x1, 0x1);
            }
            d["fillStyle"] = TW["ink"], d["fillRect"](Math["round"](g["pos"]['x']), Math["round"](g["pos"]['y']), 0x1, 0x1);
        }
    } ["drawGrenades"](c, d) {
        const Dr = cX;
        let g = this["ctx"];
        for (let j of c["grenades"]) {
            let l = YT(j["prev"]['x'], j["pos"]['x'], d),
                m = YT(j["prev"]['y'], j["pos"]['y'], d),
                p = jn(j['t']);
            Pn(g, l, m, 2.5, 1.4, gT["night"]), g["fillStyle"] = gT["stone"], g["fillRect"](Math["round"](l - 0x1), Math["round"](m - p - 0x2), 0x3, 0x3), g["fillStyle"] = TW["starDim"], g["fillRect"](Math["round"](l), Math["round"](m - p - 0x3), 0x1, 0x1);
        }
    } ["drawPopups"](c) {
        const Dv = cX;
        let d = this["ctx"];
        for (let g of c['fx']["popups"]) {
            let j = 0x1 - g["life"] / g["maxLife"],
                m = f['fx']["popupRise"] * (0x1 - (0x1 - j) * (0x1 - j)),
                p = g["icon"] ? this["atlas"]["icons"][g["icon"]] : null,
                q = u3(g["text"], g["color"]),
                u = q["width"] + (p ? p["width"] + 0x1 : 0x0),
                v = Math["round"](g["pos"]['x'] - u / 0x2),
                y = Math["round"](g["pos"]['y'] - m);
            p ? (d["drawImage"](p, v, y - Math["round"]((p["height"] - q["height"]) / 0x2)), d["drawImage"](q, v + p["width"] + 0x1, y)) : d["drawImage"](q, v, y);
        }
    } ["drawCallIn"](j) {
        const Dw = cX;
        let q = j["callIn"];
        if (!q) return;
        let A = this["ctx"],
            C = s3(q),
            F = Math["floor"](performance["now"]() / 0x2d) % un,
            H = this["atlas"]["plane"][F],
            I = f["callin"]["altitude"],
            K = bt(H, this["shadows"], gT["night"]);
        A["drawImage"](K, Math["round"](C['x'] - H["width"] / 0x2 + I * W["SLANT"]['x']), Math["round"](q['at']['y'] - H["height"] / 0x2 + I * W["SLANT"]['y'])), A["drawImage"](H, Math["round"](C['x'] - H["width"] / 0x2), Math["round"](C['y'] - H["height"] / 0x2));
        let L = a3(q);
        if (L < 0x0) return;
        if (q["kind"] === "airstrike") {
            let X = this["atlas"]["crate"],
                Y = 0x1 - L / (f["callin"]["altitude"] || 0x1);
            for (let a7 = -0x1; a7 <= 0x1; a7++) {
                let a8 = (0x1 - Math["max"](0x0, Math["min"](0x1, Y))) * 0x1a,
                    a9 = Math["round"](q['at']['x'] + a7 * (0x16 + a8) - X["width"] / 0x2),
                    aj = Math["round"](q['at']['y'] - L - X["height"]);
                A["drawImage"](X, a9, aj);
            }
            return;
        }
        let N = l3(q),
            P = Math["round"](Math["sin"](q['t'] * 3.1) * 0x6 * (0x1 - N * 0.6)),
            Q = this["atlas"]["parachute"],
            R = q["kind"] === "supplyDrop" ? this["atlas"]["crate"] : Q,
            S = Math["max"](0x1, R["width"] / 0x2 * (0.35 + 0.65 * N));
        Pn(A, Math["round"](q['at']['x']), Math["round"](q['at']['y']), S, Math["max"](0x1, S * 0.4), gT["night"]);
        let U = Math["round"](q['at']['x'] + P - Q["width"] / 0x2),
            V = Math["round"](q['at']['y'] - L - Q["height"]);
        if (A["drawImage"](Q, U, V), q["kind"] === "supplyDrop") {
            let ak = this["atlas"]["crate"];
            A["drawImage"](ak, Math["round"](q['at']['x'] + Math["round"](P / 0x2) - ak["width"] / 0x2), V + Q["height"] + 0x1);
        }
    }
};

function m3(c) {
    const Dx = cX;
    let d = f["onboarding"];
    return c["difficulty"] !== "rookie" || c["map"]["objective"] !== "eliminate" || c["time"] < d["arrowsAfter"] ? !0x1 : c["enemyTotal"] - c["kills"] <= d["arrowsBelow"];
}
var Qi = class {
        constructor(c, d) {
            const Dz = cX;
            this["ctx"] = c, this["atlas"] = d;
        } ["time"] = 0x0;
        ["guideArrows"] = new Map();
        ["drawAim"](c, d, g) {
            const DA = cX;
            if (d["mode"] === "idle") return;
            let j = this["ctx"],
                l = 0x1 / g;
            if (d["mode"] === "fire") {
                if (!hT(c)) return;
                o3(this["ctx"], d["point"], Qo["crosshair"], gT["night"]);
                return;
            }
            if (d["mode"] === "callin") {
                let q = f["callin"]["bombRadius"];
                In(j, d["point"], q, l, XW["ember"], !0x0), In(j, d["point"], q - 0x1, l, XW["ember"], !0x0), x2(j, d["point"], 0x9 * l, l, XW["ember"]);
                return;
            }
            if (!d["placed"]) return;
            let m = d["friendly"] || d["blocked"],
                p = m ? XW["ember"] : d["clamped"] ? Qo["clamped"] : Qo["ready"];
            In(this["ctx"], d["point"], f["grenade"]["blastRadius"], l, p, m), d["thrower"] && (i3(this["ctx"], d["thrower"]["pos"], d["point"], l, p), In(j, d["thrower"]["pos"], 0x7, l, p, !0x1)), x2(this["ctx"], d["point"], 0x9 * l, l, p);
        } ["drawExtractionZones"](c) {
            const DB = cX;
            if (c["extraction"]["length"] !== 0x0)
                for (let d of c["extraction"]) {
                    let g = d["pad"] + f["extraction"]["radius"],
                        i = Math["round"](d['x']),
                        j = Math["round"](d['y']);
                    zi(this["ctx"], i, j, g, {
                        'tones': [gT["soil"], JW["brass"], JW["brassLit"]],
                        'dash': [0x3, 0x2],
                        'drift': Math["floor"](this["time"] * 0.6 * 0x8),
                        'jitter': !0x0,
                        'ticks': {
                            'len': 0x4,
                            'tones': [gT["soil"], JW["brassLit"]]
                        }
                    });
                }
        } ["drawOrderMarker"](c) {
            const DC = cX;
            if (!c["orderGoal"] || c["orderMarker"] <= 0x0) return;
            let d = 0x1 - c["orderMarker"] / f["soldier"]["orderMarkerTime"],
                g = c["squadTarget"] || c["targetBuilding"] ? Ca["attack"] : Ca["move"],
                i = d < 0.4 ? 0x0 : d < 0.75 ? 0x1 : 0x2,
                j = i === 0x0 ? [gT["bark"], g[0x0]] : [g[i]];
            zi(this["ctx"], c["orderGoal"]['x'], c["orderGoal"]['y'], Math["round"](0x3 + d * 0xb), {
                'tones': j,
                'jitter': !0x1
            });
        } ["drawTargetMarkers"](c, d) {
            const DE = cX;
            let g = (m, p, q, u) => {
                    const DD = b;
                    zi(this["ctx"], Math["round"](m), Math["round"](p), q, {
                        'tones': [gT["ash"], u],
                        'ticks': {
                            'len': 0x3,
                            'tones': [gT["ash"], u]
                        }
                    });
                },
                j = c["squadTarget"];
            if (j?.["alive"]) {
                let m = (this["time"] * 0x6 | 0x0) % 0x4 === 0x0 ? 0x1 : 0x0;
                g(YT(j["prev"]['x'], j["pos"]['x'], d), YT(j["prev"]['y'], j["pos"]['y'], d) - 0x6, 0xb + m, XW["body"]);
            }
            let l = c["targetBuilding"];
            l?.["standing"] && g(l["centre"]['x'], l["centre"]['y'], l['w'] * 0x8 + 0x3, XW["flame"]);
        } ["drawMineFuses"](c) {
            const DF = cX;
            let d = this["ctx"];
            for (let g of c["mines"]) {
                if (!g["alive"] || g["fuse"] < 0x0) continue;
                let i = 0x1 - g["fuse"] / f["mine"]["fuse"],
                    j = Math["floor"](this["time"] * 0x12) % 0x2 === 0x0;
                n3(this["ctx"], g["pos"], f["mine"]["blastRadius"] * i, j ? XW["hot"] : XW["cold"]), d["fillStyle"] = j ? XW["core"] : XW["body"], d["fillRect"](Math["round"](g["pos"]['x']) - 0x1, Math["round"](g["pos"]['y']) - 0x4, 0x2, 0x1);
            }
        } ["drawCratePulses"](c) {
            const DG = cX;
            let d = this["ctx"];
            for (let g of c["crates"]) {
                if (!g["alive"] || g["barrel"]) continue;
                let i = this["atlas"]["crate"];
                d["fillStyle"] = Math["sin"](this["time"] * 0x3) > 0x0 ? JW["warm"] : JW["brass"], d["fillRect"](Math["round"](g["pos"]['x'] - 0x2), Math["round"](g["pos"]['y'] - i["height"] + 0x1), 0x4, 0x1);
            }
        } ["guideArrow"](c, d) {
            const DH = cX;
            let g = this["guideArrows"]["get"](c);
            if (!g) {
                g = [];
                for (let i = 0x0; i < 0x10; i++) g["push"](jp(c, i * Math['PI'] * 0x2 / 0x10));
                this["guideArrows"]["set"](c, g);
            }
            return g[d];
        } ["drawOffscreen"](j, q, A, C, E, F, H) {
            const DI = cX;
            let I = this["ctx"],
                K = 0x1 / A,
                L = Math["max"](0x12, 0xe * K),
                M = C + L,
                N = E + L,
                P = F - L,
                Q = H - L,
                R = (C + F) / 0x2,
                S = (E + H) / 0x2,
                U = (X, Y) => {
                    const DJ = DI;
                    let a7 = Math[DJ(0xbba)](M, Math[DJ(0x220)](P, X['x'])),
                        a8 = Math[DJ(0xbba)](N, Math[DJ(0x220)](Q, X['y'])),
                        a9 = Math[DJ(0x1359)](X['y'] - S, X['x'] - R),
                        aj = (Math[DJ(0x4b7)](a9 * 0x10 / (Math['PI'] * 0x2)) % 0x10 + 0x10) % 0x10,
                        ak = this[DJ(0x2c0)](Y, aj),
                        aq = aj * Math['PI'] * 0x2 / 0x10,
                        aw = [0x0, 0x2, 0x4, 0x2][(this[DJ(0x1558)] * 0x5 | 0x0) % 0x4];
                    I[DJ(0x1456)](ak, Math[DJ(0x4b7)](a7 + Math[DJ(0x11a1)](aq) * aw - ak[DJ(0xf40)] / 0x2), Math[DJ(0x4b7)](a8 + Math[DJ(0x20f)](aq) * aw - ak[DJ(0xb54)] / 0x2));
                },
                V = X => X['x'] < M || X['x'] > P || X['y'] < N || X['y'] > Q;
            if (!j["map"]["arena"]) {
                if (j["map"]["guide"] === "extraction") {
                    for (let X of j["extraction"]) V(X) && U(X, TW["extraction"]);
                }
                if (m3(j)) {
                    for (let Y of j["enemies"]) Y["alive"] && V(Y["pos"]) && U(Y["pos"], TW["hostile"]);
                }
            }
        }
    },
    p3 = 0.45,
    p6 = 0x9,
    Tr = class {
        constructor(c, d) {
            const DK = cX;
            this["ctx"] = c, this["atlas"] = d, this["bunkerSet"] = [d["bunker"], d["bunker"], d["bunker"], d["bunker"]];
        } ["time"] = 0x0;
        ["huts"] = [];
        ["struck"] = new Map();
        ["bunkerSet"];
        ["drawScenery"](c, d) {
            const DL = cX;
            let g = this["ctx"];
            if (d) {
                let m = d,
                    p = this["buildingSet"](m, this["huts"]),
                    q = p[m["standing"] ? Math["min"](0x2, m["damageStage"]) : 0x3];
                if (g["drawImage"](q, Math["round"](c['x']), Math["round"](c['y'])), !m["standing"] && m["ruinAge"] < p3) {
                    let u = m["ruinAge"] / p3,
                        v = Math["round"]((0x1 - (0x1 - u) * (0x1 - u)) * p6);
                    (u < 0.66 || Math["floor"](this["time"] * 0x18) % 0x2 === 0x0) && g["drawImage"](p[0x0], Math["round"](c['x']), Math["round"](c['y']) - v);
                }
                if (m["standing"] && m["flash"] > 0.7 && g["drawImage"](bt(q, this["struck"], TW["guide"]), Math["round"](c['x']), Math["round"](c['y'])), m["standing"] && m['hp'] < m["maxHp"]) {
                    let y = m['w'] * 0x10 - 0x4,
                        A = Math["round"](m['x0'] * 0x10 + 0x2),
                        C = Math["round"](c['y'] - 0x4);
                    g["fillStyle"] = TW["plateDark"], g["fillRect"](A, C, y, 0x2), g["fillStyle"] = TW["plateBrass"], g["fillRect"](A, C, Math["max"](0x1, Math["round"](y * m['hp'] / m["maxHp"])), 0x2);
                }
                return;
            }
            let j = c["phase"] === void 0x0 ? 0x0 : this["windOffset"](c['x'], c['y'], c["phase"]);
            g["drawImage"](c["sprite"], Math["round"](c['x'] + j), Math["round"](c['y']));
        } ["drawMine"](c, d = !0x1) {
            const DM = cX;
            if (d) {
                this["ctx"]["fillStyle"] = va, this["ctx"]["fillRect"](Math["round"](c["pos"]['x']) - 0x1, Math["round"](c["pos"]['y']) - 0x3, 0x1, 0x1);
                return;
            }
            let g = this["atlas"]["mine"];
            this["ctx"]["drawImage"](g, Math["round"](c["pos"]['x'] - g["width"] / 0x2), Math["round"](c["pos"]['y'] - g["height"] + 0x2));
        } ["drawCrate"](c) {
            const DN = cX;
            let d = this["ctx"],
                g = c["barrel"] ? this["atlas"]["barrel"] : this["atlas"]["crate"];
            Pn(d, c["pos"]['x'], c["pos"]['y'] + 0x3, 5.5, 2.4, gT["night"]), d["drawImage"](g, Math["round"](c["pos"]['x'] - g["width"] / 0x2), Math["round"](c["pos"]['y'] - g["height"] + 0x3));
        } ["drawSupply"](c) {
            const DO = cX;
            let d = this["ctx"],
                g = this["atlas"]["supply"],
                i = Math["round"](c["pos"]['x'] - g["width"] / 0x2),
                j = Math["round"](c["pos"]['y'] - g["height"] + 0x3);
            d["fillStyle"] = gT["moss"], d["fillRect"](i + 0x1, Math["round"](c["pos"]['y']) + 0x1, g["width"] - 0x2, 0x2), d["drawImage"](g, i, j);
        } ["drawPackage"](c) {
            const DP = cX;
            let d = this["ctx"],
                g = this["atlas"]["package"],
                i = Math["round"](c["pos"]['x']),
                j = Math["round"](c["pos"]['y']);
            d["fillStyle"] = gT["night"], d["fillRect"](i - 0x3, j + 0x1, 0x6, 0x1), d["fillRect"](i - 0x2, j + 0x2, 0x4, 0x1), d["drawImage"](g, Math["round"](c["pos"]['x'] - g["width"] / 0x2), j - g["height"] + 0x2);
        } ["windOffset"](c, d, g) {
            const DQ = cX;
            let j = f["wind"],
                l = Math["sin"]((c + d) * j["gustScale"] + this["time"] * j["gustSpeed"]),
                m = Math["sin"](this["time"] * j["speed"] + g);
            return Math["round"](m * j["amplitude"] * (0.65 + l * 0.35));
        } ["viewSide"] = D["Player"];
        ["buildingSet"](c, d) {
            const DR = cX;
            return c["kind"] === "factory" ? this["atlas"]["factory"] : c["kind"] === "outpost" ? this["atlas"]["outpost"] : c["kind"] === "bunker" ? this["bunkerSet"] : c["owner"] === this["viewSide"] && d === this["atlas"]["hut"] ? this["atlas"]["hutAllied"] : d;
        }
    },
    Wr = class {
        constructor(c) {
            const DS = cX;
            this["ctx"] = c;
        } ["time"] = 0x0;
        ["tiles"] = [];
        ["shore"] = null;
        ["draw"](c, d, g, i, j) {
            const DT = cX;
            this["drawShimmer"](c, d, g, i, j), this["drawShoreline"](c, d, g, i, j);
        } ["drawShimmer"](g, j, m, p, q) {
            const DU = cX;
            let v = this["ctx"],
                y = g["map"]["tile"];
            v["fillStyle"] = pf(g["map"]["theme"]);
            for (let [A, C] of this["tiles"]) {
                let E = A * y,
                    F = C * y;
                if (E > p || E + y < j || F > q || F + y < m) continue;
                let H = (A * 0.7 + C * 1.3) % (Math['PI'] * 0x2),
                    I = Math["sin"](this["time"] * 1.6 + H);
                I > 0.2 && v["fillRect"](E + 0x3 + (I * 0x3 | 0x0), F + 0x4, 0x4, 0x1), I < -0.3 && v["fillRect"](E + 0x8 - (I * 0x3 | 0x0), F + 0xb, 0x3, 0x1);
            }
        } ["drawShoreline"](c, d, g, j, l) {
            const DV = cX;
            let m = this["shore"];
            if (!m) return;
            let p = ff(c["map"]["theme"]);
            this["washOver"](m["wet"], p["fringe"], d, g, j, l), this["washOver"](m["shelf"], p["shallow"], d, g, j, l);
        } ["washOver"](g, j, q, v, y, A) {
            const DX = cX;
            let C = this["ctx"],
                {
                    wetAt: E,
                    reachAt: F
                } = f["shore"],
                H = this["time"],
                I = -0x1;
            for (let K = 0x0; K < g['x']["length"]; K++) {
                let L = g['x'][K],
                    M = g['y'][K];
                if (L < q - 0x1 || L > y + 0x1 || M < v - 0x1 || M > A + 0x1) continue;
                let N = (H / g["period"][K] + g["phase"][K]) % 0x1;
                if (N < E) continue;
                let P = N < F ? g["wet"][K] : g["deep"][K];
                P !== I && (C["fillStyle"] = j[P], I = P), C["fillRect"](L, M, 0x1, 0x1);
            }
        }
    };

function er(c) {
    const DY = cX;
    c && (c["width"] = 0x0, c["height"] = 0x0);
}
var tr = class {
        constructor(c) {
            const DZ = cX;
            this["ctx"] = c, (this["figures"] = new Xi(c, this["atlas"]), this["effects"] = new Zi(c, this["atlas"]), this["markers"] = new Qi(c, this["atlas"]), this["props"] = new Tr(c, this["atlas"]), this["water"] = new Wr(c));
        } ["atlas"] = Cf();
        ["terrain"];
        ["info"];
        ["canopy"] = null;
        ["decalLayer"];
        ["figures"];
        ["effects"];
        ["markers"];
        ["props"];
        ["scenery"] = [];
        ["water"];
        ["drawList"] = [];
        ["liveBuildings"] = new Map();
        ["fogMask"];
        ["fogCtx"];
        ["fogPixels"];
        ["fogDrawn"] = -0x1;
        ["time"] = 0x0;
        ["bakeGround"](c) {
            const E1 = cX;
            this["beginTerrain"](c);
            let d = this["terrain"]["getContext"]('2d');
            return this["figures"]["map"] = c, this["info"] = no(c), d;
        } ["bakeSurface"](c, d) {
            const E5 = cX;
            let g = m0(c, d, this["info"]);
            this["water"]["tiles"] = g["waterTiles"], this["water"]["shore"] = g["shore"];
        } ["bakeTrees"](c, d) {
            const E7 = cX;
            let g = a0(d, this["info"]);
            g["shadow"] && c["drawImage"](g["shadow"], 0x0, 0x0), g["understorey"] && c["drawImage"](g["understorey"], 0x0, 0x0);
            let i = this["canopy"];
            this["canopy"] = g["layer"], er(i), er(g["shadow"]), er(g["understorey"]);
        } ["prepare"](c, d) {
            const E8 = cX;
            let g = this["bakeGround"](c);
            this["bakeSurface"](g, c), this["bakeTrees"](g, c), this["scenery"] = this["collectScenery"](c, d, g), this["endTerrain"](c);
        }
        async ["prepareStaged"](c, d, g) {
            const E9 = cX;
            await g("reading the ground");
            let i = this["bakeGround"](c);
            await g("painting the ground"), this["bakeSurface"](i, c), await g("growing the trees"), this["bakeTrees"](i, c), await g("putting it in place"), this["scenery"] = this["collectScenery"](c, d, i), this["endTerrain"](c);
        } ["beginTerrain"](c) {
            const Ej = cX;
            let d = this["terrain"];
            this["terrain"] = document["createElement"]("canvas"), this["terrain"]["width"] = c["pixelWidth"], this["terrain"]["height"] = c["pixelHeight"], this["terrain"]["getContext"]('2d')["imageSmoothingEnabled"] = !0x1, er(d);
        } ["clearDecals"]() {
            const Ek = cX;
            this["decalLayer"]["clear"]();
        } ["blood"] = "normal";
        ["setBlood"](c) {
            const Eq = cX;
            this["blood"] = c, this["effects"]["blood"] = c, this["decalLayer"] && (this["decalLayer"]["blood"] = c);
        } ["endTerrain"](c) {
            const Ew = cX;
            let d = this["decalLayer"];
            this["decalLayer"] = new yi(c["pixelWidth"], c["pixelHeight"], this["atlas"]), d?.["dispose"](), this["decalLayer"]["blood"] = this["blood"], this["fogMask"] = document["createElement"]("canvas"), this["fogMask"]["width"] = c["width"], this["fogMask"]["height"] = c["height"], this["fogCtx"] = this["fogMask"]["getContext"]('2d'), this["fogPixels"] = this["fogCtx"]["createImageData"](c["width"], c["height"]), this["fogDrawn"] = -0x1;
        } ["collectScenery"](j, q, A) {
            const Ex = cX;
            let F = [],
                H = j["tile"],
                I = this["atlas"]["grassTufts"][j["theme"]] ?? this["atlas"]["grassTufts"]["jungle"],
                K = mf(j["theme"]),
                L = (Q, R, S, U) => {
                    const Ez = Ex;
                    A[Ez(0xac2)] = K;
                    for (let V = Math[Ez(0x4b7)](R - U); V <= R + U; V++) {
                        let X = (V - R) / U,
                            Y = Math[Ez(0x6c2)](Math[Ez(0xbba)](0x0, 0x1 - X * X)) * S;
                        for (let a7 = Math[Ez(0x4b7)](Q - Y); a7 <= Q + Y; a7++) {
                            let a8 = 0x1 - Math[Ez(0x12b2)]((a7 - Q) / S, X);
                            qW(a7, V) > a8 * 1.15 || A[Ez(0xed5)](a7, V, 0x1, 0x1);
                        }
                    }
                },
                N = new Set();
            for (let Q of q["buildings"])
                for (let [R, S] of Q["tiles"]) N["add"](R + ',' + S);
            for (let U = 0x0; U < j["height"]; U++)
                for (let V = 0x0; V < j["width"]; V++) {
                    let X = z(j, V, U),
                        Y = V * H + H / 0x2,
                        a7 = (U + 0x1) * H,
                        a8 = n1(V * 0x83 + U * 0x3d1),
                        a9 = pp[X];
                    if (X === 0x16 && (a9 = fp(z(j, V, U - 0x1) === X, z(j, V, U + 0x1) === X, z(j, V + 0x1, U) === X, z(j, V - 0x1, U) === X)), a9) {
                        let aj = !!Yr[X];
                        if (aj && (z(j, V - 0x1, U) === X || z(j, V, U - 0x1) === X)) continue;
                        let ak = this["atlas"]["mapObjects"][j["theme"]][a9],
                            aq = ak[xT(V, U) % ak["length"]],
                            aw = a7 + (aj ? H : 0x0),
                            ax = Math["round"](Y + (aj ? H / 0x2 : 0x0) - aq["width"] / 0x2),
                            az = aw - aq["height"];
                        X === 0x20 ? A["drawImage"](aq, ax, az) : F["push"]({
                            'sprite': aq,
                            'x': ax,
                            'y': az,
                            'sortY': aw - qm
                        });
                    } else {
                        if (X === 0x2) continue;
                        if (X === 0x8) continue;
                        if (X === 0x5) continue;
                        if (X === 0xf) {
                            let aA = this["atlas"]["tent"];
                            if (z(j, V - 0x1, U) === 0xf || z(j, V, U - 0x1) === 0xf) continue;
                            L(Y + H / 0x2 + 0x2, a7 + H - 0x5, 0xc, 0x4), F["push"]({
                                'sprite': aA,
                                'x': Y + H / 0x2 - aA["width"] / 0x2,
                                'y': a7 + H - aA["height"] + 0x2,
                                'sortY': a7 + H - 0x6
                            });
                        } else {
                            if (!N["has"](V + ',' + U) && !TT[X]["solid"] && X === 0x0 && a8() < 0.09) {
                                let aB = I[xT(V, U) % I["length"]];
                                F["push"]({
                                    'sprite': aB,
                                    'x': Y - aB["width"] / 0x2 + Math["round"](a8() * 0x6 - 0x3),
                                    'y': a7 - aB["height"] - Math["round"](a8() * 0x6),
                                    'sortY': a7 - 0x8,
                                    'phase': (V * 2.1 + U * 1.1) % (Math['PI'] * 0x2)
                                });
                            }
                        }
                    }
                }
            let P = j["theme"] === "arctic" ? this["atlas"]["cabin"] : this["atlas"]["hut"];
            this["props"]["huts"] = P;
            for (let aC of q["buildings"]) {
                let aD = this["props"]["buildingSet"](aC, P)[0x0],
                    aE = (aC['x0'] + aC['w'] / 0x2) * H,
                    aF = (aC['y0'] + aC['h']) * H;
                L(aE + aC['w'] * 0x3, aF - 0x1, aC['w'] * 7.5, aC['h'] * 3.5), F["push"]({
                    'sprite': aD,
                    'x': aE - aD["width"] / 0x2,
                    'y': aF - aD["height"] + 0x3,
                    'sortY': aF - 0x5,
                    'buildingId': aC['id']
                });
            }
            return F;
        }
        get["windTime"]() {
            const EA = cX;
            return this["time"];
        } ["draw"](j, q, A, C, E) {
            const EB = cX;
            if (this["figures"]["lastWorld"] = j, this["figures"]["time"] = this["time"], this["markers"]["time"] = this["time"], this["props"]["time"] = this["time"], this["water"]["time"] = this["time"], this["props"]["viewSide"] = j["viewSide"], this["time"] += C, this["decalLayer"]["flush"](j, C), this["figures"]["cheerTime"] = j["phase"] === 0x1 ? j["phaseTime"] : -0x1, this["figures"]["cheerTime"] >= 0x0 && this["figures"]["jumperId"] < 0x0) {
                let V = j["soldiers"]["filter"](X => X["alive"]);
                this["figures"]["jumperId"] = V["length"] ? Math["min"](...V["map"](X => X['id'])) : -0x1;
            } else this["figures"]["cheerTime"] < 0x0 && (this["figures"]["jumperId"] = -0x1);
            let F = this["ctx"],
                H = q["zoom"],
                I = q["offsetX"],
                K = q["offsetY"];
            F["imageSmoothingEnabled"] = !0x1, F["setTransform"](0x1, 0x0, 0x0, 0x1, 0x0, 0x0), F["fillStyle"] = gT["ground"], F["fillRect"](0x0, 0x0, F["canvas"]["width"], F["canvas"]["height"]), F["setTransform"](H, 0x0, 0x0, H, -I * H, -K * H);
            let L = I,
                M = K,
                N = I + q["viewW"],
                P = K + q["viewH"],
                Q = Math["max"](0x0, Math["floor"](L)),
                R = Math["max"](0x0, Math["floor"](M)),
                S = Math["min"](this["terrain"]["width"] - Q, Math["ceil"](N - Q) + 0x1),
                U = Math["min"](this["terrain"]["height"] - R, Math["ceil"](P - R) + 0x1);
            S > 0x0 && U > 0x0 && (F["drawImage"](this["terrain"], Q, R, S, U, Q, R, S, U), F["drawImage"](this["decalLayer"]["image"], Q, R, S, U, Q, R, S, U)), this["water"]["draw"](j, L, M, N, P), this["markers"]["drawExtractionZones"](j), this["markers"]["drawOrderMarker"](j), this["drawList"]["length"] = 0x0, this["liveBuildings"]["clear"]();
            for (let X of j["buildings"]) this["liveBuildings"]["set"](X['id'], X);
            for (let Y of this["scenery"]) {
                if (Y['x'] > N + 0x8 || Y['x'] + Y["sprite"]["width"] < L - 0x8 || Y['y'] > P + 0x8 || Y['y'] + Y["sprite"]["height"] < M - 0x14) continue;
                let a7 = this["liveBuildings"]["get"](Y["buildingId"] ?? -0x1),
                    a8 = a7 !== void 0x0 && !a7["standing"];
                this["drawList"]["push"]({
                    'sortY': a8 ? -0x1 / 0x0 : Y["sortY"],
                    'scenery': Y,
                    'building': a7
                });
            }
            for (let a9 of j["actors"]) {
                if (I1(a9) || !a9["alive"] && !(a9["deathTime"] >= 0x0 && a9["deathTime"] < f['fx']["deathTime"])) continue;
                let aj = YT(a9["prev"]['x'], a9["pos"]['x'], A),
                    ak = YT(a9["prev"]['y'], a9["pos"]['y'], A);
                aj < L - 0x14 || aj > N + 0x14 || ak < M - 0x18 || ak > P + 0x18 || a9["faction"] !== j["viewSide"] && (!a9["visible"] || !j["fog"]["isVisible"](aj, ak) || !j["map"]["arena"] && (j["map"]["conceals"] || j["clouds"]["length"] > 0x0) && n2(j["map"], j["soldiers"], a9["pos"], f["enemy"]["aggroRadius"], j["levers"]["concealment"], j["clouds"])) || this["drawList"]["push"]({
                    'sortY': ak,
                    'actor': a9
                });
            }
            for (let aq of j["hostages"]) !aq["alive"] || aq["delivered"] || j["fog"]["isVisible"](aq["pos"]['x'], aq["pos"]['y']) && this["drawList"]["push"]({
                'sortY': aq["pos"]['y'],
                'hostage': aq
            });
            for (let aw of j["critters"]) !aw["alive"] && (aw["deathTime"] < 0x0 || aw["deathTime"] >= f['fx']["deathTime"]) || aw["pos"]['x'] < L - 0x10 || aw["pos"]['x'] > N + 0x10 || aw["pos"]['y'] < M - 0x10 || aw["pos"]['y'] > P + 0x10 || aw["visible"] && j["fog"]["isVisible"](aw["pos"]['x'], aw["pos"]['y']) && this["drawList"]["push"]({
                'sortY': aw["pos"]['y'],
                'critter': aw
            });
            for (let ax of j["mines"]) ax["alive"] && (ax["pos"]['x'] < L - 0x10 || ax["pos"]['x'] > N + 0x10 || ax["pos"]['y'] < M - 0x18 || ax["pos"]['y'] > P + 0x10 || this["drawList"]["push"]({
                'sortY': ax["pos"]['y'],
                'mine': ax
            }));
            for (let az of j["crates"]) az["alive"] && (az["pos"]['x'] < L - 0x10 || az["pos"]['x'] > N + 0x10 || az["pos"]['y'] < M - 0x18 || az["pos"]['y'] > P + 0x10 || this["drawList"]["push"]({
                'sortY': az["pos"]['y'],
                'crate': az
            }));
            for (let aA of j["packages"]) aA["taken"] || aA["lost"] || aA["pos"]['x'] < L - 0x10 || aA["pos"]['x'] > N + 0x10 || aA["pos"]['y'] < M - 0x18 || aA["pos"]['y'] > P + 0x10 || this["drawList"]["push"]({
                'sortY': aA["pos"]['y'],
                'pack': aA
            });
            for (let aB of j["supplies"]) !aB["alive"] || aB["collected"] || aB["pos"]['x'] < L - 0x10 || aB["pos"]['x'] > N + 0x10 || aB["pos"]['y'] < M - 0x18 || aB["pos"]['y'] > P + 0x10 || this["drawList"]["push"]({
                'sortY': aB["pos"]['y'],
                'supply': aB
            });
            this["drawList"]["sort"]((aC, aD) => aC["sortY"] - aD["sortY"]);
            for (let aC of this["drawList"])
                if (aC["scenery"]) this["props"]["drawScenery"](aC["scenery"], aC["building"]);
                else {
                    if (aC["actor"]) this["figures"]["drawActor"](aC["actor"], A);
                    else {
                        if (aC["hostage"]) this["figures"]["drawHostage"](aC["hostage"], A);
                        else {
                            if (aC["critter"]) this["figures"]["drawCritter"](aC["critter"], A);
                            else {
                                if (aC["mine"]) {
                                    let aD = aC["mine"];
                                    this["props"]["drawMine"](aD, z(j["map"], Math["floor"](aD["pos"]['x'] / j["map"]["tile"]), Math["floor"](aD["pos"]['y'] / j["map"]["tile"])) === 0x29);
                                } else aC["crate"] ? this["props"]["drawCrate"](aC["crate"]) : aC["pack"] ? this["props"]["drawPackage"](aC["pack"]) : aC["supply"] && this["props"]["drawSupply"](aC["supply"]);
                            }
                        }
                    }
                } for (let aE of j["clouds"]) this["effects"]["drawCloud"](aE);
            this["canopy"] && S > 0x0 && U > 0x0 && F["drawImage"](this["canopy"], Q, R, S, U, Q, R, S, U), this["effects"]["drawBirds"](j), this["markers"]["drawCratePulses"](j), this["markers"]["drawMineFuses"](j), this["markers"]["drawTargetMarkers"](j, A), this["effects"]["drawBullets"](j), this["effects"]["drawGrenades"](j, A), this["effects"]["drawCallIn"](j), this["effects"]["drawBlasts"](j), this["effects"]["drawBangs"](j), this["effects"]["drawParticles"](j), this["effects"]["drawMuzzleFlashes"](j), this["drawFog"](j, Q, R, S, U), this["effects"]["drawPopups"](j), E && this["markers"]["drawAim"](j, E, H), this["markers"]["drawOffscreen"](j, q, H, L, M, N, P), F["setTransform"](0x1, 0x0, 0x0, 0x1, 0x0, 0x0), this["drawPhaseBanner"](j), this["drawPreroll"](j);
        } ["drawPreroll"](d) {
            const EC = cX;
            if (d["preroll"] <= 0x0) return;
            let g = this["ctx"],
                {
                    width: j,
                    height: q
                } = g["canvas"],
                u = d["preroll"],
                v = xl(d["map"], u, d["round"]);
            if (!v) return;
            let y = d["map"]["countdown"]?.["beat"] ?? f["countdown"]["beat"],
                A = 0x1 - (u / y - Math["floor"](u / y)),
                C = gi(v),
                E = Math["max"](...kl(d["map"], d["round"])["map"](L => gi(L)["width"])),
                F = Math["max"](0x1, Math["floor"](j * f["countdown"]["fill"] / E)),
                H = 0x1 - (0x1 - Math["min"](0x1, A / 0.2)) ** 0x3 < 0x1 ? F + 0x1 : F,
                I = C["width"] * H,
                K = C["height"] * H;
            g["drawImage"](C, Math["round"]((j - I) / 0x2), Math["round"]((q - K) / 0x2), I, K);
        } ["drawPhaseBanner"](c) {
            const ED = cX;
            if (c["phase"] === 0x0) return;
            let j = c["phase"] === 0x1 ? ["PHASE", "COMPLETE"] : c["map"]["challenge"] ? [c["map"]["challenge"]["verb"]["toUpperCase"]()] : ["MISSION", "FAILED"],
                m = this["ctx"],
                {
                    width: q,
                    height: y
                } = m["canvas"],
                A = j["map"](M => gi(M)),
                C = Math["max"](...A["map"](M => M["width"])),
                E = Math["max"](0x1, Math["floor"](q * f["banner"]["fill"] / C)),
                F = 0x2 * E,
                H = A["reduce"]((M, N) => M + N["height"] * E, 0x0) + F * (A["length"] - 0x1),
                I = 0x1 - (0x1 - Math["min"](0x1, c["phaseTime"] / f["banner"]["rise"])) ** 0x3,
                K = Math["round"]((y - H) / 0x2),
                L = Math["round"](K + (y - K) * (0x1 - I));
            for (let M of A) {
                let N = M["width"] * E,
                    P = M["height"] * E;
                m["drawImage"](M, Math["round"]((q - N) / 0x2), L, N, P), L += P + F;
            }
        } ["drawFog"](g, j, p, q, v) {
            const EE = cX;
            let y = g["fog"];
            if (!y["enabled"] || q <= 0x0 || v <= 0x0) return;
            let A = g["map"];
            if (this["fogDrawn"] !== y["version"]) {
                let E = this["fogCtx"],
                    F = this["fogPixels"]["data"],
                    H = Math["round"](f["fog"]["unexplored"] * 0xff),
                    I = Math["round"](f["fog"]["remembered"] * 0xff);
                for (let K = 0x0; K < y["visible"]["length"]; K++) {
                    let L = K * 0x4;
                    F[L] = 0x6, F[L + 0x1] = 0x8, F[L + 0x2] = 0x5, F[L + 0x3] = y["visible"][K] ? 0x0 : y["explored"][K] ? I : H;
                }
                E["putImageData"](this["fogPixels"], 0x0, 0x0), this["fogDrawn"] = y["version"];
            }
            let C = this["ctx"];
            C["imageSmoothingEnabled"] = !0x0, C["drawImage"](this["fogMask"], j / A["tile"], p / A["tile"], q / A["tile"], v / A["tile"], j, p, q, v), C["imageSmoothingEnabled"] = !0x1;
        }
    },
    f6 = 0x384,
    f3 = (c, d, g) => Math["max"](d, Math["min"](g, c));

function h6(c, d) {
    const EF = cX;
    return d > c ? "stacked" : c >= f6 ? "wide" : "compact";
}

function g6(c, d, g) {
    const EG = cX;
    let i = f["camera"]["zoom"],
        j = Math["min"](c / i["idealWorldW"], d / i["idealWorldH"]),
        l = f3(Math["round"](j), i["min"], i["autoMax"]);
    for (; l > i["min"] && (c / l < i["minWorldW"] || d / l < i["minWorldH"]);) l--;
    return f3(l + g, i["min"], i["max"]);
}

function h3() {
    const EH = cX;
    try {
        return window["matchMedia"]("(pointer: coarse)")["matches"] || navigator["maxTouchPoints"] > 0x0;
    } catch {
        return "ontouchstart" in window;
    }
}
var nr = class {
        constructor(c, d) {
            const EI = cX;
            this["canvas"] = c, this["ctx"] = d, this["state"] = {
                'mode': "wide",
                'touch': h3(),
                'cssW': 0x0,
                'cssH': 0x0,
                'canvasCssW': 0x0,
                'canvasCssH': 0x0,
                'cssZoom': 0x3,
                'dpr': 0x1,
                'deviceZoom': 0x3
            };
        } ["state"];
        ["listeners"] = new Set();
        ["touchOverride"] = null;
        ["onChange"](c) {
            const EJ = cX;
            return this["listeners"]["add"](c), () => this["listeners"]["delete"](c);
        } ["observePointer"](c) {
            const EK = cX;
            let d = c !== "mouse";
            this["touchOverride"] !== d && (this["touchOverride"] = d, d !== this["state"]["touch"] && this["apply"]());
        } ["apply"]() {
            const EL = cX;
            let d = window["innerWidth"],
                g = window["innerHeight"],
                j = h6(d, g),
                m = this["touchOverride"] ?? h3(),
                p = document["documentElement"];
            p["dataset"]["layout"] = j, p["dataset"]["input"] = m ? "touch" : "pointer", p["dataset"]["hand"] = G()["handedness"], p["offsetWidth"];
            let q = Math["max"](0x1, this["canvas"]["clientWidth"]),
                u = Math["max"](0x1, this["canvas"]["clientHeight"]),
                v = g6(q, u, G()["zoomBias"]),
                y = this["pixelRatio"](),
                A = Math["max"](0x1, Math["round"](v * y));
            this["canvas"]["width"] = Math["round"](q * y), this["canvas"]["height"] = Math["round"](u * y), this["ctx"]["imageSmoothingEnabled"] = !0x1, this["state"] = {
                'mode': j,
                'touch': m,
                'cssW': d,
                'cssH': g,
                'canvasCssW': q,
                'canvasCssH': u,
                'cssZoom': v,
                'dpr': y,
                'deviceZoom': A
            };
            for (let C of this["listeners"]) C(this["state"]);
        } ["pixelRatio"]() {
            const EM = cX;
            let c = window["devicePixelRatio"] || 0x1,
                d = Math["min"](0x2, c),
                g = G()["crisp"] ? Math["max"](0x1, Math["round"](d)) : d;
            return G()["resolution"] === "half" ? Math["max"](0x1, g / 0x2) : g;
        }
        get["clickSlack"]() {
            const EN = cX;
            return this["state"]["touch"] ? Math["max"](0x9, 0x16 / this["state"]["cssZoom"]) : 0x2;
        } ["toWorld"](c) {
            const EO = cX;
            return c / this["state"]["cssZoom"];
        }
    },
    g3 = 0x2c,
    or = class {
        ["mode"] = "idle";
        ["point"] = {
            'x': 0x0,
            'y': 0x0
        };
        ["thrower"] = null;
        ["clamped"] = !0x1;
        ["friendly"] = !0x1;
        ["blocked"] = !0x1;
        ["placed"] = !0x1;
        get["arming"]() {
            const EP = cX;
            return this["mode"] === "grenade";
        }
        get["marking"]() {
            const EQ = cX;
            return this["mode"] === "callin";
        }
        get["firing"]() {
            const ER = cX;
            return this["mode"] === "fire";
        } ["idle"]() {
            const ES = cX;
            this["mode"] = "idle", this["thrower"] = null, this["placed"] = !0x1, this["clamped"] = !0x1, this["friendly"] = !0x1, this["blocked"] = !0x1;
        } ["armGrenade"](c) {
            const EU = cX;
            this["mode"] = "grenade", this["placed"] = !0x1;
            let d = hT(c, c["viewSide"] ?? D["Player"]) ?? {
                'x': 0x0,
                'y': 0x0
            };
            this["resolveGrenade"](c, d);
        } ["markAt"](c) {
            const EX = cX;
            this["mode"] = "callin", this["point"]['x'] = c['x'], this["point"]['y'] = c['y'], this["placed"] = !0x0, this["thrower"] = null, this["clamped"] = !0x1, this["blocked"] = !0x1;
        } ["fireAt"](c) {
            const EY = cX;
            this["mode"] = "fire", this["point"]['x'] = c['x'], this["point"]['y'] = c['y'];
        } ["fireAlong"](c, d) {
            const EZ = cX;
            let g = hT(c, c["viewSide"] ?? D["Player"]);
            if (!g) return;
            let i = Math["hypot"](d['x'], d['y']);
            if (i < 0.001) return;
            let j = _T[c["squadWeapon"]]["fireRange"] * 0.9;
            this["mode"] = "fire", this["point"]['x'] = g['x'] + d['x'] / i * j, this["point"]['y'] = g['y'] + d['y'] / i * j;
        } ["resolveGrenade"](c, d) {
            const F5 = cX;
            this["placed"] = !0x0;
            let g = f["grenade"],
                j = null,
                l = 0x1 / 0x0;
            for (let m of eW(c, c["viewSide"] ?? D["Player"])) {
                if (m["wading"]) continue;
                let p = Math["hypot"](m["pos"]['x'] - d['x'], m["pos"]['y'] - d['y']);
                p < l && (l = p, j = m);
            }
            if (this["thrower"] = j, this["blocked"] = !j, !j) {
                this["point"]['x'] = d['x'], this["point"]['y'] = d['y'], this["clamped"] = !0x1, this["friendly"] = !0x1;
                return;
            }
            if (this["clamped"] = l > g["throwRange"], this["clamped"]) {
                let q = g["throwRange"] / l;
                this["point"]['x'] = j["pos"]['x'] + (d['x'] - j["pos"]['x']) * q, this["point"]['y'] = j["pos"]['y'] + (d['y'] - j["pos"]['y']) * q;
            } else this["point"]['x'] = d['x'], this["point"]['y'] = d['y'];
            this["friendly"] = eW(c, c["viewSide"] ?? D["Player"])["some"](s => Math["hypot"](s["pos"]['x'] - this["point"]['x'], s["pos"]['y'] - this["point"]['y']) <= g["blastRadius"]);
        } ["canThrow"](c) {
            const F7 = cX;
            return this["mode"] === "grenade" && !this["blocked"] && c["grenadesHeld"] > 0x0 && c["grenadeCooldown"] <= 0x0;
        }
    },
    yt = (c, d) => c * 0x10 + Math["max"](0x0, d),
    b6 = [0x1, 0x4, 0x2, 0x8, 0x10],
    ir = class {
        constructor(c, d) {
            const F8 = cX;
            this["canvas"] = c, this["emit"] = d;
            let g = c;
            this['on'](document, "contextmenu", i => {
                const F9 = F8;
                i[F9(0x13eb)]?.[F9(0x915)]?.(F9(0x4fb)) || i[F9(0xa6e)]();
            }), this['on'](g, "pointerdown", i => this["onDown"](i)), this['on'](window, "pointermove", i => this["onMove"](i)), this['on'](window, "pointerup", i => this["onUp"](i, !0x1)), this['on'](window, "pointercancel", i => this["onUp"](i, !0x0)), this['on'](g, "pointerenter", () => this["emit"]({
                'k': "enter"
            })), this['on'](g, "pointerleave", () => this["emit"]({
                'k': "leave"
            })), this['on'](window, "blur", () => this["reset"]()), this['on'](g, "gesturestart", i => i["preventDefault"]()), this['on'](g, "gesturechange", i => i["preventDefault"]()), this['on'](g, "dragover", i => i["preventDefault"]());
        } ["active"] = new Map();
        ["detach"] = [];
        ["pinchStart"] = 0x0;
        ["pinching"] = !0x1;
        ["firstPress"] = null;
        ["onFirstPress"](c) {
            const Fd = cX;
            this["firstPress"] = c;
        } ['on'](c, d, g) {
            const Fj = cX;
            c["addEventListener"](d, g, {
                'passive': !0x1
            }), this["detach"]["push"](() => c["removeEventListener"](d, g));
        } ["dispose"]() {
            const Fk = cX;
            for (let c of this["detach"]) c();
            this["detach"]["length"] = 0x0, this["active"]["clear"]();
        }
        get["scale"]() {
            const Fq = cX;
            let c = this["canvas"]["clientWidth"];
            return c > 0x0 ? this["canvas"]["width"] / c : 0x1;
        } ["point"](c) {
            const Fr = cX;
            let d = this["canvas"]["getBoundingClientRect"](),
                g = c["clientX"] - d["left"],
                i = c["clientY"] - d["top"],
                j = this["scale"];
            return {
                'device': {
                    'x': g * j,
                    'y': i * j
                },
                'css': {
                    'x': g,
                    'y': i
                }
            };
        } ["kindOf"](c) {
            const Fv = cX;
            return c["pointerType"] === "touch" || c["pointerType"] === "pen" ? c["pointerType"] : "mouse";
        } ["onDown"](c) {
            const Fw = cX;
            if (this["firstPress"]) {
                let m = this["firstPress"];
                this["firstPress"] = null, m();
            }
            let {
                device: d,
                css: g
            } = this["point"](c), j = this["kindOf"](c);
            c["preventDefault"]();
            try {
                this["canvas"]["setPointerCapture"](c["pointerId"]);
            } catch {}
            let l = {
                'id': c["pointerId"],
                'kind': j,
                'button': c["button"],
                'at': {
                    ...d
                },
                'start': {
                    ...d
                },
                'startCss': {
                    ...g
                },
                'lastCss': {
                    ...g
                },
                'startedAt': performance["now"](),
                'dragging': !0x1,
                'tappable': !0x0,
                'longPressTimer': 0x0
            };
            j !== "mouse" && (l["longPressTimer"] = window["setTimeout"](() => {
                const Fx = Fw;
                let p = this[Fx(0x37e)][Fx(0x30a)](yt(c[Fx(0x1378)], c[Fx(0x14ab)]));
                !p || p[Fx(0x7f3)] || !p[Fx(0x883)] || (p[Fx(0x883)] = !0x1, this[Fx(0x63c)]({
                    'k': Fx(0x5f9),
                    'at': {
                        ...p['at']
                    },
                    'kind': p[Fx(0x944)]
                }));
            }, 0x1a4)), this["active"]["set"](yt(c["pointerId"], c["button"]), l), this["emit"]({
                'k': "down",
                'at': {
                    ...d
                },
                'kind': j,
                'button': c["button"]
            }), this["active"]["size"] === 0x2 && this["beginPinch"]();
        } ["tracksFor"](c) {
            const Fz = cX;
            let d = [];
            for (let g of this["active"]["values"]()) g['id'] === c && d["push"](g);
            return d;
        } ["touchPair"]() {
            const FA = cX;
            let c = [...this["active"]["values"]()]["filter"](d => d["kind"] !== "mouse");
            return c["length"] === 0x2 ? c : null;
        } ["beginPinch"]() {
            const FB = cX;
            let c = this["touchPair"]();
            if (c) {
                this["pinching"] = !0x0, this["pinchStart"] = Math["hypot"](c[0x0]["lastCss"]['x'] - c[0x1]["lastCss"]['x'], c[0x0]["lastCss"]['y'] - c[0x1]["lastCss"]['y']) || 0x1;
                for (let d of c) d["tappable"] = !0x1, window["clearTimeout"](d["longPressTimer"]), d["dragging"] && (d["dragging"] = !0x1, this["emit"]({
                    'k': "dragend",
                    'at': {
                        ...d['at']
                    },
                    'kind': d["kind"],
                    'button': d["button"]
                }));
            }
        } ["onMove"](c) {
            const FC = cX;
            let {
                device: d,
                css: g
            } = this["point"](c), j = this["kindOf"](c);
            if (j === "mouse" && c["button"] !== -0x1) {
                let q = yt(c["pointerId"], c["button"]),
                    u = (c["buttons"] & (b6[c["button"]] ?? 0x0)) !== 0x0;
                if (u && !this["active"]["has"](q)) return this["onDown"](c);
                if (!u && this["active"]["has"](q)) return this["onUp"](c, !0x1);
            }
            let l = this["tracksFor"](c["pointerId"]);
            if (l["length"] === 0x0) {
                this["emit"]({
                    'k': "move",
                    'at': d,
                    'kind': j,
                    'held': !0x1
                });
                return;
            }
            let m = l[0x0],
                p = {
                    'x': d['x'] - m['at']['x'],
                    'y': d['y'] - m['at']['y']
                };
            for (let v of l) v['at'] = {
                ...d
            }, v["lastCss"] = g;
            if (this["pinching"]) {
                let y = this["touchPair"]();
                if (y) {
                    let A = Math["hypot"](y[0x0]["lastCss"]['x'] - y[0x1]["lastCss"]['x'], y[0x0]["lastCss"]['y'] - y[0x1]["lastCss"]['y']);
                    this["emit"]({
                        'k': "pinch",
                        'centre': {
                            'x': (y[0x0]['at']['x'] + y[0x1]['at']['x']) / 0x2,
                            'y': (y[0x0]['at']['y'] + y[0x1]['at']['y']) / 0x2
                        },
                        'scale': A / this["pinchStart"]
                    });
                }
                return;
            }
            this["emit"]({
                'k': "move",
                'at': d,
                'kind': j,
                'held': !0x0
            });
            for (let C of l) Math["hypot"](g['x'] - C["startCss"]['x'], g['y'] - C["startCss"]['y']) <= 0xc || (C["tappable"] = !0x1, window["clearTimeout"](C["longPressTimer"]), C === m && (C["dragging"] || (C["dragging"] = !0x0, this["emit"]({
                'k': "dragstart",
                'at': {
                    ...C["start"]
                },
                'kind': j,
                'button': C["button"]
            }))));
            m["dragging"] && this["emit"]({
                'k': "drag",
                'at': {
                    ...d
                },
                'delta': p,
                'kind': j,
                'button': m["button"]
            });
        } ["onUp"](g, j) {
            const FD = cX;
            let m = j ? this["tracksFor"](g["pointerId"]) : [],
                p = j ? null : this["active"]["get"](yt(g["pointerId"], g["button"])) ?? null;
            for (let E of m) this["active"]["delete"](yt(E['id'], E["button"]));
            if (p && this["active"]["delete"](yt(g["pointerId"], g["button"])), this["active"]["size"] < 0x2) {
                let F = this["pinching"];
                if (this["pinching"] = !0x1, F) {
                    for (let H of this["active"]["values"]()) H["tappable"] = !0x1;
                }
            }
            if (j) {
                if (m["length"] === 0x0) return;
                for (let I of m) window["clearTimeout"](I["longPressTimer"]), I["dragging"] && this["emit"]({
                    'k': "dragend",
                    'at': {
                        ...I['at']
                    },
                    'kind': I["kind"],
                    'button': I["button"]
                });
                this["emit"]({
                    'k': "cancel"
                });
                return;
            }
            if (!p) return;
            window["clearTimeout"](p["longPressTimer"]);
            let {
                device: q,
                css: u
            } = this["point"](g);
            if (this["emit"]({
                    'k': 'up',
                    'at': q,
                    'kind': p["kind"],
                    'button': g["button"]
                }), p["dragging"]) {
                this["emit"]({
                    'k': "dragend",
                    'at': q,
                    'kind': p["kind"],
                    'button': p["button"]
                });
                return;
            }
            let v = performance["now"]() - p["startedAt"],
                y = Math["hypot"](u['x'] - p["startCss"]['x'], u['y'] - p["startCss"]['y']),
                A = p["kind"] === "mouse" || v <= 0x104,
                C = y <= 0xc || p["kind"] === "mouse";
            (p["tappable"] || p["kind"] === "mouse") && A && C && this["emit"]({
                'k': "tap",
                'at': q,
                'kind': p["kind"],
                'button': p["button"]
            });
        } ["reset"]() {
            const FE = cX;
            for (let c of this["active"]["values"]()) window["clearTimeout"](c["longPressTimer"]), c["dragging"] && this["emit"]({
                'k': "dragend",
                'at': {
                    ...c['at']
                },
                'kind': c["kind"],
                'button': c["button"]
            });
            this["active"]["clear"](), this["pinching"] = !0x1, this["emit"]({
                'k': "cancel"
            });
        }
    },
    b3 = 1.35,
    rr = class {
        constructor(c, d) {
            const FF = cX;
            this["canvas"] = c, this["layout"] = d, (this["tracker"] = new ir(c, g => this["onGesture"](g)), this['on'](window, "keydown", g => this["onKeyDown"](g)), this['on'](window, "keyup", g => this["onKeyUp"](g)), this['on'](window, "blur", () => this["releaseAll"]()));
        } ["screen"] = {
            'x': 0x0,
            'y': 0x0
        };
        ["world"] = {
            'x': 0x0,
            'y': 0x0
        };
        ["inside"] = !0x1;
        ["aim"] = new or();
        ["mode"] = "play";
        ["onPause"] = null;
        ["modalOpen"] = null;
        ["onZoom"] = null;
        ["tracker"];
        ["queue"] = [];
        ["detach"] = [];
        ["rightDown"] = !0x1;
        ["fireKeyDown"] = !0x1;
        get["fireHeld"]() {
            const FG = cX;
            return this["rightDown"] || this["fireKeyDown"];
        } ["panning"] = !0x1;
        ["threw"] = !0x1;
        ["panDelta"] = {
            'x': 0x0,
            'y': 0x0
        };
        ["keyPan"] = {
            'x': 0x0,
            'y': 0x0
        };
        ["keyMarch"] = {
            'x': 0x0,
            'y': 0x0
        };
        ["marchedAt"] = 0x0;
        ["pinchAnchor"] = 0x1;
        ["rawAim"] = null;
        ["chorded"] = !0x1;
        ["stickDir"] = null;
        ['on'](c, d, g) {
            const FH = cX;
            c["addEventListener"](d, g, {
                'passive': !0x1
            }), this["detach"]["push"](() => c["removeEventListener"](d, g));
        } ["dispose"]() {
            const FI = cX;
            this["tracker"]["dispose"]();
            for (let c of this["detach"]) c();
            this["detach"]["length"] = 0x0;
        } ["onFirstPress"](c) {
            const FJ = cX;
            this["tracker"]["onFirstPress"](c);
        }
        get["slack"]() {
            const FK = cX;
            return this["layout"]["clickSlack"];
        }
        get["firing"]() {
            const FL = cX;
            return this["aim"]["mode"] === "fire";
        } ["boundFor"] = null;
        ["bound"] = jt(Rt);
        ["bindings"]() {
            const FM = cX;
            let c = G();
            return c !== this["boundFor"] && (this["boundFor"] = c, this["bound"] = jt(c["keys"])), this["bound"];
        }
        get["isTouch"]() {
            const FN = cX;
            return this["layout"]["state"]["touch"];
        } ["onGesture"](c) {
            const FO = cX;
            switch (c['k']) {
                case "enter":
                    this["inside"] = !0x0;
                    return;
                case "leave":
                    this["inside"] = !0x1;
                    return;
                case "cancel":
                    this["releaseAll"]();
                    return;
                case "down":
                    return this["onDown"](c['at'], c["kind"], c["button"]);
                case "move":
                    return this["onMove"](c['at'], c["kind"], c["held"]);
                case 'up':
                    return this["onUp"](c["button"]);
                case "tap":
                    return this["onTap"](c['at'], c["kind"], c["button"]);
                case "longpress":
                    return this["onLongPress"](c['at']);
                case "dragstart":
                    !this["aim"]["arming"] && (c["kind"] !== "mouse" || c["button"] === 0x1) && (this["panning"] = !0x0);
                    return;
                case "drag":
                    return this["onDrag"](c['at'], c["delta"], c["kind"]);
                case "dragend": {
                    let d = this["panning"];
                    this["panning"] = !0x1, !d && !this["threw"] && c["kind"] === "mouse" && c["button"] === 0x0 && this["onTap"](c['at'], c["kind"], c["button"]), this["threw"] = !0x1;
                    return;
                }
                case "pinch":
                    return this["onPinch"](c["centre"], c["scale"]);
            }
        } ["onDown"](c, d, g) {
            const FP = cX;
            if (this["layout"]["observePointer"](d), this["screen"]['x'] = c['x'], this["screen"]['y'] = c['y'], d === "mouse" && g === 0x2) {
                this["rightDown"] = !0x0, this["aim"]["mode"] = "fire", this["stickDir"] = null, this["emit"]({
                    'type': "fire"
                });
                return;
            }
            this["aim"]["arming"] && this["placeReticle"](c, d);
        } ["onMove"](c, d, g) {
            const FQ = cX;
            this["screen"]['x'] = c['x'], this["screen"]['y'] = c['y'], this["aim"]["arming"] && (g || d === "mouse") && this["placeReticle"](c, d);
        } ["onUp"](c) {
            const FR = cX;
            if (c === 0x2) {
                this["rightDown"] = !0x1, this["aim"]["mode"] === "fire" && !this["fireHeld"] && !this["stickDir"] && this["aim"]["idle"]();
                return;
            }
            if (this["aim"]["arming"] && this["aim"]["placed"]) {
                this["emit"]({
                    'type': "grenade"
                }), this["aim"]["idle"](), this["rawAim"] = null, this["threw"] = !0x0;
                return;
            }
        } ["onTap"](c, d, g) {
            const FS = cX;
            if (g === 0x1) {
                d === "mouse" && this["throwAtCursor"](this["toWorldPoint"](c, d));
                return;
            }
            if (g === 0x0 && !this["aim"]["arming"]) {
                if (this["callInArmed"]) {
                    this["callInArmed"] = !0x1, this["aim"]["marking"] && this["aim"]["idle"](), this["emit"]({
                        'type': "callin",
                        'at': this["toWorldPoint"](c, d, 0x0)
                    });
                    return;
                }
                this["emit"]({
                    'type': "order",
                    'world': this["toWorldPoint"](c, d, 0x0),
                    'queue': !0x1
                });
            }
        } ["onLongPress"](c) {
            const FU = cX;
            this["aim"]["arming"] || this["callInArmed"] || G()["rules"] !== "modern" || this["emit"]({
                'type': "order",
                'world': this["toWorldPoint"](c, "touch", 0x0),
                'queue': !0x0
            });
        } ["onDrag"](c, d, g) {
            const FV = cX;
            if (this["aim"]["arming"]) {
                this["placeReticle"](c, g);
                return;
            }
            this["panning"] && (this["panDelta"]['x'] -= d['x'], this["panDelta"]['y'] -= d['y']);
        } ["onPinch"](c, d) {
            const FX = cX;
            let g = d / this["pinchAnchor"];
            g > b3 ? (this["pinchAnchor"] = d, this["onZoom"]?.(0x1, c)) : g < 0x1 / b3 && (this["pinchAnchor"] = d, this["onZoom"]?.(-0x1, c));
        } ["placeReticle"](c, d) {
            const FY = cX;
            this["rawAim"] = this["toWorldPoint"](c, d), this["aim"]["placed"] = !0x0;
        } ["toWorldPoint"](c, d, g = g3) {
            const FZ = cX;
            let i = this["camera"]?.["zoom"] ?? this["layout"]["state"]["deviceZoom"],
                j = d === "mouse" ? 0x0 : g * this["layout"]["state"]["dpr"] / i;
            return {
                'x': c['x'] / i + (this["camera"]?.["offsetX"] ?? 0x0),
                'y': c['y'] / i + (this["camera"]?.["offsetY"] ?? 0x0) - j
            };
        } ["camera"] = null;
        ["fireDown"]() {
            const G2 = cX;
            this["aim"]["mode"] = "fire", this["stickDir"] = null, this["emit"]({
                'type': "fire"
            });
        } ["fireVector"](c) {
            const G7 = cX;
            this["stickDir"] = c && Math["hypot"](c['x'], c['y']) > 0.001 ? c : null;
        } ["fireUp"]() {
            const G8 = cX;
            this["stickDir"] = null, this["aim"]["mode"] === "fire" && !this["fireHeld"] && this["aim"]["idle"]();
        } ["toggleGrenade"]() {
            const G9 = cX;
            if (this["aim"]["arming"]) {
                this["throwAtCursor"]({
                    ...this["aim"]["point"]
                });
                return;
            }
            this["aim"]["mode"] = "grenade", this["aim"]["placed"] = !0x1, this["rawAim"] = this["inside"] ? {
                ...this["world"]
            } : null;
        } ["cancelGrenade"]() {
            const Gj = cX;
            this["aim"]["idle"](), this["rawAim"] = null;
        } ["throwAtCursor"](c) {
            const Gk = cX;
            this["rawAim"] = c ?? {
                ...this["world"]
            }, this["aim"]["mode"] = "grenade", this["aim"]["placed"] = !0x0, this["chorded"] = !0x0, this["emit"]({
                'type': "grenade"
            });
        } ["callInArmed"] = !0x1;
        ["armCallIn"]() {
            const Gn = cX;
            this["callInArmed"] = !0x0, this["aim"]["markAt"](this["world"]), this["emit"]({
                'type': "armcallin"
            });
        } ["disarmCallIn"]() {
            const Gp = cX;
            this["callInArmed"] = !0x1, this["aim"]["marking"] && this["aim"]["idle"]();
        } ["recentre"]() {
            const Gq = cX;
            this["emit"]({
                'type': "recentre"
            });
        } ["select"](c) {
            const Gv = cX;
            this["emit"]({
                'type': "select",
                'soldier': c
            });
        } ["restart"]() {
            const Gw = cX;
            this["emit"]({
                'type': "restart"
            });
        } ["exit"]() {
            const Gx = cX;
            this["emit"]({
                'type': "exit"
            });
        } ["onKeyDown"](c) {
            const Gz = cX;
            let d = document["activeElement"];
            if (d instanceof HTMLInputElement || d instanceof HTMLTextAreaElement) return;
            switch (c["key"]) {
                case 'r':
                case 'R':
                    this["emit"]({
                        'type': "restart"
                    });
                    return;
                case 'p':
                case 'P':
                    if (this["modalOpen"]?.()) return;
                    this["onPause"]?.();
                    return;
                case '\x20':
                    c["preventDefault"](), this["emit"]({
                        'type': "recentre"
                    });
                    return;
                case '+':
                case '=':
                    this["onZoom"]?.(0x1, {
                        ...this["screen"]
                    });
                    return;
                case '-':
                case '_':
                    this["onZoom"]?.(-0x1, {
                        ...this["screen"]
                    });
                    return;
                default:
                    break;
            }
            let g = this["bindings"](),
                i = g["byCode"]["get"](c["code"]);
            if (i) switch (i) {
                case "marchLeft":
                    this["keyMarch"]['x'] = -0x1;
                    return;
                case "marchRight":
                    this["keyMarch"]['x'] = 0x1;
                    return;
                case "marchUp":
                    this["keyMarch"]['y'] = -0x1;
                    return;
                case "marchDown":
                    this["keyMarch"]['y'] = 0x1;
                    return;
                case "panLeft":
                    this["keyPan"]['x'] = -0x1;
                    return;
                case "panRight":
                    this["keyPan"]['x'] = 0x1;
                    return;
                case "panUp":
                    this["keyPan"]['y'] = -0x1;
                    return;
                case "panDown":
                    this["keyPan"]['y'] = 0x1;
                    return;
                default:
                    break;
            }
            switch (g["byKey"]["get"](c["key"]["toLowerCase"]())) {
                case "fire":
                    if (c["repeat"]) return;
                    this["fireKeyDown"] = !0x0, this["fireDown"]();
                    return;
                case "grenade":
                    this["toggleGrenade"]();
                    return;
                case "pause":
                    if (this["aim"]["arming"]) {
                        this["cancelGrenade"]();
                        return;
                    }
                    if (this["modalOpen"]?.()) return;
                    this["onPause"]?.();
                    return;
                default:
                    break;
            }
        } ["onKeyUp"](c) {
            const GA = cX;
            let d = this["bindings"]();
            switch (d["byCode"]["get"](c["code"])) {
                case "marchLeft":
                case "marchRight":
                    this["keyMarch"]['x'] = 0x0;
                    break;
                case "marchUp":
                case "marchDown":
                    this["keyMarch"]['y'] = 0x0;
                    break;
                case "panLeft":
                case "panRight":
                    this["keyPan"]['x'] = 0x0;
                    break;
                case "panUp":
                case "panDown":
                    this["keyPan"]['y'] = 0x0;
                    break;
                default:
                    break;
            }
            d["byKey"]["get"](c["key"]["toLowerCase"]()) === "fire" && (this["fireKeyDown"] = !0x1, this["fireUp"]());
        } ["releaseAll"]() {
            const GB = cX;
            this["rightDown"] = !0x1, this["fireKeyDown"] = !0x1, this["panning"] = !0x1, this["stickDir"] = null, this["keyPan"]['x'] = 0x0, this["keyPan"]['y'] = 0x0, this["aim"]["mode"] === "fire" && this["aim"]["idle"]();
        } ["syncWorld"](c) {
            const GD = cX;
            this["camera"] = c;
            let d = c["screenToWorld"](this["screen"]['x'], this["screen"]['y']);
            this["world"]['x'] = d['x'], this["world"]['y'] = d['y'];
        } ["syncAim"](c) {
            const GE = cX;
            if (this["mode"] !== "play") {
                this["aim"]["idle"]();
                return;
            }
            if (this["aim"]["marking"]) {
                this["callInArmed"] ? this["aim"]["markAt"](this["world"]) : this["aim"]["idle"]();
                return;
            }
            this["aim"]["mode"] === "grenade" ? (this["rawAim"] ? this["aim"]["resolveGrenade"](c, this["rawAim"]) : this["aim"]["placed"] || this["aim"]["armGrenade"](c), this["chorded"] && (this["chorded"] = !0x1, this["rawAim"] = null, this["aim"]["mode"] = this["fireHeld"] ? "fire" : "idle", this["aim"]["placed"] = !0x1)) : this["aim"]["mode"] === "fire" && (this["stickDir"] ? this["aim"]["fireAlong"](c, this["stickDir"]) : this["aim"]["fireAt"](this["world"]));
        } ["emit"](c) {
            const GF = cX;
            this["mode"] !== "play" && c["type"] !== "exit" && c["type"] !== "recentre" || this["queue"]["push"](c);
        } ["drain"]() {
            const GG = cX;
            if ((this["keyMarch"]['x'] !== 0x0 || this["keyMarch"]['y'] !== 0x0) && this["mode"] !== "sealed") {
                let d = performance["now"]();
                if (d - this["marchedAt"] >= f["controls"]["marchRepeat"] * 0x3e8) {
                    this["marchedAt"] = d;
                    let g = Math["hypot"](this["keyMarch"]['x'], this["keyMarch"]['y']);
                    this["queue"]["push"]({
                        'type': "march",
                        'dir': {
                            'x': this["keyMarch"]['x'] / g,
                            'y': this["keyMarch"]['y'] / g
                        }
                    });
                }
            }
            let c = this["queue"]["slice"]();
            return this["queue"]["length"] = 0x0, c;
        } ["consumePan"](c) {
            const GH = cX;
            if (this["mode"] === "sealed") return this["panDelta"]['x'] = 0x0, this["panDelta"]['y'] = 0x0, {
                'x': 0x0,
                'y': 0x0
            };
            let d = {
                'x': this["panDelta"]['x'] / c,
                'y': this["panDelta"]['y'] / c
            };
            return this["panDelta"]['x'] = 0x0, this["panDelta"]['y'] = 0x0, d;
        } ["edgeScroll"](c) {
            const GI = cX;
            return !G()["edgeScroll"] || this["edgeScrollBlocked"] ? {
                'x': 0x0,
                'y': 0x0
            } : this["edgeScrollRaw"](c);
        } ["edgeScrollBlocked"] = !0x1;
        ["edgeScrollRaw"](c) {
            const GJ = cX;
            if (this["mode"] === "sealed") return {
                'x': 0x0,
                'y': 0x0
            };
            let d = this["keyPan"]['x'],
                g = this["keyPan"]['y'];
            if (!this["layout"]["state"]["touch"] && this["inside"] && !this["panning"] && !this["aim"]["arming"]) {
                let j = this["layout"]["state"]["dpr"],
                    l = f["camera"]["edgeMargin"] * j,
                    m = this["canvas"]["width"],
                    p = this["canvas"]["height"];
                this["screen"]['x'] < l ? d = -(0x1 - this["screen"]['x'] / l) : this["screen"]['x'] > m - l && (d = 0x1 - (m - this["screen"]['x']) / l), this["screen"]['y'] < l ? g = -(0x1 - this["screen"]['y'] / l) : this["screen"]['y'] > p - l && (g = 0x1 - (p - this["screen"]['y']) / l);
            }
            return d === 0x0 && g === 0x0 ? {
                'x': 0x0,
                'y': 0x0
            } : {
                'x': d * f["camera"]["edgeSpeed"] * c,
                'y': g * f["camera"]["edgeSpeed"] * c
            };
        }
    },
    sr = class {
        constructor(c, d) {
            const GK = cX;
            this["input"] = c, this["layout"] = d, this["pause"] = Eu({
                'glyph': '\u2016',
                'label': "Pause",
                'hint': "Esc"
            });
            let g = document["createElement"]("div");
            g["className"] = "controls-top", g["append"](this["pause"]["root"]), this["root"]["append"](g), this['on'](this["pause"]["root"], "click", () => this["input"]["onPause"]?.());
        } ["root"] = document["getElementById"]("controls");
        ["pause"];
        ["detach"] = [];
        ['on'](c, d, g) {
            const GL = cX;
            c["addEventListener"](d, g, {
                'passive': !0x1
            }), this["detach"]["push"](() => c["removeEventListener"](d, g));
        } ["dispose"]() {
            const GM = cX;
            for (let c of this["detach"]) c();
            this["detach"]["length"] = 0x0;
        } ["update"](c) {
            const GN = cX;
            this["root"]["hidden"] = c === null, c && (this["root"]["dataset"]["hand"] = G()["handedness"], this["root"]["dataset"]["mode"] = this["layout"]["state"]["touch"] ? "touch" : "pointer");
        }
    },
    ar = c => c["map"]["nokill"] ? " · " + (c["kills"] === 0x0 ? "no kills" : "compromised") : '',
    vt = c => {
        const GO = cX;
        let d = Math["ceil"](c);
        return Math["floor"](d / 0x3c) + ':' + String(d % 0x3c)["padStart"](0x2, '0');
    };

function y6(c, d) {
    const GP = cX;
    if (c["map"]["objective"] === "hold") {
        let g = eW(c);
        c["inZone"] = g["some"](i => c["extraction"]["some"](j => Math["hypot"](j['x'] - i["pos"]['x'], j['y'] - i["pos"]['y']) <= j["pad"] + f["extraction"]["radius"])), c["inZone"] && (c["heldFor"] = Math["min"](c["map"]["duration"], c["heldFor"] + d));
        return;
    }
    c["map"]["objective"] === "survive" && (c["timeLeft"] = Math["max"](0x0, c["timeLeft"] - d));
}

function w2(c) {
    const GQ = cX;
    switch (c["map"]["objective"]) {
        case "skirmish": {
            let d = Fi(c),
                g = d[D["Player"]] ?? 0x0,
                i = d["reduce"]((j, l, m) => m === D["Player"] ? j : j + l, 0x0);
            return {
                'status': g + " v " + i,
                'done': 0x0,
                'total': 0x0,
                'won': !0x1
            };
        }
        case "demolish": {
            let j = c["buildings"]["length"],
                l = c["buildings"]["filter"](m => !m["standing"])["length"];
            return {
                'status': j - l + " building" + (j - l === 0x1 ? '' : 's') + " left" + ar(c),
                'done': l,
                'total': j,
                'won': l >= j && j > 0x0
            };
        }
        case "rescue": {
            let m = c["hostages"]["length"],
                n = c["hostages"]["filter"](p => p["delivered"])["length"],
                o = c["hostages"]["some"](p => !p["alive"] && !p["delivered"]);
            return {
                'status': o ? "hostage lost" : n + '/' + m + " rescued" + ar(c),
                'done': n,
                'total': m,
                'won': !o && n >= m && m > 0x0
            };
        }
        case "reach": {
            let p = eW(c),
                q = p["filter"](r => c["extraction"]["some"](s => Math["hypot"](s['x'] - r["pos"]['x'], s['y'] - r["pos"]['y']) <= s["pad"] + f["extraction"]["radius"]))["length"];
            return {
                'status': q + '/' + p["length"] + " at extraction" + ar(c),
                'done': q,
                'total': p["length"],
                'won': p["length"] > 0x0 && q === p["length"]
            };
        }
        case "hold":
            return {
                'status': "hold " + vt(c["heldFor"]) + '/' + vt(c["map"]["duration"]) + (c["inZone"] ? '' : " · zone empty") + y3(c), 'done': Math["round"](c["heldFor"]), 'total': Math["round"](c["map"]["duration"]), 'won': c["heldFor"] >= c["map"]["duration"]
            };
        case "collect": {
            let r = c["supplies"]["length"],
                s = c["supplies"]["filter"](v => v["collected"])["length"],
                u = c["supplies"]["some"](v => !v["alive"] && !v["collected"]);
            return {
                'status': u ? "supplies destroyed" : s + '/' + r + " recovered" + ar(c),
                'done': s,
                'total': r,
                'won': !u && s >= r && r > 0x0
            };
        }
        case "assassinate": {
            let v = c["enemies"]["filter"](A => A["kind"] === 0x3),
                y = v["filter"](A => !A["alive"])["length"];
            return {
                'status': y > 0x0 ? "the officer is dead" : "the officer is still standing",
                'done': y,
                'total': v["length"],
                'won': v["length"] > 0x0 && y >= v["length"]
            };
        }
        case "survive": {
            let A = Math["ceil"](c["timeLeft"]),
                C = c["map"]["waves"] !== null && c["wavesSent"] >= c["map"]["waves"]["count"] && !c["enemies"]["some"](E => E["alive"]);
            return {
                'status': C ? "the last of them" : "hold " + String(Math["floor"](A / 0x3c))["padStart"](0x2, '0') + ':' + String(A % 0x3c)["padStart"](0x2, '0') + y3(c),
                'done': Math["round"](c["map"]["duration"] - c["timeLeft"]),
                'total': Math["round"](c["map"]["duration"]),
                'won': c["timeLeft"] <= 0x0 || C
            };
        }
        case "endless":
            return {
                'status': "lasted " + vt(Math["floor"](c["time"])), 'done': Math["round"](c["time"]), 'total': 0x0, 'won': !0x1
            };
        case "cull": {
            let E = c["critters"]["length"],
                F = c["critters"]["filter"](H => H["alive"])["length"];
            return {
                'status': F + " chicken" + (F === 0x1 ? '' : 's') + " left",
                'done': E - F,
                'total': E,
                'won': E > 0x0 && F === 0x0
            };
        }
        case "eliminate":
        default: {
            let H = Math["max"](0x0, c["enemyTotal"] - c["kills"]);
            return {
                'status': H + " enem" + (H === 0x1 ? 'y' : "ies") + " left",
                'done': c["kills"],
                'total': c["enemyTotal"],
                'won': H === 0x0 && c["enemyTotal"] > 0x0
            };
        }
    }
}

function y3(c) {
    const GR = cX;
    let d = c["map"]["waves"];
    return d ? c["wavesSent"] >= d["count"] ? " · last wave" : " · wave " + (c["wavesSent"] + 0x1) + '/' + d["count"] + " in " + vt(Math["max"](0x0, c["waveTimer"])) : '';
}

function v6(c) {
    const GS = cX;
    if (eW(c)["length"] === 0x0 || c["map"]["nokill"] && c["kills"] > 0x0 || c["map"]["timeLimit"] > 0x0 && c["time"] >= c["map"]["timeLimit"] || c["map"]["objective"] === "rescue" && c["hostages"]["some"](g => !g["alive"] && !g["delivered"]) || c["map"]["objective"] === "collect" && c["supplies"]["some"](g => !g["alive"] && !g["collected"])) return !0x0;
    let d = S2(c);
    return !!(d && !d["standing"]);
}
var S2 = c => c["buildings"]["find"](d => d["role"] === "protect") ?? null;

function _3(c, d) {
    const GU = cX;
    if (c["phase"] !== 0x0) return;
    y6(c, d);
    let g = w2(c);
    c["status"] = g["status"], g["won"] ? (c["phase"] = 0x1, c["phaseTime"] = 0x0) : v6(c) && (c["phase"] = 0x2, c["phaseTime"] = 0x0);
}
var v3 = {
    'eliminate': "Kill every enemy",
    'demolish': "Level every enemy building",
    'rescue': "Walk every hostage to a tent",
    'reach': "Get the squad to the extraction point",
    'survive': "Hold out until the clock runs down",
    'covert': "Reach the extraction without killing anybody",
    'hold': "Take the zone and hold it",
    'collect': "Recover every supply box",
    'assassinate': "Find the enemy officer and kill him",
    'skirmish': "Eliminate the opposing squad",
    'endless': "Last as long as you can",
    'cull': "Kill every chicken"
};

function _t(c) {
    const GV = cX;
    let d = c["objective"] === "survive" && c["protects"] ? "Hold the outpost until the clock runs down" : v3[c["objective"]] ?? c["objective"],
        g = c["objective"] === "reach" || c["objective"] === "covert",
        i = c["nokill"] && g ? v3["covert"] : c["nokill"] ? d + " — without killing anybody" : d;
    return c["timeLimit"] ? i + ", inside " + vt(c["timeLimit"]) : c["objective"] === "hold" && c["duration"] ? i + " for " + vt(c["duration"]) : i;
}
var lr = class {
        ["root"] = document["getElementById"]("overlay");
        ["card"] = document["getElementById"]("overlay-card");
        ["unbind"] = null;
        ["briefingUp"] = !0x1;
        ["raise"](c, d) {
            const GX = cX;
            De(this["card"], c), this["root"]["hidden"] = !0x1, this["root"]["classList"]["toggle"]("interactive", d["interactive"]), this["unbind"]?.(), this["unbind"] = d["keys"] ? Q1(this["root"]) : null;
        } ["hide"]() {
            const GY = cX;
            this["briefingUp"] = !0x1, this["root"]["hidden"] = !0x0, this["root"]["classList"]["remove"]("interactive"), this["unbind"]?.(), this["unbind"] = null;
        } ["conceal"]() {
            const GZ = cX;
            this["root"]["hidden"] = !0x0;
        }
    },
    cr = 0xc;

function x3(c, d) {
    const H2 = cX;
    let g = w("div", "callout");
    g["setAttribute"]("role", "status");
    let j = w("div", "callout-inner");
    j["append"](w("span", "callout-text", d), w("span", "callout-tail")), g["appendChild"](j), g["style"]["left"] = "-9999px", g["style"]["top"] = '0', document["body"]["appendChild"](g);
    let l = 0x0,
        m = '',
        p = () => {
            const H5 = H2;
            cancelAnimationFrame(l), g[H5(0x225)]();
        },
        q = () => {
            const H7 = H2;
            if (!c[H7(0xd48)]) {
                p();
                return;
            }
            let v = c[H7(0x6d8)] !== null,
                y = c[H7(0x9bb)](),
                A = g[H7(0x9bb)](),
                C = y[H7(0xa92)] - A[H7(0xb54)] - cr,
                E = Math[H7(0x4b7)](C >= 0x0 ? C : y[H7(0x1085)] + cr),
                F = Math[H7(0x4b7)](Math[H7(0x220)](Math[H7(0xbba)](cr, y[H7(0x60f)] + y[H7(0xf40)] / 0x2 - A[H7(0xf40)] / 0x2), window[H7(0xb55)] - A[H7(0xf40)] - cr)),
                H = Math[H7(0x4b7)](y[H7(0x60f)] + y[H7(0xf40)] / 0x2 - F),
                I = v + '|' + F + '|' + E + '|' + H + '|' + (C < 0x0);
            I !== m && (m = I, g[H7(0x6ad)] = !v, g[H7(0x3a7)][H7(0x60f)] = F + 'px', g[H7(0x3a7)][H7(0xa92)] = E + 'px', g[H7(0x13c1)][H7(0x33b)](H7(0x13a4), C < 0x0), j[H7(0x3a7)][H7(0x11e8)](H7(0x643), H + 'px')), l = requestAnimationFrame(q);
        };
    return q(), p;
}
async function k3(d) {
    const H8 = cX;
    let g = w("div", "dsp-body map-feedback"),
        j = kn({
            'label': "How fun, out of five",
            'prompt': "Pick a star.",
            'onChange': () => A()
        }),
        m = kn({
            'label': "How hard, out of five",
            'prompt': "One is easy, five is brutal.",
            'onChange': () => A()
        }),
        p = C => w('p', "dsp-plain dsp-question", C),
        q = w("label", "dsp-plain dsp-question", "Anything about this map?"),
        u = w("textarea", "dsp-box");
    u["rows"] = 0x2, u["maxLength"] = 0x7d0, u["placeholder"] = "Optional.", q["htmlFor"] = u['id'] = "map-feedback-comment";
    let v = w('p', "dsp-note");
    g["append"](p("How fun was it?"), j["row"], j["hint"], p("How hard was it?"), m["row"], m["hint"], q, u, v);
    let y = null,
        A = () => {
            const H9 = H8;
            y && (y[H9(0x766)] = !j[H9(0x35e)]() && !m[H9(0x35e)]() && !u[H9(0x35e)][H9(0xaca)]());
        };
    for (u["addEventListener"]("input", A);;) {
        let C = ST({
                'title': "Rate this map",
                'body': g,
                'buttons': [{
                    'label': "Send",
                    'value': "send",
                    'variant': "good"
                }],
                'dismiss': "cancel"
            }),
            E = document["querySelectorAll"](".confirm-layer");
        if (y = E[E["length"] - 0x1]?.["querySelector"](".confirm-btn.primary") ?? null, A(), await C !== "send") return !0x1;
        if (await rt({
                'kind': "mission",
                'mission': d["mission"],
                'comment': u["value"],
                'fun': j["value"]() || void 0x0,
                'hard': m["value"]() || void 0x0
            }, {
                'difficulty': d["difficulty"],
                'outcome': d["outcome"],
                'seconds': Math["round"](d["seconds"]),
                'lost': d["lost"]
            })) return !0x0;
        v["textContent"] = "That did not get through. Your words are still here if you want to try again.";
    }
}
var E2 = 0x258,
    dr = 0x578;

function w3(c, d, g = {}) {
    const Hk = cX;
    let j = [],
        l = !0x1,
        m = () => {
            const Hj = b;
            if (!l) {
                l = !0x0;
                for (let q of j) clearTimeout(q);
                c["textContent"] = String(d);
            }
        };
    c["textContent"] = '0';
    let p = Math["max"](0x1, Math["round"](dr / 0x28));
    for (let q = 0x1; q <= p; q++) j["push"](window["setTimeout"](() => {
        const Hn = Hk;
        l || (c[Hn(0x1338)] = String(Math[Hn(0x4b7)](d * q / p)));
    }, E2 + dr * q / p));
    return j["push"](window["setTimeout"](() => {
        const Hq = Hk;
        l || g[Hq(0x1049)]?.();
    }, E2 + dr)), j["push"](window["setTimeout"](m, E2 + dr + 0x78)), m;
}
var WG = f['fx']["popupLife"];

function S3(c) {
    const Hv = cX;
    if (c["map"]["objective"] === "rescue" && c["hostages"]["some"](g => !g["alive"] && !g["delivered"])) return "A hostage was killed. There is no partial credit.";
    let d = S2(c);
    return d && !d["standing"] ? "The outpost was levelled. There was nothing left to hold." : c["map"]["objective"] === "collect" && c["supplies"]["some"](g => !g["alive"] && !g["collected"]) ? "The supplies went up. There was nothing left to recover." : c["map"]["timeLimit"] > 0x0 && c["time"] >= c["map"]["timeLimit"] ? "The clock ran out." : c["map"]["nokill"] && c["kills"] > 0x0 ? "Somebody died. A covert approach is over the moment it makes a body." : "The squad was wiped out. Nobody else was coming.";
}
var ur = class {
        constructor(c) {
            this['ov'] = c;
        } ["stopTally"] = null;
        ["stopCallout"] = null;
        ["close"]() {
            const Hw = cX;
            this["stopCallout"]?.(), this["stopCallout"] = null, this["stopTally"]?.(), this["stopTally"] = null;
        } ["show"](j, q) {
            const Hx = cX;
            let A = j["phase"] === 0x1,
                C = j["soldiers"]["filter"](S => S["alive"]),
                E = q["aftermath"],
                F = document["createElement"]("div");
            F["className"] = "result panel-scroll " + (A ? "win" : "lose");
            let H = document["createElement"]("div");
            if (H["className"] = "panel-body", H["appendChild"](Object["assign"](document["createElement"]("div"), {
                    'className': "result-title",
                    'textContent': A ? "Mission accomplished" : "Mission failed"
                })), A) {
                let S = document["createElement"]("div");
                S["className"] = "result-diffline", S["appendChild"](Object["assign"](document["createElement"]("span"), {
                    'className': "hud-diff diff-" + j["difficulty"],
                    'textContent': QW[j["difficulty"]]["name"] + " clear"
                })), H["appendChild"](S);
            }
            H["appendChild"](Object["assign"](document["createElement"]("div"), {
                'className': "result-sub",
                'textContent': A ? j["map"]["name"] + " · " + C["length"] + " / " + j["soldiers"]["length"] + " came home" : S3(j)
            }));
            let I = document["createElement"]("div");
            I["className"] = "result-stats";
            let K = (U, V) => {
                const HA = Hx;
                let X = document[HA(0xae0)](HA(0x3df));
                X[HA(0x824)] = HA(0xc54), X[HA(0xa20)](Object[HA(0x1220)](document[HA(0xae0)](HA(0x12a0)), {
                    'className': HA(0x212),
                    'textContent': U
                })), X[HA(0xa20)](Object[HA(0x1220)](document[HA(0xae0)](HA(0x12a0)), {
                    'className': HA(0x15b2),
                    'textContent': V
                })), I[HA(0xa20)](X);
            };
            if (A) {
                j["map"]["objective"] !== "covert" && !j["map"]["nokill"] && K("kills", j["kills"] + " / " + j["enemyTotal"]), j["packages"]["length"] > 0x0 && K("packages", j["packages"]["filter"](V => V["taken"])["length"] + " / " + j["packages"]["length"]);
                let U = j["shotsFired"];
                K("shots", U === 0x0 ? "none fired" : String(U));
            }
            let L = E?.["time"] ?? j["time"];
            K("time", KW(L)), I["childElementCount"] > 0x0 && H["appendChild"](I);
            let M = oe(q["record"] ?? void 0x0),
                N = A ? Fu(q["record"] ?? void 0x0, j["difficulty"], E?.["newClear"] ?? !0x1) : -0x1;
            if (A) {
                let V = document["createElement"]("div");
                V["className"] = "result-rating", V["appendChild"](wu(M, {
                    'rungs': qT,
                    'nameOf': Y => QW[Y]["name"],
                    'justLit': N
                }));
                let X = M < qT["length"] ? qT[M] : null;
                V["appendChild"](Object["assign"](document["createElement"]("span"), {
                    'className': "result-rating-note",
                    'textContent': X ? QW[X]["name"] + " for next star" : "Every star on this mission"
                })), H["appendChild"](V);
            }
            if (E && E["bonds"]["total"] > 0x0) {
                let Y = document["createElement"]("div");
                Y["className"] = "result-bonds";
                let a7 = document["createElement"]("div");
                a7["className"] = "result-purse", a7["appendChild"](eT(ui(), 0x2));
                let a8 = Object["assign"](document["createElement"]('b'), {
                    'className': "result-purse-n",
                    'textContent': '0'
                });
                a7["appendChild"](a8), Y["appendChild"](a7), H["appendChild"](Y);
                let a9 = w3(a8, E["bonds"]["total"], {
                        'onTick': () => Ft()
                    }),
                    aj = () => {
                        const HB = Hx;
                        a9(), window[HB(0x1260)](HB(0x822), aj, !0x0), window[HB(0x1260)](HB(0x6f1), aj, !0x0);
                    };
                window["addEventListener"]("pointerdown", aj, !0x0), window["addEventListener"]("keydown", aj, !0x0), this["stopTally"] = aj;
            }
            let P = document["createElement"]("div");
            P["className"] = "result-actions";
            let Q = document["createElement"]("div");
            Q["className"] = "result-choice", Q["appendChild"]($W("Menu", {
                'key': "Esc",
                'onClick': () => q["onMissions"]?.()
            }));
            let R = $W(A ? "Replay" : "Try again", {
                'tone': A ? "default" : "good",
                'key': 'R',
                'onClick': () => q["onRetry"]?.()
            });
            if (Q["appendChild"](R), A && q["hasNext"] && Q["appendChild"]($W("Next mission", {
                    'tone': "good",
                    'key': "Enter",
                    'onClick': () => q["onNext"]?.()
                })), P["appendChild"](Q), F["append"](H, P), jo()) {
                let ak = IT("Feedback", "result-rate dark", () => {
                    const HC = Hx;
                    this[HC(0xe57)]?.(), this[HC(0xe57)] = null, k3({
                        'mission': j[HC(0x24c)]['id'],
                        'difficulty': j[HC(0x1142)],
                        'outcome': A ? HC(0x1242) : HC(0x152d),
                        'seconds': L,
                        'lost': j[HC(0x130a)][HC(0x1e8)] - C[HC(0x1e8)]
                    })[HC(0x1101)](aq => {
                        const HD = HC;
                        aq && (ak[HD(0x766)] = !0x0, ak[HD(0x222)](HD(0xaa5))[HD(0x1338)] = HD(0x1563));
                    });
                });
                F["appendChild"](ak);
            }
            this['ov']["raise"](F, {
                'interactive': !0x0,
                'keys': !0x0
            }), this["stopCallout"]?.(), this["stopCallout"] = A && qu(q["record"], j["difficulty"], q["difficulties"], q["missionNumber"]) ? x3(R, "Fancy something harder?") : null;
        }
    },
    E3 = "cf.challenge",
    M3 = 0x1,
    pr = {
        'time': {
            'label': "lasted",
            'read': c => c["time"],
            'clock': !0x0
        },
        'fastest': {
            'label': "time",
            'read': c => c["time"],
            'clock': !0x0,
            'lower': !0x0
        },
        'kills': {
            'label': "kills",
            'read': c => c["kills"]
        },
        'crates': {
            'label': "crates",
            'read': c => c["cratesTaken"]
        },
        'packages': {
            'label': "packages",
            'read': c => c["packages"]["filter"](d => d["taken"])["length"]
        },
        'waves': {
            'label': "waves",
            'read': c => c["wavesSent"]
        }
    };

function _6() {
    const HE = cX;
    let c = null;
    try {
        c = localStorage["getItem"](E3);
    } catch {
        return {};
    }
    if (!c) return {};
    try {
        let d = JSON["parse"](c);
        if (!d || d['v'] !== M3 || !d["bests"] || typeof d["bests"] != "object") return {};
        let g = {};
        for (let [i, j] of Object["entries"](d["bests"])) typeof j == "number" && Number["isFinite"](j) && j > 0x0 && (g[i] = j);
        return g;
    } catch {
        return {};
    }
}

function C3(c, d, g) {
    const HF = cX;
    let j = g[0x0] ?? "time",
        l = pr[j],
        m = l["read"](d),
        p = _6(),
        q = p[c] ?? 0x0,
        u = l["lower"] ? d["phase"] === 0x1 && m > 0x0 && (q === 0x0 || m < q) : m > q;
    if (u) {
        p[c] = m;
        try {
            localStorage["setItem"](E3, JSON["stringify"]({
                'v': M3,
                'bests': p
            }));
        } catch {}
    }
    return {
        'stat': j,
        'value': m,
        'best': u ? m : q,
        'previous': q,
        'newBest': u
    };
}
var mr = ["ABLE", "BAKER", "CHARLIE", "DOG", "EASY", "FOX"];

function A3(c) {
    const HG = cX;
    let d = [];
    for (let g = 0x0; g < c; g++) {
        let i = Math["floor"](g / mr["length"]),
            j = i === 0x0 ? mr[g] : mr[g % mr["length"]] + '\x20' + (i + 0x1);
        d["push"]({
            'name': j,
            'missions': 0x0,
            'own': !0x1,
            'fresh': !0x1
        });
    }
    return d;
}
var fr = class {
        constructor(c) {
            this['ov'] = c;
        } ["show"](g, j) {
            const HH = cX;
            let {
                score: q
            } = j, v = document["createElement"]("div");
            v["className"] = "result score panel-scroll";
            let y = document["createElement"]("div");
            y["className"] = "panel-body", y["appendChild"](Object["assign"](document["createElement"]("div"), {
                'className': "result-title",
                'textContent': g["map"]["challenge"]?.["verb"] ?? "Overrun"
            })), y["appendChild"](Object["assign"](document["createElement"]("div"), {
                'className': "result-sub",
                'textContent': g["map"]["name"]
            }));
            let A = g["map"]["challenge"]?.["score"] ?? ["time"],
                C = document["createElement"]("div");
            C["className"] = "score-stats";
            for (let K of A) {
                let L = pr[K],
                    M = K === q["stat"] ? q["value"] : L["read"](g),
                    N = document["createElement"]("div");
                N["className"] = "score-stat", N["appendChild"](Object["assign"](document["createElement"]("span"), {
                    'className': "score-stat-k",
                    'textContent': L["label"]
                })), N["appendChild"](Object["assign"](document["createElement"]('b'), {
                    'className': "score-stat-v",
                    'textContent': L["clock"] ? KW(M) : String(M)
                })), C["appendChild"](N);
            }
            y["appendChild"](C);
            let E = pr[q["stat"]],
                F = P => E["clock"] ? KW(P) : String(P);
            if (y["appendChild"](Object["assign"](document["createElement"]("div"), {
                    'className': "score-best",
                    'textContent': q["newBest"] ? q["previous"] > 0x0 ? "best " + E["label"] + " — " + F(q["best"]) + ", was " + F(q["previous"]) : "best " + E["label"] + " — " + F(q["best"]) + ", first run" : "best " + E["label"] + " — " + F(q["best"])
                })), q["newBest"] && q["previous"] > 0x0) {
                let P = document["createElement"]("div");
                P["className"] = "result-records", P["appendChild"](Object["assign"](document["createElement"]('i'), {
                    'className': "result-ribbon",
                    'textContent': "personal best"
                })), y["appendChild"](P);
            }
            let H = document["createElement"]("div");
            H["className"] = "result-actions";
            let I = document["createElement"]("div");
            I["className"] = "result-choice", I["appendChild"]($W("Back to menu", {
                'key': "Esc",
                'arrow': "back",
                'onClick': () => j["onMissions"]?.()
            })), I["appendChild"]($W("Go again", {
                'tone': "good",
                'key': 'R',
                'arrow': "forward",
                'onClick': () => j["onRetry"]?.()
            })), H["appendChild"](I), v["append"](y, H), this['ov']["raise"](v, {
                'interactive': !0x0,
                'keys': !0x0
            });
        }
    },
    x6 = 0x2;

function hr(d) {
    const HI = cX;
    let g = w("div", "bl-col");
    g["appendChild"](w("span", "bl-label", d["label"]));
    let j = w("div", "bl-box"),
        m = d["options"][d['at']] ?? d["options"][0x0],
        p = d["options"]["length"] < 0x2,
        q = A => {
            const HJ = HI;
            let C = w(HJ(0x14ab), HJ(0x142a) + (A < 0x0 ? HJ(0x128c) : HJ(0x16e0)));
            return C[HJ(0xb42)] = HJ(0x14ab), C[HJ(0x1338)] = A < 0x0 ? '\u2039' : '\u203A', C[HJ(0x118c)](HJ(0x147e), A < 0x0 ? HJ(0x47a) + d[HJ(0x69d)] : HJ(0x711) + d[HJ(0x69d)]), p && C[HJ(0x118c)](HJ(0x113d), HJ(0xa1c)), C[HJ(0x67d)](HJ(0x1398), () => {
                const HK = HJ;
                if (p) {
                    CW(C, d[HK(0x264)]);
                    return;
                }
                let E = d[HK(0x271)][HK(0x1e8)];
                d[HK(0xf3b)]((d['at'] + A + E) % E);
            }), C;
        };
    j["appendChild"](q(-0x1));
    let u = w("div", "bl-art"),
        v = m?.['id'] ? Ke(m['id'], !!m["locked"]) : void 0x0;
    v && u["appendChild"](eT(v, d["icon"] ?? x6)), j["appendChild"](u), j["appendChild"](q(0x1)), g["appendChild"](j), g["appendChild"](w("span", "bl-name", (m?.["name"] ?? '')["toUpperCase"]())), m?.["locked"] && (g["classList"]["add"]("locked"), g["appendChild"](w("div", "bl-locked", "NOT PURCHASED")));
    let y = w("div", "bl-meta");
    if (!p) {
        let A = w("div", "bl-dots");
        for (let C = 0x0; C < d["options"]["length"]; C++) A["appendChild"](w('i', C === d['at'] ? "bl-dot on" : "bl-dot"));
        y["appendChild"](A);
    }
    if (d["rocker"]) {
        let E = d["rocker"],
            F = w("div", "bl-rock"),
            H = I => {
                const HL = HI;
                let K = w(HL(0x14ab), HL(0xfb2));
                K[HL(0xb42)] = HL(0x14ab), K[HL(0x1338)] = I < 0x0 ? '\u2212' : '+', K[HL(0x118c)](HL(0x147e), I < 0x0 ? HL(0xc17) : HL(0xd08));
                let L = I < 0x0 ? E[HL(0x35e)] <= 0x0 : E[HL(0x35e)] >= E[HL(0xbba)];
                return L && K[HL(0x118c)](HL(0x113d), HL(0xa1c)), K[HL(0x67d)](HL(0x1398), () => {
                    const HM = HL;
                    if (L) {
                        CW(K, I < 0x0 ? E[HM(0x98b)][HM(0x15d7)] : E[HM(0x98b)][HM(0x1040)]);
                        return;
                    }
                    E[HM(0x469)](E[HM(0x35e)] + I);
                }), K;
            };
        F["appendChild"](H(-0x1)), F["appendChild"](w("span", "bl-count", String(E["value"]))), F["appendChild"](H(0x1)), y["appendChild"](F);
    }
    return y["childElementCount"] > 0x0 && g["appendChild"](y), g;
}
var M2 = c => bW["find"](d => d['id'] === c)?.["blurb"] ?? '',
    R3 = {
        'id': null,
        'name': "None",
        'blurb': "Nothing in that hand."
    },
    C2 = (c, d) => bW["filter"](g => g["category"] === c && g["ready"] && !d["includes"](g['id']))["map"](g => ({
        'id': g['id'],
        'name': g["name"],
        'blurb': g["blurb"],
        'locked': {
            'price': ZW(g['id'])
        }
    })),
    A2 = new Map();

function k6(j, q, A) {
    const HN = cX;
    let C = za(j),
        E = [...C["map"](a7 => ({
            'id': a7,
            'name': ci[a7],
            'blurb': M2(a7) || "Standard issue. Slow, steady, and longer-reaching than it looks."
        })), ...C2("weapon", C)],
        F = Math["max"](0x0, C["indexOf"](li(j))),
        H = Vf(j),
        I = a7 => a7 === "flash" ? "flashbang" : a7,
        K = [R3, ...H["map"](a7 => ({
            'id': I(a7),
            'name': bW["find"](a8 => a8['id'] === I(a7))?.["name"] ?? a7,
            'blurb': M2(I(a7))
        })), ...C2("throwable", H["map"](I))],
        L = Math["max"](0x0, K["findIndex"]((a7, a8) => a8 > 0x0 && a8 <= H["length"] && H[a8 - 0x1] === j["loadout"]["throwable"])),
        M = Xa(j),
        N = [R3, ...M["map"](a7 => ({
            'id': a7,
            'name': di[a7],
            'blurb': M2(a7)
        })), ...C2("callin", M)],
        P = _n(j),
        Q = Math["max"](0x0, N["findIndex"]((a7, a8) => a8 > 0x0 && a8 <= M["length"] && M[a8 - 0x1] === P)),
        R = L > 0x0 ? H[L - 0x1] : null,
        S = R ? gW(j, ge[R]) : 0x0,
        U = Math["max"](0x0, Math["min"](j["loadout"]["take"], S)),
        V = "buy more at the armoury",
        X = (a7, a8, a9) => a8[a9]?.["locked"] ? (A2["set"](a7, a9), q(), !0x0) : (A2["delete"](a7), !0x1),
        Y = (a7, a8, a9) => {
            const HO = HN;
            let aj = A2[HO(0x30a)](a7);
            return aj !== void 0x0 && aj < a9[HO(0x1e8)] && a9[aj]?.[HO(0x39c)] ? aj : a8;
        };
    return [...A ? [] : [hr({
        'label': "WEAPON",
        'options': E,
        'at': Y("WEAPON", F, E),
        'emptyHint': V,
        'onPick': a7 => {
            const HP = HN;
            X(HP(0xbdc), E, a7) || (Wt(j, HP(0xb57), C[a7]), q());
        }
    })], hr({
        'icon': 0x1,
        'label': "THROWABLE",
        'options': K,
        'at': Y("THROWABLE", L, K),
        'emptyHint': V,
        'onPick': a7 => {
            const HQ = HN;
            if (X(HQ(0x4b4), K, a7)) return;
            Wt(j, HQ(0xae1), a7 === 0x0 ? HQ(0x15d7) : H[a7 - 0x1]);
            let a8 = a7 === 0x0 ? 0x0 : gW(j, ge[H[a7 - 0x1]]);
            Wt(j, HQ(0xc48), a8), q();
        },
        'rocker': R ? {
            'value': U,
            'max': S,
            'hint': {
                'none': "none to leave behind",
                'all': "that is all there is"
            },
            'onSet': a7 => {
                const HR = HN;
                Wt(j, HR(0xc48), a7), q();
            }
        } : void 0x0
    }), hr({
        'icon': 0x1,
        'label': "CALL-IN",
        'options': N,
        'at': Y("CALL-IN", Q, N),
        'emptyHint': V,
        'onPick': a7 => {
            const HS = HN;
            X(HS(0x7e1), N, a7) || (Wt(j, HS(0xa40), a7 === 0x0 ? HS(0x15d7) : M[a7 - 0x1]), q());
        }
    })];
}
var gr = class {
        constructor(c) {
            this['ov'] = c;
        } ["show"](g, j) {
            const HT = cX;
            this['ov']["briefingUp"] = !0x0;
            let l = w("div", "briefing panel-scroll"),
                q = w("div", "panel-body"),
                y = (I, K, L = q) => L["appendChild"](w("div", I, K)),
                A = w("div", "briefing-top"),
                C = w("div", "briefing-ident");
            j["missionNumber"] > 0x0 && C["appendChild"](w("div", "briefing-num", "MISSION " + String(j["missionNumber"])["padStart"](0x2, '0'))), j["theatreName"] && C["appendChild"](w("div", "briefing-theatre", j["theatreName"]["toUpperCase"]())), A["appendChild"](C), A["appendChild"](w("div", "briefing-title", g["map"]["name"]["toUpperCase"]())), A["appendChild"](w("div", "briefing-bonds")), q["appendChild"](A), q["appendChild"](w("div", "briefing-rule bare"));
            let E = w("div", "briefing-box");
            y("briefing-obj", _t(g["map"]), E), g["map"]["brief"] && y("briefing-line", g["map"]["brief"], E);
            let F = w("div", "briefing-chips");
            if (g["map"]["nokill"] && F["appendChild"](w("span", "mi-chip warn", "NO KILLING")), g["map"]["timeLimit"] > 0x0 && F["appendChild"](w("span", "mi-chip warn", KW(g["map"]["timeLimit"]) + " LIMIT")), F["childElementCount"] > 0x0 && E["appendChild"](F), q["appendChild"](E), !(g["map"]["challenge"] !== null)) {
                let I = w("div", "briefing-diff"),
                    K = j["difficulties"]["length"] === 0x1;
                for (let L of j["difficulties"]) {
                    let M = w(K ? "div" : "button", "hud-diff diff-" + L + '\x20' + (K ? "briefing-diff-fixed" : "briefing-diff-btn"));
                    M instanceof HTMLButtonElement && (M["type"] = "button"), L === g["difficulty"] && M["classList"]["add"]('on');
                    let N = w("div", "briefing-diff-stars");
                    for (let P = 0x0; P <= qT["indexOf"](L); P++) N["appendChild"](w('i', "fx-star on"));
                    M["appendChild"](N), M["appendChild"](w("span", "briefing-diff-name", QW[L]["name"]["toUpperCase"]())), M["title"] = QW[L]["blurb"], K || M["addEventListener"]("click", () => {
                        const HU = HT;
                        L !== g[HU(0x1142)] && j[HU(0x1445)]?.(L);
                    }), I["appendChild"](M);
                }
                q["appendChild"](I), j["campaign"] && Vu(j["campaign"], g["difficulty"], j["difficulties"]) && (q["appendChild"](w('p', "briefing-rung-note", jm())), $u(j["campaign"]));
            }
            if (j["campaign"] && j["onLoadout"]) {
                let Q = w("div", "briefing-kit");
                for (let S of k6(j["campaign"], j["onLoadout"], g["map"]["weapons"] !== null)) Q["appendChild"](S);
                q["appendChild"](Q);
                let R = w("button", "briefing-shop");
                R["type"] = "button", R["appendChild"](w("span", "briefing-shop-label", "THE ARMOURY")), R["addEventListener"]("click", () => {
                    const HV = HT;
                    zf(j[HV(0x1236)], j[HV(0x874)]);
                }), q["appendChild"](R);
            }
            let H = w("button", "briefing-go");
            H["type"] = "button", H["appendChild"](w('i', "fx-star on")), H["appendChild"](w("span", "briefing-go-label", "DEPLOY")), H["appendChild"](w('i', "fx-star on")), l["append"](q, H), this['ov']["raise"](l, {
                'interactive': !0x1
            });
        }
    },
    br = class {
        ["bar"] = null;
        ["show"](c, d = !0x1) {
            const HX = cX;
            let g = j => {
                    const HW = b;
                    let l = w("span", "ab-side " + j["cls"]);
                    return l["append"](w('b', void 0x0, j["label"]), '\x20' + j['up'], w('i', void 0x0, j["lost"] + " lost")), l;
                },
                i = [];
            c["forEach"]((j, l) => {
                const HY = HX;
                l > 0x0 && i[HY(0xc0f)](w(HY(0x12a0), HY(0x472), c[HY(0x1e8)] === 0x2 ? 'vs' : '\xB7')), i[HY(0xc0f)](g(j));
            }), i["push"](w("span", "ab-keys", 'C\x20' + (d ? "free" : "lock") + " · H hide")), this["paint"]("viewport", c["map"](j => j['up'] + '/' + j["lost"])["join"]('\x20') + '\x20' + d, i);
        } ["showScore"](c) {
            const I5 = cX;
            let d = g => {
                const HZ = b;
                let i = w("span", "ab-score " + g["cls"]);
                return i["append"](w('b', void 0x0, g["label"] + ':'), w("span", void 0x0, String(g["kills"]))), i;
            };
            this["paint"]("front", c["map"](g => g["kills"])["join"]('/'), c["map"](d));
        } ["key"] = '';
        ["paint"](c, d, g) {
            const I7 = cX;
            let i = document["getElementById"](c);
            this["bar"] && this["bar"]["parentElement"] !== i && this["hide"](), this["bar"] || (this["bar"] = w("div", "arena-bar"), i?.["appendChild"](this["bar"]), this["key"] = ''), d !== this["key"] && (this["key"] = d, this["bar"]["replaceChildren"](...g));
        } ["hide"]() {
            const I8 = cX;
            this["bar"]?.["remove"](), this["bar"] = null, this["key"] = '';
        }
    },
    yr = class {
        ["root"] = document["createElement"]("div");
        ["shown"] = -0x1;
        constructor(c) {
            const I9 = cX;
            this["root"]["className"] = "hud-clock", this["root"]["hidden"] = !0x0, c["appendChild"](this["root"]);
        } ["update"](c) {
            const Ib = cX;
            let d = Math["floor"](c["time"]);
            d !== this["shown"] && (this["shown"] = d, this["root"]["textContent"] = KW(d), this["root"]["hidden"] = !0x1);
        } ["hide"]() {
            const Ij = cX;
            this["root"]["hidden"] = !0x0, this["shown"] = -0x1;
        }
    },
    w6 = {
        'ok': {
            'cls': 'ok',
            'text': () => "LINK OK"
        },
        'away': {
            'cls': "away",
            'text': c => c + " DOWN"
        },
        'down': {
            'cls': "down",
            'text': () => "NO LINK"
        }
    },
    vr = class {
        constructor(c, d, g, i, j) {
            const Ik = cX;
            this["group"] = c, this["head"] = d, this["orders"] = g, this["timer"] = i, this["home"] = j, this["comms"]["insertBefore"](this["lamp"], this["commsValue"]);
        } ["standing"] = tn("standing", '');
        ["value"] = this["standing"]["querySelector"](".ui-plate-value");
        ["comms"] = tn("comms", '');
        ["commsValue"] = this["comms"]["querySelector"](".ui-plate-value");
        ["lamp"] = w("span", "hud-lamp");
        ["link"] = null;
        ['on'] = !0x1;
        ["setLink"](c) {
            const Iq = cX;
            let d = c === null ? '' : c["kind"] + ':' + (c["kind"] === "away" ? c["who"] : '');
            if (d === this["link"]) return;
            if (this["link"] = d, c === null) {
                this["comms"]["remove"]();
                return;
            }
            let g = w6[c["kind"]];
            this["lamp"]["className"] = "hud-lamp " + g["cls"], this["commsValue"]["textContent"] = g["text"](c["kind"] === "away" ? c["who"] : ''), this["comms"]["isConnected"] || this["group"]["append"](this["comms"]);
        } ["update"](c) {
            const Iw = cX;
            let d = !!c["skirmish"];
            d !== this['on'] && (this['on'] = d, this["head"]["textContent"] = d ? "match" : "orders", this["orders"]["hidden"] = d, d ? this["group"]["append"](this["timer"], this["standing"]) : (this["home"]["insertBefore"](this["timer"], this["home"]["querySelector"](".hud-clock")), this["standing"]["remove"](), this["setLink"](null))), d && this["value"]["textContent"] !== c["status"] && (this["value"]["textContent"] = c["status"]);
        }
    },
    S6 = {
        'frag': "Frags",
        'smoke': "Smoke",
        'flash': "Flashbangs"
    },
    Ln = class {
        ["root"] = document["getElementById"]("hud");
        ["mission"] = document["createElement"]("div");
        ["roster"] = document["createElement"]("div");
        ["loadout"] = document["createElement"]("div");
        ["loadoutKey"] = '';
        ["armed"] = !0x1;
        ["onCallInPress"] = null;
        ["setCallInArmed"](c) {
            const Ix = cX;
            this["armed"] = c;
        } ["objective"] = document["createElement"]("div");
        ["timer"] = Su("hold");
        ["goal"] = document["createElement"]("div");
        ["onExit"] = null;
        ["onRestart"] = null;
        ["onPause"] = null;
        ["toolButtons"] = null;
        ["plates"] = [];
        ["lastPhase"] = null;
        ["lastMission"] = '';
        ["lastGrenades"] = -0x1;
        ["lastStatus"] = '';
        ['ov'] = new lr();
        ["resultPanel"] = new ur(this['ov']);
        ["scorePanel"] = new fr(this['ov']);
        ["briefingPanel"] = new gr(this['ov']);
        ["arena"] = new br();
        ["clock"];
        ["matchPanel"];
        get["briefingUp"]() {
            const Iz = cX;
            return this['ov']["briefingUp"];
        } ["open"](c) {
            const IA = cX;
            this["setup"] = c, this["outcome"] = {
                'record': c["record"],
                'aftermath': null,
                'score': null
            };
        } ["close"](c, d, g = null) {
            const IB = cX;
            this["outcome"] = {
                'record': c,
                'aftermath': d,
                'score': g
            };
        } ["setup"] = {
            'hasNext': !0x0,
            'missionNumber': 0x0,
            'theatreName': '',
            'record': null,
            'onNext': null,
            'onRetry': null,
            'onMissions': null,
            'onDifficulty': null,
            'difficulties': qT,
            'campaign': null,
            'onLoadout': null
        };
        ["outcome"] = {
            'record': null,
            'aftermath': null,
            'score': null
        };
        constructor() {
            const IC = cX;
            this["mission"]["className"] = "hud-mission", this["roster"]["className"] = "hud-roster", this["objective"]["className"] = "hud-objective", this["loadout"]["className"] = "hud-loadout-row";
            let c = (p, ...q) => {
                const ID = IC;
                let u = document[ID(0xae0)](ID(0x3df));
                return u[ID(0x824)] = p, u[ID(0x66b)](...q), u;
            };
            this["goal"]["className"] = "hud-goal";
            let d = document["createElement"]("div");
            d["className"] = "hud-body", d["append"](this["mission"], c("hud-orders", nn("orders"), this["goal"], this["objective"]), c("hud-squad", nn("squad"), this["roster"]), c("hud-loadout", nn("loadout"), this["loadout"]), c("hud-time", nn("time"), this["timer"]["root"]));
            let g = d["querySelector"](".hud-time");
            this["clock"] = new yr(g);
            let j = d["querySelector"](".hud-orders");
            this["matchPanel"] = new vr(j, j["querySelector"](".ui-heading"), this["objective"], this["timer"]["root"], g);
            let l = document["createElement"]("div");
            l["className"] = "hud-tools";
            let m = (p, q, u) => {
                const IE = IC;
                let v = document[IE(0xae0)](IE(0x14ab));
                return v[IE(0xb42)] = IE(0x14ab), v[IE(0x824)] = IE(0x64c) + p, v[IE(0xf90)] = q, v[IE(0x118c)](IE(0x147e), q), v[IE(0x67d)](IE(0x1398), u), v;
            };
            this["toolButtons"] = {
                'exit': m("t-exit", "Leave the mission", () => this["onExit"]?.()),
                'restart': m("t-restart", "Restart the mission", () => this["onRestart"]?.()),
                'pause': m("t-pause", "Pause", () => this["onPause"]?.())
            }, l["append"](this["toolButtons"]["exit"], this["toolButtons"]["restart"], this["toolButtons"]["pause"]), De(this["root"], d, l), this["timer"]["root"]["hidden"] = !0x0;
        } ["setTools"](c) {
            const IF = cX;
            if (!this["toolButtons"]) return;
            let {
                exit: d,
                restart: g,
                pause: i
            } = this["toolButtons"];
            g["hidden"] = !c["restart"], i["hidden"] = !c["pause"], d["title"] = c["exitLabel"], d["setAttribute"]("aria-label", c["exitLabel"]);
        } ["setLink"](c) {
            const IG = cX;
            this["matchPanel"]["setLink"](c);
        } ["mine"](c) {
            const IH = cX;
            return c["soldiers"]["filter"](d => d["faction"] === c["viewSide"]);
        } ["ensureRoster"](c) {
            const II = cX;
            let d = this["mine"](c);
            this["plates"]["length"] === d["length"] && this["plates"]["every"]((g, i) => g["name"] === d[i]["name"]) || (this["roster"]["textContent"] = '', this["plates"] = d["map"](g => {
                const IJ = II;
                let i = tn(g[IJ(0xf4e)], Du(g[IJ(0x319)]));
                return ne(g[IJ(0x319)]) >= 0x3 && i[IJ(0x13c1)][IJ(0x851)](IJ(0x8d1)), g[IJ(0x85a)] && i[IJ(0x13c1)][IJ(0x851)](IJ(0x85a)), i[IJ(0xf90)] = Nu(g[IJ(0x319)]) + IJ(0x6b8) + g[IJ(0x319)] + IJ(0x9d8) + (g[IJ(0x319)] === 0x1 ? '' : 's') + IJ(0xd7d), this[IJ(0xdec)][IJ(0xa20)](i), {
                    'root': i,
                    'alive': !0x0,
                    'name': g[IJ(0xf4e)]
                };
            }));
        } ["flashLoadout"]() {
            const IK = cX;
            let c = this["loadout"]["children"][0x1];
