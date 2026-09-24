                }, f.timing.frontFade));
            },
            aJ = bU => aI({
                id: bU,
                difficulty: aD
            }),
            aK = {
                intro: P,
                select: Q,
                armoury: V,
                lobby: a8
            },
            aL = bU => {
                const tA = b;
                let bV = w("button", "hud-tool t-close lb-head-door");
                return bV.type = "button", bV.title = "Close", bV.setAttribute("aria-label", "Close"), bV.onclick = bU, bV;
            },
            aM = () => {},
            aN = bU => {
                const tB = b;
                N.classList.toggle("on-select", bU !== "intro");
                for (let [bV, bX] of Object.entries(aK)) bX.hidden = bV !== bU;
                bU === "armoury" && bC(), bU === "select" && aM(), bU !== "intro" && trackScreen(bU), aK[bU].querySelector("button")?.focus();
            };
        aC.onclick = () => {
            const tD = tC;
            N.classList.contains("on-select") && aN("intro");
        };
        let aO = document.getElementById("privacy-link");
        aO && (aO.onclick = bU => {
            const tE = tC;
            bU.preventDefault(), Bm();
        });
        let aP = document.getElementById("front-version"),
            aQ = document.getElementById("front-version-sep");
        aP && (aP.textContent = "v0.3.0", aP.hidden = false, aQ && (aQ.hidden = false), Gm() && (aP.disabled = false, aP.title = "What has changed", aP.onclick = () => {
            renderChangelog();
        }));
        let aR = filterCampaignMissions(q),
            aS = A && aR.some(bU => bU.id === A && aE.open.has(bU.id)) ? A : null,
            aU = aR.find(bU => aE.open.has(bU.id) && !K.records[bU.id]);
        aA.textContent = '';
        let aV = bU => {
                const tF = tC;
                let bV = w("div", "intro-row " + bU);
                return aA.appendChild(bV), bV;
            },
            aX = aV("intro-row-play"),
            aY = aV("intro-row-pair"),
            aZ = aV("intro-row-net");
        aX.appendChild(RW("PLAY NOW", "primary", () => {
            const tG = tC;
            let bU = aU?.id ?? aS ?? aR.find(bV => aE.open.has(bV.id))?.id;
            bU && aJ(bU);
        })), aY.appendChild(RW("MAP SELECT", '', () => aN("select"))), aY.appendChild(RW("ARMOURY", '', () => aN("armoury")));
        let b4 = RW("MULTIPLAYER", "dark", () => {
            const tH = tC;
            aN("lobby"), $.room || $.list();
        });
        b4.prepend(scaleCanvas(drawStarIcon(true), 2, "intro-star")), b4.appendChild(scaleCanvas(drawStarIcon(true), 2, "intro-star")), aZ.appendChild(b4);
        let b7 = false,
            b8 = () => {
                const tI = tC;
                b7 || (b7 = true, $.list(), bx(), window.setTimeout(() => {
                    b7 = false, bx();
                }, 500));
            },
            b9 = bU => Math.round(bU / 60) + " MINUTE" + (bU === 60 ? '' : 'S'),
            bj = bU => {
                const tJ = tC;
                let bV = w("div", "lb-settings"),
                    bX = (c8, c9, cj, ck) => {
                        const tK = tJ;
                        showConfirmDialog({
                            title: c8,
                            body: c9,
                            buttons: cj.map(([cq, cw]) => ({
                                label: cq,
                                value: cw
                            })),
                            dismiss: "cancel"
                        }).then(cq => {
                            const tL = tK;
                            cq !== "cancel" && ck(cq);
                        });
                    },
                    bY = lo.filter(c8 => aT[c8]?.objective === "skirmish"),
                    bZ = [
                        ["MAP", pi(bU.mapId), () => bX("MAP", "Where the next game is fought.", bY.map(c8 => [pi(c8), c8]), c8 => $.settings({
                            mapId: c8
                        }))],
                        ["DURATION", b9(bU.seconds), () => bX("DURATION", "How long the next game runs.", jf.map(c8 => [b9(c8), String(c8)]), c8 => $.settings({
                            seconds: Number(c8)
                        }))],
                        ["MODE", bU.mode.toUpperCase(), () => bX("MODE", "Skirmish for now. More coming soon.", [
                            ["SKIRMISH", "skirmish"]
                        ], () => {})],
                        ["VISIBILITY", bU.visibility.toUpperCase(), () => bX("VISIBILITY", "Public games are listed in the lobby. Private ones need the code.", [
                            ["PRIVATE", "private"],
                            ["PUBLIC", "public"]
                        ], c8 => $.settings({
                            visibility: c8
                        }))],
                        ["FOG OF WAR", bU.fog ? 'ON' : "OFF", () => bX("FOG OF WAR", "With it on, you only see what your own men can see.", [
                            ['ON', 'on'],
                            ["OFF", "off"]
                        ], c8 => $.settings({
                            fog: c8 === 'on'
                        }))],
                        ["EDGE MOVEMENT", bU.edgeScroll ? 'ON' : "OFF", () => bX("EDGE MOVEMENT", "Push the pointer at the edge of the screen to scroll.", [
                            ['ON', 'on'],
                            ["OFF", "off"]
                        ], c8 => $.settings({
                            edgeScroll: c8 === 'on'
                        }))],
                        ["ROUNDS", String(bU.rounds), () => bX("ROUNDS", "How many rounds a match is. The winner of the match takes the point.", Pf.map(c8 => [String(c8), String(c8)]), c8 => $.settings({
                            rounds: Number(c8)
                        }))],
                        ["MEN PER SIDE", String(Math.min(bU.squad, Yf(bU.mapId))), () => bX("MEN PER SIDE", "How many men each squad fields. The ground caps it.", Lf.filter(c8 => c8 <= Yf(bU.mapId)).map(c8 => [String(c8), String(c8)]), c8 => $.settings({
                            squad: Number(c8)
                        }))]
                    ],
                    c7 = {
                        MAP: scaleCanvas(Ue("map"), 1),
                        DURATION: scaleCanvas(Ue("clock"), 1),
                        MODE: scaleCanvas(Ue("flag"), 1),
                        VISIBILITY: scaleCanvas(drawLockIcon(false), 1),
                        'FOG\x20OF\x20WAR': scaleCanvas(Ue("cloud"), 1),
                        'EDGE\x20MOVEMENT': scaleCanvas(Ue("arrows"), 1),
                        ROUNDS: scaleCanvas(Ue("clock"), 1),
                        'MEN\x20PER\x20SIDE': scaleCanvas(Ue("flag"), 1)
                    };
                for (let [c8, c9, cj] of bZ) {
                    let ck = w("button", "lb-set");
                    ck.type = "button", ck.appendChild(c7[c8]), ck.appendChild(w("span", "lb-set-k", c8)), ck.appendChild(w("span", "lb-set-v", c9)), ck.onclick = cj, bV.appendChild(ck);
                }
                return bV;
            },
            bk = bU => () => {
                const tM = tC;
                $.create({
                    seconds: f.skirmish.seconds,
                    visibility: bU
                });
            },
            bq = () => {
                const tN = tC;
                ak.textContent = '';
                let bU = w("div", "lb-games-head");
                bU.appendChild(w("span", void 0, "PUBLIC GAMES"));
                let bV = w("button", b7 ? "lb-refresh busy" : "lb-refresh");
                bV.type = "button", bV.title = "Refresh", bV.appendChild(scaleCanvas(drawIconTile("restart"), 2)), bV.onclick = b8, bU.appendChild(bV), ak.appendChild(bU);
                let bX = w("div", "lb-games-list");
                b7 && bX.classList.add("busy");
                for (let bZ of $.games) {
                    let c7 = w("div", bZ.joinable ? "lb-game" : "lb-game full");
                    c7.appendChild(w("div", "lb-game-map"));
                    let c8 = w("div", "lb-game-body");
                    c8.appendChild(w("span", "lb-game-name", bZ.name)), c8.appendChild(w("span", "lb-game-meta", bZ.mode.toUpperCase())), c8.appendChild(w("span", "lb-game-meta", pi(bZ.mapId))), c7.appendChild(c8);
                    let c9 = w("div", "lb-game-tail");
                    c9.appendChild(w("span", "lb-game-count", bZ.players + " / " + bZ.capacity)), bZ.joinable ? c9.appendChild(RW("JOIN", '', () => $.join(bZ.code, "list"))) : c9.appendChild(w("span", "lb-game-status", "IN PLAY")), c7.appendChild(c9), bX.appendChild(c7);
                }
                let bY = w("div", "lb-end");
                $.games.length ? bY.textContent = "NO MORE GAMES" : (bY.classList.add("empty"), bY.appendChild(w("span", void 0, "NO GAMES OPEN")), bY.appendChild(RW("START ONE", '', bk("public")))), bX.appendChild(bY), ak.appendChild(bX);
            },
            bw = () => {
                const tO = tC;
                a9.textContent = '', aj.textContent = '';
                let bU = $.room,
                    bV = bU?.seats[0]?.name;
                if (a9.appendChild(w("span", "ar-title", bU ? bU.name : "MULTIPLAYER LOBBY")), a9.appendChild(aL(() => {
                        const tP = tO;
                        if (!$.room) {
                            aN("intro");
                            return;
                        }
                        $.leave(), bx();
                    })), bU) {
                    let cq = w("span", "ar-bonds");
                    cq.appendChild(scaleCanvas(bU.visibility === "private" ? drawLockIcon(false) : Na(), 1)), cq.appendChild(w("span", void 0, bU.visibility.toUpperCase() + " GAME · " + bU.code)), a9.appendChild(cq), a9.appendChild(w("span", "lb-sub", bU.mode.toUpperCase() + " · " + pi(bU.mapId)));
                }
                if (aq.classList.toggle("in-room", !!bU), ak.hidden = !!bU, ak.textContent = '', !bU) {
                    bq();
                    let cw = w("div", "lb-box");
                    cw.appendChild(w("span", "lb-box-label", "PLAYING AS:"));
                    let cx = w("div", "lb-box-row");
                    cx.appendChild(scaleCanvas(Ve(true), 1, "lb-avatar-plate")), cx.appendChild(w("span", "lb-who", vn()));
                    let cz = w("button", "lb-pencil");
                    cz.type = "button", cz.title = "Change your name", cz.appendChild(scaleCanvas(drawIconTile("pencil"), 2)), cx.appendChild(cz), cz.onclick = () => {
                        const tQ = tO;
                        buildConfirmField({
                            title: "YOUR NAME",
                            label: "What the other lot will call you",
                            value: vn(),
                            placeholder: "SOLDIER",
                            maxLength: 12
                        }).then(cF => {
                            const tR = tQ;
                            cF !== null && (setPlayerName(cF), $.rename(), bx());
                        });
                    }, cw.appendChild(cx), aj.appendChild(cw);
                    let cA = (cF, cG, cH, cI) => {
                        const tS = tO;
                        let cJ = RW('', "lb-door", cI);
                        cJ.textContent = '', cJ.appendChild(cH);
                        let cK = w("div", "lb-card-text");
                        return cK.appendChild(w("span", "fx-btn-label", cF)), cK.appendChild(w("span", "lb-box-sub", cG)), cJ.appendChild(cK), cJ;
                    };
                    aj.appendChild(cA("CREATE PUBLIC GAME", "Anyone can join", scaleCanvas(Na(), 2, "lb-card-icon"), bk("public"))), aj.appendChild(cA("CREATE PRIVATE GAME", "Invite your friends", scaleCanvas(drawLockIcon(true), 2, "lb-card-icon"), bk("private")));
                    let cB = w("div", "lb-box");
                    cB.appendChild(w("span", "lb-box-title", "JOIN WITH CODE")), cB.appendChild(w("span", "lb-box-sub", "Enter a join code"));
                    let cC = w("div", "lb-join"),
                        cD = w("input", "lb-input");
                    cD.dataset.keep = "join-code", cD.maxLength = 6, cD.placeholder = "e.g. H7KD2P";
                    let cE = () => {
                        const tT = tO;
                        cD.value.trim() && $.join(cD.value);
                    };
                    cD.onkeydown = cF => {
                        const tU = tO;
                        cF.key === "Enter" && cE();
                    }, cC.appendChild(cD), cC.appendChild(RW("JOIN", '', cE)), cB.appendChild(cC), $.lastError && cB.appendChild(w("div", "lb-err", $.lastError.toUpperCase())), aj.appendChild(cB), aw.textContent = '';
                    return;
                }
                let bX = w("div", "lb-slots");
                for (let cF = 0; cF < 2; cF++) {
                    let cG = bU.seats[cF],
                        cH = w("div", "lb-slot");
                    cG?.ready && cH.classList.add("ready"), cG && !cG.connected && cH.classList.add("away"), cH.appendChild(w("span", "lb-box-label lb-slot-label", cF === bU.you ? "YOUR SQUAD" : "SLOT " + (cF + 1))), cH.appendChild(scaleCanvas(cG ? Ve(true) : buildTintedBackdrop(), 1, "lb-avatar"));
                    let cI = w("div", "lb-slot-body");
                    if (cG) {
                        let cJ = w("div", "lb-slot-name");
                        if (cJ.appendChild(w("span", void 0, cG.name + (cF === bU.you ? " (YOU)" : ''))), cI.appendChild(cJ), cF === 0 && cI.appendChild(w("span", "lb-host", "HOST")), bU.seats.some(cL => cL.wins > 0)) {
                            let cL = w("span", "lb-slot-state");
                            cL.appendChild(w("span", "lb-wins", "WON " + cG.wins)), cI.appendChild(cL);
                        }
                        cH.appendChild(cI);
                        let cK = cG.connected ? cG.ready ? "READY" : "NOT READY" : "WIRE DOWN";
                        if (cF === bU.you) {
                            let cM = RW(cG.ready ? "READY" : "ARE YOU READY?", cG.ready ? '' : "primary", () => $.ready(!cG.ready));
                            cM.classList.add("lb-ready", "lb-actline"), cH.appendChild(cM);
                        } else cH.appendChild(w("div", "lb-actline lb-status", cK));
                        bX.appendChild(cH);
                        continue;
                    } else {
                        cI.appendChild(w("span", "lb-slot-name", "WAITING FOR ANOTHER SOLDIER...")), cI.appendChild(w("span", "lb-slot-state", "INVITE YOUR FRIEND"));
                        let cN = w("div", "lb-invite"),
                            cO = w("span", "lb-url", buildJoinUrl(bU.code)),
                            cP = w("div", "lb-invite-row");
                        cP.appendChild(cO), cP.appendChild(RW("COPY LINK", "lb-copy", () => {
                            const tV = tO;
                            navigator.clipboard?.writeText(buildJoinUrl(bU.code)), cO.textContent = "COPIED", window.setTimeout(() => {
                                const tW = tV;
                                cO.textContent = buildJoinUrl(bU.code);
                            }, 900);
                        })), cN.appendChild(cP);
                        let cQ = w("div", "lb-orcode");
                        cQ.appendChild(w("span", "lb-slot-state", "OR CODE:")), cQ.appendChild(w("span", "lb-code", bU.code)), cN.appendChild(cQ), cH.appendChild(cI), cH.appendChild(cN), bX.appendChild(cH);
                        continue;
                    }
                    cH.appendChild(cI), bX.appendChild(cH);
                }
                aj.appendChild(bX);
                let bY = w("div", "lb-lower");
                bU.mapId in aT || promptAppUpdateOnce(bU.mapId);
                let bZ = bj(bU);
                bY.appendChild(bZ);
                let c7 = w("div", "lb-feedbox"),
                    c8 = w("div", "lb-feed");
                for (let cR of $.feed) {
                    let cS = w("div", "lb-line " + cR.kind);
                    cR.kind === "chat" ? (cS.appendChild(w("span", "lb-nick " + (cR.colour ?? "green"), '<' + (cR.from ?? '?') + '>')), cS.appendChild(w("span", "lb-said", cR.text))) : cS.appendChild(w("span", "lb-said", cR.text)), c8.appendChild(cS);
                }
                c7.appendChild(c8);
                let c9 = w("div", "lb-say"),
                    cj = w("input", "lb-input");
                cj.dataset.keep = "chat", cj.maxLength = ei, cj.placeholder = "TYPE A MESSAGE...";
                let ck = () => {
                    const tX = tO;
                    let cU = cj.value;
                    cU.trim() && (cj.value = '', $.say(cU));
                };
                cj.onkeydown = cU => {
                    const tY = tO;
                    cU.key === "Enter" && ck();
                }, c9.appendChild(cj), c9.appendChild(RW("SEND", "lb-copy", ck)), c7.appendChild(c9), bY.appendChild(c7), aj.appendChild(bY), c8.scrollTop = c8.scrollHeight, aw.textContent = '';
            },
            bx = () => {
                const tZ = tC;
                let bU = document.activeElement,
                    bV = [...a8.querySelectorAll("input")].map(bX => ({
                        keep: bX.dataset.keep,
                        value: bX.value,
                        at: bX.selectionStart ?? bX.value.length,
                        had: bX === bU
                    }));
                bw();
                for (let bX of bV) {
                    if (!bX.keep) continue;
                    let bY = a8.querySelector("input[data-keep=\"" + bX.keep + '"]');
                    bY && (bX.value && (bY.value = bX.value), bX.had && (bY.focus(), bY.setSelectionRange(bX.at, bX.at)));
                }
            };
        $.onChange = bx, $.onJoin = () => rs(), $.room || $.list();
        let bz = window.setInterval(() => {
            const u7 = tC;
            !$.room && !a8.hidden && $.list();
        }, 5000);
        $.onStart = bU => aI({
            net: bU
        }), bx();
        let bA = Ff();
        bA && history.replaceState(null, '', '/');
        let bB = bA ?? $.rememberedCode;
        $.room ? aN("lobby") : bB && (aN("lobby"), fetchRoom(bB).then(bU => {
            const u8 = tC;
            if (!bU) {
                $.note("that muster has stood down");
                return;
            }
            $.join(bB, "link");
        }));
        let bC = () => mi({
                head: Y,
                list: a7,
                campaign: K,
                closeButton: aL(() => aN("intro")),
                tab: () => X,
                onTab: bU => {
                    X = bU;
                }
            }),
            bD = renderMusicCta(aA),
            bE = bU => {
                aI({
                    id: bU.id,
                    difficulty: aD
                });
            };
        aB.hidden = false, aB.textContent = '', aB.appendChild(w("span", "ar-title", "MAP SELECT"));
        let bF = q.filter(bU => K.records[bU.id]).length,
            bG = q.reduce((bU, bV) => bU + highestClearedRung(K.records[bV.id]), 0);
        aB.appendChild(w("span", "ar-bonds", "MISSIONS " + bF + '/' + q.length + " · STARS " + bG)), aB.appendChild(aL(() => aN("intro")));
        let bH = bU => aF.some(bV => bV.zone.id === bU) && (aE.byZone.get(bU)?.starsNeeded ?? 0) === 0,
            bI = Py() ?? aF[0]?.zone.id ?? '';
        bH(bI) || (bI = aF.find(bU => bH(bU.zone.id))?.zone.id ?? '');
        let bJ = () => {
                const u9 = tC;
                for (let bU of ax.children) bU.classList.toggle('on', bU.dataset.group === bI);
            },
            bK = () => {
                const uj = tC;
                let bU = aF.find(bX => bX.zone.id === bI);
                if (az.textContent = '', !bU) return;
                let bV = aE.byZone.get(bU.zone.id)?.starsNeeded ?? 0;
                for (let bX of bU.levels) {
                    let bY = aE.open.has(bX.id),
                        bZ = K.records[bX.id],
                        c7 = w("button", bY ? "fx-card" : "fx-card locked");
                    c7.type = "button", bY || c7.setAttribute("aria-disabled", "true"), c7.dataset.id = bX.id;
                    let c8 = bU.levels.indexOf(bX) + 1;
                    c7.appendChild(w("span", "fx-card-num", String(c8).padStart(2, '0')));
                    let c9 = w("span", "fx-card-body");
                    c9.appendChild(w("span", "fx-card-name", bX.name.toUpperCase()));
                    let cj = truncateBrief(bX);
                    cj && c9.appendChild(w("span", "fx-card-desc", cj)), c7.appendChild(c9);
                    let ck = w("span", "fx-card-tail");
                    bY ? ck.appendChild(renderDifficultyStars(highestClearedRung(bZ))) : ck.appendChild(w('i', "fx-lock")), c7.appendChild(ck), c7.addEventListener("click", () => {
                        const uk = uj;
                        bY ? bE(bX) : CW(c7, bV > 0 ? bV + " stars needed" : "clear another mission first");
                    }), az.appendChild(c7);
                }
            },
            bL = bU => {
                const uq = tC;
                let bV = w('i', "fx-group-scene");
                return bV.style.backgroundImage = "var(--sk-theatre-" + bU + ')', bV;
            },
            bM = bU => {
                const uw = tC;
                let bV = LOCKED_ZONE_CLASSES[bU.id];
                if (!bV) return;
                let bX = RW('', "fx-group future", () => {
                    const ux = uw;
                    ZT("future_zone_clicked", {
                        source: bV,
                        zone: bU.id
                    }), Lo(bV, K, q, {
                        zone: bU.id
                    });
                });
                bX.dataset.future = bU.id, bX.textContent = '', bX.appendChild(bL(bU.id));
                let bY = w("span", "fx-group-body");
                bY.appendChild(w("span", "fx-group-name", bU.name.toUpperCase())), bX.appendChild(bY), bX.appendChild(w('i', "fx-group-lock")), ax.appendChild(bX);
            };
        ax.textContent = '';
        for (let bU of $t) {
            let bV = aF.find(cj => cj.zone.id === bU.id);
            if (!bV) {
                bU.future && bM(bU);
                continue;
            }
            let bX = bV.levels.filter(cj => K.records[cj.id]).length,
                bY = aE.byZone.get(bV.zone.id)?.starsNeeded ?? 0,
                bZ = bY > 0,
                c7 = RW('', "fx-group" + (bZ ? " shut" : ''), () => {
                    const uz = tC;
                    bI = bV.zone.id, bZ || Ly(bI), bJ(), bK();
                });
            c7.dataset.group = bV.zone.id, c7.textContent = '', c7.appendChild(bL(bV.zone.id));
            let c8 = w("span", "fx-group-body");
            c8.appendChild(w("span", "fx-group-name", bV.zone.name.toUpperCase()));
            let c9 = w("span", "fx-group-meta");
            bZ ? c9.appendChild(w("span", "fx-group-count", aE.stars + " OF " + bY + " STARS")) : (c9.appendChild(w("span", "fx-group-count", bV.levels.length + " MISSION" + (bV.levels.length === 1 ? '' : 'S'))), c9.appendChild(w("span", "fx-group-done", bX + '/' + bV.levels.length))), c8.appendChild(c9), c7.appendChild(c8), ax.appendChild(c7);
        }
        let bN = false;
        aM = () => {
            const uA = tC;
            if (!bN) {
                bN = true;
                for (let cj of getFutureZones()) {
                    let ck = LOCKED_ZONE_CLASSES[cj.id];
                    ck && ZT("future_zone_impression", {
                        source: ck,
                        zone: cj.id
                    });
                }
            }
        }, document.getElementById("select-foot").textContent = '', bJ(), bK();
        let bO = createMusicToggle(N),
            bP = w("button", "corner-tool front-gear");
        bP.type = "button", bP.title = "Settings", bP.setAttribute("aria-label", "Settings"), bP.addEventListener("click", () => Vo()), N.appendChild(bP);
        let bQ = Pm(N, K, q);
        L && aN(L), N.hidden = false, requestAnimationFrame(() => N.classList.add('in')), window.setTimeout(() => setBlackout(0), 340), aN(L ?? ($.room || bB ? "lobby" : "intro"));
        let bR = cj => {
            const uB = tC;
            if (!aH && !isTextInputFocused()) {
                if (cj.key === 'm' || cj.key === 'M') {
                    toggleMusic();
                    return;
                }
                cj.key === "Escape" && N.classList.contains("on-select") && aN("intro");
            }
        };
        document.addEventListener("keydown", bR);
        let bS = cj => {
            const uC = tC;
            if (aH || !N.classList.contains("on-select")) return;
            let ck = cj.target;
            ck && (ck.closest("#select-frame, #lobby-frame, #armoury-frame, #front-logo") || aN("intro"));
        };
        U.addEventListener("pointerdown", bS);
    });
}
var SHOP_OFFER_LIMIT = 3;

