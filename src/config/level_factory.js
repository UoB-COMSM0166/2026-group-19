const GRID_COLS = 32; // 0–31
const GRID_ROWS = 18; // 0–17

class LevelFactory {
    // Scales grid coordinates (or sizes) to pixel coordinates.
    // Maps [0, GRID_COLS] -> [0, W]
    //      [0, GRID_ROWS] -> [0, H]
    static scaleX(col, W) { return (col / GRID_COLS) * W; }
    static scaleY(row, H) { return (row / GRID_ROWS) * H; }

    static build(template, difficultyKey = "normal") {
        const W = width;
        const H = height;

        const difficultySettings = defaults.difficulty[difficultyKey] || defaults.difficulty.normal;

        const physics = {
            ...defaults.physics,
            ...(template.physics || {}),
            ...difficultySettings.physics,
        };

        // Scale physics properties
        physics.gravity              = LevelFactory.scaleY(physics.gravity, H);
        physics.playerSpeed          = LevelFactory.scaleX(physics.playerSpeed, W);
        physics.playerAcceleration   = LevelFactory.scaleX(physics.playerAcceleration, W);
        physics.enemySpeed           = LevelFactory.scaleX(physics.enemySpeed, W);
        physics.maxEnemySpeed        = LevelFactory.scaleX(physics.maxEnemySpeed, W);
        physics.jumpSpeed            = LevelFactory.scaleY(physics.jumpSpeed, H);
        physics.terminalVelocity     = LevelFactory.scaleY(physics.terminalVelocity, H);
        physics.floatingEnemyAccel   = LevelFactory.scaleY(physics.floatingEnemyAccel, H);
        physics.floatingEnemyBounce  = LevelFactory.scaleY(physics.floatingEnemyBounce, H);
        physics.minBloodSpeed        = LevelFactory.scaleY(physics.minBloodSpeed, H);
        physics.maxBloodSpeed        = LevelFactory.scaleY(physics.maxBloodSpeed, H);
        physics.projectileKnockback  = LevelFactory.scaleX(physics.projectileKnockback, W);

        return {
            physics: physics,
            player: {
                center_x: LevelFactory.scaleX(template.player.x + 0.5, W),
                center_y: LevelFactory.scaleY(template.player.y + 0.5, H),
            },
            health: {
                player:     difficultySettings.playerHealth,
                enemy:      difficultySettings.enemyHealth,
                largeEnemy: difficultySettings.largeEnemyHealth
            },
            walls: LevelFactory.buildWalls(template.platforms, W, H)
        };
    }

    static buildWalls(platforms, W, H) {
        return platforms.map(p => {
            const left_x = Math.round(LevelFactory.scaleX(p.x0, W));
            const top_y  = Math.round(LevelFactory.scaleY(p.y0, H));
            const width  = Math.round(LevelFactory.scaleX(p.x1 + 1 - p.x0, W));
            const height = Math.round(LevelFactory.scaleY(p.y1 + 1 - p.y0, H));
            return { left_x, top_y, width, height, spawnable: p.spawnable, y0: p.y0 };
        });
    }
}
