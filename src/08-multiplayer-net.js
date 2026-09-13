// Multiplayer networking
// `ii` WebSocket client class: dial/retry, greeting, lobby join codes, message queue; `wy` ws URL builder. Live-only — the offline mirror stubs the /ws endpoint.
    if (c) return c;
    let d = Da(Fe[Math["floor"](Math["random"]() * Fe["length"])]) || "SOLDIER";
    return ni(Va, d), d;
}
var Df = c => ni(Va, Da(c)),
    wy = () => (location["protocol"] === "https:" ? "wss" : 'ws') + "://" + location["host"] + "/ws",
    Sy = () => null,
    ii = class {
        constructor(c) {
            const rg = cX;
            this["name"] = c;
        } ["onMsg"] = null;
        ["onWelcome"] = null;
        ["onDrop"] = null;
        ['ws'] = null;
        ["wanted"] = !0x1;
        ["retryMs"] = 0x1f4;
        ["retryTimer"] = 0x0;
        ["greeted"] = !0x1;
        ["queue"] = [];
        ["impair"] = Sy();
        ["deliveryAt"] = 0x0;
        ["open"]() {
            const rj = cX;
            this["wanted"] || (this["wanted"] = !0x0, this["dial"]());
        } ["close"]() {
            const rk = cX;
            this["wanted"] = !0x1, window["clearTimeout"](this["retryTimer"]), this['ws']?.["close"](), this['ws'] = null, this["greeted"] = !0x1, this["queue"] = [];
        }
        get["connected"]() {
            const rq = cX;
            return this['ws']?.["readyState"] === WebSocket["OPEN"];
        } ["reintroduce"]() {
            const rw = cX;
            if (!this["greeted"] || !this["connected"]) return;
            let {
                userId: c,
                secret: d
            } = oi();
            this['ws']["send"](JSON["stringify"]({
                't': "hello",
                'userId': c,
                'secret': d,
                'name': this["name"]() || "SOLDIER",
                'v': Ba,
                'content': Ga
            }));
        } ["send"](c) {
            const rx = cX;
            if (this["greeted"] && this["connected"]) {
                this['ws']["send"](JSON["stringify"](c));
                return;
            }
            c['t'] === "order" || c['t'] === "grenade" || c['t'] === "fire" || this["queue"]["length"] < 0x10 && this["queue"]["push"](c);
        } ["dial"]() {
            const rz = cX;
            this["deliveryAt"] = 0x0;
            let c = new WebSocket(wy());
            this['ws'] = c, c["onopen"] = () => {
                const rA = rz;
                if (this['ws'] !== c || !this[rA(0x5ec)]) {
                    c[rA(0x14c5)]();
                    return;
                }
                this[rA(0xa5c)] = 0x1f4;
                let {
                    userId: d,
                    secret: g
                } = oi();
                c[rA(0xe5d)](JSON[rA(0x200)]({
                    't': rA(0x1030),
                    'userId': d,
                    'secret': g,
                    'name': this[rA(0xf4e)]() || rA(0xf1a),
                    'v': Ba,
                    'content': Ga
                }));
            }, c["onmessage"] = d => {
                const rB = rz;
                if (this['ws'] !== c || !this[rB(0x5ec)]) return;
                let g;
                try {
                    g = JSON[rB(0x4d9)](String(d[rB(0x224)]));
                } catch {
                    return;
                }
                if (g['t'] === rB(0x1596)) {
                    this[rB(0x83f)] = !0x0;
                    let i = this[rB(0x13fc)];
                    this[rB(0x13fc)] = [];
                    for (let j of i) this[rB(0xe5d)](j);
                    this[rB(0x39a)]?.();
                    return;
                }
                if (g['t'] === rB(0xfb5) && /out of date|one identity|who goes there/ [rB(0x127c)](g[rB(0x791)])) {
                    this[rB(0x5a0)]?.(g), this[rB(0x14c5)]();
                    return;
                }
                this[rB(0x12c1)](g, c);
            }, c["onclose"] = () => {
                const rC = rz;
                this['ws'] === c && (this['ws'] = null, this[rC(0x83f)] = !0x1, this[rC(0x5ec)] && (this[rC(0x1097)]?.(), this[rC(0x1572)] = window[rC(0xb84)](() => this[rC(0xc3d)](), this[rC(0xa5c)]), this[rC(0xa5c)] = Math[rC(0x220)](0x1f40, this[rC(0xa5c)] * 0x2)));
            };
        } ["deliver"](c, d) {
            const rD = cX;
            if (this["impair"]) {
                if (c['t'] === "snap" && Math["random"]() < this["impair"]["drop"]) return;
                let g = performance["now"]();
                this["deliveryAt"] = Math["max"](this["deliveryAt"], g + this["impair"]["lag"] + Math["random"]() * this["impair"]["jitter"]), window["setTimeout"](() => {
                    const rE = rD;
                    this['ws'] === d && this[rE(0x5ec)] && this[rE(0x5a0)]?.(c);
                }, this["deliveryAt"] - g);
                return;
            }
            this["onMsg"]?.(c);
        }
    },
    Ey = {
        'opened': "Your game is open. Pass the word to the other lot.",
        'joined': "{name} reports in.",
        'left': "{name} has slipped off somewhere.",
        'ready': "{name} is ready.",
        'readyAgain': "{name} is ready again. Glutton.",
        'unready': "{name} is not ready. Cold feet, is it?",
        'starting': "Game is starting in {n} seconds...",
        'movingOut': "Right -- MOVE OUT!",
        'wonBy': "That settles it: {name} takes the glade, {a} men to {b}.",
        'draw': "A draw. {a} standing apiece. Nobody write home about this one.",
        'walkover': "{name} wins by walkover -- the other side's wire went dead.",
        'paused': "Hold position -- {name}'s wire is down.",
        'ownDrop': "Your wire is down. Redialling...",
        'resumed': "Wire restored. As you were.",
        'gone': "That game has been struck. Off you go.",
        'setMap': "New ground: {value}. Next game.",
        'setDuration': "Match length is {value} now. Next game.",
        'setVisibility': "This game is {value} from here on."
    };

