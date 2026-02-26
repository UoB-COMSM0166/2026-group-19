class EntityFactory {
    constructor(ecs) {
        this.ecs = ecs;
    }

    createPlayer(x, y) {
        const entity = this.ecs.createEntity();
        this.ecs.addComponent(entity, new Position(x, y));
        this.ecs.addComponent(entity, new Velocity(0, 0));
        this.ecs.addComponent(entity, new Player());
        this.ecs.addComponent(entity, new Renderable(40, [255, 10, 155]));
        return entity;
    }
}