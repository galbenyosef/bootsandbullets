    if (c) return c;
    let d = Da(Fe[Math.floor(Math.random() * Fe.length)]) || "SOLDIER";
    return ni(Va, d), d;
}
var Df = c => ni(Va, Da(c)),
    wy = () => (location.protocol === "https:" ? "wss" : 'ws') + "://" + location.host + "/ws",
    Sy = () => null,
    ii = class {
        constructor(c) {
            const rg = cX;
            this.name = c;
        } ["onMsg"] = null;
        ["onWelcome"] = null;
        ["onDrop"] = null;
        ['ws'] = null;
        ["wanted"] = false;
        ["retryMs"] = 500;
        ["retryTimer"] = 0;
        ["greeted"] = false;
        ["queue"] = [];
        ["impair"] = Sy();
        ["deliveryAt"] = 0;
        open() {
            const rj = cX;
            this.wanted || (this.wanted = true, this.dial());
        } close() {
            const rk = cX;
            this.wanted = false, window.clearTimeout(this.retryTimer), this.ws?.close(), this.ws = null, this.greeted = false, this.queue = [];
        }
        getconnected() {
            const rq = cX;
            return this.ws?.readyState === WebSocket.OPEN;
        } reintroduce() {
            const rw = cX;
            if (!this.greeted || !this.connected) return;
            let {
                userId: c,
                secret: d
            } = oi();
            this.ws.send(JSON.stringify({
                t: "hello",
                userId: c,
                secret: d,
                name: this.name() || "SOLDIER",
                v: Ba,
                content: Ga
            }));
        } send(c) {
            const rx = cX;
            if (this.greeted && this.connected) {
                this.ws.send(JSON.stringify(c));
                return;
            }
            c.t === "order" || c.t === "grenade" || c.t === "fire" || this.queue.length < 16 && this.queue.push(c);
        } dial() {
            const rz = cX;
            this.deliveryAt = 0;
            let c = new WebSocket(wy());
            this.ws = c, c.onopen = () => {
                const rA = rz;
                if (this.ws !== c || !this.wanted) {
                    c.close();
                    return;
                }
                this.retryMs = 500;
                let {
                    userId: d,
                    secret: g
                } = oi();
                c.send(JSON.stringify({
                    t: "hello",
                    userId: d,
                    secret: g,
                    name: this.name() || "SOLDIER",
                    v: Ba,
                    content: Ga
                }));
            }, c.onmessage = d => {
                const rB = rz;
                if (this.ws !== c || !this.wanted) return;
                let g;
                try {
                    g = JSON.parse(String(d.data));
                } catch {
                    return;
                }
                if (g.t === "welcome") {
                    this.greeted = true;
                    let i = this.queue;
                    this.queue = [];
                    for (let j of i) this.send(j);
                    this.onWelcome?.();
                    return;
                }
                if (g.t === "err" && /out of date|one identity|who goes there/ .test(g.msg)) {
                    this.onMsg?.(g), this.close();
                    return;
                }
                this.deliver(g, c);
            }, c.onclose = () => {
                const rC = rz;
                this.ws === c && (this.ws = null, this.greeted = false, this.wanted && (this.onDrop?.(), this.retryTimer = window.setTimeout(() => this.dial(), this.retryMs), this.retryMs = Math.min(8000, this.retryMs * 2)));
            };
        } deliver(c, d) {
            const rD = cX;
            if (this.impair) {
                if (c.t === "snap" && Math.random() < this.impair.drop) return;
                let g = performance.now();
                this.deliveryAt = Math.max(this.deliveryAt, g + this.impair.lag + Math.random() * this.impair.jitter), window.setTimeout(() => {
                    const rE = rD;
                    this.ws === d && this.wanted && this.onMsg?.(c);
                }, this.deliveryAt - g);
                return;
            }
            this.onMsg?.(c);
        }
    },
    Ey = {
        opened: "Your game is open. Pass the word to the other lot.",
        joined: "{name} reports in.",
        left: "{name} has slipped off somewhere.",
        ready: "{name} is ready.",
        readyAgain: "{name} is ready again. Glutton.",
        unready: "{name} is not ready. Cold feet, is it?",
        starting: "Game is starting in {n} seconds...",
        movingOut: "Right -- MOVE OUT!",
        wonBy: "That settles it: {name} takes the glade, {a} men to {b}.",
        draw: "A draw. {a} standing apiece. Nobody write home about this one.",
        walkover: "{name} wins by walkover -- the other side's wire went dead.",
        paused: "Hold position -- {name}'s wire is down.",
        ownDrop: "Your wire is down. Redialling...",
        resumed: "Wire restored. As you were.",
        gone: "That game has been struck. Off you go.",
        setMap: "New ground: {value}. Next game.",
        setDuration: "Match length is {value} now. Next game.",
        setVisibility: "This game is {value} from here on."
    };

