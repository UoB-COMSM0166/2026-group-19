class EntityFactory {
    /*
    Factory pattern implementation that abstracts entity creation.
    Purpose is to:
    1. Centralize entity construction logic
    2. Provide a simple interface to create entities
    */
    constructor(ecs) {
        this.ecs = ecs;
        this.dragonImg = loadImage('assets/dragon.svg');
    }

    create(type, data) {
        /*
        Creates an entity of type with data
        This could probably be improved with some sort of pre-made templates
        */
        switch (type) {
            case EntityType.PLAYER:
                return this.createCharacter(data.center_x, data.center_y, data.width, data.height, EntityType.PLAYER);
            case EntityType.ENEMY:
                return this.createCharacter(data.center_x, data.center_y, data.width, data.height, EntityType.ENEMY);
            case EntityType.ENEMY_FLOATING:
                return this.createCharacter(data.center_x, data.center_y, data.width, data.height, EntityType.ENEMY_FLOATING);
            case EntityType.WALL:
                return this.createWall(data.left_x, data.top_y, data.width, data.height);
            case EntityType.BOX:
                return this.createBox(data.left_x, data.top_y, data.width, data.height);
            case EntityType.PROJECTILE:
                return this.createProjectile(data.center_x, data.center_y, data.width, data.height, data.velocity_x, data.damage);
            default:
                throw new Error(`Unknown entity type: ${type}`);
        }
    }

    // TODO: Refactor these create methods into something prettier
    createCharacter(center_x, center_y, width, height, charType) {
        const speed = 4;

        const entity = this.ecs.createEntity();
        this.ecs.addComponent(entity, new Position(center_x, center_y, width, height));
        this.ecs.addComponent(entity, new Gravity(0.5));
        this.ecs.addComponent(entity, new Character(10));

        let color;
        if (charType === EntityType.PLAYER) {
            color = [255, 10, 155];
        } else if (charType === EntityType.ENEMY_FLOATING) {
            color = [10, 200, 255];
        } else {
            color = [100, 10, 200];
        }
        const renderComponent = new Renderable(color);
        this.ecs.addComponent(entity, renderComponent);

        if (charType === EntityType.PLAYER) {
            this.ecs.addComponent(entity, new Player());
            this.ecs.addComponent(entity, new Velocity(0, 0));

        } else if (charType === EntityType.ENEMY_FLOATING) {
            this.ecs.addComponent(entity, new EnemyFloating());
            this.ecs.addComponent(entity, new Velocity(0, 0));
            this.ecs.addComponent(entity, new Force(-2, -1));

        } else if (charType === EntityType.ENEMY) {
            this.ecs.addComponent(entity, new Enemy());
            const sign = Math.random() < 0.5 ? -1 : 1;
            this.ecs.addComponent(entity, new Velocity(sign * speed, 0));
        }

        renderComponent.image = this.dragonImg;
        return entity;
    }

    createWall(left_x, top_y, width, height) {
        const entity = this.ecs.createEntity();
        this.ecs.addComponent(entity, new Position(left_x + width / 2, top_y + height / 2, width, height));
        this.ecs.addComponent(entity, new Wall());
        this.ecs.addComponent(entity, new Renderable([200, 0, 0]));
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