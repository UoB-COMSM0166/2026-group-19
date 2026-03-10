// src/config/level.js

const LevelData = {
    1: {
        player: { center_x: 450, center_y: 50, width: 20, height: 20 },
        enemies: [
            { center_x: 400, center_y: 50, type: EnemyType.NORMAL },
            { center_x: 350, center_y: 50, type: EnemyType.LARGE },
            { center_x: 300, center_y: 50, type: EnemyType.FLOATING },
            { center_x: 500, center_y: 50, type: EnemyType.NORMAL }
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
            { center_x: 400, center_y: 300, type: EnemyType.NORMAL },
            { center_x: 700, center_y: 200, type: EnemyType.LARGE },
            { center_x: 600, center_y: 500, type: EnemyType.NORMAL }
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
    }
};