function formatTemplate(c, d = {}) {
    const rF = cX;
    return Ey[c].replace(/\{(\w+)\}/g, (g, i) => i in d ? String(d[i]) : g);
}
var ri = c => location.origin + "/join/" + c,
    Ff = () => {
        const rG = cX;
        let c = /^\/join\/([^/]+)\/?$/ .exec(location.pathname);
        return c ? decodeURIComponent(c[1]).toUpperCase() : null;
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
        setonStart(c) {
            const rH = cX;
            if (this.startListener = c, c && this.pendingStart) {
                let d = this.pendingStart;
                this.pendingStart = null, c(d);
            }
        }
        getonStart() {
            const rI = cX;
            return this.startListener;
        }
        getonGameMsg() {
            const rJ = cX;
            return this.gameListener;
        }
        setonGameMsg(c) {
            const rK = cX;
            this.bindRound(this.currentStart?.roundId ?? null, c);
        } bindRound(c, d) {
            const rL = cX;
            if (this.gameRoundId = c, this.gameListener = d, !(!d || c !== this.currentStart?.roundId)) {
                for (let g of [this.latestSnapshot, this.latestPause, this.latestResult]) g && d(g);
            }
        } ["conn"] = null;
        ["wantedCode"] = ((() => {
            const rM = cX;
            try {
                return sessionStorage.getItem("cf.mp.room");
            } catch {
                return null;
            }
        })());
        ["seenReady"] = new Set();
        ["hushUnready"] = false;
        ensure() {
            const rN = cX;
            if (this.conn) {
                this.conn.open();
                return;
            }
            this.conn = new ii(vn), this.conn.onMsg = c => this.receive(c), this.conn.onWelcome = () => {
                const rO = rN;
                this.wantedCode && this.conn.send({
                    t: "join",
                    code: this.wantedCode
                });
            }, this.conn.onDrop = () => {
                const rP = rN;
                this.room && this.tell(formatTemplate("ownDrop")), this.changed();
            }, this.conn.open();
        }
        getconnected() {
            const rQ = cX;
            return this.conn?.connected ?? false;
        } create(c = {}) {
            const rR = cX;
            this.ensure(), this.setWanted(null), pm(), this.conn.send({
                t: "create",
                seconds: c.seconds ?? If,
                visibility: c.visibility ?? "private",
                name: c.name ?? ''
            });
        } settings(c) {
            const rS = cX;
            this.conn?.send({
                t: "settings",
                ...c
            });
        } rename() {
            const rU = cX;
            this.conn?.reintroduce();
        }
        async list() {
            const rV = cX;
            try {
                let c = await fetch("/api/games", {
                    headers: {
                        accept: "application/json"
                    }
                });
                if (!c.ok) return;
                let d = await c.json();
                if (!Array.isArray(d.games)) return;
                this.games = d.games, this.changed();
            } catch {}
        } join(c, d = "code") {
            const rX = cX;
            this.ensure(), this.setWanted(c.trim().toUpperCase()), this.conn.send({
                t: "join",
                code: this.wantedCode
            }), fm(d);
        }
        getrememberedCode() {
            const rY = cX;
            return this.wantedCode;
        } setWanted(c) {
            const rZ = cX;
            this.wantedCode = c;
            try {
                c ? sessionStorage.setItem("cf.mp.room", c) : sessionStorage.removeItem("cf.mp.room");
            } catch {}
        } ready(c) {
            const s7 = cX;
            this.conn?.send({
                t: "ready",
                on: c
            });
        } order(c, d) {
            const s8 = cX;
            this.conn?.send({
                t: "order",
                roundId: c,
                at: d
            });
        } grenade(c, d) {
            const s9 = cX;
            this.conn?.send({
                t: "grenade",
                roundId: c,
                at: d
            });
        } fire(c, d) {
            const sj = cX;
            this.conn?.send({
                t: "fire",
                roundId: c,
                at: d
            });
        } leave() {
            const sk = cX;
            this.conn?.send({
                t: "leave"
            }), this.conn?.close(), this.conn = null, this.room = null, this.setWanted(null), this.feed = [], this.lastError = null, this.pendingStart = null, this.currentStart = null, this.latestSnapshot = null, this.latestPause = null, this.latestResult = null, this.bindRound(null, null), this.seenReady.clear();
        } receive(c) {
            const sq = cX;
            switch (c.t) {
                case "err":
                    this.lastError = c.msg, this.room && this.tell(c.msg), c.msg === "no such muster" && (this.gameListener?.({
                        t: "gone"
                    }), this.room = null, this.setWanted(null), this.pendingStart = null, this.currentStart = null, this.latestSnapshot = null, this.latestPause = null, this.latestResult = null), this.changed();
                    return;
                case "room":
                    (c.phase === "waiting" || c.phase === "post") && this.currentStart && !this.latestResult && (this.gameListener?.({
                        t: "gone"
                    }), this.currentStart = null, this.pendingStart = null, this.latestSnapshot = null, this.latestPause = null), this.applyRoom({
                        code: c.code,
                        name: c.name,
                        mapId: c.mapId,
                        mode: c.mode,
                        seconds: c.seconds,
                        visibility: c.visibility,
                        fog: c.fog,
                        edgeScroll: c.edgeScroll,
                        rounds: c.rounds,
                        roundsPlayed: c.roundsPlayed,
                        squad: c.squad,
                        phase: c.phase ?? "waiting",
                        seats: c.seats,
                        you: c.you
                    });
                    return;
                case "chat":
                    this.push({
                        kind: "chat",
                        id: c.id,
                        text: c.text,
                        from: c.from,
                        colour: c.colour
                    });
                    return;
                case "countdown":
                    c.seconds > 0 && this.tell(formatTemplate("starting", {
                        n: c.seconds
                    }));
                    return;
                case "start":
                    this.hushUnready = true, this.tell(formatTemplate("movingOut")), hm(c.mapId, c.round);
                    {
                        let d = {
                            roundId: c.roundId,
                            mapId: c.mapId,
                            seconds: c.seconds,
                            side: c.side,
                            colours: c.colours,
                            fog: c.fog,
                            edgeScroll: c.edgeScroll,
                            preroll: c.preroll,
                            round: c.round,
                            rounds: c.rounds,
                            squad: c.squad,
                            receivedAt: performance.now()
                        };
                        if (this.currentStart?.roundId === d.roundId) {
                            this.currentStart = d;
                            return;
                        }
                        this.currentStart = d, this.latestSnapshot = null, this.latestPause = null, this.latestResult = null, this.startListener ? this.startListener(d) : this.pendingStart = d;
                    }
                    return;
                case "gone":
                    this.tell(formatTemplate("gone")), this.room = null, this.setWanted(null), this.pendingStart = null, this.currentStart = null, this.latestSnapshot = null, this.latestPause = null, this.latestResult = null, this.gameListener?.(c), this.changed();
                    return;
                case "snap":
                case "over":
                case "pause":
                    if (c.roundId !== this.currentStart?.roundId) return;
                    if (c.t === "snap") {
                        if (this.latestSnapshot && c.seq <= this.latestSnapshot.seq) return;
                        this.latestSnapshot = c;
                    } else c.t === "pause" ? this.latestPause = c : this.latestResult = c;
                    this.gameRoundId === c.roundId && this.gameListener?.(c);
                    return;
            }
        } applyRoom(c) {
            const sw = cX;
            let d = this.room;
            if (this.lastError = null, d) {
                for (let g = 0; g < c.seats.length; g++) {
                    let i = c.seats[g],
                        j = d.seats.find(l => l.id === i.id);
                    if (!j) {
                        this.tell(formatTemplate("joined", {
                            name: i.name
                        })), this.onJoin?.(i.name);
                        continue;
                    }
                    i.ready && !j.ready ? (this.tell(formatTemplate(this.seenReady.has(i.id) ? "readyAgain" : "ready", {
                        name: i.name
                    })), this.seenReady.add(i.id)) : !i.ready && j.ready && !this.hushUnready && this.tell(formatTemplate("unready", {
                        name: i.name
                    })), !i.connected && j.connected && this.tell(formatTemplate("paused", {
                        name: i.name
                    })), i.connected && !j.connected && this.tell(formatTemplate("resumed"));
                }
                for (let l of d.seats) c.seats.some(m => m.id === l.id) || this.tell(formatTemplate("left", {
                    name: l.name
                }));
                c.mapId !== d.mapId && this.tell(formatTemplate("setMap", {
                    value: c.mapId
                })), c.seconds !== d.seconds && this.tell(formatTemplate("setDuration", {
                    value: Math.round(c.seconds / 60) + " MINUTE" + (c.seconds === 60 ? '' : 'S')
                })), c.visibility !== d.visibility && this.tell(formatTemplate("setVisibility", {
                    value: c.visibility.toUpperCase()
                }));
            } else {
                this.setWanted(c.code), this.tell(formatTemplate("opened"));
                for (let m of c.seats) this.tell(formatTemplate("joined", {
                    name: m.name
                }));
            }
            this.room = c, this.hushUnready = false, this.changed();
        } reportResult(c, d, g, i, j = null) {
            const sx = cX;
            gm(j, d), d === "forfeit" && c ? this.tell(formatTemplate("walkover", {
                name: c
            })) : c ? this.tell(formatTemplate("wonBy", {
                name: c,
                a: g,
                b: i
            })) : this.tell(formatTemplate("draw", {
                a: g
            }));
        } say(c) {
            const sz = cX;
            let d = c.trim().slice(0, ei);
            if (!d || !this.room) return;
            let g = crypto.randomUUID(),
                i = this.room.seats[this.room.you];
            this.push({
                kind: "chat",
                id: g,
                text: d,
                from: i?.name ?? "YOU",
                colour: i?.colour
            }), this.conn?.send({
                t: "chat",
                id: g,
                text: d
            });
        } note(c) {
            const sA = cX;
            if (this.room) {
                this.tell(c);
                return;
            }
            this.lastError = c, this.changed();
        } tell(c) {
            const sB = cX;
            this.push({
                kind: "said",
                text: c
            });
        } push(c) {
            const sC = cX;
            c.id !== void 0 && this.feed.some(d => d.id === c.id) || (this.feed.push(c), this.feed.length > 60 && this.feed.splice(0, this.feed.length - 60), this.changed());
        } changed() {
            const sD = cX;
            this.onChange?.();
        }
    },
    $ = new Ua();
