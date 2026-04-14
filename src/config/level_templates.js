const LevelTemplates = {
    1: {
        player: { x: 15, y: 3 },
        platforms: [
            { x0: 0, y0: 0, x1: 13, y1: 0, spawnable: false }, // Boundary: Top-left
            { x0: 18, y0: 0, x1: 31, y1: 0, spawnable: false }, // Boundary: Top-right
            { x0: 11, y0: 4, x1: 20, y1: 4, spawnable: true },
            { x0: 0, y0: 0, x1: 0, y1: 17, spawnable: false }, // Boundary: Left edge
            { x0: 31, y0: 0, x1: 31, y1: 17, spawnable: false }, // Boundary: Right edge
            { x0: 3, y0: 7, x1: 6, y1: 7, spawnable: true },
            { x0: 25, y0: 7, x1: 28, y1: 7, spawnable: true },
            { x0: 9, y0: 11, x1: 12, y1: 11, spawnable: true },
            { x0: 19, y0: 11, x1: 22, y1: 11, spawnable: true },
            { x0: 3, y0: 14, x1: 6, y1: 14, spawnable: true },
            { x0: 25, y0: 14, x1: 28, y1: 14, spawnable: true },
            { x0: 0, y0: 17, x1: 13, y1: 17, spawnable: false }, // Boundary: Bottom-left
            { x0: 18, y0: 17, x1: 31, y1: 17, spawnable: false }, // Boundary: Bottom-right
        ]
    },
    2: {
        player: { x: 15, y: 3 },
        physics: {
            PLAYER_DAMPING_MULTIPLIER: 0.97
        },
        platforms: [
            { x0: 1, y0: 0, x1: 13, y1: 0, spawnable: false }, // Boundary: Top-left
            { x0: 18, y0: 0, x1: 30, y1: 0, spawnable: false }, // Boundary: Top-right
            { x0: 0, y0: 0, x1: 0, y1: 17, spawnable: false }, // Boundary: Left edge
            { x0: 31, y0: 0, x1: 31, y1: 17, spawnable: false }, // Boundary: Right edge
            { x0: 12, y0: 4, x1: 22, y1: 4, spawnable: true },
            { x0: 9, y0: 7, x1: 13, y1: 7, spawnable: true },
            { x0: 30, y0: 7, x1: 30, y1: 7, spawnable: true },
            { x0: 5, y0: 10, x1: 9, y1: 10, spawnable: true },
            { x0: 19, y0: 10, x1: 27, y1: 10, spawnable: true },
            { x0: 1, y0: 13, x1: 1, y1: 13, spawnable: true },
            { x0: 15, y0: 12, x1: 15, y1: 13, spawnable: true },
            { x0: 25, y0: 14, x1: 30, y1: 14, spawnable: true },
            { x0: 1, y0: 17, x1: 13, y1: 17, spawnable: false }, // Boundary: Bottom-left
            { x0: 18, y0: 17, x1: 30, y1: 17, spawnable: false }, // Boundary: Bottom-right
        ]
    },
    3: {
        player: { x: 15, y: 3 },
        physics: {
            JUMP_SPEED: 0.45,
            GRAVITY: 0.01,
        },
        platforms: [
            { x0: 0, y0: 0, x1: 13, y1: 0, spawnable: false }, // Boundary: Top-left
            { x0: 18, y0: 0, x1: 31, y1: 0, spawnable: false }, // Boundary: Top-right
            { x0: 0, y0: 0, x1: 0, y1: 17, spawnable: false }, // Boundary: Left edge
            { x0: 31, y0: 0, x1: 31, y1: 17, spawnable: false }, // Boundary: Right edge
            { x0: 8, y0: 6, x1: 8, y1: 6, spawnable: true },
            { x0: 12, y0: 6, x1: 12, y1: 6, spawnable: true },
            { x0: 16, y0: 6, x1: 16, y1: 6, spawnable: true },
            { x0: 20, y0: 6, x1: 20, y1: 6, spawnable: true },
            { x0: 24, y0: 6, x1: 24, y1: 6, spawnable: true },
            { x0: 4, y0: 9, x1: 7, y1: 9, spawnable: true },
            { x0: 23, y0: 9, x1: 25, y1: 9, spawnable: true },
            { x0: 13, y0: 12, x1: 18, y1: 12, spawnable: true },
            { x0: 4, y0: 14, x1: 10, y1: 14, spawnable: true },
            { x0: 21, y0: 14, x1: 27, y1: 14, spawnable: true },
            { x0: 0, y0: 17, x1: 13, y1: 17, spawnable: false }, // Boundary: Bottom-left
            { x0: 18, y0: 17, x1: 31, y1: 17, spawnable: false }, // Boundary: Bottom-right
        ]
    }
};