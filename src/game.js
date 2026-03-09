class Game {
    constructor() {
        this.ecs = new ECS();
        this.factory = new EntityFactory(this.ecs);
        this.spawner = new SpawningSystem(this.ecs, this.factory);
        this.ecs.systems = [
            new EnemySpawnSystem(this.ecs, this.spawner),
            new BoxSpawnSystem(this.ecs, this.spawner),
            new InputSystem(this.ecs, this.spawner),
            this.spawner,
            new InteractionSystem(this.ecs, this.spawner),
            new PhysicsSystem(this.ecs, this.spawner),
            new AnimationSystem(this.ecs),
            new RenderSystem(this.ecs)
        ];
    }

    update() {
        this.ecs.update();
    }

    loadLevel(levelConfig) {
        // Clear out any old entities
        this.ecs.clear();

        // Pass parameters into the spawner system dynamically
        this.spawner.request(EntityType.PLAYER, levelConfig.player);

        for (let enemyData of levelConfig.enemies) {
            this.spawner.request(EntityType.ENEMY, enemyData);
        }

        for (let wallData of levelConfig.walls) {
            this.spawner.request(EntityType.WALL, wallData);
        }

        if (levelConfig.boxes) {
            for (let boxData of levelConfig.boxes) {
                this.spawner.request(EntityType.BOX, boxData);
            }
        }

        // Immediately update the spawner so entities appear on frame 1
        this.spawner.update();
    }

    renderOnly() {
        // Runs ONLY the RenderSystem so the game freezes but stays visible on screen
        const renderSys = this.ecs.getSystem(RenderSystem);
        if (renderSys) {
            renderSys.update();
        }
    }
}
