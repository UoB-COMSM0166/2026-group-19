const GRID_COLS = 32; // 0–31
const GRID_ROWS = 18; // 0–17

class LevelFactory {
    // Scales grid coordinates (or sizes) to pixel coordinates.
    // Maps [0, GRID_COLS] -> [0, W]
    //      [0, GRID_ROWS] -> [0, H]
    static scaleX(col, W) { return (col / GRID_COLS) * W; }
    static scaleY(row, H) { return (row / GRID_ROWS) * H; }

    static build(template, difficultyKey = "NORMAL") {
        const W = width;
        const H = height;

        const difficultySettings = DEFAULTS.difficulty[difficultyKey] || DEFAULTS.difficulty.NORMAL;

        const physics = {
            ...DEFAULTS.physics, 
            ...(template.physics || {}),
            SPAWN_RATE: (template.physics?.SPAWN_RATE || DEFAULTS.physics.SPAWN_RATE) * 
                        (difficultySettings.SPAWN_RATE / DEFAULTS.difficulty.NORMAL.SPAWN_RATE),
            ENEMY_SPEED: (template.physics?.ENEMY_SPEED || DEFAULTS.physics.ENEMY_SPEED) * 
                         difficultySettings.ENEMY_SPEED_MULTIPLIER,
            MAX_ENEMY_SPEED: (template.physics?.MAX_ENEMY_SPEED || DEFAULTS.physics.MAX_ENEMY_SPEED) * 
                             difficultySettings.MAX_ENEMY_SPEED_MULTIPLIER
        };
                
        // Scale physics properties
        physics.GRAVITY = LevelFactory.scaleY(physics.GRAVITY, H);
        physics.PLAYER_SPEED = LevelFactory.scaleX(physics.PLAYER_SPEED, W);
        physics.PLAYER_ACCELERATION = LevelFactory.scaleX(physics.PLAYER_ACCELERATION, W);
        physics.ENEMY_SPEED = LevelFactory.scaleX(physics.ENEMY_SPEED, W);
        physics.MAX_ENEMY_SPEED = LevelFactory.scaleX(physics.MAX_ENEMY_SPEED, W);
        physics.JUMP_SPEED = LevelFactory.scaleY(physics.JUMP_SPEED, H);
        physics.TERMINAL_VELOCITY = LevelFactory.scaleY(physics.TERMINAL_VELOCITY, H);
        physics.FLOATING_ENEMY_ACCEL = LevelFactory.scaleY(physics.FLOATING_ENEMY_ACCEL, H);
        physics.FLOATING_ENEMY_BOUNCE = LevelFactory.scaleY(physics.FLOATING_ENEMY_BOUNCE, H);
        physics.MIN_BLOOD_SPEED = LevelFactory.scaleY(physics.MIN_BLOOD_SPEED, H);
        physics.MAX_BLOOD_SPEED = LevelFactory.scaleY(physics.MAX_BLOOD_SPEED, H);
        physics.PROJECTILE_KNOCKBACK = LevelFactory.scaleX(physics.PROJECTILE_KNOCKBACK, W);

        return {
            physics: physics,
            player: { 
                center_x: LevelFactory.scaleX(template.player.x + 0.5, W),
                center_y: LevelFactory.scaleY(template.player.y + 0.5, H),
                health: difficultySettings.PLAYER_HEALTH
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