function FT(c, d = {}) {
    const rF = cX;
    return Ey[c]["replace"](/\{(\w+)\}/g, (g, i) => i in d ? String(d[i]) : g);
}
var ri = c => location["origin"] + "/join/" + c,
    Ff = () => {
        const rG = cX;
        let c = /^\/join\/([^/]+)\/?$/ ["exec"](location["pathname"]);
        return c ? decodeURIComponent(c[0x1])["toUpperCase"]() : null;
    },
    Ua = class {
        ["room"] = null;
        ["feed"] = [];
        ["lastError"] = null;
        ["games"] = [];
        ["onChange"] = null;
        ["onJoin"] = null;
        ["startListener"] = null;
        ["pendingStart"] = null;
        ["currentStart"] = null;
        ["latestSnapshot"] = null;
        ["latestPause"] = null;
        ["latestResult"] = null;
        ["gameListener"] = null;
        ["gameRoundId"] = null;
        set["onStart"](c) {
            const rH = cX;
            if (this["startListener"] = c, c && this["pendingStart"]) {
                let d = this["pendingStart"];
                this["pendingStart"] = null, c(d);
            }
        }
        get["onStart"]() {
            const rI = cX;
            return this["startListener"];
        }
        get["onGameMsg"]() {
            const rJ = cX;
            return this["gameListener"];
        }
        set["onGameMsg"](c) {
            const rK = cX;
            this["bindRound"](this["currentStart"]?.["roundId"] ?? null, c);
        } ["bindRound"](c, d) {
            const rL = cX;
            if (this["gameRoundId"] = c, this["gameListener"] = d, !(!d || c !== this["currentStart"]?.["roundId"])) {
                for (let g of [this["latestSnapshot"], this["latestPause"], this["latestResult"]]) g && d(g);
            }
        } ["conn"] = null;
        ["wantedCode"] = ((() => {
            const rM = cX;
            try {
                return sessionStorage["getItem"]("cf.mp.room");
            } catch {
                return null;
            }
        })());
        ["seenReady"] = new Set();
        ["hushUnready"] = !0x1;
        ["ensure"]() {
            const rN = cX;
            if (this["conn"]) {
                this["conn"]["open"]();
                return;
            }
            this["conn"] = new ii(vn), this["conn"]["onMsg"] = c => this["receive"](c), this["conn"]["onWelcome"] = () => {
                const rO = rN;
                this[rO(0x752)] && this[rO(0x1248)][rO(0xe5d)]({
                    't': rO(0x109b),
                    'code': this[rO(0x752)]
                });
            }, this["conn"]["onDrop"] = () => {
                const rP = rN;
                this[rP(0x362)] && this[rP(0x1055)](FT(rP(0xdb6))), this[rP(0x7a0)]();
            }, this["conn"]["open"]();
        }
        get["connected"]() {
            const rQ = cX;
            return this["conn"]?.["connected"] ?? !0x1;
        } ["create"](c = {}) {
            const rR = cX;
            this["ensure"](), this["setWanted"](null), pm(), this["conn"]["send"]({
                't': "create",
                'seconds': c["seconds"] ?? If,
                'visibility': c["visibility"] ?? "private",
                'name': c["name"] ?? ''
            });
        } ["settings"](c) {
            const rS = cX;
            this["conn"]?.["send"]({
                't': "settings",
                ...c
            });
        } ["rename"]() {
            const rU = cX;
            this["conn"]?.["reintroduce"]();
        }
        async ["list"]() {
            const rV = cX;
            try {
                let c = await fetch("/api/games", {
                    'headers': {
                        'accept': "application/json"
                    }
                });
                if (!c['ok']) return;
                let d = await c["json"]();
                if (!Array["isArray"](d["games"])) return;
                this["games"] = d["games"], this["changed"]();
            } catch {}
        } ["join"](c, d = "code") {
            const rX = cX;
            this["ensure"](), this["setWanted"](c["trim"]()["toUpperCase"]()), this["conn"]["send"]({
                't': "join",
                'code': this["wantedCode"]
            }), fm(d);
        }
        get["rememberedCode"]() {
            const rY = cX;
            return this["wantedCode"];
        } ["setWanted"](c) {
            const rZ = cX;
            this["wantedCode"] = c;
            try {
                c ? sessionStorage["setItem"]("cf.mp.room", c) : sessionStorage["removeItem"]("cf.mp.room");
            } catch {}
        } ["ready"](c) {
            const s7 = cX;
            this["conn"]?.["send"]({
                't': "ready",
                'on': c
            });
        } ["order"](c, d) {
            const s8 = cX;
            this["conn"]?.["send"]({
                't': "order",
                'roundId': c,
                'at': d
            });
        } ["grenade"](c, d) {
            const s9 = cX;
            this["conn"]?.["send"]({
                't': "grenade",
                'roundId': c,
                'at': d
            });
        } ["fire"](c, d) {
            const sj = cX;
            this["conn"]?.["send"]({
                't': "fire",
                'roundId': c,
                'at': d
            });
        } ["leave"]() {
            const sk = cX;
            this["conn"]?.["send"]({
                't': "leave"
            }), this["conn"]?.["close"](), this["conn"] = null, this["room"] = null, this["setWanted"](null), this["feed"] = [], this["lastError"] = null, this["pendingStart"] = null, this["currentStart"] = null, this["latestSnapshot"] = null, this["latestPause"] = null, this["latestResult"] = null, this["bindRound"](null, null), this["seenReady"]["clear"]();
        } ["receive"](c) {
            const sq = cX;
            switch (c['t']) {
                case "err":
                    this["lastError"] = c["msg"], this["room"] && this["tell"](c["msg"]), c["msg"] === "no such muster" && (this["gameListener"]?.({
                        't': "gone"
                    }), this["room"] = null, this["setWanted"](null), this["pendingStart"] = null, this["currentStart"] = null, this["latestSnapshot"] = null, this["latestPause"] = null, this["latestResult"] = null), this["changed"]();
                    return;
                case "room":
                    (c["phase"] === "waiting" || c["phase"] === "post") && this["currentStart"] && !this["latestResult"] && (this["gameListener"]?.({
                        't': "gone"
                    }), this["currentStart"] = null, this["pendingStart"] = null, this["latestSnapshot"] = null, this["latestPause"] = null), this["applyRoom"]({
                        'code': c["code"],
                        'name': c["name"],
                        'mapId': c["mapId"],
                        'mode': c["mode"],
                        'seconds': c["seconds"],
                        'visibility': c["visibility"],
                        'fog': c["fog"],
                        'edgeScroll': c["edgeScroll"],
                        'rounds': c["rounds"],
                        'roundsPlayed': c["roundsPlayed"],
                        'squad': c["squad"],
                        'phase': c["phase"] ?? "waiting",
                        'seats': c["seats"],
                        'you': c["you"]
                    });
                    return;
                case "chat":
                    this["push"]({
                        'kind': "chat",
                        'id': c['id'],
                        'text': c["text"],
                        'from': c["from"],
                        'colour': c["colour"]
                    });
                    return;
                case "countdown":
                    c["seconds"] > 0x0 && this["tell"](FT("starting", {
                        'n': c["seconds"]
                    }));
                    return;
                case "start":
                    this["hushUnready"] = !0x0, this["tell"](FT("movingOut")), hm(c["mapId"], c["round"]);
                    {
                        let d = {
                            'roundId': c["roundId"],
                            'mapId': c["mapId"],
                            'seconds': c["seconds"],
                            'side': c["side"],
                            'colours': c["colours"],
                            'fog': c["fog"],
                            'edgeScroll': c["edgeScroll"],
                            'preroll': c["preroll"],
                            'round': c["round"],
                            'rounds': c["rounds"],
                            'squad': c["squad"],
                            'receivedAt': performance["now"]()
                        };
                        if (this["currentStart"]?.["roundId"] === d["roundId"]) {
                            this["currentStart"] = d;
                            return;
                        }
                        this["currentStart"] = d, this["latestSnapshot"] = null, this["latestPause"] = null, this["latestResult"] = null, this["startListener"] ? this["startListener"](d) : this["pendingStart"] = d;
                    }
                    return;
                case "gone":
                    this["tell"](FT("gone")), this["room"] = null, this["setWanted"](null), this["pendingStart"] = null, this["currentStart"] = null, this["latestSnapshot"] = null, this["latestPause"] = null, this["latestResult"] = null, this["gameListener"]?.(c), this["changed"]();
                    return;
                case "snap":
                case "over":
                case "pause":
                    if (c["roundId"] !== this["currentStart"]?.["roundId"]) return;
                    if (c['t'] === "snap") {
                        if (this["latestSnapshot"] && c["seq"] <= this["latestSnapshot"]["seq"]) return;
                        this["latestSnapshot"] = c;
                    } else c['t'] === "pause" ? this["latestPause"] = c : this["latestResult"] = c;
                    this["gameRoundId"] === c["roundId"] && this["gameListener"]?.(c);
                    return;
            }
        } ["applyRoom"](c) {
            const sw = cX;
            let d = this["room"];
            if (this["lastError"] = null, d) {
                for (let g = 0x0; g < c["seats"]["length"]; g++) {
                    let i = c["seats"][g],
                        j = d["seats"]["find"](l => l['id'] === i['id']);
                    if (!j) {
                        this["tell"](FT("joined", {
                            'name': i["name"]
                        })), this["onJoin"]?.(i["name"]);
                        continue;
                    }
                    i["ready"] && !j["ready"] ? (this["tell"](FT(this["seenReady"]["has"](i['id']) ? "readyAgain" : "ready", {
                        'name': i["name"]
                    })), this["seenReady"]["add"](i['id'])) : !i["ready"] && j["ready"] && !this["hushUnready"] && this["tell"](FT("unready", {
                        'name': i["name"]
                    })), !i["connected"] && j["connected"] && this["tell"](FT("paused", {
                        'name': i["name"]
                    })), i["connected"] && !j["connected"] && this["tell"](FT("resumed"));
                }
                for (let l of d["seats"]) c["seats"]["some"](m => m['id'] === l['id']) || this["tell"](FT("left", {
                    'name': l["name"]
                }));
                c["mapId"] !== d["mapId"] && this["tell"](FT("setMap", {
                    'value': c["mapId"]
                })), c["seconds"] !== d["seconds"] && this["tell"](FT("setDuration", {
                    'value': Math["round"](c["seconds"] / 0x3c) + " MINUTE" + (c["seconds"] === 0x3c ? '' : 'S')
                })), c["visibility"] !== d["visibility"] && this["tell"](FT("setVisibility", {
                    'value': c["visibility"]["toUpperCase"]()
                }));
            } else {
                this["setWanted"](c["code"]), this["tell"](FT("opened"));
                for (let m of c["seats"]) this["tell"](FT("joined", {
                    'name': m["name"]
                }));
            }
            this["room"] = c, this["hushUnready"] = !0x1, this["changed"]();
        } ["reportResult"](c, d, g, i, j = null) {
            const sx = cX;
            gm(j, d), d === "forfeit" && c ? this["tell"](FT("walkover", {
                'name': c
            })) : c ? this["tell"](FT("wonBy", {
                'name': c,
                'a': g,
                'b': i
            })) : this["tell"](FT("draw", {
                'a': g
            }));
        } ["say"](c) {
            const sz = cX;
            let d = c["trim"]()["slice"](0x0, ei);
            if (!d || !this["room"]) return;
            let g = crypto["randomUUID"](),
                i = this["room"]["seats"][this["room"]["you"]];
            this["push"]({
                'kind': "chat",
                'id': g,
                'text': d,
                'from': i?.["name"] ?? "YOU",
                'colour': i?.["colour"]
            }), this["conn"]?.["send"]({
                't': "chat",
                'id': g,
                'text': d
            });
        } ["note"](c) {
            const sA = cX;
            if (this["room"]) {
                this["tell"](c);
                return;
            }
            this["lastError"] = c, this["changed"]();
        } ["tell"](c) {
            const sB = cX;
            this["push"]({
                'kind': "said",
                'text': c
            });
        } ["push"](c) {
            const sC = cX;
            c['id'] !== void 0x0 && this["feed"]["some"](d => d['id'] === c['id']) || (this["feed"]["push"](c), this["feed"]["length"] > 0x3c && this["feed"]["splice"](0x0, this["feed"]["length"] - 0x3c), this["changed"]());
        } ["changed"]() {
            const sD = cX;
            this["onChange"]?.();
        }
    },
    $ = new Ua();
