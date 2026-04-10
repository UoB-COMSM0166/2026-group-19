/*
 * Game is the top-level coordinator for a running game session.
 *
 * Responsibilities:
 *   - Owns the ECS instance and registers all systems in update order
 *   - Loads levels by building a resolved config from a template and spawning
 *     the initial set of entities (player + walls)
 *   - Exposes update() for the main game loop and renderOnly() for frozen states
 *     (e.g. pause screen, game over)
 *
 * Usage:
 *   const game = new Game();
 *   game.loadLevel(1);   // build and spawn level 1
 *   game.update();       // call each frame in draw()
 */

class Game {
    constructor() {
        this.ecs = new ECS();
        this.factory = new EntityFactory(this.ecs);
        this.spawner = new SpawningSystem(this.ecs, this.factory);
        this.levelConfig = null;
        this.ecs.systems = [
            new EnemySpawnSystem(this.ecs, this.spawner),
            new BoxSpawnSystem(this.ecs, this.spawner),
            new InputSystem(this.ecs, this.spawner),
            new WeaponSystem(this.ecs, this.spawner),
            this.spawner,
            new InteractionSystem(this.ecs, this.spawner),
            new FloatingSystem(this.ecs),
            new PhysicsSystem(this.ecs, this.spawner),
            new AnimationSystem(this.ecs),
            new ProjectileSystem(this.ecs),
            new RenderSystem(this.ecs)
        ];
    }

    update() {
        const dt = deltaTime / (1000 / 60);
        this.ecs.update(dt);
    }

    loadLevel(levelNumber, difficulty = "NORMAL") {
        const template = LevelTemplates[levelNumber]
        if (!template) throw new Error(`Unknown level: ${levelNumber}`);

        this.levelConfig = LevelFactory.build(template, difficulty);
        this.ecs.clear();

        // The level configurations can modify the physics constants to alter difficulty
        // Any systems or classes that use these physics constants must be able to receive the new values upon level load
        this.ecs.getSystem(PhysicsSystem).applyPhysics(this.levelConfig.physics);
        this.ecs.getSystem(EnemySpawnSystem).applyPhysics(this.levelConfig.physics);
        this.ecs.getSystem(InputSystem).applyPhysics(this.levelConfig.physics);
        this.ecs.getSystem(FloatingSystem).applyPhysics(this.levelConfig.physics);
        this.ecs.getSystem(InteractionSystem).applyPhysics(this.levelConfig.physics);
        this.factory.applyPhysics(this.levelConfig.physics);

        // Build wall image
        loadImage("src/assets/wall_texture.png", img => {
            this.ecs.getSystem(RenderSystem).buildWallCache(img)
        });
        

        // Spawn initial entities (Currently Player and walls)
        this.spawnLevelEntities(this.levelConfig);
    }

    spawnLevelEntities(levelConfig) {
        this.spawner.request(EntityType.PLAYER, {
            ...levelConfig.player,
            width: LevelFactory.scaleX(DEFAULTS.sizes.player.width, width),
            height: LevelFactory.scaleY(DEFAULTS.sizes.player.height, height)
        });

        for (let wall of levelConfig.walls) {
            this.spawner.request(EntityType.WALL, wall);
        }

        // Immediately update the spawner so entities appear on frame 1
        this.spawner.update();

        // Apply current control scheme from global settings
        this.ecs.getSystem(InputSystem).setControlScheme(GameSettings.controlScheme);
    }

    renderOnly() {
        // Runs ONLY the RenderSystem so the game freezes but stays visible on screen
        const renderSys = this.ecs.getSystem(RenderSystem);
        if (renderSys) {
            renderSys.update();
        }
    }
}