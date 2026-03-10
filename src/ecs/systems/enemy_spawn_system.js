class EnemySpawnSystem extends System {
    constructor(ecs, spawner) {
        super(ecs);
        this.spawner = spawner;
        this.spawnTimer = 0;
    }

    update() {
        this.spawnTimer++;

        if (this.spawnTimer >= this.spawnInterval) {
            // Math.floor is important here.
            const types = [EnemyType.NORMAL, EnemyType.LARGE, EnemyType.FLOATING];
            const randomType = types[Math.floor(Math.random() * types.length)];
            const config = EnemyConfig[randomType];

            this.spawner.request(EntityType.ENEMY, {
                center_x: 400,
                center_y: 50,
                type: randomType
            });


            /*
            if (randomType === EntityType.ENEMY_FLOATING) {
                spawnData.hasForce = true;
            }
            */

            //const size = Math.floor(random(this.minSize, this.maxSize));
            //this.spawner.request(EntityType.ENEMY, spawnData);
            this.spawnTimer = 0;
        }
    }
}