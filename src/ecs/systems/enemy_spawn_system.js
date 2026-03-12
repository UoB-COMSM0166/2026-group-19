class EnemySpawnSystem extends System {
    constructor(ecs, spawner) {
        super(ecs);
        this.spawner = spawner;
        this.spawnTimer = 0;
        this.spawnRate = DEFAULTS.physics.SPAWN_RATE;
    }

    applyPhysics(physics) {
        this.spawnRate = physics.SPAWN_RATE;
    }

    update(dt) {
        this.spawnTimer += dt;

        if (this.spawnTimer >= this.spawnRate) {
            this.spawner.request(EntityType.ENEMY, {
                center_x: 400,
                center_y: 20,
                width: DEFAULTS.sizes.enemy.width,
                height: DEFAULTS.sizes.enemy.height
            })
            this.spawnTimer = 0;
        }
    }
}