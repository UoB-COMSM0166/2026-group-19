const EntityType = Object.freeze({
    PROJECTILE: 'PROJECTILE',
    PLAYER: 'PLAYER',
    GROUND_ENEMY: 'GROUND_ENEMY',
    FLOATING_ENEMY: 'FLOATING_ENEMY',
    WALL: 'WALL',
    BOX: 'BOX'
})

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

    // Public Methods

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

    // Private Methods
    createPlayer(data) {
        /*
         * createPlayer(data)
         * data should contain:
         *   - center_x: number  // center x position
         *   - center_y: number  // center y position
         *   - width: number
         *   - height: number
         */
        const entity = this.ecs.createEntity();
        const components = this.playerComponents(data);
        this.addAll(entity, components);
        return entity;
    }

    createEnemy(data) {
        /*
         * createEnemy(data)
         * data should contain:
         *   - center_x: number
         *   - center_y: number
         *   - width: number
         *   - height: number
         *   - health: number
         *   - color: RGB
         */
        const entity = this.ecs.createEntity();
        const components = this.enemyComponents(data);
        components.push(new Acceleration(0, this.physics.gravity));
        this.addAll(entity, components);
        return entity;
    }

    createFloatingEnemy(data) {
        /*
         * createFloatingEnemy(data)
         * data should contain:
         *   - center_x: number
         *   - center_y: number
         *   - width: number
         *   - height: number
         *   - health: number
         *   - color: RGB
         */
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

    createWall(data) {
        /*
         * createWall(data)
         * data should contain:
         *   - left_x: number     // left/top coordinates (not center)
         *   - top_y: number
         *   - width: number
         *   - height: number
         *   - spawnable?: boolean (optional) // whether wall can spawn boxes on top
         */
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

    createBox(data) {
        /*
         * createBox(data)
         * data should contain:
         *   - left_x: number
         *   - top_y: number
         *   - width: number
         *   - height: number
         */
        const entity = this.ecs.createEntity();
        this.addAll(entity, [
            this.centeredPosition(data),
            new Box(),
            new Renderable([82, 51, 45], this.boxImage),
        ]);
        return entity;
    }

    createProjectile(data) {
        /*
         * createProjectile(data)
         * data should contain:
         *   - center_x: number
         *   - center_y: number
         *   - width: number
         *   - height: number
         *   - velocity_x: number
         *   - velocity_y: number
         *   - damage: number
         *   - range: number
         *   - bounce: number
         */
        const entity = this.ecs.createEntity();
        const projectile = new Projectile(data.damage, data.range, data.bounce, data.pierce, data.duration);
        if (data.followEntity !== undefined) {
            projectile.followEntity = data.followEntity;
            projectile.followDirection = data.followDirection;
            projectile.followOffset = data.followOffset;
        }
        const img = data.isRocket ? this.rocketImage : this.bulletImage;
        this.addAll(entity, [
            new Position(data.center_x, data.center_y, data.width, data.height),
            new Velocity(data.velocity_x, data.velocity_y),
            projectile,
            new Renderable(null, img),
        ]);
        return entity;
    }

    // Helpers

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

    centeredPosition({ left_x, top_y, width, height }) {
        return new Position(left_x + width / 2, top_y + height / 2, width, height);
    }

    addAll(entity, components) {
        for (const component of components) {
            this.ecs.addComponent(entity, component);
        }
    }
}