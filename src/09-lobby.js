// Lobby & leaderboard screens
// Public/private room listing, join codes, multiplayer stats (`mp-stats`), leaderboard feed rendering.
                }, f["timing"]["frontFade"]));
            },
            aJ = bU => aI({
                'id': bU,
                'difficulty': aD
            }),
            aK = {
                'intro': P,
                'select': Q,
                'armoury': V,
                'lobby': a8
            },
            aL = bU => {
                const tA = b;
                let bV = w("button", "hud-tool t-close lb-head-door");
                return bV["type"] = "button", bV["title"] = "Close", bV["setAttribute"]("aria-label", "Close"), bV["onclick"] = bU, bV;
            },
            aM = () => {},
            aN = bU => {
                const tB = b;
                N["classList"]["toggle"]("on-select", bU !== "intro");
                for (let [bV, bX] of Object["entries"](aK)) bX["hidden"] = bV !== bU;
                bU === "armoury" && bC(), bU === "select" && aM(), bU !== "intro" && dm(bU), aK[bU]["querySelector"]("button")?.["focus"]();
            };
        aC[tC(0x1001)] = () => {
            const tD = tC;
            N[tD(0x13c1)][tD(0x11e2)](tD(0xa4c)) && aN(tD(0xaa9));
        };
        let aO = document[tC(0x10d5)](tC(0xf9c));
        aO && (aO[tC(0x1001)] = bU => {
            const tE = tC;
            bU[tE(0xa6e)](), Bm();
        });
        let aP = document[tC(0x10d5)](tC(0x999)),
            aQ = document[tC(0x10d5)](tC(0x135a));
        aP && (aP[tC(0x1338)] = tC(0xec8), aP[tC(0x6ad)] = !0x1, aQ && (aQ[tC(0x6ad)] = !0x1), Gm() && (aP[tC(0x766)] = !0x1, aP[tC(0xf90)] = tC(0x6a0), aP[tC(0x1001)] = () => {
            Vm();
        }));
        let aR = co(q),
            aS = A && aR[tC(0x2fc)](bU => bU['id'] === A && aE[tC(0x607)][tC(0x530)](bU['id'])) ? A : null,
            aU = aR[tC(0x1f6)](bU => aE[tC(0x607)][tC(0x530)](bU['id']) && !K[tC(0xc70)][bU['id']]);
        aA[tC(0x1338)] = '';
        let aV = bU => {
                const tF = tC;
                let bV = w(tF(0x3df), tF(0x477) + bU);
                return aA[tF(0xa20)](bV), bV;
            },
            aX = aV(tC(0x24b)),
            aY = aV(tC(0xd9f)),
            aZ = aV(tC(0xc53));
        aX[tC(0xa20)](RW(tC(0x60c), tC(0x2a9), () => {
            const tG = tC;
            let bU = aU?.['id'] ?? aS ?? aR[tG(0x1f6)](bV => aE[tG(0x607)][tG(0x530)](bV['id']))?.['id'];
            bU && aJ(bU);
        })), aY[tC(0xa20)](RW(tC(0xf72), '', () => aN(tC(0x8d8)))), aY[tC(0xa20)](RW(tC(0x532), '', () => aN(tC(0x83d))));
        let b4 = RW(tC(0x391), tC(0x172b), () => {
            const tH = tC;
            aN(tH(0xab0)), $[tH(0x362)] || $[tH(0x14f8)]();
        });
        b4[tC(0x2cc)](eT(Ie(!0x0), 0x2, tC(0xa42))), b4[tC(0xa20)](eT(Ie(!0x0), 0x2, tC(0xa42))), aZ[tC(0xa20)](b4);
        let b7 = !0x1,
            b8 = () => {
                const tI = tC;
                b7 || (b7 = !0x0, $[tI(0x14f8)](), bx(), window[tI(0xb84)](() => {
                    b7 = !0x1, bx();
                }, 0x1f4));
            },
            b9 = bU => Math[tC(0x4b7)](bU / 0x3c) + tC(0x152a) + (bU === 0x3c ? '' : 'S'),
            bj = bU => {
                const tJ = tC;
                let bV = w(tJ(0x3df), tJ(0x121e)),
                    bX = (c8, c9, cj, ck) => {
                        const tK = tJ;
                        ST({
                            'title': c8,
                            'body': c9,
                            'buttons': cj[tK(0x24c)](([cq, cw]) => ({
                                'label': cq,
                                'value': cw
                            })),
                            'dismiss': tK(0x1471)
                        })[tK(0x1101)](cq => {
                            const tL = tK;
                            cq !== tL(0x1471) && ck(cq);
                        });
                    },
                    bY = lo[tJ(0xe37)](c8 => aT[c8]?.[tJ(0xd22)] === tJ(0xf49)),
                    bZ = [
                        [tJ(0x556), pi(bU[tJ(0x554)]), () => bX(tJ(0x556), tJ(0xcc0), bY[tJ(0x24c)](c8 => [pi(c8), c8]), c8 => $[tJ(0x1156)]({
                            'mapId': c8
                        }))],
                        [tJ(0x1230), b9(bU[tJ(0x10c2)]), () => bX(tJ(0x1230), tJ(0xe1e), jf[tJ(0x24c)](c8 => [b9(c8), String(c8)]), c8 => $[tJ(0x1156)]({
                            'seconds': Number(c8)
                        }))],
                        [tJ(0x978), bU[tJ(0x16ad)][tJ(0x10cf)](), () => bX(tJ(0x978), tJ(0x1250), [
                            [tJ(0x52c), tJ(0xf49)]
                        ], () => {})],
                        [tJ(0x818), bU[tJ(0x269)][tJ(0x10cf)](), () => bX(tJ(0x818), tJ(0x1649), [
                            [tJ(0x1158), tJ(0x51a)],
                            [tJ(0x306), tJ(0xfc0)]
                        ], c8 => $[tJ(0x1156)]({
                            'visibility': c8
                        }))],
                        [tJ(0xb39), bU[tJ(0xb43)] ? 'ON' : tJ(0x15b4), () => bX(tJ(0xb39), tJ(0x1077), [
                            ['ON', 'on'],
                            [tJ(0x15b4), tJ(0x2ac)]
                        ], c8 => $[tJ(0x1156)]({
                            'fog': c8 === 'on'
                        }))],
                        [tJ(0x65f), bU[tJ(0xd8e)] ? 'ON' : tJ(0x15b4), () => bX(tJ(0x65f), tJ(0x1651), [
                            ['ON', 'on'],
                            [tJ(0x15b4), tJ(0x2ac)]
                        ], c8 => $[tJ(0x1156)]({
                            'edgeScroll': c8 === 'on'
                        }))],
                        [tJ(0x1295), String(bU[tJ(0x5bd)]), () => bX(tJ(0x1295), tJ(0xc38), Pf[tJ(0x24c)](c8 => [String(c8), String(c8)]), c8 => $[tJ(0x1156)]({
                            'rounds': Number(c8)
                        }))],
                        [tJ(0x543), String(Math[tJ(0x220)](bU[tJ(0x5d2)], Yf(bU[tJ(0x554)]))), () => bX(tJ(0x543), tJ(0x1037), Lf[tJ(0xe37)](c8 => c8 <= Yf(bU[tJ(0x554)]))[tJ(0x24c)](c8 => [String(c8), String(c8)]), c8 => $[tJ(0x1156)]({
                            'squad': Number(c8)
                        }))]
                    ],
                    c7 = {
                        'MAP': eT(Ue(tJ(0x24c)), 0x1),
                        'DURATION': eT(Ue(tJ(0x1318)), 0x1),
                        'MODE': eT(Ue(tJ(0x14c1)), 0x1),
                        'VISIBILITY': eT(Pe(!0x1), 0x1),
                        'FOG\x20OF\x20WAR': eT(Ue(tJ(0xced)), 0x1),
                        'EDGE\x20MOVEMENT': eT(Ue(tJ(0xb04)), 0x1),
                        'ROUNDS': eT(Ue(tJ(0x1318)), 0x1),
                        'MEN\x20PER\x20SIDE': eT(Ue(tJ(0x14c1)), 0x1)
                    };
                for (let [c8, c9, cj] of bZ) {
                    let ck = w(tJ(0x14ab), tJ(0x1313));
                    ck[tJ(0xb42)] = tJ(0x14ab), ck[tJ(0xa20)](c7[c8]), ck[tJ(0xa20)](w(tJ(0x12a0), tJ(0x9b2), c8)), ck[tJ(0xa20)](w(tJ(0x12a0), tJ(0x92c), c9)), ck[tJ(0x1001)] = cj, bV[tJ(0xa20)](ck);
                }
                return bV;
            },
            bk = bU => () => {
                const tM = tC;
                $[tM(0x654)]({
                    'seconds': f[tM(0xf49)][tM(0x10c2)],
                    'visibility': bU
                });
            },
            bq = () => {
                const tN = tC;
                ak[tN(0x1338)] = '';
                let bU = w(tN(0x3df), tN(0x574));
                bU[tN(0xa20)](w(tN(0x12a0), void 0x0, tN(0xebb)));
                let bV = w(tN(0x14ab), b7 ? tN(0x134a) : tN(0x912));
                bV[tN(0xb42)] = tN(0x14ab), bV[tN(0xf90)] = tN(0x30f), bV[tN(0xa20)](eT(Zt(tN(0x114c)), 0x2)), bV[tN(0x1001)] = b8, bU[tN(0xa20)](bV), ak[tN(0xa20)](bU);
                let bX = w(tN(0x3df), tN(0x80e));
                b7 && bX[tN(0x13c1)][tN(0x851)](tN(0x12c8));
                for (let bZ of $[tN(0x675)]) {
                    let c7 = w(tN(0x3df), bZ[tN(0x30e)] ? tN(0x152c) : tN(0x744));
                    c7[tN(0xa20)](w(tN(0x3df), tN(0x857)));
                    let c8 = w(tN(0x3df), tN(0x517));
                    c8[tN(0xa20)](w(tN(0x12a0), tN(0xc5c), bZ[tN(0xf4e)])), c8[tN(0xa20)](w(tN(0x12a0), tN(0x950), bZ[tN(0x16ad)][tN(0x10cf)]())), c8[tN(0xa20)](w(tN(0x12a0), tN(0x950), pi(bZ[tN(0x554)]))), c7[tN(0xa20)](c8);
                    let c9 = w(tN(0x3df), tN(0x764));
                    c9[tN(0xa20)](w(tN(0x12a0), tN(0x1352), bZ[tN(0x145a)] + tN(0x5f7) + bZ[tN(0x684)])), bZ[tN(0x30e)] ? c9[tN(0xa20)](RW(tN(0xbae), '', () => $[tN(0x109b)](bZ[tN(0x5a3)], tN(0x14f8)))) : c9[tN(0xa20)](w(tN(0x12a0), tN(0x1039), tN(0x79a))), c7[tN(0xa20)](c9), bX[tN(0xa20)](c7);
                }
                let bY = w(tN(0x3df), tN(0xdaf));
                $[tN(0x675)][tN(0x1e8)] ? bY[tN(0x1338)] = tN(0x592) : (bY[tN(0x13c1)][tN(0x851)](tN(0x8de)), bY[tN(0xa20)](w(tN(0x12a0), void 0x0, tN(0xe0c))), bY[tN(0xa20)](RW(tN(0x407), '', bk(tN(0xfc0))))), bX[tN(0xa20)](bY), ak[tN(0xa20)](bX);
            },
            bw = () => {
                const tO = tC;
                a9[tO(0x1338)] = '', aj[tO(0x1338)] = '';
                let bU = $[tO(0x362)],
                    bV = bU?.[tO(0xc0c)][0x0]?.[tO(0xf4e)];
                if (a9[tO(0xa20)](w(tO(0x12a0), tO(0x1363), bU ? bU[tO(0xf4e)] : tO(0xee4))), a9[tO(0xa20)](aL(() => {
                        const tP = tO;
                        if (!$[tP(0x362)]) {
                            aN(tP(0xaa9));
                            return;
                        }
                        $[tP(0x47b)](), bx();
                    })), bU) {
                    let cq = w(tO(0x12a0), tO(0x440));
                    cq[tO(0xa20)](eT(bU[tO(0x269)] === tO(0x51a) ? Pe(!0x1) : Na(), 0x1)), cq[tO(0xa20)](w(tO(0x12a0), void 0x0, bU[tO(0x269)][tO(0x10cf)]() + tO(0x12f9) + bU[tO(0x5a3)])), a9[tO(0xa20)](cq), a9[tO(0xa20)](w(tO(0x12a0), tO(0x77f), bU[tO(0x16ad)][tO(0x10cf)]() + tO(0x44e) + pi(bU[tO(0x554)])));
                }
                if (aq[tO(0x13c1)][tO(0x33b)](tO(0x154b), !!bU), ak[tO(0x6ad)] = !!bU, ak[tO(0x1338)] = '', !bU) {
                    bq();
                    let cw = w(tO(0x3df), tO(0x1296));
                    cw[tO(0xa20)](w(tO(0x12a0), tO(0x11cd), tO(0x10ec)));
                    let cx = w(tO(0x3df), tO(0x813));
                    cx[tO(0xa20)](eT(Ve(!0x0), 0x1, tO(0x6c0))), cx[tO(0xa20)](w(tO(0x12a0), tO(0xa58), vn()));
                    let cz = w(tO(0x14ab), tO(0x15e8));
                    cz[tO(0xb42)] = tO(0x14ab), cz[tO(0xf90)] = tO(0x37a), cz[tO(0xa20)](eT(Zt(tO(0x16b7)), 0x2)), cx[tO(0xa20)](cz), cz[tO(0x1001)] = () => {
                        const tQ = tO;
                        Ru({
                            'title': tQ(0x53e),
                            'label': tQ(0x1637),
                            'value': vn(),
                            'placeholder': tQ(0xf1a),
                            'maxLength': 0xc
                        })[tQ(0x1101)](cF => {
                            const tR = tQ;
                            cF !== null && (Df(cF), $[tR(0x74f)](), bx());
                        });
                    }, cw[tO(0xa20)](cx), aj[tO(0xa20)](cw);
                    let cA = (cF, cG, cH, cI) => {
                        const tS = tO;
                        let cJ = RW('', tS(0x13aa), cI);
                        cJ[tS(0x1338)] = '', cJ[tS(0xa20)](cH);
                        let cK = w(tS(0x3df), tS(0x170e));
                        return cK[tS(0xa20)](w(tS(0x12a0), tS(0xfdf), cF)), cK[tS(0xa20)](w(tS(0x12a0), tS(0x152b), cG)), cJ[tS(0xa20)](cK), cJ;
                    };
                    aj[tO(0xa20)](cA(tO(0x4ee), tO(0x172a), eT(Na(), 0x2, tO(0x891)), bk(tO(0xfc0)))), aj[tO(0xa20)](cA(tO(0x74c), tO(0x7d2), eT(Pe(!0x0), 0x2, tO(0x891)), bk(tO(0x51a))));
                    let cB = w(tO(0x3df), tO(0x1296));
                    cB[tO(0xa20)](w(tO(0x12a0), tO(0x11ee), tO(0xd12))), cB[tO(0xa20)](w(tO(0x12a0), tO(0x152b), tO(0xad3)));
                    let cC = w(tO(0x3df), tO(0x1440)),
                        cD = w(tO(0x74d), tO(0xb8a));
                    cD[tO(0x11f0)][tO(0xce0)] = tO(0x163f), cD[tO(0x93f)] = 0x6, cD[tO(0x68b)] = tO(0x102a);
                    let cE = () => {
                        const tT = tO;
                        cD[tT(0x35e)][tT(0xaca)]() && $[tT(0x109b)](cD[tT(0x35e)]);
                    };
                    cD[tO(0x14fe)] = cF => {
                        const tU = tO;
                        cF[tU(0x9f3)] === tU(0x4cb) && cE();
                    }, cC[tO(0xa20)](cD), cC[tO(0xa20)](RW(tO(0xbae), '', cE)), cB[tO(0xa20)](cC), $[tO(0x1361)] && cB[tO(0xa20)](w(tO(0x3df), tO(0x2fa), $[tO(0x1361)][tO(0x10cf)]())), aj[tO(0xa20)](cB), aw[tO(0x1338)] = '';
                    return;
                }
                let bX = w(tO(0x3df), tO(0x386));
                for (let cF = 0x0; cF < 0x2; cF++) {
                    let cG = bU[tO(0xc0c)][cF],
                        cH = w(tO(0x3df), tO(0xf48));
                    cG?.[tO(0x160d)] && cH[tO(0x13c1)][tO(0x851)](tO(0x160d)), cG && !cG[tO(0xa65)] && cH[tO(0x13c1)][tO(0x851)](tO(0x79d)), cH[tO(0xa20)](w(tO(0x12a0), tO(0x1741), cF === bU[tO(0xbda)] ? tO(0x370) : tO(0xc79) + (cF + 0x1))), cH[tO(0xa20)](eT(cG ? Ve(!0x0) : Rf(), 0x1, tO(0xb8b)));
                    let cI = w(tO(0x3df), tO(0x12f1));
                    if (cG) {
                        let cJ = w(tO(0x3df), tO(0x16d3));
                        if (cJ[tO(0xa20)](w(tO(0x12a0), void 0x0, cG[tO(0xf4e)] + (cF === bU[tO(0xbda)] ? tO(0xbf1) : ''))), cI[tO(0xa20)](cJ), cF === 0x0 && cI[tO(0xa20)](w(tO(0x12a0), tO(0x103c), tO(0x65b))), bU[tO(0xc0c)][tO(0x2fc)](cL => cL[tO(0x164c)] > 0x0)) {
                            let cL = w(tO(0x12a0), tO(0xc2d));
                            cL[tO(0xa20)](w(tO(0x12a0), tO(0x15b0), tO(0x5c0) + cG[tO(0x164c)])), cI[tO(0xa20)](cL);
                        }
                        cH[tO(0xa20)](cI);
                        let cK = cG[tO(0xa65)] ? cG[tO(0x160d)] ? tO(0x159c) : tO(0x30d) : tO(0x43a);
                        if (cF === bU[tO(0xbda)]) {
                            let cM = RW(cG[tO(0x160d)] ? tO(0x159c) : tO(0x1395), cG[tO(0x160d)] ? '' : tO(0x2a9), () => $[tO(0x160d)](!cG[tO(0x160d)]));
                            cM[tO(0x13c1)][tO(0x851)](tO(0x564), tO(0xc3b)), cH[tO(0xa20)](cM);
                        } else cH[tO(0xa20)](w(tO(0x3df), tO(0xd30), cK));
                        bX[tO(0xa20)](cH);
                        continue;
                    } else {
                        cI[tO(0xa20)](w(tO(0x12a0), tO(0x16d3), tO(0xa24))), cI[tO(0xa20)](w(tO(0x12a0), tO(0xc2d), tO(0xde5)));
                        let cN = w(tO(0x3df), tO(0x369)),
                            cO = w(tO(0x12a0), tO(0x10de), ri(bU[tO(0x5a3)])),
                            cP = w(tO(0x3df), tO(0x153c));
                        cP[tO(0xa20)](cO), cP[tO(0xa20)](RW(tO(0x8a3), tO(0x107a), () => {
                            const tV = tO;
                            navigator[tV(0xfb3)]?.[tV(0x8cd)](ri(bU[tV(0x5a3)])), cO[tV(0x1338)] = tV(0x11d9), window[tV(0xb84)](() => {
                                const tW = tV;
                                cO[tW(0x1338)] = ri(bU[tW(0x5a3)]);
                            }, 0x384);
                        })), cN[tO(0xa20)](cP);
                        let cQ = w(tO(0x3df), tO(0x668));
                        cQ[tO(0xa20)](w(tO(0x12a0), tO(0xc2d), tO(0x16df))), cQ[tO(0xa20)](w(tO(0x12a0), tO(0x25a), bU[tO(0x5a3)])), cN[tO(0xa20)](cQ), cH[tO(0xa20)](cI), cH[tO(0xa20)](cN), bX[tO(0xa20)](cH);
                        continue;
                    }
                    cH[tO(0xa20)](cI), bX[tO(0xa20)](cH);
                }
                aj[tO(0xa20)](bX);
                let bY = w(tO(0x3df), tO(0xf8f));
                bU[tO(0x554)] in aT || Iu(bU[tO(0x554)]);
                let bZ = bj(bU);
                bY[tO(0xa20)](bZ);
                let c7 = w(tO(0x3df), tO(0x14cf)),
                    c8 = w(tO(0x3df), tO(0x7e0));
                for (let cR of $[tO(0x1539)]) {
                    let cS = w(tO(0x3df), tO(0x1021) + cR[tO(0x944)]);
                    cR[tO(0x944)] === tO(0x29f) ? (cS[tO(0xa20)](w(tO(0x12a0), tO(0x260) + (cR[tO(0xa75)] ?? tO(0xaac)), '<' + (cR[tO(0x61e)] ?? '?') + '>')), cS[tO(0xa20)](w(tO(0x12a0), tO(0x150c), cR[tO(0x1524)]))) : cS[tO(0xa20)](w(tO(0x12a0), tO(0x150c), cR[tO(0x1524)])), c8[tO(0xa20)](cS);
                }
                c7[tO(0xa20)](c8);
                let c9 = w(tO(0x3df), tO(0x143f)),
                    cj = w(tO(0x74d), tO(0xb8a));
                cj[tO(0x11f0)][tO(0xce0)] = tO(0x29f), cj[tO(0x93f)] = ei, cj[tO(0x68b)] = tO(0xbf7);
                let ck = () => {
                    const tX = tO;
                    let cU = cj[tX(0x35e)];
                    cU[tX(0xaca)]() && (cj[tX(0x35e)] = '', $[tX(0x809)](cU));
                };
                cj[tO(0x14fe)] = cU => {
                    const tY = tO;
                    cU[tY(0x9f3)] === tY(0x4cb) && ck();
                }, c9[tO(0xa20)](cj), c9[tO(0xa20)](RW(tO(0x1561), tO(0x107a), ck)), c7[tO(0xa20)](c9), bY[tO(0xa20)](c7), aj[tO(0xa20)](bY), c8[tO(0x411)] = c8[tO(0xf94)], aw[tO(0x1338)] = '';
            },
            bx = () => {
                const tZ = tC;
                let bU = document[tZ(0x13cb)],
                    bV = [...a8[tZ(0x337)](tZ(0x74d))][tZ(0x24c)](bX => ({
                        'keep': bX[tZ(0x11f0)][tZ(0xce0)],
                        'value': bX[tZ(0x35e)],
                        'at': bX[tZ(0x480)] ?? bX[tZ(0x35e)][tZ(0x1e8)],
                        'had': bX === bU
                    }));
                bw();
                for (let bX of bV) {
                    if (!bX[tZ(0xce0)]) continue;
                    let bY = a8[tZ(0x222)](tZ(0x3b8) + bX[tZ(0xce0)] + '\x22]');
                    bY && (bX[tZ(0x35e)] && (bY[tZ(0x35e)] = bX[tZ(0x35e)]), bX[tZ(0x1713)] && (bY[tZ(0xf5a)](), bY[tZ(0x8f7)](bX['at'], bX['at'])));
                }
            };
        $[tC(0x146d)] = bx, $[tC(0x14f3)] = () => rs(), $[tC(0x362)] || $[tC(0x14f8)]();
        let bz = window[tC(0x11ac)](() => {
            const u7 = tC;
            !$[u7(0x362)] && !a8[u7(0x6ad)] && $[u7(0x14f8)]();
        }, 0x1388);
        $[tC(0xbca)] = bU => aI({
            'net': bU
        }), bx();
        let bA = Ff();
        bA && history[tC(0x34a)](null, '', '/');
        let bB = bA ?? $[tC(0x852)];
        $[tC(0x362)] ? aN(tC(0xab0)) : bB && (aN(tC(0xab0)), Bf(bB)[tC(0x1101)](bU => {
            const u8 = tC;
            if (!bU) {
                $[u8(0x15f1)](u8(0x101d));
                return;
            }
            $[u8(0x109b)](bB, u8(0xd19));
        }));
        let bC = () => mi({
                'head': Y,
                'list': a7,
                'campaign': K,
                'closeButton': aL(() => aN(tC(0xaa9))),
                'tab': () => X,
                'onTab': bU => {
                    X = bU;
                }
            }),
            bD = Lm(aA),
            bE = bU => {
                aI({
                    'id': bU['id'],
                    'difficulty': aD
                });
            };
        aB[tC(0x6ad)] = !0x1, aB[tC(0x1338)] = '', aB[tC(0xa20)](w(tC(0x12a0), tC(0x1363), tC(0xf72)));
        let bF = q[tC(0xe37)](bU => K[tC(0xc70)][bU['id']])[tC(0x1e8)],
            bG = q[tC(0x707)]((bU, bV) => bU + oe(K[tC(0xc70)][bV['id']]), 0x0);
        aB[tC(0xa20)](w(tC(0x12a0), tC(0x440), tC(0x240) + bF + '/' + q[tC(0x1e8)] + tC(0x13c8) + bG)), aB[tC(0xa20)](aL(() => aN(tC(0xaa9))));
        let bH = bU => aF[tC(0x2fc)](bV => bV[tC(0x13cd)]['id'] === bU) && (aE[tC(0x598)][tC(0x30a)](bU)?.[tC(0x1672)] ?? 0x0) === 0x0,
            bI = Py() ?? aF[0x0]?.[tC(0x13cd)]['id'] ?? '';
        bH(bI) || (bI = aF[tC(0x1f6)](bU => bH(bU[tC(0x13cd)]['id']))?.[tC(0x13cd)]['id'] ?? '');
        let bJ = () => {
                const u9 = tC;
                for (let bU of ax[u9(0x1585)]) bU[u9(0x13c1)][u9(0x33b)]('on', bU[u9(0x11f0)][u9(0x58b)] === bI);
            },
            bK = () => {
                const uj = tC;
                let bU = aF[uj(0x1f6)](bX => bX[uj(0x13cd)]['id'] === bI);
                if (az[uj(0x1338)] = '', !bU) return;
                let bV = aE[uj(0x598)][uj(0x30a)](bU[uj(0x13cd)]['id'])?.[uj(0x1672)] ?? 0x0;
                for (let bX of bU[uj(0x8aa)]) {
                    let bY = aE[uj(0x607)][uj(0x530)](bX['id']),
                        bZ = K[uj(0xc70)][bX['id']],
                        c7 = w(uj(0x14ab), bY ? uj(0x16b4) : uj(0xaef));
                    c7[uj(0xb42)] = uj(0x14ab), bY || c7[uj(0x118c)](uj(0x113d), uj(0xa1c)), c7[uj(0x11f0)]['id'] = bX['id'];
                    let c8 = bU[uj(0x8aa)][uj(0x6ed)](bX) + 0x1;
                    c7[uj(0xa20)](w(uj(0x12a0), uj(0x11ad), String(c8)[uj(0x170a)](0x2, '0')));
                    let c9 = w(uj(0x12a0), uj(0x6fe));
                    c9[uj(0xa20)](w(uj(0x12a0), uj(0x14c9), bX[uj(0xf4e)][uj(0x10cf)]()));
                    let cj = Ny(bX);
                    cj && c9[uj(0xa20)](w(uj(0x12a0), uj(0x92b), cj)), c7[uj(0xa20)](c9);
                    let ck = w(uj(0x12a0), uj(0x243));
                    bY ? ck[uj(0xa20)](Oy(oe(bZ))) : ck[uj(0xa20)](w('i', uj(0xac5))), c7[uj(0xa20)](ck), c7[uj(0x67d)](uj(0x1398), () => {
                        const uk = uj;
                        bY ? bE(bX) : CW(c7, bV > 0x0 ? bV + uk(0xe1d) : uk(0x174c));
                    }), az[uj(0xa20)](c7);
                }
            },
            bL = bU => {
                const uq = tC;
                let bV = w('i', uq(0x1051));
                return bV[uq(0x3a7)][uq(0x70f)] = uq(0x58e) + bU + ')', bV;
            },
            bM = bU => {
                const uw = tC;
                let bV = Ao[bU['id']];
                if (!bV) return;
                let bX = RW('', uw(0x6c3), () => {
                    const ux = uw;
                    ZT(ux(0x132c), {
                        'source': bV,
                        'zone': bU['id']
                    }), Lo(bV, K, q, {
                        'zone': bU['id']
                    });
                });
                bX[uw(0x11f0)][uw(0x50b)] = bU['id'], bX[uw(0x1338)] = '', bX[uw(0xa20)](bL(bU['id']));
                let bY = w(uw(0x12a0), uw(0x7d3));
                bY[uw(0xa20)](w(uw(0x12a0), uw(0x419), bU[uw(0xf4e)][uw(0x10cf)]())), bX[uw(0xa20)](bY), bX[uw(0xa20)](w('i', uw(0x1063))), ax[uw(0xa20)](bX);
            };
        ax[tC(0x1338)] = '';
        for (let bU of $t) {
            let bV = aF[tC(0x1f6)](cj => cj[tC(0x13cd)]['id'] === bU['id']);
            if (!bV) {
                bU[tC(0x50b)] && bM(bU);
                continue;
            }
            let bX = bV[tC(0x8aa)][tC(0xe37)](cj => K[tC(0xc70)][cj['id']])[tC(0x1e8)],
                bY = aE[tC(0x598)][tC(0x30a)](bV[tC(0x13cd)]['id'])?.[tC(0x1672)] ?? 0x0,
                bZ = bY > 0x0,
                c7 = RW('', tC(0x881) + (bZ ? tC(0xc20) : ''), () => {
                    const uz = tC;
                    bI = bV[uz(0x13cd)]['id'], bZ || Ly(bI), bJ(), bK();
                });
            c7[tC(0x11f0)][tC(0x58b)] = bV[tC(0x13cd)]['id'], c7[tC(0x1338)] = '', c7[tC(0xa20)](bL(bV[tC(0x13cd)]['id']));
            let c8 = w(tC(0x12a0), tC(0x7d3));
            c8[tC(0xa20)](w(tC(0x12a0), tC(0x419), bV[tC(0x13cd)][tC(0xf4e)][tC(0x10cf)]()));
            let c9 = w(tC(0x12a0), tC(0x32a));
            bZ ? c9[tC(0xa20)](w(tC(0x12a0), tC(0xe98), aE[tC(0x160c)] + tC(0x9f6) + bY + tC(0x9fe))) : (c9[tC(0xa20)](w(tC(0x12a0), tC(0xe98), bV[tC(0x8aa)][tC(0x1e8)] + tC(0x168d) + (bV[tC(0x8aa)][tC(0x1e8)] === 0x1 ? '' : 'S'))), c9[tC(0xa20)](w(tC(0x12a0), tC(0xb0c), bX + '/' + bV[tC(0x8aa)][tC(0x1e8)]))), c8[tC(0xa20)](c9), c7[tC(0xa20)](c8), ax[tC(0xa20)](c7);
        }
        let bN = !0x1;
        aM = () => {
            const uA = tC;
            if (!bN) {
                bN = !0x0;
                for (let cj of hd()) {
                    let ck = Ao[cj['id']];
                    ck && ZT(uA(0xd90), {
                        'source': ck,
                        'zone': cj['id']
                    });
                }
            }
        }, document[tC(0x10d5)](tC(0x906))[tC(0x1338)] = '', bJ(), bK();
        let bO = Wm(N),
            bP = w(tC(0x14ab), tC(0xebe));
        bP[tC(0xb42)] = tC(0x14ab), bP[tC(0xf90)] = tC(0x4d2), bP[tC(0x118c)](tC(0x147e), tC(0x4d2)), bP[tC(0x67d)](tC(0x1398), () => Vo()), N[tC(0xa20)](bP);
        let bQ = Pm(N, K, q);
        L && aN(L), N[tC(0x6ad)] = !0x1, requestAnimationFrame(() => N[tC(0x13c1)][tC(0x851)]('in')), window[tC(0xb84)](() => MW(0x0), 0x154), aN(L ?? ($[tC(0x362)] || bB ? tC(0xab0) : tC(0xaa9)));
        let bR = cj => {
            const uB = tC;
            if (!aH && !xu()) {
                if (cj[uB(0x9f3)] === 'm' || cj[uB(0x9f3)] === 'M') {
                    ea();
                    return;
                }
                cj[uB(0x9f3)] === uB(0x7f2) && N[uB(0x13c1)][uB(0x11e2)](uB(0xa4c)) && aN(uB(0xaa9));
            }
        };
        document[tC(0x67d)](tC(0x6f1), bR);
        let bS = cj => {
            const uC = tC;
            if (aH || !N[uC(0x13c1)][uC(0x11e2)](uC(0xa4c))) return;
            let ck = cj[uC(0x13eb)];
            ck && (ck[uC(0x915)](uC(0xd18)) || aN(uC(0xaa9)));
        };
        U[tC(0x67d)](tC(0x822), bS);
    });
}
var Dy = 0x3;

