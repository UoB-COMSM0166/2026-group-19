class Game {
    constructor() {
        this.ecs = new ECS();
        this.factory = new EntityFactory(this.ecs);
        this.spawner = new SpawningSystem(this.ecs, this.factory);
        this.ecs.systems = [
            this.spawner,
            new GravitySystem(this.ecs),
            new InputSystem(this.ecs),
            new PhysicsSystem(this.ecs),
            new RenderSystem(this.ecs)
        ];

        this.init();
    }

    update() {
        this.ecs.update();
    }

    init() {
        this.spawner.request(EntityType.PLAYER, { center_x: 450, center_y: 50, width: 20, height: 20 });
        this.spawner.request(EntityType.ENEMY, { center_x: 400, center_y: 50, width: 20, height: 20 });
        this.spawner.request(EntityType.ENEMY, { center_x: 350, center_y: 50, width: 30, height: 30 }); 
        this.spawner.request(EntityType.ENEMY, { center_x: 300, center_y: 50, width: 30, height: 30 }); 
        this.spawner.request(EntityType.ENEMY, { center_x: 500, center_y: 50, width: 20, height: 20 });         
        this.spawner.request(EntityType.WALL, { left_x: 0, top_y: 580, width: 800, height: 20 });
        this.spawner.request(EntityType.WALL, { left_x: 0, top_y: 0, width: 800, height: 20 });
        this.spawner.request(EntityType.WALL, { left_x: 0, top_y: 0, width: 20, height: 600 });
        this.spawner.request(EntityType.WALL, { left_x: 780, top_y: 0, width: 20, height: 600 });
        this.spawner.request(EntityType.WALL, { left_x: 200, top_y: 150, width: 400, height: 20 });
        this.spawner.request(EntityType.WALL, { left_x: 200, top_y: 450, width: 400, height: 20 });
        this.spawner.request(EntityType.WALL, { left_x: 0, top_y: 300, width: 200, height: 20 });
        this.spawner.request(EntityType.WALL, { left_x: 600, top_y: 300, width: 200, height: 20 });
    }
}