async function Bf(c) {
    const sE = cX;
    try {
        let d = await fetch("/api/rooms/" + encodeURIComponent(c.trim().toUpperCase()));
        return d.ok ? await d.json() : null;
    } catch {
        return null;
    }
}
var bW = [{
        id: "smg",
        category: "weapon",
        name: "SMG",
        blurb: "Close work, steady hands. Lost across a field.",
        ready: true,
        weapon: "smg"
    }, {
        id: "shotgun",
        category: "weapon",
        name: "Shotgun",
        blurb: "A doorway argument, settled.",
        ready: true,
        weapon: "shotgun"
    }, {
        id: "sniperRifle",
        category: "weapon",
        name: "Sniper Rifle",
        blurb: "Reaches further than you can see.",
        ready: true,
        weapon: "sniperRifle"
    }, {
        id: "frag",
        category: "throwable",
        name: "Frag Grenades",
        blurb: "The classic argument-ender.",
        ready: true
    }, {
        id: "smoke",
        category: "throwable",
        name: "Smoke Grenades",
        blurb: "Nobody shoots what nobody sees.",
        ready: true
    }, {
        id: "flashbang",
        category: "throwable",
        name: "Flashbangs",
        blurb: "A very loud opinion. Everyone nearby forgets theirs.",
        ready: true
    }, {
        id: "supplyDrop",
        category: "callin",
        name: "Supply Drop",
        blurb: "A crate from a friendlier sky.",
        ready: true
    }, {
        id: "airstrike",
        category: "callin",
        name: "Airstrike",
        blurb: "Point at the problem. The air corps does the rest.",
        ready: true
    }, {
        id: "reinforcements",
        category: "callin",
        name: "Reinforcements",
        blurb: "More men, mid-fight, by parachute.",
        ready: true
    }, {
        id: "squadSlot4",
        category: "squad",
        name: "A Fourth Soldier",
        blurb: "Another name on the roster, another man on the ground.",
        ready: true
    }, {
        id: "squadSlot5",
        category: "squad",
        name: "A Fifth Soldier",
        blurb: "Five is a squad with a spare opinion.",
        ready: true,
        requires: "squadSlot4"
    }, {
        id: "squadSlot6",
        category: "squad",
        name: "A Sixth Soldier",
        blurb: "The full six, as the war used to afford.",
        ready: true,
        requires: "squadSlot5"
    }],
    My = c => f.economy.startingSquadCapacity + ["squadSlot4", "squadSlot5", "squadSlot6"].filter(d => c.includes(d)).length,
    $a = new Map(bW.map(c => [c.id, c])),
    ZW = c => f.economy.prices[c],
    $e = (c, d) => c.unlocked.includes(d),
    si = c => {
        const sF = cX;
        let d = $a.get(c);
        return d?.category === "throwable" || d?.category === "callin";
    },
    gW = (c, d) => Math.max(0, Math.floor(c.stock[d] ?? 0));

