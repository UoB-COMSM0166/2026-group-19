const GRID_COLS = 32; // 0–31
const GRID_ROWS = 18; // 0–17

class LevelFactory {
    // Scales grid coordinates (or sizes) to pixel coordinates.
    // Maps [0, GRID_COLS] -> [0, W]
    static scaleX(col, W) { return Math.round((col / GRID_COLS) * W); }
    static scaleY(row, H) { return Math.round((row / GRID_ROWS) * H); }

    static build(template) {
        const W = width;
        const H = height;

        return {
            physics: { ...DEFAULTS.physics, ...(template.physics || {}) }, // Override default physics if desired
            player: { 
                center_x: LevelFactory.scaleX(template.player.x + 0.5, W),
                center_y: LevelFactory.scaleY(template.player.y + 0.5, H)
            },
            walls: LevelFactory.buildWalls(template.platforms, W, H)
        };
    }

    static buildWalls(platforms, W, H) {
        return platforms.map(p => {
            const left_x = LevelFactory.scaleX(p.x0, W);
            const top_y  = LevelFactory.scaleY(p.y0, H);
            const width  = LevelFactory.scaleX(p.x1 + 1 - p.x0, W);
            const height = LevelFactory.scaleY(p.y1 + 1 - p.y0, H);
            return { left_x, top_y, width, height, spawnable: p.spawnable };
        });
    }
}