// src/levels.js

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
            { left_x: 0, top_y: 580, width: 360, height: 20 }, // bottom left wall
            { left_x: 440, top_y: 580, width: 360, height: 20 }, // bottom right wall
            { left_x: 0, top_y: 0, width: 360, height: 20 }, // top left wall
            { left_x: 440, top_y: 0, width: 360, height: 20 }, // top right wall
            { left_x: 0, top_y: 0, width: 20, height: 600 }, // left wall
            { left_x: 780, top_y: 0, width: 20, height: 600 }, // right wall
            { left_x: 200, top_y: 150, width: 400, height: 20 },
            { left_x: 200, top_y: 450, width: 400, height: 20 },
            { left_x: 0, top_y: 300, width: 200, height: 20 }, // left middle platform
            { left_x: 600, top_y: 300, width: 200, height: 20 }
        ],
        boxes: [
            { left_x: 620, top_y: 280, width: 20, height: 20 }
        ]
    },
    2: {
        enemySpeed: 3, // Slightly faster than Level 1
        // Player starts at the bottom left
        player: { center_x: 100, center_y: 500, width: 20, height: 20 },
        enemies: [
            // Guarding the middle platform
            { center_x: 400, center_y: 300, width: 20, height: 20 },
            // Guarding the top platform
            { center_x: 700, center_y: 200, width: 30, height: 30 },
            // Patrolling the bottom right floor
            { center_x: 600, center_y: 500, width: 20, height: 20 }
        ],
        walls: [
            // Outer Boundaries
            { left_x: 0, top_y: 580, width: 800, height: 20 }, // Full bottom floor
            { left_x: 0, top_y: 0, width: 800, height: 20 },   // Full ceiling
            { left_x: 0, top_y: 0, width: 20, height: 600 },   // Left wall
            { left_x: 780, top_y: 0, width: 20, height: 600 }, // Right wall

            // Staircase Platforms
            { left_x: 0, top_y: 450, width: 200, height: 20 },   // Lowest step (left)
            { left_x: 300, top_y: 350, width: 200, height: 20 }, // Middle step (center)
            { left_x: 600, top_y: 250, width: 200, height: 20 }  // Highest step (right)
        ],
        boxes: [
            // A box to push off the middle platform
            { left_x: 350, top_y: 330, width: 20, height: 20 }
        ]
    }
};