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
    'tube': {
        x:707,
        y:24,
        width: 44,
        height: 44,
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
    'door': {
        x:1320,
        y:109,
        width: 24,
        height: 24,
    },

})
//overworld
loadSpriteAtlas("https://i.imgur.com/E2hYydK.png", {
    'path-1': {
        x:687,
        y:833,
        width: 24,
        height: 24,
    },
    'path-2': {
        x:697,
        y:777,
        width: 24,
        height: 24,
    },
    'path-3': {
        x:712,
        y:813,
        width: 24,
        height: 24,
    },
    'path-left': {
        x:1000,
        y:441,
        width: 24,
        height: 24,
    },
    'path-right': {
        x:1148,
        y:530,
        width: 24,
        height: 24,
    },
    'path-bottom': {
        x:1173,
        y:505,
        width: 24,
        height: 24,
    },
    'path-top': {
        x:1094,
        y:1015,
        width: 24,
        height: 24,
    },
    //walls
    'left-wall': {
        x:540,
        y:948,
        width: 24,
        height: 24,
    },
    'right-wall': {
        x:33,
        y:983,
        width: 24,
        height: 24,
    },
    'top-wall': {
        x:676,
        y:1103,
        width: 24,
        height: 24,
    },
    'bottom-wall': {
        x:401,
        y:907,
        width: 24,
        height: 24,
    },
    'bottom-right-wall': {
        x:427,
        y:891,
        width: 24,
        height: 24,
    },
    'bottom-left-wall': {
        x:468,
        y:891,
        width: 24,
        height: 24,
    },
    'top-left-wall': {
        x:498,
        y:1085,
        width: 24,
        height: 24,
    },
    'top-right-wall': {
        x:652,
        y:1100,
        width: 24,
        height: 24,
    },
    'roof-wall': {
        x:471,
        y:935,
        width: 24,
        height: 24,
    },
    //tree
    'tree': {
        x:178,
        y:644,
        width: 64,
        height: 80,
    },
    'bush': {
        x:467,
        y:740,
        width: 49,
        height: 32,
    },
})
//House interior + stuff
loadSpriteAtlas("https://i.imgur.com/6nzxc0r.png", {
    "closed-chest": {
        x:153,
        y:53,
        width: 16,
        height: 16,
    },
    "opened-chest": {
        x:136,
        y:53,
        width: 16,
        height: 16,
    },
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


const SPEED = 200
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
            "                                                                             ",
            "                                                                             ",
            "           t                                                                 ",
            "                                                             t               ",
            "                                       t                                     ",
            "                     t                                                       ",
            "                                                                             ",
            "                         t                                                   ",
            "                                                                             ",
            "                                                         t                   ",
            "                                                                             ",
            "       tt             t                                                  t   ",
            "        tt                                        t                          ",
            "                                                                             ",
            "                                                                             ",
            "                        t                         t                          ",
            "                                                                  t          ",
            "      t                   kkkkkkkkkkkkkkkk                                   ",
            "                          jjjjjjjjjjjjjjjj                                   ",
            "                                          hg                                 ",
            "                                          hg  t                              ",
            "                t                         hg                                 ",
            "                                          hg                t  t             ",
            "                                          hg                                 ",
            "               t                          hg      t                          ",
            "                                          hg                                 ",
            "                                          hg                                 ",
            "                                     t    hg             t                   ",
            "                                          hg                                 ",
            "          t                               hg                                 ",
            "                                          hg                                 ",
            "                                                                             ",
            "                   t                                                         ",
            "                                                                             ",
            "                                                                             ",
            "                                                                             ",
            "                                                                             ",
            "                                                                             ",
            "                                                                             ",
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
                "<": ()=>[
                    sprite("top-left-wall"),
                    area(),
                    body({ isStatic: true }),
                    anchor("bot"),
                    'top-left-wall',
                ],
                ">": ()=>[
                    sprite("top-right-wall"),
                    area(),
                    body({ isStatic: true }),
                    anchor("bot"),
                    'top-left-wall',
                ],
                "r": ()=>[
                    sprite("roof-wall"),
                ],
                "p": ()=>[
                    sprite("path-1"),
                ],
                "q": ()=>[
                    sprite("path-2"),
                ],
                "f": ()=>[
                    sprite("path-3"),
                ],
                "g": ()=>[
                    sprite("path-right"),
                ],
                "h": ()=>[
                    sprite("path-left"),
                ],
                "j": ()=>[
                    sprite("path-bottom"),
                ],
                "k": ()=>[
                    sprite("path-top"),
                ],
                "c": ()=>[
                    sprite("closed-chest"),
                    area(),
                    body({ isStatic: true }),
                    anchor("bot"),
                    'chest-with-key',
                    scale(3),
                ],
            }
        }),
        addLevel([
            "t    t  t  t  t  t  t  t  t  t  t  t  t  d  t  t  t  t  t  t  t  t  t  t  t t",
            "                                                                             ",
            "   t                                                                      t  ",
            "                                                                             ",
            "t                                                                           t",
            "                                                                             ",
            "   t                                                                      t  ",
            "                                                                             ",
            "t                                                                           t",
            "                                                                             ",
            "   t               b                                                      t  ",
            "                                                                             ",
            "t                                                                           t",
            "                                                                             ",
            "   t                                                          b           t  ",
            "                                                                             ",
            "t                                                                           t",
            "                                                                             ",
            "   t                                                                      t  ",
            "                                                                             ",
            "t                                                                           t",
            "                          b                                                  ",
            "   t                                                                      t  ",
            "                                                                             ",
            "t                                                                           t",
            "                                                                             ",
            "   t                                                                      t  ",
            "                                                                             ",
            "t                                                                           t",
            "                                                                             ",
            "   t                                                                      t  ",
            "                                                                             ",
            "t                                                                           t",
            "                                                                             ",
            "   t                                                                      t  ",
            "                                                                             ",
            "t                                                                           t",
            "                                                                             ",
            "   t                                                                      t  ",
        ], {
            tileWidth: 24,
            tileHeight: 24,
            pos: vec2(50, 50),
            tiles: {
                "t": ()=>[
                    sprite("tree"),
                    area(),
                    body({ isStatic: true }),
                    anchor("bot"),
                    'tree',
                ],
                "d": ()=>[
                    sprite("tube"),
                    area(),
                    body({ isStatic: true }),
                    anchor("bot"),
                    scale('2'),
                    'door',
                ],
                "b": ()=>[
                    sprite("bush"),
                    scale(2)
                ],
            }
        })
    ]
    let curFont = 0
    let curSize = 48
    const pad = 24


    //variables utiles plus tard
    let hasKey = false
    let curDialog = 0
    let dialogs = [
        [ "player", "You need a key" ],
        [ "player", "You found a key" ],
    ]
    const textbox = add([
        rect( 700, 120, { radius: 12 }),
        anchor("center"),
        pos(center().x, height() - 100),
        outline(2),
    ])
    textbox.hidden = true