function Fy(c, d) {
    const uD = cX;
    return bW["filter"](g => g["ready"] && g["category"] !== "squad" && !$e(c, g['id']))["map"](g => ({
        'id': g['id'],
        'name': g["name"],
        'price': ZW(g['id'])
    }))["filter"](g => g["price"] <= d)["sort"]((g, i) => g["price"] - i["price"])["slice"](0x0, Dy);
}

function Zf({
    ctx: c,
    campaign: d,
    done: g,
    actions: j
}) {
    const uE = cX;
    let m = w("div", "dsp-shop"),
        p = w('p', "dsp-balance");
    p["append"](eT(xn(), 0x2, "dsp-coin"), w("span", '', c["bonds"] + " War Bonds, unspent")), m["appendChild"](p);
    let q = w("div", "dsp-shelf");
    for (let u of Fy(d, c["bonds"])) {
        let v = w("div", "dsp-good"),
            y = Ke(u['id']),
            A = w("div", "dsp-good-stand");
        y && A["appendChild"](eT(y, 0x2, "dsp-good-art")), v["appendChild"](A), v["appendChild"](w("span", "dsp-good-name", u["name"])), q["appendChild"](v);
    }
    return m["appendChild"](q), j["append"](IT("The Armoury", "dsp-go primary", () => g("armoury", "went")), IT("Get on with it", "dsp-go dark", () => g("continue", "skipped"))), m["classList"]["add"]("dsp-centred"), j["classList"]["add"]("dsp-centred-row"), m;
}
var Za = 0x5;

