// Changelog data
// Version history (`x`): releases, dates, FEATURE/FIX entries — version 0.3.0, 2026-09-12.
}(a, 0xa43c3));
var B5 = Object["defineProperty"],
    J2 = (c, d) => {
        for (var g in d) B5(c, g, {
            'get': d[g],
            'enumerable': !0x0
        });
    },
    x = [{
        'version': "0.3.0",
        'date': "2026-09-12",
        'entries': [{
            'tag': "FEATURE",
            'html': "Chicken Dinner: two hundred hens, against the clock."
        }, {
            'tag': "FEATURE",
            'html': "New maps: North Station, Snipers' Alley and Convoy Down."
        }, {
            'tag': "FEATURE",
            'html': "Private Enterprise and Rubber Division join the campaign."
        }, {
            'tag': "FEATURE",
            'html': "Enemies flank you when there is a way round."
        }, {
            'tag': "FEATURE",
            'html': "Hidden triggers bring more men when you step in."
        }, {
            'tag': "FEATURE",
            'html': "Buy grenades straight from the briefing."
        }, {
            'tag': "FEATURE",
            'html': "Win, and Replay offers the next difficulty up."
        }, {
            'tag': "FEATURE",
            'html': "Rate each map from the result panel."
        }, {
            'tag': "FEATURE",
            'html': "The version number opens the list of what shipped."
        }, {
            'tag': "IMPROVEMENT",
            'html': "Long grass hides men up to the shoulders."
        }, {
            'tag': "IMPROVEMENT",
            'html': "Sandbags stop fire, and some enemies fight from them."
        }, {
            'tag': "IMPROVEMENT",
            'html': "Salt ridges, mud and scenery across the campaign maps."
        }, {
            'tag': "IMPROVEMENT",
            'html': "The SMG now outshoots the gun above it."
        }, {
            'tag': "IMPROVEMENT",
            'html': "Grenade blasts throw harder."
        }, {
            'tag': "IMPROVEMENT",
            'html': "The shoreline moves and your squad leaves tracks."
        }, {
            'tag': "FIX",
            'html': "Hostages no longer freeze beside deep water or walls."
        }, {
            'tag': "FIX",
            'html': "A slightly dragged click still counts as a move."
        }, {
            'tag': "FIX",
            'html': "The Armoury no longer starts the mission behind itself."
        }]
    }, {
        'version': "0.2.0",
        'date': "2026-09-09",
        'entries': [{
            'tag': "FEATURE",
            'html': "You can change the keys, on a KEYS settings page."
        }, {
            'tag': "FEATURE",
            'html': "A shot near the trees sends birds up."
        }, {
            'tag': "FEATURE",
            'html': "You can switch auto fire off in the campaign."
        }, {
            'tag': "IMPROVEMENT",
            'html': "The camera follows the men who are actually moving."
        }, {
            'tag': "IMPROVEMENT",
            'html': "Scroll the view and it stays where you put it."
        }, {
            'tag': "IMPROVEMENT",
            'html': "The aiming cursor is a sight with a dark outline."
        }, {
            'tag': "IMPROVEMENT",
            'html': "Held fire fans across a tile, not one pixel."
        }, {
            'tag': "IMPROVEMENT",
            'html': "The feedback card asks twice, then stops asking."
        }, {
            'tag': "FIX",
            'html': "No enemy is placed where you cannot reach him."
        }]
    }, {
        'version': "0.1.4",
        'date': "2026-09-08",
        'entries': [{
            'tag': "IMPROVEMENT",
            'html': "The Herd is a valley with room to fall back."
        }, {
            'tag': "FIX",
            'html': "Even the fastest zombies are slower than your soldiers."
        }]
    }, {
        'version': "0.1.3",
        'date': "2026-09-08",
        'entries': [{
            'tag': "IMPROVEMENT",
            'html': "The Mission Accomplished panel is shorter and clearer."
        }, {
            'tag': "IMPROVEMENT",
            'html': "A new star blinks and throws sparks, then settles."
        }, {
            'tag': "IMPROVEMENT",
            'html': "A gun you have not bought says NOT PURCHASED."
        }, {
            'tag': "IMPROVEMENT",
            'html': "The mission sidebar reads top to bottom, in sections."
        }, {
            'tag': "FEATURE",
            'html': "You hear it when somebody takes the other seat."
        }, {
            'tag': "FIX",
            'html': "The settings sheet keeps one height on every tab."
        }]
    }, {
        'version': "0.1.2",
        'date': "2026-09-08",
        'entries': [{
            'tag': "FEATURE",
            'html': "The game now reports itself when it breaks."
        }, {
            'tag': "IMPROVEMENT",
            'html': "Feedback and the full-game form reach us again."
        }]
    }, {
        'version': "0.1.1",
        'date': "2026-09-07",
        'entries': [{
            'tag': "IMPROVEMENT",
            'html': "The version is shown at the foot of the intro."
        }]
    }, {
        'version': "0.1.0",
        'date': "2026-09-07",
        'entries': [{
            'tag': "FIX",
            'html': "PLAY NOW continues the campaign, and never offers a Challenge."
        }, {
            'tag': "FIX",
            'html': "Multiplayer opens on your own squad, not the other player's."
        }, {
            'tag': null,
            'html': "Both shipped under 0.1.0, before the version was being raised."
        }, {
            'tag': null,
            'html': "The first public build, at <a href=\"https://bootsandbullets.com\" target=\"_blank\" rel=\"noopener noreferrer\">bootsandbullets.com</a>."
        }, {
            'tag': null,
            'html': "Fifty-odd missions, the Challenges, the Armoury, and two-player multiplayer."
        }]
    }],
    Z2 = {
        'mud': {
            'speed': 0.75
        },
        'TILE': 0x10,
        'STEP_HZ': 0x3c,
        'MAX_STEPS_PER_FRAME': 0x5,
        'movement': {
            'slotArrived': 2.5,
            'slotStuckSpeed': 0x6,
            'slotStuckTrigger': 0.7,
            'enemyArrived': 0x9,
            'enemyStuckSpeed': 0x6,
            'enemyStuckTrigger': 0.55
        },
        'restartDelay': 2.4,
        'countdown': {
            'beat': 0x1,
            'match': 0x3,
            'nameBeat': 0x1,
            'fill': 0.25
        },
        'soldier': {
            'orderMarkerTime': 0.6,
            'radius': 3.4,
            'speed': 0x4a,
            'separation': 1.6,
            'separationRadius': 0xf,
            'formationSpacing': 0x12,
            'formationJitter': 0x5,
            'accel': 0x384,
            'iceAccel': 0.16,
            'manualRange': 0x2,
            'manualFan': 0xc,
            'engageBuffer': 0xa,
            'autoEngage': !0x0,
            'autoEngageRange': 0.68
        },
        'veteran': {
            'spread': 0.55,
            'fireInterval': 0.84
        },
        'swim': {
            'cost': 0x4,
            'wadeCost': 2.5
        },
        'hostage': {
            'radius': 3.2,
            'speed': 0x42,
            'freeRadius': 0xe,
            'followDistance': 0x10,
            'deliverRadius': 0x12,
            'routeInterval': 0.5,
            'swimCost': 0x3
        },
        'critter': {
            'radius': 2.4,
            'speed': 0x22,
            'wanderRadius': 0x28,
            'wanderMax': 0x4,
            'peckPause': [0.8, 2.6],
            'scatter': 0x16,
            'perFlock': 0x2,
            'flockSpacing': 0xa0,
            'mineClearance': 0x18,
            'bloodParticles': 0x5,
            'cohesion': 0.6,
            'strayRadius': 0x30,
            'dashEvery': [0x8, 0x14],
            'dashTime': 1.2,
            'dashSpeed': 0x46,
            'startleRadius': 0x5a,
            'fleeTime': 1.6,
            'noticeRadius': 0x18
        },
        'birds': {
            'count': [0x2, 0x5],
            'life': 0.9,
            'rise': [0x3a, 0x5c],
            'fan': 0x2e,
            'drift': 0x16,
            'spread': 0x12,
            'levelOff': 1.6,
            'flap': 0x9,
            'farShare': 0.4,
            'stagger': 0.22,
            'reach': 0x38,
            'trees': 0x1,
            'settle': 0xc,
            'copse': 0x4,
            'openFor': 0.35,
            'quiet': 0x28
        },
        'extraction': {
            'radius': 0x2e
        },
        'crate': {
            'radius': 0x5,
            'blastRadius': 0x28
        },
        'supply': {
            'radius': 0x8
        },
        'barrel': {
            'radius': 0x5,
            'blastRadius': 0x44
        },
        'mine': {
            'radius': 0x6,
            'triggerRadius': 0x7,
            'critterTrigger': !0x0,
            'blastRadius': 0x1e,
            'chainRadius': 0x38,
            'fuse': 0.35
        },
        'bullet': {
            'speed': 0x1ae,
            'life': 1.1,
            'radius': 1.2,
            'muzzle': 4.5
        },
        'cover': {
            'overReach': 0x18,
            'chance': 0.4,
            'seekRadius': 0x80,
            'relook': 1.5,
            'arrive': 0x4
        },
        'grenade': {
            'flightTime': 0.62,
            'blastRadius': 0x22,
            'startingCount': 0x2,
            'perCrate': 0x3,
            'throwRange': 0x96,
            'cooldown': 0.7
        },
        'blast': {
            'lethal': 0.48,
            'knockback': 0x104,
            'stagger': 0.55,
            'drag': 0x6
        },
        'body': {
            'rise': 0xb,
            'drop': 0x1,
            'radius': 3.2
        },
        'callin': {
            'uses': 0x1,
            'dropAt': 1.6,
            'chuteTime': 3.2,
            'done': 0x6,
            'planeSpeed': 0xbe,
            'altitude': 0x8c,
            'bombRadius': 0x55,
            'reserves': 0x2
        },
        'smoke': {
            'radius': 0x58,
            'life': 0x18,
            'concealment': 0.04,
            'sightFloor': 0x1,
            'shape': {
                'growUntil': 0.075,
                'disperseFrom': 0.72,
                'disperseTo': 0.667
            },
            'rimFade': 0.25,
            'thinBelow': 0x3
        },
        'flashbang': {
            'blastRadius': 0x58,
            'stagger': 0x4,
            'lightLife': 0.7,
            'knockback': 0x46,
            'dizzyAbove': 0.9
        },
        'building': {
            'smokeDuration': 0x16,
            'hutHp': 0x3c,
            'factoryHp': 0x8c,
            'bulletDamage': 0x1,
            'scratchFraction': 0.1,
            'blastDamage': 0x2d,
            'spawnInterval': 7.5,
            'maxSpawned': 0x3,
            'spawnAggroRange': 0x104
        },
        'wave': {
            'lead': 0x16,
            'interval': 0x16,
            'first': 0x5,
            'growth': 0.45,
            'sizeRange': [0.6, 2.2],
            'pace': 0.4,
            'hideRadius': 0xbe,
            'fan': 0xc8
        },
        'skirmish': {
            'seconds': 0xb4,
            'squad': 0x3,
            'fog': 0xa0,
            'think': 2.2,
            'contactThink': 0.4,
            'bound': 0x82,
            'sense': 0x96,
            'memory': 0x8,
            'flankChance': 0.3,
            'flankOffset': 0x48,
            'grenadeCluster': 0x1a,
            'retreatDeficit': 0x2
        },
        'autopilot': {
            'think': 0.75,
            'reissueDistance': 0x28,
            'engageReach': 0x1,
            'releaseReach': 1.15,
            'grenadeCluster': 0x2,
            'crateOnTheWay': 0x40,
            'crateOnTheWayPatience': 0xf,
            'dryRouteSwimCost': 0x3,
            'penClearance': 0x6e,
            'lureDistance': 0xfa,
            'provokeDistance': 0xaa,
            'provokeCreep': 0x6,
            'provokePatience': 0x16,
            'rescueCloseTo': 0.8,
            'strayDistance': 0x78,
            'sidestepReach': 0x154,
            'sidestep': 0x48,
            'retreatAfter': 0x2,
            'stallAfter': 0x6,
            'stallDistance': 0x18
        },
        'arena': {
            'loneSpread': 0x5a,
            'musterSpread': 0x48,
            'squadSize': 0x4,
            'musterTimeout': 0xc,
            'maxAlive': 0x12,
            'retargetInterval': 0x4,
            'influenceCell': 0x4,
            'influenceRadius': 0x6,
            'influenceInterval': 0.25,
            'tensionThreshold': 0.6,
            'paceRange': [0.72, 1.35],
            'driftAfter': 0x3,
            'zoomBias': 0x0,
            'kit': {
                'guns': [{
                    'id': "enemyRifle",
                    'weight': 0x32
                }, {
                    'id': "smg",
                    'weight': 0x14
                }, {
                    'id': "shotgun",
                    'weight': 0xf
                }, {
                    'id': "bazooka",
                    'weight': 0xa
                }, {
                    'id': "sniperRifle",
                    'weight': 0x5
                }],
                'throwables': [{
                    'id': "frag",
                    'weight': 0x3c
                }, {
                    'id': "smoke",
                    'weight': 0x14
                }, {
                    'id': "flash",
                    'weight': 0x14
                }]
            }
        }
    },
    Q2 = {
        'enemy': {
            'radius': 3.4,
            'speed': 0x34,
            'separation': 1.5,
            'separationRadius': 0xb,
            'accel': 0x2bc,
            'iceAccel': 0.16,
            'aggroRadius': 0x84,
            'reactionTime': 0.42,
            'alertMemory': 0x5,
            'senseInterval': 0.08,
            'herdFieldInterval': 0.5,
            'deathAlarm': 0.55,
            'deathAlarmLead': 0x38,
            'woundChance': 0.14,
            'bleedOut': 0x1e,
            'triggerHappy': {
                'rate': 0.5,
                'spread': 0x2
            },
            'screamInterval': 2.6,
            'woundAlarm': 0.7,
            'woundCries': 0x2,
            'impactAlarm': 0.7,
            'impactAlarmFloor': 0xbe,
            'alarmCap': 0x2,
            'alarmCapNear': 0x6,
            'alarmNearRadius': 0x48,
            'hearingJitter': 0.25,
            'shoutCooldown': 0x6,
            'shoutRadius': 0x64,
            'noticeSpread': 2.1,
            'glanceHold': 1.6,
            'stepNoise': 0x96,
            'stepInterval': 0.55,
            'preferredRange': 0x46,
            'patrolRadius': 0x2e,
            'patrolPause': [1.2, 0x3],
            'fidgetPause': [1.1, 3.4],
            'fidgetRange': 0x1a,
            'rootedFidget': 0.25,
            'flankScale': 0x2e,
            'foresightJitter': 0.33,
            'swimCostJitter': 0.5,
            'swimCostBase': 1.5,
            'smokeCostBase': 0.6,
            'lookAheadInterval': 0.34,
            'rushRange': 0x1a,
            'cowardRange': 1.8,
            'searchTime': 2.6,
            'searchSpread': 0x1e,
            'trailMemory': 0x6,
            'pursuitLeash': 0xd0,
            'alert': {
                'duration': 0xe,
                'fade': 0x5,
                'sight': 0.35,
                'hearing': 0.5,
                'reaction': 0.55,
                'exclaim': 1.1,
                'sensitivity': 0x1,
                'nearMiss': 0xa,
                'bodySight': 0.8,
                'blastHold': 0x78,
                'bodiesKept': 0x30
            },
            'flanking': {
                'keepOut': 0.75,
                'minDistance': 0xa0,
                'fieldSteps': 0x5a,
                'maxTime': 0xe,
                'arrived': 0xe,
                'breakOff': 0x6e,
                'driftBase': 0.3,
                'driftPerFlank': 0.35,
                'widePerFlank': 0.3,
                'wideCooldown': 0x19,
                'driftCooldown': 0xa,
                'drift': {
                    'ring': 0x96,
                    'bearings': [0x23, 0x37],
                    'minTurn': 0x19,
                    'ratio': 1.3,
                    'extra': 0xa0,
                    'tries': 0x2
                },
                'wide': {
                    'ring': 0xd2,
                    'bearings': [0x5a, 0x87, 0xb4],
                    'minTurn': 0x41,
                    'ratio': 1.8,
                    'extra': 0x190,
                    'tries': 0x3
                }
            },
            'grenadeRange': 0x76,
            'grenadeMinRange': 0x22,
            'grenadeMinCluster': 0x2,
            'grenadeCooldown': 4.5,
            'grenadeCount': 0x2
        },
        'sniper': {
            'speed': 0x22,
            'aggroRadius': 0xd2,
            'reactionTime': 0.85,
            'preferredRange': 0xa5
        },
        'officer': {
            'speed': 0x26,
            'aggroRadius': 0x8c,
            'reactionTime': 0.6,
            'preferredRange': 0x50
        },
        'bazooka': {
            'speed': 0x2c,
            'aggroRadius': 0x96,
            'reactionTime': 0.7,
            'preferredRange': 0x69
        },
        'camping': {
            'stillRadius': 0x5a,
            'movingSpeed': 0xe,
            'huntFrom': 0x2,
            'cap': 0x4,
            'relief': 0.55,
            'settle': 0x2,
            'spawnBoost': 0.45,
            'hearingBoost': 0.5
        }
    },
    Tl = {
        'economy': {
            'startingBonds': 0x0,
            'startingSquadCapacity': 0x3,
            'income': {
                'kill': 0x0,
                'completion': 0xf,
                'survivor': 0x3,
                'crate': 0x0,
                'package': 0xa
            },
            'difficultyBonus': {
                'rookie': 0x1,
                'veteran': 1.25,
                'elite': 1.5
            },
            'zoneStars': {
                'jungle': 0x0,
                'desert': 0x6,
                'arctic': 0xf
            },
            'prices': {
                'smg': 0x32,
                'shotgun': 0x258,
                'sniperRifle': 0x44c,
                'frag': 0x14,
                'smoke': 0x1e,
                'flashbang': 0x28,
                'supplyDrop': 0x3c,
                'airstrike': 0x78,
                'reinforcements': 0x96,
                'squadSlot4': 0xfa,
                'squadSlot5': 0x2ee,
                'squadSlot6': 0x5dc
            }
        }
    },
    Wl = {
        'camera': {
            'zoom': {
                'targetWorldW': 0x140,
                'targetWorldH': 0xc8,
                'minWorldW': 0xf0,
                'minWorldH': 0x96,
                'idealWorldW': 0x1ae,
                'idealWorldH': 0x10e,
                'autoMax': 0x4,
                'min': 0x2,
                'max': 0x6,
                'start': 0x3
            },
            'follow': 4.5,
            'deadzone': 0x1a,
            'focus': "commanded",
            'stragglerDistance': 0x40,
            'clusterRadius': 0x38,
            'edgeMargin': 0x30,
            'edgeSpeed': 0x1a4,
            'touchHold': 1.6
        },
        'controls': {
            'marchStep': 0x30,
            'marchRepeat': 0.15
        },
        'timing': {
            'frontFade': 0x140,
            'commsExit': 0x154,
            'bootFade': 0x190,
            'dispatchFade': 0xb4,
            'calloutPop': 0x118,
            'calloutBob': 0x384
        },
        'music': {
            'fade': 0x2bc
        },
        'banner': {
            'rise': 0.55,
            'hold': 1.9,
            'fade': 0.4,
            'fill': 0.5
        },
        'fx': {
            'bloodParticles': 0x16,
            'deathTime': 0.34,
            'explosionParticles': 0x1a,
            'blastCluster': 0x5,
            'blastSpread': 0.55,
            'blastStagger': 0.05,
            'decals': !0x0,
            'decalLife': 0x1e,
            'decalFade': 0x8,
            'printStride': 12.8,
            'printSpeed': 0x8,
            'screenShake': 0x5,
            'popupLife': 1.6,
            'waveNoticeInterval': 1.6,
            'popupRise': 0xf
        },
        'wind': {
            'speed': 1.15,
            'amplitude': 1.35,
            'gustSpeed': 0.27,
            'gustScale': 0.006
        },
        'shore': {
            'cell': 0x10,
            'moving': 0.34,
            'movingShallow': 0.22,
            'periodMin': 1.2,
            'periodMax': 2.4,
            'wetAt': 0.46,
            'reachAt': 0.74
        },
        'fog': {
            'unexplored': 0.94,
            'remembered': 0.55
        }
    },
    el = {
        'audio': {
            'enabled': !0x0,
            'maxVoices': 0x18,
            'ambience': {
                'level': 0.5,
                'water': 0.28,
                'wind': 0.4,
                'rustle': 0.3,
                'insects': 0.14,
                'birds': 0.5,
                'waterRange': 0x6,
                'foliageRange': 0x5,
                'ramp': 0.3,
                'tick': 0.1,
                'birdMinGap': 2.5,
                'birdMaxGap': 0x9,
                'scareTime': 0x8,
                'birdRecover': 2.5
            }
        }
    },
    tl = {
        'demand': {
            'current': "FULL_GAME_PRICE_V1",
            'experiments': [{
                'id': "FULL_GAME_PRICE_V1",
                'variants': [{
                    'id': 'A',
                    'priceCents': 0x1f3,
                    'offerKey': "full_game",
                    'weight': 0x1
                }, {
                    'id': 'B',
                    'priceCents': 0x3e7,
                    'offerKey': "full_game",
                    'weight': 0x1
                }, {
                    'id': 'C',
                    'priceCents': 0x5db,
                    'offerKey': "full_game",
                    'weight': 0x1
                }]
            }]
        }
    },
    nl = {
        'dispatch': {
            'quietUntilCleared': 0x3,
            'everyMissions': 0x3,
            'askAgainAfter': 0x5,
            'maxSkips': 0x2,
            'onePerSession': !0x0,
            'armouryQuietDays': 0x5,
            'declinedQuietDays': 0x1e,
            'offerMinPlaySeconds': 0x4b0,
            'offerMinCompleted': 0x3
        }
    },
    ol = {
        'onboarding': {
            'nudgeUntilOrder': 0x4,
            'nudgeAfter': 0xb4,
            'nudgeEvery': 0x78,
            'nudgeMax': 0x2,
            'veteranAfterClears': 0x5,
            'harderFrom': 0x3,
            'harderTo': 0x5,
            'arrowsBelow': 0x3,
            'arrowsAfter': 0xb4
        }
    },
    _T = {
        'assaultRifle': {
            'fireRange': 0x50,
            'fireInterval': 0.34,
            'spread': 0.055
        },
        'basicRifle': {
            'fireRange': 0xa0,
            'fireInterval': 0.55,
            'spread': 0.05,
            'bulletLife': 0.8
        },
        'smg': {
            'fireRange': 0x38,
            'fireInterval': 0.28,
            'spread': 0.03
        },
        'shotgun': {
            'fireRange': 0xb0,
            'fireInterval': 0.9,
            'spread': 0.26,
            'pellets': 0x5,
            'bulletLife': 0.44,
            'autoEngage': 0.95
        },
        'enemyRifle': {
            'fireRange': 0x58,
            'fireInterval': 0.72,
            'spread': 0.16
        },
        'sniperRifle': {
            'fireRange': 0xbe,
            'fireInterval': 1.9,
            'spread': 0.02
        },
        'pistol': {
            'fireRange': 0x60,
            'fireInterval': 1.5,
            'spread': 0.05
        },
        'fists': {
            'fireRange': 0x10,
            'fireInterval': 0.8,
            'spread': 0x0,
            'melee': !0x0
        },
        'bazooka': {
            'fireRange': 0x80,
            'fireInterval': 2.4,
            'spread': 0.07,
            'rocket': {
                'speed': 0x84,
                'blastRadius': 0x1a,
                'life': 2.4
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
