/*
 * Level Templates
 *
 * Format: Each level is an object with:
 *   - physics (optional): { ENEMY_SPEED, ... } — physics overrides for this level only
 *   - player: { x, y } — normalized position (0–1 range, resolved to pixels by LevelFactory)
 *   - platforms: array of { x, y, w, spawnable? } — normalized positions and widths
 *
 * Position format (normalized 0–1):
 *   x, y = horizontal and vertical position as fraction of canvas
 *   w    = platform width as fraction of canvas width
 *
 * The LevelFactory automatically:
 *   - Converts normalized coords to pixels
 *   - Generates outer boundary walls
 *   - Merges physics overrides with defaults
 */

const LevelTemplates = {
    1: {
        player: { x: 0.50, y: 0.08 },
        platforms: [
            { x: 0.25, y: 0.25, w: 0.50, spawnable: true },
            { x: 0.25, y: 0.75, w: 0.50, spawnable: true },
            { x: 0.00, y: 0.50, w: 0.25, spawnable: true },
            { x: 0.75, y: 0.50, w: 0.25, spawnable: true },
        ]
    },

    2: {
        physics: { ENEMY_SPEED: 10 },
        player: { x: 0.50, y: 0.08 },
        platforms: [
            { x: 0.44, y: 0.20, w: 0.12, spawnable: true },
            { x: 0.12, y: 0.36, w: 0.25, spawnable: true },
            { x: 0.62, y: 0.36, w: 0.25, spawnable: true },
            { x: 0.31, y: 0.56, w: 0.38, spawnable: true },
            { x: 0.015, y: 0.76, w: 0.25, spawnable: true },
            { x: 0.72, y: 0.76, w: 0.25, spawnable: true },
        ]
    },

    3: {
        physics: { ENEMY_SPEED: 10, PLAYER_SPEED: 10 },
        player: { x: 0.10, y: 0.85 },
        platforms: [
            { x: 0.05, y: 0.75, w: 0.22, spawnable: true },
            { x: 0.30, y: 0.68, w: 0.20, spawnable: true },
            { x: 0.55, y: 0.52, w: 0.20, spawnable: true },
            { x: 0.72, y: 0.40, w: 0.18, spawnable: true },
            { x: 0.40, y: 0.82, w: 0.18, spawnable: true },
            { x: 0.18, y: 0.20, w: 0.22, spawnable: false },
        ]
    },
};