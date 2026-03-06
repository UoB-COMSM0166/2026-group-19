const EntityType = Object.freeze({
    PROJECTILE: 'PROJECTILE',
    PLAYER: 'PLAYER',
    ENEMY: 'ENEMY',
    //ENEMY_FLOATING: 'ENEMY_FLOATING',
    WALL: 'WALL',
    BOX: 'BOX'
});

const EnemyType = Object.freeze({
    NORMAL: 'NORMAL',
    LARGE: 'LARGE',
    FLOATING: 'FLOATING'
});

const EnemyConfig = Object.freeze({
    [EnemyType.NORMAL]: { width: 20, height: 20, health: 1, speed: 2, color: [100, 10, 200] },
    [EnemyType.LARGE]: { width: 40, height: 40, health: 3, speed: 1, color: [80, 5, 160] },
    [EnemyType.FLOATING]: { width: 25, height: 25, health: 2, speed: 1.5, color: [10, 200, 255], forceStrength: 0.5 },
});