function kn({
    label: c,
    prompt: d,
    onChange: g
}) {
    const uF = cX;
    let j = 0x0,
        m = 0x0,
        p = w("div", "dsp-stars");
    p["setAttribute"]("role", "radiogroup"), p["setAttribute"]("aria-label", c);
    let q = [],
        u = w('p', "dsp-hint", d),
        v = () => {
            const uG = uF;
            let y = m || j;
            q[uG(0x123b)]((A, C) => {
                const uH = uG;
                A[uH(0xd94)][uH(0x13c1)][uH(0x33b)]('on', C < y), A[uH(0x118c)](uH(0xa18), String(C + 0x1 === j));
            }), p[uG(0x13c1)][uG(0x33b)](uG(0x1365), j > 0x0), u[uG(0x1338)] = j ? j + uG(0xda5) + Za : d;
        };
    for (let y = 0x1; y <= Za; y++) {
        let A = w("button", "dsp-star");
        A["type"] = "button", A["setAttribute"]("role", "radio"), A["setAttribute"]("aria-label", y + " out of " + Za), A["appendChild"](w('i', "fx-star")), A["onclick"] = () => {
            j = y, v(), g?.(j);
        }, A["onpointerenter"] = () => {
            m = y, v();
        }, A["onfocus"] = () => {
            m = y, v();
        }, A["onblur"] = () => {
            m = 0x0, v();
        }, q["push"](A), p["appendChild"](A);
    }
    return p["onpointerleave"] = () => {
        m = 0x0, v();
    }, v(), {
        'row': p,
        'hint': u,
        'value': () => j,
        'disable': () => {
            const uI = uF;
            q[uI(0x123b)](C => {
                const uJ = uI;
                C[uJ(0x766)] = !0x0;
            });
        }
    };
}
var By = "What would make it better?";