async function Bf(c) {
    const sE = cX;
    try {
        let d = await fetch("/api/rooms/" + encodeURIComponent(c["trim"]()["toUpperCase"]()));
        return d['ok'] ? await d["json"]() : null;
    } catch {
        return null;
    }
}
var bW = [{
        'id': "smg",
        'category': "weapon",
        'name': "SMG",
        'blurb': "Close work, steady hands. Lost across a field.",
        'ready': !0x0,
        'weapon': "smg"
    }, {
        'id': "shotgun",
        'category': "weapon",
        'name': "Shotgun",
        'blurb': "A doorway argument, settled.",
        'ready': !0x0,
        'weapon': "shotgun"
    }, {
        'id': "sniperRifle",
        'category': "weapon",
        'name': "Sniper Rifle",
        'blurb': "Reaches further than you can see.",
        'ready': !0x0,
        'weapon': "sniperRifle"
    }, {
        'id': "frag",
        'category': "throwable",
        'name': "Frag Grenades",
        'blurb': "The classic argument-ender.",
        'ready': !0x0
    }, {
        'id': "smoke",
        'category': "throwable",
        'name': "Smoke Grenades",
        'blurb': "Nobody shoots what nobody sees.",
        'ready': !0x0
    }, {
        'id': "flashbang",
        'category': "throwable",
        'name': "Flashbangs",
        'blurb': "A very loud opinion. Everyone nearby forgets theirs.",
        'ready': !0x0
    }, {
        'id': "supplyDrop",
        'category': "callin",
        'name': "Supply Drop",
        'blurb': "A crate from a friendlier sky.",
        'ready': !0x0
    }, {
        'id': "airstrike",
        'category': "callin",
        'name': "Airstrike",
        'blurb': "Point at the problem. The air corps does the rest.",
        'ready': !0x0
    }, {
        'id': "reinforcements",
        'category': "callin",
        'name': "Reinforcements",
        'blurb': "More men, mid-fight, by parachute.",
        'ready': !0x0
    }, {
        'id': "squadSlot4",
        'category': "squad",
        'name': "A Fourth Soldier",
        'blurb': "Another name on the roster, another man on the ground.",
        'ready': !0x0
    }, {
        'id': "squadSlot5",
        'category': "squad",
        'name': "A Fifth Soldier",
        'blurb': "Five is a squad with a spare opinion.",
        'ready': !0x0,
        'requires': "squadSlot4"
    }, {
        'id': "squadSlot6",
        'category': "squad",
        'name': "A Sixth Soldier",
        'blurb': "The full six, as the war used to afford.",
        'ready': !0x0,
        'requires': "squadSlot5"
    }],
    My = c => f["economy"]["startingSquadCapacity"] + ["squadSlot4", "squadSlot5", "squadSlot6"]["filter"](d => c["includes"](d))["length"],
    $a = new Map(bW["map"](c => [c['id'], c])),
    ZW = c => f["economy"]["prices"][c],
    $e = (c, d) => c["unlocked"]["includes"](d),
    si = c => {
        const sF = cX;
        let d = $a["get"](c);
        return d?.["category"] === "throwable" || d?.["category"] === "callin";
    },
    gW = (c, d) => Math["max"](0x0, Math["floor"](c["stock"][d] ?? 0x0));

