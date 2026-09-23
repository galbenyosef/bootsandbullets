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
                bU === "armoury" && bC(), bU === "select" && aM(), bU !== "intro" && dm(bU), aK[bU].querySelector("button")?.focus();
            };
        aC[tC(4097)] = () => {
            const tD = tC;
            N[tD(5057)][tD(4578)](tD(2636)) && aN(tD(2729));
        };
        let aO = document[tC(4309)](tC(3996));
        aO && (aO[tC(4097)] = bU => {
            const tE = tC;
            bU[tE(2670)](), Bm();
        });
        let aP = document[tC(4309)](tC(2457)),
            aQ = document[tC(4309)](tC(4954));
        aP && (aP[tC(4920)] = tC(3784), aP[tC(1709)] = false, aQ && (aQ[tC(1709)] = false), Gm() && (aP[tC(1894)] = false, aP[tC(3984)] = tC(1696), aP[tC(4097)] = () => {
            Vm();
        }));
        let aR = co(q),
            aS = A && aR[tC(764)](bU => bU.id === A && aE[tC(1543)][tC(1328)](bU.id)) ? A : null,
            aU = aR[tC(502)](bU => aE[tC(1543)][tC(1328)](bU.id) && !K[tC(3184)][bU.id]);
        aA[tC(4920)] = '';
        let aV = bU => {
                const tF = tC;
                let bV = w(tF(991), tF(1143) + bU);
                return aA[tF(2592)](bV), bV;
            },
            aX = aV(tC(587)),
            aY = aV(tC(3487)),
            aZ = aV(tC(3155));
        aX[tC(2592)](RW(tC(1548), tC(681), () => {
            const tG = tC;
            let bU = aU?.id ?? aS ?? aR[tG(502)](bV => aE[tG(1543)][tG(1328)](bV.id))?.id;
            bU && aJ(bU);
        })), aY[tC(2592)](RW(tC(3954), '', () => aN(tC(2264)))), aY[tC(2592)](RW(tC(1330), '', () => aN(tC(2109))));
        let b4 = RW(tC(913), tC(5931), () => {
            const tH = tC;
            aN(tH(2736)), $[tH(866)] || $[tH(5368)]();
        });
        b4[tC(716)](eT(Ie(true), 2, tC(2626))), b4[tC(2592)](eT(Ie(true), 2, tC(2626))), aZ[tC(2592)](b4);
        let b7 = false,
            b8 = () => {
                const tI = tC;
                b7 || (b7 = true, $[tI(5368)](), bx(), window[tI(2948)](() => {
                    b7 = false, bx();
                }, 500));
            },
            b9 = bU => Math[tC(1207)](bU / 60) + tC(5418) + (bU === 60 ? '' : 'S'),
            bj = bU => {
                const tJ = tC;
                let bV = w(tJ(991), tJ(4638)),
                    bX = (c8, c9, cj, ck) => {
                        const tK = tJ;
                        ST({
                            title: c8,
                            body: c9,
                            buttons: cj[tK(588)](([cq, cw]) => ({
                                label: cq,
                                value: cw
                            })),
                            dismiss: tK(5233)
                        })[tK(4353)](cq => {
                            const tL = tK;
                            cq !== tL(5233) && ck(cq);
                        });
                    },
                    bY = lo[tJ(3639)](c8 => aT[c8]?.[tJ(3362)] === tJ(3913)),
                    bZ = [
                        [tJ(1366), pi(bU[tJ(1364)]), () => bX(tJ(1366), tJ(3264), bY[tJ(588)](c8 => [pi(c8), c8]), c8 => $[tJ(4438)]({
                            mapId: c8
                        }))],
                        [tJ(4656), b9(bU[tJ(4290)]), () => bX(tJ(4656), tJ(3614), jf[tJ(588)](c8 => [b9(c8), String(c8)]), c8 => $[tJ(4438)]({
                            seconds: Number(c8)
                        }))],
                        [tJ(2424), bU[tJ(5805)][tJ(4303)](), () => bX(tJ(2424), tJ(4688), [
                            [tJ(1324), tJ(3913)]
                        ], () => {})],
                        [tJ(2072), bU[tJ(617)][tJ(4303)](), () => bX(tJ(2072), tJ(5705), [
                            [tJ(4440), tJ(1306)],
                            [tJ(774), tJ(4032)]
                        ], c8 => $[tJ(4438)]({
                            visibility: c8
                        }))],
                        [tJ(2873), bU[tJ(2883)] ? 'ON' : tJ(5556), () => bX(tJ(2873), tJ(4215), [
                            ['ON', 'on'],
                            [tJ(5556), tJ(684)]
                        ], c8 => $[tJ(4438)]({
                            fog: c8 === 'on'
                        }))],
                        [tJ(1631), bU[tJ(3470)] ? 'ON' : tJ(5556), () => bX(tJ(1631), tJ(5713), [
                            ['ON', 'on'],
                            [tJ(5556), tJ(684)]
                        ], c8 => $[tJ(4438)]({
                            edgeScroll: c8 === 'on'
                        }))],
                        [tJ(4757), String(bU[tJ(1469)]), () => bX(tJ(4757), tJ(3128), Pf[tJ(588)](c8 => [String(c8), String(c8)]), c8 => $[tJ(4438)]({
                            rounds: Number(c8)
                        }))],
                        [tJ(1347), String(Math[tJ(544)](bU[tJ(1490)], Yf(bU[tJ(1364)]))), () => bX(tJ(1347), tJ(4151), Lf[tJ(3639)](c8 => c8 <= Yf(bU[tJ(1364)]))[tJ(588)](c8 => [String(c8), String(c8)]), c8 => $[tJ(4438)]({
                            squad: Number(c8)
                        }))]
                    ],
                    c7 = {
                        MAP: eT(Ue(tJ(588)), 1),
                        DURATION: eT(Ue(tJ(4888)), 1),
                        MODE: eT(Ue(tJ(5313)), 1),
                        VISIBILITY: eT(Pe(false), 1),
                        'FOG\x20OF\x20WAR': eT(Ue(tJ(3309)), 1),
                        'EDGE\x20MOVEMENT': eT(Ue(tJ(2820)), 1),
                        ROUNDS: eT(Ue(tJ(4888)), 1),
                        'MEN\x20PER\x20SIDE': eT(Ue(tJ(5313)), 1)
                    };
                for (let [c8, c9, cj] of bZ) {
                    let ck = w(tJ(5291), tJ(4883));
                    ck[tJ(2882)] = tJ(5291), ck[tJ(2592)](c7[c8]), ck[tJ(2592)](w(tJ(4768), tJ(2482), c8)), ck[tJ(2592)](w(tJ(4768), tJ(2348), c9)), ck[tJ(4097)] = cj, bV[tJ(2592)](ck);
                }
                return bV;
            },
            bk = bU => () => {
                const tM = tC;
                $[tM(1620)]({
                    seconds: f[tM(3913)][tM(4290)],
                    visibility: bU
                });
            },
            bq = () => {
                const tN = tC;
                ak[tN(4920)] = '';
                let bU = w(tN(991), tN(1396));
                bU[tN(2592)](w(tN(4768), void 0, tN(3771)));
                let bV = w(tN(5291), b7 ? tN(4938) : tN(2322));
                bV[tN(2882)] = tN(5291), bV[tN(3984)] = tN(783), bV[tN(2592)](eT(Zt(tN(4428)), 2)), bV[tN(4097)] = b8, bU[tN(2592)](bV), ak[tN(2592)](bU);
                let bX = w(tN(991), tN(2062));
                b7 && bX[tN(5057)][tN(2129)](tN(4808));
                for (let bZ of $[tN(1653)]) {
                    let c7 = w(tN(991), bZ[tN(782)] ? tN(5420) : tN(1860));
                    c7[tN(2592)](w(tN(991), tN(2135)));
                    let c8 = w(tN(991), tN(1303));
                    c8[tN(2592)](w(tN(4768), tN(3164), bZ[tN(3918)])), c8[tN(2592)](w(tN(4768), tN(2384), bZ[tN(5805)][tN(4303)]())), c8[tN(2592)](w(tN(4768), tN(2384), pi(bZ[tN(1364)]))), c7[tN(2592)](c8);
                    let c9 = w(tN(991), tN(1892));
                    c9[tN(2592)](w(tN(4768), tN(4946), bZ[tN(5210)] + tN(1527) + bZ[tN(1668)])), bZ[tN(782)] ? c9[tN(2592)](RW(tN(2990), '', () => $[tN(4251)](bZ[tN(1443)], tN(5368)))) : c9[tN(2592)](w(tN(4768), tN(4153), tN(1946))), c7[tN(2592)](c9), bX[tN(2592)](c7);
                }
                let bY = w(tN(991), tN(3503));
                $[tN(1653)][tN(488)] ? bY[tN(4920)] = tN(1426) : (bY[tN(5057)][tN(2129)](tN(2270)), bY[tN(2592)](w(tN(4768), void 0, tN(3596))), bY[tN(2592)](RW(tN(1031), '', bk(tN(4032))))), bX[tN(2592)](bY), ak[tN(2592)](bX);
            },
            bw = () => {
                const tO = tC;
                a9[tO(4920)] = '', aj[tO(4920)] = '';
                let bU = $[tO(866)],
                    bV = bU?.[tO(3084)][0]?.[tO(3918)];
                if (a9[tO(2592)](w(tO(4768), tO(4963), bU ? bU[tO(3918)] : tO(3812))), a9[tO(2592)](aL(() => {
                        const tP = tO;
                        if (!$[tP(866)]) {
                            aN(tP(2729));
                            return;
                        }
                        $[tP(1147)](), bx();
                    })), bU) {
                    let cq = w(tO(4768), tO(1088));
                    cq[tO(2592)](eT(bU[tO(617)] === tO(1306) ? Pe(false) : Na(), 1)), cq[tO(2592)](w(tO(4768), void 0, bU[tO(617)][tO(4303)]() + tO(4857) + bU[tO(1443)])), a9[tO(2592)](cq), a9[tO(2592)](w(tO(4768), tO(1919), bU[tO(5805)][tO(4303)]() + tO(1102) + pi(bU[tO(1364)])));
                }
                if (aq[tO(5057)][tO(827)](tO(5451), !!bU), ak[tO(1709)] = !!bU, ak[tO(4920)] = '', !bU) {
                    bq();
                    let cw = w(tO(991), tO(4758));
                    cw[tO(2592)](w(tO(4768), tO(4557), tO(4332)));
                    let cx = w(tO(991), tO(2067));
                    cx[tO(2592)](eT(Ve(true), 1, tO(1728))), cx[tO(2592)](w(tO(4768), tO(2648), vn()));
                    let cz = w(tO(5291), tO(5608));
                    cz[tO(2882)] = tO(5291), cz[tO(3984)] = tO(890), cz[tO(2592)](eT(Zt(tO(5815)), 2)), cx[tO(2592)](cz), cz[tO(4097)] = () => {
                        const tQ = tO;
                        Ru({
                            title: tQ(1342),
                            label: tQ(5687),
                            value: vn(),
                            placeholder: tQ(3866),
                            maxLength: 12
                        })[tQ(4353)](cF => {
                            const tR = tQ;
                            cF !== null && (Df(cF), $[tR(1871)](), bx());
                        });
                    }, cw[tO(2592)](cx), aj[tO(2592)](cw);
                    let cA = (cF, cG, cH, cI) => {
                        const tS = tO;
                        let cJ = RW('', tS(5034), cI);
                        cJ[tS(4920)] = '', cJ[tS(2592)](cH);
                        let cK = w(tS(991), tS(5902));
                        return cK[tS(2592)](w(tS(4768), tS(4063), cF)), cK[tS(2592)](w(tS(4768), tS(5419), cG)), cJ[tS(2592)](cK), cJ;
                    };
                    aj[tO(2592)](cA(tO(1262), tO(5930), eT(Na(), 2, tO(2193)), bk(tO(4032)))), aj[tO(2592)](cA(tO(1868), tO(2002), eT(Pe(true), 2, tO(2193)), bk(tO(1306))));
                    let cB = w(tO(991), tO(4758));
                    cB[tO(2592)](w(tO(4768), tO(4590), tO(3346))), cB[tO(2592)](w(tO(4768), tO(5419), tO(2771)));
                    let cC = w(tO(991), tO(5184)),
                        cD = w(tO(1869), tO(2954));
                    cD[tO(4592)][tO(3296)] = tO(5695), cD[tO(2367)] = 6, cD[tO(1675)] = tO(4138);
                    let cE = () => {
                        const tT = tO;
                        cD[tT(862)][tT(2762)]() && $[tT(4251)](cD[tT(862)]);
                    };
                    cD[tO(5374)] = cF => {
                        const tU = tO;
                        cF[tU(2547)] === tU(1227) && cE();
                    }, cC[tO(2592)](cD), cC[tO(2592)](RW(tO(2990), '', cE)), cB[tO(2592)](cC), $[tO(4961)] && cB[tO(2592)](w(tO(991), tO(762), $[tO(4961)][tO(4303)]())), aj[tO(2592)](cB), aw[tO(4920)] = '';
                    return;
                }
                let bX = w(tO(991), tO(902));
                for (let cF = 0; cF < 2; cF++) {
                    let cG = bU[tO(3084)][cF],
                        cH = w(tO(991), tO(3912));
                    cG?.[tO(5645)] && cH[tO(5057)][tO(2129)](tO(5645)), cG && !cG[tO(2661)] && cH[tO(5057)][tO(2129)](tO(1949)), cH[tO(2592)](w(tO(4768), tO(5953), cF === bU[tO(3034)] ? tO(880) : tO(3193) + (cF + 1))), cH[tO(2592)](eT(cG ? Ve(true) : Rf(), 1, tO(2955)));
                    let cI = w(tO(991), tO(4849));
                    if (cG) {
                        let cJ = w(tO(991), tO(5843));
                        if (cJ[tO(2592)](w(tO(4768), void 0, cG[tO(3918)] + (cF === bU[tO(3034)] ? tO(3057) : ''))), cI[tO(2592)](cJ), cF === 0 && cI[tO(2592)](w(tO(4768), tO(4156), tO(1627))), bU[tO(3084)][tO(764)](cL => cL[tO(5708)] > 0)) {
                            let cL = w(tO(4768), tO(3117));
                            cL[tO(2592)](w(tO(4768), tO(5552), tO(1472) + cG[tO(5708)])), cI[tO(2592)](cL);
                        }
                        cH[tO(2592)](cI);
                        let cK = cG[tO(2661)] ? cG[tO(5645)] ? tO(5532) : tO(781) : tO(1082);
                        if (cF === bU[tO(3034)]) {
                            let cM = RW(cG[tO(5645)] ? tO(5532) : tO(5013), cG[tO(5645)] ? '' : tO(681), () => $[tO(5645)](!cG[tO(5645)]));
                            cM[tO(5057)][tO(2129)](tO(1380), tO(3131)), cH[tO(2592)](cM);
                        } else cH[tO(2592)](w(tO(991), tO(3376), cK));
                        bX[tO(2592)](cH);
                        continue;
                    } else {
                        cI[tO(2592)](w(tO(4768), tO(5843), tO(2596))), cI[tO(2592)](w(tO(4768), tO(3117), tO(3557)));
                        let cN = w(tO(991), tO(873)),
                            cO = w(tO(4768), tO(4318), ri(bU[tO(1443)])),
                            cP = w(tO(991), tO(5436));
                        cP[tO(2592)](cO), cP[tO(2592)](RW(tO(2211), tO(4218), () => {
                            const tV = tO;
                            navigator[tV(4019)]?.[tV(2253)](ri(bU[tV(1443)])), cO[tV(4920)] = tV(4569), window[tV(2948)](() => {
                                const tW = tV;
                                cO[tW(4920)] = ri(bU[tW(1443)]);
                            }, 900);
                        })), cN[tO(2592)](cP);
                        let cQ = w(tO(991), tO(1640));
                        cQ[tO(2592)](w(tO(4768), tO(3117), tO(5855))), cQ[tO(2592)](w(tO(4768), tO(602), bU[tO(1443)])), cN[tO(2592)](cQ), cH[tO(2592)](cI), cH[tO(2592)](cN), bX[tO(2592)](cH);
                        continue;
                    }
                    cH[tO(2592)](cI), bX[tO(2592)](cH);
                }
                aj[tO(2592)](bX);
                let bY = w(tO(991), tO(3983));
                bU[tO(1364)] in aT || Iu(bU[tO(1364)]);
                let bZ = bj(bU);
                bY[tO(2592)](bZ);
                let c7 = w(tO(991), tO(5327)),
                    c8 = w(tO(991), tO(2016));
                for (let cR of $[tO(5433)]) {
                    let cS = w(tO(991), tO(4129) + cR[tO(2372)]);
                    cR[tO(2372)] === tO(671) ? (cS[tO(2592)](w(tO(4768), tO(608) + (cR[tO(2677)] ?? tO(2732)), '<' + (cR[tO(1566)] ?? '?') + '>')), cS[tO(2592)](w(tO(4768), tO(5388), cR[tO(5412)]))) : cS[tO(2592)](w(tO(4768), tO(5388), cR[tO(5412)])), c8[tO(2592)](cS);
                }
                c7[tO(2592)](c8);
                let c9 = w(tO(991), tO(5183)),
                    cj = w(tO(1869), tO(2954));
                cj[tO(4592)][tO(3296)] = tO(671), cj[tO(2367)] = ei, cj[tO(1675)] = tO(3063);
                let ck = () => {
                    const tX = tO;
                    let cU = cj[tX(862)];
                    cU[tX(2762)]() && (cj[tX(862)] = '', $[tX(2057)](cU));
                };
                cj[tO(5374)] = cU => {
                    const tY = tO;
                    cU[tY(2547)] === tY(1227) && ck();
                }, c9[tO(2592)](cj), c9[tO(2592)](RW(tO(5473), tO(4218), ck)), c7[tO(2592)](c9), bY[tO(2592)](c7), aj[tO(2592)](bY), c8[tO(1041)] = c8[tO(3988)], aw[tO(4920)] = '';
            },
            bx = () => {
                const tZ = tC;
                let bU = document[tZ(5067)],
                    bV = [...a8[tZ(823)](tZ(1869))][tZ(588)](bX => ({
                        keep: bX[tZ(4592)][tZ(3296)],
                        value: bX[tZ(862)],
                        at: bX[tZ(1152)] ?? bX[tZ(862)][tZ(488)],
                        had: bX === bU
                    }));
                bw();
                for (let bX of bV) {
                    if (!bX[tZ(3296)]) continue;
                    let bY = a8[tZ(546)](tZ(952) + bX[tZ(3296)] + '"]');
                    bY && (bX[tZ(862)] && (bY[tZ(862)] = bX[tZ(862)]), bX[tZ(5907)] && (bY[tZ(3930)](), bY[tZ(2295)](bX.at, bX.at)));
                }
            };
        $[tC(5229)] = bx, $[tC(5363)] = () => rs(), $[tC(866)] || $[tC(5368)]();
        let bz = window[tC(4524)](() => {
            const u7 = tC;
            !$[u7(866)] && !a8[u7(1709)] && $[u7(5368)]();
        }, 5000);
        $[tC(3018)] = bU => aI({
            net: bU
        }), bx();
        let bA = Ff();
        bA && history[tC(842)](null, '', '/');
        let bB = bA ?? $[tC(2130)];
        $[tC(866)] ? aN(tC(2736)) : bB && (aN(tC(2736)), Bf(bB)[tC(4353)](bU => {
            const u8 = tC;
            if (!bU) {
                $[u8(5617)](u8(4125));
                return;
            }
            $[u8(4251)](bB, u8(3353));
        }));
        let bC = () => mi({
                head: Y,
                list: a7,
                campaign: K,
                closeButton: aL(() => aN(tC(2729))),
                tab: () => X,
                onTab: bU => {
                    X = bU;
                }
            }),
            bD = Lm(aA),
            bE = bU => {
                aI({
                    id: bU.id,
                    difficulty: aD
                });
            };
        aB[tC(1709)] = false, aB[tC(4920)] = '', aB[tC(2592)](w(tC(4768), tC(4963), tC(3954)));
        let bF = q[tC(3639)](bU => K[tC(3184)][bU.id])[tC(488)],
            bG = q[tC(1799)]((bU, bV) => bU + oe(K[tC(3184)][bV.id]), 0);
        aB[tC(2592)](w(tC(4768), tC(1088), tC(576) + bF + '/' + q[tC(488)] + tC(5064) + bG)), aB[tC(2592)](aL(() => aN(tC(2729))));
        let bH = bU => aF[tC(764)](bV => bV[tC(5069)].id === bU) && (aE[tC(1432)][tC(778)](bU)?.[tC(5746)] ?? 0) === 0,
            bI = Py() ?? aF[0]?.[tC(5069)].id ?? '';
        bH(bI) || (bI = aF[tC(502)](bU => bH(bU[tC(5069)].id))?.[tC(5069)].id ?? '');
        let bJ = () => {
                const u9 = tC;
                for (let bU of ax[u9(5509)]) bU[u9(5057)][u9(827)]('on', bU[u9(4592)][u9(1419)] === bI);
            },
            bK = () => {
                const uj = tC;
                let bU = aF[uj(502)](bX => bX[uj(5069)].id === bI);
                if (az[uj(4920)] = '', !bU) return;
                let bV = aE[uj(1432)][uj(778)](bU[uj(5069)].id)?.[uj(5746)] ?? 0;
                for (let bX of bU[uj(2218)]) {
                    let bY = aE[uj(1543)][uj(1328)](bX.id),
                        bZ = K[uj(3184)][bX.id],
                        c7 = w(uj(5291), bY ? uj(5812) : uj(2799));
                    c7[uj(2882)] = uj(5291), bY || c7[uj(4492)](uj(4413), uj(2588)), c7[uj(4592)].id = bX.id;
                    let c8 = bU[uj(2218)][uj(1773)](bX) + 1;
                    c7[uj(2592)](w(uj(4768), uj(4525), String(c8)[uj(5898)](2, '0')));
                    let c9 = w(uj(4768), uj(1790));
                    c9[uj(2592)](w(uj(4768), uj(5321), bX[uj(3918)][uj(4303)]()));
                    let cj = Ny(bX);
                    cj && c9[uj(2592)](w(uj(4768), uj(2347), cj)), c7[uj(2592)](c9);
                    let ck = w(uj(4768), uj(579));
                    bY ? ck[uj(2592)](Oy(oe(bZ))) : ck[uj(2592)](w('i', uj(2757))), c7[uj(2592)](ck), c7[uj(1661)](uj(5016), () => {
                        const uk = uj;
                        bY ? bE(bX) : CW(c7, bV > 0 ? bV + uk(3613) : uk(5964));
                    }), az[uj(2592)](c7);
                }
            },
            bL = bU => {
                const uq = tC;
                let bV = w('i', uq(4177));
                return bV[uq(935)][uq(1807)] = uq(1422) + bU + ')', bV;
            },
            bM = bU => {
                const uw = tC;
                let bV = Ao[bU.id];
                if (!bV) return;
                let bX = RW('', uw(1731), () => {
                    const ux = uw;
                    ZT(ux(4908), {
                        source: bV,
                        zone: bU.id
                    }), Lo(bV, K, q, {
                        zone: bU.id
                    });
                });
                bX[uw(4592)][uw(1291)] = bU.id, bX[uw(4920)] = '', bX[uw(2592)](bL(bU.id));
                let bY = w(uw(4768), uw(2003));
                bY[uw(2592)](w(uw(4768), uw(1049), bU[uw(3918)][uw(4303)]())), bX[uw(2592)](bY), bX[uw(2592)](w('i', uw(4195))), ax[uw(2592)](bX);
            };
        ax[tC(4920)] = '';
        for (let bU of $t) {
            let bV = aF[tC(502)](cj => cj[tC(5069)].id === bU.id);
            if (!bV) {
                bU[tC(1291)] && bM(bU);
                continue;
            }
            let bX = bV[tC(2218)][tC(3639)](cj => K[tC(3184)][cj.id])[tC(488)],
                bY = aE[tC(1432)][tC(778)](bV[tC(5069)].id)?.[tC(5746)] ?? 0,
                bZ = bY > 0,
                c7 = RW('', tC(2177) + (bZ ? tC(3104) : ''), () => {
                    const uz = tC;
                    bI = bV[uz(5069)].id, bZ || Ly(bI), bJ(), bK();
                });
            c7[tC(4592)][tC(1419)] = bV[tC(5069)].id, c7[tC(4920)] = '', c7[tC(2592)](bL(bV[tC(5069)].id));
            let c8 = w(tC(4768), tC(2003));
            c8[tC(2592)](w(tC(4768), tC(1049), bV[tC(5069)][tC(3918)][tC(4303)]()));
            let c9 = w(tC(4768), tC(810));
            bZ ? c9[tC(2592)](w(tC(4768), tC(3736), aE[tC(5644)] + tC(2550) + bY + tC(2558))) : (c9[tC(2592)](w(tC(4768), tC(3736), bV[tC(2218)][tC(488)] + tC(5773) + (bV[tC(2218)][tC(488)] === 1 ? '' : 'S'))), c9[tC(2592)](w(tC(4768), tC(2828), bX + '/' + bV[tC(2218)][tC(488)]))), c8[tC(2592)](c9), c7[tC(2592)](c8), ax[tC(2592)](c7);
        }
        let bN = false;
        aM = () => {
            const uA = tC;
            if (!bN) {
                bN = true;
                for (let cj of hd()) {
                    let ck = Ao[cj.id];
                    ck && ZT(uA(3472), {
                        source: ck,
                        zone: cj.id
                    });
                }
            }
        }, document[tC(4309)](tC(2310))[tC(4920)] = '', bJ(), bK();
        let bO = Wm(N),
            bP = w(tC(5291), tC(3774));
        bP[tC(2882)] = tC(5291), bP[tC(3984)] = tC(1234), bP[tC(4492)](tC(5246), tC(1234)), bP[tC(1661)](tC(5016), () => Vo()), N[tC(2592)](bP);
        let bQ = Pm(N, K, q);
        L && aN(L), N[tC(1709)] = false, requestAnimationFrame(() => N[tC(5057)][tC(2129)]('in')), window[tC(2948)](() => MW(0), 340), aN(L ?? ($[tC(866)] || bB ? tC(2736) : tC(2729)));
        let bR = cj => {
            const uB = tC;
            if (!aH && !xu()) {
                if (cj[uB(2547)] === 'm' || cj[uB(2547)] === 'M') {
                    ea();
                    return;
                }
                cj[uB(2547)] === uB(2034) && N[uB(5057)][uB(4578)](uB(2636)) && aN(uB(2729));
            }
        };
        document[tC(1661)](tC(1777), bR);
        let bS = cj => {
            const uC = tC;
            if (aH || !N[uC(5057)][uC(4578)](uC(2636))) return;
            let ck = cj[uC(5099)];
            ck && (ck[uC(2325)](uC(3352)) || aN(uC(2729)));
        };
        U[tC(1661)](tC(2082), bS);
    });
}
var Dy = 3;