function Qf({
    ctx: c,
    campaign: d,
    levels: g,
    done: j,
    actions: m
}) {
    const uK = cX;
    let p = w("div", "dsp-review"),
        q = kn({
            'label': "Out of five",
            'prompt': "Pick a star.",
            'onChange': C => {
                const uL = uK;
                A[uL(0x766)] = C === 0x0;
            }
        });
    p["append"](q["row"], q["hint"]);
    let u = w("label", "dsp-plain dsp-question", By),
        v = w("textarea", "dsp-box");
    v["rows"] = 0x3, v["maxLength"] = 0x7d0, v["placeholder"] = "Optional.", u["htmlFor"] = v['id'] = "dsp-comment", p["append"](u, v);
    let y = w('p', "dsp-note");
    p["appendChild"](y);
    let A = IT("Send", "dsp-go primary", () => {
        const uM = uK;
        let C = q[uM(0x35e)]();
        C !== 0x0 && (A[uM(0x766)] = !0x0, y[uM(0x1338)] = uM(0x48f), rt({
            'kind': uM(0x100a),
            'stars': C,
            'comment': v[uM(0x35e)]
        }, {
            ...Ro(d, g),
            'stars': C
        })[uM(0x1101)](E => {
            const uN = uM;
            if (E) {
                j(uN(0x129c), uN(0x14e7) + C);
                return;
            }
            A[uN(0x766)] = !0x1, y[uN(0x1338)] = uN(0x171a);
        }));
    });
    return A["disabled"] = !0x0, m["append"](A, IT("Not now", "dsp-go dark", () => {
        const uO = uK;
        hW(uO(0x922), {
            'stars': q[uO(0x35e)]() || null
        }), j(uO(0x129c), uO(0xbeb));
    })), jo() || (y["textContent"] = "The line is down, so this would not reach anybody. No harm done.", A["disabled"] = !0x0, q["disable"]()), p;
}
var Hy = {
    'armoury': Zf,
    'review': Qf,
    'offer': ({
        campaign: c,
        levels: d,
        done: g,
        actions: i,
        source: j,
        lead: l
    }) => ga({
        'campaign': c,
        'levels': d,
        'actions': i,
        'source': j,
        'lead': l,
        'done': m => g("continue", m)
    })
};

function T0(c, d) {
    const uP = cX;
    let {
        ctx: g,
        campaign: j,
        levels: l,
        roll: m = Math["random"](),
        source: p = "dispatch",
        lead: q,
        raised: u
    } = d, v = "continue";
    return Po({
        'line': Io(c, m),
        'raised': u,
        'build': (y, A) => Hy[c]({
            'ctx': g,
            'campaign': j,
            'levels': l,
            'actions': y,
            'source': p,
            'lead': q,
            'done': (C, E) => {
                v = C, A(E);
            }
        })
    })["then"](y => ({
        'outcome': v,
        'answer': y
    }));
}
var iI = f["timing"]["dispatchFade"],
    W0 = !0x1,
    e0 = !0x1;

function t0(c = !0x0) {
    e0 = c;
}