function buyStockItem(c, d) {
    const sG = cX;
    let g = $a.get(d);
    if (!g || !g.ready || !si(d)) return false;
    let i = ZW(d);
    return c.bonds < i ? false : (c.bonds -= i, c.stock[d] = gW(c, d) + 1, saveCampaign(c), true);
}

function Ka(c, d, g) {
    const sH = cX;
    let i = Math.max(0, Math.min(Math.floor(g), gW(c, d)));
    return i === 0 ? 0 : (c.stock[d] = gW(c, d) - i, saveCampaign(c), i);
}

function ai(c, d) {
    const sI = cX;
    let g = Math.max(0, Math.floor(d.callInsUsed));
    return d.callInsUsed = 0, g === 0 || d.squadCallIn === "none" ? 0 : Ka(c, d.squadCallIn, g);
}

function unlockItem(c, d) {
    const sJ = cX;
    let g = $a.get(d);
    if (!g || !g.ready || si(d) || $e(c, d) || g.requires && !c.unlocked.includes(g.requires)) return false;
    let i = ZW(d);
    return c.bonds < i ? false : (c.bonds -= i, c.unlocked.push(d), c.squadCapacity = My(c.unlocked), saveCampaign(c), true);
}

function za(c) {
    const sK = cX;
    return ["basicRifle", ...bW.filter(d => d.category === "weapon" && d.weapon && $e(c, d.id)).map(d => d.weapon)];
}