function Hf(c, d) {
    const sG = cX;
    let g = $a["get"](d);
    if (!g || !g["ready"] || !si(d)) return !0x1;
    let i = ZW(d);
    return c["bonds"] < i ? !0x1 : (c["bonds"] -= i, c["stock"][d] = gW(c, d) + 0x1, pe(c), !0x0);
}

function Ka(c, d, g) {
    const sH = cX;
    let i = Math["max"](0x0, Math["min"](Math["floor"](g), gW(c, d)));
    return i === 0x0 ? 0x0 : (c["stock"][d] = gW(c, d) - i, pe(c), i);
}

function ai(c, d) {
    const sI = cX;
    let g = Math["max"](0x0, Math["floor"](d["callInsUsed"]));
    return d["callInsUsed"] = 0x0, g === 0x0 || d["squadCallIn"] === "none" ? 0x0 : Ka(c, d["squadCallIn"], g);
}

function Gf(c, d) {
    const sJ = cX;
    let g = $a["get"](d);
    if (!g || !g["ready"] || si(d) || $e(c, d) || g["requires"] && !c["unlocked"]["includes"](g["requires"])) return !0x1;
    let i = ZW(d);
    return c["bonds"] < i ? !0x1 : (c["bonds"] -= i, c["unlocked"]["push"](d), c["squadCapacity"] = My(c["unlocked"]), pe(c), !0x0);
}