function getAffordableOffers(c, d) {
    const uD = cX;
    return ARMOURY_ITEMS.filter(g => g.ready && g.category !== "squad" && !$e(c, g.id)).map(g => ({
        id: g.id,
        name: g.name,
        price: ZW(g.id)
    })).filter(g => g.price <= d).sort((g, i) => g.price - i.price).slice(0, SHOP_OFFER_LIMIT);
}

function renderShopPanel({
    ctx: c,
    campaign: d,
    done: g,
    actions: j
}) {
    const uE = cX;
    let m = w("div", "dsp-shop"),
        p = w('p', "dsp-balance");
    p.append(scaleCanvas(xn(), 2, "dsp-coin"), w("span", '', c.bonds + " War Bonds, unspent")), m.appendChild(p);
    let q = w("div", "dsp-shelf");
    for (let u of getAffordableOffers(d, c.bonds)) {
        let v = w("div", "dsp-good"),
            y = getItemIcon(u.id),
            A = w("div", "dsp-good-stand");
        y && A.appendChild(scaleCanvas(y, 2, "dsp-good-art")), v.appendChild(A), v.appendChild(w("span", "dsp-good-name", u.name)), q.appendChild(v);
    }
    return m.appendChild(q), j.append(makeFxButton("The Armoury", "dsp-go primary", () => g("armoury", "went")), makeFxButton("Get on with it", "dsp-go dark", () => g("continue", "skipped"))), m.classList.add("dsp-centred"), j.classList.add("dsp-centred-row"), m;
}
var MAX_STARS = 5;

