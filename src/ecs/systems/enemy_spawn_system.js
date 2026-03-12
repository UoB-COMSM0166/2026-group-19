const EnemyType = Object.freeze({
    NORMAL: "NORMAL",
    LARGE: "LARGE",
    FLOATING: "FLOATING"
})

const EnemyConfig = Object.freeze({
    [EnemyType.NORMAL]: { entityType: EntityType.GROUND_ENEMY, width: DEFAULTS.sizes.enemy.width, height: DEFAULTS.sizes.enemy.height, health: DEFAULTS.health.enemy, color: [100, 10, 200] },
    [EnemyType.LARGE]: { entityType: EntityType.GROUND_ENEMY, width: DEFAULTS.sizes.large_enemy.width, height: DEFAULTS.sizes.large_enemy.height, health: DEFAULTS.health.large_enemy, color: [80, 5, 160] },
    [EnemyType.FLOATING]: { entityType: EntityType.FLOATING_ENEMY, width: DEFAULTS.sizes.enemy.width, height: DEFAULTS.sizes.enemy.height, health: DEFAULTS.health.enemy, color: [10, 200, 255]},
});

class EnemySpawnSystem extends System {
    constructor(ecs, spawner) {
        super(ecs);
        this.spawner = spawner;
        this.spawnTimer = 0;
        this.physics = DEFAULTS.physics;
    }

    applyPhysics(physics) {
        this.physics = physics;
    }

    update(dt) {
        this.spawnTimer += dt;

        if (this.spawnTimer >= this.physics.SPAWN_RATE) {
            const enemyType = this.getRandomEnemyType();
            const config = EnemyConfig[enemyType];
            this.spawner.request(config.entityType, {
                center_x: Math.round(window.innerWidth / 2),
                center_y: 0,
                width: config.width,
                height: config.height,
                max_speed: this.physics.ENEMY_SPEED,
                health: config.health,
                color: config.color
            })
            this.spawnTimer = 0;
        }
    }

    getRandomEnemyType() {
        const enemyTypes = [EnemyType.NORMAL, EnemyType.LARGE, EnemyType.FLOATING];
        return enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    }
}