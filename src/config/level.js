// src/config/level.js

const LevelData = {
    1: {
        player: { center_x: 450, center_y: 50, width: 20, height: 20 },
        enemies: [
            { center_x: 400, center_y: 50, width: 20, height: 20 },
            { center_x: 350, center_y: 50, width: 30, height: 30 },
            { center_x: 300, center_y: 50, width: 30, height: 30 },
            { center_x: 500, center_y: 50, width: 20, height: 20 }
        ],
        walls: [
            // Outer boundaries (spawnable defaults to false)
            { left_x: 0, top_y: 580, width: 360, height: 20 },
            { left_x: 440, top_y: 580, width: 360, height: 20 },
            { left_x: 0, top_y: 0, width: 360, height: 20 },
            { left_x: 440, top_y: 0, width: 360, height: 20 },
            { left_x: 0, top_y: 0, width: 20, height: 600 },
            { left_x: 780, top_y: 0, width: 20, height: 600 },

            // Platforms inside the level
            { left_x: 200, top_y: 150, width: 400, height: 20, spawnable: true },
            { left_x: 200, top_y: 450, width: 400, height: 20, spawnable: true },
            { left_x: 0, top_y: 300, width: 200, height: 20, spawnable: true },
            { left_x: 600, top_y: 300, width: 200, height: 20, spawnable: true }
        ],
        boxes: [
            { left_x: 620, top_y: 280, width: 20, height: 20 }
        ]
    },
    2: {
        enemySpeed: 3,
        player: { center_x: 100, center_y: 500, width: 20, height: 20 },
        enemies: [
            { center_x: 400, center_y: 300, width: 20, height: 20 },
            { center_x: 700, center_y: 200, width: 30, height: 30 },
            { center_x: 600, center_y: 500, width: 20, height: 20 }
        ],
        walls: [
            { left_x: 0, top_y: 580, width: 800, height: 20 },
            { left_x: 0, top_y: 0, width: 800, height: 20 },
            { left_x: 0, top_y: 0, width: 20, height: 600 },
            { left_x: 780, top_y: 0, width: 20, height: 600 },

            // Add spawnable
            { left_x: 0, top_y: 450, width: 200, height: 20, spawnable: true },
            { left_x: 300, top_y: 350, width: 200, height: 20, spawnable: true },
            { left_x: 600, top_y: 250, width: 200, height: 20, spawnable: true }
        ],
        boxes: [
            { left_x: 350, top_y: 330, width: 20, height: 20 }
        ]
    },

    3: (() => {
        const W = window.innerWidth;
        const H = window.innerHeight;
        const T = 20; // wall thickness
        const holeWidth = W * 0.2;
        const holeStart = (W - holeWidth) / 2;

        return {
            enemySpeed: 4,

            player: {
                center_x: W * 0.1,
                center_y: H * 0.85,
                width: 20,
                height: 20
            },

            enemies: [
                { center_x: W * 0.35, center_y: H * 0.75, width: 20, height: 20 },
                { center_x: W * 0.55, center_y: H * 0.55, width: 30, height: 30 },
                { center_x: W * 0.75, center_y: H * 0.35, width: 20, height: 20 },
                { center_x: W * 0.88, center_y: H * 0.2,  width: 30, height: 30 }
            ],

            walls: [
                // outer boundaries
                { left_x: 0,     top_y: H - T, width: W, height: T },
                { left_x: 0, top_y: 0, width: holeStart, height: T },
                { left_x: holeStart + holeWidth, top_y: 0, width: W - (holeStart + holeWidth), height: T },
                { left_x: 0,     top_y: 0,     width: T, height: H },
                { left_x: W - T, top_y: 0,     width: T, height: H },

                // platforms across the fullscreen map
                { left_x: W * 0.05, top_y: H * 0.75, width: W * 0.22, height: T, spawnable: true },
                { left_x: W * 0.30, top_y: H * 0.68, width: W * 0.20, height: T, spawnable: true },
                { left_x: W * 0.55, top_y: H * 0.52, width: W * 0.20, height: T, spawnable: true },
                { left_x: W * 0.72, top_y: H * 0.40, width: W * 0.18, height: T, spawnable: true },

                // middle support platform
                { left_x: W * 0.40, top_y: H * 0.82, width: W * 0.18, height: T, spawnable: true },

                // high risk / reward top platform
                { left_x: W * 0.18, top_y: H * 0.20, width: W * 0.22, height: T, spawnable: false }
            ],

            boxes: [
                { left_x: W * 0.32, top_y: H * 0.66, width: 20, height: 20 },
                { left_x: W * 0.58, top_y: H * 0.50, width: 20, height: 20 },
                { left_x: W * 0.78, top_y: H * 0.38, width: 20, height: 20 }
            ]
        };
    })()
};