function za(c) {
    const sK = cX;
    return ["basicRifle", ...bW["filter"](d => d["category"] === "weapon" && d["weapon"] && $e(c, d['id']))["map"](d => d["weapon"])];
}

function li(c) {
    const sL = cX;
    return za(c)["includes"](c["loadout"]["weapon"]) ? c["loadout"]["weapon"] : "basicRifle";
}
var ci = {
        'basicRifle': "Basic Rifle",
        'smg': "SMG",
        'assaultRifle': "Assault Rifle",
        'shotgun': "Shotgun",
        'sniperRifle': "Sniper Rifle",
        'fists': "Fists",
        'enemyRifle': "Service Rifle",
        'pistol': "Sidearm",
        'bazooka': "Bazooka"
    },
    ge = {
        'frag': "frag",
        'smoke': "smoke",
        'flash': "flashbang"
    },
    Ya = (c, d) => gW(c, ge[d]) > 0x0;

function Vf(c) {
    const sM = cX;
    return ["frag", "smoke", "flash"]["filter"](d => {
        const sN = sM;
        let g = bW[sN(0x1f6)](i => i['id'] === ge[d]);
        return g?.[sN(0x160d)] && gW(c, g['id']) > 0x0;
    });
}

function Xa(c) {
    const sO = cX;
    return ["supplyDrop", "airstrike", "reinforcements"]["filter"](d => {
        const sP = sO;
        let g = bW[sP(0x1f6)](i => i['id'] === d);
        return g?.[sP(0x160d)] && gW(c, g['id']) > 0x0;
    });
}

