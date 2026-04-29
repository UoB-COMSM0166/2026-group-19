const EntityType = Object.freeze({
    PROJECTILE: 'PROJECTILE',
    PLAYER: 'PLAYER',
    GROUND_ENEMY: 'GROUND_ENEMY',
    FLOATING_ENEMY: 'FLOATING_ENEMY',
    WALL: 'WALL',
    BOX: 'BOX'
})

/**
 * Constructs fully assembled ECS entities from a typed data descriptor.
 * All entity creation in the game goes through this class so that component
 * composition is centralised and other systems never build entities directly.
 */
class EntityFactory {
    constructor(ecs, assets) {
        this.ecs = ecs;
        this.bulletImage = assets.bulletImage;
        this.rocketImage = assets.rocketImage;
        this.characterSpriteSheet = assets.characterSpriteSheet;
        this.enemySpriteSheet = assets.enemySpriteSheet;
        this.enemyAngrySpriteSheet = assets.enemyAngrySpriteSheet;
        this.enemyLargeSpriteSheet = assets.enemyLargeSpriteSheet;
        this.enemyLargeAngrySpriteSheet = assets.enemyLargeAngrySpriteSheet;
        this.enemyFloatingImage = assets.enemyFloatingImage;
        this.boxImage = assets.boxImage;
        this.wallTileImage = assets.wallTileImage;
        this.physics = defaults.physics;
    }

    applyPhysics(physics) {
        this.physics = physics;
    }

    /**
     * Public entry point. Dispatches to the correct private creator based on type.
     * @param {EntityType} type - The kind of entity to create.
     * @param {Object} data - Spawn parameters; shape depends on the entity type.
     */
    create(type, data) {
        switch (type) {
            case EntityType.PLAYER:         return this.createPlayer(data);
            case EntityType.GROUND_ENEMY:   return this.createEnemy(data);
            case EntityType.FLOATING_ENEMY: return this.createFloatingEnemy(data);
            case EntityType.WALL:           return this.createWall(data);
            case EntityType.BOX:            return this.createBox(data);
            case EntityType.PROJECTILE:     return this.createProjectile(data);
            default: throw new Error(`Unknown entity type: ${type}`);
        }
    }

    /**
     * Creates the player entity with movement, animation, and health components.
     * @param {{ center_x, center_y, width, height, health }} data
     */
    createPlayer(data) {
        const entity = this.ecs.createEntity();
        const components = this.playerComponents(data);
        this.addAll(entity, components);
        return entity;
    }

    /**
     * Creates a ground enemy that walks and is affected by full gravity.
     * @param {{ center_x, center_y, width, height, health, color, isLarge }} data
     */
    createEnemy(data) {
        const entity = this.ecs.createEntity();
        const components = this.enemyComponents(data);
        components.push(new Acceleration(0, this.physics.gravity));
        this.addAll(entity, components);
        return entity;
    }

    /**
     * Creates a floating enemy that hovers under reduced gravity and steers
     * toward the player. Starts moving in a random horizontal direction.
     * @param {{ center_x, center_y, width, height, health, color }} data
     */
    createFloatingEnemy(data) {
        const entity = this.ecs.createEntity();
        const speed = this.physics.enemySpeed * (Math.random() < 0.5 ? -1 : 1);

        const components = [
        new Position(data.center_x, data.center_y, data.width, data.height),
        new Renderable(data.color, this.enemyFloatingImage),
        new Enemy(),
        new Character(data.health),
        new Velocity(speed, 0),
        new Floating(),
        new Acceleration(0, this.physics.gravity / 5)
    ];

    this.addAll(entity, components);
    return entity;
    }

    /**
     * Creates a wall entity. Spawnable platforms get a tile image and a
     * SpawnablePlatform component so BoxSpawnSystem can place boxes on them.
     * @param {{ left_x, top_y, width, height, spawnable?: boolean }} data
     */
    createWall(data) {
        const entity = this.ecs.createEntity();
        const components = [
            this.centeredPosition(data),
            new Wall(),
        ];

        if (data.spawnable || data.y0 === 17) {
            components.push(new Renderable([200, 0, 0], this.wallTileImage));
        }

        if (data.spawnable) {
            components.push(new SpawnablePlatform());
        }

        this.addAll(entity, components);
        return entity;
    }

    /**
     * Creates a weapon box that the player can pick up.
     * @param {{ left_x, top_y, width, height }} data
     */
    createBox(data) {
        const entity = this.ecs.createEntity();
        this.addAll(entity, [
            this.centeredPosition(data),
            new Box(),
            new Renderable([82, 51, 45], this.boxImage),
        ]);
        return entity;
    }

    /**
     * Creates a projectile. Uses the rocket image for rockets, bullet image otherwise.
     * @param {{ center_x, center_y, width, height, velocity_x, velocity_y, damage, range, bounce, isRocket }} data
     */
    createProjectile(data) {
        const entity = this.ecs.createEntity();
        const projectile = new Projectile(data.damage, data.range, data.bounce);
        const img = data.isRocket ? this.rocketImage : this.bulletImage;
        this.addAll(entity, [
            new Position(data.center_x, data.center_y, data.width, data.height),
            new Velocity(data.velocity_x, data.velocity_y),
            projectile,
            new Renderable(null, img),
        ]);
        return entity;
    }

    /**
     * Returns the component list for a player entity. Split out so tests and
     * other creators can reuse it without going through create().
     */
    playerComponents(data) {
        return [
            new Position(data.center_x, data.center_y, data.width, data.height),
            new Acceleration(0, this.physics.gravity),
            new Renderable([255, 10, 155]),
            new Player(),
            new Velocity(0, 0),
            new Character(data.health),
            new Animation(this.characterSpriteSheet, 32, 32, 5, PlayerAnimations),
        ];
    }

    /**
     * Returns the component list shared by all ground enemy variants. Selects
     * the correct sprite sheet and frame size based on the isLarge flag.
     */
    enemyComponents(data) {
        const speed = this.physics.enemySpeed * (Math.random() < 0.5 ? -1 : 1);

        const sheet = data.isLarge ? this.enemyLargeSpriteSheet : this.enemySpriteSheet;
        const anims = data.isLarge ? LargeEnemyAnimations : EnemyAnimations;
        const pixelSize = data.isLarge ? 160 : 80;

        return [
            new Position(data.center_x, data.center_y, data.width, data.height),
            new Renderable(data.color),
            new Enemy(),
            new Character(data.health),
            new Velocity(speed, 0),
            new Animation(sheet, pixelSize, pixelSize, 11, anims)
        ];
    }

    /**
     * Converts a top-left-anchored rect into a center-anchored Position component.
     */
    centeredPosition({ left_x, top_y, width, height }) {
        return new Position(left_x + width / 2, top_y + height / 2, width, height);
    }

    /**
     * Adds an array of components to an entity in one call.
     */
    addAll(entity, components) {
        for (const component of components) {
            this.ecs.addComponent(entity, component);
        }
    }
}