function renderStarRating({
    label: c,
    prompt: d,
    onChange: g
}) {
    const uF = cX;
    let j = 0,
        m = 0,
        p = w("div", "dsp-stars");
    p.setAttribute("role", "radiogroup"), p.setAttribute("aria-label", c);
    let q = [],
        u = w('p', "dsp-hint", d),
        v = () => {
            const uG = uF;
            let y = m || j;
            q.forEach((A, C) => {
                const uH = uG;
                A.firstElementChild.classList.toggle('on', C < y), A.setAttribute("aria-checked", String(C + 1 === j));
            }), p.classList.toggle("picked", j > 0), u.textContent = j ? j + " out of " + MAX_STARS : d;
        };
    for (let y = 1; y <= MAX_STARS; y++) {
        let A = w("button", "dsp-star");
        A.type = "button", A.setAttribute("role", "radio"), A.setAttribute("aria-label", y + " out of " + MAX_STARS), A.appendChild(w('i', "fx-star")), A.onclick = () => {
            j = y, v(), g?.(j);
        }, A.onpointerenter = () => {
            m = y, v();
        }, A.onfocus = () => {
            m = y, v();
        }, A.onblur = () => {
            m = 0, v();
        }, q.push(A), p.appendChild(A);
    }
    return p.onpointerleave = () => {
        m = 0, v();
    }, v(), {
        row: p,
        hint: u,
        value: () => j,
        disable: () => {
            const uI = uF;
            q.forEach(C => {
                const uJ = uI;
                C.disabled = true;
            });
        }
    };
}
var REVIEW_PROMPT = "What would make it better?";

function renderReviewPanel({
    ctx: c,
    campaign: d,
    levels: g,
    done: j,
    actions: m
}) {
    const uK = cX;
    let p = w("div", "dsp-review"),
        q = renderStarRating({
            label: "Out of five",
            prompt: "Pick a star.",
            onChange: C => {
                const uL = uK;
                A.disabled = C === 0;
            }
        });
    p.append(q.row, q.hint);
    let u = w("label", "dsp-plain dsp-question", REVIEW_PROMPT),
        v = w("textarea", "dsp-box");
    v.rows = 3, v.maxLength = 2000, v.placeholder = "Optional.", u.htmlFor = v.id = "dsp-comment", p.append(u, v);
    let y = w('p', "dsp-note");
    p.appendChild(y);
    let A = makeFxButton("Send", "dsp-go primary", () => {
        const uM = uK;
        let C = q.value();
        C !== 0 && (A.disabled = true, y.textContent = "Sending...", rt({
            kind: "review",
            stars: C,
            comment: v.value
        }, {
            ...Ro(d, g),
            stars: C
        }).then(E => {
            const uN = uM;
            if (E) {
                j("continue", "sent:" + C);
                return;
            }
            A.disabled = false, y.textContent = "That did not get through. Your words are still here if you want to try again.";
        }));
    });
    return A.disabled = true, m.append(A, makeFxButton("Not now", "dsp-go dark", () => {
        const uO = uK;
        trackEvent("feedback_skipped", {
            stars: q.value() || null
        }), j("continue", "skipped");
    })), jo() || (y.textContent = "The line is down, so this would not reach anybody. No harm done.", A.disabled = true, q.disable()), p;
}
var DISPATCH_PANELS = {
    armoury: renderShopPanel,
    review: renderReviewPanel,
    offer: ({
        campaign: c,
        levels: d,
        done: g,
        actions: i,
        source: j,
        lead: l
    }) => renderOfferPanel({
        campaign: c,
        levels: d,
        actions: i,
        source: j,
        lead: l,
        done: m => g("continue", m)
    })
};

function startDispatch(c, d) {
    const uP = cX;
    let {
        ctx: g,
        campaign: j,
        levels: l,
        roll: m = Math.random(),
        source: p = "dispatch",
        lead: q,
        raised: u
    } = d, v = "continue";
    return playTypewriterLine({
        line: Io(c, m),
        raised: u,
        build: (y, A) => DISPATCH_PANELS[c]({
            ctx: g,
            campaign: j,
            levels: l,
            actions: y,
            source: p,
            lead: q,
            done: (C, E) => {
                v = C, A(E);
            }
        })
    }).then(y => ({
        outcome: v,
        answer: y
    }));
}
var DISPATCH_FADE = f.timing.dispatchFade,
    W0 = false,
    e0 = false;

function setDispatchSuppressed(c = true) {
    e0 = c;
}

