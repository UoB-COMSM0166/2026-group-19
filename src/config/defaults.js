const DEFAULTS = {
    physics: {
        GRAVITY: 0.035,
        PLAYER_SPEED: 0.2,
        PLAYER_ACCELERATION: 0.04,
        JUMP_SPEED: 0.65,
        ENEMY_SPEED_MULTIPLIER: 2,
        TERMINAL_VELOCITY: 0.35,
        PLAYER_DAMPING_MULTIPLIER: 0.87,
        FLOATING_ENEMY_ACCEL: 0.002,
        FLOATING_ENEMY_BOUNCE: 0.15,
        SPAWN_WEIGHTS: {
            NORMAL: 0.4,
            LARGE: 0.3,
            FLOATING: 0.3
        },
        DROPLETS_PER_DEATH: 12,
        MIN_BLOOD_SPEED: 0.2,
        MAX_BLOOD_SPEED: 0.6,
        PROJECTILE_KNOCKBACK: 0.35
    },
    sizes: {
        player:      { width: 0.8, height: 0.8 },
        enemy:       { width: 0.7, height: 0.7 },
        large_enemy: { width: 1.5, height: 1.5 },
        box:         { width: 0.7, height: 0.7 },
        blood:       { width: 0.2, height: 0.2 }
    },
    health: {
        player: 3,
        enemy: 2,
        large_enemy: 5
    },
    hurtTime: 280,
    difficulty: {
        NORMAL: {
            physics: {
                // Just use the defaults
                SPAWN_RATE: 180,
                ENEMY_SPEED: 0.08,
                MAX_ENEMY_SPEED: 0.16
            },
            PLAYER_HEALTH: 3
        },
        HARD: {
            physics: {
                SPAWN_RATE: 120,
                ENEMY_SPEED: 0.1,
                MAX_ENEMY_SPEED: 0.2,
            },
            PLAYER_HEALTH: 1
        }
    },
    controls: {
        ARROWS: {
            LEFT: 37,  // LEFT_ARROW
            RIGHT: 39, // RIGHT_ARROW
            UP: 38,    // UP_ARROW
            SHOOT: 32  // SPACE
        },
        WASD: {
            LEFT: 65,  // A
            RIGHT: 68, // D
            UP: 87,    // W
            SHOOT: 13  // ENTER
        }
    }
};