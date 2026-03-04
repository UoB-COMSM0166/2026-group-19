class EnemySpawnSystem extends System {
    constructor(ecs, spawner) {
        super(ecs);
        this.spawner = spawner;
        this.spawnTimer = 0;
        this.spawnInterval = 600; // Frames
        this.minSize = 20;
        this.maxSize = 40;
    }

    update() {
        this.spawnTimer++;

        if (this.spawnTimer >= this.spawnInterval) {
            // Math.floor is important here.
            const size = Math.floor(random(this.minSize, this.maxSize));
            this.spawner.request(EntityType.ENEMY, { center_x: 400, center_y: 50, width: size, height: size })
            this.spawnTimer = 0;
        }
    }
}