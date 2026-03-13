/*
 * LevelFactory converts normalized level templates into resolved game configs.
 *
 * Takes a template with 0–1 normalized coordinates and converts them to pixel
 * positions based on canvas size. Merges physics overrides with defaults and
 * generates boundary walls automatically.
 *
 * Public API:
 *   LevelFactory.build(template) → { physics, player, walls }
 */

class LevelFactory {
    static build(template) {
        const W = width;
        const H = height;
        const T = DEFAULTS.wallThickness;

        return {
            physics: { ...DEFAULTS.physics, ...(template.physics || {}) },
            player:  { center_x: Math.round(template.player.x * W), center_y: Math.round(template.player.y * H)},
            walls:   LevelFactory.buildWalls(template.platforms, W, H, T)
        };
    }

    static buildWalls(platforms, W, H, T) {
        const holeWidth = Math.round(W * 0.1);
        const holeStart = Math.round((W - holeWidth) / 2);

        // Define the boundary walls that go around the edges of the level
        const boundaries = [
            { left_x: 0, top_y: H - T, width: holeStart, height: T, spawnable: true }, // Bottom-Left
            { left_x: holeStart + holeWidth, top_y: H - T, width: W - (holeStart + holeWidth), height: T, spawnable: true }, // Bottom-Right
            { left_x: 0, top_y: 0, width: holeStart, height: T, spawnable: false }, // Top-Left
            { left_x: holeStart + holeWidth, top_y: 0, width: W - (holeStart + holeWidth), height: T, spawnable: false  }, // Top-Right
            { left_x: 0, top_y: 0, width: T, height: H, spawnable: false }, // Left
            { left_x: W - T, top_y: 0, width: T, height: H, spawnable: false }, // Right
        ];

        // Define the level-specific walls that are within the level
        const resolvedPlatforms = platforms.map(p => ({
            left_x: Math.round(p.x * W),
            top_y: Math.round(p.y * H),
            width: Math.round(p.w * W),
            height: T,
            spawnable: p.spawnable
        }));

        return boundaries.concat(resolvedPlatforms);
    }
}