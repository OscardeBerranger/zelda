import kaboom from "kaboom";

// Start game
kaboom()


loadRoot('https://i.imgur.com/')
loadSprite('top-wall', 'QA257Bj.png')
loadSprite('top-left-wall', 'xlpUxIm.png')
loadSprite('left-wall', 'rfDoaa1.png')
loadSprite('bottom-left-wall', 'awnTfNC.png')
loadSprite('bottom-wall', 'vWJWmvb.png')
loadSprite('bottom-right-wall', '84oyTFy.png')
loadSprite('right-wall', 'SmHhgUn.png')
loadSprite('top-right-wall', 'z0OmBd1.png')
loadSprite('slicer', 'c6JFi5Z.png')
loadSprite('chest', 'I7xSp7w.png')
loadSprite('enemy', 'Ei1VnX8.png.png')
loadSprite('link', 'yZIb8O2.png.png')

const SPEED = 450

export const level = addLevel([
    "<________________________>",
    "]                        [",
    "]                        [",
    "]                        [",
    "]                        [",
    "]                        [",
    "]                        [",
    "]                        [",
    "]               c        [",
    "]                        [",
    "]                        [",
    "]                        [",
    "]                        [",
    "]                        [",
    "]                        [",
    "]                        [",
    "l========================r",
], {
    tileWidth: 48,
    tileHeight: 48,
    pos: vec2(50, 50),

    tiles: {
        "e": () => [
            sprite("enemy"),
            area(),
            anchor("center"),
            state("move", [ "idle", "attack", "move" ]),
            "enemy",
        ],
        "s": () => [
            sprite("slicer"),
            area(),
            anchor("center"),
            state("move", [ "idle", "attack", "move" ]),
            "slicer",
        ],
        "=": () => [
            sprite("bottom-wall"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
        ],
        "[": () => [
            sprite("right-wall"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
        ],
        "]": () => [
            sprite("left-wall"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
        ],
        "_": () => [
            sprite("top-wall"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
        ],
        "<": () => [
            sprite("top-left-wall"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
        ],
        ">": () => [
            sprite("top-right-wall"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
        ],
        "l": () => [
            sprite("bottom-left-wall"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
        ],
        "r": () => [
            sprite("bottom-right-wall"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
        ],
        "c": () => [
            sprite("chest"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
        ],
    },
})


// Get the player object from tag
const player = add([
    sprite("link"),
    pos(120, 120),
    area(),
    body(),
    anchor("center"),
])
const slicer = add([
    sprite("slicer"),
    pos(400, 400),
    area(),
    body(),
    anchor("center"),
    state("move"),
])

//ia

onKeyDown("f", ()=>{7
    slicer.move(400, 0)
})

// slicer.onStateEnter("move", async (s)=>{
// })


// Movements
onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump()
    }
})

onKeyDown("left", () => {
    player.move(-SPEED, 0)
})

onKeyDown("right", () => {
    player.move(SPEED, 0)
})
onKeyDown("up", () => {
    player.move(0, -SPEED)
})

onKeyDown("down", () => {
    player.move(0, SPEED)
})