function getCheapestOffer(c) {
    const uQ = cX;
    let d = ARMOURY_ITEMS.filter(g => g.ready && g.category !== "squad" && !$e(c, g.id)).map(g => ZW(g.id));
    return d.length ? Math.min(...d) : null;
}
async function buildDispatchStats(c, d = dispatchStore, g = Date.now()) {
    const uR = cX;
    let i = it();
    return {
        now: g,
        missionsCleared: Object.values(c.records).filter(j => j.clears.length > 0).length,
        playSeconds: i.playSeconds,
        missionsCompleted: i.missionsCompleted,
        bonds: c.bonds,
        cheapestUnowned: getCheapestOffer(c),
        declinedAt: Em(),
        state: await d.load(),
        shownThisSession: W0
    };
}
async function maybeShowDispatch(c, d, g = dispatchStore) {
    const uS = cX;
    if (e0) return "continue";
    try {
        let j = await buildDispatchStats(c, g),
            l = pickDispatchKind(j);
        if (!l) return "continue";
        W0 = true, await markDispatchShown(g, l, j);
        let {
            outcome: m,
            answer: p
        } = await startDispatch(l, {
            ctx: j,
            campaign: c,
            levels: d
        });
        return p !== "skipped" ? await am(g, l, p) : await markDispatchSkipped(g, l, j), m;
    } catch {
        return "continue";
    }
}
var CameraState = class {
        ['x'] = 0;
        ['y'] = 0;
        ["zoom"] = f.camera.zoom.start;
        ["viewW"] = 0;
        ["viewH"] = 0;
        ["shakeAmount"] = 0;
        ["shakeX"] = 0;
        ["shakeY"] = 0;
        ["shakeSeed"] = 2654435769;
        ["manualUntil"] = 0;
        ["time"] = 0;
        resize(c, d) {
            const uU = cX;
            this.viewW = c / this.zoom, this.viewH = d / this.zoom;
        } centreOn(c, d) {
            const uV = cX;
            this.x = c.x - this.viewW / 2, this.y = c.y - this.viewH / 2, this.clamp(d);
        } lookAt(c, d) {
            const uX = cX;
            this.centreOn(c, d), this.manualUntil = 1 / 0;
        } release() {
            const uY = cX;
            this.manualUntil = this.time;
        }
        getisManual() {
            const uZ = cX;
            return this.time < this.manualUntil;
        } pan(c, d, g, i = "sticky") {
            const v7 = cX;
            c === 0 && d === 0 || (this.x += c, this.y += d, this.manualUntil = i === "sticky" ? 1 / 0 : this.time + f.camera.touchHold, this.clamp(g));
        } update(c, d, g) {
            const v8 = cX;
            if (this.time += c, d && this.time >= this.manualUntil) {
                let j = d.x - this.viewW / 2,
                    m = d.y - this.viewH / 2,
                    p = j - this.x,
                    q = m - this.y,
                    u = Math.hypot(p, q);
                if (u > f.camera.deadzone) {
                    let v = 1 - Math.exp(-f.camera.follow * c),
                        y = (u - f.camera.deadzone) / u;
                    this.x += p * y * v, this.y += q * y * v;
                }
            }
            this.shakeAmount > 0.05 ? (this.shakeAmount *= Math.exp(-9 * c), this.shakeX = (this.jolt() * 2 - 1) * this.shakeAmount, this.shakeY = (this.jolt() * 2 - 1) * this.shakeAmount) : (this.shakeAmount = 0, this.shakeX = 0, this.shakeY = 0), this.clamp(g);
        } jolt() {
            const v9 = cX;
            let c = this.shakeSeed;
            return c ^= c << 13, c >>>= 0, c ^= c >> 17, c ^= c << 5, c >>>= 0, this.shakeSeed = c, c / 4294967296;
        } addShake(c) {
            const vj = cX;
            this.shakeAmount = Math.min(12, this.shakeAmount + c);
        } clamp(c) {
            const vk = cX;
            this.x = c.pixelWidth <= this.viewW ? (c.pixelWidth - this.viewW) / 2 : Math.max(0, Math.min(c.pixelWidth - this.viewW, this.x)), this.y = c.pixelHeight <= this.viewH ? (c.pixelHeight - this.viewH) / 2 : Math.max(0, Math.min(c.pixelHeight - this.viewH, this.y));
        } pin() {
            const vq = cX;
            this.x = Math.round(this.x), this.y = Math.round(this.y), this.manualUntil = 1 / 0, this.shakeAmount = 0, this.shakeX = 0, this.shakeY = 0;
        }
        getoffsetX() {
            const vs = cX;
            return Math.round((this.x + this.shakeX) * this.zoom) / this.zoom;
        }
        getoffsetY() {
            const vw = cX;
            return Math.round((this.y + this.shakeY) * this.zoom) / this.zoom;
        } screenToWorld(c, d) {
            const vx = cX;
            return {
                x: c / this.zoom + this.offsetX,
                y: d / this.zoom + this.offsetY
            };
        }
    },
    hi = {
        x: 1,
        y: 1
    },
    o0 = {
        A: "....##..../....##..../...####.../...#..#.../..##..##../..##..##../..######../.##....##./.##....##./##......##/##......##/##......##/###....###",
        B: "########../.##....##./.##.....##/.##.....##/.##....##./.#######../.##....##./.##.....##/.##.....##/.##.....##/.##....##./.##...##../########..",
        C: "..######../.##....##./##......##/##......../##......../##......../##......../##......../##......../##......##/##......##/.##....##./..######..",
        D: "########../.##....##./.##.....##/.##.....##/.##......#/.##......#/.##......#/.##......#/.##......#/.##.....##/.##.....##/.##....##./########..",
        E: "##########/.##.....#./.##......./.##......./.##......./.#######../.#######../.##......./.##......./.##......./.##.....#./.##.....#./##########",
        F: "##########/.##.....#./.##......./.##......./.##......./.#######../.#######../.##......./.##......./.##......./.##......./.##......./####......",
        G: "..######../.##....##./##......##/##......../##......../##...#####/##...#####/##......##/##......##/##......##/##......##/.##....##./..######..",
        H: "###....###/.##....##./.##....##./.##....##./.##....##./.##....##./.########./.########./.##....##./.##....##./.##....##./.##....##./###....###",
        I: "..######../....##..../....##..../....##..../....##..../....##..../....##..../....##..../....##..../....##..../....##..../....##..../..######..",
        J: "....######/......##../......##../......##../......##../......##../......##../......##../......##../##....##../##....##../.##..##.../..####....",
        K: "###...####/.##...##../.##..##.../.##.##..../.####...../.###....../.####...../.##.##..../.##..##.../.##...##../.##...##../.##....##./###...####",
        L: "####....../.##......./.##......./.##......./.##......./.##......./.##......./.##......./.##......./.##......./.##......./.##.....#./##########",
        M: "###....###/####..####/####..####/##.####.##/##.####.##/##..##..##/##..##..##/##......##/##......##/##......##/##......##/##......##/###....###",
        N: "###....###/###.....##/####....##/####....##/##.##...##/##.##...##/##..##..##/##..##..##/##...##.##/##...##.##/##....####/##....####/###....###",
        O: "..######../.##....##./##......##/##......##/##......##/##......##/##......##/##......##/##......##/##......##/##......##/.##....##./..######..",
        P: "########../.##....##./.##.....##/.##.....##/.##.....##/.##....##./########../.##......./.##......./.##......./.##......./.##......./####......",
        Q: "..######../.##....##./##......##/##......##/##......##/##......##/##......##/##......##/##......##/##......##/##...##.##/.##...###./..#####.##",
        R: "########../.##....##./.##.....##/.##.....##/.##....##./########../.##.##..../.##..##.../.##..##.../.##...##../.##...##../.##....##./###....###",
        S: "..######../.##....##./##......##/##......../.##......./..####..../.....###../.......##./........##/##......##/##......##/.##....##./..######..",
        T: "##########/#...##...#/....##..../....##..../....##..../....##..../....##..../....##..../....##..../....##..../....##..../....##..../..######..",
        U: "###....###/.##....##./.##....##./.##....##./.##....##./.##....##./.##....##./.##....##./.##....##./.##....##./.##....##./..##..##../...####...",
        V: "###....###/.##....##./.##....##./.##....##./..##..##../..##..##../..##..##../...####.../...####.../...####.../....##..../....##..../....##....",
        W: "###....###/##......##/##......##/##......##/##..##..##/##..##..##/##..##..##/##.####.##/##.####.##/####..####/####..####/.##....##./.##....##.",
        X: "###....###/.##....##./..##..##../..##..##../...####.../....##..../....##..../...####.../..##..##../..##..##../.##....##./.##....##./###....###",
        Y: "###....###/.##....##./..##..##../...####.../....##..../....##..../....##..../....##..../....##..../....##..../....##..../....##..../..######..",
        Z: "##########/#.....##.#/.....##.../....##..../....##..../...##...../...##...../..##....../..##....../.##......./.##......./#.##.....#/##########",
        0x0: "..######../.##....##./##.....###/##....####/##...##.##/##...##.##/##..##..##/##..##..##/##.##...##/####....##/###.....##/.##....##./..######..",
        0x1: "...###..../..####..../.#.###..../...###..../...###..../...###..../...###..../...###..../...###..../...###..../...###..../...###..../..######..",
        0x2: "..######../.##....##./##......##/.......##./......##../.....##.../....##..../...##...../..##....../.##......./##......../##......##/##########",
        0x3: "..######../.##....##./........##/.......##./....####../.......##./........##/........##/........##/........##/##......##/.##....##./..######..",
        0x4: "......##../.....###../....####../...##.##../..##..##../.##...##../##....##../##########/......##../......##../......##../......##../....######",
        0x5: "##########/##......../##......../##......../########../..#....##./........##/........##/........##/........##/##......##/.##....##./..######..",
        0x6: "...#####../..##....#./.##......./##......../##......../########../##.....##./##......##/##......##/##......##/##......##/.##....##./..######..",
        0x7: "##########/##.....##./......##../.....##.../.....##.../....##..../....##..../...##...../...##...../..##....../..##....../..##....../.####.....",
        0x8: "..######../.##....##./##......##/##......##/.##....##./..######../.##....##./##......##/##......##/##......##/##......##/.##....##./..######..",
        0x9: "..######../.##....##./##......##/##......##/##......##/##.....###/..########/........##/.......##./......##../.....##.../.#....##../..#####...",
        '!': "...####.../...####.../...####.../...####.../...####.../....##..../....##..../....##..../....##..../........../...####.../...####.../...####...",
        '?': "..######../.##....##./##......##/........##/.......##./......##../.....##.../.....##.../.....##.../........../.....##.../.....##.../.....##...",
        '.': "........../........../........../........../........../........../........../........../........../........../..####..../..####..../..####....",
        ',': "........../........../........../........../........../........../........../........../........../..####..../..####..../...##...../..##......",
        '-': "........../........../........../........../........../........../.######.../.######.../........../........../........../........../..........",
        ':': "........../........../..####..../..####..../..####..../........../........../........../........../..####..../..####..../..####..../..........",
        '\x27': "...####.../...####.../...####.../....##..../........../........../........../........../........../........../........../........../..........",
        '\x20': "........../........../........../........../........../........../........../........../........../........../........../........../.........."
    },
    qy = 17 + hi.y,
    Uy = c => Math.max(0, c.length * 12 - 2) + 4 + hi.x + 1,
    i0 = new Map();

