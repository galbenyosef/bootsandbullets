}(a, 672707));
var defineProperty = Object.defineProperty,
    J2 = (c, d) => {
        for (var g in d) defineProperty(c, g, {
            get: d[g],
            enumerable: true
        });
    },
    x = [{
        version: "0.3.0",
        date: "2026-09-12",
        entries: [{
            tag: "FEATURE",
            html: "Chicken Dinner: two hundred hens, against the clock."
        }, {
            tag: "FEATURE",
            html: "New maps: North Station, Snipers' Alley and Convoy Down."
        }, {
            tag: "FEATURE",
            html: "Private Enterprise and Rubber Division join the campaign."
        }, {
            tag: "FEATURE",
            html: "Enemies flank you when there is a way round."
        }, {
            tag: "FEATURE",
            html: "Hidden triggers bring more men when you step in."
        }, {
            tag: "FEATURE",
            html: "Buy grenades straight from the briefing."
        }, {
            tag: "FEATURE",
            html: "Win, and Replay offers the next difficulty up."
        }, {
            tag: "FEATURE",
            html: "Rate each map from the result panel."
        }, {
            tag: "FEATURE",
            html: "The version number opens the list of what shipped."
        }, {
            tag: "IMPROVEMENT",
            html: "Long grass hides men up to the shoulders."
        }, {
            tag: "IMPROVEMENT",
            html: "Sandbags stop fire, and some enemies fight from them."
        }, {
            tag: "IMPROVEMENT",
            html: "Salt ridges, mud and scenery across the campaign maps."
        }, {
            tag: "IMPROVEMENT",
            html: "The SMG now outshoots the gun above it."
        }, {
            tag: "IMPROVEMENT",
            html: "Grenade blasts throw harder."
        }, {
            tag: "IMPROVEMENT",
            html: "The shoreline moves and your squad leaves tracks."
        }, {
            tag: "FIX",
            html: "Hostages no longer freeze beside deep water or walls."
        }, {
            tag: "FIX",
            html: "A slightly dragged click still counts as a move."
        }, {
            tag: "FIX",
            html: "The Armoury no longer starts the mission behind itself."
        }]
    }, {
        version: "0.2.0",
        date: "2026-09-09",
        entries: [{
            tag: "FEATURE",
            html: "You can change the keys, on a KEYS settings page."
        }, {
            tag: "FEATURE",
            html: "A shot near the trees sends birds up."
        }, {
            tag: "FEATURE",
            html: "You can switch auto fire off in the campaign."
        }, {
            tag: "IMPROVEMENT",
            html: "The camera follows the men who are actually moving."
        }, {
            tag: "IMPROVEMENT",
            html: "Scroll the view and it stays where you put it."
        }, {
            tag: "IMPROVEMENT",
            html: "The aiming cursor is a sight with a dark outline."
        }, {
            tag: "IMPROVEMENT",
            html: "Held fire fans across a tile, not one pixel."
        }, {
            tag: "IMPROVEMENT",
            html: "The feedback card asks twice, then stops asking."
        }, {
            tag: "FIX",
            html: "No enemy is placed where you cannot reach him."
        }]
    }, {
        version: "0.1.4",
        date: "2026-09-08",
        entries: [{
            tag: "IMPROVEMENT",
            html: "The Herd is a valley with room to fall back."
        }, {
            tag: "FIX",
            html: "Even the fastest zombies are slower than your soldiers."
        }]
    }, {
        version: "0.1.3",
        date: "2026-09-08",
        entries: [{
            tag: "IMPROVEMENT",
            html: "The Mission Accomplished panel is shorter and clearer."
        }, {
            tag: "IMPROVEMENT",
            html: "A new star blinks and throws sparks, then settles."
        }, {
            tag: "IMPROVEMENT",
            html: "A gun you have not bought says NOT PURCHASED."
        }, {
            tag: "IMPROVEMENT",
            html: "The mission sidebar reads top to bottom, in sections."
        }, {
            tag: "FEATURE",
            html: "You hear it when somebody takes the other seat."
        }, {
            tag: "FIX",
            html: "The settings sheet keeps one height on every tab."
        }]
    }, {
        version: "0.1.2",
        date: "2026-09-08",
        entries: [{
            tag: "FEATURE",
            html: "The game now reports itself when it breaks."
        }, {
            tag: "IMPROVEMENT",
            html: "Feedback and the full-game form reach us again."
        }]
    }, {
        version: "0.1.1",
        date: "2026-09-07",
        entries: [{
            tag: "IMPROVEMENT",
            html: "The version is shown at the foot of the intro."
        }]
    }, {
        version: "0.1.0",
        date: "2026-09-07",
        entries: [{
            tag: "FIX",
            html: "PLAY NOW continues the campaign, and never offers a Challenge."
        }, {
            tag: "FIX",
            html: "Multiplayer opens on your own squad, not the other player's."
        }, {
            tag: null,
            html: "Both shipped under 0.1.0, before the version was being raised."
        }, {
            tag: null,
            html: "The first public build, at <a href=\"https://bootsandbullets.com\" target=\"_blank\" rel=\"noopener noreferrer\">bootsandbullets.com</a>."
        }, {
            tag: null,
            html: "Fifty-odd missions, the Challenges, the Armoury, and two-player multiplayer."
        }]
    }],
    Z2 = {
        mud: {
            speed: 0.75
        },
        TILE: 16,
        STEP_HZ: 60,
        MAX_STEPS_PER_FRAME: 5,
        movement: {
            slotArrived: 2.5,
            slotStuckSpeed: 6,
            slotStuckTrigger: 0.7,
            enemyArrived: 9,
            enemyStuckSpeed: 6,
            enemyStuckTrigger: 0.55
        },
        restartDelay: 2.4,
        countdown: {
            beat: 1,
            match: 3,
            nameBeat: 1,
            fill: 0.25
        },
        soldier: {
            orderMarkerTime: 0.6,
            radius: 3.4,
            speed: 74,
            separation: 1.6,
            separationRadius: 15,
            formationSpacing: 18,
            formationJitter: 5,
            accel: 900,
            iceAccel: 0.16,
            manualRange: 2,
            manualFan: 12,
            engageBuffer: 10,
            autoEngage: true,
            autoEngageRange: 0.68
        },
        veteran: {
            spread: 0.55,
            fireInterval: 0.84
        },
        swim: {
            cost: 4,
            wadeCost: 2.5
        },
        hostage: {
            radius: 3.2,
            speed: 66,
            freeRadius: 14,
            followDistance: 16,
            deliverRadius: 18,
            routeInterval: 0.5,
            swimCost: 3
        },
        critter: {
            radius: 2.4,
            speed: 34,
            wanderRadius: 40,
            wanderMax: 4,
            peckPause: [0.8, 2.6],
            scatter: 22,
            perFlock: 2,
            flockSpacing: 160,
            mineClearance: 24,
            bloodParticles: 5,
            cohesion: 0.6,
            strayRadius: 48,
            dashEvery: [8, 20],
            dashTime: 1.2,
            dashSpeed: 70,
            startleRadius: 90,
            fleeTime: 1.6,
            noticeRadius: 24
        },
        birds: {
            count: [2, 5],
            life: 0.9,
            rise: [58, 92],
            fan: 46,
            drift: 22,
            spread: 18,
            levelOff: 1.6,
            flap: 9,
            farShare: 0.4,
            stagger: 0.22,
            reach: 56,
            trees: 1,
            settle: 12,
            copse: 4,
            openFor: 0.35,
            quiet: 40
        },
        extraction: {
            radius: 46
        },
        crate: {
            radius: 5,
            blastRadius: 40
        },
        supply: {
            radius: 8
        },
        barrel: {
            radius: 5,
            blastRadius: 68
        },
        mine: {
            radius: 6,
            triggerRadius: 7,
            critterTrigger: true,
            blastRadius: 30,
            chainRadius: 56,
            fuse: 0.35
        },
        bullet: {
            speed: 430,
            life: 1.1,
            radius: 1.2,
            muzzle: 4.5
        },
        cover: {
            overReach: 24,
            chance: 0.4,
            seekRadius: 128,
            relook: 1.5,
            arrive: 4
        },
        grenade: {
            flightTime: 0.62,
            blastRadius: 34,
            startingCount: 2,
            perCrate: 3,
            throwRange: 150,
            cooldown: 0.7
        },
        blast: {
            lethal: 0.48,
            knockback: 260,
            stagger: 0.55,
            drag: 6
        },
        body: {
            rise: 11,
            drop: 1,
            radius: 3.2
        },
        callin: {
            uses: 1,
            dropAt: 1.6,
            chuteTime: 3.2,
            done: 6,
            planeSpeed: 190,
            altitude: 140,
            bombRadius: 85,
            reserves: 2
        },
        smoke: {
            radius: 88,
            life: 24,
            concealment: 0.04,
            sightFloor: 1,
            shape: {
                growUntil: 0.075,
                disperseFrom: 0.72,
                disperseTo: 0.667
            },
            rimFade: 0.25,
            thinBelow: 3
        },
        flashbang: {
            blastRadius: 88,
            stagger: 4,
            lightLife: 0.7,
            knockback: 70,
            dizzyAbove: 0.9
        },
        building: {
            smokeDuration: 22,
            hutHp: 60,
            factoryHp: 140,
            bulletDamage: 1,
            scratchFraction: 0.1,
            blastDamage: 45,
            spawnInterval: 7.5,
            maxSpawned: 3,
            spawnAggroRange: 260
        },
        wave: {
            lead: 22,
            interval: 22,
            first: 5,
            growth: 0.45,
            sizeRange: [0.6, 2.2],
            pace: 0.4,
            hideRadius: 190,
            fan: 200
        },
        skirmish: {
            seconds: 180,
            squad: 3,
            fog: 160,
            think: 2.2,
            contactThink: 0.4,
            bound: 130,
            sense: 150,
            memory: 8,
            flankChance: 0.3,
            flankOffset: 72,
            grenadeCluster: 26,
            retreatDeficit: 2
        },
        autopilot: {
            think: 0.75,
            reissueDistance: 40,
            engageReach: 1,
            releaseReach: 1.15,
            grenadeCluster: 2,
            crateOnTheWay: 64,
            crateOnTheWayPatience: 15,
            dryRouteSwimCost: 3,
            penClearance: 110,
            lureDistance: 250,
            provokeDistance: 170,
            provokeCreep: 6,
            provokePatience: 22,
            rescueCloseTo: 0.8,
            strayDistance: 120,
            sidestepReach: 340,
            sidestep: 72,
            retreatAfter: 2,
            stallAfter: 6,
            stallDistance: 24
        },
        arena: {
            loneSpread: 90,
            musterSpread: 72,
            squadSize: 4,
            musterTimeout: 12,
            maxAlive: 18,
            retargetInterval: 4,
            influenceCell: 4,
            influenceRadius: 6,
            influenceInterval: 0.25,
            tensionThreshold: 0.6,
            paceRange: [0.72, 1.35],
            driftAfter: 3,
            zoomBias: 0,
            kit: {
                guns: [{
                    id: "enemyRifle",
                    weight: 50
                }, {
                    id: "smg",
                    weight: 20
                }, {
                    id: "shotgun",
                    weight: 15
                }, {
                    id: "bazooka",
                    weight: 10
                }, {
                    id: "sniperRifle",
                    weight: 5
                }],
                throwables: [{
                    id: "frag",
                    weight: 60
                }, {
                    id: "smoke",
                    weight: 20
                }, {
                    id: "flash",
                    weight: 20
                }]
            }
        }
    },
    Q2 = {
        enemy: {
            radius: 3.4,
            speed: 52,
            separation: 1.5,
            separationRadius: 11,
            accel: 700,
            iceAccel: 0.16,
            aggroRadius: 132,
            reactionTime: 0.42,
            alertMemory: 5,
            senseInterval: 0.08,
            herdFieldInterval: 0.5,
            deathAlarm: 0.55,
            deathAlarmLead: 56,
            woundChance: 0.14,
            bleedOut: 30,
            triggerHappy: {
                rate: 0.5,
                spread: 2
            },
            screamInterval: 2.6,
            woundAlarm: 0.7,
            woundCries: 2,
            impactAlarm: 0.7,
            impactAlarmFloor: 190,
            alarmCap: 2,
            alarmCapNear: 6,
            alarmNearRadius: 72,
            hearingJitter: 0.25,
            shoutCooldown: 6,
            shoutRadius: 100,
            noticeSpread: 2.1,
            glanceHold: 1.6,
            stepNoise: 150,
            stepInterval: 0.55,
            preferredRange: 70,
            patrolRadius: 46,
            patrolPause: [1.2, 3],
            fidgetPause: [1.1, 3.4],
            fidgetRange: 26,
            rootedFidget: 0.25,
            flankScale: 46,
            foresightJitter: 0.33,
            swimCostJitter: 0.5,
            swimCostBase: 1.5,
            smokeCostBase: 0.6,
            lookAheadInterval: 0.34,
            rushRange: 26,
            cowardRange: 1.8,
            searchTime: 2.6,
            searchSpread: 30,
            trailMemory: 6,
            pursuitLeash: 208,
            alert: {
                duration: 14,
                fade: 5,
                sight: 0.35,
                hearing: 0.5,
                reaction: 0.55,
                exclaim: 1.1,
                sensitivity: 1,
                nearMiss: 10,
                bodySight: 0.8,
                blastHold: 120,
                bodiesKept: 48
            },
            flanking: {
                keepOut: 0.75,
                minDistance: 160,
                fieldSteps: 90,
                maxTime: 14,
                arrived: 14,
                breakOff: 110,
                driftBase: 0.3,
                driftPerFlank: 0.35,
                widePerFlank: 0.3,
                wideCooldown: 25,
                driftCooldown: 10,
                drift: {
                    ring: 150,
                    bearings: [35, 55],
                    minTurn: 25,
                    ratio: 1.3,
                    extra: 160,
                    tries: 2
                },
                wide: {
                    ring: 210,
                    bearings: [90, 135, 180],
                    minTurn: 65,
                    ratio: 1.8,
                    extra: 400,
                    tries: 3
                }
            },
            grenadeRange: 118,
            grenadeMinRange: 34,
            grenadeMinCluster: 2,
            grenadeCooldown: 4.5,
            grenadeCount: 2
        },
        sniper: {
            speed: 34,
            aggroRadius: 210,
            reactionTime: 0.85,
            preferredRange: 165
        },
        officer: {
            speed: 38,
            aggroRadius: 140,
            reactionTime: 0.6,
            preferredRange: 80
        },
        bazooka: {
            speed: 44,
            aggroRadius: 150,
            reactionTime: 0.7,
            preferredRange: 105
        },
        camping: {
            stillRadius: 90,
            movingSpeed: 14,
            huntFrom: 2,
            cap: 4,
            relief: 0.55,
            settle: 2,
            spawnBoost: 0.45,
            hearingBoost: 0.5
        }
    },
    Tl = {
        economy: {
            startingBonds: 0,
            startingSquadCapacity: 3,
            income: {
                kill: 0,
                completion: 15,
                survivor: 3,
                crate: 0,
                package: 10
            },
            difficultyBonus: {
                rookie: 1,
                veteran: 1.25,
                elite: 1.5
            },
            zoneStars: {
                jungle: 0,
                desert: 6,
                arctic: 15
            },
            prices: {
                smg: 50,
                shotgun: 600,
                sniperRifle: 1100,
                frag: 20,
                smoke: 30,
                flashbang: 40,
                supplyDrop: 60,
                airstrike: 120,
                reinforcements: 150,
                squadSlot4: 250,
                squadSlot5: 750,
                squadSlot6: 1500
            }
        }
    },
    Wl = {
        camera: {
            zoom: {
                targetWorldW: 320,
                targetWorldH: 200,
                minWorldW: 240,
                minWorldH: 150,
                idealWorldW: 430,
                idealWorldH: 270,
                autoMax: 4,
                min: 2,
                max: 6,
                start: 3
            },
            follow: 4.5,
            deadzone: 26,
            focus: "commanded",
            stragglerDistance: 64,
            clusterRadius: 56,
            edgeMargin: 48,
            edgeSpeed: 420,
            touchHold: 1.6
        },
        controls: {
            marchStep: 48,
            marchRepeat: 0.15
        },
        timing: {
            frontFade: 320,
            commsExit: 340,
            bootFade: 400,
            dispatchFade: 180,
            calloutPop: 280,
            calloutBob: 900
        },
        music: {
            fade: 700
        },
        banner: {
            rise: 0.55,
            hold: 1.9,
            fade: 0.4,
            fill: 0.5
        },
        fx: {
            bloodParticles: 22,
            deathTime: 0.34,
            explosionParticles: 26,
            blastCluster: 5,
            blastSpread: 0.55,
            blastStagger: 0.05,
            decals: true,
            decalLife: 30,
            decalFade: 8,
            printStride: 12.8,
            printSpeed: 8,
            screenShake: 5,
            popupLife: 1.6,
            waveNoticeInterval: 1.6,
            popupRise: 15
        },
        wind: {
            speed: 1.15,
            amplitude: 1.35,
            gustSpeed: 0.27,
            gustScale: 0.006
        },
        shore: {
            cell: 16,
            moving: 0.34,
            movingShallow: 0.22,
            periodMin: 1.2,
            periodMax: 2.4,
            wetAt: 0.46,
            reachAt: 0.74
        },
        fog: {
            unexplored: 0.94,
            remembered: 0.55
        }
    },
    el = {
        audio: {
            enabled: true,
            maxVoices: 24,
            ambience: {
                level: 0.5,
                water: 0.28,
                wind: 0.4,
                rustle: 0.3,
                insects: 0.14,
                birds: 0.5,
                waterRange: 6,
                foliageRange: 5,
                ramp: 0.3,
                tick: 0.1,
                birdMinGap: 2.5,
                birdMaxGap: 9,
                scareTime: 8,
                birdRecover: 2.5
            }
        }
    },
    tl = {
        demand: {
            current: "FULL_GAME_PRICE_V1",
            experiments: [{
                id: "FULL_GAME_PRICE_V1",
                variants: [{
                    id: 'A',
                    priceCents: 499,
                    offerKey: "full_game",
                    weight: 1
                }, {
                    id: 'B',
                    priceCents: 999,
                    offerKey: "full_game",
                    weight: 1
                }, {
                    id: 'C',
                    priceCents: 1499,
                    offerKey: "full_game",
                    weight: 1
                }]
            }]
        }
    },
    nl = {
        dispatch: {
            quietUntilCleared: 3,
            everyMissions: 3,
            askAgainAfter: 5,
            maxSkips: 2,
            onePerSession: true,
            armouryQuietDays: 5,
            declinedQuietDays: 30,
            offerMinPlaySeconds: 1200,
            offerMinCompleted: 3
        }
    },
    ol = {
        onboarding: {
            nudgeUntilOrder: 4,
            nudgeAfter: 180,
            nudgeEvery: 120,
            nudgeMax: 2,
            veteranAfterClears: 5,
            harderFrom: 3,
            harderTo: 5,
            arrowsBelow: 3,
            arrowsAfter: 180
        }
    },
    _T = {
        assaultRifle: {
            fireRange: 80,
            fireInterval: 0.34,
            spread: 0.055
        },
        basicRifle: {
            fireRange: 160,
            fireInterval: 0.55,
            spread: 0.05,
            bulletLife: 0.8
        },
        smg: {
            fireRange: 56,
            fireInterval: 0.28,
            spread: 0.03
        },
        shotgun: {
            fireRange: 176,
            fireInterval: 0.9,
            spread: 0.26,
            pellets: 5,
            bulletLife: 0.44,
            autoEngage: 0.95
        },
        enemyRifle: {
            fireRange: 88,
            fireInterval: 0.72,
            spread: 0.16
        },
        sniperRifle: {
            fireRange: 190,
            fireInterval: 1.9,
            spread: 0.02
        },
        pistol: {
            fireRange: 96,
            fireInterval: 1.5,
            spread: 0.05
        },
        fists: {
            fireRange: 16,
            fireInterval: 0.8,
            spread: 0,
            melee: true
        },
        bazooka: {
            fireRange: 128,
            fireInterval: 2.4,
            spread: 0.07,
            rocket: {
                speed: 132,
                blastRadius: 26,
                life: 2.4
            }
        }
    },
    uW = c => _T[c],
    f = {
        ...Wl,
        ...Z2,
        ...Q2,
        ...Tl,
        ...el,
        ...tl,