function Gy(c) {
    const uQ = cX;
    let d = bW["filter"](g => g["ready"] && g["category"] !== "squad" && !$e(c, g['id']))["map"](g => ZW(g['id']));
    return d["length"] ? Math["min"](...d) : null;
}
async function Vy(c, d = na, g = Date["now"]()) {
    const uR = cX;
    let i = it();
    return {
        'now': g,
        'missionsCleared': Object["values"](c["records"])["filter"](j => j["clears"]["length"] > 0x0)["length"],
        'playSeconds': i["playSeconds"],
        'missionsCompleted': i["missionsCompleted"],
        'bonds': c["bonds"],
        'cheapestUnowned': Gy(c),
        'declinedAt': Em(),
        'state': await d["load"](),
        'shownThisSession': W0
    };
}
async function n0(c, d, g = na) {
    const uS = cX;
    if (e0) return "continue";
    try {
        let j = await Vy(c, g),
            l = im(j);
        if (!l) return "continue";
        W0 = !0x0, await rm(g, l, j);
        let {
            outcome: m,
            answer: p
        } = await T0(l, {
            'ctx': j,
            'campaign': c,
            'levels': d
        });
        return p !== "skipped" ? await am(g, l, p) : await sm(g, l, j), m;
    } catch {
        return "continue";
    }
}
var fi = class {
        ['x'] = 0x0;
        ['y'] = 0x0;
        ["zoom"] = f["camera"]["zoom"]["start"];
        ["viewW"] = 0x0;
        ["viewH"] = 0x0;
        ["shakeAmount"] = 0x0;
        ["shakeX"] = 0x0;
        ["shakeY"] = 0x0;
        ["shakeSeed"] = 0x9e3779b9;
        ["manualUntil"] = 0x0;
        ["time"] = 0x0;
        ["resize"](c, d) {
            const uU = cX;
            this["viewW"] = c / this["zoom"], this["viewH"] = d / this["zoom"];
        } ["centreOn"](c, d) {
            const uV = cX;
            this['x'] = c['x'] - this["viewW"] / 0x2, this['y'] = c['y'] - this["viewH"] / 0x2, this["clamp"](d);
        } ["lookAt"](c, d) {
            const uX = cX;
            this["centreOn"](c, d), this["manualUntil"] = 0x1 / 0x0;
        } ["release"]() {
            const uY = cX;
            this["manualUntil"] = this["time"];
        }
        get["isManual"]() {
            const uZ = cX;
            return this["time"] < this["manualUntil"];
        } ["pan"](c, d, g, i = "sticky") {
            const v7 = cX;
            c === 0x0 && d === 0x0 || (this['x'] += c, this['y'] += d, this["manualUntil"] = i === "sticky" ? 0x1 / 0x0 : this["time"] + f["camera"]["touchHold"], this["clamp"](g));
        } ["update"](c, d, g) {
            const v8 = cX;
            if (this["time"] += c, d && this["time"] >= this["manualUntil"]) {
                let j = d['x'] - this["viewW"] / 0x2,
                    m = d['y'] - this["viewH"] / 0x2,
                    p = j - this['x'],
                    q = m - this['y'],
                    u = Math["hypot"](p, q);
                if (u > f["camera"]["deadzone"]) {
                    let v = 0x1 - Math["exp"](-f["camera"]["follow"] * c),
                        y = (u - f["camera"]["deadzone"]) / u;
                    this['x'] += p * y * v, this['y'] += q * y * v;
                }
            }
            this["shakeAmount"] > 0.05 ? (this["shakeAmount"] *= Math["exp"](-0x9 * c), this["shakeX"] = (this["jolt"]() * 0x2 - 0x1) * this["shakeAmount"], this["shakeY"] = (this["jolt"]() * 0x2 - 0x1) * this["shakeAmount"]) : (this["shakeAmount"] = 0x0, this["shakeX"] = 0x0, this["shakeY"] = 0x0), this["clamp"](g);
        } ["jolt"]() {
            const v9 = cX;
            let c = this["shakeSeed"];
            return c ^= c << 0xd, c >>>= 0x0, c ^= c >> 0x11, c ^= c << 0x5, c >>>= 0x0, this["shakeSeed"] = c, c / 0x100000000;
        } ["addShake"](c) {
            const vj = cX;
            this["shakeAmount"] = Math["min"](0xc, this["shakeAmount"] + c);
        } ["clamp"](c) {
            const vk = cX;
            this['x'] = c["pixelWidth"] <= this["viewW"] ? (c["pixelWidth"] - this["viewW"]) / 0x2 : Math["max"](0x0, Math["min"](c["pixelWidth"] - this["viewW"], this['x'])), this['y'] = c["pixelHeight"] <= this["viewH"] ? (c["pixelHeight"] - this["viewH"]) / 0x2 : Math["max"](0x0, Math["min"](c["pixelHeight"] - this["viewH"], this['y']));
        } ["pin"]() {
            const vq = cX;
            this['x'] = Math["round"](this['x']), this['y'] = Math["round"](this['y']), this["manualUntil"] = 0x1 / 0x0, this["shakeAmount"] = 0x0, this["shakeX"] = 0x0, this["shakeY"] = 0x0;
        }
        get["offsetX"]() {
            const vs = cX;
            return Math["round"]((this['x'] + this["shakeX"]) * this["zoom"]) / this["zoom"];
        }
        get["offsetY"]() {
            const vw = cX;
            return Math["round"]((this['y'] + this["shakeY"]) * this["zoom"]) / this["zoom"];
        } ["screenToWorld"](c, d) {
            const vx = cX;
            return {
                'x': c / this["zoom"] + this["offsetX"],
                'y': d / this["zoom"] + this["offsetY"]
            };
        }
    },
    hi = {
        'x': 0x1,
        'y': 0x1
    },
    o0 = {
        'A': "....##..../....##..../...####.../...#..#.../..##..##../..##..##../..######../.##....##./.##....##./##......##/##......##/##......##/###....###",
        'B': "########../.##....##./.##.....##/.##.....##/.##....##./.#######../.##....##./.##.....##/.##.....##/.##.....##/.##....##./.##...##../########..",
        'C': "..######../.##....##./##......##/##......../##......../##......../##......../##......../##......../##......##/##......##/.##....##./..######..",
        'D': "########../.##....##./.##.....##/.##.....##/.##......#/.##......#/.##......#/.##......#/.##......#/.##.....##/.##.....##/.##....##./########..",
        'E': "##########/.##.....#./.##......./.##......./.##......./.#######../.#######../.##......./.##......./.##......./.##.....#./.##.....#./##########",
        'F': "##########/.##.....#./.##......./.##......./.##......./.#######../.#######../.##......./.##......./.##......./.##......./.##......./####......",
        'G': "..######../.##....##./##......##/##......../##......../##...#####/##...#####/##......##/##......##/##......##/##......##/.##....##./..######..",
        'H': "###....###/.##....##./.##....##./.##....##./.##....##./.##....##./.########./.########./.##....##./.##....##./.##....##./.##....##./###....###",
        'I': "..######../....##..../....##..../....##..../....##..../....##..../....##..../....##..../....##..../....##..../....##..../....##..../..######..",
        'J': "....######/......##../......##../......##../......##../......##../......##../......##../......##../##....##../##....##../.##..##.../..####....",
        'K': "###...####/.##...##../.##..##.../.##.##..../.####...../.###....../.####...../.##.##..../.##..##.../.##...##../.##...##../.##....##./###...####",
        'L': "####....../.##......./.##......./.##......./.##......./.##......./.##......./.##......./.##......./.##......./.##......./.##.....#./##########",
        'M': "###....###/####..####/####..####/##.####.##/##.####.##/##..##..##/##..##..##/##......##/##......##/##......##/##......##/##......##/###....###",
        'N': "###....###/###.....##/####....##/####....##/##.##...##/##.##...##/##..##..##/##..##..##/##...##.##/##...##.##/##....####/##....####/###....###",
        'O': "..######../.##....##./##......##/##......##/##......##/##......##/##......##/##......##/##......##/##......##/##......##/.##....##./..######..",
        'P': "########../.##....##./.##.....##/.##.....##/.##.....##/.##....##./########../.##......./.##......./.##......./.##......./.##......./####......",
        'Q': "..######../.##....##./##......##/##......##/##......##/##......##/##......##/##......##/##......##/##......##/##...##.##/.##...###./..#####.##",
        'R': "########../.##....##./.##.....##/.##.....##/.##....##./########../.##.##..../.##..##.../.##..##.../.##...##../.##...##../.##....##./###....###",
        'S': "..######../.##....##./##......##/##......../.##......./..####..../.....###../.......##./........##/##......##/##......##/.##....##./..######..",
        'T': "##########/#...##...#/....##..../....##..../....##..../....##..../....##..../....##..../....##..../....##..../....##..../....##..../..######..",
        'U': "###....###/.##....##./.##....##./.##....##./.##....##./.##....##./.##....##./.##....##./.##....##./.##....##./.##....##./..##..##../...####...",
        'V': "###....###/.##....##./.##....##./.##....##./..##..##../..##..##../..##..##../...####.../...####.../...####.../....##..../....##..../....##....",
        'W': "###....###/##......##/##......##/##......##/##..##..##/##..##..##/##..##..##/##.####.##/##.####.##/####..####/####..####/.##....##./.##....##.",
        'X': "###....###/.##....##./..##..##../..##..##../...####.../....##..../....##..../...####.../..##..##../..##..##../.##....##./.##....##./###....###",
        'Y': "###....###/.##....##./..##..##../...####.../....##..../....##..../....##..../....##..../....##..../....##..../....##..../....##..../..######..",
        'Z': "##########/#.....##.#/.....##.../....##..../....##..../...##...../...##...../..##....../..##....../.##......./.##......./#.##.....#/##########",
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
    qy = 0x11 + hi['y'],
    Uy = c => Math["max"](0x0, c["length"] * 0xc - 0x2) + 0x4 + hi['x'] + 0x1,
    i0 = new Map();

function gi(g, j = {}) {
    const vz = cX;
    let {
        fill: q = "#f2ead6",
        outline: v = "#12180c",
        shadow: y = "#12180c"
    } = j, A = g + '|' + q + '|' + v + '|' + y, C = i0["get"](A);
    if (C) return C;
    let E = [...g["toUpperCase"]()],
        F = document["createElement"]("canvas");
    F["width"] = Uy(g), F["height"] = qy;
    let H = F["getContext"]('2d');
    H["imageSmoothingEnabled"] = !0x1;
    let I = [],
        K = new Set();
    if (E["forEach"]((L, M) => {
            const vA = vz;
            let N = (o0[L] ?? o0['\x20'])[vA(0xf4c)]('/'),
                P = 0x2 + M * 0xc;
            for (let Q = 0x0; Q < 0xd; Q++) {
                let R = N[Q] ?? '';
                for (let S = 0x0; S < 0xa; S++)
                    if (R[S] === '#')
                        for (let U = 0x0; U <= 0x1; U++) {
                            let V = P + S + U,
                                X = V * 0x1000 + 0x2 + Q;
                            K[vA(0x530)](X) || (K[vA(0x851)](X), I[vA(0xc0f)]([V, 0x2 + Q]));
                        }
            }
        }), y) {
        H["fillStyle"] = y;
        for (let [L, M] of I) H["fillRect"](L + hi['x'], M + hi['y'], 0x1, 0x1);
    }
    if (v) {
        H["fillStyle"] = v;
        for (let [N, P] of I)
            for (let Q = -0x1; Q <= 0x1; Q++)
                for (let R = -0x1; R <= 0x1; R++) H["fillRect"](N + R, P + Q, 0x1, 0x1);
    }
    H["fillStyle"] = q;
    for (let [S, U] of I) H["fillRect"](S, U, 0x1, 0x1);
    return i0["set"](A, F), F;
}
var Qa = 0x6;

function $y(j, q, y, A) {
    const vB = cX;
    let C = Math["floor"](j / y),
        E = Math["floor"](q / y),
        F = 0x1 / 0x0,
        H = 0x0,
        I = 0x0,
        K = 0x0;
    for (let M = -0x1; M <= 0x1; M++)
        for (let N = -0x1; N <= 0x1; N++) {
            let P = xT(C + N, E + M),
                Q = (C + N + (P & 0xff) / 0xff * 0.86 + 0.07) * y,
                R = (E + M + (P >> 0x8 & 0xff) / 0xff * 0.86 + 0.07) * y,
                S = j - Q,
                U = q - R,
                V = S * S + U * U;
            V < F && (F = V, H = S, I = U, K = (P >> 0x10 & 0xff) / 0xff * 0x2 - 0x1);
        }
    let L = Math["sqrt"](F);
    A["dist"] = L, A['nx'] = L > 0.001 ? H / L : 0x0, A['ny'] = L > 0.001 ? I / L : 0x0, A["tint"] = K;
}
var r0 = 0x5,
    s0 = 0x6;

function a0(K, L) {
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
    } = L, aq = !0x1;
    for (let aY = 0x0; aY < U["length"]; aY++)
        if (U[aY] < 0x0 || Y[aY] < 0x0 || aj[aY] < 0x0 || ak[aY] < 0x0) {
            aq = !0x0;
            break;
        } if (!aq) return {
        'layer': null,
        'shadow': null,
        'understorey': null
    };
    let aw = K["tile"],
        ax = K["pixelWidth"],
        az = K["pixelHeight"],
        aA = D1(K["theme"]),
        aB = document["createElement"]("canvas");
    aB["width"] = ax, aB["height"] = az;
    let aC = aB["getContext"]('2d'),
        aD = aC["createImageData"](ax, az),
        aE = new Uint32Array(aD["data"]["buffer"]),
        aF = document["createElement"]("canvas");
    aF["width"] = ax, aF["height"] = az;
    let aG = aF["getContext"]('2d'),
        aH = aG["createImageData"](ax, az),
        aI = new Uint32Array(aH["data"]["buffer"]),
        aJ = aA["shadow"] & 0xffffff | 0x88 << 0x18,
        aK = new KT(a9, ax, az, aw, 0.3, 0x2),
        aL = new KT(a9, ax, az, aw, 0.33, 0x2),
        aM = new KT(a9, ax, az, aw, 1.9, 0x2),
        aN = new KT(a9, ax, az, aw, 0.085, 0x3),
        aO = new KT(a9, ax, az, aw, 1.3, 0x2),
        aP = new KT(a9, ax, az, aw, 1.4, 0x2),
        aQ = new KT(a9, ax, az, aw, 3.4, 0x2),
        aR = {
            'dist': 0x0,
            'nx': 0x0,
            'ny': 0x0,
            'tint': 0x0
        },
        aS = aA["canopy"]["length"] - 0x1,
        aU = (aZ, b4, b7) => {
            let b8 = aZ + (aO['at'](aZ, b4) - 0.5) * 4.5 + (aQ['at'](aZ, b4) - 0.5) * 0x3,
                b9 = b4 + (aP['at'](aZ, b4) - 0.5) * 4.5 + (aQ['at'](aZ + 0x1d, b4 + 0x53) - 0.5) * 0x3;
            $y(b8, b9, b7, aR);
        },
        aV = (aZ, b4) => {
            let b7 = aZ + (aK['at'](aZ, b4) - 0.5) * 0xb + (aM['at'](aZ, b4) - 0.5) * 0x5,
                b8 = b4 + (aL['at'](aZ, b4) - 0.5) * 0xb + (aM['at'](aZ + 0x35, b4 + 0x11) - 0.5) * 0x5;
            return wW(U, a7, a8, aw, b7, b8);
        };
    for (let aZ = 0x0; aZ < az; aZ++)
        for (let b4 = 0x0; b4 < ax; b4++) {
            let b7 = aV(b4, aZ);
            if (b7 > 0.34) continue;
            aU(b4, aZ, Qa);
            let b8 = -b7,
                b9 = 0x1 - aR["dist"] / (Qa * 0.85);
            if (b8 < 0.5 && b9 < 0.3 - b8 * 0.7) continue;
            let bj = aZ * ax + b4,
                bk = -(aR['nx'] * 0.62 + aR['ny'] * 0.78),
                bq = aS * (0.3 + (aN['at'](b4, aZ) - 0.5) * 0.72) + bk * 2.6 + b9 * 2.4 + aR["tint"] * 0.5;
            b9 > 0.72 && bk > 0.35 && (bq += 1.4), b8 < 0x1 && (bq -= (0x1 - b8) * 1.35), aE[bj] = iW(aA["canopy"], bq, b4, aZ), aR["dist"] > Qa * 0.8 && (aE[bj] = Bt(aE[bj], aA["canopy"][0x1], 0.7));
        }
    l0(aE, ax, az, aw, L, Y, Ky, aA, aU, aR, aK, aL, aM, aN);
    let aX = Yy(ax, az, aw, L, aA, aU, aR, aK, aL, aM, aN);
    Xy(aE, aI, ax, az, aw, L, Fl(K["theme"]), aU, aR, aK, aL, aM, aN);
    for (let bw = 0x0; bw < az; bw++)
        for (let bx = 0x0; bx < ax; bx++) {
            let bz = bx - r0,
                bA = bw - s0;
            bz < 0x0 || bA < 0x0 || aV(bz, bA) > -0.12 || (aI[bw * ax + bx] = aJ);
        }
    return aC["putImageData"](aD, 0x0, 0x0), aG["putImageData"](aH, 0x0, 0x0), {
        'layer': aB,
        'shadow': aF,
        'understorey': aX
    };
}
var Ky = {
        'tuft': 0x4,
        'open': 0.34,
        'hemOpen': 0.3,
        'base': 0.4,
        'blade': 1.6
    },
    zy = {
        'tuft': 0x5,
        'open': 0.1,
        'hemOpen': 0.28,
        'base': 0.5,
        'blade': 1.6,
        'strands': !0x0
    };

function l0(K, L, U, Y, a7, a8, a9, aj, ak, aq, aw, ax, az, aA) {
    const vD = cX;
    let {
        width: aB,
        height: aC
    } = a7, aD = !0x1;
    for (let aG = 0x0; aG < a8["length"]; aG++)
        if (a8[aG] < 0x0) {
            aD = !0x0;
            break;
        } if (!aD) return !0x1;
    let aE = aj["canopy"]["length"] - 0x1,
        aF = a9["tuft"];
    for (let aH = 0x0; aH < U; aH++)
        for (let aI = 0x0; aI < L; aI++) {
            let aJ = aI + (aw['at'](aI, aH) - 0.5) * 0x9 + (az['at'](aI, aH) - 0.5) * 0x6,
                aK = aH + (ax['at'](aI, aH) - 0.5) * 0x9 + (az['at'](aI + 0xb, aH + 0x43) - 0.5) * 0x6,
                aL = wW(a8, aB, aC, Y, aJ, aK);
            if (aL > 0.2) continue;
            let aM = -aL;
            if (a9["strands"]) {
                ak(aI, aH, aF);
                let aQ = aq["dist"],
                    aR = (aq["tint"] + 0x1) * 0x7fff | 0x0,
                    aS = 0x3 + (aR & 0x3) * 0.5;
                if (aQ > aS) continue;
                if (aQ < 0.75) {
                    K[aH * L + aI] = iW(aj["canopy"], aE * a9["base"] - 1.6, aI, aH);
                    continue;
                }
                let aU = 0x4 + (aR >> 0x2 & 0x1),
                    aV = 1.7 + (aR >> 0x3 & 0x3) * 0.25,
                    aX = (aR >> 0x5 & 0x7) / 0x7 * 0.6 - 0.3,
                    aY = Math["atan2"](aq['ny'], aq['nx']),
                    aZ = -Math['PI'] / 0x2 - aV / 0x2 + aX,
                    b4 = !0x1;
                for (let b9 = 0x0; b9 < aU && !b4; b9++) {
                    let bj = aZ + aV * b9 / (aU - 0x1);
                    b4 = Math["abs"](aQ * Math["sin"](aY - bj)) < 0.65;
                }
                if (!b4) continue;
                let b7 = (aA['at'](aI, aH) - 0.5) * 1.2,
                    b8 = aE * a9["base"] + aQ / aS * a9["blade"] + b7;
                aM < 0.8 && (b8 -= (0.8 - aM) * 0.9), K[aH * L + aI] = iW(aj["canopy"], b8, aI, aH);
                continue;
            }
            ak(aI, aH, aF);
            let aN = 0x1 - aq["dist"] / (aF * 0.9);
            if (aN < a9["open"] + (aM < 0.4 ? a9["hemOpen"] : 0x0)) continue;
            let aO = -(aq['nx'] * 0.5 + aq['ny'] * 0.86),
                aP = aE * (a9["base"] + (aA['at'](aI, aH) - 0.5) * 0.8) + aO * 1.5 + aN * a9["blade"] + aq["tint"] * 0.45;
            aM < 0.8 && (aP -= (0.8 - aM) * 0.9), K[aH * L + aI] = iW(aj["canopy"], aP, aI, aH);
        }
    return !0x0;
}

