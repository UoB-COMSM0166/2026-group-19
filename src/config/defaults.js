const DEFAULTS = {
    physics: {
        GRAVITY: 0.025,
        PLAYER_SPEED: 0.2,
        ENEMY_SPEED: 0.1,
        MAX_ENEMY_SPEED: 0.24,
        JUMP_SPEED: 0.5,
        SPAWN_RATE: 180,
        ENEMY_SPEED_MULTIPLIER: 2,
        TERMINAL_VELOCITY: 0.24,
        PLAYER_DAMPING_MULTIPLIER: 0.8,
        FLOATING_ENEMY_ACCEL: 0.002,
        FLOATING_ENEMY_BOUNCE: 0.04,
        SPAWN_WEIGHTS: {
            NORMAL: 0.7,   // 70% chance
            LARGE: 0.2,    // 20% chance
            FLOATING: 0.1  // 10% chance
        },
        DROPLETS_PER_DEATH: 12,
        MIN_BLOOD_SPEED: 0.2,
        MAX_BLOOD_SPEED: 0.6
    },
    sizes: {
        player:      { width: 1.5, height: 1.5 },
        enemy:       { width: 1, height: 1 },
        large_enemy: { width: 2, height: 2 },
        box:         { width: 1, height: 1 },
        blood:       { width: 0.2, height: 0.2 }
    },
    health: {
        player: 3,
        enemy: 2,
        large_enemy: 5
    },
    hurtTime: 280,
};