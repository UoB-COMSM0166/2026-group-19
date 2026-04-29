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

/**
 * Spawns enemies at a rate that scales with the player's score, making the game
 * progressively harder over time. Supports three enemy types (NORMAL, LARGE, FLOATING)
 * with configurable spawn weights per level. All enemies appear at the top-center of the
 * screen and fall into the level.
 */
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

    /**
     * Resets the spawn timer and start delay, used when restarting a level.
     */
    resetSpawnState() {
        this.spawnTimer = 0;
        this.startDelay = defaults.spawnStartDelay;
    }

    /**
     * Waits for the initial start delay, then fires a spawn request whenever
     * the accumulated timer exceeds the effective spawn rate. The effective spawn
     * rate decreases (faster spawning) as the player's score increases.
     */
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

    /**
     * Picks a random enemy type using weighted probabilities from the physics config.
     * Falls back to equal weighting if spawn weights are not defined in the level template.
     */
    getRandomEnemyType() {
        const weights = this.physics.spawnWeights;

        if (!weights) {
            const types = [EnemyType.NORMAL, EnemyType.LARGE, EnemyType.FLOATING];
            return types[Math.floor(Math.random() * types.length)];
        }

        const rand = Math.random();
        let cumulativeWeight = 0;

        if (rand < (cumulativeWeight += weights.normal)) return EnemyType.NORMAL;
        if (rand < (cumulativeWeight += weights.large)) return EnemyType.LARGE;

        return EnemyType.FLOATING;
    }
}