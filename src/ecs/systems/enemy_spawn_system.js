class EnemySpawnSystem extends System {
    constructor(ecs, spawner) {
        super(ecs);
        this.spawner = spawner;
        this.spawnTimer = 0;
    }

    update() {
        this.spawnTimer++;

        if (this.spawnTimer >= SpawnDefaults.SPAWN_RATE) {
            this.spawner.request(EntityType.ENEMY, {
                center_x: 400,
                center_y: 20,
                width: EntityDefaults.ENEMY.width,
                height: EntityDefaults.ENEMY.height
            })
            this.spawnTimer = 0;
        }
    }
}