function _n(c) {
    const sQ = cX;
    let d = c["loadout"]["callin"];
    return d !== "none" && Xa(c)["includes"](d) ? d : void 0x0;
}
var di = {
        'supplyDrop': "Supply Drop",
        'airstrike': "Airstrike",
        'reinforcements': "Reinforcements"
    },
    Cy = null,
    qf = new Map(),
    Uf = new Map();

function $f(c) {
    const sR = cX;
    if (!Yp(c)) return Ke(c);
    let d = Uf["get"](c);
    return d || (d = zp(c), Uf["set"](c, d)), d;
}
var Ay = null,
    Ry = null;

function Ke(c, d = !0x1) {
    const sS = cX;
    let g = (Cy ??= zo(Ko(0x0)))[c];
    if (!g || !d) return g;
    let i = qf["get"](c);
    return i || (i = xd(g), qf["set"](c, i)), i;
}
var ui = () => Ay ??= m1("note"),
    xn = () => Ry ??= m1("icon"),
    Ja = (c, d, g) => IT(c, d, g),
    jy = 0x2;

function zf(c, d) {
    let g = Kf;
    Ho(i => {
        const sT = b;
        let j = w("div", "ar-head"),
            l = w("div", "ar-list panel-body");
        return mi({
            'head': j,
            'list': l,
            'campaign': c,
            'tab': () => g,
            'onTab': m => {
                g = m, Kf = m;
            }
        }), [j, l];
    }, d, {
        'wide': !0x0
    });
}
var Kf = "weapon";