function Fy(c, d) {
    const uD = cX;
    return bW.filter(g => g.ready && g.category !== "squad" && !$e(c, g.id)).map(g => ({
        id: g.id,
        name: g.name,
        price: ZW(g.id)
    })).filter(g => g.price <= d).sort((g, i) => g.price - i.price).slice(0, Dy);
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
    p.append(eT(xn(), 2, "dsp-coin"), w("span", '', c.bonds + " War Bonds, unspent")), m.appendChild(p);
    let q = w("div", "dsp-shelf");
    for (let u of Fy(d, c.bonds)) {
        let v = w("div", "dsp-good"),
            y = Ke(u.id),
            A = w("div", "dsp-good-stand");
        y && A.appendChild(eT(y, 2, "dsp-good-art")), v.appendChild(A), v.appendChild(w("span", "dsp-good-name", u.name)), q.appendChild(v);
    }
    return m.appendChild(q), j.append(IT("The Armoury", "dsp-go primary", () => g("armoury", "went")), IT("Get on with it", "dsp-go dark", () => g("continue", "skipped"))), m.classList.add("dsp-centred"), j.classList.add("dsp-centred-row"), m;
}
var Za = 5;

function kn({
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
            q[uG(4667)]((A, C) => {
                const uH = uG;
                A[uH(3476)][uH(5057)][uH(827)]('on', C < y), A[uH(4492)](uH(2584), String(C + 1 === j));
            }), p[uG(5057)][uG(827)](uG(4965), j > 0), u[uG(4920)] = j ? j + uG(3493) + Za : d;
        };
    for (let y = 1; y <= Za; y++) {
        let A = w("button", "dsp-star");
        A.type = "button", A.setAttribute("role", "radio"), A.setAttribute("aria-label", y + " out of " + Za), A.appendChild(w('i', "fx-star")), A.onclick = () => {
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
            q[uI(4667)](C => {
                const uJ = uI;
                C[uJ(1894)] = true;
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
            label: "Out of five",
            prompt: "Pick a star.",
            onChange: C => {
                const uL = uK;
                A[uL(1894)] = C === 0;
            }
        });
    p.append(q.row, q.hint);
    let u = w("label", "dsp-plain dsp-question", By),
        v = w("textarea", "dsp-box");
    v.rows = 3, v.maxLength = 2000, v.placeholder = "Optional.", u.htmlFor = v.id = "dsp-comment", p.append(u, v);
    let y = w('p', "dsp-note");
    p.appendChild(y);
    let A = IT("Send", "dsp-go primary", () => {
        const uM = uK;
        let C = q[uM(862)]();
        C !== 0 && (A[uM(1894)] = true, y[uM(4920)] = uM(1167), rt({
            kind: uM(4106),
            stars: C,
            comment: v[uM(862)]
        }, {
            ...Ro(d, g),
            stars: C
        })[uM(4353)](E => {
            const uN = uM;
            if (E) {
                j(uN(4764), uN(5351) + C);
                return;
            }
            A[uN(1894)] = false, y[uN(4920)] = uN(5914);
        }));
    });
    return A.disabled = true, m.append(A, IT("Not now", "dsp-go dark", () => {
        const uO = uK;
        hW(uO(2338), {
            stars: q[uO(862)]() || null
        }), j(uO(4764), uO(3051));
    })), jo() || (y.textContent = "The line is down, so this would not reach anybody. No harm done.", A.disabled = true, q.disable()), p;
}
var Hy = {
    armoury: Zf,
    review: Qf,
    offer: ({
        campaign: c,
        levels: d,
        done: g,
        actions: i,
        source: j,
        lead: l
    }) => ga({
        campaign: c,
        levels: d,
        actions: i,
        source: j,
        lead: l,
        done: m => g("continue", m)
    })
};

function T0(c, d) {
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
    return Po({
        line: Io(c, m),
        raised: u,
        build: (y, A) => Hy[c]({
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
var iI = f.timing.dispatchFade,
    W0 = false,
    e0 = false;

function t0(c = true) {
    e0 = c;
}

function Gy(c) {
    const uQ = cX;
    let d = bW.filter(g => g.ready && g.category !== "squad" && !$e(c, g.id)).map(g => ZW(g.id));
    return d.length ? Math.min(...d) : null;
}
async function Vy(c, d = na, g = Date.now()) {
    const uR = cX;
    let i = it();
    return {
        now: g,
        missionsCleared: Object.values(c.records).filter(j => j.clears.length > 0).length,
        playSeconds: i.playSeconds,
        missionsCompleted: i.missionsCompleted,
        bonds: c.bonds,
        cheapestUnowned: Gy(c),
        declinedAt: Em(),
        state: await d.load(),
        shownThisSession: W0
    };
}
async function n0(c, d, g = na) {
    const uS = cX;
    if (e0) return "continue";
    try {
        let j = await Vy(c, g),
            l = im(j);
        if (!l) return "continue";
        W0 = true, await rm(g, l, j);
        let {
            outcome: m,
            answer: p
        } = await T0(l, {
            ctx: j,
            campaign: c,
            levels: d
        });
        return p !== "skipped" ? await am(g, l, p) : await sm(g, l, j), m;
    } catch {
        return "continue";
    }
}
var fi = class {
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

function gi(g, j = {}) {
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
            let N = (o0[L] ?? o0[' '])[vA(3916)]('/'),
                P = 2 + M * 12;
            for (let Q = 0; Q < 13; Q++) {
                let R = N[Q] ?? '';
                for (let S = 0; S < 10; S++)
                    if (R[S] === '#')
                        for (let U = 0; U <= 1; U++) {
                            let V = P + S + U,
                                X = V * 4096 + 2 + Q;
                            K[vA(1328)](X) || (K[vA(2129)](X), I[vA(3087)]([V, 2 + Q]));
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
var Qa = 6;

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
            let P = xT(C + N, E + M),
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
var r0 = 5,
    s0 = 6;

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
            return wW(U, a7, a8, aw, b7, b8);
        };
    for (let aZ = 0; aZ < az; aZ++)
        for (let b4 = 0; b4 < ax; b4++) {
            let b7 = aV(b4, aZ);
            if (b7 > 0.34) continue;
            aU(b4, aZ, Qa);
            let b8 = -b7,
                b9 = 1 - aR.dist / (Qa * 0.85);
            if (b8 < 0.5 && b9 < 0.3 - b8 * 0.7) continue;
            let bj = aZ * ax + b4,
                bk = -(aR.nx * 0.62 + aR.ny * 0.78),
                bq = aS * (0.3 + (aN.at(b4, aZ) - 0.5) * 0.72) + bk * 2.6 + b9 * 2.4 + aR.tint * 0.5;
            b9 > 0.72 && bk > 0.35 && (bq += 1.4), b8 < 1 && (bq -= (1 - b8) * 1.35), aE[bj] = iW(aA.canopy, bq, b4, aZ), aR.dist > Qa * 0.8 && (aE[bj] = Bt(aE[bj], aA.canopy[1], 0.7));
        }
    l0(aE, ax, az, aw, L, Y, Ky, aA, aU, aR, aK, aL, aM, aN);
    let aX = Yy(ax, az, aw, L, aA, aU, aR, aK, aL, aM, aN);
    Xy(aE, aI, ax, az, aw, L, Fl(K.theme), aU, aR, aK, aL, aM, aN);
    for (let bw = 0; bw < az; bw++)
        for (let bx = 0; bx < ax; bx++) {
            let bz = bx - r0,
                bA = bw - s0;
            bz < 0 || bA < 0 || aV(bz, bA) > -0.12 || (aI[bw * ax + bx] = aJ);
        }
    return aC.putImageData(aD, 0, 0), aG.putImageData(aH, 0, 0), {
        layer: aB,
        shadow: aF,
        understorey: aX
    };
}
var Ky = {
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

function l0(K, L, U, Y, a7, a8, a9, aj, ak, aq, aw, ax, az, aA) {
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
                aL = wW(a8, aB, aC, Y, aJ, aK);
            if (aL > 0.2) continue;
            let aM = -aL;
            if (a9.strands) {
                ak(aI, aH, aF);
                let aQ = aq.dist,
                    aR = (aq.tint + 1) * 32767 | 0,
                    aS = 3 + (aR & 3) * 0.5;
                if (aQ > aS) continue;
                if (aQ < 0.75) {
                    K[aH * L + aI] = iW(aj.canopy, aE * a9.base - 1.6, aI, aH);
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
                aM < 0.8 && (b8 -= (0.8 - aM) * 0.9), K[aH * L + aI] = iW(aj.canopy, b8, aI, aH);
                continue;
            }
            ak(aI, aH, aF);
            let aN = 1 - aq.dist / (aF * 0.9);
            if (aN < a9.open + (aM < 0.4 ? a9.hemOpen : 0)) continue;
            let aO = -(aq.nx * 0.5 + aq.ny * 0.86),
                aP = aE * (a9.base + (aA.at(aI, aH) - 0.5) * 0.8) + aO * 1.5 + aN * a9.blade + aq.tint * 0.45;
            aM < 0.8 && (aP -= (0.8 - aM) * 0.9), K[aH * L + aI] = iW(aj.canopy, aP, aI, aH);
        }
    return true;
}

function Yy(g, j, p, q, v, y, A, C, E, F, H) {
    const vE = cX;
    let I = document.createElement("canvas");
    I.width = g, I.height = j;
    let K = I.getContext('2d'),
        L = K.createImageData(g, j),
        M = new Uint32Array(L.data.buffer);
    return l0(M, g, j, p, q, q.longSdf, zy, v, y, A, C, E, F, H) ? (K.putImageData(L, 0, 0), I) : (I.width = 0, I.height = 0, null);
}

function Xy(q, H, K, L, P, Q, U, V, Y, a7, a8, a9, aj) {
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
            return wW(ak, aq, aw, P, aG, aH);
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
            aH < 0.9 && (aM -= (0.9 - aH) * 1.6), q[aJ] = iW(U.face, aM, aF, aE), Y.ny > 0.72 && Y.dist > aA * 0.5 ? q[aJ] = U.shadow : Y.ny < -0.5 && Y.nx < 0.3 && aI > 0.35 && (aF + aE & 1) === 0 && (q[aJ] = U.cap);
            let aN = aF + r0,
                aO = aE + s0;
            aH > 0.1 && aN < K && aO < L && (H[aO * K + aN] = aB);
        }
}

function c0(c, d, g, j, l) {
    const vG = cX;
    let m = xT(d, g);
    if (m % 7 > 1) return;
    let p = zT(l, 7).ramp,
        q = Math.min(j - 8, 3 + m % 5),
        u = d + 4,
        v = g + 5 + m % 4;
    c.fillStyle = SW(p[1]), c.fillRect(u, v, q, 2), c.fillRect(u + 2, v + 3, Math.max(2, q - 2), 1), c.fillStyle = SW(zT(l, 3).ramp[2]), c.fillRect(u + 1, v, Math.min(3, q - 1), 1), c.fillStyle = SW(p[3]), c.fillRect(u, v + 2, q - 1, 1);
}
var ie = 11,
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

function m0(K, L, U) {
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
            let aO = aw[vL(778)](aN);
            return aO || (aO = new KT(aj, a7, a8, Y, aN, 3), aw[vL(5635)](aN, aO)), aO;
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
                let b8 = aQ + (az.at(aQ, aO) - 0.5) * 2 * ie + (aC.at(aQ, aO) - 0.5) * 2 * d0,
                    b9 = aO + (aA.at(aQ, aO) - 0.5) * 2 * ie + (aC.at(aQ + 71, aO + 37) - 0.5) * 2 * d0,
                    bj = aI(b8 / Y | 0, b9 / Y | 0);
                u0.has(bj) || (aU = bj);
            }
            let aV = zT(a9, aU),
                aX = aV.ramp.length - 1,
                aY = ax(aV.scale).at(aQ, aO),
                aZ = kT(aQ >> 1, aO >> 1),
                b4 = kT(aQ, aO),
                b7 = (aV.bias + (aY - 0.5) * aV.contrast) * aX + (aZ - 0.5) * aV.grain * 1.6 + (b4 - 0.5) * aV.grain * 0.7;
            aq[aO * a7 + aQ] = iW(aV.ramp, b7, aQ, aO);
        }
    }
    let {
        wetSdf: aJ
    } = U, aK = (bk, bq) => {
        const vM = vK;
        let bw = bk + (az.at(bk, bq) - 0.5) * 2 * ie + (aC.at(bk, bq) - 0.5) * 7,
            bx = bq + (aA.at(bk, bq) - 0.5) * 2 * ie + (aC.at(bk + 43, bq + 91) - 0.5) * 7;
        return wW(aJ, U[vM(3904)], U[vM(2900)], Y, bw, bx) < -0.02;
    };
    for (let bk = 0; bk < L.height; bk++)
        for (let bq = 0; bq < L.width; bq++) {
            let bw = z(L, bq, bk);
            if (bw !== 3 && bw !== 7) continue;
            let bx = bq * Y,
                bz = bk * Y;
            !aK(bx + 3, bz + 4) || !aK(bx + 13, bz + 4) || !aK(bx + 8, bz + 11) || !aK(bx + 13, bz + 11) || aF.push([bq, bk]);
        }
    Jy(aq, a7, a8, Y, U, a9), Zy(aq, a7, a8, Y, U, a9, ax(zT(a9, 1).scale), aB);
    let aL = new bi(),
        aM = new bi();
    return Tv(aq, a7, a8, Y, U, az, aA, aC, aD, L, aL, aM), Wv(aq, a7, a8, Y, U, az, aA, aB, aC, aE), Qy(aq, a7, a8, Y, U, az, aA, aC, aE), aL.prune(aq, a7), aM.prune(aq, a7), K.putImageData(ak, 0, 0), nv(K, L, U, aB), {
        waterTiles: aF,
        shore: {
            wet: aL.freeze(),
            shelf: aM.freeze()
        }
    };
}

function Jy(q, A, E, F, H, K) {
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
            let a8 = xT(a7, Y, 1542469173);
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

function Zy(j, q, A, F, H, K, L, N) {
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
            qW(a8, a7) > 0.3 + aD * 0.5 || (j[aC] = iW(P.ramp, aE, a8, a7));
        }
}

function Qy(q, A, F, H, K, L, N, P, Q) {
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
                    aD = Math[vQ(1207)](aj + Math[vQ(527)](az) * aB * (0.35 + aC * 0.75)),
                    aE = ak - Math[vQ(1207)](aB * (0.94 - Math[vQ(4348)](Math[vQ(527)](az)) * 0.3));
                if (aE < 0 || aE >= F || aD < 0 || aD >= A || !a7(aD, aE) || aC < 0.45 && aD + 1 < A && !a7(aD + 1, aE)) break;
                q[aE * A + aD] = iW(Q[vQ(3566)], aC * Y * 1.3, aD, aE), aC < 0.45 && aD + 1 < A && (q[aE * A + aD + 1] = iW(Q[vQ(3566)], aC * Y, aD + 1, aE));
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
            let aB = aw + (L.at(aw, ax) - 0.5) * 2 * ie + (P.at(aw, ax) - 0.5) * 8,
                aC = ax + (N.at(aw, ax) - 0.5) * 2 * ie,
                aD = wW(U, V, X, H, aB, aC),
                aE = wW(U, V, X, H, aB, aC - H * 0.9) < aD - 0.15,
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
            let aB = aA + (N.at(aA, az) - 0.5) * 2 * ie + (Q.at(aA, az) - 0.5) * 7,
                aC = az + (P.at(aA, az) - 0.5) * 2 * ie + (Q.at(aA + 43, az + 91) - 0.5) * 7,
                aD = wW(a7, a8, a9, K, aB, aC);
            if (aD > 0.3 || aD < -0.5) continue;
            let aE = az * F + aA,
                aF = kT(aA, az),
                aG = aA / aq.cell | 0,
                aH = az / aq.cell | 0;
            if (aD > -0.02) {
                if (aD > 0.14 && aF > 0.45) continue;
                let aI = iW(U.fringe, (1 - aD / 0.3) * ak, aA, az);
                q[aE] = aI, !aw(aA, az) && kT(aG + 7, aH + 13) < aq.moving && X.add(aA, az, kT(aG + 31, aH + 77), kT(aG + 101, aH + 57), aI, U.fringe);
            } else {
                if (aD > -0.34 && aF < 0.5) {
                    let aJ = iW(U.shallow, aF * (U.shallow.length - 1), aA, az);
                    q[aE] = aJ, !aw(aA, az) && kT(aG + 19, aH + 5) < aq.movingShallow && Y.add(aA, az, kT(aG + 31, aH + 77), kT(aG + 101, aH + 57), aJ, U.shallow);
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
    } = E, R = false;
    for (let S = 0; S < N.length; S++)
        if (N[S] < 0) {
            R = true;
            break;
        } if (R) {
        for (let U = 0; U < A; U++)
            for (let V = 0; V < q; V++) {
                let X = V + (F.at(V, U) - 0.5) * 2 * ie + (K.at(V, U) - 0.5) * 9,
                    Y = U + (H.at(V, U) - 0.5) * 2 * ie + (K.at(V + 61, U + 29) - 0.5) * 9,
                    a7 = wW(N, P, Q, C, X, Y);
                if (a7 > 1.6) continue;
                let a8 = V / C | 0,
                    a9 = U / C | 0;
                if (a8 >= P || a9 >= Q || E.material[a9 * P + a8] === 2) continue;
                let aj = U * q + V;
                a7 < -0.15 ? j[aj] = Bt(j[aj], L.shadow, 0.7) : a7 < 0.5 ? qW(V, U) < 0.55 * (1 - a7 / 0.5) && (j[aj] = Bt(j[aj], L.shadow, 0.55)) : qW(V, U) < 0.2 * (1 - (a7 - 0.5) / 1.1) && (j[aj] = L.litter[I.at(V, U) * L.litter.length | 0]);
            }
    }
}
var ev = "#5c4f28",
    tv = "#a08a4e";

function nv(K, L, Q, U) {
    const vU = cX;
    let Y = L.tile,
        a7 = (a8, a9) => {
            const vV = vU;
            let aj = a8[Math[vV(3002)](0, Math[vV(544)](a8[vV(488)] - 1, a9))];
            return vV(3343) + (aj & 255) + ',' + (aj >> 8 & 255) + ',' + (aj >> 16 & 255) + ')';
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
                        let aN = (Math[vX(4833)](aL + 14201, 2654435761) ^ Math[vX(4833)](aM + 40503, 1597334677)) >>> 0;
                        return aN ^= aN >>> 15, aN = Math[vX(4833)](aN, 2246822519) >>> 0, aN ^= aN >>> 13, aN >>> 0;
                    },
                    aD = aL => {
                        const vY = vU;
                        let aM = Math[vY(1959)](aL / 24) * 24,
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
                            aO = Math[vZ(3002)](1, Math[vZ(1959)](aF / 3)),
                            aP = aN % 3 === 0 ? aE + aO + (aN >>> 8) % aO : -1;
                        return aP < 0 || aM < aP ? [aE, aP < 0 ? aF : aP - aE] : [aP, aE + aF - aP];
                    },
                    aH = (aL, aM, aN, aO) => {
                        const w1 = vU;
                        aN <= 0 || (K[w1(2754)] = aO, aB ? K[w1(3797)](aM, aL, aN, 1) : K[w1(3797)](aL, aM, 1, aN));
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
                            K.fillStyle = a7(zT(L.theme, ys(bx)).ramp, 2);
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
                                ]) cw(bQ), (bL || bP) && K[w7(3797)](ck, cq + cA, bZ, 2), (bM || bP) && K[w7(3797)](ck + bZ, cq + cA, bZ, 2), cw(bR), (bL || bP) && K[w7(3797)](ck, cq + cB, bZ, 1), (bM || bP) && K[w7(3797)](ck + bZ, cq + cB, bZ, 1);
                            for (let [cC, cD] of [
                                    [0, bN],
                                    [bZ, bO]
                                ]) cD && (cw(bQ), K[w7(3797)](ck + bZ - 2, cq + cC, 3, bZ), cw(bR), K[w7(3797)](ck + bZ - 2, cq + cC, 1, bZ));
                            let cx = (bN || bO) && (bL || bM),
                                cz = [bN, bO, bL, bM][w7(3639)](Boolean)[w7(488)] <= 1;
                            if (cx || cz || bP) cw(bS), K[w7(3797)](ck + bZ - 1, cq + 3, 3, 12), cw(bU), K[w7(3797)](ck + bZ - 1, cq + 3, 1, 12);
                            else {
                                if (bL || bM) {
                                    cw(bS);
                                    for (let cE = 1; cE < Y; cE += 5) K[w7(3797)](ck + cE, cq + 3, 2, 12);
                                    cw(bU);
                                    for (let cF = 1; cF < Y; cF += 5) K[w7(3797)](ck + cF, cq + 3, 1, 12);
                                } else {
                                    cw(bS);
                                    for (let cG = 1; cG < Y; cG += 5) K[w7(3797)](ck + bZ - 3, cq + cG, 6, 3);
                                    cw(bU);
                                    for (let cH = 1; cH < Y; cH += 5) K[w7(3797)](ck + bZ - 3, cq + cH, 6, 1);
                                }
                            }
                        };
                    c7(bX, bY, bV), c7(0, 0, null);
                } else {
                    if (aj === 19) c0(K, ak, aq, Y, L.theme);
                    else {
                        if (aj === 9) {
                            let c8 = U.at(ak + 3, aq + 7);
                            if (c8 > 0.62) {
                                let c9 = ak - 2 + (c8 * 53 % (Y + 4) | 0),
                                    cj = aq - 2 + (c8 * 191 % (Y + 4) | 0),
                                    ck = c8 > 0.9 ? 3 : c8 > 0.76 ? 2 : 1;
                                for (let cq = 0; cq < ck; cq++) {
                                    let cw = 2 + cq * 2 + (c8 * 13 % 4 | 0);
                                    K.fillStyle = cq % 2 === 0 ? ev : tv;
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
var T2 = (c, d) => ((Math.imul(c + 1, 2654435761) >>> 16) % d + d) % d,
    dt = 4,
    p0 = 0.5,
    ov = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

function iv(c, d, g) {
    const w8 = cX;