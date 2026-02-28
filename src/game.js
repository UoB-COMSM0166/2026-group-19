class Game {
    constructor() {
        this.ecs = new ECS();
        this.factory = new EntityFactory(this.ecs);
        this.spawner = new SpawningSystem(this.ecs, this.factory);
        this.ecs.systems = [
            this.spawner,
            new GravitySystem(this.ecs),
            new InputSystem(this.ecs),
            // new EnemySystem(this.ecs),
            new PhysicsSystem(this.ecs),
            new RenderSystem(this.ecs)
        ];

        this.init();
    }

    update() {
        this.ecs.update();
    }

    init() {
        this.spawner.request(EntityType.PLAYER, { center_x: 100, center_y: 100, width: 32, height: 32 });
        this.spawner.request(EntityType.WALL, { left_x: 0, top_y: 580, width: 800, height: 20 });
    }
}