function Iy(c, d, g) {
    const sU = cX;
    let j = w("div", "ar-card" + (c["ready"] ? '' : " pending")),
        l = w("div", "ar-art"),
        m = Ke(c['id']);
    m && l["appendChild"](eT(m, jy)), j["appendChild"](l), j["appendChild"](w("span", "ar-name", c["name"]["toUpperCase"]())), j["appendChild"](w("span", "ar-blurb", c["blurb"]));
    let p = w("div", "ar-foot");
    if (si(c['id'])) {
        let q = ZW(c['id']);
        p["appendChild"](w("span", "ar-have", "HAVE " + gW(d, c['id'])));
        let u = w("div", "ar-price");
        u["appendChild"](eT(xn(), 0x2)), u["appendChild"](w("span", "ar-price-n", String(q))), p["appendChild"](u);
        let v = Ja("BUY +1", "ar-buy", () => {
            const sV = sU;
            if (c[sV(0x160d)]) {
                if (d[sV(0x1146)] < q) {
                    CW(v, sV(0x11eb));
                    return;
                }
                Hf(d, c['id']) && (la(c['id'], q, d[sV(0x1146)]), g());
            }
        });
        return (!c["ready"] || d["bonds"] < q) && (v["setAttribute"]("aria-disabled", "true"), v["classList"]["add"]("off")), p["appendChild"](v), j["appendChild"](p), j;
    }
    if ($e(d, c['id'])) {
        let y = Ja("OWNED", "ar-buy owned", () => {});
        y["setAttribute"]("aria-disabled", "true"), p["appendChild"](y);
    } else {
        if (!c["ready"]) p["appendChild"](w("span", "ar-soon", "ON REQUISITION"));
        else {
            let A = ZW(c['id']),
                C = w("div", "ar-price");
            C["appendChild"](eT(Pe(!0x0), 0x2, "ar-lock")), C["appendChild"](eT(xn(), 0x2)), C["appendChild"](w("span", "ar-price-n", String(A))), p["appendChild"](C);
            let E = Ja("UNLOCK", "ar-buy", () => {
                const sX = sU;
                if (d[sX(0x1146)] < A) {
                    CW(E, sX(0x11eb));
                    return;
                }
                Gf(d, c['id']) && (la(c['id'], A, d[sX(0x1146)]), g());
            });
            d["bonds"] < A && (E["setAttribute"]("aria-disabled", "true"), E["classList"]["add"]("off")), p["appendChild"](E);
        }
    }
    return j["appendChild"](p), j;
}

