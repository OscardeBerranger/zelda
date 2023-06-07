scene("spawn", ()=>{


    const level = addLevel([
        "|                    |",
        "|                    |",
        "|                s   |",
        "|                    |",
        "|                    |",
        "|                    |",
        "|                    |",
        "|                    |",
        "|                    |",
        "|                    |",
        "|      s             |",
        "|                    |",
        "|                    |",
        "|                    |",
        "|                    |"
    ], {
        tileWidth: 24,
        tileHeight: 24,
        pos: vec2(50, 50),

        tiles: {
            // " ": () => [
            //     sprite("grass"),
            //     area(),
            // ],
            "t": ()=>[
                sprite("grass-with-twig"),
                area(),
            ],
            "]": ()=>[
                sprite("regular-wall"),
                body({ isStatic: true }),
                anchor("center"),
                'right-wall',
            ],
            "[": ()=>[
                sprite("regular-wall"),
                body({ isStatic: true }),
                anchor("center"),
                'left-wall',
            ],
            "h": ()=>[
                sprite("house-wall"),
                area(),
                body({ isStatic: true }),
                anchor("bot"),
                'wall',
            ],
            "d": ()=>[
                sprite("house-door"),
                area(),
                body({ isStatic: true }),
                anchor("bot"),
                'door',
            ],
            "r": ()=>[
                sprite("house-roof"),
                area(),
                body({ isStatic: true }),
                anchor("bot"),
                'wall',
            ],
            "f": ()=>[
                sprite("fence"),
                area(),
                body({ isStatic: true }),
                anchor("bot"),
                'wall',
            ],
            's': ()=> [
                sprite("slicer"),
                area(),
                anchor("center"),
                state("move", [ "idle", "attack", "move" ]),
                { dir: -1 },
                "slicer",
            ]
        },
    })


// Get the player object from tag

    const player = add([
        sprite('link'),
        pos(400, 500),
        scale(0.5),
    ])

    const slicer = level.get("slicer")
    onCollide('player', 'slicer', (e)=>{
        player.hurt(1)
    })

    player.on("death", () => {
        destroy(player)
        go("lose")
    })
//ia
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
    // onCollide('player', 'door', ()=>{
    //     go("secondZone", {})
    // })
})

// const slicer = level.get("slicer")

// onCollide('player', 'slicer', (e)=>{
//     player.hurt(1)
// })
//
// player.on("death", () => {
//     destroy(player)
//     go("lose")
// })
//ia
//     setInterval(mooveSlicer, 1)
//     function mooveSlicer(e = slicer){
//
//         for (let i = 0; i < slicer.length; i++) {
//             let f = e[i]
//             f.move(f.dir*150, 0)
//             onCollide('slicer', 'left-wall', (f)=>{
//                 f.dir = 1
//             })
//             onCollide('slicer', 'right-wall', (f)=>{
//                 f.dir = -1
//             })
//         }
//     }