function renderTextCanvas(g, j = {}) {
    const vz = cX;
    let {
        fill: q = "#f2ead6",
        outline: v = "#12180c",
        shadow: y = "#12180c"
    } = j, A = g + '|' + q + '|' + v + '|' + y, C = i0.get(A);
    if (C) return C;
    let E = [...g.toUpperCase()],
        F = document.createElement("canvas");
    F.width = Uy(g), F.height = qy;
    let H = F.getContext('2d');
    H.imageSmoothingEnabled = false;
    let I = [],
        K = new Set();
    if (E.forEach((L, M) => {
            const vA = vz;
            let N = (o0[L] ?? o0[' ']).split('/'),
                P = 2 + M * 12;
            for (let Q = 0; Q < 13; Q++) {
                let R = N[Q] ?? '';
                for (let S = 0; S < 10; S++)
                    if (R[S] === '#')
                        for (let U = 0; U <= 1; U++) {
                            let V = P + S + U,
                                X = V * 4096 + 2 + Q;
                            K.has(X) || (K.add(X), I.push([V, 2 + Q]));
                        }
            }
        }), y) {
        H.fillStyle = y;
        for (let [L, M] of I) H.fillRect(L + hi.x, M + hi.y, 1, 1);
    }
    if (v) {
        H.fillStyle = v;
        for (let [N, P] of I)
            for (let Q = -1; Q <= 1; Q++)
                for (let R = -1; R <= 1; R++) H.fillRect(N + R, P + Q, 1, 1);
    }
    H.fillStyle = q;
    for (let [S, U] of I) H.fillRect(S, U, 1, 1);
    return i0.set(A, F), F;
}
var canopyScatterRadius = 6;

function $y(j, q, y, A) {
    const vB = cX;
    let C = Math.floor(j / y),
        E = Math.floor(q / y),
        F = 1 / 0,
        H = 0,
        I = 0,
        K = 0;
    for (let M = -1; M <= 1; M++)
        for (let N = -1; N <= 1; N++) {
            let P = hashInt(C + N, E + M),
                Q = (C + N + (P & 255) / 255 * 0.86 + 0.07) * y,
                R = (E + M + (P >> 8 & 255) / 255 * 0.86 + 0.07) * y,
                S = j - Q,
                U = q - R,
                V = S * S + U * U;
            V < F && (F = V, H = S, I = U, K = (P >> 16 & 255) / 255 * 2 - 1);
        }
    let L = Math.sqrt(F);
    A.dist = L, A.nx = L > 0.001 ? H / L : 0, A.ny = L > 0.001 ? I / L : 0, A.tint = K;
}
var blitOffsetX = 5,
    s0 = 6;

function buildGroundLayer(K, L) {
    const vC = cX;
    let {
        treeSdf: U,
        grassSdf: Y,
        width: a7,
        height: a8,
        noise: a9
    } = L, {
        stoneSdf: aj,
        longSdf: ak
    } = L, aq = false;
    for (let aY = 0; aY < U.length; aY++)
        if (U[aY] < 0 || Y[aY] < 0 || aj[aY] < 0 || ak[aY] < 0) {
            aq = true;
            break;
        } if (!aq) return {
        layer: null,
        shadow: null,
        understorey: null
    };
    let aw = K.tile,
        ax = K.pixelWidth,
        az = K.pixelHeight,
        aA = D1(K.theme),
        aB = document.createElement("canvas");
    aB.width = ax, aB.height = az;
    let aC = aB.getContext('2d'),
        aD = aC.createImageData(ax, az),
        aE = new Uint32Array(aD.data.buffer),
        aF = document.createElement("canvas");
    aF.width = ax, aF.height = az;
    let aG = aF.getContext('2d'),
        aH = aG.createImageData(ax, az),
        aI = new Uint32Array(aH.data.buffer),
        aJ = aA.shadow & 16777215 | 136 << 24,
        aK = new KT(a9, ax, az, aw, 0.3, 2),
        aL = new KT(a9, ax, az, aw, 0.33, 2),
        aM = new KT(a9, ax, az, aw, 1.9, 2),
        aN = new KT(a9, ax, az, aw, 0.085, 3),
        aO = new KT(a9, ax, az, aw, 1.3, 2),
        aP = new KT(a9, ax, az, aw, 1.4, 2),
        aQ = new KT(a9, ax, az, aw, 3.4, 2),
        aR = {
            dist: 0,
            nx: 0,
            ny: 0,
            tint: 0
        },
        aS = aA.canopy.length - 1,
        aU = (aZ, b4, b7) => {
            let b8 = aZ + (aO.at(aZ, b4) - 0.5) * 4.5 + (aQ.at(aZ, b4) - 0.5) * 3,
                b9 = b4 + (aP.at(aZ, b4) - 0.5) * 4.5 + (aQ.at(aZ + 29, b4 + 83) - 0.5) * 3;
            $y(b8, b9, b7, aR);
        },
        aV = (aZ, b4) => {
            let b7 = aZ + (aK.at(aZ, b4) - 0.5) * 11 + (aM.at(aZ, b4) - 0.5) * 5,
                b8 = b4 + (aL.at(aZ, b4) - 0.5) * 11 + (aM.at(aZ + 53, b4 + 17) - 0.5) * 5;
            return sampleSdf(U, a7, a8, aw, b7, b8);
        };
    for (let aZ = 0; aZ < az; aZ++)
        for (let b4 = 0; b4 < ax; b4++) {
            let b7 = aV(b4, aZ);
            if (b7 > 0.34) continue;
            aU(b4, aZ, canopyScatterRadius);
            let b8 = -b7,
                b9 = 1 - aR.dist / (canopyScatterRadius * 0.85);
            if (b8 < 0.5 && b9 < 0.3 - b8 * 0.7) continue;
            let bj = aZ * ax + b4,
                bk = -(aR.nx * 0.62 + aR.ny * 0.78),
                bq = aS * (0.3 + (aN.at(b4, aZ) - 0.5) * 0.72) + bk * 2.6 + b9 * 2.4 + aR.tint * 0.5;
            b9 > 0.72 && bk > 0.35 && (bq += 1.4), b8 < 1 && (bq -= (1 - b8) * 1.35), aE[bj] = sampleRamp(aA.canopy, bq, b4, aZ), aR.dist > canopyScatterRadius * 0.8 && (aE[bj] = blendColor(aE[bj], aA.canopy[1], 0.7));
        }
    fillTerrainPixels(aE, ax, az, aw, L, Y, GRASS_PARAMS, aA, aU, aR, aK, aL, aM, aN);
    let aX = renderTerrainCanvas(ax, az, aw, L, aA, aU, aR, aK, aL, aM, aN);
    fillStonePixels(aE, aI, ax, az, aw, L, Fl(K.theme), aU, aR, aK, aL, aM, aN);
    for (let bw = 0; bw < az; bw++)
        for (let bx = 0; bx < ax; bx++) {
            let bz = bx - blitOffsetX,
                bA = bw - s0;
            bz < 0 || bA < 0 || aV(bz, bA) > -0.12 || (aI[bw * ax + bx] = aJ);
        }
    return aC.putImageData(aD, 0, 0), aG.putImageData(aH, 0, 0), {
        layer: aB,
        shadow: aF,
        understorey: aX
    };
}
var GRASS_PARAMS = {
        tuft: 4,
        open: 0.34,
        hemOpen: 0.3,
        base: 0.4,
        blade: 1.6
    },
    zy = {
        tuft: 5,
        open: 0.1,
        hemOpen: 0.28,
        base: 0.5,
        blade: 1.6,
        strands: true
    };

function fillTerrainPixels(K, L, U, Y, a7, a8, a9, aj, ak, aq, aw, ax, az, aA) {
    const vD = cX;
    let {
        width: aB,
        height: aC
    } = a7, aD = false;
    for (let aG = 0; aG < a8.length; aG++)
        if (a8[aG] < 0) {
            aD = true;
            break;
        } if (!aD) return false;
    let aE = aj.canopy.length - 1,
        aF = a9.tuft;
    for (let aH = 0; aH < U; aH++)
        for (let aI = 0; aI < L; aI++) {
            let aJ = aI + (aw.at(aI, aH) - 0.5) * 9 + (az.at(aI, aH) - 0.5) * 6,
                aK = aH + (ax.at(aI, aH) - 0.5) * 9 + (az.at(aI + 11, aH + 67) - 0.5) * 6,
                aL = sampleSdf(a8, aB, aC, Y, aJ, aK);
            if (aL > 0.2) continue;
            let aM = -aL;
            if (a9.strands) {
                ak(aI, aH, aF);
                let aQ = aq.dist,
                    aR = (aq.tint + 1) * 32767 | 0,
                    aS = 3 + (aR & 3) * 0.5;
                if (aQ > aS) continue;
                if (aQ < 0.75) {
                    K[aH * L + aI] = sampleRamp(aj.canopy, aE * a9.base - 1.6, aI, aH);
                    continue;
                }
                let aU = 4 + (aR >> 2 & 1),
                    aV = 1.7 + (aR >> 3 & 3) * 0.25,
                    aX = (aR >> 5 & 7) / 7 * 0.6 - 0.3,
                    aY = Math.atan2(aq.ny, aq.nx),
                    aZ = -Math.PI / 2 - aV / 2 + aX,
                    b4 = false;
                for (let b9 = 0; b9 < aU && !b4; b9++) {
                    let bj = aZ + aV * b9 / (aU - 1);
                    b4 = Math.abs(aQ * Math.sin(aY - bj)) < 0.65;
                }
                if (!b4) continue;
                let b7 = (aA.at(aI, aH) - 0.5) * 1.2,
                    b8 = aE * a9.base + aQ / aS * a9.blade + b7;
                aM < 0.8 && (b8 -= (0.8 - aM) * 0.9), K[aH * L + aI] = sampleRamp(aj.canopy, b8, aI, aH);
                continue;
            }
            ak(aI, aH, aF);
            let aN = 1 - aq.dist / (aF * 0.9);
            if (aN < a9.open + (aM < 0.4 ? a9.hemOpen : 0)) continue;
            let aO = -(aq.nx * 0.5 + aq.ny * 0.86),
                aP = aE * (a9.base + (aA.at(aI, aH) - 0.5) * 0.8) + aO * 1.5 + aN * a9.blade + aq.tint * 0.45;
            aM < 0.8 && (aP -= (0.8 - aM) * 0.9), K[aH * L + aI] = sampleRamp(aj.canopy, aP, aI, aH);
        }
    return true;
}

function renderTerrainCanvas(g, j, p, q, v, y, A, C, E, F, H) {
    const vE = cX;
    let I = document.createElement("canvas");
    I.width = g, I.height = j;
    let K = I.getContext('2d'),
        L = K.createImageData(g, j),
        M = new Uint32Array(L.data.buffer);
    return fillTerrainPixels(M, g, j, p, q, q.longSdf, zy, v, y, A, C, E, F, H) ? (K.putImageData(L, 0, 0), I) : (I.width = 0, I.height = 0, null);
}

