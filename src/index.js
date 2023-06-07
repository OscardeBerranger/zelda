import kaboom from "kaboom";
// Start game
kaboom()
setBackground(Color.fromHex('#489848'))
//forest
loadSpriteAtlas("https://i.imgur.com/Em1jqfW.png", {
    'grass': {
        x:798,
        y:444,
        width: 24,
        height: 24,
    },
    'grass-with-twig': {
        x:799,
        y:424,
        width: 24,
        height: 24,
    },
    'house-wall': {
        x:1309,
        y:223,
        width: 24,
        height: 24,
    },
    'house-roof': {
        x:1307,
        y:199,
        width: 24,
        height: 24,
    },
    'house-door': {
        x:1336,
        y:225,
        width: 24,
        height: 24,
    },
    'fence': {
        x:1356,
        y:274,
        width: 24,
        height: 24,
    },
    'left-wall': {
        x:798,
        y:444,
        width: 24,
        height: 24,
    },
    'right-wall': {
        x:1332,
        y:477,
        width: 24,
        height: 24,
    },
    'top-wall': {
        x:1391,
        y:109,
        width: 24,
        height: 24,
    },
    'bottom-wall': {
        x:693,
        y:887,
        width: 24,
        height: 24,
    },
    'door': {
        x:1320,
        y:109,
        width: 24,
        height: 24,
    },
    'path': {
        x:801,
        y:147,
        width: 24,
        height: 24,
    },
    'top-left-path': {
        x:785,
        y:135,
        width: 24,
        height: 24,
    },
    'bottom-left-path': {
        x:785,
        y:158,
        width: 24,
        height: 24,
    },

})
//Kakariko
loadSpriteAtlas("https://i.imgur.com/2Yh36In.png", {

})
//enemies
loadSpriteAtlas("https://i.imgur.com/xbiVp0h.png", {
    'orc-enemy': {
        x:120,
        y:318,
        width: 23,
        height: 32,
    },
    "slicer": {
        x:40,
        y:42,
        width: 24,
        height: 24,
    }
})
//player
loadSpriteAtlas("https://i.imgur.com/74zPnnl.png", {
    'link-right': {
        x:2,
        y:925,
        width: 1186,
        height: 116,
        sliceX: 10,
        anims: {
            "run": {from: 0, to: 9, speed: 15}
        },
    },
    'link-left': {
        x:4,
        y:664,
        width: 1186,
        height: 116,
        sliceX: 10,
        anims: {
            "run": {from: 0, to: 9, speed: 15}
        },
    },
    'link-idle': {
        x:7,
        y:13,
        width: 240,
        height: 116,
        sliceX: 2,
        anims: {
            "idle": {from: 0, to: 1, speed: 3, loop: true}
        }
    },
    'link-up': {
        x:7,
        y:780,
        width: 1198,
        height: 122,
        sliceX: 10,
        anims: {
            "run": {from: 0, to: 9, speed: 15, loop: true}
        },
    },
    'link-down': {
        x: 18,
        y: 528,
        width: 1196,
        height: 122,
        sliceX: 10,
        anims: {
            "run": {from: 0, to: 9, speed: 15, loop: true}
        },
    },
    'link': {
        x:7,
        y:13,
        width: 240,
        height: 116,
        sliceX: 2,
        anims: {
            "idle": {from: 0, to: 1, speed: 3, loop: true}
        },
    },
})


const SPEED = 450
const ENEMY_SPEED = 160
const BULLET_SPEED = 800


