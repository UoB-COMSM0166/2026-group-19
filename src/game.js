class Game {
    constructor() {
        this.ecs = new ECS();
        this.factory = new EntityFactory(this.ecs);
        this.spawner = new SpawningSystem(this.ecs, this.factory);
        this.ecs.systems = [
            new EnemySpawnSystem(this.ecs, this.spawner),
            new BoxSpawnSystem(this.ecs, this.spawner),
            new InputSystem(this.ecs, this.spawner),
            new WeaponSystem(this.ecs, this.spawner),
            this.spawner,
            new InteractionSystem(this.ecs, this.spawner),
            new PathingSystem(this.ecs),
            new PhysicsSystem(this.ecs, this.spawner),
            new AnimationSystem(this.ecs),
            new ProjectileSystem(this.ecs),
            new RenderSystem(this.ecs)
        ];
    }

    update() {
        this.ecs.update();
    }

    loadLevel(levelConfig) {
        this.applyLevelConstants(levelConfig);
        this.spawnLevelEntities(levelConfig);
    }

    applyLevelConstants(levelConfig) {
        if (levelConfig.player) {
            EntityDefaults.PLAYER.width = levelConfig.player.size.width;
            EntityDefaults.PLAYER.height = levelConfig.player.size.height;

            PhysicsConstants.GRAVITY = levelConfig.player.physics.GRAVITY;
            PhysicsConstants.TERMINAL_VELOCITY = levelConfig.player.physics.TERMINAL_VELOCITY;
            PhysicsConstants.PLAYER_SPEED = levelConfig.player.physics.PLAYER_SPEED;
            PhysicsConstants.JUMP_SPEED = levelConfig.player.physics.JUMP_SPEED;
        }

        if (levelConfig.enemies) {
            EntityDefaults.ENEMY.width = levelConfig.enemies.size.width;
            EntityDefaults.ENEMY.height = levelConfig.enemies.size.height;

            PhysicsConstants.ENEMY_SPEED = levelConfig.enemies.physics.ENEMY_SPEED;
            SpawnDefaults.SPAWN_RATE = levelConfig.enemies.physics.SPAWN_RATE;
        }

        if (levelConfig.boxes) {
            EntityDefaults.BOX.width = levelConfig.boxes.size.width;
            EntityDefaults.BOX.height = levelConfig.boxes.size.height;
        }
    }

    spawnLevelEntities(levelConfig) {
        // Clear out any old entities
        this.ecs.clear();

        // Spawn Entities normally
        this.spawner.request(EntityType.PLAYER, {
            ...levelConfig.player.pos,
            ...levelConfig.player.size
        });

        for (let pos of levelConfig.enemies.pos) {
            this.spawner.request(EntityType.ENEMY, { ...pos, ...levelConfig.enemies.size });
        }

        for (let pos of levelConfig.walls.pos) {
            this.spawner.request(EntityType.WALL, pos);
        }

        if (levelConfig.boxes) {
            const boxPositions = Array.isArray(levelConfig.boxes.pos)
                ? levelConfig.boxes.pos
                : [levelConfig.boxes.pos];

            for (let pos of boxPositions) {
                this.spawner.request(EntityType.BOX, { ...pos, ...levelConfig.boxes.size });
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