const DEFAULTS = {
    physics: {
        GRAVITY: 0.5,
        PLAYER_SPEED: 4,
        ENEMY_SPEED: 4,
        MAX_ENEMY_SPEED: 12,
        JUMP_SPEED: 12,
        SPAWN_RATE: 180,
        ENEMY_SPEED_MULTIPLIER: 2,
        TERMINAL_VELOCITY: 6,
        PLAYER_DAMPING_MULTIPLIER: 0.8,
        FLOATING_ENEMY_ACCEL: 0.2,
        FLOATING_ENEMY_BOUNCE: 2
    },
    sizes: {
        player: { width: 40, height: 40 },
        enemy:  { width: 30, height: 30 },
        large_enemy: {width: 50, height: 50},
        box:    { width: 20, height: 20 },
    },
    health: {
        player: 3,
        enemy: 2,
        large_enemy: 5
    },
    wallThickness: 20,
    hurtTime: 280,
};