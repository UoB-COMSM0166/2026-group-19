const EnemyType = Object.freeze({
    NORMAL: "NORMAL",
    LARGE: "LARGE",
    FLOATING: "FLOATING"
})

const EnemyConfig = Object.freeze({
    [EnemyType.NORMAL]: { entityType: EntityType.GROUND_ENEMY, width: defaults.sizes.enemy.width, height: defaults.sizes.enemy.height, healthKey: 'enemy', color: [100, 10, 200] },
    [EnemyType.LARGE]: { entityType: EntityType.GROUND_ENEMY, width: defaults.sizes.largeEnemy.width, height: defaults.sizes.largeEnemy.height, healthKey: 'largeEnemy', color: [80, 5, 160] },
    [EnemyType.FLOATING]: { entityType: EntityType.FLOATING_ENEMY, width: defaults.sizes.enemy.width, height: defaults.sizes.enemy.height, healthKey: 'enemy', color: [10, 200, 255] },
});

class EnemySpawnSystem extends System {
    constructor(ecs, spawner) {
        super(ecs);
        this.spawner = spawner;
        this.spawnTimer = 0;
        this.startDelay = defaults.spawnStartDelay;
        this.physics = defaults.physics;
        this.health = {
            player:     defaults.difficulty.normal.playerHealth,
            enemy:      defaults.difficulty.normal.enemyHealth,
            largeEnemy: defaults.difficulty.normal.largeEnemyHealth
        };
    }

    applyPhysics(physics) {
        this.physics = physics;
    }

    applyHealth(health) {
        this.health = health;
    }

    resetSpawnState() {
        this.spawnTimer = 0;
        this.startDelay = defaults.spawnStartDelay;
    }

    update(dt) {
        if (this.startDelay > 0) {
            this.startDelay -= dt;
            return;
        }

        this.spawnTimer += dt;

        const playerId = this.ecs.getEntitiesWith(Player)[0];
        const player = this.ecs.getComponent(playerId, Player);

        const SCORE_SCALE = 5;
        const MIN_SPAWN_RATE = 100;
        const effSpawnRate = Math.max(MIN_SPAWN_RATE, this.physics.spawnRate - player.score * SCORE_SCALE);
        console.log(effSpawnRate);
        if (this.spawnTimer >= effSpawnRate) {
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
        const weights = this.physics.spawnWeights;

        // Fallback to equal chance if weights aren't defined in the template
        if (!weights) {
            const types = [EnemyType.NORMAL, EnemyType.LARGE, EnemyType.FLOATING];
            return types[Math.floor(Math.random() * types.length)];
        }

        const rand = Math.random();
        let cumulativeWeight = 0;

        // Iterate through the types and check against the random roll
        if (rand < (cumulativeWeight += weights.normal)) return EnemyType.NORMAL;
        if (rand < (cumulativeWeight += weights.large)) return EnemyType.LARGE;

        return EnemyType.FLOATING;
    }
}