scene("temp", ()=>{
    const level = addLevel([], {
        tileWidth: 48,
        tileHeight: 48,
        pos: vec2(50, 50),

    })

// Get the player object from tag
//     const player = level.get("player")[0]
    const player = add([
        sprite('link'),
        pos(400, 500),
        scale(0.5),
    ])
// Movements
    function setSprite(player, spriteName) {
        if (player.currentSprite !== spriteName) {
            player.use(sprite(spriteName))
            player.currentSprite = spriteName
        }
    }
    onKeyDown("left", () => {
        if (player.curAnim()!=="run"){
            player.flipX = false
            setSprite(player, "link-side")
            player.play("run")
        }
        player.move(-SPEED, 0)
    })
    onKeyDown("right", () => {
        if (player.curAnim()!=="run"){
            player.flipX = true
            setSprite(player, "link-side")
            player.play("run")
        }
        player.move(SPEED, 0)
    })
    onKeyDown("up", () => {
        if (player.curAnim()!=="run"){
            player.flipX = false
            setSprite(player, "link-up")
            player.play("run")
        }
        player.move(0, -SPEED)
    })
    onKeyDown("down", () => {
        if (player.curAnim()!=="run"){
            player.flipX = false
            setSprite(player, "link-down")
            player.play("run")
        }
        player.move(0, SPEED)
    })
    ;["left", "right", "up", "down"].forEach((key)=>{
        onKeyRelease(key, ()=>{
            if (
                !isKeyDown("left")
                && !isKeyDown("right")
                && !isKeyDown("up")
                && !isKeyDown("down")
            ) {
                setSprite(player, "link-idle")
                if (player.curAnim()!=="idle"){
                    player.play("idle")
                }
            }
        })
    })

    onCollide('player', 'door', ()=>{
        go("secondZone", {})
    })
})
scene("spawn", ()=>{
    const map = [
        addLevel([
            "]______________________________d_____________________________[",
            "]                                                            [",
            "]          t                                                 [",
            "]                                              t             [",
            "]                        t                                   [",
            "]                    t                                       [",
            "]                                                            [",
            "]                        t                                   [",
            "]                                                            [",
            "]                                          t                 [",
            "]                                                            [",
            "]      tt             t                               t      [",
            "]       tt                          t                        [",
            "]                                                            [",
            "]                                                            [",
            "]                       t           t                        [",
            "]                                                   t        [",
            "]     t                                                      [",
            "]                                                            [",
            "]                                                            [",
            "]                               t                            [",
            "]               t                                            [",
            "]                                             t  t           [",
            "]                                                            [",
            "]              t                    t                        [",
            "]                                                            [",
            "]                                                            [",
            "]                      t                  t                  [",
            "]                                                            [",
            "]         t                                                  [",
            "]                                                            [",
            "]                                                            [",
            "]                  t                                         [",
            "]                                                            [",
            "]                                                            [",
            "]============================================================[",
        ], {
            tileWidth: 24,
            tileHeight: 24,
            pos: vec2(50, 50),

            tiles: {
                "]": ()=>[
                    sprite("left-wall"),
                    area(),
                    body({ isStatic: true }),
                    anchor("bot"),
                    'left-wall',
                ],
                "[": ()=>[
                    sprite("right-wall"),
                    area(),
                    body({ isStatic: true }),
                    anchor("bot"),
                    'right-wall',
                ],
                "=": ()=>[
                    sprite("bottom-wall"),
                    area(),
                    body({ isStatic: true }),
                    anchor("bot"),
                    'bottom-wall',
                ],
                "-": ()=>[
                    sprite("grass"),
                ],
                "t": ()=>[
                    sprite("grass-with-twig"),
                ],
                "_": ()=>[
                    sprite("top-wall"),
                    area(),
                    body({ isStatic: true }),
                    anchor("bot"),
                    'top-wall',
                ],
                "d": ()=>[
                    sprite("door"),
                    area(),
                    body({ isStatic: true }),
                    anchor("bot"),
                    'door',
                ],
            }
        })
    ]


// Get the player object from tag
//     const player = level.get("player")[0]
    const player = add([
        sprite('link'),
        pos(400, 500),
        area(),
        body(),
        anchor("center"),
        health(3),
        scale(0.5),
        'player'
    ])

// Movements
    function setSprite(player, spriteName) {
        if (player.currentSprite !== spriteName) {
            player.use(sprite(spriteName))
            player.currentSprite = spriteName
        }
    }
    onKeyDown("left", () => {
        if (player.curAnim()!=="run"){
            player.flipX = false
            setSprite(player, "link-left")
            player.play("run")
        }
        player.move(-SPEED, 0)
    })
    onKeyDown("right", () => {
        if (player.curAnim()!=="run"){
            player.flipX = false
            setSprite(player, "link-right")
            player.play("run")
        }
        player.move(SPEED, 0)
    })
    onKeyDown("up", () => {
        if (player.curAnim()!=="run"){
            player.flipX = false
            setSprite(player, "link-up")
            player.play("run")
        }
        player.move(0, -SPEED)
    })
    onKeyDown("down", () => {
        if (player.curAnim()!=="run"){
            player.flipX = false
            setSprite(player, "link-down")
            player.play("run")
        }
        player.move(0, SPEED)
    })
    ;["left", "right", "up", "down"].forEach((key)=>{
        onKeyRelease(key, ()=>{
            if (
                !isKeyDown("left")
                && !isKeyDown("right")
                && !isKeyDown("up")
                && !isKeyDown("down")
            ) {
                setSprite(player, "link-idle")
                if (player.curAnim()!=="idle"){
                    player.play("idle")
                }
            }
        })
    })

    onCollide('player', 'door', ()=>{
        go("secondZone", {})
    })
})
scene("secondZone", ()=>{
    const level = addLevel([
        "]____________________________________________________________[",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                              2             [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                 s                                          [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]                                                            [",
        "]============================================================[",
    ], {
        tileWidth: 24,
        tileHeight: 24,
        pos: vec2(50, 50),

        tiles: {
            "]": ()=>[
                sprite("left-wall"),
                area(),
                body({ isStatic: true }),
                anchor("bot"),
                'left-wall',
            ],
            "[": ()=>[
                sprite("right-wall"),
                area(),
                body({ isStatic: true }),
                anchor("bot"),
                'right-wall',
            ],
            "=": ()=>[
                sprite("bottom-wall"),
                area(),
                body({ isStatic: true }),
                anchor("bot"),
                'bottom-wall',
            ],
            "_": ()=>[
                sprite("top-wall"),
                area(),
                body({ isStatic: true }),
                anchor("bot"),
                'top-wall',
            ],
            "s": ()=>[
                sprite("slicer"),
                area(),
                anchor("center"),
                body({isStatic: true}),
                state("move", [ "idle", "attack", "move" ]),
                { dir: -1 },
                scale(2.5),
                'slicer',
            ],
            "2": ()=>[
                sprite("slicer"),
                area(),
                anchor("center"),
                body({isStatic: true}),
                state("move", [ "idle", "attack", "move" ]),
                { dir: 1 },
                scale(2.5),
                'slicer',
            ],
        }
    })

// Get the player object from tag
//     const player = level.get("player")[0]
    const player = add([
        sprite('link'),
        pos(400, 500),
        area(),
        body(),
        anchor("center"),
        health(3),
        scale(0.5),
        'player'
    ])
    const slicer = level.get("slicer")
    onCollide('player', 'slicer', (e)=>{
        destroy(player)
        go("lose")
    })
    player.on("death", () => {
        destroy(player)
        go("lose")
    })

    setInterval(mooveSlicer, 1)
    function mooveSlicer(e = slicer){

        for (let i = 0; i < slicer.length; i++) {
            let f = e[i]
            f.move(f.dir*150, 0)
            onCollide('slicer', 'left-wall', (f)=>{
                f.dir = 1
            })
            onCollide('slicer', 'right-wall', (f)=>{
                f.dir = -1
            })
        }
    }
// Movements
    function setSprite(player, spriteName) {
        if (player.currentSprite !== spriteName) {
            player.use(sprite(spriteName))
            player.currentSprite = spriteName
        }
    }
    onKeyDown("left", () => {
        if (player.curAnim()!=="run"){
            player.flipX = false
            setSprite(player, "link-left")
            player.play("run")
        }
        player.move(-SPEED, 0)
    })
    onKeyDown("right", () => {
        if (player.curAnim()!=="run"){
            player.flipX = false
            setSprite(player, "link-right")
            player.play("run")
        }
        player.move(SPEED, 0)
    })
    onKeyDown("up", () => {
        if (player.curAnim()!=="run"){
            player.flipX = false
            setSprite(player, "link-up")
            player.play("run")
        }
        player.move(0, -SPEED)
    })
    onKeyDown("down", () => {
        if (player.curAnim()!=="run"){
            player.flipX = false
            setSprite(player, "link-down")
            player.play("run")
        }
        player.move(0, SPEED)
    })
    ;["left", "right", "up", "down"].forEach((key)=>{
        onKeyRelease(key, ()=>{
            if (
                !isKeyDown("left")
                && !isKeyDown("right")
                && !isKeyDown("up")
                && !isKeyDown("down")
            ) {
                setSprite(player, "link-idle")
                if (player.curAnim()!=="idle"){
                    player.play("idle")
                }
            }
        })
    })

    onCollide('player', 'door', ()=>{
        go("secondZone", {})
    })
})
scene("win", () => {
    add([
        text("You Win!"),
        pos(width() / 2, height() / 2),
        anchor("center"),
    ])
})
scene("lose", () => {
    add([
        text("You died!"),
        pos(width() / 2, height() / 2),
        anchor("center"),
    ])
})
function start() {
    // Start with the "game" scene, with initial parameters
    go("spawn", {})
}

start()