function fillStonePixels(q, H, K, L, P, Q, U, V, Y, a7, a8, a9, aj) {
    const vF = cX;
    let {
        stoneSdf: ak,
        width: aq,
        height: aw
    } = Q, ax = false;
    for (let aD = 0; aD < ak.length; aD++)
        if (ak[aD] < 0) {
            ax = true;
            break;
        } if (!ax) return;
    let az = U.face.length - 1,
        aA = 9,
        aB = U.shadow & 16777215 | 153 << 24,
        aC = (aE, aF) => {
            let aG = aE + (a7.at(aE, aF) - 0.5) * 10 + (a9.at(aE, aF) - 0.5) * 6,
                aH = aF + (a8.at(aE, aF) - 0.5) * 10 + (a9.at(aE + 97, aF + 41) - 0.5) * 6;
            return sampleSdf(ak, aq, aw, P, aG, aH);
        };
    for (let aE = 0; aE < L; aE++)
        for (let aF = 0; aF < K; aF++) {
            let aG = aC(aF, aE);
            if (aG > 0.3) continue;
            V(aF, aE, aA);
            let aH = -aG,
                aI = 1 - Y.dist / (aA * 0.86);
            if (aH < 0.45 && aI < 0.36 - aH * 0.7) continue;
            let aJ = aE * K + aF,
                aK = -(Y.nx * 0.55 + Y.ny * 0.78),
                aL = aK > 0.42 ? 1.9 : aK > -0.1 ? 0.5 : -1.4,
                aM = az * (0.42 + (aj.at(aF, aE) - 0.5) * 0.5) + aL + aI * 1.1 + Y.tint * 0.7;
            aH < 0.9 && (aM -= (0.9 - aH) * 1.6), q[aJ] = sampleRamp(U.face, aM, aF, aE), Y.ny > 0.72 && Y.dist > aA * 0.5 ? q[aJ] = U.shadow : Y.ny < -0.5 && Y.nx < 0.3 && aI > 0.35 && (aF + aE & 1) === 0 && (q[aJ] = U.cap);
            let aN = aF + blitOffsetX,
                aO = aE + s0;
            aH > 0.1 && aN < K && aO < L && (H[aO * K + aN] = aB);
        }
}

function drawMudClod(c, d, g, j, l) {
    const vG = cX;
    let m = hashInt(d, g);
    if (m % 7 > 1) return;
    let p = zT(l, 7).ramp,
        q = Math.min(j - 8, 3 + m % 5),
        u = d + 4,
        v = g + 5 + m % 4;
    c.fillStyle = SW(p[1]), c.fillRect(u, v, q, 2), c.fillRect(u + 2, v + 3, Math.max(2, q - 2), 1), c.fillStyle = SW(zT(l, 3).ramp[2]), c.fillRect(u + 1, v, Math.min(3, q - 1), 1), c.fillStyle = SW(p[3]), c.fillRect(u, v + 2, q - 1, 1);
}
var terrainJitterAmplitude = 11,
    d0 = 5,
    u0 = new Set([4]),
    bi = class {
        ['x'] = [];
        ['y'] = [];
        ["period"] = [];
        ["phase"] = [];
        ["wet"] = [];
        ["deep"] = [];
        ["colour"] = [];
        add(c, d, g, j, l, m) {
            const vH = cX;
            let p = m.indexOf(l) - 1;
            if (p < 0) return;
            let q = f.shore;
            this.x.push(c), this.y.push(d), this.period.push(q.periodMin + g * (q.periodMax - q.periodMin)), this.phase.push(j), this.wet.push(p), this.deep.push(Math.max(0, p - 1)), this.colour.push(l);
        } prune(c, d) {
            const vI = cX;
            let g = 0;
            for (let i = 0; i < this.x.length; i++) c[this.y[i] * d + this.x[i]] === this.colour[i] && (this.x[g] = this.x[i], this.y[g] = this.y[i], this.period[g] = this.period[i], this.phase[g] = this.phase[i], this.wet[g] = this.wet[i], this.deep[g] = this.deep[i], g++);
            this.x.length = this.y.length = g, this.period.length = this.phase.length = this.wet.length = this.deep.length = g;
        } freeze() {
            const vJ = cX;
            let c = this.wet.map((g, i) => i).sort((g, i) => this.wet[g] - this.wet[i]),
                d = g => c.map(i => g[i]);
            return {
                x: Int16Array.from(d(this.x)),
                y: Int16Array.from(d(this.y)),
                period: Float32Array.from(d(this.period)),
                phase: Float32Array.from(d(this.phase)),
                wet: Uint8Array.from(d(this.wet)),
                deep: Uint8Array.from(d(this.deep))
            };
        }
    };

function buildTerrainLayer(K, L, U) {
    const vK = cX;
    let Y = L.tile,
        a7 = L.pixelWidth,
        a8 = L.pixelHeight,
        a9 = L.theme,
        aj = U.noise,
        ak = K.createImageData(a7, a8),
        aq = new Uint32Array(ak.data.buffer),
        aw = new Map(),
        ax = aN => {
            const vL = vK;
            let aO = aw.get(aN);
            return aO || (aO = new KT(aj, a7, a8, Y, aN, 3), aw.set(aN, aO)), aO;
        };
    for (let aN of new Set(U.material)) ax(zT(a9, aN).scale);
    let az = new KT(aj, a7, a8, Y, 0.38, 2),
        aA = new KT(aj, a7, a8, Y, 0.41, 2),
        aB = new KT(aj, a7, a8, Y, 0.9, 2),
        aC = new KT(aj, a7, a8, Y, 2.6, 2),
        aD = oo(a9),
        aE = D1(a9),
        aF = [],
        aG = U.width,
        aH = U.height,
        aI = (aO, aP) => aO < 0 || aP < 0 || aO >= aG || aP >= aH ? 0 : U.material[aP * aG + aO];
    for (let aO = 0; aO < a8; aO++) {
        let aP = aO / Y | 0;
        for (let aQ = 0; aQ < a7; aQ++) {
            let aR = aQ / Y | 0,
                aS = aI(aR, aP),
                aU = aS;
            if (!u0.has(aS)) {
                let b8 = aQ + (az.at(aQ, aO) - 0.5) * 2 * terrainJitterAmplitude + (aC.at(aQ, aO) - 0.5) * 2 * d0,
                    b9 = aO + (aA.at(aQ, aO) - 0.5) * 2 * terrainJitterAmplitude + (aC.at(aQ + 71, aO + 37) - 0.5) * 2 * d0,
                    bj = aI(b8 / Y | 0, b9 / Y | 0);
                u0.has(bj) || (aU = bj);
            }
            let aV = zT(a9, aU),
                aX = aV.ramp.length - 1,
                aY = ax(aV.scale).at(aQ, aO),
                aZ = hash01(aQ >> 1, aO >> 1),
                b4 = hash01(aQ, aO),
                b7 = (aV.bias + (aY - 0.5) * aV.contrast) * aX + (aZ - 0.5) * aV.grain * 1.6 + (b4 - 0.5) * aV.grain * 0.7;
            aq[aO * a7 + aQ] = sampleRamp(aV.ramp, b7, aQ, aO);
        }
    }
    let {
        wetSdf: aJ
    } = U, aK = (bk, bq) => {
        const vM = vK;
        let bw = bk + (az.at(bk, bq) - 0.5) * 2 * terrainJitterAmplitude + (aC.at(bk, bq) - 0.5) * 7,
            bx = bq + (aA.at(bk, bq) - 0.5) * 2 * terrainJitterAmplitude + (aC.at(bk + 43, bq + 91) - 0.5) * 7;
        return sampleSdf(aJ, U.width, U.height, Y, bw, bx) < -0.02;
    };
    for (let bk = 0; bk < L.height; bk++)
        for (let bq = 0; bq < L.width; bq++) {
            let bw = z(L, bq, bk);
            if (bw !== 3 && bw !== 7) continue;
            let bx = bq * Y,
                bz = bk * Y;
            !aK(bx + 3, bz + 4) || !aK(bx + 13, bz + 4) || !aK(bx + 8, bz + 11) || !aK(bx + 13, bz + 11) || aF.push([bq, bk]);
        }
    scatterSnowDetail(aq, a7, a8, Y, U, a9), scatterGroundRipples(aq, a7, a8, Y, U, a9, ax(zT(a9, 1).scale), aB);
    let aL = new bi(),
        aM = new bi();
    return Tv(aq, a7, a8, Y, U, az, aA, aC, aD, L, aL, aM), fillFoliagePixels(aq, a7, a8, Y, U, az, aA, aB, aC, aE), scatterFoliage(aq, a7, a8, Y, U, az, aA, aC, aE), aL.prune(aq, a7), aM.prune(aq, a7), K.putImageData(ak, 0, 0), drawRoadSurface(K, L, U, aB), {
        waterTiles: aF,
        shore: {
            wet: aL.freeze(),
            shelf: aM.freeze()
        }
    };
}

function scatterSnowDetail(q, A, E, F, H, K) {
    const vN = cX;
    let L = H.width,
        N = H.height,
        P = zT(K, 0).ramp,
        Q = P[1],
        U = P[Math.min(P.length - 1, 3)],
        V = K === "arctic",
        X = 5;
    for (let Y = 0; Y * X < E; Y++)
        for (let a7 = 0; a7 * X < A; a7++) {
            let a8 = hashInt(a7, Y, 1542469173);
            if ((a8 & 1) === 0) continue;
            let a9 = a7 * X + (a8 >> 2 & 3),
                aj = Y * X + (a8 >> 4 & 3);
            if (a9 >= A || aj >= E) continue;
            let ak = a9 / F | 0,
                aq = aj / F | 0;
            if (ak >= L || aq >= N) continue;
            let aw = aq * L + ak;
            if (H.material[aw] !== 0 || H.foliage[aw]) continue;
            let ax = (a8 >> 6 & 1) === 0 ? U : Q;
            if (V) {
                let aB = 2 + (a8 >> 7 & 1);
                for (let aC = 0; aC < aB; aC++) {
                    let aD = a9 + aC;
                    aD < A && (q[aj * A + aD] = ax);
                }
                continue;
            }
            let az = 2 + (a8 >> 7 & 1),
                aA = (a8 >> 9 & 3) === 0 ? a8 >> 11 & 1 ? 1 : -1 : 0;
            for (let aE = 0; aE < az; aE++) {
                let aF = aj - aE,
                    aG = a9 + (aA * aE >> 1);
                if (aF < 0 || aG < 0 || aG >= A) break;
                q[aF * A + aG] = ax;
            }
        }
}