// Text
    const txt = add([
        text("", { size: 32, width: width() - 230, align: "center" }),
        pos(textbox.pos),
        anchor("center"),
        color(0, 0, 0),
    ])
    txt.hidden = true

// Get the object on map
    const player = add([
        sprite('link'),
        pos(400, 500),
        area(),
        body(),
        health(3),
        anchor("center"),
        scale(0.5),
        'player'
    ])
    let hpInf = add([
        text(player.hp(), {}),
        pos(100, 100),
        // scale(0.5),
    ])
    player.on("hurt", ()=>{
        hpInf.text = player.hp()
    })

    const enemy = add([
        sprite('orc-enemy'),
        pos(300, 300),
        area(),
        body(),
        anchor("center"),
        health(5),
        scale(3),
        'enemy'
    ])
    const chest = add([
        sprite("closed-chest"),
        area(),
        pos(1000, 400),
        body({ isStatic: true }),
        anchor("bot"),
        'chest-with-key',
        scale(3),
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

    //action
    onCollide('player', 'chest-with-key', ()=>{
        onKeyDown("e", ()=>{
            setSprite(chest, 'opened-chest')
            curDialog = 1
            hasKey = true
            updateDialog()
        })
    })
    onKeyDown("space", ()=>{
        if (textbox.hidden === false){
            textbox.hidden = true
            txt.hidden = true
        }
    })
    onCollide('player', 'door', ()=>{
        if (hasKey === true) {
            go("secondZone", {})
        }else {
            curDialog = 0
            updateDialog()
        }
    })
    function updateDialog() {
        textbox.hidden = false
        txt.hidden = false
        const [ char, dialog ] = dialogs[curDialog]
        // Update the dialog text
        txt.text = dialog
        wait(3, ()=>{
            textbox.hidden = true
            txt.hidden = true
        })
    }
    player.on("death", ()=>{
        destroy(player)
        go("lose")
    })

//attack

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
            "t": ()=>[
                sprite("grass-with-twig"),
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