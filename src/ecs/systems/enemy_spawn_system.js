class EnemySpawnSystem extends System {
    constructor(ecs, spawner) {
        super(ecs);
        this.spawner = spawner;
        this.spawnTimer = 0;
        this.spawnInterval = 120; // Frames
    }

    update() {
        this.spawnTimer++;

        if (this.spawnTimer >= this.spawnInterval) {
            const size = random(20, 40);
            this.spawner.request(EntityType.ENEMY, {
                center_x: random(100, 700),
                center_y: 60,
                width: size,
                height: size,
                isPlayer: false
            })
            this.spawnTimer = 0;
        }
    }
}