function li(c) {
    const sL = cX;
    return za(c).includes(c.loadout.weapon) ? c.loadout.weapon : "basicRifle";
}
var ci = {
        basicRifle: "Basic Rifle",
        smg: "SMG",
        assaultRifle: "Assault Rifle",
        shotgun: "Shotgun",
        sniperRifle: "Sniper Rifle",
        fists: "Fists",
        enemyRifle: "Service Rifle",
        pistol: "Sidearm",
        bazooka: "Bazooka"
    },
    ge = {
        frag: "frag",
        smoke: "smoke",
        flash: "flashbang"
    },
    Ya = (c, d) => gW(c, ge[d]) > 0;

function Vf(c) {
    const sM = cX;
    return ["frag", "smoke", "flash"].filter(d => {
        const sN = sM;
        let g = bW.find(i => i.id === ge[d]);
        return g?.ready && gW(c, g.id) > 0;
    });
}

function Xa(c) {
    const sO = cX;
    return ["supplyDrop", "airstrike", "reinforcements"].filter(d => {
        const sP = sO;
        let g = bW.find(i => i.id === d);
        return g?.ready && gW(c, g.id) > 0;
    });
}

function _n(c) {
    const sQ = cX;
    let d = c.loadout.callin;
    return d !== "none" && Xa(c).includes(d) ? d : void 0;
}
var di = {
        supplyDrop: "Supply Drop",
        airstrike: "Airstrike",
        reinforcements: "Reinforcements"
    },
    Cy = null,
    qf = new Map(),
    Uf = new Map();