function scatterGroundRipples(j, q, A, F, H, K, L, N) {
    const vO = cX;
    let P = zT(K, 1),
        Q = false;
    for (let Y = 0; Y < H.material.length; Y++)
        if (H.material[Y] === 1) {
            Q = true;
            break;
        } if (!Q) return;
    let U = H.width,
        V = H.height,
        X = P.ramp.length - 1;
    for (let a7 = 0; a7 < A; a7++)
        for (let a8 = 0; a8 < q; a8++) {
            let a9 = a8 / F | 0,
                aj = a7 / F | 0;
            if (a9 >= U || aj >= V || H.material[aj * U + a9] !== 1) continue;
            let ak = L.at(a8, a7),
                aq = N.at(a8, a7),
                aw = 0.36 + (ak - 0.5) * 0.16,
                ax = 0.26 + aq * 0.1,
                az = (ak - 0.5) * 17 + (aq - 0.5) * 7,
                aA = (a8 * aw + a7 * (0.62 - aw * 0.4) + az) * ax,
                aB = Math.sin(aA);
            if (ak < 0.36 || aB < 0.5) continue;
            let aC = a7 * q + a8,
                aD = (aB - 0.5) / 0.5,
                aE = (P.bias + (ak - 0.5) * P.contrast) * X + (Math.sin(aA - 1.3) > 0.7 ? -1.7 : aD * 1.7);
            qW(a8, a7) > 0.3 + aD * 0.5 || (j[aC] = sampleRamp(P.ramp, aE, a8, a7));
        }
}

function scatterFoliage(q, A, F, H, K, L, N, P, Q) {
    const vP = cX;
    let {
        foliageSdf: U,
        width: V,
        height: X
    } = K, Y = Q.scrub.length - 1, a7 = (aj, ak) => K.material[(ak / H | 0) * V + (aj / H | 0)] === 0, a8 = (aj, ak, aq) => {
        const vQ = vP;
        let aw = 3 + (aq & 3);
        for (let ax = 0; ax < aw; ax++) {
            let az = ((ax + 0.5) / aw - 0.5) * 1.9 + (aq >> ax + 4 & 1) * 0.16,
                aA = 7 + (aq >> ax * 3 + 2 & 7);
            for (let aB = 0; aB < aA; aB++) {
                let aC = aB / aA,
                    aD = Math.round(aj + Math.sin(az) * aB * (0.35 + aC * 0.75)),
                    aE = ak - Math.round(aB * (0.94 - Math.abs(Math.sin(az)) * 0.3));
                if (aE < 0 || aE >= F || aD < 0 || aD >= A || !a7(aD, aE) || aC < 0.45 && aD + 1 < A && !a7(aD + 1, aE)) break;
                q[aE * A + aD] = sampleRamp(Q.scrub, aC * Y * 1.3, aD, aE), aC < 0.45 && aD + 1 < A && (q[aE * A + aD + 1] = sampleRamp(Q.scrub, aC * Y, aD + 1, aE));
            }
        }
    }, a9 = 11;
    for (let aj = 0; aj * a9 < F; aj++)
        for (let ak = 0; ak * a9 < A; ak++) {
            let aq = (ak * 2246822519 + aj * 3266489917 ^ 668265263) >>> 0,
                aw = ak * a9 + aq % a9,
                ax = aj * a9 + (aq >> 3) % a9;
            if (aw >= A || ax >= F) continue;
            let az = aw / H | 0,
                aA = ax / H | 0;
            if (az >= V || aA >= X || K.material[aA * V + az] !== 0) continue;
            let aB = aw + (L.at(aw, ax) - 0.5) * 2 * terrainJitterAmplitude + (P.at(aw, ax) - 0.5) * 8,
                aC = ax + (N.at(aw, ax) - 0.5) * 2 * terrainJitterAmplitude,
                aD = sampleSdf(U, V, X, H, aB, aC),
                aE = sampleSdf(U, V, X, H, aB, aC - H * 0.9) < aD - 0.15,
                aF;
            aD < -0.5 ? aF = 0 : aD < 1.6 ? aF = aE ? 0.42 : 0.16 : aD < 3.2 ? aF = 0.09 : aF = 0.006, aF *= 0.35 + 1.9 * Math.max(0, P.at(aw * 0.35, ax * 0.35) - 0.34), !((aq >> 8 & 255) / 255 > aF) && a8(aw, ax, aq >> 12);
        }
}

function Tv(q, F, H, K, L, N, P, Q, U, V, X, Y) {
    const vR = cX;
    let {
        wetSdf: a7,
        width: a8,
        height: a9
    } = L, aj = false;
    for (let ax = 0; ax < a7.length; ax++)
        if (a7[ax] < 0) {
            aj = true;
            break;
        } if (!aj) return;
    let ak = U.fringe.length - 1,
        aq = f.shore,
        aw = (az, aA) => {
            let aB = az / K | 0,
                aC = aA / K | 0;
            for (let aD = -1; aD <= 1; aD++)
                for (let aE = -1; aE <= 1; aE++) {
                    let aF = z(V, aB + aE, aC + aD);
                    if (aF === 4 || aF === 11 || aF === 12) return true;
                }
            return false;
        };
    for (let az = 0; az < H; az++)
        for (let aA = 0; aA < F; aA++) {
            let aB = aA + (N.at(aA, az) - 0.5) * 2 * terrainJitterAmplitude + (Q.at(aA, az) - 0.5) * 7,
                aC = az + (P.at(aA, az) - 0.5) * 2 * terrainJitterAmplitude + (Q.at(aA + 43, az + 91) - 0.5) * 7,
                aD = sampleSdf(a7, a8, a9, K, aB, aC);
            if (aD > 0.3 || aD < -0.5) continue;
            let aE = az * F + aA,
                aF = hash01(aA, az),
                aG = aA / aq.cell | 0,
                aH = az / aq.cell | 0;
            if (aD > -0.02) {
                if (aD > 0.14 && aF > 0.45) continue;
                let aI = sampleRamp(U.fringe, (1 - aD / 0.3) * ak, aA, az);
                q[aE] = aI, !aw(aA, az) && hash01(aG + 7, aH + 13) < aq.moving && X.add(aA, az, hash01(aG + 31, aH + 77), hash01(aG + 101, aH + 57), aI, U.fringe);
            } else {
                if (aD > -0.34 && aF < 0.5) {
                    let aJ = sampleRamp(U.shallow, aF * (U.shallow.length - 1), aA, az);
                    q[aE] = aJ, !aw(aA, az) && hash01(aG + 19, aH + 5) < aq.movingShallow && Y.add(aA, az, hash01(aG + 31, aH + 77), hash01(aG + 101, aH + 57), aJ, U.shallow);
                }
            }
        }
}

function fillFoliagePixels(j, q, A, C, E, F, H, I, K, L) {
    const vS = cX;
    let {
        foliageSdf: N,
        width: P,
        height: Q
    } = E, R = false;
    for (let S = 0; S < N.length; S++)
        if (N[S] < 0) {
            R = true;
            break;
        } if (R) {
        for (let U = 0; U < A; U++)
            for (let V = 0; V < q; V++) {
                let X = V + (F.at(V, U) - 0.5) * 2 * terrainJitterAmplitude + (K.at(V, U) - 0.5) * 9,
                    Y = U + (H.at(V, U) - 0.5) * 2 * terrainJitterAmplitude + (K.at(V + 61, U + 29) - 0.5) * 9,
                    a7 = sampleSdf(N, P, Q, C, X, Y);
                if (a7 > 1.6) continue;
                let a8 = V / C | 0,
                    a9 = U / C | 0;
                if (a8 >= P || a9 >= Q || E.material[a9 * P + a8] === 2) continue;
                let aj = U * q + V;
                a7 < -0.15 ? j[aj] = blendColor(j[aj], L.shadow, 0.7) : a7 < 0.5 ? qW(V, U) < 0.55 * (1 - a7 / 0.5) && (j[aj] = blendColor(j[aj], L.shadow, 0.55)) : qW(V, U) < 0.2 * (1 - (a7 - 0.5) / 1.1) && (j[aj] = L.litter[I.at(V, U) * L.litter.length | 0]);
            }
    }
}
var DIRT_COLOR = "#5c4f28",
    tv = "#a08a4e";