function Yy(g, j, p, q, v, y, A, C, E, F, H) {
    const vE = cX;
    let I = document["createElement"]("canvas");
    I["width"] = g, I["height"] = j;
    let K = I["getContext"]('2d'),
        L = K["createImageData"](g, j),
        M = new Uint32Array(L["data"]["buffer"]);
    return l0(M, g, j, p, q, q["longSdf"], zy, v, y, A, C, E, F, H) ? (K["putImageData"](L, 0x0, 0x0), I) : (I["width"] = 0x0, I["height"] = 0x0, null);
}

function Xy(q, H, K, L, P, Q, U, V, Y, a7, a8, a9, aj) {
    const vF = cX;
    let {
        stoneSdf: ak,
        width: aq,
        height: aw
    } = Q, ax = !0x1;
    for (let aD = 0x0; aD < ak["length"]; aD++)
        if (ak[aD] < 0x0) {
            ax = !0x0;
            break;
        } if (!ax) return;
    let az = U["face"]["length"] - 0x1,
        aA = 0x9,
        aB = U["shadow"] & 0xffffff | 0x99 << 0x18,
        aC = (aE, aF) => {
            let aG = aE + (a7['at'](aE, aF) - 0.5) * 0xa + (a9['at'](aE, aF) - 0.5) * 0x6,
                aH = aF + (a8['at'](aE, aF) - 0.5) * 0xa + (a9['at'](aE + 0x61, aF + 0x29) - 0.5) * 0x6;
            return wW(ak, aq, aw, P, aG, aH);
        };
    for (let aE = 0x0; aE < L; aE++)
        for (let aF = 0x0; aF < K; aF++) {
            let aG = aC(aF, aE);
            if (aG > 0.3) continue;
            V(aF, aE, aA);
            let aH = -aG,
                aI = 0x1 - Y["dist"] / (aA * 0.86);
            if (aH < 0.45 && aI < 0.36 - aH * 0.7) continue;
            let aJ = aE * K + aF,
                aK = -(Y['nx'] * 0.55 + Y['ny'] * 0.78),
                aL = aK > 0.42 ? 1.9 : aK > -0.1 ? 0.5 : -1.4,
                aM = az * (0.42 + (aj['at'](aF, aE) - 0.5) * 0.5) + aL + aI * 1.1 + Y["tint"] * 0.7;
            aH < 0.9 && (aM -= (0.9 - aH) * 1.6), q[aJ] = iW(U["face"], aM, aF, aE), Y['ny'] > 0.72 && Y["dist"] > aA * 0.5 ? q[aJ] = U["shadow"] : Y['ny'] < -0.5 && Y['nx'] < 0.3 && aI > 0.35 && (aF + aE & 0x1) === 0x0 && (q[aJ] = U["cap"]);
            let aN = aF + r0,
                aO = aE + s0;
            aH > 0.1 && aN < K && aO < L && (H[aO * K + aN] = aB);
        }
}

function c0(c, d, g, j, l) {
    const vG = cX;
    let m = xT(d, g);
    if (m % 0x7 > 0x1) return;
    let p = zT(l, 0x7)["ramp"],
        q = Math["min"](j - 0x8, 0x3 + m % 0x5),
        u = d + 0x4,
        v = g + 0x5 + m % 0x4;
    c["fillStyle"] = SW(p[0x1]), c["fillRect"](u, v, q, 0x2), c["fillRect"](u + 0x2, v + 0x3, Math["max"](0x2, q - 0x2), 0x1), c["fillStyle"] = SW(zT(l, 0x3)["ramp"][0x2]), c["fillRect"](u + 0x1, v, Math["min"](0x3, q - 0x1), 0x1), c["fillStyle"] = SW(p[0x3]), c["fillRect"](u, v + 0x2, q - 0x1, 0x1);
}
var ie = 0xb,
    d0 = 0x5,
    u0 = new Set([0x4]),
    bi = class {
        ['x'] = [];
        ['y'] = [];
        ["period"] = [];
        ["phase"] = [];
        ["wet"] = [];
        ["deep"] = [];
        ["colour"] = [];
        ["add"](c, d, g, j, l, m) {
            const vH = cX;
            let p = m["indexOf"](l) - 0x1;
            if (p < 0x0) return;
            let q = f["shore"];
            this['x']["push"](c), this['y']["push"](d), this["period"]["push"](q["periodMin"] + g * (q["periodMax"] - q["periodMin"])), this["phase"]["push"](j), this["wet"]["push"](p), this["deep"]["push"](Math["max"](0x0, p - 0x1)), this["colour"]["push"](l);
        } ["prune"](c, d) {
            const vI = cX;
            let g = 0x0;
            for (let i = 0x0; i < this['x']["length"]; i++) c[this['y'][i] * d + this['x'][i]] === this["colour"][i] && (this['x'][g] = this['x'][i], this['y'][g] = this['y'][i], this["period"][g] = this["period"][i], this["phase"][g] = this["phase"][i], this["wet"][g] = this["wet"][i], this["deep"][g] = this["deep"][i], g++);
            this['x']["length"] = this['y']["length"] = g, this["period"]["length"] = this["phase"]["length"] = this["wet"]["length"] = this["deep"]["length"] = g;
        } ["freeze"]() {
            const vJ = cX;
            let c = this["wet"]["map"]((g, i) => i)["sort"]((g, i) => this["wet"][g] - this["wet"][i]),
                d = g => c["map"](i => g[i]);
            return {
                'x': Int16Array["from"](d(this['x'])),
                'y': Int16Array["from"](d(this['y'])),
                'period': Float32Array["from"](d(this["period"])),
                'phase': Float32Array["from"](d(this["phase"])),
                'wet': Uint8Array["from"](d(this["wet"])),
                'deep': Uint8Array["from"](d(this["deep"]))
            };
        }
    };

function m0(K, L, U) {
    const vK = cX;
    let Y = L["tile"],
        a7 = L["pixelWidth"],
        a8 = L["pixelHeight"],
        a9 = L["theme"],
        aj = U["noise"],
        ak = K["createImageData"](a7, a8),
        aq = new Uint32Array(ak["data"]["buffer"]),
        aw = new Map(),
        ax = aN => {
            const vL = vK;
            let aO = aw[vL(0x30a)](aN);
            return aO || (aO = new KT(aj, a7, a8, Y, aN, 0x3), aw[vL(0x1603)](aN, aO)), aO;
        };
    for (let aN of new Set(U["material"])) ax(zT(a9, aN)["scale"]);
    let az = new KT(aj, a7, a8, Y, 0.38, 0x2),
        aA = new KT(aj, a7, a8, Y, 0.41, 0x2),
        aB = new KT(aj, a7, a8, Y, 0.9, 0x2),
        aC = new KT(aj, a7, a8, Y, 2.6, 0x2),
        aD = oo(a9),
        aE = D1(a9),
        aF = [],
        aG = U["width"],
        aH = U["height"],
        aI = (aO, aP) => aO < 0x0 || aP < 0x0 || aO >= aG || aP >= aH ? 0x0 : U["material"][aP * aG + aO];
    for (let aO = 0x0; aO < a8; aO++) {
        let aP = aO / Y | 0x0;
        for (let aQ = 0x0; aQ < a7; aQ++) {
            let aR = aQ / Y | 0x0,
                aS = aI(aR, aP),
                aU = aS;
            if (!u0["has"](aS)) {
                let b8 = aQ + (az['at'](aQ, aO) - 0.5) * 0x2 * ie + (aC['at'](aQ, aO) - 0.5) * 0x2 * d0,
                    b9 = aO + (aA['at'](aQ, aO) - 0.5) * 0x2 * ie + (aC['at'](aQ + 0x47, aO + 0x25) - 0.5) * 0x2 * d0,
                    bj = aI(b8 / Y | 0x0, b9 / Y | 0x0);
                u0["has"](bj) || (aU = bj);
            }
            let aV = zT(a9, aU),
                aX = aV["ramp"]["length"] - 0x1,
                aY = ax(aV["scale"])['at'](aQ, aO),
                aZ = kT(aQ >> 0x1, aO >> 0x1),
                b4 = kT(aQ, aO),
                b7 = (aV["bias"] + (aY - 0.5) * aV["contrast"]) * aX + (aZ - 0.5) * aV["grain"] * 1.6 + (b4 - 0.5) * aV["grain"] * 0.7;
            aq[aO * a7 + aQ] = iW(aV["ramp"], b7, aQ, aO);
        }
    }
    let {
        wetSdf: aJ
    } = U, aK = (bk, bq) => {
        const vM = vK;
        let bw = bk + (az['at'](bk, bq) - 0.5) * 0x2 * ie + (aC['at'](bk, bq) - 0.5) * 0x7,
            bx = bq + (aA['at'](bk, bq) - 0.5) * 0x2 * ie + (aC['at'](bk + 0x2b, bq + 0x5b) - 0.5) * 0x7;
        return wW(aJ, U[vM(0xf40)], U[vM(0xb54)], Y, bw, bx) < -0.02;
    };
    for (let bk = 0x0; bk < L["height"]; bk++)
        for (let bq = 0x0; bq < L["width"]; bq++) {
            let bw = z(L, bq, bk);
            if (bw !== 0x3 && bw !== 0x7) continue;
            let bx = bq * Y,
                bz = bk * Y;
            !aK(bx + 0x3, bz + 0x4) || !aK(bx + 0xd, bz + 0x4) || !aK(bx + 0x8, bz + 0xb) || !aK(bx + 0xd, bz + 0xb) || aF["push"]([bq, bk]);
        }
    Jy(aq, a7, a8, Y, U, a9), Zy(aq, a7, a8, Y, U, a9, ax(zT(a9, 0x1)["scale"]), aB);
    let aL = new bi(),
        aM = new bi();
    return Tv(aq, a7, a8, Y, U, az, aA, aC, aD, L, aL, aM), Wv(aq, a7, a8, Y, U, az, aA, aB, aC, aE), Qy(aq, a7, a8, Y, U, az, aA, aC, aE), aL["prune"](aq, a7), aM["prune"](aq, a7), K["putImageData"](ak, 0x0, 0x0), nv(K, L, U, aB), {
        'waterTiles': aF,
        'shore': {
            'wet': aL["freeze"](),
            'shelf': aM["freeze"]()
        }
    };
}

function Jy(q, A, E, F, H, K) {
    const vN = cX;
    let L = H["width"],
        N = H["height"],
        P = zT(K, 0x0)["ramp"],
        Q = P[0x1],
        U = P[Math["min"](P["length"] - 0x1, 0x3)],
        V = K === "arctic",
        X = 0x5;
    for (let Y = 0x0; Y * X < E; Y++)
        for (let a7 = 0x0; a7 * X < A; a7++) {
            let a8 = xT(a7, Y, 0x5bf03635);
            if ((a8 & 0x1) === 0x0) continue;
            let a9 = a7 * X + (a8 >> 0x2 & 0x3),
                aj = Y * X + (a8 >> 0x4 & 0x3);
            if (a9 >= A || aj >= E) continue;
            let ak = a9 / F | 0x0,
                aq = aj / F | 0x0;
            if (ak >= L || aq >= N) continue;
            let aw = aq * L + ak;
            if (H["material"][aw] !== 0x0 || H["foliage"][aw]) continue;
            let ax = (a8 >> 0x6 & 0x1) === 0x0 ? U : Q;
            if (V) {
                let aB = 0x2 + (a8 >> 0x7 & 0x1);
                for (let aC = 0x0; aC < aB; aC++) {
                    let aD = a9 + aC;
                    aD < A && (q[aj * A + aD] = ax);
                }
                continue;
            }
            let az = 0x2 + (a8 >> 0x7 & 0x1),
                aA = (a8 >> 0x9 & 0x3) === 0x0 ? a8 >> 0xb & 0x1 ? 0x1 : -0x1 : 0x0;
            for (let aE = 0x0; aE < az; aE++) {
                let aF = aj - aE,
                    aG = a9 + (aA * aE >> 0x1);
                if (aF < 0x0 || aG < 0x0 || aG >= A) break;
                q[aF * A + aG] = ax;
            }
        }
}