function $f(c) {
    const sR = cX;
    if (!Yp(c)) return Ke(c);
    let d = Uf.get(c);
    return d || (d = zp(c), Uf.set(c, d)), d;
}
var noteSoundChannel = null,
    Ry = null;

function Ke(c, d = false) {
    const sS = cX;
    let g = (Cy ??= zo(Ko(0)))[c];
    if (!g || !d) return g;
    let i = qf.get(c);
    return i || (i = dimImage(g), qf.set(c, i)), i;
}
var ui = () => noteSoundChannel ??= m1("note"),
    xn = () => Ry ??= m1("icon"),
    Ja = (c, d, g) => makeFxButton(c, d, g),
    jy = 2;

function zf(c, d) {
    let g = armoryTab;
    Ho(i => {
        const sT = b;
        let j = w("div", "ar-head"),
            l = w("div", "ar-list panel-body");
        return mi({
            head: j,
            list: l,
            campaign: c,
            tab: () => g,
            onTab: m => {
                g = m, armoryTab = m;
            }
        }), [j, l];
    }, d, {
        wide: true
    });
}
var armoryTab = "weapon";

function renderArmouryCard(c, d, g) {
    const sU = cX;
    let j = w("div", "ar-card" + (c.ready ? '' : " pending")),
        l = w("div", "ar-art"),
        m = Ke(c.id);
    m && l.appendChild(scaleCanvas(m, jy)), j.appendChild(l), j.appendChild(w("span", "ar-name", c.name.toUpperCase())), j.appendChild(w("span", "ar-blurb", c.blurb));
    let p = w("div", "ar-foot");
    if (si(c.id)) {
        let q = ZW(c.id);
        p.appendChild(w("span", "ar-have", "HAVE " + gW(d, c.id)));
        let u = w("div", "ar-price");
        u.appendChild(scaleCanvas(xn(), 2)), u.appendChild(w("span", "ar-price-n", String(q))), p.appendChild(u);
        let v = Ja("BUY +1", "ar-buy", () => {
            const sV = sU;
            if (c.ready) {
                if (d.bonds < q) {
                    CW(v, "not enough war bonds");
                    return;
                }
                buyStockItem(d, c.id) && (la(c.id, q, d.bonds), g());
            }
        });
        return (!c.ready || d.bonds < q) && (v.setAttribute("aria-disabled", "true"), v.classList.add("off")), p.appendChild(v), j.appendChild(p), j;
    }
    if ($e(d, c.id)) {
        let y = Ja("OWNED", "ar-buy owned", () => {});
        y.setAttribute("aria-disabled", "true"), p.appendChild(y);
    } else {
        if (!c.ready) p.appendChild(w("span", "ar-soon", "ON REQUISITION"));
        else {
            let A = ZW(c.id),
                C = w("div", "ar-price");
            C.appendChild(scaleCanvas(drawLockIcon(true), 2, "ar-lock")), C.appendChild(scaleCanvas(xn(), 2)), C.appendChild(w("span", "ar-price-n", String(A))), p.appendChild(C);
            let E = Ja("UNLOCK", "ar-buy", () => {
                const sX = sU;
                if (d.bonds < A) {
                    CW(E, "not enough war bonds");
                    return;
                }
                unlockItem(d, c.id) && (la(c.id, A, d.bonds), g());
            });
            d.bonds < A && (E.setAttribute("aria-disabled", "true"), E.classList.add("off")), p.appendChild(E);
        }
    }
    return j.appendChild(p), j;
}

