class EntityFactory {
    constructor(ecs) {
        this.ecs = ecs;
    }

    create(type, data) {
        /*
        Creates an entity of type with data
        */
       switch(type) {
            case EntityType.PLAYER:
                return this.createSprite(data.center_x, data.center_y, data.width, data.height, true);
            case EntityType.ENEMY:
                return this.createSprite(data.center_x, data.center_y, data.width, data.height, false);
            case EntityType.WALL:
                return this.createWall(data.left_x, data.top_y, data.width, data.height);
            default:
                throw new Error(`Unknown entity type: ${type}`);
       }
    }

    createSprite(center_x, center_y, width, height, isPlayer) {
        const entity = this.ecs.createEntity();
        this.ecs.addComponent(entity, new Position(center_x, center_y));
        this.ecs.addComponent(entity, new Collider(width, height, false));
        this.ecs.addComponent(entity, new Velocity(0, 0));
        this.ecs.addComponent(entity, new Gravity(0.5));
        this.ecs.addComponent(entity, new Sprite(isPlayer));
        this.ecs.addComponent(entity, new Renderable([255, 10, 155]));
        return entity;
    }

    createWall(left_x, top_y, width, height) {
        const entity = this.ecs.createEntity();
        this.ecs.addComponent(entity, new Position(left_x + width / 2, top_y + height / 2));
        this.ecs.addComponent(entity, new Collider(width, height, true));
        this.ecs.addComponent(entity, new Immovable());
        this.ecs.addComponent(entity, new Wall());
        this.ecs.addComponent(entity, new Renderable([200, 0, 0]));
        return entity;
    }
}