function Zy(j, q, A, F, H, K, L, N) {
    const vO = cX;
    let P = zT(K, 0x1),
        Q = !0x1;
    for (let Y = 0x0; Y < H["material"]["length"]; Y++)
        if (H["material"][Y] === 0x1) {
            Q = !0x0;
            break;
        } if (!Q) return;
    let U = H["width"],
        V = H["height"],
        X = P["ramp"]["length"] - 0x1;
    for (let a7 = 0x0; a7 < A; a7++)
        for (let a8 = 0x0; a8 < q; a8++) {
            let a9 = a8 / F | 0x0,
                aj = a7 / F | 0x0;
            if (a9 >= U || aj >= V || H["material"][aj * U + a9] !== 0x1) continue;
            let ak = L['at'](a8, a7),
                aq = N['at'](a8, a7),
                aw = 0.36 + (ak - 0.5) * 0.16,
                ax = 0.26 + aq * 0.1,
                az = (ak - 0.5) * 0x11 + (aq - 0.5) * 0x7,
                aA = (a8 * aw + a7 * (0.62 - aw * 0.4) + az) * ax,
                aB = Math["sin"](aA);
            if (ak < 0.36 || aB < 0.5) continue;
            let aC = a7 * q + a8,
                aD = (aB - 0.5) / 0.5,
                aE = (P["bias"] + (ak - 0.5) * P["contrast"]) * X + (Math["sin"](aA - 1.3) > 0.7 ? -1.7 : aD * 1.7);
            qW(a8, a7) > 0.3 + aD * 0.5 || (j[aC] = iW(P["ramp"], aE, a8, a7));
        }
}

function Qy(q, A, F, H, K, L, N, P, Q) {
    const vP = cX;
    let {
        foliageSdf: U,
        width: V,
        height: X
    } = K, Y = Q["scrub"]["length"] - 0x1, a7 = (aj, ak) => K["material"][(ak / H | 0x0) * V + (aj / H | 0x0)] === 0x0, a8 = (aj, ak, aq) => {
        const vQ = vP;
        let aw = 0x3 + (aq & 0x3);
        for (let ax = 0x0; ax < aw; ax++) {
            let az = ((ax + 0.5) / aw - 0.5) * 1.9 + (aq >> ax + 0x4 & 0x1) * 0.16,
                aA = 0x7 + (aq >> ax * 0x3 + 0x2 & 0x7);
            for (let aB = 0x0; aB < aA; aB++) {
                let aC = aB / aA,
                    aD = Math[vQ(0x4b7)](aj + Math[vQ(0x20f)](az) * aB * (0.35 + aC * 0.75)),
                    aE = ak - Math[vQ(0x4b7)](aB * (0.94 - Math[vQ(0x10fc)](Math[vQ(0x20f)](az)) * 0.3));
                if (aE < 0x0 || aE >= F || aD < 0x0 || aD >= A || !a7(aD, aE) || aC < 0.45 && aD + 0x1 < A && !a7(aD + 0x1, aE)) break;
                q[aE * A + aD] = iW(Q[vQ(0xdee)], aC * Y * 1.3, aD, aE), aC < 0.45 && aD + 0x1 < A && (q[aE * A + aD + 0x1] = iW(Q[vQ(0xdee)], aC * Y, aD + 0x1, aE));
            }
        }
    }, a9 = 0xb;
    for (let aj = 0x0; aj * a9 < F; aj++)
        for (let ak = 0x0; ak * a9 < A; ak++) {
            let aq = (ak * 0x85ebca77 + aj * 0xc2b2ae3d ^ 0x27d4eb2f) >>> 0x0,
                aw = ak * a9 + aq % a9,
                ax = aj * a9 + (aq >> 0x3) % a9;
            if (aw >= A || ax >= F) continue;
            let az = aw / H | 0x0,
                aA = ax / H | 0x0;
            if (az >= V || aA >= X || K["material"][aA * V + az] !== 0x0) continue;
            let aB = aw + (L['at'](aw, ax) - 0.5) * 0x2 * ie + (P['at'](aw, ax) - 0.5) * 0x8,
                aC = ax + (N['at'](aw, ax) - 0.5) * 0x2 * ie,
                aD = wW(U, V, X, H, aB, aC),
                aE = wW(U, V, X, H, aB, aC - H * 0.9) < aD - 0.15,
                aF;
            aD < -0.5 ? aF = 0x0 : aD < 1.6 ? aF = aE ? 0.42 : 0.16 : aD < 3.2 ? aF = 0.09 : aF = 0.006, aF *= 0.35 + 1.9 * Math["max"](0x0, P['at'](aw * 0.35, ax * 0.35) - 0.34), !((aq >> 0x8 & 0xff) / 0xff > aF) && a8(aw, ax, aq >> 0xc);
        }
}

function Tv(q, F, H, K, L, N, P, Q, U, V, X, Y) {
    const vR = cX;
    let {
        wetSdf: a7,
        width: a8,
        height: a9
    } = L, aj = !0x1;
    for (let ax = 0x0; ax < a7["length"]; ax++)
        if (a7[ax] < 0x0) {
            aj = !0x0;
            break;
        } if (!aj) return;
    let ak = U["fringe"]["length"] - 0x1,
        aq = f["shore"],
        aw = (az, aA) => {
            let aB = az / K | 0x0,
                aC = aA / K | 0x0;
            for (let aD = -0x1; aD <= 0x1; aD++)
                for (let aE = -0x1; aE <= 0x1; aE++) {
                    let aF = z(V, aB + aE, aC + aD);
                    if (aF === 0x4 || aF === 0xb || aF === 0xc) return !0x0;
                }
            return !0x1;
        };
    for (let az = 0x0; az < H; az++)
        for (let aA = 0x0; aA < F; aA++) {
            let aB = aA + (N['at'](aA, az) - 0.5) * 0x2 * ie + (Q['at'](aA, az) - 0.5) * 0x7,
                aC = az + (P['at'](aA, az) - 0.5) * 0x2 * ie + (Q['at'](aA + 0x2b, az + 0x5b) - 0.5) * 0x7,
                aD = wW(a7, a8, a9, K, aB, aC);
            if (aD > 0.3 || aD < -0.5) continue;
            let aE = az * F + aA,
                aF = kT(aA, az),
                aG = aA / aq["cell"] | 0x0,
                aH = az / aq["cell"] | 0x0;
            if (aD > -0.02) {
                if (aD > 0.14 && aF > 0.45) continue;
                let aI = iW(U["fringe"], (0x1 - aD / 0.3) * ak, aA, az);
                q[aE] = aI, !aw(aA, az) && kT(aG + 0x7, aH + 0xd) < aq["moving"] && X["add"](aA, az, kT(aG + 0x1f, aH + 0x4d), kT(aG + 0x65, aH + 0x39), aI, U["fringe"]);
            } else {
                if (aD > -0.34 && aF < 0.5) {
                    let aJ = iW(U["shallow"], aF * (U["shallow"]["length"] - 0x1), aA, az);
                    q[aE] = aJ, !aw(aA, az) && kT(aG + 0x13, aH + 0x5) < aq["movingShallow"] && Y["add"](aA, az, kT(aG + 0x1f, aH + 0x4d), kT(aG + 0x65, aH + 0x39), aJ, U["shallow"]);
                }
            }
        }
}

function Wv(j, q, A, C, E, F, H, I, K, L) {
    const vS = cX;
    let {
        foliageSdf: N,
        width: P,
        height: Q
    } = E, R = !0x1;
    for (let S = 0x0; S < N["length"]; S++)
        if (N[S] < 0x0) {
            R = !0x0;
            break;
        } if (R) {
        for (let U = 0x0; U < A; U++)
            for (let V = 0x0; V < q; V++) {
                let X = V + (F['at'](V, U) - 0.5) * 0x2 * ie + (K['at'](V, U) - 0.5) * 0x9,
                    Y = U + (H['at'](V, U) - 0.5) * 0x2 * ie + (K['at'](V + 0x3d, U + 0x1d) - 0.5) * 0x9,
                    a7 = wW(N, P, Q, C, X, Y);
                if (a7 > 1.6) continue;
                let a8 = V / C | 0x0,
                    a9 = U / C | 0x0;
                if (a8 >= P || a9 >= Q || E["material"][a9 * P + a8] === 0x2) continue;
                let aj = U * q + V;
                a7 < -0.15 ? j[aj] = Bt(j[aj], L["shadow"], 0.7) : a7 < 0.5 ? qW(V, U) < 0.55 * (0x1 - a7 / 0.5) && (j[aj] = Bt(j[aj], L["shadow"], 0.55)) : qW(V, U) < 0.2 * (0x1 - (a7 - 0.5) / 1.1) && (j[aj] = L["litter"][I['at'](V, U) * L["litter"]["length"] | 0x0]);
            }
    }
}
var ev = "#5c4f28",
    tv = "#a08a4e";