function drawRoadSurface(K, L, Q, U) {
    const vU = cX;
    let Y = L.tile,
        a7 = (a8, a9) => {
            const vV = vU;
            let aj = a8[Math.max(0, Math.min(a8.length - 1, a9))];
            return "rgb(" + (aj & 255) + ',' + (aj >> 8 & 255) + ',' + (aj >> 16 & 255) + ')';
        };
    for (let a8 = 0; a8 < L.height; a8++)
        for (let a9 = 0; a9 < L.width; a9++) {
            let aj = z(L, a9, a8),
                ak = a9 * Y,
                aq = a8 * Y,
                aw = U.at(ak + Y / 2, aq + Y / 2);
            if (aj === 4) {
                let ax = (aL, aM) => {
                        let aN = 0;
                        for (let aO = 1; aO < 24 && z(L, a9 + aL * aO, a8 + aM * aO) === 4; aO++) aN++;
                        return aN;
                    },
                    az = ax(-1, 0) + ax(1, 0),
                    aA = ax(0, -1) + ax(0, 1),
                    aB = !(az >= aA),
                    aC = (aL, aM) => {
                        const vX = vU;
                        let aN = (Math.imul(aL + 14201, 2654435761) ^ Math.imul(aM + 40503, 1597334677)) >>> 0;
                        return aN ^= aN >>> 15, aN = Math.imul(aN, 2246822519) >>> 0, aN ^= aN >>> 13, aN >>> 0;
                    },
                    aD = aL => {
                        const vY = vU;
                        let aM = Math.floor(aL / 24) * 24,
                            aN = aM;
                        for (;;) {
                            let aO = 3 + aC(aN, 1) % 3;
                            if (aN + aO > aM + 24 - 3 && (aO = aM + 24 - aN), aL < aN + aO) return [aN, aO];
                            aN += aO;
                        }
                    },
                    aE = aB ? ak - ax(-1, 0) * Y : aq - ax(0, -1) * Y,
                    aF = (aB ? az : aA) * Y + Y,
                    aG = (aL, aM) => {
                        const vZ = vU;
                        let aN = aC(aL, aE),
                            aO = Math.max(1, Math.floor(aF / 3)),
                            aP = aN % 3 === 0 ? aE + aO + (aN >>> 8) % aO : -1;
                        return aP < 0 || aM < aP ? [aE, aP < 0 ? aF : aP - aE] : [aP, aE + aF - aP];
                    },
                    aH = (aL, aM, aN, aO) => {
                        const w1 = vU;
                        aN <= 0 || (K.fillStyle = aO, aB ? K.fillRect(aM, aL, aN, 1) : K.fillRect(aL, aM, 1, aN));
                    },
                    aI = aB ? ak : aq;
                for (let aL = 0; aL < Y; aL++) {
                    let aM = (aB ? aq : ak) + aL,
                        [aN, aO] = aD(aM);
                    if (aM === aN) {
                        aH(aM, aI, Y, a7(Re, aC(aN, 2) % 4 === 0 ? 1 : 0));
                        continue;
                    }
                    for (let aP = 0; aP < Y;) {
                        let aQ = aI + aP,
                            [aR, aS] = aG(aN, aQ),
                            aU = Math.min(aI + Y, aR + aS),
                            aV = 1 + aC(aN, aR) % 3;
                        aH(aM, aQ, aU - aQ, a7(Re, aV));
                        let aX = aC(aM * 7 + 3, aR);
                        if (aX % 3 === 0) {
                            let aZ = aR + 1 + (aX >>> 8) % Math.max(1, aS - 4),
                                b4 = Math.min(aU, aZ + 2 + (aX >>> 16) % 4);
                            aH(aM, Math.max(aQ, aZ), b4 - Math.max(aQ, aZ), a7(Re, aV - 1));
                        }
                        let aY = aC(aN, aR) >>> 20;
                        if (aY % 9 === 0 && (aM === aN + 1 || aM === aN + 2) && aO >= 3) {
                            let b7 = aR + 2 + (aY >>> 4) % Math.max(1, aS - 4);
                            aH(aM, Math.max(aQ, b7), Math.min(aU, b7 + 2) - Math.max(aQ, b7), a7(Re, 0));
                        }
                        aR > aE && aR >= aQ && aR < aU && aH(aM, aR, 1, a7(Re, 0)), aP = aU - aI;
                    }
                }
                K.fillStyle = a7(Re, 4);
                let aJ = (b8, b9) => z(L, a9 + b8, a8 + b9) !== 4,
                    aK = b8 => (b8 * 2654435761 >>> 28) % 3 === 0 ? 1 : 0;
                if (aB) {
                    if (aJ(0, -1)) {
                        for (let b8 = 0; b8 < Y; b8++) K.fillRect(ak + b8, aq + aK(ak + b8), 1, 2);
                    }
                    if (aJ(0, 1)) {
                        for (let b9 = 0; b9 < Y; b9++) K.fillRect(ak + b9, aq + Y - 2 - aK(ak + b9 + 7), 1, 2);
                    }
                } else {
                    if (aJ(-1, 0)) {
                        for (let bj = 0; bj < Y; bj++) K.fillRect(ak + aK(aq + bj), aq + bj, 2, 1);
                    }
                    if (aJ(1, 0)) {
                        for (let bk = 0; bk < Y; bk++) K.fillRect(ak + Y - 2 - aK(aq + bk + 7), aq + bk, 2, 1);
                    }
                }
                for (let [bq, bw] of [
                        [1, 0],
                        [-1, 0],
                        [0, 1],
                        [0, -1]
                    ]) {
                    if (aB ? bq !== 0 : bw !== 0) continue;
                    let bx = z(L, a9 + bq, a8 + bw);
                    if (bx === 4) continue;
                    let bz = bx === 3 || bx === 7,
                        bA = bq > 0 ? ak + Y - 2 : ak,
                        bB = bw > 0 ? aq + Y - 2 : aq;
                    if (bz)
                        for (let bC = 0; bC < Y; bC++) {
                            let bD = ((ak + aq + bC) * 2654435761 >>> 27) % 4;
                            bD !== 0 && (K.fillStyle = a7(Re, 0), bq !== 0 ? K.fillRect(bA, aq + bC, Math.min(2, bD), 1) : K.fillRect(ak + bC, bB, 1, Math.min(2, bD)));
                        } else {
                            K.fillStyle = a7(zT(L.theme, getTileMaterial(bx)).ramp, 2);
                            for (let bE = 0; bE < Y; bE++) {
                                let bF = ((ak + aq + bE * 3) * 2654435761 >>> 28) % 2;
                                bq !== 0 ? K.fillRect(bA, aq + bE, 1 + bF, 1) : K.fillRect(ak + bE, bB, 1, 1 + bF);
                            }
                        }
                }
            } else {
                if (aj === 12) {
                    let bG = (c8, c9) => z(L, a9 + c8, a8 + c9) === 12,
                        bH = bG(-1, -1),
                        bI = bG(1, -1),
                        bJ = bG(-1, 1),
                        bK = bG(1, 1),
                        bL = bG(-1, 0) || bH || bJ,
                        bM = bG(1, 0) || bI || bK,
                        bN = bG(0, -1) || bH || bI,
                        bO = bG(0, 1) || bJ || bK,
                        bP = !bL && !bM && !bN && !bO,
                        bQ = "#4a3c26",
                        bR = "#7b6743",
                        bS = "#3a2f1d",
                        bU = "#8a744a",
                        bV = "#2a2a26",
                        bX = 2,
                        bY = 3,
                        bZ = Y / 2,
                        c7 = (c8, c9, cj) => {
                            const w7 = vU;
                            let ck = ak + c8,
                                cq = aq + c9,
                                cw = cA => {
                                    const w5 = b;
                                    K.fillStyle = cj ?? cA;
                                };
                            for (let [cA, cB] of [
                                    [7, 6],
                                    [12, 11]
                                ]) cw(bQ), (bL || bP) && K.fillRect(ck, cq + cA, bZ, 2), (bM || bP) && K.fillRect(ck + bZ, cq + cA, bZ, 2), cw(bR), (bL || bP) && K.fillRect(ck, cq + cB, bZ, 1), (bM || bP) && K.fillRect(ck + bZ, cq + cB, bZ, 1);
                            for (let [cC, cD] of [
                                    [0, bN],
                                    [bZ, bO]
                                ]) cD && (cw(bQ), K.fillRect(ck + bZ - 2, cq + cC, 3, bZ), cw(bR), K.fillRect(ck + bZ - 2, cq + cC, 1, bZ));
                            let cx = (bN || bO) && (bL || bM),
                                cz = [bN, bO, bL, bM].filter(Boolean).length <= 1;
                            if (cx || cz || bP) cw(bS), K.fillRect(ck + bZ - 1, cq + 3, 3, 12), cw(bU), K.fillRect(ck + bZ - 1, cq + 3, 1, 12);
                            else {
                                if (bL || bM) {
                                    cw(bS);
                                    for (let cE = 1; cE < Y; cE += 5) K.fillRect(ck + cE, cq + 3, 2, 12);
                                    cw(bU);
                                    for (let cF = 1; cF < Y; cF += 5) K.fillRect(ck + cF, cq + 3, 1, 12);
                                } else {
                                    cw(bS);
                                    for (let cG = 1; cG < Y; cG += 5) K.fillRect(ck + bZ - 3, cq + cG, 6, 3);
                                    cw(bU);
                                    for (let cH = 1; cH < Y; cH += 5) K.fillRect(ck + bZ - 3, cq + cH, 6, 1);
                                }
                            }
                        };
                    c7(bX, bY, bV), c7(0, 0, null);
                } else {
                    if (aj === 19) drawMudClod(K, ak, aq, Y, L.theme);
                    else {
                        if (aj === 9) {
                            let c8 = U.at(ak + 3, aq + 7);
                            if (c8 > 0.62) {
                                let c9 = ak - 2 + (c8 * 53 % (Y + 4) | 0),
                                    cj = aq - 2 + (c8 * 191 % (Y + 4) | 0),
                                    ck = c8 > 0.9 ? 3 : c8 > 0.76 ? 2 : 1;
                                for (let cq = 0; cq < ck; cq++) {
                                    let cw = 2 + cq * 2 + (c8 * 13 % 4 | 0);
                                    K.fillStyle = cq % 2 === 0 ? DIRT_COLOR : tv;
                                    for (let cx = -cw; cx <= cw; cx++) {
                                        let cz = Math.round(Math.sqrt(Math.max(0, cw * cw - cx * cx)) * 1.6),
                                            cA = cj + Math.round(cx * 0.62);
                                        cz <= 0 || (K.fillRect(c9 - cz, cA, 1, 1), K.fillRect(c9 + cz, cA, 1, 1));
                                    }
                                }
                            }
                        } else {
                            if (aj === 10) {
                                if (aw > 0.64) {
                                    let cB = zT(L.theme, 5).ramp;
                                    K.fillStyle = a7(cB, cB.length - 1);
                                    let cC = ak + (aw * 97 % Y | 0),
                                        cD = aq + (aw * 211 % Y | 0),
                                        cE = 3 + (aw * 13 % 4 | 0),
                                        cF = aw > 0.7 ? 1 : -1;
                                    for (let cG = 0; cG < cE; cG++) K.fillRect(cC + cG, cD + cG * cF, 1, 1);
                                }
                            } else {
                                if (aj === 11) {
                                    let cH = z(L, a9, a8 - 1) === 11 || z(L, a9, a8 + 1) === 11,
                                        cI = (U.at(ak + Y / 2, aq + Y / 2) - 0.5) * 5 | 0,
                                        cJ = zT(L.theme, 6).ramp;
                                    for (let cK of [-4, 4])
                                        for (let cL = 0; cL < Y; cL++) {
                                            let cM = cH ? aq + cL : ak + cL,
                                                cN = U.at(cH ? ak + cK : cM, cH ? cM : aq + cK);
                                            if (cN > 0.14) continue;
                                            K.fillStyle = a7(cJ, cN < 0.08 ? 0 : 1);
                                            let cO = Y / 2 + cK + cI + (cN * 7 | 0) - 3;
                                            cH ? K.fillRect(ak + cO, aq + cL, 1, 1) : K.fillRect(ak + cL, aq + cO, 1, 1);
                                        }
                                    aw > 0.85 && (K.fillStyle = a7(cJ, 0), K.fillRect(ak + (aw * 131 % Y | 0), aq + (aw * 197 % Y | 0), 2, 1));
                                }
                            }
                        }
                    }
                }
            }
        }
}
var hashBucket = (c, d) => ((Math.imul(c + 1, 2654435761) >>> 16) % d + d) % d,
    dt = 4,
    p0 = 0.5,
    ov = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

function iv(c, d, g) {
    const w8 = cX;