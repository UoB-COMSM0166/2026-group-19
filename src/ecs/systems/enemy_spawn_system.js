class EnemySpawnSystem extends System {
    constructor(ecs, spawner) {
        super(ecs);
        this.spawner = spawner;
        this.spawnTimer = 0;
        this.spawnInterval = 600;
    }

    applyPhysics(physics) {
        this.maxFall = physics.TERMINAL_VELOCITY;
    }

    update() {
        this.spawnTimer++;

        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnTimer = 0;
            // Math.floor is important here.
            const types = [EnemyType.NORMAL, EnemyType.LARGE, EnemyType.FLOATING];
            const randomType = types[Math.floor(Math.random() * types.length)];
            const config = EnemyConfig[randomType];

            this.spawner.request(EntityType.ENEMY, {
                center_x: 400,
                center_y: 50,
                type: randomType
            });
        }
    }
}