function nv(K, L, Q, U) {
    const vU = cX;
    let Y = L["tile"],
        a7 = (a8, a9) => {
            const vV = vU;
            let aj = a8[Math[vV(0xbba)](0x0, Math[vV(0x220)](a8[vV(0x1e8)] - 0x1, a9))];
            return vV(0xd0f) + (aj & 0xff) + ',' + (aj >> 0x8 & 0xff) + ',' + (aj >> 0x10 & 0xff) + ')';
        };
    for (let a8 = 0x0; a8 < L["height"]; a8++)
        for (let a9 = 0x0; a9 < L["width"]; a9++) {
            let aj = z(L, a9, a8),
                ak = a9 * Y,
                aq = a8 * Y,
                aw = U['at'](ak + Y / 0x2, aq + Y / 0x2);
            if (aj === 0x4) {
                let ax = (aL, aM) => {
                        let aN = 0x0;
                        for (let aO = 0x1; aO < 0x18 && z(L, a9 + aL * aO, a8 + aM * aO) === 0x4; aO++) aN++;
                        return aN;
                    },
                    az = ax(-0x1, 0x0) + ax(0x1, 0x0),
                    aA = ax(0x0, -0x1) + ax(0x0, 0x1),
                    aB = !(az >= aA),
                    aC = (aL, aM) => {
                        const vX = vU;
                        let aN = (Math[vX(0x12e1)](aL + 0x3779, 0x9e3779b1) ^ Math[vX(0x12e1)](aM + 0x9e37, 0x5f356495)) >>> 0x0;
                        return aN ^= aN >>> 0xf, aN = Math[vX(0x12e1)](aN, 0x85ebca77) >>> 0x0, aN ^= aN >>> 0xd, aN >>> 0x0;
                    },
                    aD = aL => {
                        const vY = vU;
                        let aM = Math[vY(0x7a7)](aL / 0x18) * 0x18,
                            aN = aM;
                        for (;;) {
                            let aO = 0x3 + aC(aN, 0x1) % 0x3;
                            if (aN + aO > aM + 0x18 - 0x3 && (aO = aM + 0x18 - aN), aL < aN + aO) return [aN, aO];
                            aN += aO;
                        }
                    },
                    aE = aB ? ak - ax(-0x1, 0x0) * Y : aq - ax(0x0, -0x1) * Y,
                    aF = (aB ? az : aA) * Y + Y,
                    aG = (aL, aM) => {
                        const vZ = vU;
                        let aN = aC(aL, aE),
                            aO = Math[vZ(0xbba)](0x1, Math[vZ(0x7a7)](aF / 0x3)),
                            aP = aN % 0x3 === 0x0 ? aE + aO + (aN >>> 0x8) % aO : -0x1;
                        return aP < 0x0 || aM < aP ? [aE, aP < 0x0 ? aF : aP - aE] : [aP, aE + aF - aP];
                    },
                    aH = (aL, aM, aN, aO) => {
                        const w1 = vU;
                        aN <= 0x0 || (K[w1(0xac2)] = aO, aB ? K[w1(0xed5)](aM, aL, aN, 0x1) : K[w1(0xed5)](aL, aM, 0x1, aN));
                    },
                    aI = aB ? ak : aq;
                for (let aL = 0x0; aL < Y; aL++) {
                    let aM = (aB ? aq : ak) + aL,
                        [aN, aO] = aD(aM);
                    if (aM === aN) {
                        aH(aM, aI, Y, a7(Re, aC(aN, 0x2) % 0x4 === 0x0 ? 0x1 : 0x0));
                        continue;
                    }
                    for (let aP = 0x0; aP < Y;) {
                        let aQ = aI + aP,
                            [aR, aS] = aG(aN, aQ),
                            aU = Math["min"](aI + Y, aR + aS),
                            aV = 0x1 + aC(aN, aR) % 0x3;
                        aH(aM, aQ, aU - aQ, a7(Re, aV));
                        let aX = aC(aM * 0x7 + 0x3, aR);
                        if (aX % 0x3 === 0x0) {
                            let aZ = aR + 0x1 + (aX >>> 0x8) % Math["max"](0x1, aS - 0x4),
                                b4 = Math["min"](aU, aZ + 0x2 + (aX >>> 0x10) % 0x4);
                            aH(aM, Math["max"](aQ, aZ), b4 - Math["max"](aQ, aZ), a7(Re, aV - 0x1));
                        }
                        let aY = aC(aN, aR) >>> 0x14;
                        if (aY % 0x9 === 0x0 && (aM === aN + 0x1 || aM === aN + 0x2) && aO >= 0x3) {
                            let b7 = aR + 0x2 + (aY >>> 0x4) % Math["max"](0x1, aS - 0x4);
                            aH(aM, Math["max"](aQ, b7), Math["min"](aU, b7 + 0x2) - Math["max"](aQ, b7), a7(Re, 0x0));
                        }
                        aR > aE && aR >= aQ && aR < aU && aH(aM, aR, 0x1, a7(Re, 0x0)), aP = aU - aI;
                    }
                }
                K["fillStyle"] = a7(Re, 0x4);
                let aJ = (b8, b9) => z(L, a9 + b8, a8 + b9) !== 0x4,
                    aK = b8 => (b8 * 0x9e3779b1 >>> 0x1c) % 0x3 === 0x0 ? 0x1 : 0x0;
                if (aB) {
                    if (aJ(0x0, -0x1)) {
                        for (let b8 = 0x0; b8 < Y; b8++) K["fillRect"](ak + b8, aq + aK(ak + b8), 0x1, 0x2);
                    }
                    if (aJ(0x0, 0x1)) {
                        for (let b9 = 0x0; b9 < Y; b9++) K["fillRect"](ak + b9, aq + Y - 0x2 - aK(ak + b9 + 0x7), 0x1, 0x2);
                    }
                } else {
                    if (aJ(-0x1, 0x0)) {
                        for (let bj = 0x0; bj < Y; bj++) K["fillRect"](ak + aK(aq + bj), aq + bj, 0x2, 0x1);
                    }
                    if (aJ(0x1, 0x0)) {
                        for (let bk = 0x0; bk < Y; bk++) K["fillRect"](ak + Y - 0x2 - aK(aq + bk + 0x7), aq + bk, 0x2, 0x1);
                    }
                }
                for (let [bq, bw] of [
                        [0x1, 0x0],
                        [-0x1, 0x0],
                        [0x0, 0x1],
                        [0x0, -0x1]
                    ]) {
                    if (aB ? bq !== 0x0 : bw !== 0x0) continue;
                    let bx = z(L, a9 + bq, a8 + bw);
                    if (bx === 0x4) continue;
                    let bz = bx === 0x3 || bx === 0x7,
                        bA = bq > 0x0 ? ak + Y - 0x2 : ak,
                        bB = bw > 0x0 ? aq + Y - 0x2 : aq;
                    if (bz)
                        for (let bC = 0x0; bC < Y; bC++) {
                            let bD = ((ak + aq + bC) * 0x9e3779b1 >>> 0x1b) % 0x4;
                            bD !== 0x0 && (K["fillStyle"] = a7(Re, 0x0), bq !== 0x0 ? K["fillRect"](bA, aq + bC, Math["min"](0x2, bD), 0x1) : K["fillRect"](ak + bC, bB, 0x1, Math["min"](0x2, bD)));
                        } else {
                            K["fillStyle"] = a7(zT(L["theme"], ys(bx))["ramp"], 0x2);
                            for (let bE = 0x0; bE < Y; bE++) {
                                let bF = ((ak + aq + bE * 0x3) * 0x9e3779b1 >>> 0x1c) % 0x2;
                                bq !== 0x0 ? K["fillRect"](bA, aq + bE, 0x1 + bF, 0x1) : K["fillRect"](ak + bE, bB, 0x1, 0x1 + bF);
                            }
                        }
                }
            } else {
                if (aj === 0xc) {
                    let bG = (c8, c9) => z(L, a9 + c8, a8 + c9) === 0xc,
                        bH = bG(-0x1, -0x1),
                        bI = bG(0x1, -0x1),
                        bJ = bG(-0x1, 0x1),
                        bK = bG(0x1, 0x1),
                        bL = bG(-0x1, 0x0) || bH || bJ,
                        bM = bG(0x1, 0x0) || bI || bK,
                        bN = bG(0x0, -0x1) || bH || bI,
                        bO = bG(0x0, 0x1) || bJ || bK,
                        bP = !bL && !bM && !bN && !bO,
                        bQ = "#4a3c26",
                        bR = "#7b6743",
                        bS = "#3a2f1d",
                        bU = "#8a744a",
                        bV = "#2a2a26",
                        bX = 0x2,
                        bY = 0x3,
                        bZ = Y / 0x2,
                        c7 = (c8, c9, cj) => {
                            const w7 = vU;
                            let ck = ak + c8,
                                cq = aq + c9,
                                cw = cA => {
                                    const w5 = b;
                                    K["fillStyle"] = cj ?? cA;
                                };
                            for (let [cA, cB] of [
                                    [0x7, 0x6],
                                    [0xc, 0xb]
                                ]) cw(bQ), (bL || bP) && K[w7(0xed5)](ck, cq + cA, bZ, 0x2), (bM || bP) && K[w7(0xed5)](ck + bZ, cq + cA, bZ, 0x2), cw(bR), (bL || bP) && K[w7(0xed5)](ck, cq + cB, bZ, 0x1), (bM || bP) && K[w7(0xed5)](ck + bZ, cq + cB, bZ, 0x1);
                            for (let [cC, cD] of [
                                    [0x0, bN],
                                    [bZ, bO]
                                ]) cD && (cw(bQ), K[w7(0xed5)](ck + bZ - 0x2, cq + cC, 0x3, bZ), cw(bR), K[w7(0xed5)](ck + bZ - 0x2, cq + cC, 0x1, bZ));
                            let cx = (bN || bO) && (bL || bM),
                                cz = [bN, bO, bL, bM][w7(0xe37)](Boolean)[w7(0x1e8)] <= 0x1;
                            if (cx || cz || bP) cw(bS), K[w7(0xed5)](ck + bZ - 0x1, cq + 0x3, 0x3, 0xc), cw(bU), K[w7(0xed5)](ck + bZ - 0x1, cq + 0x3, 0x1, 0xc);
                            else {
                                if (bL || bM) {
                                    cw(bS);
                                    for (let cE = 0x1; cE < Y; cE += 0x5) K[w7(0xed5)](ck + cE, cq + 0x3, 0x2, 0xc);
                                    cw(bU);
                                    for (let cF = 0x1; cF < Y; cF += 0x5) K[w7(0xed5)](ck + cF, cq + 0x3, 0x1, 0xc);
                                } else {
                                    cw(bS);
                                    for (let cG = 0x1; cG < Y; cG += 0x5) K[w7(0xed5)](ck + bZ - 0x3, cq + cG, 0x6, 0x3);
                                    cw(bU);
                                    for (let cH = 0x1; cH < Y; cH += 0x5) K[w7(0xed5)](ck + bZ - 0x3, cq + cH, 0x6, 0x1);
                                }
                            }
                        };
                    c7(bX, bY, bV), c7(0x0, 0x0, null);
                } else {
                    if (aj === 0x13) c0(K, ak, aq, Y, L["theme"]);
                    else {
                        if (aj === 0x9) {
                            let c8 = U['at'](ak + 0x3, aq + 0x7);
                            if (c8 > 0.62) {
                                let c9 = ak - 0x2 + (c8 * 0x35 % (Y + 0x4) | 0x0),
                                    cj = aq - 0x2 + (c8 * 0xbf % (Y + 0x4) | 0x0),
                                    ck = c8 > 0.9 ? 0x3 : c8 > 0.76 ? 0x2 : 0x1;
                                for (let cq = 0x0; cq < ck; cq++) {
                                    let cw = 0x2 + cq * 0x2 + (c8 * 0xd % 0x4 | 0x0);
                                    K["fillStyle"] = cq % 0x2 === 0x0 ? ev : tv;
                                    for (let cx = -cw; cx <= cw; cx++) {
                                        let cz = Math["round"](Math["sqrt"](Math["max"](0x0, cw * cw - cx * cx)) * 1.6),
                                            cA = cj + Math["round"](cx * 0.62);
                                        cz <= 0x0 || (K["fillRect"](c9 - cz, cA, 0x1, 0x1), K["fillRect"](c9 + cz, cA, 0x1, 0x1));
                                    }
                                }
                            }
                        } else {
                            if (aj === 0xa) {
                                if (aw > 0.64) {
                                    let cB = zT(L["theme"], 0x5)["ramp"];
                                    K["fillStyle"] = a7(cB, cB["length"] - 0x1);
                                    let cC = ak + (aw * 0x61 % Y | 0x0),
                                        cD = aq + (aw * 0xd3 % Y | 0x0),
                                        cE = 0x3 + (aw * 0xd % 0x4 | 0x0),
                                        cF = aw > 0.7 ? 0x1 : -0x1;
                                    for (let cG = 0x0; cG < cE; cG++) K["fillRect"](cC + cG, cD + cG * cF, 0x1, 0x1);
                                }
                            } else {
                                if (aj === 0xb) {
                                    let cH = z(L, a9, a8 - 0x1) === 0xb || z(L, a9, a8 + 0x1) === 0xb,
                                        cI = (U['at'](ak + Y / 0x2, aq + Y / 0x2) - 0.5) * 0x5 | 0x0,
                                        cJ = zT(L["theme"], 0x6)["ramp"];
                                    for (let cK of [-0x4, 0x4])
                                        for (let cL = 0x0; cL < Y; cL++) {
                                            let cM = cH ? aq + cL : ak + cL,
                                                cN = U['at'](cH ? ak + cK : cM, cH ? cM : aq + cK);
                                            if (cN > 0.14) continue;
                                            K["fillStyle"] = a7(cJ, cN < 0.08 ? 0x0 : 0x1);
                                            let cO = Y / 0x2 + cK + cI + (cN * 0x7 | 0x0) - 0x3;
                                            cH ? K["fillRect"](ak + cO, aq + cL, 0x1, 0x1) : K["fillRect"](ak + cL, aq + cO, 0x1, 0x1);
                                        }
                                    aw > 0.85 && (K["fillStyle"] = a7(cJ, 0x0), K["fillRect"](ak + (aw * 0x83 % Y | 0x0), aq + (aw * 0xc5 % Y | 0x0), 0x2, 0x1));
                                }
                            }
                        }
                    }
                }
            }
        }
}
var T2 = (c, d) => ((Math["imul"](c + 0x1, 0x9e3779b1) >>> 0x10) % d + d) % d,
    dt = 0x4,
    p0 = 0.5,
    ov = [0x0, 0x8, 0x2, 0xa, 0xc, 0x4, 0xe, 0x6, 0x3, 0xb, 0x1, 0x9, 0xf, 0x7, 0xd, 0x5];

function iv(c, d, g) {
    const w8 = cX;
