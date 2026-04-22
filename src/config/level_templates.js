const LevelTemplates = {
    1: {
        player: { x: 15, y: 3 },
        platforms: [
            { x0: 0, y0: -20, x1: 13, y1: 0, spawnable: false }, // Boundary: Top-left
            { x0: 18, y0: -20, x1: 31, y1: 0, spawnable: false }, // Boundary: Top-right
            { x0: 11, y0: 4, x1: 20, y1: 4, spawnable: true },
            { x0: 0, y0: -20, x1: 0, y1: 17, spawnable: false }, // Boundary: Left edge
            { x0: 31, y0: -20, x1: 31, y1: 17, spawnable: false }, // Boundary: Right edge
            
            { x0: 3, y0: 7, x1: 6, y1: 7, spawnable: true },
            { x0: 25, y0: 7, x1: 28, y1: 7, spawnable: true },
            { x0: 9, y0: 11, x1: 12, y1: 11, spawnable: true },
            { x0: 19, y0: 11, x1: 22, y1: 11, spawnable: true },
            { x0: 3, y0: 14, x1: 6, y1: 14, spawnable: true },
            { x0: 25, y0: 14, x1: 28, y1: 14, spawnable: true },

            { x0: 0, y0: 17, x1: 13, y1: 17, spawnable: true }, // Boundary: Bottom-left
            { x0: 18, y0: 17, x1: 31, y1: 17, spawnable: true }, // Boundary: Bottom-right
        ]
    },
    2: {
        player: { x: 15, y: 3 },
        physics: {
            playerDampingMultiplier: 0.97
        },
        platforms: [
            { x0: 0, y0: -20, x1: 13, y1: 0, spawnable: false }, // Boundary: Top-left
            { x0: 18, y0: -20, x1: 31, y1: 0, spawnable: false }, // Boundary: Top-right
            { x0: 0, y0: -20, x1: 0, y1: 17, spawnable: false }, // Boundary: Left edge
            { x0: 31, y0: -20, x1: 31, y1: 17, spawnable: false }, // Boundary: Right edge

            { x0: 6, y0: 3, x1: 18, y1: 3, spawnable: true },
            { x0: 19, y0: 6, x1: 25, y1: 6, spawnable: true },
            { x0: 24, y0: 9, x1: 30, y1: 9, spawnable: true },
            { x0: 1, y0: 7, x1: 7, y1: 7, spawnable: true },
            { x0: 8, y0: 12, x1: 23, y1: 12, spawnable: true },
            { x0: 14, y0: 9, x1: 16, y1: 9, spawnable: true },

            { x0: 0, y0: 17, x1: 13, y1: 17, spawnable: true }, // Boundary: Bottom-left
            { x0: 18, y0: 17, x1: 31, y1: 17, spawnable: true }, // Boundary: Bottom-right
        ]
    },
    3: {
        player: { x: 15, y: 3 },
        physics: {
            jumpSpeed: 0.45,
            gravity: 0.01,
        },
        platforms: [
            { x0: 0, y0: -20, x1: 13, y1: 0, spawnable: false }, // Boundary: Top-left
            { x0: 18, y0: -20, x1: 31, y1: 0, spawnable: false }, // Boundary: Top-right
            { x0: 0, y0: -20, x1: 0, y1: 17, spawnable: false }, // Boundary: Left edge
            { x0: 31, y0: -20, x1: 31, y1: 17, spawnable: false }, // Boundary: Right edge


            { x0: 1, y0: 4, x1: 3, y1: 4, spawnable: true },
            { x0: 13, y0: 4, x1: 19, y1: 4, spawnable: true },
            { x0: 7, y0: 10, x1: 9, y1: 10, spawnable: true },
            { x0: 13, y0: 9, x1: 14, y1: 9, spawnable: true },
            { x0: 18, y0: 11, x1: 24, y1: 11, spawnable: true },
            { x0: 1, y0: 13, x1: 2, y1: 13, spawnable: true },
            { x0: 29, y0: 14, x1: 30, y1: 14, spawnable: true },
            { x0: 8, y0: 3, x1: 8, y1: 3, spawnable: true },
            { x0: 24, y0: 4, x1: 24, y1: 6, spawnable: true },


            { x0: 1, y0: 17, x1: 13, y1: 17, spawnable: true }, // Boundary: Bottom-left
            { x0: 18, y0: 17, x1: 30, y1: 17, spawnable: true }, // Boundary: Bottom-right
        ]
    }
};

if (typeof module !== 'undefined') module.exports = { LevelTemplates };