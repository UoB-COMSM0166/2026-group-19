const DEFAULTS = {
    physics: {
        GRAVITY: 0.7,
        PLAYER_SPEED: 7,
        ENEMY_SPEED: 5,
        MAX_ENEMY_SPEED: 12,
        JUMP_SPEED: 15,
        SPAWN_RATE: 180,
        ENEMY_SPEED_MULTIPLIER: 2,
        TERMINAL_VELOCITY: 12,
        PLAYER_DAMPING_MULTIPLIER: 0.8,
        FLOATING_ENEMY_ACCEL: 0.1,
        FLOATING_ENEMY_BOUNCE: 2
    },
    sizes: {
        player:      { width: 1, height: 1 },
        enemy:       { width: 1, height: 1 },
        large_enemy: { width: 2, height: 2 },
        box:         { width: 1, height: 1 },
    },
    health: {
        player: 3,
        enemy: 2,
        large_enemy: 5
    },
    hurtTime: 280,
};