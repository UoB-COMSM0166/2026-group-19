const PlayerAnimations = {
    [AnimationType.IDLE]: {
        frames: [0,1,2,3],
        speed: 8,
        loop: true
    },

    [AnimationType.MOVE]: {
        frames: [17,18,19,20,21,22,23],
        speed: 10,
        loop: true
    },

    [AnimationType.HURT]: {
        frames: [15,16,17],
        speed: 8,
        loop: false
    }
};

class EntityFactory {
    /*
    Factory pattern implementation that abstracts entity creation.
    Purpose is to:
    1. Centralize entity construction logic
    2. Provide a simple interface to create entities
    */
    constructor(ecs) {
        this.ecs = ecs;
        this.characterSpriteSheet = characterSpriteSheet;
        this.wallTileImage = wallTileImage;
        this.physics = DEFAULTS.physics;
    }

    applyPhysics(physics) {
        this.maxfall = DEFAULTS.physics.TERMINAL_VELOCITY;
    }

    create(type, data) {
        /*
        Creates an entity of type with data
        This could probably be improved with some sort of pre-made templates
        */
        switch (type) {
            case EntityType.PLAYER:
                return this.createCharacter(data.center_x, data.center_y, EntityType.PLAYER);
            case EntityType.ENEMY:
                return this.createCharacter(data.center_x, data.center_y, data.type);
            case EntityType.WALL:
                return this.createWall(data.left_x, data.top_y, data.width, data.height, data.spawnable);
            case EntityType.BOX:
                return this.createBox(data.left_x, data.top_y, data.width, data.height);
            case EntityType.PROJECTILE:
                return this.createProjectile(data.center_x, data.center_y, data.width, data.height, data.velocity_x, data.damage, data.range);
            default:
                throw new Error(`Unknown entity type: ${type}`);
        }
    }

    // TODO: Refactor these create methods into something prettier
    createCharacter(center_x, center_y, charType) {
        const entity = this.ecs.createEntity();

        let width, height, color;

        if (charType === EntityType.PLAYER) {
            width = 20;
            height = 20;
            color = [255, 10, 155];
            this.ecs.addComponent(entity, new Player());
            this.ecs.addComponent(entity, new Acceleration(0, this.physics.GRAVITY));
            this.ecs.addComponent(entity, new Character(10));
            this.ecs.addComponent(entity, new Velocity(0, 0));
            this.ecs.addComponent(entity, new Animation(
                this.characterSpriteSheet, 24, 24, 1, PlayerAnimations
            ));
        } else {
            //all enemies will use Enemy component with type
            const config = EnemyConfig[charType];
            width = config.width;
            height = config.height;
            color = config.color;
            this.ecs.addComponent(entity, new Enemy(charType));
            this.ecs.addComponent(entity, new Character(config.health));


            //add force for floating, velocity for normal (+ large)
            if (charType === EnemyType.FLOATING) {
                this.ecs.addComponent(entity, new Acceleration(0, 0));
                this.ecs.addComponent(entity, new Velocity(0, 0));
            } else {
                this.ecs.addComponent(entity, new Acceleration(0, this.physics.GRAVITY));
                const sign = Math.random() < 0.5 ? -1 : 1;
                this.ecs.addComponent(entity, new Velocity(sign * speed, 0));
            }
        }

        this.ecs.addComponent(entity, new Renderable(color));
        this.ecs.addComponent(entity, new Position(center_x, center_y, width, height));
        return entity;
    }

    createWall(left_x, top_y, width, height, spawnable = false) {
        const entity = this.ecs.createEntity();
        this.ecs.addComponent(entity, new Position(left_x + width / 2, top_y + height / 2, width, height));
        this.ecs.addComponent(entity, new Wall());
        this.ecs.addComponent(entity, new Renderable([200, 0, 0], this.wallTileImage));
        if (spawnable) {
            this.ecs.addComponent(entity, new SpawnablePlatform());
        }
        return entity;
    }

    createBox(left_x, top_y, width, height) {
        const entity = this.ecs.createEntity();
        this.ecs.addComponent(entity, new Position(left_x + width / 2, top_y + height / 2, width, height));
        this.ecs.addComponent(entity, new Box());
        this.ecs.addComponent(entity, new Renderable([82, 51, 45]));
        return entity;
    }

    createProjectile(center_x, center_y, width, height, velocity_x, damage, range) {
        const entity = this.ecs.createEntity();
        this.ecs.addComponent(entity, new Position(center_x, center_y, width, height));
        this.ecs.addComponent(entity, new Velocity(velocity_x, 0));
        this.ecs.addComponent(entity, new Projectile(damage, range));
        this.ecs.addComponent(entity, new Renderable([255, 255, 0]));
        return entity;
    }
}