function mi(c) {
    const sY = cX;
    let {
        head: d,
        list: g,
        campaign: j
    } = c, m = () => mi(c);
    d.textContent = '', c.closeButton && d.appendChild(c.closeButton);
    let p = w("div", "ar-titles");
    p.appendChild(w("span", "ar-title", "THE ARMOURY")), p.appendChild(w("span", "ar-sub", "BETTER GEAR. HIGHER SURVIVAL RATE.")), d.appendChild(p);
    let q = w("div", "ar-bonds");
    q.appendChild(scaleCanvas(ui(), 2));
    let s = w("div", "ar-bonds-text");
    s.appendChild(w("span", "ar-bonds-k", "WAR BONDS")), s.appendChild(w("span", "ar-bonds-n", String(j.bonds))), q.appendChild(s), d.appendChild(q), g.textContent = '';
    let u = Fo([
        ["weapon", "WEAPONS", "smg"],
        ["throwable", "THROWABLES", "frag"],
        ["callin", "CALL-INS", "airstrike"]
    ].map(([v, y, A]) => ({
        id: v,
        label: y,
        icon: Ke(A),
        panel: () => {
            const sZ = sY;
            let C = w("div", "ar-panel"),
                E = w("div", "ar-grid");
            for (let F of bW.filter(H => H.category === v)) E.appendChild(renderArmouryCard(F, j, () => {
                const t7 = sZ;
                m(), c.onBought?.();
            }));
            return C.appendChild(E), C;
        }
    })));
    u.select(c.tab());
    for (let v of u.root.querySelectorAll(".ui-tab")) v.addEventListener("click", () => {
        const t8 = sY;
        c.onTab(v.dataset.id);
    });
    g.append(u.root, u.body);
}
var LAST_GROUP_KEY = "cf.lastGroup",
    Py = () => {
        const t9 = cX;
        try {
            return localStorage.getItem(LAST_GROUP_KEY);
        } catch {
            return null;
        }
    },
    Ly = c => {
        const tg = cX;
        try {
            localStorage.setItem(LAST_GROUP_KEY, c);
        } catch {}
    },
    pi = c => aT[c]?.name?.toUpperCase() ?? c.toUpperCase(),
    Yf = c => {
        const tj = cX;
        let d = aT[c]?.grid ?? '',
            g = i => d.split(i).length - 1;
        return Math.max(1, Math.min(g('P'), g('Q')));
    },
    RW = (c, d, g) => makeFxButton(c, d, g);

function Oy(c) {
    const tk = cX;
    let d = w("div", "fx-stars");
    for (let g = 0; g < 3; g++) d.appendChild(w('i', g < c ? "fx-star on" : "fx-star"));
    return d;
}

function Ny(c) {
    const tq = cX;
    let d = (c.brief || c.mechanic || '').trim();
    if (!d) return '';
    let g = d.split(/\s+/);
    return g.length <= 10 ? d : g.slice(0, 9).join(' ') + '…';
}

function Jf(q, A, F, H, K, L) {
    const tw = cX;
    buildSpriteVars();
    let N = document.getElementById("front"),
        P = document.getElementById("intro"),
        Q = document.getElementById("select"),
        U = document.getElementById("front-inner"),
        V = document.getElementById("armoury"),
        X = "weapon",
        Y = document.getElementById("armoury-head"),
        a7 = document.getElementById("armoury-list"),
        a8 = document.getElementById("lobby"),
        a9 = document.getElementById("lobby-head"),
        aj = document.getElementById("lobby-actions"),
        ak = document.getElementById("lobby-games"),
        aq = document.getElementById("lobby-body"),
        aw = document.getElementById("lobby-note"),
        ax = document.getElementById("select-rail"),
        az = document.getElementById("select-list"),
        aA = document.getElementById("intro-actions"),
        aB = document.getElementById("select-head"),
        aC = document.getElementById("front-logo"),
        aD = F,
        aE = Co(q, K),
        aF = groupMissionsByZone(q);
    return new Promise(aG => {
        const tC = tw;
        let aH = false,
            aI = bU => {
                const tx = b;
                aH || (aH = true, setBlackout(1), N.classList.add("leaving"), window.setTimeout(() => {
                    const tz = tx;
                    bO(), bP.remove(), bQ(), bD(), document.removeEventListener("keydown", bR), U.removeEventListener("pointerdown", bS), $.onChange = null, $.onStart = null, $.onJoin = null, window.clearInterval(bz), N.hidden = true, N.classList.remove("leaving"), aG(bU);