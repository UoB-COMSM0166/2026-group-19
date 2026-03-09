class EntityFactory {
    /*
    Factory pattern implementation that abstracts entity creation.
    Purpose is to:
    1. Centralize entity construction logic
    2. Provide a simple interface to create entities
    */
    constructor(ecs) {
        this.ecs = ecs;
        this.mainCharacterSpriteSheet = loadImage('assets/main_characterSprites.png');
    }

    create(type, data) {
        /*
        Creates an entity of type with data
        This could probably be improved with some sort of pre-made templates
        */
        switch (type) {
            case EntityType.PLAYER:
                return this.createCharacter(data.center_x, data.center_y, data.width, data.height, true);
            case EntityType.ENEMY:
                return this.createCharacter(data.center_x, data.center_y, data.width, data.height, false);
            case EntityType.WALL:
                return this.createWall(data.left_x, data.top_y, data.width, data.height, data.spawnable);
            case EntityType.BOX:
                return this.createBox(data.left_x, data.top_y, data.width, data.height);
            case EntityType.PROJECTILE:
                return this.createProjectile(data.center_x, data.center_y, data.width, data.height, data.velocity_x, data.damage);
            default:
                throw new Error(`Unknown entity type: ${type}`);
        }
    }

    // TODO: Refactor these create methods into something prettier
    createCharacter(center_x, center_y, width, height, isPlayer) {
        const speed = 4;

        const entity = this.ecs.createEntity();
        this.ecs.addComponent(entity, new Position(center_x, center_y, width, height));
        this.ecs.addComponent(entity, new Gravity(0.5));
        this.ecs.addComponent(entity, new Character(10));

        // Setup the render component with the correct fallback color
        const color = isPlayer ? [255, 10, 155] : [100, 10, 200];
        const renderComponent = new Renderable(color);
        this.ecs.addComponent(entity, renderComponent);

        if (isPlayer) {
            this.ecs.addComponent(entity, new Player(1));
            this.ecs.addComponent(entity, new Velocity(0, 0));

            // 576x24 spritesheet => 24 frames in one row, each frame 24x24.
            // If your frame ranges are different, edit start/count here.
            this.ecs.addComponent(entity, new Sprite(
                this.mainCharacterSpriteSheet,
                24,
                24,
                {
                    IDLE:   { start: 0,  count: 4, speed: 8, loop: true },
                    MOVE:   { start: 17,  count: 7, speed: 10, loop: false },
                    HURT:   { start: 15, count: 3, speed: 8, loop: false }
                },
                1.6
            ));
        } else {
            this.ecs.addComponent(entity, new Enemy());
            const sign = Math.random() < 0.5 ? -1 : 1;
            this.ecs.addComponent(entity, new Velocity(sign * speed, 0));
        }
        return entity;
    }

    createWall(left_x, top_y, width, height, spawnable = false) {
        const entity = this.ecs.createEntity();
        this.ecs.addComponent(entity, new Position(left_x + width / 2, top_y + height / 2, width, height));
        this.ecs.addComponent(entity, new Wall());
        this.ecs.addComponent(entity, new Renderable([200, 0, 0]));
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

    createProjectile(center_x, center_y, width, height, velocity_x, damage) {
        const entity = this.ecs.createEntity();
        this.ecs.addComponent(entity, new Position(center_x, center_y, width, height));
        this.ecs.addComponent(entity, new Velocity(velocity_x, 0));
        this.ecs.addComponent(entity, new Projectile(damage));
        this.ecs.addComponent(entity, new Renderable([255, 255, 0]));
        return entity;
    }
}
