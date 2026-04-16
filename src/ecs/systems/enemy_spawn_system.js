const EnemyType = Object.freeze({
    NORMAL: "NORMAL",
    LARGE: "LARGE",
    FLOATING: "FLOATING"
})

const EnemyConfig = Object.freeze({
    [EnemyType.NORMAL]: { entityType: EntityType.GROUND_ENEMY, width: DEFAULTS.sizes.enemy.width, height: DEFAULTS.sizes.enemy.height, healthKey: 'enemy', color: [100, 10, 200] },
    [EnemyType.LARGE]: { entityType: EntityType.GROUND_ENEMY, width: DEFAULTS.sizes.large_enemy.width, height: DEFAULTS.sizes.large_enemy.height, healthKey: 'large_enemy', color: [80, 5, 160] },
    [EnemyType.FLOATING]: { entityType: EntityType.FLOATING_ENEMY, width: DEFAULTS.sizes.enemy.width, height: DEFAULTS.sizes.enemy.height, healthKey: 'enemy', color: [10, 200, 255] },
});

class EnemySpawnSystem extends System {
    constructor(ecs, spawner) {
        super(ecs);
        this.spawner = spawner;
        this.spawnTimer = 0;
        this.physics = DEFAULTS.physics;
        this.health = DEFAULTS.difficulty.NORMAL;
    }

    applyPhysics(physics) {
        this.physics = physics;
    }

    applyHealth(health) {
        this.health = health;
    }

    update(dt) {
        this.spawnTimer += dt;

        if (this.spawnTimer >= this.physics.SPAWN_RATE) {
            const enemyType = this.getRandomEnemyType();
            const config = EnemyConfig[enemyType];
            this.spawner.request(config.entityType, {
                center_x: Math.round(width / 2),
                center_y: 0,
                width: LevelFactory.scaleX(config.width, width),
                height: LevelFactory.scaleY(config.height, height),
                health: this.health[config.healthKey],
                color: config.color,
                isLarge: (enemyType === EnemyType.LARGE)
            });
            this.spawnTimer = 0;
        }
    }

    getRandomEnemyType() {
        const weights = this.physics.SPAWN_WEIGHTS;

        // Fallback to equal chance if weights aren't defined in the template
        if (!weights) {
            const types = [EnemyType.NORMAL, EnemyType.LARGE, EnemyType.FLOATING];
            return types[Math.floor(Math.random() * types.length)];
        }

        const rand = Math.random();
        let cumulativeWeight = 0;

        // Iterate through the types and check against the random roll
        if (rand < (cumulativeWeight += weights.NORMAL)) return EnemyType.NORMAL;
        if (rand < (cumulativeWeight += weights.LARGE)) return EnemyType.LARGE;

        return EnemyType.FLOATING;
    }
}