function mi(c) {
    const sY = cX;
    let {
        head: d,
        list: g,
        campaign: j
    } = c, m = () => mi(c);
    d["textContent"] = '', c["closeButton"] && d["appendChild"](c["closeButton"]);
    let p = w("div", "ar-titles");
    p["appendChild"](w("span", "ar-title", "THE ARMOURY")), p["appendChild"](w("span", "ar-sub", "BETTER GEAR. HIGHER SURVIVAL RATE.")), d["appendChild"](p);
    let q = w("div", "ar-bonds");
    q["appendChild"](eT(ui(), 0x2));
    let s = w("div", "ar-bonds-text");
    s["appendChild"](w("span", "ar-bonds-k", "WAR BONDS")), s["appendChild"](w("span", "ar-bonds-n", String(j["bonds"]))), q["appendChild"](s), d["appendChild"](q), g["textContent"] = '';
    let u = Fo([
        ["weapon", "WEAPONS", "smg"],
        ["throwable", "THROWABLES", "frag"],
        ["callin", "CALL-INS", "airstrike"]
    ]["map"](([v, y, A]) => ({
        'id': v,
        'label': y,
        'icon': Ke(A),
        'panel': () => {
            const sZ = sY;
            let C = w(sZ(0x3df), sZ(0x846)),
                E = w(sZ(0x3df), sZ(0x82d));
            for (let F of bW[sZ(0xe37)](H => H[sZ(0xd39)] === v)) E[sZ(0xa20)](Iy(F, j, () => {
                const t7 = sZ;
                m(), c[t7(0xb1a)]?.();
            }));
            return C[sZ(0xa20)](E), C;
        }
    })));
    u["select"](c["tab"]());
    for (let v of u["root"]["querySelectorAll"](".ui-tab")) v["addEventListener"]("click", () => {
        const t8 = sY;
        c[t8(0x6f7)](v[t8(0x11f0)]['id']);
    });
    g["append"](u["root"], u["body"]);
}
var Xf = "cf.lastGroup",
    Py = () => {
        const t9 = cX;
        try {
            return localStorage["getItem"](Xf);
        } catch {
            return null;
        }
    },
    Ly = c => {
        const tg = cX;
        try {
            localStorage["setItem"](Xf, c);
        } catch {}
    },
    pi = c => aT[c]?.["name"]?.["toUpperCase"]() ?? c["toUpperCase"](),
    Yf = c => {
        const tj = cX;
        let d = aT[c]?.["grid"] ?? '',
            g = i => d["split"](i)["length"] - 0x1;
        return Math["max"](0x1, Math["min"](g('P'), g('Q')));
    },
    RW = (c, d, g) => IT(c, d, g);

function Oy(c) {
    const tk = cX;
    let d = w("div", "fx-stars");
    for (let g = 0x0; g < 0x3; g++) d["appendChild"](w('i', g < c ? "fx-star on" : "fx-star"));
    return d;
}

function Ny(c) {
    const tq = cX;
    let d = (c["brief"] || c["mechanic"] || '')["trim"]();
    if (!d) return '';
    let g = d["split"](/\s+/);
    return g["length"] <= 0xa ? d : g["slice"](0x0, 0x9)["join"]('\x20') + '…';
}

function Jf(q, A, F, H, K, L) {
    const tw = cX;
    Ne();
    let N = document["getElementById"]("front"),
        P = document["getElementById"]("intro"),
        Q = document["getElementById"]("select"),
        U = document["getElementById"]("front-inner"),
        V = document["getElementById"]("armoury"),
        X = "weapon",
        Y = document["getElementById"]("armoury-head"),
        a7 = document["getElementById"]("armoury-list"),
        a8 = document["getElementById"]("lobby"),
        a9 = document["getElementById"]("lobby-head"),
        aj = document["getElementById"]("lobby-actions"),
        ak = document["getElementById"]("lobby-games"),
        aq = document["getElementById"]("lobby-body"),
        aw = document["getElementById"]("lobby-note"),
        ax = document["getElementById"]("select-rail"),
        az = document["getElementById"]("select-list"),
        aA = document["getElementById"]("intro-actions"),
        aB = document["getElementById"]("select-head"),
        aC = document["getElementById"]("front-logo"),
        aD = F,
        aE = Co(q, K),
        aF = q1(q);
    return new Promise(aG => {
        const tC = tw;
        let aH = !0x1,
            aI = bU => {
                const tx = b;
                aH || (aH = !0x0, MW(0x1), N["classList"]["add"]("leaving"), window["setTimeout"](() => {
                    const tz = tx;
                    bO(), bP[tz(0x225)](), bQ(), bD(), document[tz(0x1260)](tz(0x6f1), bR), U[tz(0x1260)](tz(0x822), bS), $[tz(0x146d)] = null, $[tz(0xbca)] = null, $[tz(0x14f3)] = null, window[tz(0x1189)](bz), N[tz(0x6ad)] = !0x0, N[tz(0x13c1)][tz(0x225)](tz(0x9ff)), aG(bU);
